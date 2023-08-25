import { IPublicModelPluginContext } from '@alilc/lowcode-types';
import { Button } from '@alifd/next';
import {
  resetSchema,
} from '../../services/mockService';

// 保存功能示例
const ResetPlugin = (ctx: IPublicModelPluginContext) => {
  return {
    async init() {
      const { skeleton, hotkey, config, workspace } = ctx;
      const scenarioName = config.get('scenarioName');

      skeleton.add({
        name: 'resetSchema',
        area: 'topArea',
        type: 'Widget',
        props: {
          align: 'right',
        },
        content: (
          <Button onClick={() => resetSchema(scenarioName)}>
            重置页面
          </Button>
        ),
      });
    },
  };
}
ResetPlugin.pluginName = 'ResetPlugin';
ResetPlugin.meta = {
  dependencies: [],
};
export default ResetPlugin;