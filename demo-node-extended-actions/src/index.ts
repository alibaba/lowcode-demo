import { init, plugins } from '@alilc/lowcode-engine';
import { createFetchHandler } from '@alilc/lowcode-datasource-fetch-handler'
import EditorInitPlugin from './plugins/plugin-editor-init';
import UndoRedoPlugin from '@alilc/lowcode-plugin-undo-redo';
import ZhEnPlugin from '@alilc/lowcode-plugin-zh-en';
import CodeGenPlugin from '@alilc/lowcode-plugin-code-generator';
import DataSourcePanePlugin from '@alilc/lowcode-plugin-datasource-pane';
import SchemaPlugin from '@alilc/lowcode-plugin-schema';
import CodeEditorPlugin from "@alilc/lowcode-plugin-code-editor";
import ManualPlugin from "@alilc/lowcode-plugin-manual";
import InjectPlugin from '@alilc/lowcode-plugin-inject';
import SimulatorResizerPlugin from '@alilc/lowcode-plugin-simulator-select';
import ComponentPanelPlugin from '@alilc/lowcode-plugin-components-pane';
import DefaultSettersRegistryPlugin from './plugins/plugin-default-setters-registry';
import LoadIncrementalAssetsWidgetPlugin from './plugins/plugin-load-incremental-assets-widget';
import SaveSamplePlugin from './plugins/plugin-save-sample';
import PreviewSamplePlugin from './plugins/plugin-preview-sample';
import CustomSetterSamplePlugin from './plugins/plugin-custom-setter-sample';
import SetRefPropPlugin from '@alilc/lowcode-plugin-set-ref-prop';
import LogoSamplePlugin from './plugins/plugin-logo-sample';
import AddHelloActionPlugin from './plugins/plugin-add-hello-action';
import RemoveCopyActionPlugin from './plugins/plugin-remove-copy-action';
import './global.scss';


async function registerPlugins() {
  await plugins.register(InjectPlugin);

  await plugins.register(EditorInitPlugin, {
    scenarioName: 'node-extended-actions',
    displayName: '扩展节点操作项',
    info: {
      urls: [
        {
          key: '设计器',
          value: 'https://github.com/alibaba/lowcode-demo/tree/main/demo-node-extended-actions',
        },
      ],
    },
  });

  // 设置内置 setter 和事件绑定、插件绑定面板
  await plugins.register(DefaultSettersRegistryPlugin);

  await plugins.register(LogoSamplePlugin);

  await plugins.register(ComponentPanelPlugin);

  await plugins.register(SchemaPlugin);

  await plugins.register(ManualPlugin);
  // 注册回退/前进
  await plugins.register(UndoRedoPlugin);

  // 注册中英文切换
  await plugins.register(ZhEnPlugin);

  await plugins.register(SetRefPropPlugin);

  await plugins.register(SimulatorResizerPlugin);

  await plugins.register(LoadIncrementalAssetsWidgetPlugin);

  await plugins.register(SaveSamplePlugin);

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

  // 注册出码插件
  await plugins.register(CodeGenPlugin);

  await plugins.register(PreviewSamplePlugin);

  await plugins.register(CustomSetterSamplePlugin);
};

async function registerNodeActionPlugins() {
  await plugins.register(AddHelloActionPlugin);
  await plugins.register(RemoveCopyActionPlugin);
}

(async function main() {
  // 一般插件注册
  await registerPlugins();
  // node Actions 相关插件注册
  await registerNodeActionPlugins();

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
