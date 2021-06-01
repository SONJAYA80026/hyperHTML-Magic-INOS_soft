/*! (c) Andrea Giammarchi (ISC) */
import WeakMap from '@ungap/weakmap';
import WeakSet from '@ungap/essential-weakset';

import diff from 'domdiff';
import Component, {setup} from './classes/Component.js';
import Intent from './objects/Intent.js';
import {observe, Tagger} from './objects/Updates.js';
import wire, {content, weakly} from './hyper/wire.js';
import render from './hyper/render.js';

// all functions are self bound to the right context
// you can do the following
// const {bind, wire} = hyperHTML;
// and use them right away: bind(node)`hello!`;
const adopt = context => function () {
  render.adopt = true;
  return render.apply(context, arguments);
};
const bind = context => function () {
  render.adopt = false;
  return render.apply(context, arguments);
};
const define = Intent.define;
const tagger = Tagger.prototype;

hyper.Component = Component;
hyper.adopt = adopt;
hyper.bind = bind;
hyper.define = define;
hyper.diff = diff;
hyper.hyper = hyper;
hyper.observe = observe;
hyper.tagger = tagger;
hyper.wire = wire;

// exported as shared utils
// for projects based on hyperHTML
// that don't necessarily need upfront polyfills
// i.e. those still targeting IE
hyper._ = {
  WeakMap,
  WeakSet
};

// the wire content is the lazy defined
// html or svg property of each hyper.Component
setup(content);

// everything is exported directly or through the
// hyperHTML callback, when used as top level script
<<<<<<< HEAD
<<<<<<< HEAD
export {Component, bind, define, diff, hyper, observe, tagger, wire};
=======
export {Component, adopt, bind, define, diff, hyper, wire};
>>>>>>> origin/adopt
=======
export {Component, adopt, bind, define, diff, hyper, wire};
>>>>>>> origin/re-adopt

// by default, hyperHTML is a smart function
// that "magically" understands what's the best
// thing to do with passed arguments
export default function hyper(HTML) {
  return arguments.length < 2 ?
    (HTML == null ?
      content('html') :
      (typeof HTML === 'string' ?
        hyper.wire(null, HTML) :
        ('raw' in HTML ?
          content('html')(HTML) :
          ('nodeType' in HTML ?
<<<<<<< HEAD
            hyper.bind(HTML) :
=======
            bind(HTML) :
>>>>>>> origin/adopt
            weakly(HTML, 'html')
          )
        )
      )) :
    ('raw' in HTML ?
      content('html') : hyper.wire
    ).apply(null, arguments);
}
