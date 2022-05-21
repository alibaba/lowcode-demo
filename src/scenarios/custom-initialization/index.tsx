import { common, plugins, config } from '@alilc/lowcode-engine';
import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { createFetchHandler } from '@alilc/lowcode-datasource-fetch-handler'
import { scenarioSwitcher } from '../../sample-plugins/scenario-switcher';
import registerPlugins from '../../universal/plugin';
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

  const Workbench = common.skeletonCabin.Workbench;
  function EditorView() {
    /** 插件是否已初始化成功，因为必须要等插件初始化后才能渲染 Workbench */
    const [hasPluginInited, setHasPluginInited] = useState(false);

    useEffect(() => {
      plugins.init(preference).then(() => {
        setHasPluginInited(true);
      }).catch(err => console.error(err));
    }, []);

    return hasPluginInited && <Workbench />;
  }

  config.setConfig({
    // designMode: 'live',
    // locale: 'zh-CN',
    enableCondition: true,
    enableCanvasLock: true,
    // 默认绑定变量
    supportVariableGlobally: true,
    // simulatorUrl 在当 engine-core.js 同一个父路径下时是不需要配置的！！！
    // 这里因为用的是 alifd cdn，在不同 npm 包，engine-core.js 和 react-simulator-renderer.js 是不同路径
    simulatorUrl: [
      'https://alifd.alicdn.com/npm/@alilc/lowcode-react-simulator-renderer@latest/dist/css/react-simulator-renderer.css',
      'https://alifd.alicdn.com/npm/@alilc/lowcode-react-simulator-renderer@latest/dist/js/react-simulator-renderer.js'
    ],
    requestHandlersMap: {
      fetch: createFetchHandler()
    }
  })

  ReactDOM.render(<EditorView />, document.getElementById('lce-container')!);
})();
