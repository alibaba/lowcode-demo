import { IPublicModelPluginContext } from '@alilc/lowcode-types';
import { Button } from '@alifd/next';

// 保存功能示例
const PreviewSamplePlugin = (ctx: IPublicModelPluginContext) => {
  return {
    async init() {
      const { skeleton, config, workspace } = ctx;
      const doPreview = () => {
        const scenarioName = config.get('scenarioName');
        workspace.windows.forEach(d => d.save());
        setTimeout(() => {
          const search = location.search ? `${location.search}&scenarioName=${scenarioName}` : `?scenarioName=${scenarioName}`;
          window.open(`./preview.html${search}`);
        }, 500);
      };
      skeleton.add({
        name: 'previewSample',
        area: 'topArea',
        type: 'Widget',
        props: {
          align: 'right',
        },
        content: (
          <Button type="primary" onClick={() => doPreview()}>
            预览
          </Button>
        ),
      });
    },
  };
}
PreviewSamplePlugin.pluginName = 'PreviewSamplePlugin';
PreviewSamplePlugin.meta = {
  dependencies: [],
};
export default PreviewSamplePlugin;