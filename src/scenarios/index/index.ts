import { init, plugins } from '@alilc/lowcode-engine';
import { createFetchHandler } from '@alilc/lowcode-datasource-fetch-handler'
import registerPlugins from '../../universal/plugin';
import { scenarioSwitcher } from '../../sample-plugins/scenario-switcher';
import '../../universal/global.scss';

const preference = new Map();
preference.set('DataSourcePane', {
  importPlugins: [],
  dataSourceTypes: [
    {
      type: 'fetch',
    },
    {
      type: 'jsonp',
    }
  ]
});

(async function main() {
  await plugins.register(scenarioSwitcher);
  await registerPlugins();

  init(document.getElementById('lce-container')!, {
    // designMode: 'live',
    // locale: 'zh-CN',
    enableCondition: true,
    enableCanvasLock: true,
    // 默认绑定变量
    supportVariableGlobally: true,
    requestHandlersMap: {
      fetch: createFetchHandler()
    }
  }, preference);
})();
