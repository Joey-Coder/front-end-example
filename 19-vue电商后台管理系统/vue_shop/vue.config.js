// vue-cli配置文件
// 用来配置port host
module.exports = {
  devServer: {
    open: true,
    port: 8878
  },
  chainWebpack: config => {
    // 发布模式
    config.when(process.env.NODE_ENV === 'production', config => {
      config
        .entry('app')
        .clear()
        .add('./src/main-prod.js')
      //  配置CDN
      config.set('externals', {
        vue: 'Vue',
        'vue-router': 'VueRouter',
        axios: 'axios',
        lodash: '_',
        echarts: 'echarts',
        nprogress: 'NProgress',
        'vue-quill-editor': 'VueQuillEditor',
        'vue-table-with-tree-grid': 'TreeTable'
      })
      // 根据发布模式渲染index
      config.plugin('html').tap(args => {
        args[0].isProd = true
        return args
      })
    })
    // 开发模式
    config.when(process.env.NODE_ENV === 'development', config => {
      config
        .entry('app')
        .clear()
        .add('./src/main-dev.js')

      // 根据生产模式渲染index
      config.plugin('html').tap(args => {
        args[0].isProd = false
        return args
      })
    })
  }
}
