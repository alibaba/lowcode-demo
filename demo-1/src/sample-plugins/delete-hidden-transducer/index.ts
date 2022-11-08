import { ILowCodePluginContext, project } from '@alilc/lowcode-engine';
import { CompositeObject, TransformStage } from '@alilc/lowcode-types';

// Caution！该插件目前理论上不应该被使用，建议在你的应用中删除，假如删除后有问题，请提 issue 跟维护团队交流~
export const deleteHiddenTransducer = (ctx: ILowCodePluginContext) => {
  return {
    name: 'deleteHiddenTransducer',
    async init() {
      project.addPropsTransducer((props: CompositeObject): CompositeObject => {
        delete props.hidden;
        return props;
      }, TransformStage.Save);
    },
  };
}

deleteHiddenTransducer.pluginName = 'deleteHiddenTransducer';
