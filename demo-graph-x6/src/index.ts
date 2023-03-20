import { plugins, init } from '@alilc/lowcode-engine';
import PluginX6Designer from '@alilc/lce-graph-x6-designer';
import PluginMaterialsPane from '@alilc/lce-graph-materials-pane';
import PluginCore from '@alilc/lce-graph-core';
import { RemoveItemPlugin, OperateButtonPlugin, UndoRedoPlugin, ZoomPlugin, logo } from '@alilc/lce-graph-tools';
import PluginX6DesignerExtension from './plugins/x6-designer-extension';
import assets from './services/assets.json';
import schema from './services/schema.json';
import { resetSchema, saveSchema } from './services/mockService';
import './global.scss';

(async function main() {
  await plugins.register(PluginCore, {
    assets,
    schema
  });
  await plugins.register(PluginX6Designer);
  await plugins.register(PluginMaterialsPane);
  await plugins.register(PluginX6DesignerExtension);
  await plugins.register(logo);
  await plugins.register(RemoveItemPlugin);
  await plugins.register(OperateButtonPlugin, [
    {
      callback: (schema: any) => {
        saveSchema('local');
      },
      name: 'save',
      text: '保存',
      hotkey: 'command+s',
    },
    {
      callback: (schema: any) => {
        console.log('发布回调', schema)
      },
      name: 'publish',
      text: '发布',
      hotkey: 'command+p',
    },
    {
      callback: (schema: any) => {
        console.log('自定义操作按钮回调', schema)
      },
      name: 'test',
      text: '测试自定义按钮',
      hotkey: 'command+0',
      btnProps: { type: 'secondary' },
    },
    {
      callback: () => {
        resetSchema('test');
      },
      name: 'reset',
      text: '重置'
    },
  ]);
  await plugins.register(UndoRedoPlugin);
  await plugins.register(ZoomPlugin);
  init();
})();
