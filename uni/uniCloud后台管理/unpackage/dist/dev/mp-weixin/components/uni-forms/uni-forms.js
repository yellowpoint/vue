(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["components/uni-forms/uni-forms"],{

/***/ 160:
/*!******************************************************************!*\
  !*** E:/vue/uni/uniCloud后台管理/components/uni-forms/uni-forms.vue ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _uni_forms_vue_vue_type_template_id_ae0a3a2c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./uni-forms.vue?vue&type=template&id=ae0a3a2c& */ 161);
/* harmony import */ var _uni_forms_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./uni-forms.vue?vue&type=script&lang=js& */ 163);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _uni_forms_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _uni_forms_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _D_HBuilderX_1_9_4_20190426_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 12);

var renderjs




/* normalize component */

var component = Object(_D_HBuilderX_1_9_4_20190426_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _uni_forms_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _uni_forms_vue_vue_type_template_id_ae0a3a2c___WEBPACK_IMPORTED_MODULE_0__["render"],
  _uni_forms_vue_vue_type_template_id_ae0a3a2c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _uni_forms_vue_vue_type_template_id_ae0a3a2c___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "components/uni-forms/uni-forms.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 161:
/*!*************************************************************************************************!*\
  !*** E:/vue/uni/uniCloud后台管理/components/uni-forms/uni-forms.vue?vue&type=template&id=ae0a3a2c& ***!
  \*************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_HBuilderX_1_9_4_20190426_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_1_9_4_20190426_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_D_HBuilderX_1_9_4_20190426_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_1_9_4_20190426_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_1_9_4_20190426_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_1_9_4_20190426_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_forms_vue_vue_type_template_id_ae0a3a2c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./uni-forms.vue?vue&type=template&id=ae0a3a2c& */ 162);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _D_HBuilderX_1_9_4_20190426_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_1_9_4_20190426_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_D_HBuilderX_1_9_4_20190426_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_1_9_4_20190426_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_1_9_4_20190426_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_1_9_4_20190426_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_forms_vue_vue_type_template_id_ae0a3a2c___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _D_HBuilderX_1_9_4_20190426_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_1_9_4_20190426_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_D_HBuilderX_1_9_4_20190426_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_1_9_4_20190426_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_1_9_4_20190426_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_1_9_4_20190426_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_forms_vue_vue_type_template_id_ae0a3a2c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _D_HBuilderX_1_9_4_20190426_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_1_9_4_20190426_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_D_HBuilderX_1_9_4_20190426_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_1_9_4_20190426_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_1_9_4_20190426_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_1_9_4_20190426_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_forms_vue_vue_type_template_id_ae0a3a2c___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _D_HBuilderX_1_9_4_20190426_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_1_9_4_20190426_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_D_HBuilderX_1_9_4_20190426_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_1_9_4_20190426_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_1_9_4_20190426_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_1_9_4_20190426_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_forms_vue_vue_type_template_id_ae0a3a2c___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 162:
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/vue/uni/uniCloud后台管理/components/uni-forms/uni-forms.vue?vue&type=template&id=ae0a3a2c& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 163:
/*!*******************************************************************************************!*\
  !*** E:/vue/uni/uniCloud后台管理/components/uni-forms/uni-forms.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_HBuilderX_1_9_4_20190426_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_1_9_4_20190426_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_1_9_4_20190426_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_1_9_4_20190426_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_1_9_4_20190426_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_forms_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./uni-forms.vue?vue&type=script&lang=js& */ 164);
/* harmony import */ var _D_HBuilderX_1_9_4_20190426_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_1_9_4_20190426_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_1_9_4_20190426_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_1_9_4_20190426_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_1_9_4_20190426_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_forms_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_HBuilderX_1_9_4_20190426_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_1_9_4_20190426_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_1_9_4_20190426_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_1_9_4_20190426_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_1_9_4_20190426_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_forms_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_HBuilderX_1_9_4_20190426_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_1_9_4_20190426_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_1_9_4_20190426_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_1_9_4_20190426_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_1_9_4_20190426_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_forms_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_HBuilderX_1_9_4_20190426_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_1_9_4_20190426_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_1_9_4_20190426_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_1_9_4_20190426_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_1_9_4_20190426_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_forms_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_HBuilderX_1_9_4_20190426_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_1_9_4_20190426_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_1_9_4_20190426_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_1_9_4_20190426_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_1_9_4_20190426_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_forms_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 164:
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/vue/uni/uniCloud后台管理/components/uni-forms/uni-forms.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 82));





























var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
















var _validate = _interopRequireDefault(__webpack_require__(/*! ./validate.js */ 165));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}_vue.default.prototype.binddata = function (name, value, formName) {if (formName) {this.$refs[formName].setValue(name, value);} else {var refName = null;for (var i in this.$refs) {if (this.$refs[i] && this.$refs[i].$options.name === 'uniForms') {refName = i;break;}}if (!refName) return console.error('当前 uni-froms 组件缺少 ref 属性');this.$refs[refName].setValue(name, value);}};var _default2 =

{
  name: 'uniForms',
  props: {
    value: {
      type: Object,
      default: function _default() {
        return {};
      } },

    // 表单校验规则
    rules: {
      type: Object,
      default: function _default() {
        return {};
      } },

    // 校验触发器方式，默认 关闭
    validateTrigger: {
      type: String,
      default: '' },

    // label 位置，可选值 top/left
    labelPosition: {
      type: String,
      default: 'left' },

    // label 宽度，单位 px
    labelWidth: {
      type: [String, Number],
      default: 65 },

    // label 居中方式，可选值 left/center/right
    labelAlign: {
      type: String,
      default: 'left' },

    errShowType: {
      type: String,
      default: 'undertext' } },


  data: function data() {
    return {
      formData: {} };

  },
  watch: {
    rules: function rules(newVal) {
      this.init(newVal);
    },
    trigger: function trigger(_trigger) {
      this.formTrigger = _trigger;
    },
    value: {
      handler: function handler(newVal) {var _this2 = this;
        if (this.isChildEdit) {
          this.isChildEdit = false;
          return;
        }
        this.childrens.forEach(function (item) {
          if (item.name) {
            var formDataValue = newVal.hasOwnProperty(item.name) ? newVal[item.name] : null;
            _this2.formData[item.name] = _this2._getValue(item, formDataValue);
          }
        });
      },
      deep: true } },


  created: function created() {
    var _this = this;
    this.childrens = [];
    this.formRules = [];
    this.init(this.rules);

  },
  methods: {
    init: function init(formRules) {
      if (Object.keys(formRules).length > 0) {
        this.formTrigger = this.trigger;
        this.formRules = formRules;
        if (!this.validator) {
          this.validator = new _validate.default(formRules);
        }
        this.childrens.forEach(function (item) {
          item.init();
        });
      }
    },
    /**
        * 设置校验规则
        * @param {Object} formRules
        */
    setRules: function setRules(formRules) {
      this.init(formRules);
    },
    /**
        * 公开给用户使用
        * 设置自定义表单组件 value 值
        *  @param {String} name 字段名称
        *  @param {String} value 字段值
        */
    setValue: function setValue(name, value, callback) {
      var example = this.childrens.find(function (child) {return child.name === name;});
      if (!example) return null;
      this.isChildEdit = true;
      value = this._getValue(example, value);
      this.formData[name] = value;
      example.val = value;
      this.$emit('input', Object.assign({}, this.value, this.formData));
      return example.triggerCheck(value, callback);
    },

    /**
        * TODO 表单提交， 小程序暂不支持这种用法
        * @param {Object} event
        */
    submitForm: function submitForm(event) {
      var value = event.detail.value;
      return this.validateAll(value || this.formData, 'submit');
    },
    /**
        * 表单重置
        * @param {Object} event
        */
    resetForm: function resetForm(event) {var _this3 = this;
      this.childrens.forEach(function (item) {
        item.errMsg = '';
        item.val = '';
        item.$emit('input', '');
      });

      this.isChildEdit = true;
      this.childrens.forEach(function (item) {
        if (item.name) {
          _this3.formData[item.name] = _this3._getValue(item, '');
        }
      });

      this.$emit('input', this.formData);
      this.$emit('reset', event);
    },

    /**
        * 触发表单校验，通过 @validate 获取
        * @param {Object} validate
        */
    validateCheck: function validateCheck(validate) {
      if (validate === null) validate = null;
      this.$emit('validate', validate);
    },
    /**
        * 校验所有或者部分表单
        */
    validateAll: function validateAll(invalidFields, type, callback) {var _this4 = this;return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee() {var promise, fieldsValue, tempInvalidFields, i, j, result, example, _loop, _i, _ret;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:if (
                _this4.validator) {_context.next = 3;break;}
                _this4.$emit('submit', {
                  detail: {
                    value: invalidFields,
                    errors: null } });return _context.abrupt("return");case 3:




                _this4.childrens.forEach(function (item) {
                  item.errMsg = '';
                });


                if (callback && typeof callback !== 'function' && Promise) {
                  promise = new Promise(function (resolve, reject) {
                    callback = function callback(valid, invalidFields) {
                      !valid ? resolve(invalidFields) : reject(valid);
                    };
                  });
                }

                fieldsValue = {};
                tempInvalidFields = Object.assign({}, invalidFields);

                Object.keys(_this4.formRules).forEach(function (item) {
                  var values = _this4.formRules[item];
                  var rules = values && values.rules || [];
                  var isNoField = false;
                  for (var i = 0; i < rules.length; i++) {
                    var rule = rules[i];
                    if (rule.required) {
                      isNoField = true;
                      break;
                    }
                  }

                  // 如果存在 required 才会将内容插入校验对象
                  if (!isNoField && !tempInvalidFields[item] && tempInvalidFields[item] !== false) {
                    delete tempInvalidFields[item];
                  }

                });
                // 循环字段是否存在于校验规则中
                for (i in _this4.formRules) {
                  for (j in tempInvalidFields) {
                    if (i === j) {
                      fieldsValue[i] = tempInvalidFields[i];
                    }
                  }
                }_context.next = 11;return (

                  _this4.validator.invokeValidateUpdate(fieldsValue, true));case 11:result = _context.sent;

                if (Array.isArray(result)) {
                  if (result.length === 0) result = null;
                }
                example = null;if (!

                result) {_context.next = 24;break;}_loop = function _loop(
                _i) {
                  var item = result[_i];
                  example = _this4.childrens.find(function (child) {return child.name === item.key;});
                  if (_this4.errShowType === 'undertext') {
                    if (example) example.errMsg = item.errorMessage;
                  } else {
                    if (_this4.errShowType === 'toast') {
                      uni.showToast({
                        title: item.errorMessage || '校验错误',
                        icon: 'none' });

                      return "break";
                    } else if (_this4.errShowType === 'modal') {
                      uni.showModal({
                        title: '提示',
                        content: item.errorMessage || '校验错误' });

                      return "break";
                    } else {
                      if (example) example.errMsg = item.errorMessage;
                    }
                  }};_i = 0;case 17:if (!(_i < result.length)) {_context.next = 24;break;}_ret = _loop(_i);if (!(_ret === "break")) {_context.next = 21;break;}return _context.abrupt("break", 24);case 21:_i++;_context.next = 17;break;case 24:



                if (type === 'submit') {
                  _this4.$emit('submit', {
                    detail: {
                      value: invalidFields,
                      errors: result } });


                } else {
                  _this4.$emit('validate', result);
                }
                callback && typeof callback === 'function' && callback(result ? false : true, result ? result : invalidFields);if (!(
                promise && callback)) {_context.next = 28;break;}return _context.abrupt("return", promise);case 28:case "end":return _context.stop();}}}, _callee);}))();
    },

    /**
        * 外部调用方法
        * 手动提交校验表单
        * 对整个表单进行校验的方法，参数为一个回调函数。
        */
    submit: function submit() {
      return this.validateAll(this.formData, 'submit');
    },

    /**
        * 外部调用方法
        * 校验表单
        * 对整个表单进行校验的方法，参数为一个回调函数。
        */
    validate: function validate(callback) {
      return this.validateAll(this.formData, '', callback);
    },

    /**
        * 部分表单校验
        * @param {Object} props
        * @param {Object} cb
        */
    validateField: function validateField(props, callback) {var _this5 = this;
      props = [].concat(props);
      var invalidFields = {};
      this.childrens.forEach(function (item) {
        // item.parentVal((val, name) => {
        if (props.indexOf(item.name) !== -1) {
          invalidFields = Object.assign({}, invalidFields, _defineProperty({},
          item.name, _this5.formData[item.name]));

        }
        // })

      });
      return this.validateAll(invalidFields, '', callback);
    },

    /**
        * 对整个表单进行重置，将所有字段值重置为初始值并移除校验结果
        */
    resetFields: function resetFields() {
      this.resetForm();
    },

    /**
        * 移除表单项的校验结果。传入待移除的表单项的 prop 属性或者 prop 组成的数组，如不传则移除整个表单的校验结果
        */
    clearValidate: function clearValidate(props) {
      props = [].concat(props);
      this.childrens.forEach(function (item) {
        if (props.length === 0) {
          item.errMsg = '';
        } else {
          if (props.indexOf(item.name) !== -1) {
            item.errMsg = '';
          }
        }
      });
    },
    // 把 value 转换成指定的类型
    _getValue: function _getValue(item, value) {var _this6 = this;
      var rules = item.formRules.rules || [];
      var isRuleNum = rules.find(function (val) {return val.format && _this6.type_filter(val.format);});
      var isRuleBool = rules.find(function (val) {return val.format && val.format === 'boolean' || val.format === 'bool';});
      // 输入值为 number
      if (isRuleNum) {
        value = value === '' || value === null ? null : Number(value);
      }
      // 简单判断真假值
      if (isRuleBool) {
        value = !value ? false : true;
      }
      return value;
    },
    // 过滤数字类型
    type_filter: function type_filter(format) {
      return format === 'int' || format === 'double' || format === 'number';
    } } };exports.default = _default2;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ })

}]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/uni-forms/uni-forms.js.map
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/uni-forms/uni-forms-create-component',
    {
        'components/uni-forms/uni-forms-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('1')['createComponent'](__webpack_require__(160))
        })
    },
    [['components/uni-forms/uni-forms-create-component']]
]);
