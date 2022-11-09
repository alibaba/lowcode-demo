import { ILowCodePluginContext } from '@alilc/lowcode-engine';
import { injectAssets } from '@alilc/lowcode-plugin-inject';
import assets from '../../assets.json';
import defaultSchema from '../../schema.json';
import {
  getPageSchema,
} from '../../utils';
const EditorInitPlugin = (ctx: ILowCodePluginContext) => {
  return {
    async init() {
      // 设置物料描述
      const { material, project } = ctx;

      await material.setAssets(await injectAssets(assets));

      const schema = await getPageSchema();

      // 加载 schema
      project.openDocument(schema || defaultSchema);
    },
  };
}
EditorInitPlugin.pluginName = 'EditorInitPlugin';
export default EditorInitPlugin;