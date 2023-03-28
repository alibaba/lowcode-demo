import { IPublicModelPluginContext } from '@alilc/lowcode-types';
export interface IProps {
  logo?: string;
  href?: string;
}

const RemoveCopyActionPlugin = (ctx: IPublicModelPluginContext) => {
  return {
    async init() {
      const { material } = ctx;
      material.removeBuiltinComponentAction('copy');
    },
  };
}
RemoveCopyActionPlugin.pluginName = 'RemoveCopyActionPlugin';
export default RemoveCopyActionPlugin;