// { "framework": "Vue"} 

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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(1)
)

/* script */
__vue_exports__ = __webpack_require__(2)

/* template */
var __vue_template__ = __webpack_require__(3)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "/Users/lichaoqian/Project/Github/Weex/my-project/src/login.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-16d54971"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__
module.exports.el = 'true'
new Vue(module.exports)


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = {
  "wrapper": {
    "position": "absolute",
    "top": 0,
    "right": 0,
    "bottom": 0,
    "left": 0
  },
  "login": {
    "marginTop": "180"
  },
  "input-wrapper": {
    "width": "550",
    "marginLeft": "100",
    "marginRight": "100",
    "marginBottom": "30"
  },
  "input": {
    "fontSize": "30",
    "height": "80",
    "width": "550",
    "paddingLeft": "90",
    "paddingTop": "15",
    "paddingBottom": "15",
    "borderWidth": "1",
    "borderColor": "#48c9bf",
    "borderRadius": "10",
    "outline": "none"
  },
  "input-img": {
    "position": "absolute",
    "top": "10",
    "left": "15",
    "width": "60",
    "height": "60"
  },
  "input-login": {
    "height": "80",
    "width": "550",
    "backgroundColor": "#48c9bf",
    "borderRadius": "10",
    "marginTop": "40"
  },
  "input-login-text": {
    "height": "80",
    "width": "550",
    "textAlign": "center",
    "lineHeight": "80",
    "color": "#FFFFFF",
    "fontSize": "35"
  },
  "input-forget": {
    "position": "absolute",
    "left": "30",
    "fontSize": "30"
  },
  "input-register": {
    "position": "absolute",
    "right": "30",
    "fontSize": "30"
  }
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

module.exports = {
    data: {
        userNumber: '',
        userPassword: ''
    },
    methods: {
        onchangeUserNumber: function onchangeUserNumber(event) {
            this.userNumber = event.value;
        },
        onchangeUserPassword: function onchangeUserPassword(event) {
            this.userPassword = event.value;
        },
        /*找回密码*/
        findPassword: function findPassword() {
            this.$vm('toast').$emit('toast', 'Hello,找回密码暂时未开发，后续我们会进行完善。');
        },
        /*注册*/
        register: function register() {
            this.$vm('toast').$emit('toast', 'Hello,注册暂时未开发，后续我们会进行完善。');
        },
        /*处理登录*/
        login: function login() {
            if (this.userNumber.length < 1) {
                this.$vm('toast').$emit('toast', '请输入手机号');
                return;
            } else if (this.userPassword.length < 1) {
                this.$vm('toast').$emit('toast', '请输入密码');
                return;
            }
            this.$vm('toast').$emit('toast', "登录成功");
        }
    }
};

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["wrapper"]
  }, [_vm._m(0), _c('toast', {
    attrs: {
      "id": "toast"
    }
  })], 1)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["login"]
  }, [_c('div', {
    staticClass: ["input-wrapper"]
  }, [_c('input', {
    staticClass: ["input"],
    attrs: {
      "onchange": "onchangeUserNumber",
      "type": "text",
      "placeholder": "手机号",
      "autofocus": "true",
      "value": ""
    }
  }), _c('image', {
    staticClass: ["input-img"],
    attrs: {
      "src": "resources/img/login_input_user_img.png"
    }
  })]), _c('div', {
    staticClass: ["input-wrapper"]
  }, [_c('input', {
    staticClass: ["input"],
    attrs: {
      "onchange": "onchangeUserPassword",
      "type": "password",
      "placeholder": "密码",
      "value": ""
    }
  }), _c('image', {
    staticClass: ["input-img"],
    attrs: {
      "src": "resources/img/login_input_pass_img.png"
    }
  })]), _c('div', {
    staticClass: ["input-wrapper"]
  }, [_c('div', {
    staticClass: ["input-login"],
    attrs: {
      "onclick": "login"
    }
  }, [_c('text', {
    staticClass: ["input-login-text"]
  }, [_vm._v("登录")])])]), _c('div', {
    staticClass: ["input-wrapper"]
  }, [_c('text', {
    staticClass: ["input-forget"],
    attrs: {
      "onclick": "findPassword"
    }
  }, [_vm._v("找回密码")]), _c('text', {
    staticClass: ["input-register"],
    attrs: {
      "onclick": "register"
    }
  }, [_vm._v("立即注册")])])])
}]}
module.exports.render._withStripped = true

/***/ })
/******/ ]);