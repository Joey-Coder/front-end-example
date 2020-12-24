<template>
  <div class="container q-pa-md">
    <div class="title">
      <h4 class="q-mb-md">Switch 开关</h4>
      <p class="text-grey-8">
        表示两种相互对立的状态间的切换，多用于触发「开/关」。
      </p>
    </div>
    <div class="basic-style">
      <div class="title">
        <h5 class="q-mb-md">基本用法</h5>
        <p class="text-grey-8">
          状态切换
        </p>
        <show-demo
          :githubLink="githubLink"
          title="基本用法"
          :templateCode="templateCode"
        >
          <template #demo>
            <d-switch v-model="switchActive"></d-switch>
          </template>
        </show-demo>
      </div>
    </div>
    <div class="color-style">
      <div class="title">
        <h5 class="q-mb-md">自定义颜色</h5>
        <p class="text-grey-8">
          可自定义开关的颜色样式
        </p>
        <show-demo
          :githubLink="githubLink"
          title="自定义颜色"
          :templateCode="colorTemplateCode"
        >
          <template #demo>
            <d-switch
              v-model="switchActive"
              activeColor="skyblue"
              inactiveColor="orange"
              name="paied"
            ></d-switch>
          </template>
        </show-demo>
      </div>
    </div>
    <div class="disabled-style">
      <div class="title">
        <h5 class="q-mb-md">禁用开关</h5>
        <p class="text-grey-8">
          禁止切换开关
        </p>
        <show-demo
          :githubLink="githubLink"
          title="禁用开关"
          :templateCode="disabledTemplateCode"
        >
          <template #demo>
            <d-switch v-model="switchActive" disabled></d-switch>
          </template>
        </show-demo>
      </div>
    </div>
    <div class="mimicry-style">
      <div class="title">
        <h5 class="q-mb-md">拟态开关</h5>
        <p class="text-grey-8">
          拟态风格开关
        </p>
        <show-demo
          :githubLink="githubLink"
          title="拟态开关"
          :templateCode="mimicryTemplateCode"
        >
          <template #demo>
            <d-switch v-model="switchActive" mimicry></d-switch>
          </template>
        </show-demo>
      </div>
    </div>
    <div class="click-event">
      <div class="title">
        <h5 class="q-mb-md">切换事件</h5>
        <p class="text-grey-8">
          绑定开关切换事件
        </p>
        <show-demo
          :githubLink="githubLink"
          title="切换事件"
          :templateCode="clickEventCode"
          :scriptCode="clickScript"
        >
          <template #demo>
            <d-switch
              v-model="switchActive"
              activeColor="skyblue"
              @change="handleChange"
            ></d-switch>
          </template>
        </show-demo>
      </div>
    </div>
    <div class="attributes-wraper">
      <h5 class="q-mb-md">Attributes</h5>
      <q-table
        :data="attributesData"
        :columns="attributesColumns"
        row-key="name"
        hide-bottom
      ></q-table>
    </div>
    <div class="event-wraper">
      <h5 class="q-mb-md">Events</h5>
      <q-table
        :data="eventsData"
        :columns="eventsColumns"
        row-key="name"
        hide-bottom
      ></q-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageSwitch',
  data() {
    return {
      githubLink:
        'https://github.com/Joey-Coder/demo-ui/blob/master/packages/switch.vue',
      switchActive: false,
      templateCode: '<d-switch v-model="switchActive"></d-switch>',
      colorTemplateCode: `
      <d-switch
        v-model="switchActive"
        activeColor="skyblue"
        inactiveColor="orange"
        name="paied">
      </d-switch>`,
      disabledTemplateCode:
        '<d-switch v-model="switchActive" disabled></d-switch>',
      mimicryTemplateCode:
        '<d-switch v-model="switchActive" mimicry></d-switch>',
      clickEventCode: `
        <d-switch
          v-model="switchActive"
          activeColor="skyblue"
          @change="handleChange">
        </d-switch>`,
      clickScript: `
        export default {
            data () {
                return {
                    switchActive: false,
                }
            }
            methods: {
                handleChange(value) {
                    alert(\`change switch to \${value}\`)
                }
            }
        }`,
      attributesColumns: [
        {
          name: '属性',
          required: true,
          align: 'left',
          field: 'attribute',
          label: '属性'
        },
        {
          name: '值',
          required: true,
          align: 'left',
          field: 'value',
          label: '值'
        },
        {
          name: '描述',
          required: true,
          align: 'left',
          field: 'desc',
          label: '描述'
        }
      ],
      attributesData: [
        {
          attribute: 'mimicry',
          value: 'Boolean',
          desc: '对话框是否为拟态风格，默认为 false'
        },
        {
          attribute: 'name',
          value: 'String',
          desc: '表单命名，默认为空'
        },
        {
          attribute: 'value',
          value: 'String',
          desc: '表单值，默认为空字符串'
        },
        {
          attribute: 'disabled',
          value: 'Boolean',
          desc: '是否禁用，默认为false'
        },
        {
          attribute: 'activeColor',
          value: 'String',
          desc: '激活状态颜色，默认为#dcdfe6'
        },
        {
          attribute: 'inactiveColor',
          value: 'String',
          desc: '未激化状态颜色，默认为#dcdfe6'
        }
      ],
      eventsColumns: [
        {
          name: '事件',
          required: true,
          align: 'left',
          field: 'attribute',
          label: '属性'
        },
        {
          name: '值',
          required: true,
          align: 'left',
          field: 'value',
          label: '值'
        },
        {
          name: '描述',
          required: true,
          align: 'left',
          field: 'desc',
          label: '描述'
        }
      ],
      eventsData: [
        {
          attribute: 'change',
          value: 'Function',
          desc: '状态修改触发事件，返回修改后的状态'
        }
      ]
    }
  },
  methods: {
    handleChange(value) {
      alert(`change switch to ${value}`)
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
