import { ComponentDescription, ComponentSchema, RemoteComponentDescription } from '@alilc/lowcode-types';
import { buildComponents, AssetsJson, AssetLoader } from '@alilc/lowcode-utils';
import ReactRenderer from '@alilc/lowcode-react-renderer';
import { injectComponents } from '@alilc/lowcode-plugin-inject';

import React, { createElement } from 'react';


function genLowcodeComp(schema: ComponentSchema, components: any) {
  return class LowcodeComp extends React.Component {
    render(): React.ReactNode {
      return createElement(ReactRenderer, {
        ...this.props,
        schema,
        components,
        designMode: '',
      });
    }
  };
}


export async function parseAssets(assets: AssetsJson) {
  const { components: rawComponents, packages } = assets;


  const libraryAsset = [];
  const libraryMap = {};
  const packagesMap = {};
  packages.forEach(pkg => {
    const { package: _package, library, urls, renderUrls, id } = pkg;
    if (_package) {
      libraryMap[id || _package] = library;
    }
    packagesMap[id || _package] = pkg;
    if (renderUrls) {
      libraryAsset.push(renderUrls);
    } else if (urls) {
      libraryAsset.push(urls);
    }
  });

  const assetLoader = new AssetLoader();
  await assetLoader.load(libraryAsset);

  let newComponents = rawComponents;
  if (rawComponents && rawComponents.length) {
    const componentDescriptions: ComponentDescription[] = [];
    const remoteComponentDescriptions: RemoteComponentDescription[] = [];
    rawComponents.forEach((component: any) => {
      if (!component) {
        return;
      }
      if (component.exportName && component.url) {
        remoteComponentDescriptions.push(component);
      } else {
        componentDescriptions.push(component);
      }
    });
    newComponents = [...componentDescriptions];

    // 如果有远程组件描述协议，则自动加载并补充到资产包中，同时出发 designer.incrementalAssetsReady 通知组件面板更新数据
    if (remoteComponentDescriptions && remoteComponentDescriptions.length) {
      await Promise.all(
        remoteComponentDescriptions.map(async (component: any) => {
          const { exportName, url, npm } = component;
          await (new AssetLoader()).load(url);
          function setAssetsComponent(component: any, extraNpmInfo: any = {}) {
            const components = component.components;
            if (Array.isArray(components)) {
              components.forEach(d => {
                newComponents = newComponents.concat({
                  npm: {
                    ...npm,
                    ...extraNpmInfo,
                  },
                  ...d,
                } || []);
              });
              return;
            }
            newComponents = newComponents.concat({
              npm: {
                ...npm,
                ...extraNpmInfo,
              },
              ...component.components,
            } || []);
            // assets.componentList = assets.componentList.concat(component.componentList || []);
          }
          function setArrayAssets(value: any[], preExportName: string = '', preSubName: string = '') {
            value.forEach((d: any, i: number) => {
              const exportName = [preExportName, i.toString()].filter(d => !!d).join('.');
              const subName = [preSubName, i.toString()].filter(d => !!d).join('.');
              Array.isArray(d) ? setArrayAssets(d, exportName, subName) : setAssetsComponent(d, {
                exportName,
                subName,
              });
            });
          }
          if (window[exportName]) {
            if (Array.isArray(window[exportName])) {
              setArrayAssets(window[exportName] as any);
            } else {
              setAssetsComponent(window[exportName] as any);
            }
          }
          return window[exportName];
        }),
      );
    }
  }
  const lowcodeComponentsArray = [];
  const proCodeComponentsMap = newComponents.reduce((acc, cur) => {
    if ((cur.devMode || '').toLowerCase() === 'lowcode') {
      lowcodeComponentsArray.push(cur);
    } else {
      acc[cur.componentName] = {
        ...(cur.reference || cur.npm),
        componentName: cur.componentName,
      };
    }
    return acc;
  }, {})


  function genLowCodeComponentsMap(components) {
    const lowcodeComponentsMap = {};
    lowcodeComponentsArray.forEach((lowcode) => {
      const id = lowcode.reference?.id;
      const schema = packagesMap[id]?.schema;
      const comp = genLowcodeComp(schema, {...components, ...lowcodeComponentsMap});
      lowcodeComponentsMap[lowcode.componentName] = comp;
    });
    return lowcodeComponentsMap;
  }


  let components = await injectComponents(buildComponents(libraryMap, proCodeComponentsMap));

  const lowCodeComponents = genLowCodeComponentsMap(components);


  return {
    components: { ...components, ...lowCodeComponents }
  }
}
