import { common, plugins, config } from '@alilc/lowcode-engine';
import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { createFetchHandler } from '@alilc/lowcode-datasource-fetch-handler'
import { scenarioSwitcher } from '../../sample-plugins/scenario-switcher';
import registerPlugins from '../../universal/plugin';
import '../../universal/global.scss';

(async function main() {
  await plugins.register(scenarioSwitcher);
  await registerPlugins();

  const Workbench = common.skeletonCabin.Workbench;
  function EditorView() {
    /** 插件是否已初始化成功，因为必须要等插件初始化后才能渲染 Workbench */
    const [hasPluginInited, setHasPluginInited] = useState(false);

    useEffect(() => {
      plugins.init().then(() => {
        setHasPluginInited(true);
      }).catch(err => console.error(err));
    }, []);

    return hasPluginInited && <Workbench />;
  }

  config.setConfig({
    enableCondition: true,
    enableCanvasLock: true,
    // 默认绑定变量
    supportVariableGlobally: true,
    requestHandlersMap: {
      fetch: createFetchHandler()
    }
  })

  ReactDOM.render(<EditorView />, document.getElementById('lce-container')!);
})();
