import * as React from 'react';
import BehaviorSetter from '@alilc/lowcode-setter-behavior';


const defaultExtraBehaviorActions: any[] = [];
class LocalBehaviorSetter extends React.Component {
  render() {
    // ignore url && responseFormatter props, use default ones
    const { url: propsUrl, responseFormatter: propsFormatter, extraBehaviorActions: propsExtraBehaviorActions = [], ...otherProps } = this.props;
    const url = 'https://hn.algolia.com/api/v1/search?query';
    const  responseFormatter = (response) => response.hits.map((item) => ({
      label: item.title,
      value: item.author
    }));
    const extraBehaviorActions = propsExtraBehaviorActions.concat(defaultExtraBehaviorActions);
    return (
      <BehaviorSetter
        {...otherProps}
        url={url}
        responseFormatter={responseFormatter}
        extraBehaviorActions={extraBehaviorActions}
      />
    );
  }
}

export default LocalBehaviorSetter;