import { init, plugins } from '@alilc/lowcode-engine';
import registerPlugins from './plugin';
import { scenarioSwitcher } from '../../sample-plugins/scenario-switcher';
import '../../universal/global.scss';
import { getDataSourcePreference } from '../../universal/utils';

(async function main() {
  await plugins.register(scenarioSwitcher);
  await registerPlugins();

  init(
    document.getElementById('lce-container')!,
    {
      enableCondition: true,
      enableCanvasLock: true,
      // 默认绑定变量
      supportVariableGlobally: true,
    },
    getDataSourcePreference(),
  );
})();
