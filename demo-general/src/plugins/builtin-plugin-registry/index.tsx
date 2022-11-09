import { ILowCodePluginContext, project } from '@alilc/lowcode-engine';
import React from 'react';

import './index.scss';
import ComponentsPane from '@alilc/lowcode-plugin-components-pane';
import { PluginProps } from '@alilc/lowcode-types';
export interface IProps {
  logo?: string;
  href?: string;
}


const Logo: React.FC<IProps & PluginProps> = (props): React.ReactElement => {
  return (
    <div className="lowcode-plugin-logo">
      <a className="logo" target="blank" href={props.href || 'https://lowcode-engine.cn'} style={{ backgroundImage: `url(${props.logo})` }} />
    </div>
  );
};
// 注册一些常用内置扩展
const BuiltinPluginRegistry = (ctx: ILowCodePluginContext) => {
  return {
    async init() {
      const { skeleton } = ctx;
      // 注册 logo 面板
      skeleton.add({
        area: 'topArea',
        type: 'Widget',
        name: 'logo',
        content: Logo,
        contentProps: {
          logo: 'https://img.alicdn.com/imgextra/i4/O1CN013w2bmQ25WAIha4Hx9_!!6000000007533-55-tps-137-26.svg',
          href: 'https://lowcode-engine.cn',
        },
        props: {
          align: 'left',
        },
      });

      // 注册组件面板
      const componentsPane = skeleton.add({
        area: 'leftArea',
        type: 'PanelDock',
        name: 'componentsPane',
        content: ComponentsPane,
        contentProps: {},
        props: {
          align: 'top',
          icon: 'zujianku',
          description: '组件库',
        },
      });
      componentsPane?.disable?.();
      project.onSimulatorRendererReady(() => {
        componentsPane?.enable?.();
      })
    },
  };
}
BuiltinPluginRegistry.pluginName = 'builtin-plugin-registry';
export default BuiltinPluginRegistry;