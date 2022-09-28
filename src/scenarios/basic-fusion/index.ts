import { init, plugins } from '@alilc/lowcode-engine';
import { createFetchHandler } from '@alilc/lowcode-datasource-fetch-handler'
import registerPlugins from './plugin';
import { scenarioSwitcher } from '../../sample-plugins/scenario-switcher';
import '../../universal/global.scss';

(async function main() {
  await plugins.register(scenarioSwitcher);
  await registerPlugins();

  init(document.getElementById('lce-container')!, {
    enableCondition: true,
    enableCanvasLock: true,
    // 默认绑定变量
    supportVariableGlobally: true,
    requestHandlersMap: {
      fetch: createFetchHandler()
    }
  });
})();
