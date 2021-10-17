/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./build/js/app.js":
/*!*************************!*\
  !*** ./build/js/app.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Applications_MAMP_htdocs_autoserved_view_react_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_typeof__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/typeof */ "./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/typeof.js");
/******/(function(modules){// webpackBootstrap
/******/ // The module cache
/******/var installedModules={};/******/ /******/ // The require function
/******/function __webpack_require__(moduleId){/******/ /******/ // Check if module is in cache
/******/if(installedModules[moduleId]){/******/return installedModules[moduleId].exports;/******/}/******/ // Create a new module (and put it into the cache)
/******/var module=installedModules[moduleId]={/******/i:moduleId,/******/l:false,/******/exports:{}/******/};/******/ /******/ // Execute the module function
/******/modules[moduleId].call(module.exports,module,module.exports,__webpack_require__);/******/ /******/ // Flag the module as loaded
/******/module.l=true;/******/ /******/ // Return the exports of the module
/******/return module.exports;/******/}/******/ /******/ /******/ // expose the modules object (__webpack_modules__)
/******/__webpack_require__.m=modules;/******/ /******/ // expose the module cache
/******/__webpack_require__.c=installedModules;/******/ /******/ // define getter function for harmony exports
/******/__webpack_require__.d=function(exports,name,getter){/******/if(!__webpack_require__.o(exports,name)){/******/Object.defineProperty(exports,name,{enumerable:true,get:getter});/******/}/******/};/******/ /******/ // define __esModule on exports
/******/__webpack_require__.r=function(exports){/******/if(typeof Symbol!=='undefined'&&Symbol.toStringTag){/******/Object.defineProperty(exports,Symbol.toStringTag,{value:'Module'});/******/}/******/Object.defineProperty(exports,'__esModule',{value:true});/******/};/******/ /******/ // create a fake namespace object
/******/ // mode & 1: value is a module id, require it
/******/ // mode & 2: merge all properties of value into the ns
/******/ // mode & 4: return value when already ns object
/******/ // mode & 8|1: behave like require
/******/__webpack_require__.t=function(value,mode){/******/if(mode&1)value=__webpack_require__(value);/******/if(mode&8)return value;/******/if(mode&4&&Object(_Applications_MAMP_htdocs_autoserved_view_react_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_typeof__WEBPACK_IMPORTED_MODULE_0__["default"])(value)==='object'&&value&&value.__esModule)return value;/******/var ns=Object.create(null);/******/__webpack_require__.r(ns);/******/Object.defineProperty(ns,'default',{enumerable:true,value:value});/******/if(mode&2&&typeof value!='string')for(var key in value){__webpack_require__.d(ns,key,function(key){return value[key];}.bind(null,key));}/******/return ns;/******/};/******/ /******/ // getDefaultExport function for compatibility with non-harmony modules
/******/__webpack_require__.n=function(module){/******/var getter=module&&module.__esModule?/******/function getDefault(){return module['default'];}:/******/function getModuleExports(){return module;};/******/__webpack_require__.d(getter,'a',getter);/******/return getter;/******/};/******/ /******/ // Object.prototype.hasOwnProperty.call
/******/__webpack_require__.o=function(object,property){return Object.prototype.hasOwnProperty.call(object,property);};/******/ /******/ // __webpack_public_path__
/******/__webpack_require__.p="/";/******/ /******/ /******/ // Load entry module and return exports
/******/return __webpack_require__(__webpack_require__.s=0);/******/})(/************************************************************************/ /******/{/***/"./build/js/app.js":/*!*************************!*\
  !*** ./build/js/app.js ***!
  !*** ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js ***!
  \*********************************************************************************************************/ /*! exports provided: default */ /***/function node_modulesBabelPresetReactAppNode_modulesBabelRuntimeHelpersEsmArrayLikeToArrayJs(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"default",function(){return _arrayLikeToArray;});function _arrayLikeToArray(arr,len){if(len==null||len>arr.length)len=arr.length;for(var i=0,arr2=new Array(len);i<len;i++){arr2[i]=arr[i];}return arr2;}/***/},/***/"./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/arrayWithHoles.js":/*!*******************************************************************************************************!*\
  !*** ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/arrayWithHoles.js ***!
  \*******************************************************************************************************/ /*! exports provided: default */ /***/function node_modulesBabelPresetReactAppNode_modulesBabelRuntimeHelpersEsmArrayWithHolesJs(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"default",function(){return _arrayWithHoles;});function _arrayWithHoles(arr){if(Array.isArray(arr))return arr;}/***/},/***/"./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js":/*!**********************************************************************************************************!*\
  !*** ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js ***!
  \**********************************************************************************************************/ /*! exports provided: default */ /***/function node_modulesBabelPresetReactAppNode_modulesBabelRuntimeHelpersEsmArrayWithoutHolesJs(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"default",function(){return _arrayWithoutHoles;});/* harmony import */var _arrayLikeToArray__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! ./arrayLikeToArray */"./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js");function _arrayWithoutHoles(arr){if(Array.isArray(arr))return Object(_arrayLikeToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(arr);}/***/},/***/"./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/createForOfIteratorHelper.js":/*!******************************************************************************************************************!*\
  !*** ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/createForOfIteratorHelper.js ***!
  \******************************************************************************************************************/ /*! exports provided: default */ /***/function node_modulesBabelPresetReactAppNode_modulesBabelRuntimeHelpersEsmCreateForOfIteratorHelperJs(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"default",function(){return _createForOfIteratorHelper;});/* harmony import */var _unsupportedIterableToArray__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! ./unsupportedIterableToArray */"./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js");function _createForOfIteratorHelper(o){if(typeof Symbol==="undefined"||o[Symbol.iterator]==null){if(Array.isArray(o)||(o=Object(_unsupportedIterableToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(o))){var i=0;var F=function F(){};return{s:F,n:function n(){if(i>=o.length)return{done:true};return{done:false,value:o[i++]};},e:function e(_e){throw _e;},f:F};}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}var it,normalCompletion=true,didErr=false,err;return{s:function s(){it=o[Symbol.iterator]();},n:function n(){var step=it.next();normalCompletion=step.done;return step;},e:function e(_e2){didErr=true;err=_e2;},f:function f(){try{if(!normalCompletion&&it["return"]!=null)it["return"]();}finally{if(didErr)throw err;}}};}/***/},/***/"./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/iterableToArray.js":/*!********************************************************************************************************!*\
  !*** ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/iterableToArray.js ***!
  \********************************************************************************************************/ /*! exports provided: default */ /***/function node_modulesBabelPresetReactAppNode_modulesBabelRuntimeHelpersEsmIterableToArrayJs(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"default",function(){return _iterableToArray;});function _iterableToArray(iter){if(typeof Symbol!=="undefined"&&Symbol.iterator in Object(iter))return Array.from(iter);}/***/},/***/"./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/iterableToArrayLimit.js":/*!*************************************************************************************************************!*\
  !*** ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/iterableToArrayLimit.js ***!
  \*************************************************************************************************************/ /*! exports provided: default */ /***/function node_modulesBabelPresetReactAppNode_modulesBabelRuntimeHelpersEsmIterableToArrayLimitJs(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"default",function(){return _iterableToArrayLimit;});function _iterableToArrayLimit(arr,i){if(typeof Symbol==="undefined"||!(Symbol.iterator in Object(arr)))return;var _arr=[];var _n=true;var _d=false;var _e=undefined;try{for(var _i=arr[Symbol.iterator](),_s;!(_n=(_s=_i.next()).done);_n=true){_arr.push(_s.value);if(i&&_arr.length===i)break;}}catch(err){_d=true;_e=err;}finally{try{if(!_n&&_i["return"]!=null)_i["return"]();}finally{if(_d)throw _e;}}return _arr;}/***/},/***/"./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/nonIterableRest.js":/*!********************************************************************************************************!*\
  !*** ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/nonIterableRest.js ***!
  \********************************************************************************************************/ /*! exports provided: default */ /***/function node_modulesBabelPresetReactAppNode_modulesBabelRuntimeHelpersEsmNonIterableRestJs(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"default",function(){return _nonIterableRest;});function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}/***/},/***/"./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js":/*!**********************************************************************************************************!*\
  !*** ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js ***!
  \**********************************************************************************************************/ /*! exports provided: default */ /***/function node_modulesBabelPresetReactAppNode_modulesBabelRuntimeHelpersEsmNonIterableSpreadJs(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"default",function(){return _nonIterableSpread;});function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}/***/},/***/"./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/slicedToArray.js":/*!******************************************************************************************************!*\
  !*** ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/slicedToArray.js ***!
  \******************************************************************************************************/ /*! exports provided: default */ /***/function node_modulesBabelPresetReactAppNode_modulesBabelRuntimeHelpersEsmSlicedToArrayJs(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"default",function(){return _slicedToArray;});/* harmony import */var _arrayWithHoles__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! ./arrayWithHoles */"./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/arrayWithHoles.js");/* harmony import */var _iterableToArrayLimit__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(/*! ./iterableToArrayLimit */"./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/iterableToArrayLimit.js");/* harmony import */var _unsupportedIterableToArray__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(/*! ./unsupportedIterableToArray */"./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js");/* harmony import */var _nonIterableRest__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(/*! ./nonIterableRest */"./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/nonIterableRest.js");function _slicedToArray(arr,i){return Object(_arrayWithHoles__WEBPACK_IMPORTED_MODULE_0__["default"])(arr)||Object(_iterableToArrayLimit__WEBPACK_IMPORTED_MODULE_1__["default"])(arr,i)||Object(_unsupportedIterableToArray__WEBPACK_IMPORTED_MODULE_2__["default"])(arr,i)||Object(_nonIterableRest__WEBPACK_IMPORTED_MODULE_3__["default"])();}/***/},/***/"./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/toConsumableArray.js":/*!**********************************************************************************************************!*\
  !*** ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/toConsumableArray.js ***!
  \**********************************************************************************************************/ /*! exports provided: default */ /***/function node_modulesBabelPresetReactAppNode_modulesBabelRuntimeHelpersEsmToConsumableArrayJs(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"default",function(){return _toConsumableArray;});/* harmony import */var _arrayWithoutHoles__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! ./arrayWithoutHoles */"./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js");/* harmony import */var _iterableToArray__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(/*! ./iterableToArray */"./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/iterableToArray.js");/* harmony import */var _unsupportedIterableToArray__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(/*! ./unsupportedIterableToArray */"./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js");/* harmony import */var _nonIterableSpread__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(/*! ./nonIterableSpread */"./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js");function _toConsumableArray(arr){return Object(_arrayWithoutHoles__WEBPACK_IMPORTED_MODULE_0__["default"])(arr)||Object(_iterableToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(arr)||Object(_unsupportedIterableToArray__WEBPACK_IMPORTED_MODULE_2__["default"])(arr)||Object(_nonIterableSpread__WEBPACK_IMPORTED_MODULE_3__["default"])();}/***/},/***/"./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/typeof.js":/*!***********************************************************************************************!*\
  !*** ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/typeof.js ***!
  \***********************************************************************************************/ /*! exports provided: default */ /***/function node_modulesBabelPresetReactAppNode_modulesBabelRuntimeHelpersEsmTypeofJs(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"default",function(){return _typeof;});function _typeof(obj){"@babel/helpers - typeof";if(typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"){_typeof=function _typeof(obj){return typeof obj;};}else{_typeof=function _typeof(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj;};}return _typeof(obj);}/***/},/***/"./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js":/*!*******************************************************************************************************************!*\
  !*** ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js ***!
  \*******************************************************************************************************************/ /*! exports provided: default */ /***/function node_modulesBabelPresetReactAppNode_modulesBabelRuntimeHelpersEsmUnsupportedIterableToArrayJs(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"default",function(){return _unsupportedIterableToArray;});/* harmony import */var _arrayLikeToArray__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! ./arrayLikeToArray */"./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js");function _unsupportedIterableToArray(o,minLen){if(!o)return;if(typeof o==="string")return Object(_arrayLikeToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(o,minLen);var n=Object.prototype.toString.call(o).slice(8,-1);if(n==="Object"&&o.constructor)n=o.constructor.name;if(n==="Map"||n==="Set")return Array.from(n);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return Object(_arrayLikeToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(o,minLen);}/***/},/***/0:/*!*****************************************************!*\
  !*** multi ./build/js/app.js ./build/sass/app.scss ***!
  \*****************************************************/ /*! no static exports found */ /***/function _(module,exports,__webpack_require__){__webpack_require__(/*! /Applications/MAMP/htdocs/autoserved/view/react/build/js/app.js */"./build/js/app.js");!function webpackMissingModule(){var e=new Error("Cannot find module '/Applications/MAMP/htdocs/autoserved/view/react/build/sass/app.scss'");e.code='MODULE_NOT_FOUND';throw e;}();/***/}/******/});

/***/ }),

/***/ "./build/sass/app.scss":
/*!*****************************!*\
  !*** ./build/sass/app.scss ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/typeof.js":
/*!***********************************************************************************************!*\
  !*** ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/typeof.js ***!
  \***********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _typeof; });
function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

/***/ }),

/***/ 0:
/*!*****************************************************!*\
  !*** multi ./build/js/app.js ./build/sass/app.scss ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /Applications/MAMP/htdocs/autoserved/view/react/build/js/app.js */"./build/js/app.js");
module.exports = __webpack_require__(/*! /Applications/MAMP/htdocs/autoserved/view/react/build/sass/app.scss */"./build/sass/app.scss");


/***/ })

/******/ });