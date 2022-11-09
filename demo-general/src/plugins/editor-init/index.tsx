import { ILowCodePluginContext } from '@alilc/lowcode-engine';
import { injectAssets } from '@alilc/lowcode-plugin-inject';
import assets from '../../assets.json';
import {
  getPageSchema,
} from '../../utils';
const EditorInit = (ctx: ILowCodePluginContext) => {
  return {
    async init() {
      // 修改面包屑组件的分隔符属性setter
      // const assets = await (
      //   await fetch(
      //     `https://alifd.alicdn.com/npm/@alilc/lowcode-materials/build/lowcode/assets-prod.json`
      //   )
      // ).json();
      // 设置物料描述
      const { material, project } = ctx;

      await material.setAssets(await injectAssets(assets));

      const schema = await getPageSchema();

      // 加载 schema
      project.openDocument(schema);
    },
  };
}
EditorInit.pluginName = 'editorInit';
export default EditorInit;