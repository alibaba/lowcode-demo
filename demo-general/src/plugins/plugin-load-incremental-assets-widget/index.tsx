import { ILowCodePluginContext } from '@alilc/lowcode-engine';
import { Button } from '@alifd/next';
import { loadIncrementalAssets } from '../../utils';
const LoadIncrementalAssetsWidgetPlugin = (ctx: ILowCodePluginContext) => {
  return {
    async init() {
      const { skeleton } = ctx;

      skeleton.add({
        name: 'loadAssetsSample',
        area: 'topArea',
        type: 'Widget',
        props: {
          align: 'right',
          width: 80,
        },
        content: (
          <Button onClick={loadIncrementalAssets}>
            异步加载资源
          </Button>
        ),
      });
    },
  };
}
LoadIncrementalAssetsWidgetPlugin.pluginName = 'LoadIncrementalAssetsWidgetPlugin';
export default LoadIncrementalAssetsWidgetPlugin;