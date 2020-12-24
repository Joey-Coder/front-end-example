<template>
  <div class="container q-pa-md">
    <div class="title">
      <h4 class="q-mb-md">Checkbox 多选框</h4>
      <p class="text-grey-8">
        一组备选项中进行多选。
      </p>
    </div>
    <div class="basic-style">
      <div class="title">
        <h5 class="q-mb-md">基础用法</h5>
        <p class="text-grey-8">
          单独使用可以表示两种状态之间的切换，写在标签中的内容为 checkbox
          按钮后的介绍。
        </p>
        <show-demo
          :githubLink="githubLink"
          title="基本用法"
          :templateCode="templateCode"
          :scriptCode="scriptCode"
        >
          <template #demo>
            <d-checkbox
              name="read"
              label="1"
              v-model="checkboxChoice"
            ></d-checkbox>
          </template>
        </show-demo>
      </div>
    </div>
    <div class="color-style">
      <div class="title">
        <h5 class="q-mb-md">自定义颜色</h5>
        <p class="text-grey-8">
          自定义复选框颜色。
        </p>
        <show-demo
          :githubLink="githubLink"
          title="自定义颜色"
          :templateCode="colorTemplateCode"
          :scriptCode="colorScriptCode"
        >
          <template #demo>
            <d-checkbox
              name="read"
              label="1"
              v-model="checkboxChoice"
              activeColor="orange"
            ></d-checkbox>
          </template>
        </show-demo>
      </div>
    </div>
    <div class="mimicry-style">
      <div class="title">
        <h5 class="q-mb-md">拟物样式</h5>
        <p class="text-grey-8">
          拟物风格的复选框
        </p>
        <show-demo
          :githubLink="githubLink"
          title="拟物样式"
          :templateCode="mimicryTemplateCode"
          :scriptCode="mimicryScriptCode"
        >
          <template #demo>
            <d-checkbox
              name="read"
              label="1"
              v-model="checkboxChoice"
              mimicry
            ></d-checkbox>
          </template>
        </show-demo>
      </div>
    </div>
    <div class="disabled-style">
      <div class="title">
        <h5 class="q-mb-md">禁用状态</h5>
        <p class="text-grey-8">
          禁止用户操作复选框
        </p>
        <show-demo
          :githubLink="githubLink"
          title="禁用状态"
          :templateCode="disabledTemplateCode"
          :scriptCode="disabledScriptCode"
        >
          <template #demo>
            <d-checkbox
              name="read"
              label="1"
              v-model="checkboxChoice"
              disabled
            ></d-checkbox>
          </template>
        </show-demo>
      </div>
    </div>
    <div class="group-style">
      <div class="title">
        <h5 class="q-mb-md">复选框组</h5>
        <p class="text-grey-8">
          用于包裹多个 checkbox，通过 v-model 指定组内所有的 checkout 的 v-model
        </p>
        <show-demo
          :githubLink="githubLink"
          title="复选框组"
          :templateCode="groupTemplateCode"
          :scriptCode="groupScriptCode"
        >
          <template #demo>
            <d-checkbox-group v-model="checkedArray">
              <d-checkbox name="apple" label="1">苹果</d-checkbox>
              <d-checkbox name="banana" label="2">香蕉</d-checkbox>
              <d-checkbox name="peach" label="3">桃子</d-checkbox>
            </d-checkbox-group>
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
    <div class="group-wrapper">
      <h5 class="q-mb-md">复选框组(CheckoutGroup)</h5>
      <p class="text-grey-8">
        用于包裹多个 checkbox，通过 v-model 指定组内所有的 checkout 的 v-model
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageCheckout',
  data() {
    return {
      githubLink:
        'https://github.com/Joey-Coder/demo-ui/blob/master/packages/checkbox.vue',
      checkboxChoice: false,
      checkedArray: ['1', '3'],
      attributesData: [
        {
          attribute: 'label',
          value: 'String | Number | Boolean',
          desc: '单选框 label 值，默认为空字符串'
        },
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
          attribute: 'color',
          value: 'String',
          desc: '单选框选择时的颜色，默认为#409eff'
        }
      ],
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
      templateCode: `
      <d-checkbox
        name="read"
        label="1"
        v-model="checkboxChoice"
      ></d-checkbox>`,
      scriptCode: `
      export default {
         data () {
             return {
                 checkboxChoice: false
             }
         }
       }`,
      colorTemplateCode: `
      <d-checkbox
        name="read"
        label="1"
        v-model="checkboxChoice"
        activeColor="orange"
      ></d-checkbox>`,
      colorScriptCode: `
      export default {
         data () {
             return {
                 checkboxChoice: false
             }
         }
       }`,
      mimicryTemplateCode: `
      <d-checkbox
        name="read"
        label="1"
        v-model="checkboxChoice"
        mimicry
      ></d-checkbox>`,
      mimicryScriptCode: `
      export default {
         data () {
             return {
                 checkboxChoice: false
             }
         }
       }`,
      disabledTemplateCode: `
       <d-checkbox
         name="read"
         label="1"
         v-model="checkboxChoice"
         disabled
       ></d-checkbox>`,
      disabledScriptCode: `
      export default {
         data () {
             return {
                 checkboxChoice: false
             }
         }
       }`,
      groupTemplateCode: `
      <d-checkbox-group v-model="checkedArray">
        <d-checkbox name="apple" label="1">苹果</d-checkbox>
        <d-checkbox name="banana" label="2">香蕉</d-checkbox>
        <d-checkbox name="peach" label="3">桃子</d-checkbox>
      </d-checkbox-group>`,
      groupScriptCode: `
      export default {
         data () {
             return {
                 checkedArray: ['1', '3'],
             }
         }
       }`
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
