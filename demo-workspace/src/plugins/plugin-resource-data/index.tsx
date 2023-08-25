import { IPublicModelPluginContext, IPublicResourceData } from '@alilc/lowcode-types';
import { getResourceListFromLocalStorage, setResourceListToLocalStorage } from '../../services/mockService';

export function pluginResourceData(ctx: IPublicModelPluginContext) {
  const { workspace } = ctx;

  function updateResourceList(list: {
    title: string;
    slug: string;
  }[]) {
    workspace.setResourceList([
      ...list.map((d) => ({
        resourceName: 'page',
        title: d.title,
        id: d.slug,
        category: '页面',
        config: {
        },
        options: {
          title: d.title,
          slug: d.slug,
          id: d.slug
        },
      } as IPublicResourceData)),
    ])
  }

  return {
    exports() {
      const scenarioName = ctx.config.get('scenarioName');
      return {
        update(list: {
          title: string;
          slug: string;
        }[]) {
          setResourceListToLocalStorage(scenarioName, list);
          updateResourceList(list);
        }
      }
    },
    async init() {
      const scenarioName = ctx.config.get('scenarioName');
      const pageList: {
        title: string;
        slug: string;
        id: string,
      }[] = await getResourceListFromLocalStorage(scenarioName)

      setResourceListToLocalStorage(scenarioName, pageList);

      updateResourceList(pageList);
    },

  }
}

pluginResourceData.pluginName = 'pluginResourceData';

export default pluginResourceData;