import {
  plugins,
} from '@alilc/lowcode-engine';
// 注册到引擎
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

export default async function registerPlugins() {
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

  await plugins.register(SaveSample);

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
