webpackJsonp([2],{20:function(n,e){n.exports=function(n){var e=[];return e.toString=function(){return this.map(function(e){var t=function(n,e){var t=n[1]||"",r=n[3];if(!r)return t;if(e&&"function"==typeof btoa){var o=(a=r,"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(a))))+" */"),i=r.sources.map(function(n){return"/*# sourceURL="+r.sourceRoot+n+" */"});return[t].concat(i).concat([o]).join("\n")}var a;return[t].join("\n")}(e,n);return e[2]?"@media "+e[2]+"{"+t+"}":t}).join("")},e.i=function(n,t){"string"==typeof n&&(n=[[null,n,""]]);for(var r={},o=0;o<this.length;o++){var i=this[o][0];"number"==typeof i&&(r[i]=!0)}for(o=0;o<n.length;o++){var a=n[o];"number"==typeof a[0]&&r[a[0]]||(t&&!a[2]?a[2]=t:t&&(a[2]="("+a[2]+") and ("+t+")"),e.push(a))}},e}},667:function(n,e,t){n.exports=t(668)},668:function(n,e,t){var r=t(669);"string"==typeof r&&(r=[[n.i,r,""]]);var o={transform:void 0};t(670)(r,o);r.locals&&(n.exports=r.locals)},669:function(n,e,t){(n.exports=t(20)(!1)).push([n.i,'/* You can add global styles to this file, and also import other style files */\n/* Layer z-index */\n.ldBar {\n  position: relative; }\n\n.ldBar.label-center > .ldBar-label {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  -webkit-transform: translate(-50%, -50%);\n  transform: translate(-50%, -50%);\n  text-shadow: 0 0 3px #fff; }\n\n.ldBar-label:after {\n  content: "%";\n  display: inline; }\n\n.ldBar.no-percent .ldBar-label:after {\n  content: ""; }\n\ndiv,\nspan,\nimg {\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  cursor: default; }\n\nhtml,\nbody,\n#app,\n#avg-viewport {\n  padding: 0px;\n  margin: 0px;\n  overflow: hidden;\n  background: #000;\n  width: 100%;\n  height: 100%;\n  font-family: "Jianhei"; }\n\n/* Fonts */\n#avg-loading-layer {\n  z-index: 1300;\n  position: absolute;\n  pointer-events: none;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%; }\n\n#avg-particle-viewport {\n  z-index: 600;\n  padding: 0px;\n  margin: 0px;\n  overflow: hidden;\n  width: 100%;\n  height: 100%;\n  position: fixed;\n  top: 0;\n  left: 0;\n  pointer-events: none; }\n  #avg-particle-viewport #avg-particle-viewport-canvas {\n    position: fixed;\n    left: 0;\n    top: 0;\n    width: 100%;\n    height: 100%; }\n\n#avg-viewport {\n  z-index: 500;\n  background: black; }\n\n#avg-transition {\n  position: absolute;\n  z-index: 1000;\n  width: 100%;\n  height: 100%;\n  opacity: 1; }\n\n#avg-dialogue-box-layer {\n  z-index: 700; }\n\n#avg-variable-input-box-layer {\n  z-index: 1200; }\n\n#avg-widget-layer {\n  position: absolute;\n  z-index: 900;\n  width: 100%;\n  height: 100%;\n  pointer-events: none; }\n\n#avg-title-menu-layer {\n  z-index: 800; }\n\n#avg-outlet {\n  z-index: 400;\n  pointer-events: none; }\n',""])},670:function(n,e,t){var r,o,i={},a=(r=function(){return window&&document&&document.all&&!window.atob},function(){return void 0===o&&(o=r.apply(this,arguments)),o}),s=function(n){var e={};return function(n){return void 0===e[n]&&(e[n]=function(n){return document.querySelector(n)}.call(this,n)),e[n]}}(),l=null,f=0,u=[],c=t(671);function p(n,e){for(var t=0;t<n.length;t++){var r=n[t],o=i[r.id];if(o){o.refs++;for(var a=0;a<o.parts.length;a++)o.parts[a](r.parts[a]);for(;a<r.parts.length;a++)o.parts.push(m(r.parts[a],e))}else{var s=[];for(a=0;a<r.parts.length;a++)s.push(m(r.parts[a],e));i[r.id]={id:r.id,refs:1,parts:s}}}}function d(n,e){for(var t=[],r={},o=0;o<n.length;o++){var i=n[o],a=e.base?i[0]+e.base:i[0],s={css:i[1],media:i[2],sourceMap:i[3]};r[a]?r[a].parts.push(s):t.push(r[a]={id:a,parts:[s]})}return t}function h(n,e){var t=s(n.insertInto);if(!t)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var r=u[u.length-1];if("top"===n.insertAt)r?r.nextSibling?t.insertBefore(e,r.nextSibling):t.appendChild(e):t.insertBefore(e,t.firstChild),u.push(e);else{if("bottom"!==n.insertAt)throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");t.appendChild(e)}}function v(n){if(null===n.parentNode)return!1;n.parentNode.removeChild(n);var e=u.indexOf(n);e>=0&&u.splice(e,1)}function b(n){var e=document.createElement("style");return n.attrs.type="text/css",g(e,n.attrs),h(n,e),e}function g(n,e){Object.keys(e).forEach(function(t){n.setAttribute(t,e[t])})}function m(n,e){var t,r,o,i;if(e.transform&&n.css){if(!(i=e.transform(n.css)))return function(){};n.css=i}if(e.singleton){var a=f++;t=l||(l=b(e)),r=w.bind(null,t,a,!1),o=w.bind(null,t,a,!0)}else n.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(t=function(n){var e=document.createElement("link");return n.attrs.type="text/css",n.attrs.rel="stylesheet",g(e,n.attrs),h(n,e),e}(e),r=function(n,e,t){var r=t.css,o=t.sourceMap,i=void 0===e.convertToAbsoluteUrls&&o;(e.convertToAbsoluteUrls||i)&&(r=c(r));o&&(r+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(o))))+" */");var a=new Blob([r],{type:"text/css"}),s=n.href;n.href=URL.createObjectURL(a),s&&URL.revokeObjectURL(s)}.bind(null,t,e),o=function(){v(t),t.href&&URL.revokeObjectURL(t.href)}):(t=b(e),r=function(n,e){var t=e.css,r=e.media;r&&n.setAttribute("media",r);if(n.styleSheet)n.styleSheet.cssText=t;else{for(;n.firstChild;)n.removeChild(n.firstChild);n.appendChild(document.createTextNode(t))}}.bind(null,t),o=function(){v(t)});return r(n),function(e){if(e){if(e.css===n.css&&e.media===n.media&&e.sourceMap===n.sourceMap)return;r(n=e)}else o()}}n.exports=function(n,e){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");(e=e||{}).attrs="object"==typeof e.attrs?e.attrs:{},e.singleton||(e.singleton=a()),e.insertInto||(e.insertInto="head"),e.insertAt||(e.insertAt="bottom");var t=d(n,e);return p(t,e),function(n){for(var r=[],o=0;o<t.length;o++){var a=t[o];(s=i[a.id]).refs--,r.push(s)}n&&p(d(n,e),e);for(o=0;o<r.length;o++){var s;if(0===(s=r[o]).refs){for(var l=0;l<s.parts.length;l++)s.parts[l]();delete i[s.id]}}}};var y,x=(y=[],function(n,e){return y[n]=e,y.filter(Boolean).join("\n")});function w(n,e,t,r){var o=t?"":r.css;if(n.styleSheet)n.styleSheet.cssText=x(e,o);else{var i=document.createTextNode(o),a=n.childNodes;a[e]&&n.removeChild(a[e]),a.length?n.insertBefore(i,a[e]):n.appendChild(i)}}},671:function(n,e){n.exports=function(n){var e="undefined"!=typeof window&&window.location;if(!e)throw new Error("fixUrls requires window.location");if(!n||"string"!=typeof n)return n;var t=e.protocol+"//"+e.host,r=t+e.pathname.replace(/\/[^\/]*$/,"/");return n.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,function(n,e){var o,i=e.trim().replace(/^"(.*)"$/,function(n,e){return e}).replace(/^'(.*)'$/,function(n,e){return e});return/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(i)?n:(o=0===i.indexOf("//")?i:0===i.indexOf("/")?t+i:r+i.replace(/^\.\//,""),"url("+JSON.stringify(o)+")")})}}},[667]);