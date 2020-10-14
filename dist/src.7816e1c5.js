parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"RhqW":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.pointSize=exports.pointArea=exports.columns=exports.canvasHeight=exports.canvasWidth=exports.ratio=void 0,exports.ratio=window.devicePixelRatio||1,exports.canvasWidth=200,exports.canvasHeight=200,exports.columns=6,exports.pointArea=exports.canvasWidth/exports.columns*exports.ratio,exports.pointSize=exports.pointArea/4;
},{}],"gIyX":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.randomColor=void 0;var r={red:"rgb(242, 50, 12)",blue:"rgb(25, 135, 252)",green:"rgb(13, 214, 57)",orange:"rgb(255, 213, 0)",purple:"rgb(255, 43, 241)"};exports.randomColor=function(){return Object.values(r)[Math.ceil(4*Math.random())]};
},{}],"h55V":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.getIndex=exports.getY=exports.getX=void 0;var e=require("../constants");exports.getX=function(t){return t-e.columns*Math.floor(t/e.columns)},exports.getY=function(t){return Math.floor(t/e.columns)},exports.getIndex=function(t,o){return o*e.columns+t};
},{"../constants":"RhqW"}],"MFWX":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Point=void 0;var t=require("./constants"),o=require("./utils/color"),e=require("./utils/coords"),i=function(){function i(i){this.connected=!1,this.x=e.getX(i-t.columns*t.columns),this.y=e.getY(i-t.columns*t.columns),this.moveTo(i),this.color=o.randomColor()}return Object.defineProperty(i.prototype,"actualCoords",{get:function(){return{x:this.x*t.pointArea+t.pointArea/2,y:this.y*t.pointArea+t.pointArea/2}},enumerable:!1,configurable:!0}),i.prototype.setConnected=function(t){this.connected=t},i.prototype.render=function(o){o.fillStyle=this.color;var e=this.actualCoords;if(void 0!==this.prevY&&(e.y=this.prevY,this.prevY=this.prevY+(this.actualCoords.y-this.prevY)/3),void 0!==this.prevY&&this.prevY>=this.actualCoords.y&&(this.prevY=void 0),this.connected){o.globalAlpha=.2;var i=new Path2D;i.arc(e.x,e.y,t.pointSize+4,0,2*Math.PI),o.fill(i),o.globalAlpha=1}var r=new Path2D;r.arc(e.x,e.y,t.pointSize,0,2*Math.PI),o.fill(r)},i.prototype.moveTo=function(t){this.prevY=this.actualCoords.y,this.x=e.getX(t),this.y=e.getY(t)},i.prototype.isSibling=function(t){return this.x===t.x&&1===Math.abs(this.y-t.y)||(this.y===t.y&&1===Math.abs(this.x-t.x)||void 0)},i}();exports.Point=i;
},{"./constants":"RhqW","./utils/color":"gIyX","./utils/coords":"h55V"}],"fkZJ":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Segment=void 0;var t=require("./constants"),e=function(){function e(t,e){this.from=t,this.to=e}return e.prototype.render=function(e,o){e.strokeStyle=o,e.lineWidth=2*t.ratio,e.beginPath(),e.moveTo(this.from.x,this.from.y),e.lineTo(this.to.x,this.to.y),e.stroke()},e}();exports.Segment=e;
},{"./constants":"RhqW"}],"Fd3R":[function(require,module,exports) {
"use strict";var t=this&&this.__assign||function(){return(t=Object.assign||function(t){for(var e,o=1,n=arguments.length;o<n;o++)for(var i in e=arguments[o])Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i]);return t}).apply(this,arguments)};Object.defineProperty(exports,"__esModule",{value:!0}),exports.Board=void 0;var e=require("./constants"),o=require("./Point"),n=require("./Segment"),i=require("./utils/coords"),s=function(){function s(t,i,s){var r=this;this.ctx=t,this.width=i,this.height=s,this.segments=[],this.activeColor="black",this.handleStart=function(t){var o=t.offsetX,i=t.offsetY,s=r.getPoint(o*e.ratio,i*e.ratio);if(s){s.setConnected(!0);var c=s.actualCoords;r.segments.push(new n.Segment(c,{x:o*e.ratio,y:i*e.ratio})),r.activeColor=s.color}},this.handleMove=function(t){var o=t.offsetX,n=t.offsetY;if(r.segments.length){var i=o*e.ratio,s=n*e.ratio;r.lastSegment.to={x:i,y:s},r.resolveAction(i,s),r.isLoop()&&r.connectAll()}},this.handleEnd=function(){r.removeSelected(),r.movePointsToNewIndeces(),r.fillBoard(),r.points.forEach(function(t){return t&&t.setConnected(!1)}),r.segments=[],r.activeColor="black"},this.points=Array.from({length:e.columns*e.columns},function(t,e){return new o.Point(e)})}return Object.defineProperty(s.prototype,"lastSegment",{get:function(){return this.segments[this.segments.length-1]},enumerable:!1,configurable:!0}),s.prototype.render=function(){var t=this;this.ctx.fillStyle="rgb(255, 255, 255)",this.ctx.fillRect(0,0,this.width*e.ratio,this.height*e.ratio),this.points.forEach(function(e){return e&&e.render(t.ctx)}),this.segments.forEach(function(e){return e.render(t.ctx,t.activeColor)})},s.prototype.getPoint=function(t,o){var n=Math.floor(t/e.pointArea),s=Math.floor(o/e.pointArea),r=i.getIndex(n,s);return this.points[r]},s.prototype.resolveAction=function(t,e){var o=this.getPoint(this.lastSegment.from.x,this.lastSegment.from.y),n=this.getPoint(t,e);if(o&&n&&(o!==n&&o.isSibling(n)&&o.color===n.color))return this.isBackwards(n)?this.disconnect(o):this.connect(n)},s.prototype.isBackwards=function(t){if(this.segments.length<2)return!1;var e=this.segments[this.segments.length-2],o=t.actualCoords;return e.from.x===o.x&&e.from.y===o.y},s.prototype.isLoop=function(){var t=this;return this.segments.slice(0,this.segments.length-1).some(function(e){return e.from.x===t.lastSegment.from.x&&e.from.y===t.lastSegment.from.y})},s.prototype.connectAll=function(){var t=this;this.points.forEach(function(e){e&&e.color===t.activeColor&&e.setConnected(!0)})},s.prototype.connect=function(e){e.setConnected(!0);var o=e.actualCoords;this.lastSegment.to=o,this.segments.push(new n.Segment(t({},this.lastSegment.to),t({},this.lastSegment.to)))},s.prototype.disconnect=function(t){t.setConnected(!1),this.segments.pop()},s.prototype.removeSelected=function(){var t=this;this.points.filter(function(t){return t&&t.connected}).length<2||this.points.forEach(function(e,o){e&&e.connected&&(t.points[o]=void 0)})},s.prototype.movePointsToNewIndeces=function(){for(var t=[],o=e.columns-1;o>=0;o--){t=[];for(var n=e.columns-1;n>=0;n--){var s=i.getIndex(o,n),r=this.points[s];if(r){if(t.length){var c=t.shift();r.moveTo(c),this.points[c]=r,t.push(s),this.points[s]=void 0}}else t.push(s)}}},s.prototype.fillBoard=function(){var t=this;this.points.forEach(function(e,n){e||(t.points[n]=new o.Point(n))})},s}();exports.Board=s;
},{"./constants":"RhqW","./Point":"MFWX","./Segment":"fkZJ","./utils/coords":"h55V"}],"nEx9":[function(require,module,exports) {
"use strict";function e(e){e.preventDefault();var t=e.target;if(!t)throw new Error("Canvas is undefiend");return n(t,e.touches[0])}function t(e){e.preventDefault();var t=e.target;if(!t)throw new Error("Canvas is undefiend");return n(t,e.changedTouches[0])}var r;function n(e,t){return r||(r=e.getBoundingClientRect()),{offsetX:t.pageX-r.left,offsetY:t.pageY-r.top}}Object.defineProperty(exports,"__esModule",{value:!0}),exports.handleTouchMove=exports.handleTouchStart=void 0,exports.handleTouchStart=e,exports.handleTouchMove=t;
},{}],"B6dB":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("./constants"),t=require("./Board"),n=require("./utils/touch");function a(e){e.render(),requestAnimationFrame(a.bind(null,e))}!function(){var r=document.querySelector("#canvas");if(r){r.setAttribute("width",String(e.canvasWidth*e.ratio)),r.setAttribute("height",String(e.canvasHeight*e.ratio)),r.style.width=e.canvasWidth+"px",r.style.height=e.canvasHeight+"px";var d=r.getContext("2d");if(d){var i=new t.Board(d,e.canvasWidth,e.canvasHeight);console.log(i),r.addEventListener("mousedown",i.handleStart,!1),r.addEventListener("mousemove",i.handleMove,!1),r.addEventListener("mouseup",i.handleEnd,!1),r.addEventListener("touchstart",function(e){return i.handleStart(n.handleTouchStart(e))},!1),r.addEventListener("touchmove",function(e){return i.handleMove(n.handleTouchMove(e))},!1),r.addEventListener("touchend",i.handleEnd,!1),r.addEventListener("touchcancel",i.handleEnd,!1),a(i)}}}();
},{"./constants":"RhqW","./Board":"Fd3R","./utils/touch":"nEx9"}]},{},["B6dB"], null)
//# sourceMappingURL=/src.7816e1c5.js.map