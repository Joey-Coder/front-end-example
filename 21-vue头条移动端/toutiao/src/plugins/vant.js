import Vue from 'vue'

import {
  Button,
  Cell,
  CellGroup,
  CountDown,
  Field,
  Form,
  Icon,
  NavBar,
  Notify,
  Slider,
  Tabbar,
  TabbarItem,
  Toast
} from 'vant'

Vue.use(Button)
Vue.use(Notify)
Vue.use(Toast)
Vue.use(Slider)

Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(Icon)
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(NavBar)
Vue.use(CellGroup)
Vue.use(Field)
Vue.use(Form)
Vue.use(CountDown)

// 属性挂载
// Vue.prototype.$notify = Notify
// Vue.prototype.$toast = Toast
