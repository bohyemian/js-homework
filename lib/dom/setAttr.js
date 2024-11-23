import { getNode } from './getNode.js';

export function setAttr(node, prop, value) {
  if (typeof node === 'string') node = getNode(node);
  if (!(typeof prop === 'string')) throw Error('setAttr 함수의 두 번째 인수는 문자 타입 이어야 합니다.');

  if (prop.startsWith('data')) {
    prop = prop.slice(5);

    return (node.dataset[prop] = value);
  }

  node.setAttribute(prop, value);
}
