import { material, project } from '@alilc/lowcode-engine';
import { filterPackages } from '@alilc/lowcode-plugin-inject'
import { Message, Dialog } from '@alifd/next';
import { TransformStage } from '@alilc/lowcode-types';

export const loadIncrementalAssets = () => {
  material?.onChangeAssets(() => {
    Message.success('[MCBreadcrumb] 物料加载成功');
  });

  material.loadIncrementalAssets({
    packages: [
      {
        title: 'MCBreadcrumb',
        package: 'mc-breadcrumb',
        version: '1.0.0',
        urls: [
          'https://unpkg.alibaba-inc.com/mc-breadcrumb@1.0.0/dist/MCBreadcrumb.js',
          'https://unpkg.alibaba-inc.com/mc-breadcrumb@1.0.0/dist/MCBreadcrumb.css',
        ],
        library: 'MCBreadcrumb',
      },
    ],
    components: [
      {
        componentName: 'MCBreadcrumb',
        title: 'MCBreadcrumb',
        docUrl: '',
        screenshot: '',
        npm: {
          package: 'mc-breadcrumb',
          version: '1.0.0',
          exportName: 'MCBreadcrumb',
          main: 'lib/index.js',
          destructuring: false,
          subName: '',
        },
        props: [
          {
            name: 'prefix',
            propType: 'string',
            description: '样式类名的品牌前缀',
            defaultValue: 'next-',
          },
          {
            name: 'title',
            propType: 'string',
            description: '标题',
            defaultValue: 'next-',
          },
          {
            name: 'rtl',
            propType: 'bool',
          },
          {
            name: 'children',
            propType: {
              type: 'instanceOf',
              value: 'node',
            },
            description: '面包屑子节点，需传入 Breadcrumb.Item',
          },
          {
            name: 'maxNode',
            propType: {
              type: 'oneOfType',
              value: [
                'number',
                {
                  type: 'oneOf',
                  value: ['auto'],
                },
              ],
            },
            description:
              '面包屑最多显示个数，超出部分会被隐藏, 设置为 auto 会自动根据父元素的宽度适配。',
            defaultValue: 100,
          },
          {
            name: 'separator',
            propType: {
              type: 'instanceOf',
              value: 'node',
            },
            description: '分隔符，可以是文本或 Icon',
          },
          {
            name: 'component',
            propType: {
              type: 'oneOfType',
              value: ['string', 'func'],
            },
            description: '设置标签类型',
            defaultValue: 'nav',
          },
          {
            name: 'className',
            propType: 'any',
          },
          {
            name: 'style',
            propType: 'object',
          },
        ],
        configure: {
          component: {
            isContainer: true,
            isModel: true,
            rootSelector: 'div.MCBreadcrumb',
          },
        },
      },
    ],

    componentList: [
      {
        title: '常用',
        icon: '',
        children: [
          {
            componentName: 'MCBreadcrumb',
            title: 'MC面包屑',
            icon: '',
            package: 'mc-breadcrumb',
            library: 'MCBreadcrumb',
            snippets: [
              {
                title: 'MC面包屑',
                screenshot:
                  'https://alifd.oss-cn-hangzhou.aliyuncs.com/fusion-cool/icons/icon-light/ic_light_breadcrumb.png',
                schema: {
                  componentName: 'MCBreadcrumb',
                  props: {
                    title: '物料中心',
                    prefix: 'next-',
                    maxNode: 100,
                  },
                },
              },
            ],
          },
        ],
      },
    ],
  });
};

export const preview = (scenarioName: string = 'index') => {
  saveSchema(scenarioName);
  setTimeout(() => {
    const search = location.search ? `${location.search}&scenarioName=${scenarioName}` : `?scenarioName=${scenarioName}`;
    window.open(`./preview.html${search}`);
  }, 500);
};

export const saveSchema = async (scenarioName: string = 'index') => {
  setProjectSchemaToLocalStorage(scenarioName);

  await setPackgesToLocalStorage(scenarioName);
  // window.localStorage.setItem(
  //   'projectSchema',
  //   JSON.stringify(project.exportSchema(TransformStage.Save))
  // );
  // const packages = await filterPackages(material.getAssets().packages);
  // window.localStorage.setItem(
  //   'packages',
  //   JSON.stringify(packages)
  // );
  Message.success('成功保存到本地');
};

export const resetSchema = async (scenarioName: string = 'index') => {
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
    return
  }

  // 除了「综合场景」，其他场景没有默认 schema.json，这里构造空页面
  if (scenarioName !== 'index') {
    window.localStorage.setItem(
      getLSName(scenarioName),
      JSON.stringify({
        componentsTree: [{ componentName: 'Page', fileName: 'sample' }],
        componentsMap: material.componentsMap,
        version: '1.0.0',
        i18n: {},
      })
    );
    project.getCurrentDocument()?.importSchema({ componentName: 'Page', fileName: 'sample' });
    project.simulatorHost?.rerender();
    Message.success('成功重置页面');
    return;
  }

  let schema;
  try {
    schema = await request('./schema.json')
  } catch(err) {
    schema = {
      componentName: 'Page',
      fileName: 'sample',
    }
  }

  window.localStorage.setItem(
    getLSName('index'),
    JSON.stringify({
      componentsTree: [schema],
      componentsMap: material.componentsMap,
      version: '1.0.0',
      i18n: {},
    })
  );

  project.getCurrentDocument()?.importSchema(schema);
  project.simulatorHost?.rerender();
  Message.success('成功重置页面');
}

const getLSName = (scenarioName: string, ns: string = 'projectSchema') => `${scenarioName}:${ns}`;

export const getProjectSchemaFromLocalStorage = (scenarioName: string) => {
  if (!scenarioName) {
    console.error('scenarioName is required!');
    return;
  }
  return JSON.parse(window.localStorage.getItem(getLSName(scenarioName)) || '{}');
}

const setProjectSchemaToLocalStorage = (scenarioName: string) => {
  if (!scenarioName) {
    console.error('scenarioName is required!');
    return;
  }
  window.localStorage.setItem(
    getLSName(scenarioName),
    JSON.stringify(project.exportSchema(TransformStage.Save))
  );
}

const setPackgesToLocalStorage = async (scenarioName: string) => {
  if (!scenarioName) {
    console.error('scenarioName is required!');
    return;
  }
  const packages = await filterPackages(material.getAssets().packages);
  window.localStorage.setItem(
    getLSName(scenarioName, 'packages'),
    JSON.stringify(packages),
  );
}

export const getPackagesFromLocalStorage = (scenarioName: string) => {
  if (!scenarioName) {
    console.error('scenarioName is required!');
    return;
  }
  return JSON.parse(window.localStorage.getItem(getLSName(scenarioName, 'packages')) || '{}');
}

export const getPageSchema = async (scenarioName: string = 'index') => {
  const pageSchema = getProjectSchemaFromLocalStorage(scenarioName).componentsTree?.[0]

  if (pageSchema) {
    return pageSchema;
  }

  return await request('./schema.json');
};

function request(
  dataAPI: string,
  method = 'GET',
  data?: object | string,
  headers?: object,
  otherProps?: any,
): Promise<any> {
  return new Promise((resolve, reject): void => {
    if (otherProps && otherProps.timeout) {
      setTimeout((): void => {
        reject(new Error('timeout'));
      }, otherProps.timeout);
    }
    fetch(dataAPI, {
      method,
      credentials: 'include',
      headers,
      body: data,
      ...otherProps,
    })
      .then((response: Response): any => {
        switch (response.status) {
          case 200:
          case 201:
          case 202:
            return response.json();
          case 204:
            if (method === 'DELETE') {
              return {
                success: true,
              };
            } else {
              return {
                __success: false,
                code: response.status,
              };
            }
          case 400:
          case 401:
          case 403:
          case 404:
          case 406:
          case 410:
          case 422:
          case 500:
            return response
              .json()
              .then((res: object): any => {
                return {
                  __success: false,
                  code: response.status,
                  data: res,
                };
              })
              .catch((): object => {
                return {
                  __success: false,
                  code: response.status,
                };
              });
          default:
            return null;
        }
      })
      .then((json: any): void => {
        if (json && json.__success !== false) {
          resolve(json);
        } else {
          delete json.__success;
          reject(json);
        }
      })
      .catch((err: Error): void => {
        reject(err);
      });
  });
}