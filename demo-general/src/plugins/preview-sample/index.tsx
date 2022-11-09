import { ILowCodePluginContext } from '@alilc/lowcode-engine';
import { Button } from '@alifd/next';
import {
  preview,
} from '../../utils';

// 保存功能示例
const PreviewSample = (ctx: ILowCodePluginContext) => {
  return {
    async init() {
      const { skeleton, config } = ctx;
      const doPreview = () => {
        const scenarioName = config.get('scenarioName');
        console.log('go preview with scenarioName:',scenarioName )
        preview(scenarioName);
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
PreviewSample.pluginName = 'preview-sample';
export default PreviewSample;