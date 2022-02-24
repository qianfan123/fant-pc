/*
 * @Author: 杨珂
 * @Date: 2021-08-09 15:22:00
 * @LastEditTime: 2021-08-09 15:22:24
 * @LastEditors: 杨珂
 * @Description:
 * @FilePath: \fant-template\src\components\dialog\DialogService.js
 * 记得注释
 */
import Vue from "vue";
import DialogController from "./DialogController";

// eslint-disable-next-line @typescript-eslint/no-empty-function
const DialogService = function() {};

function removeDialog(controller) {
  document.body.removeChild(controller.component.$el);
  controller.component.$destroy();
}

DialogService.show = function(viewModel, propsData, options) {
  if (Vue.prototype.$isServer) {
    return;
  }

  const MyComponent = Vue.extend(viewModel);
  const div = document.createElement("div");
  document.body.appendChild(div);
  const component = new MyComponent({
    propsData: Object.assign(
      {
        visible: true
      },
      propsData
    )
  }).$mount(div);

  let resolveCloseResult;
  let rejectCloseResult;
  const closeResult = new Promise((resolve, reject) => {
    resolveCloseResult = resolve;
    rejectCloseResult = reject;
  });

  const controller = new DialogController({
    component: component,
    resolve: resolveCloseResult,
    reject: rejectCloseResult,
    options: options
  });

  closeResult.then(
    () => {
      removeDialog(controller);
    },
    () => {
      removeDialog(controller);
    }
  );

  component.controller = controller;
  return closeResult;
};
export default DialogService;
export { DialogService };
