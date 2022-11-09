import { ILowCodePluginContext } from '@alilc/lowcode-engine';
import { Button } from '@alifd/next';
import {
  saveSchema,
  resetSchema,
} from '../../utils';

// 保存功能示例
const SaveSample = (ctx: ILowCodePluginContext, options: any) => {
  return {
    async init() {
      const { skeleton, hotkey, config } = ctx;
      const scenarioName = options['scenarioName'];
      // 保存在config中用于引擎范围其他插件使用
      config.set('scenarioName', scenarioName);

      skeleton.add({
        name: 'saveSample',
        area: 'topArea',
        type: 'Widget',
        props: {
          align: 'right',
        },
        content: (
          <Button onClick={() => saveSchema(scenarioName)}>
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
          <Button onClick={() => resetSchema(scenarioName)}>
            重置页面
          </Button>
        ),
      });
      hotkey.bind('command+s', (e) => {
        e.preventDefault();
        saveSchema(scenarioName);
      });
    },
  };
}
SaveSample.pluginName = 'save-sample';
SaveSample.meta = {
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
export default SaveSample;