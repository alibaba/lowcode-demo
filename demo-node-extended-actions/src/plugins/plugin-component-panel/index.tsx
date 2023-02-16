import { IPublicModelPluginContext } from '@alilc/lowcode-types';
import ComponentsPane from '@alilc/lowcode-plugin-components-pane';
const ComponentPanelPlugin = (ctx: IPublicModelPluginContext) => {
  return {
    async init() {
      const { skeleton, project } = ctx;
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
ComponentPanelPlugin.pluginName = 'ComponentPanelPlugin';
export default ComponentPanelPlugin;