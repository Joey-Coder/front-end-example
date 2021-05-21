export default function applyMixin(Vue) {
  Vue.mixin({
    // 全局混入vueInit，在beforeCreate阶段执行
    beforeCreate: vuexInit
  })
}

function vuexInit() {
  const options = this.$options
  if (options.store) {
    this.$store = options.store
  } else if (options.parent && options.parent.$store) {
    this.$store = options.parent.$store
  }
}
