<template>
  <div class="container q-px-lg">
    <div class="title">
      <h4 class="q-mb-md">Button 按钮</h4>
      <p class="text-grey-8">常用的操作按钮</p>
    </div>
    <div class="basic-use">
      <div class="title">
        <h5 class="q-mb-md">基础用法</h5>
        <p class="text-grey-8">按钮的基础用法</p>
        <show-demo
          githubLink="https://github.com/Joey-Coder/demo-ui/blob/master/packages/button.vue"
          title="基础用法"
        >
          <template #demo>
            <d-button>默认按钮</d-button>
            <d-button type="primary">主要按钮</d-button>
            <d-button type="success">成功按钮</d-button>
            <d-button type="info">信息按钮</d-button>
            <d-button type="warning">警告按钮</d-button>
            <d-button type="danger">危险按钮</d-button>
          </template>
        </show-demo>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageButton',
  data() {
    return {}
  },
  methods: {},
  components: {},
  props: {},
  created() {},
  mounted() {},
  computed: {},
  watched: {}
}
</script>
<style scoped lang="less"></style>
