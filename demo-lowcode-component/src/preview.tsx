import ReactDOM from 'react-dom';
import React, { useState } from 'react';
import { Loading } from '@alifd/next';
import ReactRenderer from '@alilc/lowcode-react-renderer';
import { createFetchHandler } from '@alilc/lowcode-datasource-fetch-handler';
import {
  getProjectSchemaFromLocalStorage,
} from './services/mockService';
import assets from './services/assets.json';
import { parseAssets } from './parse-assets';

const getScenarioName = function () {
  if (location.search) {
    return new URLSearchParams(location.search.slice(1)).get('scenarioName') || 'index';
  }
  return 'index';
};

const SamplePreview = () => {
  const [data, setData] = useState({});

  async function init() {
    const scenarioName = getScenarioName();
    const projectSchema = getProjectSchemaFromLocalStorage(scenarioName);
    const { componentsMap: componentsMapArray, componentsTree } = projectSchema;
    const schema = componentsTree[0];
    const componentsMap: any = {};
    componentsMapArray.forEach((component: any) => {
      componentsMap[component.componentName] = component;
    });

    const { components } = await parseAssets(assets);

    setData({
      schema,
      components,
    });
  }

  const { schema, components } = data;

  if (!schema || !components) {
    init();
    return <Loading fullScreen />;
  }

  return (
    <div className="lowcode-plugin-sample-preview">
      <ReactRenderer
        className="lowcode-plugin-sample-preview-content"
        schema={schema}
        components={components}
        appHelper={{
          requestHandlersMap: {
            fetch: createFetchHandler(),
          },
        }}
      />
    </div>
  );
};

ReactDOM.render(<SamplePreview />, document.getElementById('ice-container'));
