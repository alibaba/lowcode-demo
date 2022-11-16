import { ILowCodePluginContext } from '@alilc/lowcode-engine';
export interface IProps {
  logo?: string;
  href?: string;
}

const RemoveCopyActionPlugin = (ctx: ILowCodePluginContext) => {
  return {
    async init() {
      const { removeBuiltinComponentAction } = ctx.material;
      removeBuiltinComponentAction('copy');
    },
  };
}
RemoveCopyActionPlugin.pluginName = 'RemoveCopyActionPlugin';
export default RemoveCopyActionPlugin;