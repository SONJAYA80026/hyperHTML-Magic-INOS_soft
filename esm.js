/*! (c) Andrea Giammarchi (ISC) */var hyperHTML=function(e){"use strict";function t(){return this}/*! (c) Andrea Giammarchi - ISC */
function n(e){return e.join(ee).replace(he,o).replace(fe,r)}function r(e,t,n,r){return"<"+t+n.replace(de,i)+r}function i(e,t,n){return t+(n||'"')+Y+(n||'"')}function o(e,t,n){return oe.test(t)?e:"<"+t+n+"></"+t+">"}function a(e,t,n,r){return{name:r,node:t,path:n,type:e}}function u(e,t){for(var n=t.length,r=0;r<n;)e=e.childNodes[t[r++]];return e}function c(e,t,n,r){for(var i=e.childNodes,o=i.length,u=0;u<o;){var s=i[u];switch(s.nodeType){case ne:var f=r.concat(u);l(s,t,n,f),c(s,t,n,f);break;case te:var h=s.textContent;if(h===Y)n.shift(),t.push(ie.test(e.nodeName)?a("text",e,r):a("any",s,r.concat(u)));else switch(h.slice(0,2)){case"/*":if("*/"!==h.slice(-2))break;case"👻":e.removeChild(s),u--,o--}break;case re:ie.test(e.nodeName)&&X.call(s.textContent)===ee&&(n.shift(),t.push(a("text",e,r)))}u++}}function l(t,n,r,i){for(var o=new k,u=t.attributes,c=[],l=c.slice.call(u,0),s=l.length,f=0;f<s;){var h=l[f++];if(h.value===Y){var d=h.name;if(!o.has(d)){var v=r.shift().replace(/^(?:|[\S\s]*?\s)(\S+?)\s*=\s*['"]?$/,"$1"),p=u[v]||u[v.toLowerCase()];o.set(d,p),n.push(a("attr",p,i,v))}c.push(h)}}for(s=c.length,f=0;f<s;){var m=c[f++];/^id$/i.test(m.name)?t.removeAttribute(m.name):t.removeAttributeNode(m)}var g=t.nodeName;if(/^script$/i.test(g)){var b=e.createElement(g);for(s=u.length,f=0;f<s;)b.setAttributeNode(u[f++].cloneNode(!0));b.textContent=t.textContent,t.parentNode.replaceChild(b,t)}}function s(e,t){var r=n(t),i=e.transform;i&&(r=i(r));var o=Q(r,e.type);d(o);var a=[];c(o,a,t.slice(0),[]);var l={content:o,updates:function(n){for(var r=[],i=a.length,o=0;o<i;){var c=a[o++],l=u(n,c.path);switch(c.type){case"any":r.push(e.any(l,[]));break;case"attr":r.push(e.attribute(l,c.name,c.node));break;case"text":r.push(e.text(l)),l.textContent=""}}return function(){var e=arguments.length,o=e-1,a=1;if(i!==o)throw new Error(o+" values instead of "+i+"\n"+t.join(", "));for(;a<e;)r[a-1](arguments[a++]);return n}}};return ve.set(t,l),l}function f(t,n){var r=ve.get(n)||s(t,n),i=U.call(e,r.content,!0),o={content:i,template:n,updates:r.updates(i)};return pe.set(t,o),o}function h(e){return function(t){var n=pe.get(e);return null!=n&&n.template===t||(n=f(e,t)),n.updates.apply(null,arguments),n.content}}function d(e){for(var t=e.childNodes,n=t.length;n--;){var r=t[n];1!==r.nodeType&&0===X.call(r.textContent).length&&e.removeChild(r)}}function v(e){return this.type=e,h(this)}function p(e){return _e?e:Oe(e)}function m(e){for(var t=arguments.length,n=[p(e)],r=1;r<t;)n.push(arguments[r++]);return n}function g(){var e=$e.get(this),t=m.apply(null,arguments);return e&&e.template===t[0]?e.tagger.apply(null,t):b.apply(this,t),this}function b(e){var t=be in this?"svg":"html",n=new v(t);$e.set(this,{tagger:n,template:e}),this.textContent="",this.appendChild(n.apply(null,arguments))}function y(e){return arguments.length<2?null==e?De("html"):"string"==typeof e?y.wire(null,e):"raw"in e?De("html")(e):"nodeType"in e?y.bind(e):Pe(e,"html"):("raw"in e?De("html"):y.wire).apply(null,arguments)}/*! (c) Andrea Giammarchi - ISC */
var w={};try{w.WeakMap=WeakMap}catch(WeakMap){w.WeakMap=function(e,t){function n(t){i(this,"_",{value:"_@ungap/weakmap"+e++}),t&&t.forEach(r,this)}function r(e){this.set(e[0],e[1])}var i=t.defineProperty,o=t.hasOwnProperty,a=n.prototype;return a["delete"]=function(e){return this.has(e)&&delete e[this._]},a.get=function(e){return this.has(e)?e[this._]:void 0},a.has=function(e){return o.call(e,this._)},a.set=function(e,t){return i(e,this._,{configurable:!0,value:t}),this},n}(Math.random(),Object)}var N=w.WeakMap,x={};try{x.WeakSet=WeakSet}catch(WeakSet){!function(e,t){function n(){t(this,"_",{value:"_@ungap/weakmap"+e++})}var r=n.prototype;r.add=function(e){return this.has(e)||t(e,this._,{value:!0,configurable:!0}),this},r.has=function(e){return this.hasOwnProperty.call(e,this._)},r["delete"]=function(e){return this.has(e)&&delete e[this._]},x.WeakSet=n}(Math.random(),Object.defineProperty)}var E=x.WeakSet,C={};try{C.Map=Map}catch(Map){C.Map=function(){function e(e){return-1<(t=n.indexOf(e))}var t=0,n=[],r=[];return{"delete":function(i){var o=e(i);return o&&(n.splice(t,1),r.splice(t,1)),o},get:function(n){return e(n)?r[t]:void 0},has:function(t){return e(t)},set:function(i,o){return r[e(i)?t:n.push(i)-1]=o,this}}}}var k=C.Map,A=function(e,t,n,r,i,o){for(;r<i;)t.insertBefore(e(n[r++],1),o)},S=function(e,t){return e==t},T=function(e){return e},M=function(e,t,n,r,i,o,a){var u=o-i;if(u<1)return-1;for(;n-t>=u;){for(var c=t,l=i;c<n&&l<o&&a(e[c],r[l]);)c++,l++;if(l===o)return t;t=c+1}return-1},_=function(e,t,n,r,i,o){for(;r<i&&o(n[r],e[t-1]);)r++,t--;return 0===t},O=function(e,t,n,r,i){return n<r?e(t[n],0):0<n?e(t[n-1],-0).nextSibling:i},j=function(e,t,n,r,i){if(i-r<2)t.removeChild(e(n[r],-1));else{var o=t.ownerDocument.createRange();o.setStartBefore(e(n[r],-1)),o.setEndAfter(e(n[i-1],-1)),o.deleteContents()}},L=function(e,t,n,r,i,o,a,u){var c=0,l=r<u?r:u,s=Array(l++),f=Array(l);f[0]=-1;for(var h=1;h<l;h++)f[h]=a;for(var d=new k,v=o;v<a;v++)d.set(i[v],v);for(var p=t;p<n;p++){var m=d.get(e[p]);null!=m&&-1<(c=W(f,l,m))&&(f[c]=m,s[c]={newi:p,oldi:m,prev:s[c-1]})}for(c=--l,--a;f[c]>a;)--c;l=u+r-c;var g=Array(l),b=s[c];for(--n;b;){for(var y=b,w=y.newi,N=y.oldi;n>w;)g[--l]=1,--n;for(;a>N;)g[--l]=-1,--a;g[--l]=0,--n,--a,b=b.prev}for(;n>=t;)g[--l]=1,--n;for(;a>=o;)g[--l]=-1,--a;return g},D=function(e,t,n,r,i,o,a){var u,c,l,s,f,h,d,v=n+o,p=[];e:for(u=0;u<=v;u++){if(u>50)return null;for(d=u-1,f=u?p[u-1]:[0,0],h=p[u]=[],c=-u;c<=u;c+=2){for(s=c===-u||c!==u&&f[d+c-1]<f[d+c+1]?f[d+c+1]:f[d+c-1]+1,l=s-c;s<o&&l<n&&a(r[i+s],e[t+l]);)s++,l++;if(s===o&&l===n)break e;h[u+c]=s}}var m=Array(u/2+v/2),g=m.length-1;for(u=p.length-1;u>=0;u--){for(;s>0&&l>0&&a(r[i+s-1],e[t+l-1]);)m[g--]=0,s--,l--;if(!u)break;d=u-1,f=u?p[u-1]:[0,0],c=s-l,c===-u||c!==u&&f[d+c-1]<f[d+c+1]?(l--,m[g--]=1):(s--,m[g--]=-1)}return m},P=function(e,t,n,r,i,o,a,u,c){for(var l=new k,s=e.length,f=a,h=0;h<s;)switch(e[h++]){case 0:i++,f++;break;case 1:l.set(r[i],1),A(t,n,r,i++,i,f<u?t(o[f],0):c);break;case-1:f++}for(h=0;h<s;)switch(e[h++]){case 0:a++;break;case-1:l.has(o[a])?a++:j(t,n,o,a++,a)}},W=function(e,t,n){for(var r=1,i=t;r<i;){var o=(r+i)/2>>>0;n<e[o]?i=o:r=o+1}return r},$=function(e,t,n,r,i,o,a,u,c,l,s,f,h){P(D(n,r,o,a,u,l,f)||L(n,r,i,o,a,u,c,l),e,t,n,r,a,u,s,h)},R=function(e,t,n,r){r||(r={});for(var i=r.compare||S,o=r.node||T,a=null==r.before?null:o(r.before,0),u=t.length,c=u,l=0,s=n.length,f=0;l<c&&f<s&&i(t[l],n[f]);)l++,f++;for(;l<c&&f<s&&i(t[c-1],n[s-1]);)c--,s--;var h=l===c,d=f===s;if(h&&d)return n;if(h&&f<s)return A(o,e,n,f,s,O(o,t,l,u,a)),n;if(d&&l<c)return j(o,e,t,l,c),n;var v=c-l,p=s-f,m=-1;if(v<p){if(-1<(m=M(n,f,s,t,l,c,i)))return A(o,e,n,f,m,o(t[l],0)),A(o,e,n,m+v,s,O(o,t,c,u,a)),n}else if(p<v&&-1<(m=M(t,l,c,n,f,s,i)))return j(o,e,t,l,m),j(o,e,t,m+p,c),n;return v<2||p<2?(A(o,e,n,f,s,o(t[l],0)),j(o,e,t,l,c),n):v===p&&_(n,s,t,l,c,i)?(A(o,e,n,f,s,O(o,t,c,u,a)),n):($(o,e,n,f,s,p,t,l,c,v,u,i,a),n)},F={};F.CustomEvent="function"==typeof CustomEvent?CustomEvent:function(t){function n(t,n){n||(n={});var r=e.createEvent("CustomEvent");return r.initCustomEvent(t,!!n.bubbles,!!n.cancelable,n.detail),r}return n.prototype=new n("").constructor.prototype,n}();var H=F.CustomEvent,z=function(e,t){var n="_"+e+"$";return{get:function(){return this[n]||Z(this,n,t.call(this,e))},set:function(e){Z(this,n,e)}}},Z=function(e,t,n){return Object.defineProperty(e,t,{configurable:!0,value:"function"==typeof n?function(){return e._wire$=n.apply(this,arguments)}:n})[t]};Object.defineProperties(t.prototype,{ELEMENT_NODE:{value:1},nodeType:{value:-1}});var B={},V={},G=[],I=V.hasOwnProperty,q=0,J={attributes:B,define:function(e,t){e.indexOf("-")<0?(e in V||(q=G.push(e)),V[e]=t):B[e]=t},invoke:function(e,t){for(var n=0;n<q;n++){var r=G[n];if(I.call(e,r))return V[r](e[r],t)}}},K=Array.isArray||function(e){var t=e.call([]);return function(n){return e.call(n)===t}}({}.toString),Q=function(e){function t(e,t){for(var n=t.length;n--;)e.appendChild(t[0])}function n(t){return t===i?e.createDocumentFragment():e.createElementNS("http://www.w3.org/1999/xhtml",t)}function r(e){var r=n(i),o=n("div");return o.innerHTML='<svg xmlns="http://www.w3.org/2000/svg">'+e+"</svg>",t(r,o.firstChild.childNodes),r}var i="fragment",o="content"in n("template"),a=o?function(e){var t=n("template");return t.innerHTML=e,t.content}:function(e){var r=n(i),o=n("template"),a=null;if(/^[^\S]*?<(col(?:group)?|t(?:head|body|foot|r|d|h))/i.test(e)){var u=RegExp.$1;o.innerHTML="<table>"+e+"</table>",a=o.querySelectorAll(u)}else o.innerHTML=e,a=o.childNodes;return t(r,a),r};return function(e,t){return("svg"===t?r:a)(e)}}(e),U=function(e,t,n,r,i){var o="importNode"in e,a=e.createDocumentFragment();return a.appendChild(e.createTextNode("g")),a.appendChild(e.createTextNode("")),(o?e.importNode(a,!0):a.cloneNode(!0)).childNodes.length<2?function u(e,t){for(var n=e.cloneNode(),r=e.childNodes||[],i=r.length,o=0;t&&o<i;o++)n.appendChild(u(r[o],t));return n}:o?e.importNode:function(e,t){return e.cloneNode(!!t)}}(e),X="".trim||function(){return String(this).replace(/^\s+|\s+/g,"")},Y="-"+Math.random().toFixed(6)+"%";try{(function(e,t,n){return"content"in e&&(e.innerHTML='<p tabindex="'+Y+'"></p>',e.content.childNodes[0].getAttribute("tabindex")==Y)})(e.createElement("template"))||(Y="_dt: "+Y.slice(1,-1)+";")}catch(ze){}var ee="\x3c!--"+Y+"--\x3e",te=8,ne=1,re=3,ie=/^(?:style|textarea)$/i,oe=/^(?:area|base|br|col|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr)$/i,ae=" \\f\\n\\r\\t",ue="[^"+ae+"\\/>\"'=]+",ce="["+ae+"]+"+ue,le="<([A-Za-z]+[A-Za-z0-9:_-]*)((?:",se="(?:\\s*=\\s*(?:'[^']*?'|\"[^\"]*?\"|<[^>]*?>|"+ue.replace("\\/","")+"))?)",fe=new RegExp(le+ce+se+"+)(["+ae+"]*/?>)","g"),he=new RegExp(le+ce+se+"*)(["+ae+"]*/>)","g"),de=new RegExp("("+ce+"\\s*=\\s*)(['\"]?)"+ee+"\\2","gi"),ve=new N,pe=new N,me=function(){function e(e,t,n){return t+"-"+n.toLowerCase()}function t(e,t){var n;return t?n=t.cloneNode(!0):(e.setAttribute("style","--hyper:style;"),n=e.getAttributeNode("style")),n.value="",e.setAttributeNode(n),r(n,!0)}function n(t){var n,r=[];for(n in t)r.push(n.replace(o,e),":",t[n],";");return r.join("")}function r(e,t){var r,o;return function(a){var u,c,l,s;switch(typeof a){case"object":if(a){if("object"===r){if(!t&&o!==a)for(c in o)c in a||(e[c]="")}else t?e.value="":e.cssText="";u=t?{}:e;for(c in a)s=a[c],l="number"!=typeof s||i.test(c)?s:s+"px",!t&&/^--/.test(c)?u.setProperty(c,l):u[c]=l;r="object",t?e.value=n(o=u):o=a;break}default:o!=a&&(r="string",o=a,t?e.value=a||"":e.cssText=a||"")}}}var i=/acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i,o=/([^A-Z])([A-Z]+)/g;return function(e,n){return"ownerSVGElement"in e?t(e,n):r(e.style,!1)}}(),ge=function(e,t){function n(t){var n=this.childNodes=e.call(t,0);this.firstChild=n[0],this.lastChild=n[n.length-1],this.ownerDocument=n[0].ownerDocument,this._=null}return t=n.prototype,t.ELEMENT_NODE=1,t.nodeType=111,t.remove=function(e){var t=this.childNodes,n=this.firstChild,r=this.lastChild;if(this._=null,e&&2===t.length)r.parentNode.removeChild(r);else{var i=this.ownerDocument.createRange();i.setStartBefore(e?t[1]:n),i.setEndAfter(r),i.deleteContents()}return n},t.valueOf=function(e){var t=this._,n=null==t;if(n&&(t=this._=this.ownerDocument.createDocumentFragment()),n||e)for(var r=this.childNodes,i=0,o=r.length;i<o;i++)t.appendChild(r[i]);return t},n}([].slice),be="ownerSVGElement",ye=t.prototype.nodeType,we=ge.prototype.nodeType,Ne=/*! (c) Andrea Giammarchi */
function(e){function t(e){function t(e){for(var t,n=e.length,r=0;r<n;r++)t=e[r],i(t.removedNodes,"disconnected",c,u),i(t.addedNodes,"connected",u,c)}function i(e,t,r,i){for(var o,u=new n(t),c=e.length,l=0;l<c;1===(o=e[l++]).nodeType&&a(o,u,t,r,i));}function a(e,t,n,r,i){o.has(e)&&!r.has(e)&&(i["delete"](e),r.add(e),e.dispatchEvent(t));for(var u=e.children||[],c=u.length,l=0;l<c;a(u[l++],t,n,r,i));}var u=new r,c=new r;try{new MutationObserver(t).observe(e,{subtree:!0,childList:!0})}catch(h){var l=0,s=[],f=function(e){s.push(e),clearTimeout(l),l=setTimeout(function(){t(s.splice(l=0,s.length))},0)};e.addEventListener("DOMNodeRemoved",function(e){f({addedNodes:[],removedNodes:[e.target]})},!0),e.addEventListener("DOMNodeInserted",function(e){f({addedNodes:[e.target],removedNodes:[]})},!0)}}var n=e.Event,r=e.WeakSet,i=!0,o=null;return function(e){return i&&(i=!i,o=new r,t(e.ownerDocument)),o.add(e),e}}({Event:H,WeakSet:E}),xe=function(e){return{html:e}},Ee=function Ze(e,t){switch(e.nodeType){case we:return 1/t<0?t?e.remove(!0):e.lastChild:t?e.valueOf(!0):e.firstChild;case ye:return Ze(e.render(),t);default:return e}},Ce=function(e){return"ELEMENT_NODE"in e},ke=function(e,t){t(e.placeholder),"text"in e?Promise.resolve(e.text).then(String).then(t):"any"in e?Promise.resolve(e.any).then(t):"html"in e?Promise.resolve(e.html).then(xe).then(t):Promise.resolve(J.invoke(e,t)).then(t)},Ae=function(e){return null!=e&&"then"in e},Se=/^(?:form|list)$/i,Te=[].slice,Me=function(e,t){return e.ownerDocument.createTextNode(t)};v.prototype={attribute:function(e,t,n){var r,i=be in e;if("style"===t)return me(e,n,i);if(/^on/.test(t)){var o=t.slice(2);return"connected"===o||"disconnected"===o?Ne(e):t.toLowerCase()in e&&(o=o.toLowerCase()),function(t){r!==t&&(r&&e.removeEventListener(o,r,!1),r=t,t&&e.addEventListener(o,t,!1))}}if("data"===t||!i&&t in e&&!Se.test(t))return function(n){r!==n&&(r=n,e[t]!==n&&null==n?(e[t]="",e.removeAttribute(t)):e[t]=n)};if(t in J.attributes)return function(n){var i=J.attributes[t](e,n);r!==i&&(r=i,null==i?e.removeAttribute(t):e.setAttribute(t,i))};var a=!1,u=n.cloneNode(!0);return function(t){r!==t&&(r=t,u.value!==t&&(null==t?(a&&(a=!1,e.removeAttributeNode(u)),u.value=t):(u.value=t,a||(a=!0,e.setAttributeNode(u)))))}},any:function(e,t){var n,r={node:Ee,before:e},i=be in e?"svg":"html",o=!1;return function a(u){switch(typeof u){case"string":case"number":case"boolean":o?n!==u&&(n=u,t[0].textContent=u):(o=!0,n=u,t=R(e.parentNode,t,[Me(e,u)],r));break;case"function":a(u(e));break;case"object":case"undefined":if(null==u){o=!1,t=R(e.parentNode,t,[],r);break}default:if(o=!1,n=u,K(u))if(0===u.length)t.length&&(t=R(e.parentNode,t,[],r));else switch(typeof u[0]){case"string":case"number":case"boolean":a({html:u});break;case"object":if(K(u[0])&&(u=u.concat.apply([],u)),Ae(u[0])){Promise.all(u).then(a);break}default:t=R(e.parentNode,t,u,r)}else Ce(u)?t=R(e.parentNode,t,11===u.nodeType?Te.call(u.childNodes):[u],r):Ae(u)?u.then(a):"placeholder"in u?ke(u,a):"text"in u?a(String(u.text)):"any"in u?a(u.any):"html"in u?t=R(e.parentNode,t,Te.call(Q([].concat(u.html).join(""),i).childNodes),r):a("length"in u?Te.call(u):J.invoke(u,a))}}},text:function(e){var t;return function n(r){if(t!==r){t=r;var i=typeof r;"object"===i&&r?Ae(r)?r.then(n):"placeholder"in r?ke(r,n):n("text"in r?String(r.text):"any"in r?r.any:"html"in r?[].concat(r.html).join(""):"length"in r?Te.call(r).join(""):J.invoke(r,n)):"function"===i?n(r(e)):e.textContent=null==r?"":r}}}};var _e=!1,Oe=function(t){var n=function(e){return/(Firefox|Safari)\/(\d+)/.test(e)&&!/(Chrom|Android)\/(\d+)/.test(e)}((e.defaultView.navigator||{}).userAgent),r=!("raw"in t)||t.propertyIsEnumerable("raw")||!Object.isFrozen(t.raw);if(n||r){var i={},o=function(e){for(var t=".",n=0;n<e.length;n++)t+=e[n].length+"."+e[n];return i[t]||(i[t]=e)};if(r)Oe=o;else{var a=new N,u=function(e,t){return a.set(e,t),t};Oe=function(e){return a.get(e)||u(e,o(e))}}}else _e=!0;return p(t)},je=new N,Le=function(e,t){return null==e?De(t||"html"):Pe(e,t||"html")},De=function(e){var t,n,r;return function(){var i=m.apply(null,arguments);return r!==i[0]?(r=i[0],n=new v(e),t=We(n.apply(n,i))):n.apply(n,i),t}},Pe=function(e,t){var n=t.indexOf(":"),r=je.get(e),i=t;return-1<n&&(i=t.slice(n+1),t=t.slice(0,n)||"html"),r||je.set(e,r={}),r[i]||(r[i]=De(t))},We=function(e){var t=e.childNodes,n=t.length;return 1===n?t[0]:n?new ge(t):e},$e=new N,Re=function(e){return g.bind(e)},Fe=J.define,He=v.prototype;return y.Component=t,y.bind=Re,y.define=Fe,y.diff=R,y.hyper=y,y.observe=Ne,y.tagger=He,y.wire=Le,y._={WeakMap:N,WeakSet:E},function(e){var n=new N,r=Object.create,i=function(e,t,n){return e.set(t,n),n},o=function(e,t,n,o){var u=t.get(e)||a(e,t);switch(typeof o){case"object":case"function":var c=u.w||(u.w=new N);return c.get(o)||i(c,o,new e(n));default:var l=u.p||(u.p=r(null));return l[o]||(l[o]=new e(n))}},a=function(e,t){var n={w:null,p:null};return t.set(e,n),n},u=function(e){var t=new k;return n.set(e,t),t};Object.defineProperties(t,{"for":{configurable:!0,value:function(e,t){return o(this,n.get(e)||u(e),e,null==t?"default":t)}}}),Object.defineProperties(t.prototype,{handleEvent:{value:function(e){var t=e.currentTarget;this["getAttribute"in t&&t.getAttribute("data-call")||"on"+e.type](e)}},html:z("html",e),svg:z("svg",e),state:z("state",function(){return this.defaultState}),defaultState:{get:function(){return{}}},dispatch:{value:function(e,t){var n=this._wire$;if(n){var r=new H(e,{bubbles:!0,cancelable:!0,detail:t});return r.component=this,(n.dispatchEvent?n:n.firstChild).dispatchEvent(r)}return!1}},setState:{value:function(e,t){var n=this.state,r="function"==typeof e?e.call(this,n):e;for(var i in r)n[i]=r[i];return!1!==t&&this.render(),this}}})}(De),y}(document);
export default hyperHTML;
export const {Component, bind, define, diff, hyper, wire} = hyperHTML;
