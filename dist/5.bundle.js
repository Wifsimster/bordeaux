(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[5],{

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/frontend/components/logo.vue?vue&type=script&lang=js&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  computed: {\n    isAlive: function isAlive() {\n      return this.$store.getters[\"webSocket/isAlive\"];\n    }\n  },\n  methods: {\n    connect: function connect() {\n      this.$store.dispatch(\"webSocket/ws\", new WebSocket(\"ws://\".concat(location.hostname, \":8080\")));\n    }\n  }\n});\n\n//# sourceURL=webpack:///./src/frontend/components/logo.vue?./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/frontend/components/logo.vue?vue&type=style&index=0&id=1dcd9b40&lang=scss&scoped=true&":
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(\"./node_modules/css-loader/dist/runtime/api.js\")(false);\n// Module\nexports.push([module.i, \".glitch[data-v-1dcd9b40]:hover {\\n  color: white;\\n  position: relative;\\n}\\n@keyframes Bordeaux-anim-1-data-v-1dcd9b40 {\\n0% {\\n    clip: rect(12px, 450px, 4px, 0);\\n}\\n5.88235% {\\n    clip: rect(46px, 450px, 67px, 0);\\n}\\n11.76471% {\\n    clip: rect(50px, 450px, 44px, 0);\\n}\\n17.64706% {\\n    clip: rect(44px, 450px, 40px, 0);\\n}\\n23.52941% {\\n    clip: rect(11px, 450px, 22px, 0);\\n}\\n29.41176% {\\n    clip: rect(22px, 450px, 27px, 0);\\n}\\n35.29412% {\\n    clip: rect(32px, 450px, 92px, 0);\\n}\\n41.17647% {\\n    clip: rect(5px, 450px, 78px, 0);\\n}\\n47.05882% {\\n    clip: rect(36px, 450px, 108px, 0);\\n}\\n52.94118% {\\n    clip: rect(46px, 450px, 31px, 0);\\n}\\n58.82353% {\\n    clip: rect(78px, 450px, 44px, 0);\\n}\\n64.70588% {\\n    clip: rect(31px, 450px, 18px, 0);\\n}\\n70.58824% {\\n    clip: rect(115px, 450px, 62px, 0);\\n}\\n76.47059% {\\n    clip: rect(9px, 450px, 96px, 0);\\n}\\n82.35294% {\\n    clip: rect(84px, 450px, 101px, 0);\\n}\\n88.23529% {\\n    clip: rect(83px, 450px, 79px, 0);\\n}\\n94.11765% {\\n    clip: rect(92px, 450px, 63px, 0);\\n}\\n100% {\\n    clip: rect(48px, 450px, 111px, 0);\\n}\\n}\\n@keyframes Bordeaux-anim-2-data-v-1dcd9b40 {\\n0% {\\n    clip: rect(26px, 450px, 33px, 0);\\n}\\n5.88235% {\\n    clip: rect(101px, 450px, 76px, 0);\\n}\\n11.76471% {\\n    clip: rect(1px, 450px, 97px, 0);\\n}\\n17.64706% {\\n    clip: rect(7px, 450px, 68px, 0);\\n}\\n23.52941% {\\n    clip: rect(60px, 450px, 82px, 0);\\n}\\n29.41176% {\\n    clip: rect(43px, 450px, 102px, 0);\\n}\\n35.29412% {\\n    clip: rect(60px, 450px, 50px, 0);\\n}\\n41.17647% {\\n    clip: rect(55px, 450px, 112px, 0);\\n}\\n47.05882% {\\n    clip: rect(78px, 450px, 102px, 0);\\n}\\n52.94118% {\\n    clip: rect(8px, 450px, 84px, 0);\\n}\\n58.82353% {\\n    clip: rect(98px, 450px, 69px, 0);\\n}\\n64.70588% {\\n    clip: rect(55px, 450px, 18px, 0);\\n}\\n70.58824% {\\n    clip: rect(10px, 450px, 33px, 0);\\n}\\n76.47059% {\\n    clip: rect(18px, 450px, 112px, 0);\\n}\\n82.35294% {\\n    clip: rect(34px, 450px, 75px, 0);\\n}\\n88.23529% {\\n    clip: rect(54px, 450px, 39px, 0);\\n}\\n94.11765% {\\n    clip: rect(98px, 450px, 83px, 0);\\n}\\n100% {\\n    clip: rect(110px, 450px, 2px, 0);\\n}\\n}\\n.glitch[data-v-1dcd9b40]:hover:before, .glitch[data-v-1dcd9b40]:hover:after {\\n    content: attr(data-text);\\n    position: absolute;\\n    top: 0;\\n    left: 0;\\n    width: 100%;\\n    background: #22292f;\\n    clip: rect(0, 0, 0, 0);\\n}\\n.glitch[data-v-1dcd9b40]:hover:after {\\n    left: 2px;\\n    text-shadow: -1px 0 red;\\n    animation: Bordeaux-anim-1-data-v-1dcd9b40 2s infinite linear alternate-reverse;\\n}\\n.glitch[data-v-1dcd9b40]:hover:before {\\n    left: -2px;\\n    text-shadow: 2px 0 blue;\\n    animation: Bordeaux-anim-2-data-v-1dcd9b40 3s infinite linear alternate-reverse;\\n}\\n\", \"\"]);\n\n\n\n//# sourceURL=webpack:///./src/frontend/components/logo.vue?./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/frontend/components/logo.vue?vue&type=template&id=1dcd9b40&scoped=true&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _c(\"div\", { staticClass: \"flex:1\" }, [\n    _c(\n      \"div\",\n      {\n        staticClass:\n          \"flex flex:wrap relative items:center items:baseline justify:center\"\n      },\n      [\n        _c(\n          \"div\",\n          {\n            staticClass:\n              \"relative text:2 text:bold mt:1/2 mr:1 cursor:pointer glitch\",\n            attrs: { \"data-text\": \"Bordeaux\" }\n          },\n          [_vm._v(\"Bordeaux\")]\n        ),\n        _vm._v(\" \"),\n        _vm.isAlive\n          ? _c(\"div\", { staticClass: \"text:green text:7/8\" }, [\n              _vm._v(\"Opened\")\n            ])\n          : _c(\n              \"div\",\n              {\n                staticClass: \"text:red text:7/8 cursor:pointer\",\n                on: {\n                  click: function($event) {\n                    return _vm.connect()\n                  }\n                }\n              },\n              [_vm._v(\"Closed\")]\n            )\n      ]\n    )\n  ])\n}\nvar staticRenderFns = []\nrender._withStripped = true\n\n\n\n//# sourceURL=webpack:///./src/frontend/components/logo.vue?./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/frontend/components/logo.vue?vue&type=style&index=0&id=1dcd9b40&lang=scss&scoped=true&":
/***/ (function(module, exports, __webpack_require__) {

eval("// style-loader: Adds some css to the DOM by adding a <style> tag\n\n// load the styles\nvar content = __webpack_require__(\"./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/frontend/components/logo.vue?vue&type=style&index=0&id=1dcd9b40&lang=scss&scoped=true&\");\nif(typeof content === 'string') content = [[module.i, content, '']];\nif(content.locals) module.exports = content.locals;\n// add the styles to the DOM\nvar add = __webpack_require__(\"./node_modules/vue-style-loader/lib/addStylesClient.js\").default\nvar update = add(\"24357fd6\", content, false, {});\n// Hot Module Replacement\nif(false) {}\n\n//# sourceURL=webpack:///./src/frontend/components/logo.vue?./node_modules/vue-style-loader!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./src/frontend/components/logo.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _logo_vue_vue_type_template_id_1dcd9b40_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(\"./src/frontend/components/logo.vue?vue&type=template&id=1dcd9b40&scoped=true&\");\n/* harmony import */ var _logo_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(\"./src/frontend/components/logo.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport *//* harmony import */ var _logo_vue_vue_type_style_index_0_id_1dcd9b40_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(\"./src/frontend/components/logo.vue?vue&type=style&index=0&id=1dcd9b40&lang=scss&scoped=true&\");\n/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(\"./node_modules/vue-loader/lib/runtime/componentNormalizer.js\");\n\n\n\n\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(\n  _logo_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  _logo_vue_vue_type_template_id_1dcd9b40_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _logo_vue_vue_type_template_id_1dcd9b40_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  \"1dcd9b40\",\n  null\n  \n)\n\n/* hot reload */\nif (false) { var api; }\ncomponent.options.__file = \"src/frontend/components/logo.vue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack:///./src/frontend/components/logo.vue?");

/***/ }),

/***/ "./src/frontend/components/logo.vue?vue&type=script&lang=js&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_logo_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(\"./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/frontend/components/logo.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_logo_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./src/frontend/components/logo.vue?");

/***/ }),

/***/ "./src/frontend/components/logo.vue?vue&type=style&index=0&id=1dcd9b40&lang=scss&scoped=true&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_logo_vue_vue_type_style_index_0_id_1dcd9b40_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(\"./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/frontend/components/logo.vue?vue&type=style&index=0&id=1dcd9b40&lang=scss&scoped=true&\");\n/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_logo_vue_vue_type_style_index_0_id_1dcd9b40_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_logo_vue_vue_type_style_index_0_id_1dcd9b40_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);\n/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_logo_vue_vue_type_style_index_0_id_1dcd9b40_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_logo_vue_vue_type_style_index_0_id_1dcd9b40_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));\n /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_logo_vue_vue_type_style_index_0_id_1dcd9b40_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); \n\n//# sourceURL=webpack:///./src/frontend/components/logo.vue?");

/***/ }),

/***/ "./src/frontend/components/logo.vue?vue&type=template&id=1dcd9b40&scoped=true&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_logo_vue_vue_type_template_id_1dcd9b40_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(\"./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/frontend/components/logo.vue?vue&type=template&id=1dcd9b40&scoped=true&\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_logo_vue_vue_type_template_id_1dcd9b40_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_logo_vue_vue_type_template_id_1dcd9b40_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n\n\n//# sourceURL=webpack:///./src/frontend/components/logo.vue?");

/***/ })

}]);