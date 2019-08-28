(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[4],{

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/frontend/components/settings/server.vue?vue&type=script&lang=js&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  computed: {\n    message: function message() {\n      return this.$store.getters[\"webSocket/message\"];\n    }\n  },\n  data: function data() {\n    return {\n      error: null,\n      settings: null\n    };\n  },\n  created: function created() {\n    this.getAll();\n  },\n  watch: {\n    \"settings.host\": function settingsHost(newVal, oldVal) {\n      if (oldVal) {\n        this.update();\n      }\n    },\n    \"settings.port\": function settingsPort(newVal, oldVal) {\n      if (oldVal) {\n        this.update();\n      }\n    },\n    message: function message(data) {\n      if (data.object === \"server\") {\n        this.error = null;\n\n        switch (data.method) {\n          case \"getAll\":\n            if (data.error) {\n              this.error = data.error;\n            } else {\n              this.settings = Object.assign({}, data.results);\n            }\n\n            break;\n\n          case \"update\":\n            if (data.error) {\n              this.error = data.error;\n            } else {\n              this.settings = Object.assign({}, data.results);\n            }\n\n            break;\n\n          default:\n            console.log(\"Unknow method : \".concat(data.method));\n        }\n      }\n    }\n  },\n  methods: {\n    getAll: function getAll() {\n      this.$store.commit(\"webSocket/send\", {\n        object: \"server\",\n        method: \"getAll\"\n      });\n    },\n    update: function update() {\n      this.$store.commit(\"webSocket/send\", {\n        object: \"server\",\n        method: \"update\",\n        params: this.settings\n      });\n    }\n  }\n});\n\n//# sourceURL=webpack:///./src/frontend/components/settings/server.vue?./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/frontend/pages/Settings.vue?vue&type=script&lang=js&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var components_settings_directory_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(\"./src/frontend/components/settings/directory.vue\");\n/* harmony import */ var components_settings_transmission_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(\"./src/frontend/components/settings/transmission.vue\");\n/* harmony import */ var components_settings_plex_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(\"./src/frontend/components/settings/plex.vue\");\n/* harmony import */ var components_settings_server_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(\"./src/frontend/components/settings/server.vue\");\n/* harmony import */ var components_settings_trakt_vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(\"./src/frontend/components/settings/trakt.vue\");\n\n\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  components: {\n    Directory: components_settings_directory_vue__WEBPACK_IMPORTED_MODULE_0__[\"default\"],\n    Transmission: components_settings_transmission_vue__WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n    Plex: components_settings_plex_vue__WEBPACK_IMPORTED_MODULE_2__[\"default\"],\n    Server: components_settings_server_vue__WEBPACK_IMPORTED_MODULE_3__[\"default\"],\n    Trakt: components_settings_trakt_vue__WEBPACK_IMPORTED_MODULE_4__[\"default\"]\n  }\n});\n\n//# sourceURL=webpack:///./src/frontend/pages/Settings.vue?./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/frontend/components/settings/server.vue?vue&type=template&id=e63183ec&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _c(\n    \"div\",\n    [\n      _vm.error\n        ? _c(\"alert\", { attrs: { color: \"red\" } }, [_vm._v(_vm._s(_vm.error))])\n        : _vm._e(),\n      _vm._v(\" \"),\n      _c(\"div\", { staticClass: \"px:1\" }, [\n        _c(\"div\", { staticClass: \"text:white text:3/2\" }, [_vm._v(\"Server\")]),\n        _vm._v(\" \"),\n        _vm.settings\n          ? _c(\"form\", [\n              _c(\"input\", {\n                directives: [\n                  {\n                    name: \"model\",\n                    rawName: \"v-model\",\n                    value: _vm.settings.host,\n                    expression: \"settings.host\"\n                  }\n                ],\n                attrs: { type: \"text\", placeholder: \"localhost\" },\n                domProps: { value: _vm.settings.host },\n                on: {\n                  input: function($event) {\n                    if ($event.target.composing) {\n                      return\n                    }\n                    _vm.$set(_vm.settings, \"host\", $event.target.value)\n                  }\n                }\n              }),\n              _vm._v(\" \"),\n              _c(\"input\", {\n                directives: [\n                  {\n                    name: \"model\",\n                    rawName: \"v-model\",\n                    value: _vm.settings.port,\n                    expression: \"settings.port\"\n                  }\n                ],\n                attrs: { type: \"text\", placeholder: \"8080\" },\n                domProps: { value: _vm.settings.port },\n                on: {\n                  input: function($event) {\n                    if ($event.target.composing) {\n                      return\n                    }\n                    _vm.$set(_vm.settings, \"port\", $event.target.value)\n                  }\n                }\n              })\n            ])\n          : _vm._e()\n      ])\n    ],\n    1\n  )\n}\nvar staticRenderFns = []\nrender._withStripped = true\n\n\n\n//# sourceURL=webpack:///./src/frontend/components/settings/server.vue?./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/frontend/pages/Settings.vue?vue&type=template&id=0d3c4082&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _c(\n    \"div\",\n    { staticClass: \"flex flex:wrap\" },\n    [\n      _c(\"server\", { staticClass: \"flex:1 min-w:xs max-w:sm py:1\" }),\n      _vm._v(\" \"),\n      _c(\"directory\", { staticClass: \"flex:1 min-w:xs max-w:sm py:1\" }),\n      _vm._v(\" \"),\n      _c(\"transmission\", { staticClass: \"flex:1 min-w:xs max-w:sm py:1\" }),\n      _vm._v(\" \"),\n      _c(\"plex\", { staticClass: \"flex:1 min-w:xs max-w:sm py:1\" }),\n      _vm._v(\" \"),\n      _c(\"trakt\", { staticClass: \"flex:1 min-w:xs max-w:sm py:1\" })\n    ],\n    1\n  )\n}\nvar staticRenderFns = []\nrender._withStripped = true\n\n\n\n//# sourceURL=webpack:///./src/frontend/pages/Settings.vue?./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./src/frontend/components/settings/server.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _server_vue_vue_type_template_id_e63183ec___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(\"./src/frontend/components/settings/server.vue?vue&type=template&id=e63183ec&\");\n/* harmony import */ var _server_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(\"./src/frontend/components/settings/server.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(\"./node_modules/vue-loader/lib/runtime/componentNormalizer.js\");\n\n\n\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(\n  _server_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  _server_vue_vue_type_template_id_e63183ec___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _server_vue_vue_type_template_id_e63183ec___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  null,\n  null\n  \n)\n\n/* hot reload */\nif (false) { var api; }\ncomponent.options.__file = \"src/frontend/components/settings/server.vue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack:///./src/frontend/components/settings/server.vue?");

/***/ }),

/***/ "./src/frontend/components/settings/server.vue?vue&type=script&lang=js&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_server_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(\"./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/frontend/components/settings/server.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_server_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./src/frontend/components/settings/server.vue?");

/***/ }),

/***/ "./src/frontend/components/settings/server.vue?vue&type=template&id=e63183ec&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_server_vue_vue_type_template_id_e63183ec___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(\"./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/frontend/components/settings/server.vue?vue&type=template&id=e63183ec&\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_server_vue_vue_type_template_id_e63183ec___WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_server_vue_vue_type_template_id_e63183ec___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n\n\n//# sourceURL=webpack:///./src/frontend/components/settings/server.vue?");

/***/ }),

/***/ "./src/frontend/pages/Settings.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Settings_vue_vue_type_template_id_0d3c4082___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(\"./src/frontend/pages/Settings.vue?vue&type=template&id=0d3c4082&\");\n/* harmony import */ var _Settings_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(\"./src/frontend/pages/Settings.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(\"./node_modules/vue-loader/lib/runtime/componentNormalizer.js\");\n\n\n\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(\n  _Settings_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  _Settings_vue_vue_type_template_id_0d3c4082___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _Settings_vue_vue_type_template_id_0d3c4082___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  null,\n  null\n  \n)\n\n/* hot reload */\nif (false) { var api; }\ncomponent.options.__file = \"src/frontend/pages/Settings.vue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack:///./src/frontend/pages/Settings.vue?");

/***/ }),

/***/ "./src/frontend/pages/Settings.vue?vue&type=script&lang=js&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Settings_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(\"./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/frontend/pages/Settings.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Settings_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./src/frontend/pages/Settings.vue?");

/***/ }),

/***/ "./src/frontend/pages/Settings.vue?vue&type=template&id=0d3c4082&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Settings_vue_vue_type_template_id_0d3c4082___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(\"./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/frontend/pages/Settings.vue?vue&type=template&id=0d3c4082&\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Settings_vue_vue_type_template_id_0d3c4082___WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Settings_vue_vue_type_template_id_0d3c4082___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n\n\n//# sourceURL=webpack:///./src/frontend/pages/Settings.vue?");

/***/ })

}]);