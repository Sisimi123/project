import drag from './drag'

const install = function(Vue) {
    Vue.directive('drag-el', drag)
}

if (window.Vue) {
    window['drag-el'] = drag
    Vue.use(install); // eslint-disable-line
}

drag.install = install
export default drag