<template>
  <div class="container q-pa-md">
    <div class="title">
      <h4 class="q-mb-md">表单项 Form-item</h4>
      <p class="text-grey-8">
        由输入框、选择器、单选框、多选框等控件组成，用以收集、校验、提交数据
      </p>
    </div>
    <div class="basic-style">
      <div class="title">
        <h5 class="q-mb-md">基础用法</h5>
        <p class="text-grey-8">
          包括各种表单项，比如输入框、选择器、开关、单选框、多选框等。
        </p>
        <show-demo
          githubLink="https://github.com/Joey-Coder/demo-ui/blob/master/packages/form-item.vue"
          title="基本用法"
          :templateCode="templateCode"
          :scriptCode="scriptCode"
        >
          <template #demo>
            <d-form :model="form" label-width="80px">
              <d-form-item label="用户名">
                <d-input name="username" v-model="form.name"></d-input>
              </d-form-item>
              <d-form-item label="邮箱">
                <d-input name="email" v-model="form.email"></d-input>
              </d-form-item>
            </d-form>
          </template>
        </show-demo>
      </div>
    </div>
    <div class="attributes-wraper">
      <h5 class="q-mb-md">FormItem Attributes</h5>
      <q-table
        :data="attributesData"
        :columns="attributesColumns"
        row-key="name"
        hide-bottom
      ></q-table>
    </div>
    <div class="attributes-form-wraper">
      <h5 class="q-mb-md">Form Attributes</h5>
      <q-table
        :data="formAttributesData"
        :columns="attributesColumns"
        row-key="name"
        hide-bottom
      ></q-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageForm',
  data() {
    return {
      form: {
        name: 'Joey',
        email: 'Joey@mail.com',
        labelwidth: '80px'
      },
      templateCode: `
      <d-form :model="form" label-width="80px">
        <d-form-item label="用户名">
          <d-input name="username" v-model="form.name"></d-input>
        </d-form-item>
        <d-form-item label="邮箱">
          <d-input name="email" v-model="form.email"></d-input>
        </d-form-item>
      </d-form>`,
      scriptCode: `
      export default {
        data () {
            return {
                form: {
                  name: 'Joey',
                  email: 'Joey@mail.com',
                  labelwidth: '80px'
                }
            }
        }
      }`,
      attributesData: [
        {
          attribute: 'label',
          value: 'String',
          desc: '单选框 label 值，默认为空字符串'
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
      formAttributesData: [
        { attribute: 'model', value: 'Object', desc: '表单对象，必填' },
        {
          attribute: 'label-width',
          value: 'String',
          desc: '标签宽度，默认"80px"'
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
