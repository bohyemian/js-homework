/**
 *
 * @param {string | Element} node
 * @param {Document | string} context
 * @returns {HTMLElement}
 */

export function getNode(node, context = document) {
  if (context.nodeType !== 9) context = document.querySelector(context);

  return context.querySelector(node);
}

export function getNodes(node, context = document) {
  if (context.nodeType !== 9) context = document.querySelector(context);

  return context.querySelectorAll(node);
}
