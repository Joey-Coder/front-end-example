// import something here

import Vue from 'vue'
import DemotUI from 'demot-ui'
import 'demot-ui/dist/demot-ui.css'
import ShowDemo from 'components/ShowDemo.vue'

import 'prismjs'
import 'prismjs/themes/prism.css'

Vue.use(DemotUI)
Vue.component(ShowDemo.name, ShowDemo)

// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/boot-files
export default async (/* { app, router, Vue ... } */) => {
  // something to do
}
