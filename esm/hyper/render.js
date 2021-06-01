import WeakMap from '@ungap/weakmap';
import tta from '@ungap/template-tag-arguments';

import {OWNER_SVG_ELEMENT} from '../shared/constants.js';
import {Tagger} from '../objects/Updates.js';

// a weak collection of contexts that
// are already known to hyperHTML
const bewitched = new WeakMap;

// better known as hyper.bind(node), the render is
// the main tag function in charge of fully upgrading
// or simply updating, contexts used as hyperHTML targets.
// The `this` context is either a regular DOM node or a fragment.
function render() {
  const wicked = bewitched.get(this);
  const args = tta.apply(null, arguments);
  if (wicked && wicked.template === args[0]) {
    wicked.tagger.apply(null, args);
  } else {
    upgrade.apply(this, args);
  }
  return this;
}

// an upgrade is in charge of collecting template info,
// parse it once, if unknown, to map all interpolations
// as single DOM callbacks, relate such template
// to the current context, and render it after cleaning the context up
function upgrade(template) {
<<<<<<< HEAD
  const type = OWNER_SVG_ELEMENT in this ? 'svg' : 'html';
  const tagger = new Tagger(type);
  bewitched.set(this, {tagger, template: template});
  this.textContent = '';
  this.appendChild(tagger.apply(null, arguments));
=======
  template = unique(template);
  const adopt = render.adopt;
  const info =  templates.get(template) ||
                createTemplate.call(this, template);
  let fragment, updates;
  if (adopt) {
    updates = Updates.create(this, info.paths, adopt);
  } else {
    fragment = importNode(this.ownerDocument, info.fragment);
    updates = Updates.create(fragment, info.paths, adopt);
  }
  bewitched.set(this, {template, updates});
  update.apply(updates, arguments);
  if (!adopt) {
    this.textContent = '';
    this.appendChild(fragment);
  }
}

// an update simply loops over all mapped DOM operations
function update() {
  const length = arguments.length;
  for (let i = 1; i < length; i++) {
    this[i - 1](arguments[i]);
  }
}

// a template can be used to create a document fragment
// aware of all interpolations and with a list
// of paths used to find once those nodes that need updates,
// no matter if these are attributes, text nodes, or regular one
function createTemplate(template) {
  const paths = [];
  const fragment = createFragment(this, template.join(UIDC));
  Updates.find(fragment, paths, template.slice());
  const info = {fragment, paths};
  templates.set(template, info);
  return info;
>>>>>>> origin/adopt
}

export default render;
