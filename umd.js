(function(A,G){if(typeof define=='function'&&define.amd)define([],G);else if(typeof module=='object'&&module.exports)module.exports=G();else A.hyperHTML=G()}(typeof self!='undefined'?self:this,function(){
/*! (c) Andrea Giammarchi (ISC) */var hyperHTML=function(w){"use strict";
/*! (c) Andrea Giammarchi - ISC */var t={};try{t.WeakMap=WeakMap}catch(e){t.WeakMap=function(t,e){var n=e.defineProperty,r=e.hasOwnProperty,i=a.prototype;return i.delete=function(e){return this.has(e)&&delete e[this._]},i.get=function(e){return this.has(e)?e[this._]:void 0},i.has=function(e){return r.call(e,this._)},i.set=function(e,t){return n(e,this._,{configurable:!0,value:t}),this},a;function a(e){n(this,"_",{value:"_@ungap/weakmap"+t++}),e&&e.forEach(o,this)}function o(e){this.set(e[0],e[1])}}(Math.random(),Object)}var u=t.WeakMap,i={};
/*! (c) Andrea Giammarchi - ISC */try{i.WeakSet=WeakSet}catch(e){!function(e,t){var n=r.prototype;function r(){t(this,"_",{value:"_@ungap/weakmap"+e++})}n.add=function(e){return this.has(e)||t(e,this._,{value:!0,configurable:!0}),this},n.has=function(e){return this.hasOwnProperty.call(e,this._)},n.delete=function(e){return this.has(e)&&delete e[this._]},i.WeakSet=r}(Math.random(),Object.defineProperty)}var e=i.WeakSet,n={};
/*! (c) Andrea Giammarchi - ISC */try{n.Map=Map}catch(e){n.Map=function(){var n=0,i=[],a=[];return{delete:function(e){var t=r(e);return t&&(i.splice(n,1),a.splice(n,1)),t},forEach:function(n,r){i.forEach(function(e,t){n.call(r,a[t],e,this)},this)},get:function(e){return r(e)?a[n]:void 0},has:function(e){return r(e)},set:function(e,t){return a[r(e)?n:i.push(e)-1]=t,this}};function r(e){return-1<(n=i.indexOf(e))}}}function m(e,t,n,r,i,a){for(var o=("selectedIndex"in t),u=-1;r<i;){var s=e(n[r],1);o&&u<0&&s.selected&&(u=r),t.insertBefore(s,a),r++}o&&-1<u&&(t.selectedIndex=u)}function y(e,t){return e==t}function b(e){return e}function N(e,t,n,r,i,a,o){var u=a-i;if(u<1)return-1;for(;u<=n-t;){for(var s=t,l=i;s<n&&l<a&&o(e[s],r[l]);)s++,l++;if(l===a)return t;t=s+1}return-1}function E(e,t,n,r,i){return n<r?e(t[n],0):0<n?e(t[n-1],-0).nextSibling:i}function x(e,t,n,r,i){if(i-r<2)t.removeChild(e(n[r],-1));else{var a=t.ownerDocument.createRange();a.setStartBefore(e(n[r],-1)),a.setEndAfter(e(n[i-1],-1)),a.deleteContents()}}function C(e,t,n,r,i,a,o,u,s,l,c,f,h){!function(e,t,n,r,i,a,o,u,s){for(var l=new k,c=e.length,f=o,h=0;h<c;)switch(e[h++]){case 0:i++,f++;break;case 1:l.set(r[i],1),m(t,n,r,i++,i,f<u?t(a[f],0):s);break;case-1:f++}for(h=0;h<c;)switch(e[h++]){case 0:o++;break;case-1:l.has(a[o])?o++:x(t,n,a,o++,o)}}(function(e,t,n,r,i,a,o){var u,s,l,c,f,h,d,v=n+a,p=[];e:for(u=0;u<=v;u++){if(50<u)return null;for(d=u-1,f=u?p[u-1]:[0,0],h=p[u]=[],s=-u;s<=u;s+=2){for(l=(c=s===-u||s!==u&&f[d+s-1]<f[d+s+1]?f[d+s+1]:f[d+s-1]+1)-s;c<a&&l<n&&o(r[i+c],e[t+l]);)c++,l++;if(c===a&&l===n)break e;h[u+s]=c}}var g=Array(u/2+v/2),m=g.length-1;for(u=p.length-1;0<=u;u--){for(;0<c&&0<l&&o(r[i+c-1],e[t+l-1]);)g[m--]=0,c--,l--;if(!u)break;d=u-1,f=u?p[u-1]:[0,0],(s=c-l)===-u||s!==u&&f[d+s-1]<f[d+s+1]?(l--,g[m--]=1):(c--,g[m--]=-1)}return g}(n,r,a,o,u,l,f)||function(e,t,n,r,i,a,o,u){var s=0,l=r<u?r:u,c=Array(l++),f=Array(l);f[0]=-1;for(var h=1;h<l;h++)f[h]=o;for(var d=new k,v=a;v<o;v++)d.set(i[v],v);for(var p=t;p<n;p++){var g=d.get(e[p]);null!=g&&-1<(s=A(f,l,g))&&(f[s]=g,c[s]={newi:p,oldi:g,prev:c[s-1]})}for(s=--l,--o;f[s]>o;)--s;l=u+r-s;var m=Array(l),y=c[s];for(--n;y;){for(var b=y,w=b.newi,N=b.oldi;w<n;)m[--l]=1,--n;for(;N<o;)m[--l]=-1,--o;m[--l]=0,--n,--o,y=y.prev}for(;t<=n;)m[--l]=1,--n;for(;a<=o;)m[--l]=-1,--o;return m}(n,r,i,a,o,u,s,l),e,t,n,r,o,u,c,h)}function s(e,t,n,r){for(var i=(r=r||{}).compare||y,a=r.node||b,o=null==r.before?null:a(r.before,0),u=t.length,s=u,l=0,c=n.length,f=0;l<s&&f<c&&i(t[l],n[f]);)l++,f++;for(;l<s&&f<c&&i(t[s-1],n[c-1]);)s--,c--;var h=l===s,d=f===c;if(h&&d)return n;if(h&&f<c)return m(a,e,n,f,c,E(a,t,l,u,o)),n;if(d&&l<s)return x(a,e,t,l,s),n;var v=s-l,p=c-f,g=-1;if(v<p){if(-1<(g=N(n,f,c,t,l,s,i)))return m(a,e,n,f,g,a(t[l],0)),m(a,e,n,g+v,c,E(a,t,s,u,o)),n}else if(p<v&&-1<(g=N(t,l,s,n,f,c,i)))return x(a,e,t,l,g),x(a,e,t,g+p,s),n;return v<2||p<2?(m(a,e,n,f,c,a(t[l],0)),x(a,e,t,l,s)):v==p&&function(e,t,n,r,i,a){for(;r<i&&a(n[r],e[t-1]);)r++,t--;return 0===t}(n,c,t,l,s,i)?m(a,e,n,f,c,E(a,t,s,u,o)):C(a,e,n,f,c,p,t,l,s,v,u,i,o),n}var r,k=n.Map,A=function(e,t,n){for(var r=1,i=t;r<i;){var a=(r+i)/2>>>0;n<e[a]?i=a:r=1+a}return r},a={};function o(e,t){t=t||{};var n=w.createEvent("CustomEvent");return n.initCustomEvent(e,!!t.bubbles,!!t.cancelable,t.detail),n}a.CustomEvent="function"==typeof CustomEvent?CustomEvent:(o[r="prototype"]=new o("").constructor[r],o);var l=a.CustomEvent;function c(){return this}function f(e,t){var n="_"+e+"$";return{get:function(){return this[n]||h(this,n,t.call(this,e))},set:function(e){h(this,n,e)}}}var h=function(e,t,n){return Object.defineProperty(e,t,{configurable:!0,value:"function"==typeof n?function(){return e._wire$=n.apply(this,arguments)}:n})[t]};Object.defineProperties(c.prototype,{ELEMENT_NODE:{value:1},nodeType:{value:-1}});var d,v,p,g,S,T,M={},_={},O=[],j=_.hasOwnProperty,L=0,D={attributes:M,define:function(e,t){e.indexOf("-")<0?(e in _||(L=O.push(e)),_[e]=t):M[e]=t},invoke:function(e,t){for(var n=0;n<L;n++){var r=O[n];if(j.call(e,r))return _[r](e[r],t)}}},P=Array.isArray||(v=(d={}.toString).call([]),function(e){return d.call(e)===v}),$=(p=w,g="fragment",T="content"in R(S="template")?function(e){var t=R(S);return t.innerHTML=e,t.content}:function(e){var t=R(g),n=R(S),r=null;if(/^[^\S]*?<(col(?:group)?|t(?:head|body|foot|r|d|h))/i.test(e)){var i=RegExp.$1;n.innerHTML="<table>"+e+"</table>",r=n.querySelectorAll(i)}else n.innerHTML=e,r=n.childNodes;return W(t,r),t},function(e,t){return("svg"===t?function(e){var t=R(g),n=R("div");return n.innerHTML='<svg xmlns="http://www.w3.org/2000/svg">'+e+"</svg>",W(t,n.firstChild.childNodes),t}:T)(e)});function W(e,t){for(var n=t.length;n--;)e.appendChild(t[0])}function R(e){return e===g?p.createDocumentFragment():p.createElementNS("http://www.w3.org/1999/xhtml",e)}
/*! (c) Andrea Giammarchi - ISC */
var F,H,z,I,Z,B,V,G,q,J,K=(H="appendChild",z="cloneNode",I="createTextNode",B=(Z="importNode")in(F=w),(V=F.createDocumentFragment())[H](F[I]("g")),V[H](F[I]("")),(B?F[Z](V,!0):V[z](!0)).childNodes.length<2?function e(t,n){for(var r=t[z](),i=t.childNodes||[],a=i.length,o=0;n&&o<a;o++)r[H](e(i[o],n));return r}:B?F[Z]:function(e,t){return e[z](!!t)}),Q="".trim||function(){return String(this).replace(/^\s+|\s+/g,"")},U="-"+Math.random().toFixed(6)+"%";try{G=w.createElement("template"),J="tabindex",(q="content")in G&&(G.innerHTML="<p "+J+'="'+U+'"></p>',G[q].childNodes[0].getAttribute(J)==U)||(U="_dt: "+U.slice(1,-1)+";",!0)}catch(e){}var X="\x3c!--"+U+"--\x3e",Y=8,ee=1,te=3,ne=/^(?:style|textarea)$/i,re=/^(?:area|base|br|col|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr)$/i;var ie=" \\f\\n\\r\\t",ae="[^"+ie+"\\/>\"'=]+",oe="["+ie+"]+"+ae,ue="<([A-Za-z]+[A-Za-z0-9:._-]*)((?:",se="(?:\\s*=\\s*(?:'[^']*?'|\"[^\"]*?\"|<[^>]*?>|"+ae.replace("\\/","")+"))?)",le=new RegExp(ue+oe+se+"+)(["+ie+"]*/?>)","g"),ce=new RegExp(ue+oe+se+"*)(["+ie+"]*/>)","g"),fe=new RegExp("("+oe+"\\s*=\\s*)(['\"]?)"+X+"\\2","gi");function he(e,t,n,r){return"<"+t+n.replace(fe,de)+r}function de(e,t,n){return t+(n||'"')+U+(n||'"')}function ve(e,t,n){return re.test(t)?e:"<"+t+n+"></"+t+">"}function pe(e,t){for(var n=t.length,r=0;r<n;)e=e.childNodes[t[r++]];return e}function ge(e,t,n,r){for(var i=new k,a=e.attributes,o=[],u=o.slice.call(a,0),s=u.length,l=0;l<s;){var c,f=u[l++],h=f.value===U;if(h||1<(c=f.value.split(X)).length){var d=f.name;if(!i.has(d)){var v=n.shift().replace(h?/^(?:|[\S\s]*?\s)(\S+?)\s*=\s*('|")?$/:new RegExp("^(?:|[\\S\\s]*?\\s)("+d+")\\s*=\\s*('|\")","i"),"$1"),p=a[v]||a[v.toLowerCase()];if(i.set(d,p),h)t.push(me(p,r,v,null));else{for(var g=c.length-2;g--;)n.shift();t.push(me(p,r,v,c))}}o.push(f)}}for(s=o.length,l=0;l<s;){var m=o[l++];/^id$/i.test(m.name)?e.removeAttribute(m.name):e.removeAttributeNode(m)}var y=e.nodeName;if(/^script$/i.test(y)){var b=w.createElement(y);for(s=a.length,l=0;l<s;)b.setAttributeNode(a[l++].cloneNode(!0));b.textContent=e.textContent,e.parentNode.replaceChild(b,e)}}function me(e,t,n,r){return{type:"attr",node:e,path:t,name:n,sparse:r}}function ye(e,t){return{type:"text",node:e,path:t}}var be=new u,we=new u;function Ne(o,f){var e=
/*! (c) Andrea Giammarchi - ISC */
function(e){return e.join(X).replace(ce,ve).replace(le,he)}(f),t=o.transform;t&&(e=t(e));var n=$(e,o.type);!function(e){var t=e.childNodes,n=t.length;for(;n--;){var r=t[n];1!==r.nodeType&&0===Q.call(r.textContent).length&&e.removeChild(r)}}
/*! (c) Andrea Giammarchi - ISC */(n);var u=[];!function e(t,n,r,i){for(var a,o,u=t.childNodes,s=u.length,l=0;l<s;){var c=u[l];switch(c.nodeType){case ee:var f=i.concat(l);ge(c,n,r,f),e(c,n,r,f);break;case Y:var h=c.textContent;if(h===U)r.shift(),n.push(ne.test(t.nodeName)?ye(t,i):(a=c,o=i.concat(l),{type:"any",node:a,path:o}));else switch(h.slice(0,2)){case"/*":if("*/"!==h.slice(-2))break;case"👻":t.removeChild(c),l--,s--}break;case te:ne.test(t.nodeName)&&Q.call(c.textContent)===X&&(r.shift(),n.push(ye(t,i)))}l++}}(n,u,f.slice(0),[]);var r={content:n,updates:function(s){for(var l=[],c=u.length,e=0,t=0;e<c;){var n=u[e++],r=pe(s,n.path);switch(n.type){case"any":l.push({fn:o.any(r,[]),sparse:!1});break;case"attr":var i=n.sparse,a=o.attribute(r,n.name,n.node);null===i?l.push({fn:a,sparse:!1}):(t+=i.length-2,l.push({fn:a,sparse:!0,values:i}));break;case"text":l.push({fn:o.text(r),sparse:!1}),r.textContent=""}}return c+=t,function(){var e=arguments.length;if(c!==e-1)throw new Error(e-1+" values instead of "+c+"\n"+f.join("${value}"));for(var t=1,n=1;t<e;){var r=l[t-n];if(r.sparse){var i=r.values,a=i[0],o=1,u=i.length;for(n+=u-2;o<u;)a+=arguments[t++]+i[o++];r.fn(a)}else r.fn(arguments[t++])}return s}}};return be.set(f,r),r}function Ee(n){return function(e){var t=we.get(n);return null!=t&&t.template===e||(t=function(e,t){var n=be.get(t)||Ne(e,t),r=K.call(w,n.content,!0),i={content:r,template:t,updates:n.updates(r)};return we.set(e,i),i}(n,e)),t.updates.apply(null,arguments),t.content}}var xe,Ce,ke=(xe=/acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i,Ce=/([^A-Z])([A-Z]+)/g,function(e,t){return"ownerSVGElement"in e?function(e,t){var n;return(n=t?t.cloneNode(!0):(e.setAttribute("style","--hyper:style;"),e.getAttributeNode("style"))).value="",e.setAttributeNode(n),Se(n,!0)}(e,t):Se(e.style,!1)});
/*! (c) Andrea Giammarchi - ISC */function Ae(e,t,n){return t+"-"+n.toLowerCase()}function Se(a,o){var u,s;return function(e){var t,n,r,i;switch(typeof e){case"object":if(e){if("object"===u){if(!o&&s!==e)for(n in s)n in e||(a[n]="")}else o?a.value="":a.cssText="";for(n in t=o?{}:a,e)r="number"!=typeof(i=e[n])||xe.test(n)?i:i+"px",!o&&/^--/.test(n)?t.setProperty(n,r):t[n]=r;u="object",o?a.value=function(e){var t,n=[];for(t in e)n.push(t.replace(Ce,Ae),":",e[t],";");return n.join("")}(s=t):s=e;break}default:s!=e&&(u="string",s=e,o?a.value=e||"":a.cssText=e||"")}}}var Te,Me,_e=(Te=[].slice,(Me=Oe.prototype).ELEMENT_NODE=1,Me.nodeType=111,Me.remove=function(e){var t=this.childNodes,n=this.firstChild,r=this.lastChild;if(this._=null,e&&2===t.length)r.parentNode.removeChild(r);else{var i=this.ownerDocument.createRange();i.setStartBefore(e?t[1]:n),i.setEndAfter(r),i.deleteContents()}return n},Me.valueOf=function(e){var t=this._,n=null==t;if(n&&(t=this._=this.ownerDocument.createDocumentFragment()),n||e)for(var r=this.childNodes,i=0,a=r.length;i<a;i++)t.appendChild(r[i]);return t},Oe);function Oe(e){var t=this.childNodes=Te.call(e,0);this.firstChild=t[0],this.lastChild=t[t.length-1],this.ownerDocument=t[0].ownerDocument,this._=null}function je(e){return{html:e}}function Le(e,t){switch(e.nodeType){case Be:return 1/t<0?t?e.remove(!0):e.lastChild:t?e.valueOf(!0):e.firstChild;case Ze:return Le(e.render(),t);default:return e}}function De(e,t){t(e.placeholder),"text"in e?Promise.resolve(e.text).then(String).then(t):"any"in e?Promise.resolve(e.any).then(t):"html"in e?Promise.resolve(e.html).then(je).then(t):Promise.resolve(D.invoke(e,t)).then(t)}function Pe(e){return null!=e&&"then"in e}var $e,We,Re,Fe,He,ze="ownerSVGElement",Ie="connected",Ze=c.prototype.nodeType,Be=_e.prototype.nodeType,Ve=(We=($e={Event:l,WeakSet:e}).Event,Re=$e.WeakSet,Fe=!0,He=null,function(e){return Fe&&(Fe=!Fe,He=new Re,function(t){var i=new Re,a=new Re;try{new MutationObserver(u).observe(t,{subtree:!0,childList:!0})}catch(e){var n=0,r=[],o=function(e){r.push(e),clearTimeout(n),n=setTimeout(function(){u(r.splice(n=0,r.length))},0)};t.addEventListener("DOMNodeRemoved",function(e){o({addedNodes:[],removedNodes:[e.target]})},!0),t.addEventListener("DOMNodeInserted",function(e){o({addedNodes:[e.target],removedNodes:[]})},!0)}function u(e){for(var t,n=e.length,r=0;r<n;r++)s((t=e[r]).removedNodes,"disconnected",a,i),s(t.addedNodes,"connected",i,a)}function s(e,t,n,r){for(var i,a=new We(t),o=e.length,u=0;u<o;1===(i=e[u++]).nodeType&&l(i,a,t,n,r));}function l(e,t,n,r,i){He.has(e)&&!r.has(e)&&(i.delete(e),r.add(e),e.dispatchEvent(t));for(var a=e.children||[],o=a.length,u=0;u<o;l(a[u++],t,n,r,i));}}(e.ownerDocument)),He.add(e),e}),Ge=/^(?:form|list)$/i,qe=[].slice;function Je(e){return this.type=e,Ee(this)}var Ke=!(Je.prototype={attribute:function(n,r,e){var i,t=ze in n;if("style"===r)return ke(n,e,t);if(/^on/.test(r)){var a=r.slice(2);return a===Ie||"disconnected"===a?Ve(n):r.toLowerCase()in n&&(a=a.toLowerCase()),function(e){i!==e&&(i&&n.removeEventListener(a,i,!1),(i=e)&&n.addEventListener(a,e,!1))}}if("data"===r||!t&&r in n&&!Ge.test(r))return function(e){i!==e&&(i=e,n[r]!==e&&null==e?(n[r]="",n.removeAttribute(r)):n[r]=e)};if(r in D.attributes)return function(e){var t=D.attributes[r](n,e);i!==t&&(null==(i=t)?n.removeAttribute(r):n.setAttribute(r,t))};var o=!1,u=e.cloneNode(!0);return function(e){i!==e&&(i=e,u.value!==e&&(null==e?(o&&(o=!1,n.removeAttributeNode(u)),u.value=e):(u.value=e,o||(o=!0,n.setAttributeNode(u)))))}},any:function(n,r){var i,a={node:Le,before:n},o=ze in n?"svg":"html",u=!1;return function e(t){switch(typeof t){case"string":case"number":case"boolean":u?i!==t&&(i=t,r[0].textContent=t):(u=!0,i=t,r=s(n.parentNode,r,[function(e,t){return e.ownerDocument.createTextNode(t)}(n,t)],a));break;case"function":e(t(n));break;case"object":case"undefined":if(null==t){u=!1,r=s(n.parentNode,r,[],a);break}default:if(u=!1,P(i=t))if(0===t.length)r.length&&(r=s(n.parentNode,r,[],a));else switch(typeof t[0]){case"string":case"number":case"boolean":e({html:t});break;case"object":if(P(t[0])&&(t=t.concat.apply([],t)),Pe(t[0])){Promise.all(t).then(e);break}default:r=s(n.parentNode,r,t,a)}else!function(e){return"ELEMENT_NODE"in e}(t)?Pe(t)?t.then(e):"placeholder"in t?De(t,e):"text"in t?e(String(t.text)):"any"in t?e(t.any):"html"in t?r=s(n.parentNode,r,qe.call($([].concat(t.html).join(""),o).childNodes),a):e("length"in t?qe.call(t):D.invoke(t,e)):r=s(n.parentNode,r,11===t.nodeType?qe.call(t.childNodes):[t],a)}}},text:function(r){var i;return function e(t){if(i!==t){var n=typeof(i=t);"object"==n&&t?Pe(t)?t.then(e):"placeholder"in t?De(t,e):e("text"in t?String(t.text):"any"in t?t.any:"html"in t?[].concat(t.html).join(""):"length"in t?qe.call(t).join(""):D.invoke(t,e)):"function"==n?e(t(r)):r.textContent=null==t?"":t}}}}),Qe=function(e){var t,n=(t=(w.defaultView.navigator||{}).userAgent,/(Firefox|Safari)\/(\d+)/.test(t)&&!/(Chrom|Android)\/(\d+)/.test(t)),r=!("raw"in e)||e.propertyIsEnumerable("raw")||!Object.isFrozen(e.raw);if(n||r){var i={},a=function(e){for(var t=".",n=0;n<e.length;n++)t+=e[n].length+"."+e[n];return i[t]||(i[t]=e)};if(r)Qe=a;else{var o=new u;Qe=function(e){return o.get(e)||function(e,t){return o.set(e,t),t}(e,a(e))}}}else Ke=!0;return Ue(e)};function Ue(e){return Ke?e:Qe(e)}function Xe(e){for(var t=arguments.length,n=[Ue(e)],r=1;r<t;)n.push(arguments[r++]);return n}var Ye=new u,et=function(t){var n,r,i;return function(){var e=Xe.apply(null,arguments);return i!==e[0]?(i=e[0],r=new Je(t),n=nt(r.apply(r,e))):r.apply(r,e),n}},tt=function(e,t){var n=t.indexOf(":"),r=Ye.get(e),i=t;return-1<n&&(i=t.slice(n+1),t=t.slice(0,n)||"html"),r||Ye.set(e,r={}),r[i]||(r[i]=et(t))},nt=function(e){var t=e.childNodes,n=t.length;return 1===n?t[0]:n?new _e(t):e},rt=new u;function it(){var e=rt.get(this),t=Xe.apply(null,arguments);return e&&e.template===t[0]?e.tagger.apply(null,t):function(e){var t=new Je(ze in this?"svg":"html");rt.set(this,{tagger:t,template:e}),this.textContent="",this.appendChild(t.apply(null,arguments))}
/*! (c) Andrea Giammarchi (ISC) */.apply(this,t),this}var at,ot,ut,st,lt=D.define,ct=Je.prototype;function ft(e){return arguments.length<2?null==e?et("html"):"string"==typeof e?ft.wire(null,e):"raw"in e?et("html")(e):"nodeType"in e?ft.bind(e):tt(e,"html"):("raw"in e?et("html"):ft.wire).apply(null,arguments)}return ft.Component=c,ft.bind=function(e){return it.bind(e)},ft.define=lt,ft.diff=s,(ft.hyper=ft).observe=Ve,ft.tagger=ct,ft.wire=function(e,t){return null==e?et(t||"html"):tt(e,t||"html")},ft._={WeakMap:u,WeakSet:e},at=et,ot=new u,ut=Object.create,st=function(e,t){var n={w:null,p:null};return t.set(e,n),n},Object.defineProperties(c,{for:{configurable:!0,value:function(e,t){return function(e,t,n,r){var i=t.get(e)||st(e,t);switch(typeof r){case"object":case"function":var a=i.w||(i.w=new u);return a.get(r)||function(e,t,n){return e.set(t,n),n}(a,r,new e(n));default:var o=i.p||(i.p=ut(null));return o[r]||(o[r]=new e(n))}}(this,ot.get(e)||function(e){var t=new k;return ot.set(e,t),t}(e),e,null==t?"default":t)}}}),Object.defineProperties(c.prototype,{handleEvent:{value:function(e){var t=e.currentTarget;this["getAttribute"in t&&t.getAttribute("data-call")||"on"+e.type](e)}},html:f("html",at),svg:f("svg",at),state:f("state",function(){return this.defaultState}),defaultState:{get:function(){return{}}},dispatch:{value:function(e,t){var n=this._wire$;if(n){var r=new l(e,{bubbles:!0,cancelable:!0,detail:t});return r.component=this,(n.dispatchEvent?n:n.firstChild).dispatchEvent(r)}return!1}},setState:{value:function(e,t){var n=this.state,r="function"==typeof e?e.call(this,n):e;for(var i in r)n[i]=r[i];return!1!==t&&this.render(),this}}}),ft}(document);
return hyperHTML}));
