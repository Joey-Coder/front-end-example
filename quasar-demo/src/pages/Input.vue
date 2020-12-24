<template>
  <div class="container q-pa-md">
    <div class="title">
      <h4 class="q-mb-md">Input 输入框</h4>
      <p class="text-grey-8">
        通过鼠标或键盘输入字符。
      </p>
    </div>
    <div class="basic-style">
      <div class="title">
        <h5 class="q-mb-md">基本用法</h5>
        <p class="text-grey-8">
          基础输入框
        </p>
        <show-demo
          githubLink="https://github.com/Joey-Coder/demo-ui/blob/master/packages/button.vue"
          title="基本用法"
          :templateCode="templateCode"
        >
          <template #demo>
            <d-input placeholder="请输入内容"></d-input>
          </template>
        </show-demo>
      </div>
    </div>
    <div class="textarea-style">
      <div class="title">
        <h5 class="q-mb-md">文本域输入框</h5>
        <p class="text-grey-8">
          允许用户输入大量文字内容。
        </p>
        <show-demo
          githubLink="https://github.com/Joey-Coder/demo-ui/blob/master/packages/button.vue"
          title="文本域输入框"
          :templateCode="textareaTemplateCode"
        >
          <template #demo>
            <d-input placeholder="写点什么" type="textarea"></d-input>
          </template>
        </show-demo>
      </div>
    </div>
    <div class="disabled-style">
      <div class="title">
        <h5 class="q-mb-md">禁用输入框</h5>
        <p class="text-grey-8">
          禁止用户输入。
        </p>
        <show-demo
          githubLink="https://github.com/Joey-Coder/demo-ui/blob/master/packages/button.vue"
          title="禁用状态"
          :templateCode="disabledTemplateCode"
        >
          <template #demo>
            <d-input placeholder="请输入内容" disabled></d-input>
          </template>
        </show-demo>
      </div>
    </div>
    <div class="clearable-style">
      <div class="title">
        <h5 class="q-mb-md">可清除输入框</h5>
        <p class="text-grey-8">
          提供清除按钮，方便用户重新输入
        </p>
        <show-demo
          githubLink="https://github.com/Joey-Coder/demo-ui/blob/master/packages/button.vue"
          title="可清除输入框"
          :templateCode="clearableTemplateCode"
          :scriptCode="clearableScript"
        >
          <template #demo>
            <d-input
              placeholder="请输入内容"
              type="text"
              name="username"
              v-model="username"
              clearable
            ></d-input>
          </template>
        </show-demo>
      </div>
    </div>
    <div class="password-style">
      <div class="title">
        <h5 class="q-mb-md">密码输入框</h5>
        <p class="text-grey-8">
          方便切换密码可见状态
        </p>
        <show-demo
          githubLink="https://github.com/Joey-Coder/demo-ui/blob/master/packages/button.vue"
          title="密码输入框"
          :templateCode="passwordTemplateCode"
          :scriptCode="passwordScript"
        >
          <template #demo>
            <d-input
              placeholder="请输入内容"
              type="password"
              name="password"
              v-model="password"
              show-password
            ></d-input>
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
  </div>
</template>

<script>
export default {
  name: 'PageInput',
  data() {
    return {
      username: 'Joey',
      password: '123456',
      templateCode: '<d-input placeholder="请输入内容"></d-input>',
      textareaTemplateCode:
        '<d-input placeholder="写点什么" type="textarea"></d-input>',
      disabledTemplateCode:
        '<d-input placeholder="请输入内容" disabled></d-input>',
      clearableTemplateCode: `
        <d-input
          placeholder="请输入内容"
          type="text"
          name="username"
          v-model="username"
          clearable
        ></d-input>`,
      clearableScript: `
        export default {
            data(){
                return {
                    username: 'Joey'
                }
            }
        }`,
      passwordTemplateCode: `
        <d-input
          placeholder="请输入内容"
          type="password"
          name="password"
          v-model="password"
          show-password
        ></d-input>`,
      passwordScript: `
      export default {
        data () {
            return {
                password: '123456'
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
          attribute: 'placeholder',
          value: 'String',
          desc: '占位符，默认为空字符串'
        },
        {
          attribute: 'type',
          value: 'String',
          desc: '表单类型，默认为"text"'
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
          desc: '是否禁用，默认为 false'
        },
        {
          attribute: 'clearable',
          value: 'Boolean',
          desc: '是否可清空，默认为 false'
        },
        {
          attribute: 'showPassword',
          value: 'Boolean',
          desc: '是否显示密码可见，默认为 false'
        }
      ]
    }
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
