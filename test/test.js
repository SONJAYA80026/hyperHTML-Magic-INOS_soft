tressa.title('HyperHTML');
tressa.assert(typeof hyperHTML === 'function', 'hyperHTML is a function');

try { tressa.log(''); } catch(e) { tressa.log = console.log.bind(console); }

tressa.async(function (done) {
  tressa.log('## injecting text and attributes');
  var i = 0;
  var div = document.body.appendChild(document.createElement('div'));
  var render = hyperHTML.bind(div);
  function update(i) {
    return render`
    <p data-counter="${i}">
      Time: ${
        // IE Edge mobile did something funny here
        // as template string returned xxx.xxxx
        // but as innerHTML returned xxx.xx
        (Math.random() * new Date).toFixed(2)
      }
    </p>
    `;
  }
  function compare(html) {
    return /^\s*<p data-counter="\d">\s*Time: \d+\.\d+<[^>]+?>\s*<\/p>\s*$/i.test(html);
  }
  var html = update(i++).innerHTML;
  var p = div.querySelector('p');
  var attr = p.attributes[0];
  tressa.assert(compare(html), 'correct HTML');
  tressa.assert(html === div.innerHTML, 'correctly returned');
  setTimeout(function () {
    tressa.log('## updating same nodes');
    var html = update(i++).innerHTML;
    tressa.assert(compare(html), 'correct HTML update');
    tressa.assert(html === div.innerHTML, 'update applied');
    tressa.assert(p === div.querySelector('p'), 'no node was changed');
    tressa.assert(attr === p.attributes[0], 'no attribute was changed');
    done();
  });
})
.then(function () {
  return tressa.async(function (done) {
    tressa.log('## perf: same virtual text twice');
    var div = document.body.appendChild(document.createElement('div'));
    var render = hyperHTML.bind(div);
    var html = (update('hello').innerHTML, update('hello').innerHTML);
    function update(text) {
      return render`<p>${text} world</p>`;
    }
    tressa.assert(
      update('hello').innerHTML ===
      update('hello').innerHTML,
      'same text'
    );
    done(div);
  });
})
.then(function () {
  return tressa.async(function (done) {
    tressa.log('## injecting HTML');
    var div = document.body.appendChild(document.createElement('div'));
    var render = hyperHTML.bind(div);
    var html = update('hello').innerHTML;
    function update(text) {
      return render`<p>${['<strong>' + text + '</strong>']}</p>`;
    }
    function compare(html) {
      return /^<p><strong>\w+<\/strong><!--.+?--><\/p>$/i.test(html);
    }
    tressa.assert(compare(html), 'HTML injected');
    tressa.assert(html === div.innerHTML, 'HTML returned');
    done(div);
  });
})
.then(function (div) {
  return tressa.async(function (done) {
    tressa.log('## function attributes');
    var render = hyperHTML.bind(div);
    var times = 0;
    update(function (e) {
      console.log(e.type);
      if (++times > 1) {
        return tressa.assert(false, 'events are broken');
      }
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      tressa.assert(true, 'onclick invoked');
      tressa.assert(!a.hasAttribute('onclick'), 'no attribute');
      update(null);
      e = document.createEvent('Event');
      e.initEvent('click', false, false);
      a.dispatchEvent(e);
      done(div);
    });
    function update(click) {
      // also test case-insensitive builtin events
      return render`<a href="#" onClick="${click}">click</a>`;
    }
    var a = div.querySelector('a');
    var e = document.createEvent('Event');
    e.initEvent('click', false, false);
    a.dispatchEvent(e);
  });
})
.then(function (div) {
  return tressa.async(function (done) {
    tressa.log('## changing template');
    var render = hyperHTML.bind(div);
    var html = update('hello').innerHTML;
    function update(text) {
      return render`<p>${{any: ['<em>' + text + '</em>']}}</p>`;
    }
    function compare(html) {
      return /^<p><em>\w+<\/em><!--.+?--><\/p>$/i.test(html);
    }
    tressa.assert(compare(html), 'new HTML injected');
    tressa.assert(html === div.innerHTML, 'new HTML returned');
    done(div);
  });
})
.then(function () {
  return tressa.async(function (done) {
    tressa.log('## custom events');
    var render = hyperHTML.bind(document.createElement('p'));
    var e = document.createEvent('Event');
    e.initEvent('Custom-EVENT', true, true);
    (render`<span onCustom-EVENT="${function (e) {
      tressa.assert(e.type === 'Custom-EVENT', 'event triggered');
      done();
    }}">how cool</span>`
    ).firstElementChild.dispatchEvent(e);
  });
})
.then(function () {
  tressa.log('## multi wire removal');
  var render = hyperHTML.wire();
  var update = function () {
    return render`
      <p>1</p>
      <p>2</p>
    `;
  };
  update().remove();
  update = function () {
    return render`
      <p>1</p>
      <p>2</p>
      <p>3</p>
    `;
  };
  update().remove();
  tressa.assert(true, 'OK');
})
.then(function () {
  tressa.log('## the attribute id');
  var div = document.createElement('div');
  hyperHTML.bind(div)`<p id=${'id'} class='class'>OK</p>`;
  tressa.assert(div.firstChild.id === 'id', 'the id is preserved');
  tressa.assert(div.firstChild.className === 'class', 'the class is preserved');
})
.then(function () {
  return tressa.async(function (done) {
    tressa.log('## hyperHTML.wire()');

    var render = hyperHTML.wire();
    var update = function () {
      return render`
        <p>1</p>
      `;
    };
    var node = update();
    tressa.assert(node.nodeName.toLowerCase() === 'p', 'correct node');
    var same = update();
    tressa.assert(node === same, 'same node returned');

    render = hyperHTML.wire(null);
    update = function () {
      return render`
        0
        <p>1</p>
      `;
    };
    node = update().childNodes;
    tressa.assert(Array.isArray(node), 'list of nodes');
    same = update().childNodes;
    tressa.assert(
      node.length === same.length &&
      node[0] &&
      node.every(function (n, i) { return same[i] === n; }),
      'same list returned'
    );

    var div = document.createElement('div');
    render = hyperHTML.bind(div);
    render`${node}`;
    same = div.childNodes;
    tressa.assert(
      node[0] &&
      node.every(function (n, i) { return same[i] === n; }),
      'same list applied'
    );

    function returnSame() {
      return render`a`;
    }
    render = hyperHTML.wire();
    tressa.assert(
      returnSame() === returnSame(),
      'template sensible wire'
    );

    done();
  });
})
.then(function () {
  return tressa.async(function (done) {
    tressa.log('## hyperHTML.wire(object)');
    var point = {x: 1, y: 2};
    function update() {
      return hyperHTML.wire(point)`
      <span style="${`
        position: absolute;
        left: ${point.x}px;
        top: ${point.y}px;
      `}">O</span>`;
    }
    try { update(); } catch(e) { console.error(e) }
    tressa.assert(update() === update(), 'same output');
    tressa.assert(hyperHTML.wire(point) === hyperHTML.wire(point), 'same wire');
    done();
  });
})
.then(function () {
  if (typeof MutationObserver === 'undefined') return;
  return tressa.async(function (done) {
    tressa.log('## preserve first child where first child is the same as incoming');
    var div = document.body.appendChild(document.createElement('div'));
    var render = hyperHTML.bind(div);
    var observer = new MutationObserver(function (mutations) {
      for (var i = 0, len = mutations.length; i < len; i++) {
        trackMutations(mutations[i].addedNodes, 'added');
        trackMutations(mutations[i].removedNodes, 'removed');
      }
    });

    observer.observe(div, {
      childList: true,
      subtree: true,
    });

    var counters = [];

    function trackMutations (nodes, countKey) {
      for (var i = 0, len = nodes.length, counter, key; i < len; i++) {
        if (nodes[i] && nodes[i].getAttribute && nodes[i].getAttribute('data-test')) {
          key = nodes[i].getAttribute('data-test');
          counter = counters[key] || (counters[key] = { added: 0, removed: 0 });
          counter[countKey]++;
        }
        if (nodes[i].childNodes.length > 0) {
          trackMutations(nodes[i].childNodes, countKey);
        }
      }
    }

    var listItems = [];

    function update(items) {
      render`
      <section>
        <ul>${
          items.map(function (item, i) {
            return hyperHTML.wire((listItems[i] || (listItems[i] = {})))`
            <li data-test="${i}">${() => item.text}</li>
            `;
          })
        }</ul>
      </section>`;
    }

    update([]);

    setTimeout(function () {
      update([{ text: 'test1' }]);
    }, 10);
    setTimeout(function () {
      update([{ text: 'test1' }, { text: 'test2' }]);
    }, 20);
    setTimeout(function () {
      update([{ text: 'test1' }]);
    }, 30);
    setTimeout(function () {
      if (counters.length) {
        tressa.assert(counters[0].added === 1, 'first item added only once');
        tressa.assert(counters[0].removed === 0, 'first item never removed');
      }
      done();
    }, 100);
  });
})
.then(function () {
  tressa.log('## rendering one node');
  var div = document.createElement('div');
  var br = document.createElement('br');
  var hr = document.createElement('hr');
  hyperHTML.bind(div)`<div>${br}</div>`;
  tressa.assert(div.firstChild.firstChild === br, 'one child is added');
  hyperHTML.bind(div)`<div>${hr}</div>`;
  tressa.assert(div.firstChild.firstChild === hr, 'one child is changed');
  hyperHTML.bind(div)`<div>${[hr, br]}</div>`;
  tressa.assert(
    div.firstChild.childNodes[0] === hr &&
    div.firstChild.childNodes[1] === br,
    'more children are added'
  );
  hyperHTML.bind(div)`<div>${[br, hr]}</div>`;
  tressa.assert(
    div.firstChild.childNodes[0] === br &&
    div.firstChild.childNodes[1] === hr,
    'children can be swapped'
  );
  hyperHTML.bind(div)`<div>${br}</div>`;
  tressa.assert(div.firstChild.firstChild === br, 'one child is kept');
  hyperHTML.bind(div)`<div>${[]}</div>`;
  tressa.assert(/<div><!--.+?--><\/div>/.test(div.innerHTML), 'dropped all children');
})
.then(function () {
  tressa.log('## wire by id');
  let ref = {};
  let wires = {
    a: function () {
        return hyperHTML.wire(ref, ':a')`<a></a>`;
      },
    p: function () {
      return hyperHTML.wire(ref, ':p')`<p></p>`;
    }
  };
  tressa.assert(wires.a().nodeName.toLowerCase() === 'a', '<a> is correct');
  tressa.assert(wires.p().nodeName.toLowerCase() === 'p', '<p> is correct');
  tressa.assert(wires.a() === wires.a(), 'same wire for <a>');
  tressa.assert(wires.p() === wires.p(), 'same wire for <p>');
})
.then(function () {
  return tressa.async(function (done) {
    tressa.log('## Promises instead of nodes');
    let wrap = document.createElement('div');
    let render = hyperHTML.bind(wrap);
    render`<p>${
      new Promise(function (r) { setTimeout(r, 50, 'any'); })
    }</p>${
      new Promise(function (r) { setTimeout(r, 10, 'virtual'); })
    }<hr><div>${[
      new Promise(function (r) { setTimeout(r, 20, 1); }),
      new Promise(function (r) { setTimeout(r, 10, 2); }),
    ]}</div>${[
      new Promise(function (r) { setTimeout(r, 20, 3); }),
      new Promise(function (r) { setTimeout(r, 10, 4); }),
    ]}`;
    let result = wrap.innerHTML;
    setTimeout(function () {
      tressa.assert(result !== wrap.innerHTML, 'promises fullfilled');
      tressa.assert(
        /^<p>any<!--.+?--><\/p>virtual<!--.+?--><hr(?: ?\/)?><div>12<!--.+?--><\/div>34<!--.+?-->$/.test(wrap.innerHTML),
        'both any and virtual content correct'
      );
      done();
    }, 100);
  });
})
.then(function () {
  hyperHTML.engine = hyperHTML.engine;
  tressa.log('## for code coverage sake');
  let wrap = document.createElement('div');
  let text = [document.createTextNode('a'), document.createTextNode('b'), document.createTextNode('c')];
  let testingMajinBuu = hyperHTML.bind(wrap);
  testingMajinBuu`${[text]}`;
  tressa.assert(wrap.textContent === 'abc');
  text[0] = document.createTextNode('c');
  text[2] = document.createTextNode('a');
  testingMajinBuu`${[text]}`;
  tressa.assert(wrap.textContent === 'cba');

  let result = hyperHTML.wire()`<!--not hyperHTML-->`;
  tressa.assert(result.nodeType === 8, 'it is a comment');
  tressa.assert(result.textContent === 'not hyperHTML', 'correct content');
  hyperHTML.bind(wrap)`<br/>${'node before'}`;
  tressa.assert(/^<br(?: ?\/)?>node before<!--.+?-->$/i.test(wrap.innerHTML), 'node before');
  hyperHTML.bind(wrap)`${'node after'}<br/>`;
  tressa.assert(/^node after<!--.+?--><br(?: ?\/)?>$/i.test(wrap.innerHTML), 'node after');
  hyperHTML.bind(wrap)`<style> ${'hyper-html{}'} </style>`;
  tressa.assert('<style>hyper-html{}</style>' === wrap.innerHTML.toLowerCase(), 'node style');
  var empty = function (value) {
    return hyperHTML.bind(wrap)`${value}`;
  };
  empty(document.createTextNode('a'));
  empty(document.createDocumentFragment());
  empty(document.createDocumentFragment());
  let fragment = document.createDocumentFragment();
  fragment.appendChild(document.createTextNode('b'));
  empty(fragment);
  empty(123);
  tressa.assert(wrap.textContent === '123', 'text as number');
  empty(true);
  tressa.assert(wrap.textContent === 'true', 'text as boolean');
  empty([1]);
  tressa.assert(wrap.textContent === '1', 'text as one entry array');
  empty(['1', '2']);
  tressa.assert(wrap.textContent === '12', 'text as multi entry array of strings');
  let arr = [document.createTextNode('a'), document.createTextNode('b')];
  empty([arr]);
  tressa.assert(wrap.textContent === 'ab', 'text as multi entry array of nodes');
  empty([arr]);
  tressa.assert(wrap.textContent === 'ab', 'same array of nodes');
  empty(wrap.childNodes);
  tressa.assert(wrap.textContent === 'ab', 'childNodes as list');
  hyperHTML.bind(wrap)`a=${{length:1, '0':'b'}}`;
  tressa.assert(wrap.textContent === 'a=b', 'childNodes as virtual list');
  empty = function () {
    return hyperHTML.bind(wrap)`[${'text'}]`;
  };
  empty();
  empty();
  let onclick = (e) => {};
  let handler = {handleEvent: onclick};
  empty = function () {
    return hyperHTML.bind(wrap)`<p onclick="${onclick}" onmouseover="${handler}" align="${'left'}"></p>`;
  };
  empty();
  handler = {handleEvent: onclick};
  empty();
  empty();
  empty = function (value) {
    return hyperHTML.bind(wrap)`<br/>${value}<br/>`;
  };
  empty(arr[0]);
  empty(arr);
  empty(arr);
  empty([]);
  empty(['1', '2']);
  empty(document.createDocumentFragment());
  tressa.assert(true, 'passed various virtual content scenarios');
  let svgContainer = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  if (!('ownerSVGElement' in svgContainer)) svgContainer.ownerSVGElement = null;
  hyperHTML.bind(svgContainer)`<rect x="1" y="2" />`;
  result = hyperHTML.wire(null, 'svg')`<svg></svg>`;
  tressa.assert(result.nodeName.toLowerCase() === 'svg', 'svg content is allowed too');
  result = hyperHTML.wire()``;
  tressa.assert(!result.innerHTML, 'empty content');
  let tr = hyperHTML.wire()`<tr><td>ok</td></tr>`;
  tressa.assert(true, 'even TR as template');

  hyperHTML.bind(wrap)`${' 1 '}`;
  tressa.assert(wrap.textContent === ' 1 ', 'text in between');

  hyperHTML.bind(wrap)` <br/>${1}<br/> `;
  tressa.assert(/^\s*<br(?: ?\/)?>1<!--.+?--><br(?: ?\/)?>\s*$/.test(wrap.innerHTML), 'virtual content in between');

  let last = hyperHTML.wire();
  empty = function (style) {
    return last`<textarea style=${style}>${() => 'same text'}</textarea>`;
  };
  empty('border:0');
  empty({border: 0});
  empty({vh: 100});
  empty({vh: 10, vw: 1});
  empty(null);
  empty('');
  const sameStyle = {ord: 0};
  empty(sameStyle);
  empty(sameStyle);
  empty = function () {
    return last`<p data=${last}></p>`;
  };
  empty();
  empty();
  let p = last`<p data=${last}>${0}</p>`;
  const UID = p.childNodes[1].data;
  last`<textarea new>${`<!--${UID}-->`}</textarea>`;
  hyperHTML.wire()`<p><!--ok--></p>`;
})
.then(function () {
  tressa.log('## <script> shenanigans');
  return tressa.async(function (done) {
    var div = document.createElement('div');
    document.body.appendChild(div);
    hyperHTML.bind(div)`<script
      src="../index.js?_=asd"
      onreadystatechange="${event => {
        if (/loaded|complete/.test(event.readyState))
          setTimeout(() => {
            tressa.assert(true, 'executed');
            done();
          });
      }}"
      onload="${() => {
        tressa.assert(true, 'executed');
        done();
      }}"
      onerror="${() => {
        tressa.assert(true, 'executed');
        done();
      }}"
    ></script>`;
    // in nodejs case
    if (!('onload' in document.defaultView)) {
      var evt = document.createEvent('Event');
      evt.initEvent('load', false, false);
      div.firstChild.dispatchEvent(evt);
    }
  });
})
.then(function () {
  tressa.log('## SVG and style');
  var render = hyperHTML.wire(null, 'svg');
  Object.prototype.ownerSVGElement = null;
  function rect(style) {
    return render`<rect style=${style} />`;
  }
  var node = rect({});
  delete Object.prototype.ownerSVGElement;
  rect({width: 100});
  console.log(node.getAttribute('style'));
  tressa.assert(/width:\s*100px;/.test(node.getAttribute('style')), 'correct style object');
  rect('height:10px;');
  tressa.assert(/height:\s*10px;/.test(node.getAttribute('style')), 'correct style string');
  rect(null);
  tressa.assert(/^(?:|null)$/.test(node.getAttribute('style')), 'correct style reset');
})
.then(function () {
  var a = document.createTextNode('a');
  var b = document.createTextNode('b');
  var c = document.createTextNode('c');
  var d = document.createTextNode('d');
  var e = document.createTextNode('e');
  var f = document.createTextNode('f');
  var g = document.createTextNode('g');
  var h = document.createTextNode('h');
  var i = document.createTextNode('i');
  var div = document.createElement('div');
  var render = hyperHTML.bind(div);
  render`${[]}`;
  tressa.assert(div.textContent === '', 'div is empty');
  render`${[c, d, e, f]}`;
  // all tests know that a comment node is inside the div
  tressa.assert(div.textContent === 'cdef' && div.childNodes.length === 5, 'div has 4 nodes');
  render`${[c, d, e, f]}`;
  tressa.assert(div.textContent === 'cdef', 'div has same 4 nodes');
  render`${[a, b, c, d, e, f]}`;
  tressa.assert(div.textContent === 'abcdef' && div.childNodes.length === 7, 'div has same 4 nodes + 2 prepends');
  render`${[a, b, c, d, e, f, g, h, i]}`;
  tressa.assert(div.textContent === 'abcdefghi' && div.childNodes.length === 10, 'div has 6 nodes + 3 appends');
  render`${[b, c, d, e, f, g, h, i]}`;
  tressa.assert(div.textContent === 'bcdefghi' && div.childNodes.length === 9, 'div has dropped first node');
  render`${[b, c, d, e, f, g, h]}`;
  tressa.assert(div.textContent === 'bcdefgh' && div.childNodes.length === 8, 'div has dropped last node');
  render`${[b, c, d, f, e, g, h]}`;
  tressa.assert(div.textContent === 'bcdfegh', 'div has changed 2 nodes');
  render`${[b, d, c, f, g, e, h]}`;
  tressa.assert(div.textContent === 'bdcfgeh', 'div has changed 4 nodes');
  render`${[b, d, c, g, e, h]}`;
  tressa.assert(div.textContent === 'bdcgeh' && div.childNodes.length === 7, 'div has removed central node');
})
.then(function () {
  tressa.log('## no WebKit backfire');
  var div = document.createElement('div');
  function update(value, attr) {
    return hyperHTML.bind(div)`
    <input value="${value}" shaka="${attr}">`;
  }
  var input = update('', '').firstElementChild;
  input.value = '456';
  input.setAttribute('shaka', 'laka');
  update('123', 'laka');
  tressa.assert(input.value === '123', 'correct input');
  tressa.assert(input.value === '123', 'correct attribute');
  update('', '');
  input.value = '123';
  input.attributes.shaka.value = 'laka';
  update('123', 'laka');
  tressa.assert(input.value === '123', 'input.value was not reassigned');
})
.then(function () {
  tressa.log('## wired arrays are rendered properly');
  var div = document.createElement('div');
  var employees = [
    {first: 'Bob', last: 'Li'},
    {first: 'Ayesha', last: 'Johnson'}
  ];
  var getEmployee = employee => hyperHTML.wire(employee)`
    <div>First name: ${employee.first}</div>
    <p></p>`;

  hyperHTML.bind(div)`${employees.map(getEmployee)}`;
  tressa.assert(div.childElementCount === 4, 'correct elements as setAny');

  hyperHTML.bind(div)`
    <p></p>${employees.map(getEmployee)}`;
  tressa.assert(div.childElementCount === 5, 'correct elements as setVirtual');

  hyperHTML.bind(div)`
  <p></p>${[]}`;
  tressa.assert(div.childElementCount === 1, 'only one element left');
})
.then(function () {return tressa.async(function (done) {
  function textarea(value) {
    return hyperHTML.bind(div)`<textarea>${value}</textarea>`;
  }
  tressa.log('## textarea text');
  var div = document.createElement('div');
  textarea(1);
  var ta = div.firstElementChild;
  tressa.assert(ta.textContent === '1', 'primitives are fine');
  textarea(null);
  tressa.assert(ta.textContent === '', 'null/undefined is fine');
  var p = Promise.resolve('OK');
  textarea(p);
  p.then(function () {
    console.log(div.innerHTML);
    tressa.assert(ta.textContent === 'OK', 'promises are fine');
    textarea({text: 'text'});
    tressa.assert(ta.textContent === 'text', 'text is fine');
    textarea({html: 'html'});
    tressa.assert(ta.textContent === 'html', 'html is fine');
    textarea({any: 'any'});
    tressa.assert(ta.textContent === 'any', 'any is fine');
    textarea(['ar', 'ray']);
    tressa.assert(ta.textContent === 'array', 'array is fine');
    textarea({placeholder: 'placeholder'});
    tressa.assert(ta.textContent === 'placeholder', 'placeholder is fine');
    textarea({unknown: 'unknown'});
    tressa.assert(ta.textContent === '', 'intents are fine');
    done();
  });
})})
.then(function () {
  tressa.log('## attributes with weird chars');
  var div = document.createElement('div');
  hyperHTML.bind(div)`<p _foo=${'bar'}></p>`;
  tressa.assert(div.firstChild.getAttribute('_foo') === 'bar', 'OK');
})
.then(function () {
  tressa.log('## attributes without quotes');
  var div = document.createElement('div');
  hyperHTML.bind(div)`<p test=${'a"b'}></p>`;
  tressa.assert(div.firstChild.getAttribute('test') === 'a"b', 'OK');
})
.then(function () {
  tressa.log('## any content extras');
  var div = document.createElement('div');
  var html = hyperHTML.bind(div);
  setContent(undefined);
  tressa.assert(/<p><!--.+?--><\/p>/.test(div.innerHTML), 'expected layout');
  setContent({text: '<img/>'});
  tressa.assert(/<p>&lt;img(?: ?\/)?&gt;<!--.+?--><\/p>/.test(div.innerHTML), 'expected text');
  function setContent(which) {
    return html`<p>${which}</p>`;
  }
})
.then(function () {
  tressa.log('## any different content extras');
  var div = document.createElement('div');
  hyperHTML.bind(div)`<p>${undefined}</p>`;
  tressa.assert(/<p><!--.+?--><\/p>/.test(div.innerHTML), 'expected layout');
  hyperHTML.bind(div)`<p>${{text: '<img/>'}}</p>`;
  tressa.assert(/<p>&lt;img(?: ?\/)?&gt;<!--.+?--><\/p>/.test(div.innerHTML), 'expected text');
})
.then(function () {
  tressa.log('## virtual content extras');
  var div = document.createElement('div');
  hyperHTML.bind(div)`a ${null}`;
  tressa.assert(/a <[^>]+?>/.test(div.innerHTML), 'expected layout');
  hyperHTML.bind(div)`a ${{text: '<img/>'}}`;
  tressa.assert(/a &lt;img(?: ?\/)?&gt;<[^>]+?>/.test(div.innerHTML), 'expected text');
  hyperHTML.bind(div)`a ${{any: 123}}`;
  tressa.assert(/a 123<[^>]+?>/.test(div.innerHTML), 'expected any');
  hyperHTML.bind(div)`a ${{html: '<b>ok</b>'}}`;
  tressa.assert(/a <b>ok<\/b><[^>]+?>/.test(div.innerHTML), 'expected html');
  hyperHTML.bind(div)`a ${{}}`;
  tressa.assert(/a <[^>]+?>/.test(div.innerHTML), 'expected nothing');
})
.then(function () {
  tressa.log('## defined transformer');
  hyperHTML.define('eUC', encodeURIComponent);
  var div = document.createElement('div');
  hyperHTML.bind(div)`a=${{eUC: 'b c'}}`;
  tressa.assert(/a=b%20c<[^>]+?>/.test(div.innerHTML), 'expected virtual layout');
  hyperHTML.bind(div)`<p>${{eUC: 'b c'}}</p>`;
  tressa.assert(/<p>b%20c<!--.+?--><\/p>/.test(div.innerHTML), 'expected layout');
  // TODO: for coverage sake
  //       defined transformer ... so what?
  hyperHTML.define('eUC', encodeURIComponent);
  //       non existent one ... so what?
  hyperHTML.bind(div)`a=${{nOPE: 'b c'}}`;
})
.then(function () {
  tressa.log('## attributes with null values');
  var div = document.createElement('div');
  var anyAttr = function (value) {
    hyperHTML.bind(div)`<p any-attr=${value}>any content</p>`;
  };
  anyAttr('1');
  tressa.assert(
    div.firstChild.hasAttribute('any-attr') &&
    div.firstChild.getAttribute('any-attr') === '1',
    'regular attribute'
  );
  anyAttr(null);
  tressa.assert(
    !div.firstChild.hasAttribute('any-attr') &&
    div.firstChild.getAttribute('any-attr') == null,
    'can be removed'
  );
  anyAttr(undefined);
  tressa.assert(
    !div.firstChild.hasAttribute('any-attr') &&
    div.firstChild.getAttribute('any-attr') == null,
    'multiple times'
  );
  anyAttr('2');
  tressa.assert(
    div.firstChild.hasAttribute('any-attr') &&
    div.firstChild.getAttribute('any-attr') === '2',
    'but can be also reassigned'
  );
  anyAttr('3');
  tressa.assert(
    div.firstChild.hasAttribute('any-attr') &&
    div.firstChild.getAttribute('any-attr') === '3',
    'many other times'
  );
  var inputName = function (value) {
    hyperHTML.bind(div)`<input name=${value}>`;
  };
  inputName('test');
  tressa.assert(
    div.firstChild.hasAttribute('name') &&
    div.firstChild.name === 'test',
    'special attributes are set too'
  );
  inputName(null);
  tressa.assert(
    !div.firstChild.hasAttribute('name') &&
    !div.firstChild.name,
    'but can also be removed'
  );
  inputName(undefined);
  tressa.assert(
    !div.firstChild.hasAttribute('name') &&
    !div.firstChild.name,
    'with either null or undefined'
  );
  inputName('back');
  tressa.assert(
    div.firstChild.hasAttribute('name') &&
    div.firstChild.name === 'back',
    'and can be put back'
  );
})
.then(function () {return tressa.async(function (done) {
  tressa.log('## placeholder');
  var div = document.createElement('div');
  var vdiv = document.createElement('div');
  hyperHTML.bind(div)`<p>${{eUC: 'b c', placeholder: 'z'}}</p>`;
  hyperHTML.bind(vdiv)`a=${{eUC: 'b c', placeholder: 'z'}}`;
  tressa.assert(/<p>z<!--.+?--><\/p>/.test(div.innerHTML), 'expected inner placeholder layout');
  tressa.assert(/a=z<[^>]+?>/.test(vdiv.innerHTML), 'expected virtual placeholder layout');
  setTimeout(function () {
    tressa.assert(/<p>b%20c<!--.+?--><\/p>/.test(div.innerHTML), 'expected inner resolved layout');
    tressa.assert(/a=b%20c<[^>]+?>/.test(vdiv.innerHTML), 'expected virtual resolved layout');
    hyperHTML.bind(div)`<p>${{text: 1, placeholder: '9'}}</p>`;
    setTimeout(function () {
      tressa.assert(/<p>1<!--.+?--><\/p>/.test(div.innerHTML), 'placeholder with text');
      hyperHTML.bind(div)`<p>${{any: [1, 2], placeholder: '9'}}</p>`;
      setTimeout(function () {
        tressa.assert(/<p>12<!--.+?--><\/p>/.test(div.innerHTML), 'placeholder with any');
        hyperHTML.bind(div)`<p>${{html: '<b>3</b>', placeholder: '9'}}</p>`;
        setTimeout(function () {
          tressa.assert(/<p><b>3<\/b><!--.+?--><\/p>/.test(div.innerHTML), 'placeholder with html');
          done();
        }, 10);
      }, 10);
    }, 10);
  }, 10);
});})
.then(function () {
  tressa.log('## hyper(...)');
  var hyper = hyperHTML.hyper;
  tressa.assert(typeof hyper() === 'function', 'empty hyper() is a wire tag');
  tressa.assert((hyper`abc`).textContent === 'abc', 'hyper`abc`');
  tressa.assert((hyper`<p>a${2}c</p>`).textContent === 'a2c', 'hyper`<p>a${2}c</p>`');
  tressa.assert((hyper(document.createElement('div'))`abc`).textContent === 'abc', 'hyper(div)`abc`');
  tressa.assert((hyper(document.createElement('div'))`a${'b'}c`).textContent === 'abc', 'hyper(div)`a${"b"}c`');
  // WFT jsdom ?!
  delete Object.prototype.nodeType;
  tressa.assert((hyper({})`abc`).textContent === 'abc', 'hyper({})`abc`');
  tressa.assert((hyper({})`<p>a${'b'}c</p>`).textContent === 'abc', 'hyper({})`<p>a${\'b\'}c</p>`');
  tressa.assert((hyper({}, ':id')`abc`).textContent === 'abc', 'hyper({}, \':id\')`abc`');
  tressa.assert((hyper({}, ':id')`<p>a${'b'}c</p>`).textContent === 'abc', 'hyper({}, \':id\')`<p>a${\'b\'}c</p>`');
  tressa.assert((hyper('svg')`<rect />`), 'hyper("svg")`<rect />`');
})
.then(function () {
  tressa.log('## data=${anyContent}');
  var obj = {rand: Math.random()};
  var div = hyperHTML.wire()`<div data=${obj}>abc</div>`;
  tressa.assert(div.data === obj, 'data available without serialization');
  tressa.assert(div.outerHTML === '<div>abc</div>', 'attribute not there');
})
.then(function () {
  tressa.log('## hyper.Component');
  class Button extends hyperHTML.Component {
    render() { return this.html`
      <button>hello</button>`;
    }
  }
  class Rect extends hyperHTML.Component {
    constructor(state) {
      super();
      this.setState(state, false);
    }
    render() { return this.svg`
      <rect x=${this.state.x} y=${this.state.y} />`;
    }
  }
  class Paragraph extends hyperHTML.Component {
    constructor(state) {
      super();
      this.setState(state);
    }
    onclick() { this.clicked = true; }
    render() { return this.html`
      <p attr=${this.state.attr} onclick=${this}>hello</p>`;
    }
  }

  var div = document.createElement('div');
  var render = hyperHTML.bind(div);

  render`${[
    new Button,
    new Rect({x: 123, y: 456})
  ]}`;
  tressa.assert(div.querySelector('button'), 'the <button> exists');
  tressa.assert(div.querySelector('rect'), 'the <rect /> exists');
  tressa.assert(div.querySelector('rect').getAttribute('x') == '123', 'attributes are OK');
  var p = new Paragraph(() => ({attr: 'test'}));
  render`${p}`;
  tressa.assert(div.querySelector('p').getAttribute('attr') === 'test', 'the <p attr=test> is defined');
  p.render().click();
  tressa.assert(p.clicked, 'the event worked');
  render`${[
    hyperHTML.Component.for.call(Rect, {x: 789, y: 123})
  ]}`;
  tressa.assert(div.querySelector('rect').getAttribute('x') == '789', 'the for(state) worked');
})
.then(function () {
  return tressa.async(function (done) {
    tressa.log('## Component method via data-call');
    class Paragraph extends hyperHTML.Component {
      globally(e) {
        tressa.assert(e.type === 'click', 'data-call invoked globall');
        done();
      }
      test(e) {
        tressa.assert(e.type === 'click', 'data-call invoked locally');
      }
      render() { return this.html`
        <p data-call="test" onclick=${this}>hello</p>`;
      }
    }
    class GlobalEvent extends hyperHTML.Component {
      onclick(e) {
        tressa.assert(e.type === 'click', 'click invoked globally');
        document.removeEventListener('click', this);
        done();
      }
      render() {
        document.addEventListener('click', this);
        return document;
      }
    }
    var p = new Paragraph();
    p.render().click();
    var e = document.createEvent('Event');
    e.initEvent('click', true, true);
    (new GlobalEvent).render().dispatchEvent(e);
  });
})
.then(function () { return tressa.async(function (done) {
  tressa.log('## Custom Element attributes');
  var global = document.defaultView;
  var registry = global.customElements;
  var customElements = {
    _: Object.create(null),
    define: function (name, Class) {
      this._[name.toLowerCase()] = Class;
    },
    get: function (name) {
      return this._[name.toLowerCase()];
    }
  };
  Object.defineProperty(global, 'customElements', {
    configurable: true,
    value: customElements
  });
  function DumbElement() {}
  DumbElement.prototype.dumb = null;
  DumbElement.prototype.asd = null;
  customElements.define('dumb-element', DumbElement);
  function update(wire) {
    return wire`<div>
      <dumb-element dumb=${true} asd=${'qwe'}></dumb-element><dumber-element dumb=${true}></dumber-element>
    </div>`;
  }
  var div = update(hyperHTML.wire());
  if (!(div.firstElementChild instanceof DumbElement)) {
    tressa.assert(div.firstElementChild.dumb !== true, 'not upgraded elements does not have special attributes');
    tressa.assert(div.lastElementChild.dumb !== true, 'unknown elements never have special attributes');
    // simulate an upgrade
    div.firstElementChild.constructor.prototype.dumb = null;
  }
  div = update(hyperHTML.wire());
  delete div.firstElementChild.constructor.prototype.dumb;
  tressa.assert(div.firstElementChild.dumb === true, 'upgraded elements have special attributes');
  Object.defineProperty(global, 'customElements', {
    configurable: true,
    value: registry
  });
  done();
}); })
.then(function () {
  tressa.log('## hyper.Component state');
  class DefaultState extends hyperHTML.Component {
    get defaultState() { return {a: 'a'}; }
    render() {}
  }
  class State extends hyperHTML.Component {}
  var ds = new DefaultState;
  var o = ds.state;
  tressa.assert(!ds.propertyIsEnumerable('state'), 'states are not enumerable');
  tressa.assert(!ds.propertyIsEnumerable('_state$'), 'neither their secret');
  tressa.assert(o.a === 'a', 'default state retrieved');
  var s = new State;
  s.state = o;
  tressa.assert(s.state === o, 'state can be set too');
  ds.setState({b: 'b'});
  tressa.assert(o.a === 'a' && o.b === 'b', 'state was updated');
  s.state = {z: 123};
  tressa.assert(s.state.z === 123 && !s.state.a, 'state can be re-set too');
})
.then(function () {
  tressa.log('## splice and sort');
  var todo = [
    {id: 0, text: 'write documentation'},
    {id: 1, text: 'publish online'},
    {id: 2, text: 'create Code Pen'}
  ];
  var div = document.createElement('div');
  update();
  todo.sort(function(a, b) { return a.text < b.text ? -1 : 1; });
  update();
  tressa.assert(/^\s+create Code Pen\s*publish online\s*write documentation\s+$/.test(div.textContent), 'correct order');
  function update() {
    hyperHTML.bind(div)`<ul>
      ${todo.map(function (item) {
        return hyperHTML.wire(item)
        `<li data-id=${item.id}>${item.text}</li>`;
      })}
    </ul>`;
  }
})
.then(function () {
  return tressa.async(function (done) {
    tressa.log('## Component connected/disconnected');
    var calls = 0;
    class Paragraph extends hyperHTML.Component {
      onconnected(e) {
        calls++;
        tressa.assert(e.type === 'connected', 'component connected');
        e.currentTarget.parentNode.removeChild(e.currentTarget);
      }
      ondisconnected(e) {
        calls++;
        tressa.assert(e.type === 'disconnected', 'component disconnected');
      }
      render() { return this.html`
        <p onconnected=${this} ondisconnected=${this}>hello</p>`;
      }
    }
    var p = new Paragraph().render();
    document.body.appendChild(p);
    if (p.parentNode) {
      setTimeout(function () {
        var e = document.createEvent('Event');
        e.initEvent('DOMNodeInserted', false, false);
        Object.defineProperty(e, 'target', {value: document.body});
        document.dispatchEvent(e);
        setTimeout(function () {
          e = document.createEvent('Event');
          e.initEvent('DOMNodeInserted', false, false);
          Object.defineProperty(e, 'target', {value: document.createTextNode('')});
          document.dispatchEvent(e);
          setTimeout(function () {
            e = document.createEvent('Event');
            e.initEvent('DOMNodeRemoved', false, false);
            Object.defineProperty(e, 'target', {value: p});
            document.dispatchEvent(e);
            setTimeout(function () {
              tressa.assert(calls === 2, 'correct amount of calls');
              done();
            }, 100);
          }, 100);
        }, 100);
      }, 100);
    }
  });
})
.then(function () {
  tressa.log('## style=${fun}');
  var render = hyperHTML.wire();
  function p(style) {
    return render`<p style=${style}></p>`;
  }
  var node = p({fontSize:24});
  tressa.assert(node.style.fontSize, node.style.fontSize);
  p({});
  tressa.assert(!node.style.fontSize, 'object cleaned');
  p('font-size: 18px');
  tressa.assert(node.style.fontSize, node.style.fontSize);
  p({'--custom-color': 'red'});
  if (node.style.cssText !== '')
    tressa.assert(node.style.getPropertyValue('--custom-color') === 'red', 'custom style');
  else
    console.log('skipping CSS properties for IE');
})
.then(function () {
  tressa.log('## <self-closing />');
  var div = hyperHTML.wire()`<div><self-closing test=${1} /><input /><self-closing test="2" /></div>`;
  tressa.assert(div.childNodes.length === 3, 'nodes did self close');
  tressa.assert(div.childNodes[0].getAttribute('test') == "1", 'first node ok');
  tressa.assert(/input/i.test(div.childNodes[1].nodeName), 'second node ok');
  tressa.assert(div.childNodes[2].getAttribute('test') == "2", 'third node ok');
  div = hyperHTML.wire()`<div>
    <self-closing
      test=1
    /><input
    /><self-closing test="2"
     />
     </div>`;
  tressa.assert(div.children.length === 3, 'nodes did self close');
  tressa.assert(div.children[0].getAttribute('test') == "1", 'first node ok');
  tressa.assert(/input/i.test(div.children[1].nodeName), 'second node ok');
  tressa.assert(div.children[2].getAttribute('test') == "2", 'third node ok');
  div = hyperHTML.wire()`
  <div style="width: 200px;">
    <svg viewBox="0 0 30 30" fill="currentColor">
      <path d="M 0,27 L 27,0 L 30,3 L 3,30 Z" />
      <path d="M 0,3 L 3,0 L 30,27 L 27,30 Z" />
    </svg>
  </div>
  `;
  tressa.assert(div.children.length === 1, 'one svg');
  tressa.assert(div.querySelectorAll('path').length === 2, 'two paths');
})
.then(function () {
  tressa.log('## hyperHTML.adopt(liveNode)');
  var div = document.createElement('div');
  div.innerHTML = `
  <div test="before">
    <!--:1-->before<!--:1-->
    <ul>
      <!--:2--><li> lonely </li><!--:2-->
    </ul>
    <!--:3-->NO<!--:3-->
    <hr>
    <input value="test">
  </div>`;
  hyperHTML.adopt(div)`
  <div test="${'after'}">
    ${'after'}
    <ul aint=${'there'}>
      ${[`<li> ${'happy'} </li>`]}
    </ul>
    ${'yes'}
    <hr>
    <input value=${'test'}>
  </div>`;
  tressa.assert(
    /^\s*\bafter\b/.test(div.firstElementChild.textContent),
    'plain content is fine'
  );
  tressa.assert(
    div.querySelector('li').textContent === ' happy ',
    'list elements are fine'
  );
  tressa.assert(
    /\byes\b\s*$/.test(div.firstElementChild.textContent),
    'content in between is fine'
  );

  // TODO: textarea is not working and also nodes outside
  //       the regular hierarchy. i.e. add <p> after the previous div
  /*
  div.innerHTML = `<textarea><!--:1-->nope<!--:1--></textarea>`;
  hyperHTML.adopt(div)`<textarea>${'yep'}</textarea>`;
  tressa.assert(
    div.textContent === 'yep',
    'text content is fine'
  );
  // */
})
.then(function () {
  tressa.log('## <with><self-closing /></with>');
  function check(form) {
    return form.children.length === 3 &&
            /label/i.test(form.children[0].nodeName) &&
            /input/i.test(form.children[1].nodeName) &&
            /button/i.test(form.children[2].nodeName)
  }
  tressa.assert(
    check(hyperHTML.wire()`
    <form onsubmit=${check}>
      <label/>
      <input type="email" placeholder="email">
      <button>Button</button>
    </form>`),
    'no quotes is OK'
  );
  tressa.assert(
    check(hyperHTML.wire()`
    <form onsubmit=${check}>
      <label />
      <input type="email" placeholder="email"/>
      <button>Button</button>
    </form>`),
    'self closing is OK'
  );
  tressa.assert(
    check(hyperHTML.wire()`
    <form onsubmit="${check}">
      <label/>
      <input type="email" placeholder="email">
      <button>Button</button>
    </form>`),
    'quotes are OK'
  );
  tressa.assert(
    check(hyperHTML.wire()`
    <form onsubmit="${check}">
      <label/>
      <input type="email" placeholder="email" />
      <button>Button</button>
    </form>`),
    'quotes and self-closing too OK'
  );
})
.then(function () {
  return tressa.async(function (done) {
    tressa.log('## Nested Component connected/disconnected');

    class GrandChild extends hyperHTML.Component {
      onconnected(e) {
        tressa.assert(e.type === 'connected', 'grand child component connected');
      }
      ondisconnected(e) {
        tressa.assert(e.type === 'disconnected', 'grand child component disconnected');
      }
      render() {
        return this.html`
        <p class="grandchild" onconnected=${this} ondisconnected=${this}>I'm grand child</p>`;
      }
    }

    class Child extends hyperHTML.Component {
      onconnected(e) {
        tressa.assert(e.type === 'connected', 'child component connected');
      }
      ondisconnected(e) {
        tressa.assert(e.type === 'disconnected', 'child component disconnected');
      }
      render() {
        return this.html`
          <div class="child" onconnected=${this} ondisconnected=${this}>I'm child
            ${new GrandChild()}
          </div>
        `;
      }
    }

    let connectedTimes = 0, disconnectedTimes = 0;
    class Parent extends hyperHTML.Component {
      onconnected(e) {
        connectedTimes ++;
        tressa.assert(e.type === 'connected', 'parent component connected');
        tressa.assert(connectedTimes === 1, 'connected callback should only be triggered once');
      }
      ondisconnected(e) {
        disconnectedTimes ++;
        tressa.assert(e.type === 'disconnected', 'parent component disconnected');
        tressa.assert(disconnectedTimes === 1, 'disconnected callback should only be triggered once');

        done();
      }
      render() {
        return this.html`
          <div class="parent" onconnected=${this} ondisconnected=${this}>I'm parent
            ${new Child()}
          </div>
        `;
      }
    }

    var p = new Parent().render();
    document.body.appendChild(p);

    setTimeout(function () {
      if (p.parentNode) {
        var e = document.createEvent('Event');
        e.initEvent('DOMNodeInserted', false, false);
        Object.defineProperty(e, 'target', {value: document.body});
        document.dispatchEvent(e);

        setTimeout(function () {
          e = document.createEvent('Event');
          e.initEvent('DOMNodeRemoved', false, false);
          Object.defineProperty(e, 'target', {value: p});
          document.dispatchEvent(e);
          if (p.parentNode)
            p.parentNode.removeChild(p);
        }, 100);
      }
    }, 100);
  });
})
.then(function () {
  tressa.log('## Declarative Components');
  class MenuSimple extends hyperHTML.Component {
    render(props) {
      return this.setState(props, false).html`
        <div>A simple menu</div>
        <ul>
          ${props.items.map(
            (item, i) => MenuItem.for(this, i).render(item)
          )}
        </ul>
      `;
    }
  }
  class MenuWeakMap extends hyperHTML.Component {
    render(props) {
      return this.setState(props, false).html`
        <div>A simple menu</div>
        <ul>
          ${props.items.map(
            item => MenuItem.for(this, item).render(item)
          )}
        </ul>
      `;
    }
  }
  class MenuItem extends hyperHTML.Component {
    render(props) {
      return this.setState(props, false).html`
        <li>${props.name}</li>
      `;
    }
  }
  var a = document.createElement('div');
  var b = document.createElement('div');
  var method = hyperHTML.Component.for;
  if (!MenuSimple.for) {
    MenuSimple.for = method;
    MenuWeakMap.for = method;
    MenuItem.for = method;
  }
  hyperHTML.bind(a)`${MenuSimple.for(a).render({
    items: [{name: 'item 1'}, {name: 'item 2'}, {name: 'item 3'}]
  })}`;
  tressa.assert(MenuSimple.for(a) === MenuSimple.for(a), 'same simple menu');
  hyperHTML.bind(b)`${MenuWeakMap.for(b).render({
    items: [{name: 'item 1'}, {name: 'item 2'}, {name: 'item 3'}]
  })}`;
  tressa.assert(MenuWeakMap.for(a) === MenuWeakMap.for(a), 'same weakmap menu');
  tressa.assert(MenuSimple.for(a) !== MenuWeakMap.for(a), 'different from simple');
  tressa.assert(MenuSimple.for(a) === MenuSimple.for(a), 'same as simple');
  tressa.assert(a.outerHTML === b.outerHTML, 'same layout');
})
.then(function () {
  tressa.log('## Component.dispatch');
  class Pomponent extends hyperHTML.Component {
    trigger() {
      this.dispatch('event', 123);
    }
    render() {
      return this.html`<p>a</p><p>b</p>`;
    }
  }
  class Solonent extends hyperHTML.Component {
    render() {
      return this.html`<p>c</p>`;
    }
  }
  var a = document.createElement('div');
  var p = new Pomponent;
  p.trigger();
  var s = new Solonent;
  var dispatched = false;
  hyperHTML.bind(a)`${[p, s]}`;
  a.addEventListener('event', event => {
    tressa.assert(event.detail === 123, 'expected details');
    tressa.assert(event.component === p, 'expected component');
    dispatched = true;
  });
  p.trigger();
  s.dispatch('test');
  if (!dispatched) throw new Error('broken dispatch');
})
.then(function () {
  tressa.log('## slotted callback');
  var div = document.createElement('div');
  var result = [];
  function A() {
    result.push(arguments);
    return {html: '<b>a</b>'};
  }
  function B() {
    result.push(arguments);
    return {html: '<b>b</b>'};
  }
  function update() {
    hyperHTML.bind(div)`${A} - ${B}`;
  }
  update();
  tressa.assert(result[0][0].parentNode === div, 'expected parent node for A');
  tressa.assert(result[1][0].parentNode === div, 'expected parent node for B');
})
.then(function () {
  tressa.log('## define(hyper-attribute, callback)');
  var a = document.createElement('div');
  var random = Math.random().toPrecision(6); // IE < 11
  var result = [];
  hyperHTML.define('hyper-attribute', function (target, value) {
    result.push(target, value);
    return random;
  });
  hyperHTML.bind(a)`<p hyper-attribute=${random}/>`;
  if (!result.length)
    throw new Error('attributes intents failed');
  else {
    tressa.assert(result[0] === a.firstElementChild, 'expected target');
    tressa.assert(result[1] === random, 'expected value');
    tressa.assert(
      a.firstElementChild.getAttribute('hyper-attribute') == random,
      'expected attribute'
    );
  }
  result.splice(0);
  hyperHTML.define('other-attribute', function (target, value) {
    result.push(target, value);
    return '';
  });
  hyperHTML.define('disappeared-attribute', function (target, value) {
  });
  hyperHTML.define('whatever-attribute', function (target, value) {
    return value;
  });
  hyperHTML.define('null-attribute', function (target, value) {
    return null;
  });
  hyperHTML.bind(a)`<p
    other-attribute=${random}
    disappeared-attribute=${random}
    whatever-attribute=${random}
    null-attribute=${random}
  />`;
  if (!result.length)
    throw new Error('attributes intents failed');
  else {
    tressa.assert(result[0] === a.firstElementChild, 'expected other target');
    tressa.assert(result[1] === random, 'expected other value');
    tressa.assert(
      a.firstElementChild.getAttribute('other-attribute') === '',
      'expected other attribute'
    );
    tressa.assert(
      !a.firstElementChild.hasAttribute('disappeared-attribute'),
      'disappeared-attribute removed'
    );
    tressa.assert(
      a.firstElementChild.getAttribute('whatever-attribute') == random,
      'whatever-attribute set'
    );
    tressa.assert(
      !a.firstElementChild.hasAttribute('null-attribute'),
      'null-attribute removed'
    );
  }
})
// WARNING THESE TEST MUST BE AT THE VERY END
// WARNING THESE TEST MUST BE AT THE VERY END
// WARNING THESE TEST MUST BE AT THE VERY END
.then(function () {
  // WARNING THESE TEST MUST BE AT THE VERY END
  tressa.log('## IE9 double viewBox 🌈 🌈');
  var output = document.createElement('div');
  try {
    hyperHTML.bind(output)`<svg viewBox=${'0 0 50 50'}></svg>`;
    tressa.assert(output.firstChild.getAttribute('viewBox') == '0 0 50 50', 'correct camelCase attribute');
  } catch(o_O) {
    tressa.assert(true, 'code coverage caveat');
  }
})
.then(function () {
  tressa.log('## A-Frame compatibility');
  var output = hyperHTML.wire()`<a-scene></a-scene>`;
  tressa.assert(output.nodeName.toLowerCase() === 'a-scene', 'correct element');
})
// */
.then(function () {
  if (!tressa.exitCode) {
    document.body.style.backgroundColor = '#0FA';
  }
  tressa.end();
});
