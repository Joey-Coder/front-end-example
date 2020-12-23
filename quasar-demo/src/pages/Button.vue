<template>
  <div class="container q-pa-md">
    <div class="title">
      <h4 class="q-mb-md">Button 按钮</h4>
      <p class="text-grey-8">常用的操作按钮</p>
    </div>
    <div class="basic-style">
      <div class="title">
        <h5 class="q-mb-md">基础用法</h5>
        <p class="text-grey-8">按钮的基础用法</p>
        <show-demo
          githubLink="https://github.com/Joey-Coder/demo-ui/blob/master/packages/button.vue"
          title="基础按钮"
          :templateCode="templateCode"
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
    <div class="plain-style">
      <div class="title">
        <h5 class="q-mb-md">朴素按钮</h5>
        <p class="text-grey-8">按钮的基础用法</p>
        <show-demo
          githubLink="https://github.com/Joey-Coder/demo-ui/blob/master/packages/button.vue"
          title="朴素按钮"
          :templateCode="plainTemplateCode"
        >
          <template #demo>
            <d-button plain>默认按钮</d-button>
            <d-button type="primary" plain>主要按钮</d-button>
            <d-button type="success" plain>成功按钮</d-button>
            <d-button type="info" plain>信息按钮</d-button>
            <d-button type="warning" plain>警告按钮</d-button>
            <d-button type="danger" plain>危险按钮</d-button>
          </template>
        </show-demo>
      </div>
    </div>
    <div class="mimicry-style">
      <div class="title">
        <h5 class="q-mb-md">拟态按钮</h5>
        <p class="text-grey-8">按钮的基础用法</p>
        <show-demo
          githubLink="https://github.com/Joey-Coder/demo-ui/blob/master/packages/button.vue"
          title="拟态按钮"
          :templateCode="MimicryTemplateCode"
        >
          <template #demo>
            <d-button mimicry>默认按钮</d-button>
            <d-button type="primary" mimicry>主要按钮</d-button>
            <d-button type="success" mimicry>成功按钮</d-button>
            <d-button type="info" mimicry>信息按钮</d-button>
            <d-button type="warning" mimicry>警告按钮</d-button>
            <d-button type="danger" mimicry>危险按钮</d-button>
          </template>
        </show-demo>
      </div>
    </div>
    <div class="round-style">
      <div class="title">
        <h5 class="q-mb-md">圆角按钮</h5>
        <p class="text-grey-8">按钮的基础用法</p>
        <show-demo
          githubLink="https://github.com/Joey-Coder/demo-ui/blob/master/packages/button.vue"
          title="拟态按钮"
          :templateCode="RoundTemplateCode"
        >
          <template #demo>
            <d-button round>默认按钮</d-button>
            <d-button type="primary" round>主要按钮</d-button>
            <d-button type="success" round>成功按钮</d-button>
            <d-button type="info" round>信息按钮</d-button>
            <d-button type="warning" round>警告按钮</d-button>
            <d-button type="danger" round>危险按钮</d-button>
          </template>
        </show-demo>
      </div>
    </div>
    <div class="circle-style">
      <div class="title">
        <h5 class="q-mb-md">圆形图标按钮</h5>
        <p class="text-grey-8">按钮的基础用法</p>
        <show-demo
          githubLink="https://github.com/Joey-Coder/demo-ui/blob/master/packages/button.vue"
          title="拟态按钮"
          :templateCode="circleTemplateCode"
        >
          <template #demo>
            <d-button circle :icon="['far', 'smile']"> </d-button>
            <d-button type="primary" circle :icon="['far', 'edit']"> </d-button>
            <d-button type="success" circle :icon="['fas', 'check']">
            </d-button>
            <d-button type="info" circle :icon="['far', 'envelope']">
            </d-button>
            <d-button type="warning" circle :icon="['far', 'star']"> </d-button>
            <d-button type="danger" circle :icon="['far', 'trash-alt']">
            </d-button>
          </template>
        </show-demo>
      </div>
    </div>
    <div class="disabled-style">
      <div class="title">
        <h5 class="q-mb-md">禁用状态</h5>
        <p class="text-grey-8">按钮的基础用法</p>
        <show-demo
          githubLink="https://github.com/Joey-Coder/demo-ui/blob/master/packages/button.vue"
          title="禁用按钮"
          :templateCode="disabledTemplateCode"
        >
          <template #demo>
            <d-button plain disabled>button</d-button>
            <d-button type="primary" disabled>primary</d-button>
            <d-button type="success" disabled>success</d-button>
            <d-button type="info" disabled>info</d-button>
            <d-button type="warning" disabled>warning</d-button>
            <d-button type="danger" disabled>danger</d-button>
          </template>
        </show-demo>
      </div>
    </div>
    <div class="icon-style">
      <div class="title">
        <h5 class="q-mb-md">文字图标按钮</h5>
        <p class="text-grey-8">按钮的基础用法</p>
        <show-demo
          githubLink="https://github.com/Joey-Coder/demo-ui/blob/master/packages/button.vue"
          title="文字图标按钮"
          :templateCode="iconTemplateCode"
        >
          <template #demo>
            <d-button :icon="['far', 'smile']">button</d-button>
            <d-button type="primary" :icon="['far', 'edit']">primary</d-button>
            <d-button type="success" :icon="['fas', 'check']">success</d-button>
            <d-button type="info" :icon="['far', 'envelope']">info</d-button>
            <d-button type="warning" :icon="['far', 'star']">warning</d-button>
            <d-button type="danger" :icon="['far', 'trash-alt']"
              >danger</d-button
            >
          </template>
        </show-demo>
      </div>
    </div>
    <div class="click-event">
      <div class="title">
        <h5 class="q-mb-md">点击事件</h5>
        <p class="text-grey-8">按钮的基础用法</p>
        <show-demo
          githubLink="https://github.com/Joey-Coder/demo-ui/blob/master/packages/button.vue"
          title="点击事件"
          :templateCode="clickTemplateCode"
          :scriptCode="clickScript"
        >
          <template #demo>
            <d-button type="primary" @click="sayHello">say hello</d-button>
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
    return {
      templateCode: `
      <template>
        <d-button>默认按钮</d-button>
        <d-button type="primary">主要按钮</d-button>
        <d-button type="success">成功按钮</d-button>
        <d-button type="info">信息按钮</d-button>
        <d-button type="warning">警告按钮</d-button>
        <d-button type="danger">危险按钮</d-button>
      </template>
      `,
      plainTemplateCode: `
       <template>
        <d-button>默认按钮</d-button>
        <d-button type="primary" plain>主要按钮</d-button>
        <d-button type="success" plain>成功按钮</d-button>
        <d-button type="info" plain>信息按钮</d-button>
        <d-button type="warning" plain>警告按钮</d-button>
        <d-button type="danger" plain>危险按钮</d-button>
      </template> 
    `,
      MimicryTemplateCode: `
      <template
        <d-button mimicry>默认按钮</d-button>
        <d-button type="primary" mimicry>主要按钮</d-button>
        <d-button type="success" mimicry>成功按钮</d-button>
        <d-button type="info" mimicry>信息按钮</d-button>
        <d-button type="warning" mimicry>警告按钮</d-button>
        <d-button type="danger" mimicry>危险按钮</d-button>
       </template>
    `,
      RoundTemplateCode: `
      <template>
        <d-button round>默认按钮</d-button>
        <d-button type="primary" round>主要按钮</d-button>
        <d-button type="success" round>成功按钮</d-button>
        <d-button type="info" round>信息按钮</d-button>
        <d-button type="warning" round>警告按钮</d-button>
        <d-button type="danger" round>危险按钮</d-button>
      </template>
    `,
      circleTemplateCode: `
      <template>
        <d-button circle :icon="['far', 'smile']"> </d-button>
        <d-button type="primary" circle :icon="['far', 'edit']"> </d-button>
        <d-button type="success" circle :icon="['fas', 'check']">
        </d-button>
        <d-button type="info" circle :icon="['far', 'envelope']">
        </d-button>
        <d-button type="warning" circle :icon="['far', 'star']"> </d-button>
        <d-button type="danger" circle :icon="['far', 'trash-alt']">
        </d-button>
       </template>
    `,
      disabledTemplateCode: `
      <template #demo>
        <d-button plain disabled>button</d-button>
        <d-button type="primary" disabled>primary</d-button>
        <d-button type="success" disabled>success</d-button>
        <d-button type="info" disabled>info</d-button>
        <d-button type="warning" disabled>warning</d-button>
        <d-button type="danger" disabled>danger</d-button>
      </template>
    `,
      iconTemplateCode: `
      <template #demo>
        <d-button :icon="['far', 'smile']">button</d-button>
        <d-button type="primary" :icon="['far', 'edit']">primary</d-button>
        <d-button type="success" :icon="['fas', 'check']">success</d-button>
        <d-button type="info" :icon="['far', 'envelope']">info</d-button>
        <d-button type="warning" :icon="['far', 'star']">warning</d-button>
        <d-button type="danger" :icon="['far', 'trash-alt']">danger</d-button>
      </template>`,
      clickTemplateCode:
        '<d-button type="primary" @click="sayHello">say hello</d-button>',
      clickScript: `
      export default {
          methods: {
              sayHello() {
                  window.alert('hello')
                  }
            }
        }
      `
    }
  },
  methods: {
    sayHello() {
      window.alert('hello')
    }
  },
  components: {},
  props: {},
  created() {},
  mounted() {},
  computed: {},
  watched: {}
}
</script>
<style scoped lang="less"></style>
