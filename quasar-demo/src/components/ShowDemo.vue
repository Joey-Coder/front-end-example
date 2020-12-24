<template>
  <q-card class="show-demo">
    <q-toolbar class="row no-wrap dense flat bg-blue-1">
      <q-toolbar-title>
        <q-chip color="primary" text-color="white" size="md" outline>{{
          title
        }}</q-chip>
      </q-toolbar-title>
      <q-btn-group outline class=" row q-gutter-x-sm no-wrap"
        ><q-btn
          round
          icon="fab fa-github"
          class=" text-grey-8 "
          type="a"
          clickable
          :href="githubLink"
          target="__blank"
        >
          <q-tooltip>到github查看源码</q-tooltip>
        </q-btn>
        <q-btn
          round
          icon="fas fa-code"
          class="text-grey-8"
          @click="sourceOpen = !sourceOpen"
        >
          <q-tooltip>查看源码</q-tooltip>
        </q-btn></q-btn-group
      >
    </q-toolbar>
    <transition-group
      class="tab-wrapper"
      v-if="sourceOpen"
      appear
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
      <q-tabs
        v-model="tab"
        class="text-grey bg-grey-2"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
        key="tabs"
      >
        <q-tab name="template" label="template" />
        <q-tab name="script" label="script" />
      </q-tabs>

      <q-separator key="separator" />

      <q-tab-panels v-model="tab" animated key="tab-panels">
        <q-tab-panel name="template">
          <Prism language="html">{{ templateCode }}</Prism>
        </q-tab-panel>

        <q-tab-panel name="script">
          <Prism language="javascript">{{ scriptCode }}</Prism>
        </q-tab-panel>
      </q-tab-panels>
      <q-separator key="separator-bottom" />
    </transition-group>

    <q-card-section>
      <div
        :class="[
          'row',
          $q.screen.lt.sm ? 'q-gutter-sm justify-center' : 'q-gutter-lg'
        ]"
      >
        <slot name="demo"> </slot>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
// vue-prism-component插件需要原生prismjs的支持
import Prism from 'vue-prism-component'
export default {
  name: 'ShowDemo',
  data() {
    return {
      sourceOpen: false,
      tab: 'template'
    }
  },
  methods: {},
  components: {
    Prism
  },
  props: {
    title: {
      type: String,
      default: '默认标题'
    },
    githubLink: {
      type: String,
      default: 'http://github.com'
    },
    templateCode: {
      type: String,
      default: 'code'
    },
    scriptCode: {
      type: String,
      default: 'code'
    }
  },
  created() {},
  mounted() {},
  computed: {},
  watched: {}
}
</script>
<style scoped lang="scss"></style>
