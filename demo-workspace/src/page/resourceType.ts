// @ts-ignore
import { IPublicModelPluginContext, IPublicTypeResourceType } from '@alilc/lowcode-types';
import { pageView } from './pageView';
import { PageIcon } from '../icon';

const pageResourceType: IPublicTypeResourceType = (ctx: IPublicModelPluginContext) => {
  return {
    category: '页面',
    description: '页面',
    // 默认视图类型
    defaultViewName: 'page',
    // defaultTitle: window.pageConfig.title,
    // 当前资源视图
    editorViews: [pageView],
    icon: PageIcon,
    async import(schema: any) {
      return {
        page: schema,
      };
    },
    async save({
      page,
    }) {
      return page;
    }
  }
}

pageResourceType.resourceName = 'page';
pageResourceType.resourceType = 'editor';

export default pageResourceType;
