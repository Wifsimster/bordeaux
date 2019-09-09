(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[7],{

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/frontend/components/notification.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/frontend/components/notification.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var vuex_pathify__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vuex-pathify */ \"./node_modules/vuex-pathify/dist/vuex-pathify.esm.js\");\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  computed: {\n    list: Object(vuex_pathify__WEBPACK_IMPORTED_MODULE_0__[\"get\"])(\"notification/list\")\n  },\n  methods: {\n    close: function close(index) {\n      this.$store.dispatch(\"notification/remove\", index);\n    }\n  }\n});\n\n//# sourceURL=webpack:///./src/frontend/components/notification.vue?./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/frontend/components/notification.vue?vue&type=template&id=e6632ec0&":
/*!***************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/frontend/components/notification.vue?vue&type=template&id=e6632ec0& ***!
  \***************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _c(\n    \"div\",\n    { staticClass: \"fixed z:50 r:1 b:0\" },\n    [\n      _c(\n        \"transition-group\",\n        { attrs: { name: \"flip\", appear: \"\" } },\n        _vm._l(_vm.list, function(item, index) {\n          return _c(\n            \"div\",\n            {\n              key: item.id,\n              staticClass: \"m:1/2 rounded shadow:large z:20 relative\",\n              class: \"bg:\" + item.color,\n              attrs: { id: item.id }\n            },\n            [\n              _c(\"div\", { staticClass: \"flex items:baseline\" }, [\n                _c(\"div\", { staticClass: \"text:white px:1 pl:1/2 pr:1/4\" }, [\n                  _vm._v(_vm._s(item.message))\n                ]),\n                _vm._v(\" \"),\n                _c(\n                  \"i\",\n                  {\n                    staticClass:\n                      \"float:right text:white text:3/4 mr:1/2 p:1/4 rounded cursor:pointer\",\n                    class: \"hover:bg:\" + item.color + \"-light\",\n                    on: {\n                      click: function($event) {\n                        return _vm.close(index)\n                      }\n                    }\n                  },\n                  [_vm._v(\"x\")]\n                )\n              ]),\n              _vm._v(\" \"),\n              item.timeout\n                ? _c(\"div\", {\n                    staticClass: \"rounded:b m:0 p:0\",\n                    class: \"bg:\" + item.color + \"-darker\",\n                    style:\n                      \"height: 4px; width:calc(\" + item.width + \"% - 0.25rem);\"\n                  })\n                : _vm._e()\n            ]\n          )\n        }),\n        0\n      )\n    ],\n    1\n  )\n}\nvar staticRenderFns = []\nrender._withStripped = true\n\n\n\n//# sourceURL=webpack:///./src/frontend/components/notification.vue?./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./src/frontend/components/notification.vue":
/*!**************************************************!*\
  !*** ./src/frontend/components/notification.vue ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _notification_vue_vue_type_template_id_e6632ec0___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./notification.vue?vue&type=template&id=e6632ec0& */ \"./src/frontend/components/notification.vue?vue&type=template&id=e6632ec0&\");\n/* harmony import */ var _notification_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./notification.vue?vue&type=script&lang=js& */ \"./src/frontend/components/notification.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"./node_modules/vue-loader/lib/runtime/componentNormalizer.js\");\n\n\n\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(\n  _notification_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  _notification_vue_vue_type_template_id_e6632ec0___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _notification_vue_vue_type_template_id_e6632ec0___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  null,\n  null\n  \n)\n\n/* hot reload */\nif (false) { var api; }\ncomponent.options.__file = \"src/frontend/components/notification.vue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack:///./src/frontend/components/notification.vue?");

/***/ }),

/***/ "./src/frontend/components/notification.vue?vue&type=script&lang=js&":
/*!***************************************************************************!*\
  !*** ./src/frontend/components/notification.vue?vue&type=script&lang=js& ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_notification_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib!../../../node_modules/vue-loader/lib??vue-loader-options!./notification.vue?vue&type=script&lang=js& */ \"./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/frontend/components/notification.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_notification_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./src/frontend/components/notification.vue?");

/***/ }),

/***/ "./src/frontend/components/notification.vue?vue&type=template&id=e6632ec0&":
/*!*********************************************************************************!*\
  !*** ./src/frontend/components/notification.vue?vue&type=template&id=e6632ec0& ***!
  \*********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_notification_vue_vue_type_template_id_e6632ec0___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./notification.vue?vue&type=template&id=e6632ec0& */ \"./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/frontend/components/notification.vue?vue&type=template&id=e6632ec0&\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_notification_vue_vue_type_template_id_e6632ec0___WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_notification_vue_vue_type_template_id_e6632ec0___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n\n\n//# sourceURL=webpack:///./src/frontend/components/notification.vue?");

/***/ })

}]);