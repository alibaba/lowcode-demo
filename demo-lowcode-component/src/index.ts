import { init, plugins } from '@alilc/lowcode-engine';
import { createFetchHandler } from '@alilc/lowcode-datasource-fetch-handler'
import EditorInitPlugin from './plugins/plugin-editor-init';
import UndoRedoPlugin from '@alilc/lowcode-plugin-undo-redo';
import ZhEnPlugin from '@alilc/lowcode-plugin-zh-en';
import DataSourcePanePlugin from '@alilc/lowcode-plugin-datasource-pane';
import SchemaPlugin from '@alilc/lowcode-plugin-schema';
import CodeEditorPlugin from "@alilc/lowcode-plugin-code-editor";
import ManualPlugin from "@alilc/lowcode-plugin-manual";
import InjectPlugin from '@alilc/lowcode-plugin-inject';
import SimulatorResizerPlugin from '@alilc/lowcode-plugin-simulator-select';
import ComponentPanelPlugin from '@alilc/lowcode-plugin-components-pane';
import DefaultSettersRegistryPlugin from './plugins/plugin-default-setters-registry';
import SaveSamplePlugin from './plugins/plugin-save-sample';
import PreviewSamplePlugin from './plugins/plugin-preview-sample';
import SetRefPropPlugin from '@alilc/lowcode-plugin-set-ref-prop';
import LogoSamplePlugin from './plugins/plugin-logo-sample';
import './global.scss';

async function registerPlugins() {
  await plugins.register(EditorInitPlugin, {
    scenarioName: 'lowcode-component',
    displayName: '低代码组件',
    info: {
      urls: [
        {
          key: '设计器',
          value: 'https://github.com/alibaba/lowcode-demo/tree/main/demo-lowcode-component',
        },
      ],
    },
  });

  // 设置内置 setter 和事件绑定、插件绑定面板
  await plugins.register(DefaultSettersRegistryPlugin);

  await plugins.register(ComponentPanelPlugin);

  await plugins.register(LogoSamplePlugin);

  await plugins.register(SchemaPlugin);

  // 注册回退/前进
  await plugins.register(UndoRedoPlugin);

  // 注册中英文切换
  await plugins.register(ZhEnPlugin);

  await plugins.register(ManualPlugin);

  await plugins.register(InjectPlugin);

  await plugins.register(SetRefPropPlugin);

  await plugins.register(SimulatorResizerPlugin);


  // 插件参数声明 & 传递，参考：https://lowcode-engine.cn/site/docs/api/plugins#设置插件参数版本示例
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

  await plugins.register(CodeEditorPlugin);

  await plugins.register(SaveSamplePlugin);

  await plugins.register(PreviewSamplePlugin);
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
      'https://alifd.alicdn.com/npm/@alilc/lowcode-react-simulator-renderer@1.1.1/dist/css/react-simulator-renderer.css',
      'https://alifd.alicdn.com/npm/@alilc/lowcode-react-simulator-renderer@1.1.1/dist/js/react-simulator-renderer.js'
    ],
    requestHandlersMap: {
      fetch: createFetchHandler()
    },
  });
})();
