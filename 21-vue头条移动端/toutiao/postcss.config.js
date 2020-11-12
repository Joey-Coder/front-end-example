module.exports = {
  plugins: {
    // autoprefixer 的相关配置移动到browserslistrc中
    // autoprefixer: {
    //   browsers: ['Android >= 4.0', 'iOS >= 8']
    // },
    'postcss-pxtorem': {
      // 750 => 75
      // 375 => 37.5
      rootValue: 37.5,
      // 转换所有包括font-size, width, height
      propList: ['*']
    }
  }
}
