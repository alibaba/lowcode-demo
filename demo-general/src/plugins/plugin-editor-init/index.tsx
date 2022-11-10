import { ILowCodePluginContext } from '@alilc/lowcode-engine';
import { injectAssets } from '@alilc/lowcode-plugin-inject';
import assets from '../../assets.json';
import {
  getPageSchema,
} from '../../utils';
const EditorInitPlugin = (ctx: ILowCodePluginContext, options: any) => {
  return {
    async init() {
      const { material, project, config } = ctx;
      const scenarioName = options['scenarioName'];
      // 保存在config中用于引擎范围其他插件使用
      config.set('scenarioName', scenarioName);

      // 设置物料描述

      await material.setAssets(await injectAssets(assets));

      const schema = await getPageSchema();

      // 加载 schema
      project.openDocument(schema);
    },
  };
}
EditorInitPlugin.pluginName = 'EditorInitPlugin';
EditorInitPlugin.meta = {
  preferenceDeclaration: {
    title: '保存插件配置',
    properties: [
      {
        key: 'scenarioName',
        type: 'string',
        description: '用于localstorage存储key',
      }
    ],
  },
}
export default EditorInitPlugin;