import { ILowCodePluginContext } from '@alilc/lowcode-engine';
import { Button } from '@alifd/next';
import {
  preview,
} from '../../utils';

// 保存功能示例
const PreviewSample = (ctx: ILowCodePluginContext) => {
  return {
    async init() {
      const { skeleton } = ctx;
        skeleton.add({
          name: 'previewSample',
          area: 'topArea',
          type: 'Widget',
          props: {
            align: 'right',
          },
          content: (
            <Button type="primary" onClick={() => preview()}>
              预览
            </Button>
          ),
        });
    },
  };
}
PreviewSample.pluginName = 'preview-sample';
export default PreviewSample;