!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.CodeViewer=t():e.CodeViewer=t()}(window,(function(){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var i=t[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(r,i,function(t){return e[t]}.bind(null,i));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/",n(n.s="./src/core/index.ts")}({"./src/core/index.scss?raw":function(e,t,n){},"./src/core/index.ts":function(e,t,n){"use strict";var r=this&&this.__assign||function(){return(r=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var i in t=arguments[n])Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e}).apply(this,arguments)};Object.defineProperty(t,"__esModule",{value:!0}),n("./src/core/index.scss?raw");var i=function(){function e(){this.list={};var e=document.createElement("div");e.className="code-viewer",e.innerHTML='\n      <div class="sidebar">\n        <div class="dir">\n          <div class="section-title">Files</div>\n          <ul></ul>\n        </div>\n      </div>\n      <div class="code-area">\n        <div class="section-title filename">\n          <span>Untitled</span>\n          <span>unknown</span>\n        </div>\n        <pre></pre>\n      </div>\n    ',this.content=e.querySelector("pre"),this.listElement=e.querySelector("ul");var t=e.querySelectorAll(".filename span");this.currentTitle=t[0],this.currentType=t[1],this.rootNode=e,this.bindEvents()}return e.prototype.bindEvents=function(){var e=this;this.listElement.addEventListener("click",(function(t){return e.onFileClicked(t.target)}))},e.prototype.onFileClicked=function(e){var t=e.dataset;switch(t.role){case"dir":e.setAttribute("data-fold","1"===t.fold?"0":"1");break;case"file":var n=this.list[t.path];this.render(n.data,r(r({},n),{filename:n.filePath}))}},e.prototype.createFileNode=function(e,t){var n=document.createElement("li");if(n.className="file-node",n.style.textIndent=t+"em",n.setAttribute("data-path",e.filePath),n.textContent=e.filename,e.dir){if(n.setAttribute("data-role","dir"),n.setAttribute("data-fold","1"),e.children&&e.children.length){var r=document.createElement("ul");this.parse(e.children,r,e.filePath+"/",t+1),n.appendChild(r)}}else n.setAttribute("data-role","file");return n},e.prototype.parse=function(e,t,n,r){var i=this;e.map((function(e){var o=n+e.filename;i.list[o]=e,e.filePath=o,t.appendChild(i.createFileNode(e,r))}))},e.prototype.useRenderer=function(e){this.renderer=e},e.prototype.loadFiles=function(e){var t=document.createDocumentFragment();this.parse(e,t,"/",1),this.listElement.appendChild(t)},e.prototype.render=function(e,t){e&&(t=r({filename:"Untitled.ts",lang:"unknown"},t),this.content.className=t.lang,this.content.innerHTML=e,this.currentTitle.textContent=t.filename,this.currentType.textContent=t.lang||"unknown",this.renderer&&this.renderer(this.content))},e}();t.default=i}})}));