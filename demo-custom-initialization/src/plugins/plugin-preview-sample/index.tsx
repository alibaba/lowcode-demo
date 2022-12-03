import { ILowCodePluginContext } from '@alilc/lowcode-engine';
import { Button } from '@alifd/next';
import {
  saveSchema,
} from '../../services/mockService';

// 保存功能示例
const PreviewSamplePlugin = (ctx: ILowCodePluginContext) => {
  return {
    async init() {
      const { skeleton, config } = ctx;
      const doPreview = () => {
        const scenarioName = config.get('scenarioName');
        saveSchema(scenarioName);
        setTimeout(() => {
          const search = location.search ? `${location.search}&scenarioName=${scenarioName}` : `?scenarioName=${scenarioName}`;
          window.open(`./preview.html${search}`);
        }, 500);
      };
      skeleton.add({
        name: 'previewSample',
        area: 'topArea',
        type: 'Widget',
        props: {
          align: 'right',
        },
        content: (
          <Button type="primary" onClick={() => doPreview()}>
            预览
          </Button>
        ),
      });
    },
  };
}
PreviewSamplePlugin.pluginName = 'PreviewSamplePlugin';
PreviewSamplePlugin.meta = {
  dependencies: ['EditorInitPlugin'],
};
export default PreviewSamplePlugin;