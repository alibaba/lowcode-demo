import { ILowCodePluginContext, project } from '@alilc/lowcode-engine';
import { CompositeObject, TransformStage } from '@alilc/lowcode-types';

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
