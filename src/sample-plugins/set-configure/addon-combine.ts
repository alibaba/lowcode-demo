import { TransformedComponentMetadata, FieldConfig } from '@alilc/lowcode-types';

//随机数生成8位唯一标识
function randomString (len = 10) {
  const chars = 'abcdefghijklmnopqrstuvwxyz1234567890'
  const maxPos = chars.length
  let str = ''
  for (let i = 0; i < len; i++) {
    str += chars.charAt(Math.floor(Math.random() * maxPos))
  }
  return str
}

export default function  (metadata: TransformedComponentMetadata) {
  const { componentName, configure = {} } = metadata;
  const { props = [] } :any = configure
  const advanceGroup: FieldConfig[] = [];
  const combined:any =  []
  const fieldId = metadata.componentName + "_" + randomString(8)
  advanceGroup.push({
      title: "唯一标识",
      name: "ref",
      setter: {
        componentName: 'StringSetter',
      },
      defaultValue: fieldId,
  });
  
  combined.push({
    name : "combinedId",
    type: "group",
    title: "高级",
    display: "accordion",
    items: advanceGroup 
  });
  //组件props 分对象和数组格式，判断类型，设置combined
  const toString = Object.prototype.toString
  if(toString.call(props) == "[object Object]"&& !metadata.props.some((v:any)=>{
    if(v.name === combined[0].name) return true
  })){
    metadata.props?.push(...combined)
  }else if(toString.call(props) == "[object Array]" && !props.some((v:any)=>{
    if(v.name === combined[0].name) return true
  })){
    props?.push(...combined)
  }
  
  return {
    ...metadata,
    configure: {
      ...configure,
      props:toString.call(props) == "[object Object]" ? {...props} : [...props]
    }
  };
}
