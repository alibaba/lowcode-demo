// @ts-ignore
import { init, plugins, workSpace } from '@alilc/lowcode-engine';
import { createFetchHandler } from '@alilc/lowcode-datasource-fetch-handler'
import registerPlugins from '../../universal/plugin';
import ComponentsPane from '@alilc/lowcode-plugin-components-pane';
import { scenarioSwitcher, viewSwitcher } from '../../sample-plugins/scenario-switcher';
// import Logo from '../sample-plugins/logo';
import ZhEnPlugin from '@alilc/lowcode-plugin-zh-en';
import UndoRedoPlugin from '@alilc/lowcode-plugin-undo-redo';
import '../../universal/global.scss';

(async function main() {
  // await plugins.register(scenarioSwitcher);
  // await registerPlugins();

  const ViewA = {
    name: 'editorViewA',
    // 资源初始化
    async init(ctx: any) {
      // 注册 plugin
      ctx.plugins.register(UndoRedoPlugin);
      ctx.plugins.register(viewSwitcher, {
        switchTo: 'editorViewB'
      });
    },
    async save(resource: any) {},
  }

  const ViewB = {
    name: 'editorViewB',
    // 资源初始化
    async init(ctx: any) {
      // 注册 plugin
      // ctx.plugins.register(saveButton);
      ctx.plugins.register(scenarioSwitcher);
      ctx.plugins.register(viewSwitcher, {
        switchTo: 'editorViewA'
      });
    },
    async save(resource: any) {},
  }

  workSpace.registerResourceType('page', 'editor', {
    name: 'page',
    description: '',
    // 默认视图类型
    defaultViewType: 'editorViewA',
    // 当前资源视图
    editorViews: [ViewA, ViewB],
    // 资源初始化
    async init(ctx: any) {
      // 注册 plugin
      ctx.plugins.register(ComponentsPane);
      ctx.skeleton.add()
    },
    async dispose() {},
  });

  init(document.getElementById('lce-container')!, {
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
    },
    // @ts-ignore
    // enableWorkspaceMode: true,
  });
})();
