<template>
  <div class="container q-pa-md">
    <div class="title">
      <h4 class="q-mb-md">Radio 单选框</h4>
      <p class="text-grey-8">
        在一组备选项中进行单选。
      </p>
    </div>
    <div class="basic-style">
      <div class="title">
        <h5 class="q-mb-md">基础用法</h5>
        <p class="text-grey-8">
          由于选项默认可见，不宜过多，若选项过多，建议使用 Select 选择器。
        </p>
        <show-demo
          githubLink="https://github.com/Joey-Coder/demo-ui/blob/master/packages/button.vue"
          title="基本用法"
          :templateCode="templateCode"
          :scriptCode="scriptCode"
        >
          <template #demo>
            <d-radio label="1" v-model="gender" name="male">男</d-radio>
            <d-radio label="2" v-model="gender" name="female">女</d-radio>
          </template>
        </show-demo>
      </div>
    </div>
    <div class="color-style">
      <div class="title">
        <h5 class="q-mb-md">自定义颜色</h5>
        <p class="text-grey-8">
          自定义单选框被选中颜色
        </p>
        <show-demo
          githubLink="https://github.com/Joey-Coder/demo-ui/blob/master/packages/button.vue"
          title="自定义颜色"
          :templateCode="colorTemplateCode"
          :scriptCode="colorScriptCode"
        >
          <template #demo>
            <d-radio label="1" v-model="gender" name="male" color="green"
              >男</d-radio
            >
            <d-radio label="2" v-model="gender" name="female" color="pink"
              >女</d-radio
            >
          </template>
        </show-demo>
      </div>
    </div>
    <div class="mimicry-style">
      <div class="title">
        <h5 class="q-mb-md">拟态样式</h5>
        <p class="text-grey-8">
          拟态风格的单选框
        </p>
        <show-demo
          githubLink="https://github.com/Joey-Coder/demo-ui/blob/master/packages/button.vue"
          title="拟态样式"
          :templateCode="mimicryTemplateCode"
          :scriptCode="mimicryScriptCode"
        >
          <template #demo>
            <d-radio label="1" v-model="gender" name="male" mimicry>男</d-radio>
            <d-radio label="2" v-model="gender" name="female" mimicry
              >女</d-radio
            >
          </template>
        </show-demo>
      </div>
    </div>
    <div class="group-style">
      <div class="title">
        <h5 class="q-mb-md">Radio组</h5>
        <p class="text-grey-8"></p>
        <show-demo
          githubLink="https://github.com/Joey-Coder/demo-ui/blob/master/packages/button.vue"
          title="Radio组"
          :templateCode="groupTemplateCode"
          :scriptCode="groupScriptCode"
        >
          <template #demo>
            <d-radio-group v-model="gender">
              <d-radio label="1" name="male">男</d-radio>
              <d-radio label="2" name="female">女</d-radio>
            </d-radio-group>
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
      <h5 class="q-mb-md">单选框组(RadioGroup)</h5>
      <p class="text-grey-8">用于包裹 radio，通过 v-model 指定组内所有的 radio 的 v-model</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageRadio',
  data() {
    return {
      gender: '1',
      templateCode: `
      <d-radio label="1" v-model="gender" name="male">男</d-radio>
      <d-radio label="2" v-model="gender" name="female">女</d-radio>`,
      scriptCode: `
      export default {
         data () {
             return {
                 gender: '1'
             }
         }
       }`,
      colorTemplateCode: `
      <d-radio label="1" v-model="gender" name="male" color="green">男</d-radio>
      <d-radio label="2" v-model="gender" name="female" color="pink">女</d-radio>`,
      colorScriptCode: `
      export default {
         data () {
             return {
                 gender: '1'
             }
         }
       }`,
      mimicryTemplateCode: `
      <d-radio label="1" v-model="gender" name="male" mimicry>男</d-radio>
      <d-radio label="2" v-model="gender" name="female" mimicry>女</d-radio>`,
      mimicryScriptCode: `
      export default {
         data () {
             return {
                 gender: '1'
             }
         }
       }`,
      groupTemplateCode: `
      <d-radio-group v-model="gender">
        <d-radio label="1" name="male">男</d-radio>
        <d-radio label="2" name="female">女</d-radio>
      </d-radio-group>`,
      groupScriptCode: `
      export default {
         data () {
             return {
                 gender: '1'
             }
         }
       }`,
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
