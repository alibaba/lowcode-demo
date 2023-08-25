import { IPublicModelPluginContext } from '@alilc/lowcode-types';
import { injectAssets } from '@alilc/lowcode-plugin-inject';
import assets from '../../services/assets.json';
import { getProjectSchema } from '../../services/mockService';

const EditorInitPlugin = (ctx: IPublicModelPluginContext) => {
  return {
    async init() {
      const { material, project, config, editorWindow } = ctx;
      const scenarioName = config.get('scenarioName');

      // 设置物料描述
      await material.setAssets(await injectAssets(assets));

      const schema = await getProjectSchema(scenarioName + editorWindow.resource?.options.id);
      // 加载 schema
      project.importSchema(schema as any);
    },
  };
}
EditorInitPlugin.pluginName = 'EditorInitPlugin';
EditorInitPlugin.meta = {};
export default EditorInitPlugin;