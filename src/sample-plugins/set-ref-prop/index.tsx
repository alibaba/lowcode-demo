import { TransformedComponentMetadata, FieldConfig } from '@alilc/lowcode-types';
import { v4 as uuidv4 } from 'uuid';
import { material } from '@alilc/lowcode-engine';

function addonCombine(metadata: TransformedComponentMetadata) {
  const { componentName, configure = {} } = metadata;

  const isRoot: boolean = componentName === 'Page' || componentName === 'Component';

  if (isRoot) {
    return metadata;
  }

  let advancedGroup: FieldConfig | undefined;

  const refItem: FieldConfig = {
    title: {
      label: 'refId',
      tip: '用于获取组件实例，调用物料内部方法',
      icon: '',
    },
    name: "ref",
    setter: {
      componentName: 'StringSetter',
    },
    defaultValue: () => {
      const uuid = uuidv4().replace('-', '').substring(0, 8);
      return `${componentName.toLowerCase()}-${uuid}`;
    },
    extraProps: {
      display: 'block',
      supportVariable: false,
    },
  }

  if (!configure.combined) {
    configure.combined = []
  }

  advancedGroup = configure.combined?.filter(d => d.name === '#advanced')[0];

  if (!advancedGroup) {
    advancedGroup = {
      name: '#advanced',
      title: { type: 'i18n', 'zh-CN': '高级', 'en-US': 'Advanced' },
      items: [
        refItem,
      ],
    };

    configure.combined.push(advancedGroup);
  }

  if (!advancedGroup.items) {
    advancedGroup.items = [refItem];
  }

  const advanceItems: FieldConfig[] = advancedGroup.items || [];

  if (!advanceItems || !advanceItems.length || !advanceItems?.filter(d => d.name === 'ref').length) {
    advanceItems.push(refItem);
  }

  return {
    ...metadata,
    configure,
  };
}

export const registerRefProp = () => {
  return {
    init() {
      material.registerMetadataTransducer(addonCombine, 110, 'register-ref-prop')
    }
  };
};

registerRefProp.pluginName = 'register-ref-prop';
