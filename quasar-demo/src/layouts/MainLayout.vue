<template>
  <q-layout view="hHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="glossy">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          DEMO-UI
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label header class="text-grey-8">
          Components
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'

const linksData = [
  {
    title: 'Install & Use',
    caption: '安装&使用',
    icon: 'iconfont icon-download',
    link: '/install'
  },
  {
    title: 'Button',
    caption: '按钮',
    icon: 'iconfont icon-button',
    link: '/button'
  },
  {
    title: 'Dialog',
    caption: '对话框',
    icon: 'iconfont icon-dialog',
    link: '/dialog'
  },
  {
    title: 'Input',
    caption: '输入框',
    icon: 'iconfont icon-input',
    link: '/input'
  },
  {
    title: 'Switch',
    caption: '开关',
    icon: 'iconfont icon-switch',
    link: '/switch'
  },
  {
    title: 'Radio',
    caption: '单选框',
    icon: 'iconfont icon-radio',
    link: '/radio'
  },
  {
    title: 'Checkout',
    caption: '复选框',
    icon: 'iconfont icon-checkout',
    link: '/checkout'
  },
  {
    title: 'Form',
    caption: '表单',
    icon: 'iconfont icon-form',
    link: '/form'
  }
]

export default {
  name: 'MainLayout',
  components: { EssentialLink },
  data() {
    return {
      leftDrawerOpen: false,
      essentialLinks: linksData
    }
  }
}
</script>
