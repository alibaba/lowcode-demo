import { IPublicModelPluginContext } from '@alilc/lowcode-types';
import AliLowCodeEngineExt from '@alilc/lowcode-engine-ext';

// 设置内置 setter 和事件绑定、插件绑定面板
const DefaultSettersDialogRegistryPlugin = (ctx: IPublicModelPluginContext) => {
  return {
    async init() {
      const { pluginMap } = AliLowCodeEngineExt;
      const { skeleton } = ctx;
      // 注册插件
      // 注册事件绑定面板
      skeleton.add({
        area: 'centerArea',
        type: 'Widget',
        content: pluginMap.EventBindDialog,
        name: 'eventBindDialog',
      });

      // 注册变量绑定面板
      skeleton.add({
        area: 'centerArea',
        type: 'Widget',
        content: pluginMap.VariableBindDialog,
        name: 'variableBindDialog',
      });
    },
  };
}
DefaultSettersDialogRegistryPlugin.pluginName = 'DefaultSettersDialogRegistryPlugin';
export default DefaultSettersDialogRegistryPlugin;