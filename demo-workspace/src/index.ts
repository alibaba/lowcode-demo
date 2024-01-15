import { init, workspace } from '@alilc/lowcode-engine';
import { createFetchHandler } from '@alilc/lowcode-datasource-fetch-handler'
import ZhEnPlugin from '@alilc/lowcode-plugin-zh-en';
import SchemaPlugin from '@alilc/lowcode-plugin-schema';
import pageResourceType from './page/resourceType';
import LogoSamplePlugin from './plugins/plugin-logo-sample';
import WorkspaceEmptyPlugin from './plugins/plugin-workspace-empty';

import pluginResourceData from './plugins/plugin-resource-data';
import InjectPlugin from '@alilc/lowcode-plugin-inject';

// 应用级顶部二级面板
import pluginResourceTabs from '@alilc/lowcode-plugin-resource-tabs';

// 应用级左侧面板
import pluginViewManagerPane from '@alilc/lowcode-plugin-view-manager-pane';

import controller from './viewController';
import SaveSamplePlugin from './plugins/plugin-save-sample';
import PreviewSamplePlugin from './plugins/plugin-preview-sample';
import SimulatorLocalePlugin from './plugins/plugin-simulator-locale';
import DefaultSettersDialogRegistryPlugin from './plugins/plugin-default-setters-dialog-registry'

import appHelper from './appHelper';
import './global.scss';
import { IPublicModelPluginContext, IPublicModelResource, IPublicModelWindow, IPublicTypeContextMenuAction } from '@alilc/lowcode-types';

(async function main() {
  // 注册应用级资源类型
  workspace.registerResourceType(pageResourceType);

  await workspace.plugins.register(InjectPlugin);

  await workspace.plugins.register(LogoSamplePlugin, {
    scenarioName: 'general',
    displayName: '综合场景',
    info: {
      urls: [
        {
          key: '设计器',
          value: 'https://github.com/alibaba/lowcode-demo/tree/main/demo-general',
        },
        {
          key: 'fusion-ui 物料',
          value: 'https://github.com/alibaba/lowcode-materials/tree/main/packages/fusion-ui',
        },
        {
          key: 'fusion 物料',
          value: 'https://github.com/alibaba/lowcode-materials/tree/main/packages/fusion-lowcode-materials',
        }
      ],
    },
  });

  await workspace.plugins.register(SchemaPlugin, { isProjectSchema: true });

  // 注册中英文切换
  await workspace.plugins.register(ZhEnPlugin);

  await workspace.plugins.register(WorkspaceEmptyPlugin);

  await workspace.plugins.register(pluginResourceData);

  await workspace.plugins.register(SaveSamplePlugin);

  await workspace.plugins.register(PreviewSamplePlugin);

  await workspace.plugins.register(DefaultSettersDialogRegistryPlugin);

  // 应用级顶部二级面板
  await workspace.plugins.register(pluginResourceTabs, {
    appKey: 'general',
    shape: 'text',
    tabContextMenuActions: (ctx: IPublicModelPluginContext, resource: IPublicModelResource): IPublicTypeContextMenuAction[] => {
      return [
        {
          name: 'close',
          title: '关闭',
          action: () => {
            ctx.workspace.removeEditorWindow(resource);
          },
        },
        {
          name: 'closeOthers',
          title: '关闭其他',
          action: () => {
            workspace.windows.forEach((editorWindow: IPublicModelWindow) => {
              if (editorWindow.resource?.id !== resource.id) {
                editorWindow.resource && ctx.workspace.removeEditorWindow(editorWindow.resource);
              }
            });
          },
          disabled: () => workspace.windows.length <= 1,
        }
      ]
    }
  });

  // 设计器区域多语言切换
  await workspace.plugins.register(SimulatorLocalePlugin);

  // 应用级左侧面板
  await workspace.plugins.register(pluginViewManagerPane, {
    init: controller.init,
    contextMenuActions: (ctx: IPublicModelPluginContext) => ([
      {
        name: 'add',
        title: '添加页面',
        action: controller.onAddPage,
      },
    ]),
    resourceContextMenuActions: (ctx: IPublicModelPluginContext, resource: IPublicModelResource) => ([
      {
        name: 'delete',
        title: '删除页面',
        action: () => {
          controller.onDeletePage(resource);
        },
      }
    ]),
    skeletonConfig: {
      panelProps: {
        width: '200px',
        area: 'leftFixedArea',
      }
    },
    showIconText: false,
  });

  init(document.getElementById('lce-container')!, {
    locale: 'zh-CN',
    enableWorkspaceMode: true,
    enableAutoOpenFirstWindow: false,
    enableCondition: true,
    enableCanvasLock: true,
    // 默认绑定变量
    supportVariableGlobally: true,
    requestHandlersMap: {
      fetch: createFetchHandler(),
    },
    appHelper,
    enableContextMenu: true,
  });
})();
