import { IPublicModelPluginContext } from '@alilc/lowcode-types';
import { Button } from '@alifd/next';
import {
  resetSchema,
} from '../../services/mockService';

// 保存功能示例
const SaveSamplePlugin = (ctx: IPublicModelPluginContext) => {
  return {
    async init() {
      const { skeleton, hotkey, config, workspace } = ctx;
      const scenarioName = config.get('scenarioName');

      skeleton.add({
        name: 'saveSample',
        area: 'topArea',
        type: 'Widget',
        props: {
          align: 'right',
        },
        content: (
          <Button onClick={() => {
            workspace.windows.forEach(d => {
              d.save();
            })
          }}>
            保存到本地
          </Button>
        ),
      });
      hotkey.bind('command+s', (e) => {
        e.preventDefault();
        workspace.windows.forEach(d => {
          d.save();
        })
      });
    },
  };
}
SaveSamplePlugin.pluginName = 'SaveSamplePlugin';
SaveSamplePlugin.meta = {
  dependencies: [],
};
export default SaveSamplePlugin;