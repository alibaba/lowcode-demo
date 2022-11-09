import { init, plugins } from '@alilc/lowcode-engine';
import { createFetchHandler } from '@alilc/lowcode-datasource-fetch-handler'
import EditorInit from './plugins/editor-init';
import UndoRedoPlugin from '@alilc/lowcode-plugin-undo-redo';
import ZhEnPlugin from '@alilc/lowcode-plugin-zh-en';
import CodeGenPlugin from '@alilc/lowcode-plugin-code-generator';
import DataSourcePanePlugin from '@alilc/lowcode-plugin-datasource-pane';
import SchemaPlugin from '@alilc/lowcode-plugin-schema';
import CodeEditor from "@alilc/lowcode-plugin-code-editor";
import ManualPlugin from "@alilc/lowcode-plugin-manual";
import Inject from '@alilc/lowcode-plugin-inject';
import SimulatorResizer from '@alilc/lowcode-plugin-simulator-select';
import BuiltinPluginRegistry from './plugins/builtin-plugin-registry';
import SetterRegistry from './plugins/ext-setters-registry';
import LoadAssetsSample from './plugins/load-assets-sample';
import SaveSample from './plugins/save-sample';
import PreviewSample from './plugins/preview-sample';
import CustomSetterSample from './plugins/custom-setter-sample';
import RegisterRefProp from 'src/plugins/set-ref-prop';
import './global.scss';

async function registerPlugins() {
  await plugins.register(ManualPlugin);

  await plugins.register(Inject);

  await plugins.register(RegisterRefProp);

  await plugins.register(SchemaPlugin);

  await plugins.register(SimulatorResizer);

  await plugins.register(EditorInit);

  await plugins.register(BuiltinPluginRegistry);

  // 设置内置 setter 和事件绑定、插件绑定面板
  await plugins.register(SetterRegistry);

  // 注册回退/前进
  await plugins.register(UndoRedoPlugin);

  // 注册中英文切换
  await plugins.register(ZhEnPlugin);

  await plugins.register(LoadAssetsSample);

  await plugins.register(SaveSample, { scenarioName: 'general' });

  // 插件参数声明 & 传递，参考：https://www.yuque.com/lce/doc/ibh9fh#peEmG
  await plugins.register(DataSourcePanePlugin, {
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

  await plugins.register(CodeEditor);

  // 注册出码插件
  await plugins.register(CodeGenPlugin);

  await plugins.register(PreviewSample);

  await plugins.register(CustomSetterSample);
};

(async function main() {
  await registerPlugins();

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
  });
})();
