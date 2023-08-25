import { material, project } from '@alilc/lowcode-engine';
import { filterPackages } from '@alilc/lowcode-plugin-inject'
import { Message, Dialog } from '@alifd/next';
import { IPublicTypeProjectSchema, IPublicEnumTransformStage, IPublicModelPluginContext } from '@alilc/lowcode-types';
import DefaultPageSchema from './defaultPageSchema.json';
import DefaultI18nSchema from './defaultI18nSchema.json';

const generateProjectSchema = (pageSchema: any, i18nSchema: any): IPublicTypeProjectSchema => {
  return {
    componentsTree: [pageSchema],
    componentsMap: material.componentsMap as any,
    version: '1.0.0',
    i18n: i18nSchema,
  };
}


export const saveSchema = async (scenarioName: string = 'unknown', id: string, ctx: IPublicModelPluginContext) => {
  setProjectSchemaToLocalStorage(scenarioName, id, ctx);
  await setPackagesToLocalStorage(scenarioName, id, ctx);
  Message.success('成功保存到本地');
};

export const resetSchema = async (scenarioName: string = 'unknown') => {
  try {
    await new Promise<void>((resolve, reject) => {
      Dialog.confirm({
        content: '确定要重置吗？您所有的修改都将消失！',
        onOk: () => {
          resolve();
        },
        onCancel: () => {
          reject()
        },
      })
    })
  } catch(err) {
    return;
  }
  const defaultSchema = generateProjectSchema(DefaultPageSchema, DefaultI18nSchema);

  project.importSchema(defaultSchema as any);
  project.simulatorHost?.rerender();

  setProjectSchemaToLocalStorage(scenarioName);
  await setPackagesToLocalStorage(scenarioName);
  Message.success('成功重置页面');
}

const getLSName = (scenarioName: string, id: string, ns: string = 'projectSchema') => `${scenarioName}:${id}:${ns}`;

const getResourceName = (scenarioName: string, ns: string = 'resourceList') => `${scenarioName}:${ns}`;

export const setResourceListToLocalStorage = async (scenarioName: string, list: any) => {
  if (!scenarioName) {
    console.error('scenarioName is required!');
    return;
  }

  window.localStorage.setItem(
    getResourceName(scenarioName),
    JSON.stringify(list)
  );
}

export const getResourceListFromLocalStorage = async (scenarioName: string) => {
  if (!scenarioName) {
    console.error('scenarioName is required!');
    return;
  }
  return JSON.parse(window.localStorage.getItem(getResourceName(scenarioName)) || '[{"title":"首页","slug":"index","id": "index"}]');
}

export const getProjectSchemaFromLocalStorage = (scenarioName: string, id: string) => {
  if (!scenarioName) {
    console.error('scenarioName is required!');
    return;
  }
  const localValue = window.localStorage.getItem(getLSName(scenarioName, id));
  if (localValue) {
    return JSON.parse(localValue);
  }
  return undefined;
}

const setProjectSchemaToLocalStorage = (scenarioName: string, id: string, ctx: IPublicModelPluginContext) => {
  if (!scenarioName) {
    console.error('scenarioName is required!');
    return;
  }
  window.localStorage.setItem(
    getLSName(scenarioName, id),
    JSON.stringify(ctx.project.exportSchema(IPublicEnumTransformStage.Save))
  );
}

const setPackagesToLocalStorage = async (scenarioName: string, id: string, ctx: IPublicModelPluginContext) => {
  if (!scenarioName) {
    console.error('scenarioName is required!');
    return;
  }
  const packages = await filterPackages(ctx.material.getAssets().packages);
  window.localStorage.setItem(
    getLSName(scenarioName, id, 'packages'),
    JSON.stringify(packages),
  );
}

export const getPackagesFromLocalStorage = (scenarioName: string, id: string) => {
  if (!scenarioName) {
    console.error('scenarioName is required!');
    return;
  }
  return JSON.parse(window.localStorage.getItem(getLSName(scenarioName, id, 'packages')) || '{}');
}

export const getProjectSchema = async (scenarioName: string = 'unknown') : Promise<IPublicTypeProjectSchema> => {
  const pageSchema = await getPageSchema(scenarioName);
  return generateProjectSchema(pageSchema, DefaultI18nSchema);
};

export const getPageSchema = async (scenarioName: string = 'unknown', id: string) => {
  const pageSchema = getProjectSchemaFromLocalStorage(scenarioName, id)?.componentsTree?.[0];
  if (pageSchema) {
    return pageSchema;
  }

  return DefaultPageSchema;
};

export const getPreviewLocale = (scenarioName: string) => {
  const key = getLSName(scenarioName, 'previewLocale');
  return window.localStorage.getItem(key) || 'zh-CN';
}

export const setPreviewLocale = (scenarioName: string, locale: string) => {
  const key = getLSName(scenarioName, 'previewLocale');
  window.localStorage.setItem(key, locale || 'zh-CN');
  window.location.reload();
}
