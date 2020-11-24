// dayjs 时间管理库
import dayjs from 'dayjs'
import Vue from 'vue'

// 配置使用中文语言包
import 'dayjs/locale/zh-cn'

// 设置相对时间
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.locale('zh-cn')
// RelativeTime 增加了 .from .to .fromNow .toNow 4 个 API 来展示相对的时间
dayjs.extend(relativeTime)

// 包装日期的全局过滤器
Vue.filter('relativeTime', value => {
  return dayjs(value).from(dayjs())
})
// 自定义格式参数
Vue.filter('datetime', (value, format = 'YYYY-MM-DD HH:mm:ss') => {
  return dayjs(value).format(format)
})
