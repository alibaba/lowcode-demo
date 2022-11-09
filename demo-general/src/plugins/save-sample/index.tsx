import { ILowCodePluginContext } from '@alilc/lowcode-engine';
import { Button } from '@alifd/next';
import {
  saveSchema,
  resetSchema,
} from '../../utils';

// 保存功能示例
const SaveSample = (ctx: ILowCodePluginContext) => {
  return {
    async init() {
      const { skeleton, hotkey } = ctx;

      skeleton.add({
        name: 'saveSample',
        area: 'topArea',
        type: 'Widget',
        props: {
          align: 'right',
        },
        content: (
          <Button onClick={() => saveSchema()}>
            保存到本地
          </Button>
        ),
      });
      skeleton.add({
        name: 'resetSchema',
        area: 'topArea',
        type: 'Widget',
        props: {
          align: 'right',
        },
        content: (
          <Button onClick={() => resetSchema()}>
            重置页面
          </Button>
        ),
      });
      hotkey.bind('command+s', (e) => {
        e.preventDefault();
        saveSchema();
      });
    },
  };
}
SaveSample.pluginName = 'save-sample';
export default SaveSample;