// import something here

import Vue from 'vue'
import DemotUI from 'demot-ui'
import 'demot-ui/dist/demot-ui.css'
import ShowDemo from 'components/ShowDemo.vue'

import 'prismjs'
import 'prismjs/themes/prism.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faEnvelope,
  faStar,
  faEdit,
  faTrashAlt,
  faSmile,
  faTimesCircle,
  faEye
} from '@fortawesome/free-regular-svg-icons'

import { faCheck } from '@fortawesome/free-solid-svg-icons'

library.add(
  faEnvelope,
  faStar,
  faEdit,
  faCheck,
  faTrashAlt,
  faSmile,
  faTimesCircle,
  faEye
)

Vue.use(DemotUI)
Vue.component(ShowDemo.name, ShowDemo)
// 全局注册字体图标组件
Vue.component('fai', FontAwesomeIcon)

// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/boot-files
export default async (/* { app, router, Vue ... } */) => {
  // something to do
}
