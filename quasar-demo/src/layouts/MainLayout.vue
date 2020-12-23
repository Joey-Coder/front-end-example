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
  // {
  //   title: 'Youtube Page',
  //   caption: 'Youtube Page by quasar',
  //   icon: 'far',
  //   link: '/#/youtube'
  // },
  // {
  //   title: 'Whatsapp Page',
  //   caption: 'Whatsapp Page by quasar',
  //   icon: 'fab fa-whatsapp',
  //   link: '/#/whatsapp'
  // },
  {
    title: 'Button',
    caption: '按钮',
    icon: 'far fa-dot-circle',
    link: '/button'
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
