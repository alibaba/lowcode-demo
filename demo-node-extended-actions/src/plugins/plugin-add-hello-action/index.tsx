import React from 'react';
import { Icon, Message } from '@alifd/next';
import { ILowCodePluginContext, Node } from '@alilc/lowcode-engine';
export interface IProps {
  logo?: string;
  href?: string;
}

const AddHelloActionPlugin = (ctx: ILowCodePluginContext) => {
  return {
    async init() {
      const { addBuiltinComponentAction } = ctx.material;
      addBuiltinComponentAction({
        name: 'hello',
        content: {
          icon: <Icon type="atm" size="small" />,
          title: 'hello',
          action(node: Node) {
            Message.show('Welcome to Low-Code engine');
          },
        },
        condition: (node: Node) => {
          return node.componentMeta.componentName === 'NextTable';
        }
      });
    },
  };
}
AddHelloActionPlugin.pluginName = 'AddHelloActionPlugin';
export default AddHelloActionPlugin;