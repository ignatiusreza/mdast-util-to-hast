/**
 * @typedef {import('mdast').LinkReference} LinkReference
 * @typedef {import('hast').Properties} Properties
 * @typedef {import('../index.js').Handler} Handler
 */

import normalize from 'mdurl/encode.js'
import {revert} from '../revert.js'
import {all} from '../all.js'

/**
 * @type {Handler}
 * @param {LinkReference} node
 */
export function linkReference(h, node) {
  var def = h.definition(node.identifier)
  /** @type {Properties} */
  var props

  if (!def) {
    return revert(h, node)
  }

  props = {href: normalize(def.url || '')}

  if (def.title !== null && def.title !== undefined) {
    props.title = def.title
  }

  return h(node, 'a', props, all(h, node))
}
