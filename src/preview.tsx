import ReactDOM from 'react-dom';
import React, { useState } from 'react';
import { Loading } from '@alifd/next';
import { buildComponents, assetBundle, AssetLevel, AssetLoader } from '@alilc/lowcode-utils';
import ReactRenderer from '@alilc/lowcode-react-renderer';
import { injectComponents } from '@alilc/lowcode-plugin-inject';
import { getProjectSchemaFromLocalStorage, getPackagesFromLocalStorage } from './universal/utils';

const getScenarioName = function() {
  if (location.search) {
   return new URLSearchParams(location.search.slice(1)).get('scenarioName') || 'index'
  }
  return 'index';
}

const SamplePreview = () => {
  const [data, setData] = useState({});

  async function init() {
    const scenarioName = getScenarioName();
    const packages = getPackagesFromLocalStorage(scenarioName);
    const projectSchema = getProjectSchemaFromLocalStorage(scenarioName);
    const { componentsMap: componentsMapArray, componentsTree } = projectSchema;
    const componentsMap: any = {};
    componentsMapArray.forEach((component: any) => {
      componentsMap[component.componentName] = component;
    });
    const schema = componentsTree[0];

    const libraryMap: {
      [packageName: string]: string;
    } = {};

    const assetLoader = new AssetLoader();

    for(let i = 0; i < packages.length; i++) {
      const { package: _package, library, urls, renderUrls, deps } = packages[i];
      libraryMap[_package] = library;
      if (renderUrls || urls) {
        await assetLoader.load(renderUrls || urls);
      }
    }

    const components = await injectComponents(buildComponents(libraryMap, componentsMap));

    setData({
      schema,
      components,
    });
  }

  const { schema, components } = data;

  if (!schema || !components) {
    init();
    return <Loading fullScreen />;
  }

  return (
    <div className="lowcode-plugin-sample-preview">
      <ReactRenderer
        className="lowcode-plugin-sample-preview-content"
        schema={schema}
        components={components}
      />
    </div>
  );
};

ReactDOM.render(<SamplePreview />, document.getElementById('ice-container'));
