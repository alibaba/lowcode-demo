import { IPublicModelPluginContext } from '@alilc/lowcode-types';
import { IDesigner } from '@alilc/lce-graph-x6-designer';
import * as React from 'react';
import { Markup } from '@antv/x6';
import ReactDOM from 'react-dom';

/**
 * X6 Designer 业务自定义扩展插件
 */
function pluginX6DesignerExtension(ctx: IPublicModelPluginContext) {
  return {
    init() {
      // 获取 x6 designer 内置插件的导出 api
      const x6Designer = ctx.plugins['plugin-x6-designer'] as IDesigner;

      x6Designer.onNodeRender((model, node) => {
        // @ts-ignore
        // 自定义 node 渲染逻辑
        const { name, title } = model.propsData;
        node.attr('text/textWrap/text', title || name);
      });

      x6Designer.onEdgeRender((model, edge) => {
        // @ts-ignore
        const { source, target, sourcePortId, targetPortId } = model.propsData;
        console.log(sourcePortId, targetPortId);
        requestAnimationFrame(() => {
          edge.setSource({ cell: source, port: sourcePortId });
          edge.setTarget({ cell: target, port: targetPortId });
        });

        // https://x6.antv.vision/zh/docs/tutorial/intermediate/edge-labels x6 标签模块
        // appendLabel 会触发 onEdgeLabelRender
        edge.appendLabel({
          markup: Markup.getForeignObjectMarkup(),
          attrs: {
            fo: {
              width: 120,
              height: 30,
              x: -60,
              y: -15,
            },
          },
        });
      });

      x6Designer.onEdgeLabelRender((args) => {
        const { selectors } = args
        const content = selectors.foContent as HTMLDivElement
        if (content) {
          ReactDOM.render(<div>自定义 react 标签</div>, content)
        }
      })
    }
  }
}

pluginX6DesignerExtension.pluginName = 'plugin-x6-designer-extension';

export default pluginX6DesignerExtension;