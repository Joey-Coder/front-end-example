// 发布阶段需要用到的插件列表
const prodPlugins = []
if (process.env.NODE_ENV === 'production') {
  prodPlugins.push('transform-remove-console')
}
module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  plugins: [
    [
      'component',
      {
        libraryName: 'element-ui',
        styleLibraryName: 'theme-chalk'
      }
    ],
    // 发布阶段去除console功能
    ...prodPlugins,
    // 路由懒加载插件
    '@babel/plugin-syntax-dynamic-import'
  ]
}
