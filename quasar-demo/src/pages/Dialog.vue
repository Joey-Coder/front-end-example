<template>
  <div class="container q-pa-md">
    <div class="title">
      <h4 class="q-mb-md">Dialog 对话框</h4>
      <p class="text-grey-8">
        在保留当前页面状态的情况下，告知用户并承载相关操作。
      </p>
    </div>
    <div class="basic-style">
      <div class="title">
        <h5 class="q-mb-md">基本用法</h5>
        <p class="text-grey-8">
          Dialog 弹出一个对话框，适合需要定制性更大的场景。
        </p>
        <show-demo
          githubLink="https://github.com/Joey-Coder/demo-ui/blob/master/packages/button.vue"
          title="基本用法"
          :templateCode="templateCode"
          :scriptCode="scriptCode"
        >
          <template #demo>
            <d-button type="primary" @click="dialogVisiable = true"
              >显示对话框</d-button
            >
            <d-dialog
              title="tip"
              width="40%"
              top="200px"
              :visiable.sync="dialogVisiable"
            >
              <template v-slot:title>
                <span>提示</span>
              </template>
              <span>这是一段信息</span>
              <template v-slot:footer>
                <d-button @click="dialogVisiable = false">取消</d-button>
                <d-button type="primary" @click="dialogVisiable = false"
                  >确定</d-button
                >
              </template>
            </d-dialog>
          </template>
        </show-demo>
      </div>
    </div>
    <div class="custom-style">
      <div class="title">
        <h5 class="q-mb-md">自定义内容</h5>
        <p class="text-grey-8">
          Dialog 组件的内容可以是任意的，甚至可以是表格或表单，下面是应用了Table
          和 Form 组件的两个样例。
        </p>
        <show-demo
          githubLink="https://github.com/Joey-Coder/demo-ui/blob/master/packages/button.vue"
          title="自定义内容"
          :templateCode="templateCode"
          :scriptCode="scriptCode"
        >
          <template #demo>
            <d-button type="primary" @click="CustomdialogVisiable = true"
              >显示对话框</d-button
            >
            <d-dialog
              title="tip"
              width="40%"
              top="200px"
              :visiable.sync="CustomdialogVisiable"
            >
              <template v-slot:title>
                <span>表格</span>
              </template>
              <template>
                <div class="q-pa-md">
                  <q-table
                    title="Treats"
                    :data="data"
                    :columns="columns"
                    row-key="name"
                    hide-bottom
                  />
                </div>
              </template>
              <template v-slot:footer>
                <d-button @click="CustomdialogVisiable = false">取消</d-button>
                <d-button type="primary" @click="CustomdialogVisiable = false"
                  >确定</d-button
                >
              </template>
            </d-dialog>
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
    <div class="slot-wraper">
      <h5 class="q-mb-md">slot</h5>
      <q-table
        :data="slotData"
        :columns="slotColumns"
        row-key="name"
        hide-bottom
      ></q-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageDialog',
  data() {
    return {
      dialogVisiable: false,
      CustomdialogVisiable: false,
      columns: [
        {
          name: 'name',
          required: true,
          label: 'Dessert (100g serving)',
          align: 'left',
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: 'calories',
          align: 'center',
          label: 'Calories',
          field: 'calories',
          sortable: true
        },
        { name: 'fat', label: 'Fat (g)', field: 'fat', sortable: true },
        { name: 'carbs', label: 'Carbs (g)', field: 'carbs' },
        { name: 'protein', label: 'Protein (g)', field: 'protein' },
        { name: 'sodium', label: 'Sodium (mg)', field: 'sodium' },
        {
          name: 'calcium',
          label: 'Calcium (%)',
          field: 'calcium',
          sortable: true,
          sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)
        },
        {
          name: 'iron',
          label: 'Iron (%)',
          field: 'iron',
          sortable: true,
          sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)
        }
      ],
      data: [
        {
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          sodium: 87,
          calcium: '14%',
          iron: '1%'
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          sodium: 129,
          calcium: '8%',
          iron: '1%'
        },
        {
          name: 'Eclair',
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          sodium: 337,
          calcium: '6%',
          iron: '7%'
        },
        {
          name: 'Cupcake',
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          sodium: 413,
          calcium: '3%',
          iron: '8%'
        },
        {
          name: 'Gingerbread',
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          sodium: 327,
          calcium: '7%',
          iron: '16%'
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
      attributesData: [
        {
          attribute: 'title',
          value: 'String',
          desc: '对话框头部提示，默认为"提示"'
        },
        {
          attribute: 'visiable',
          value: 'Boolean',
          desc: '对话框可见状态，默认为 false'
        },
        {
          attribute: 'mimicry',
          value: 'Boolean',
          desc: '对话框是否为拟态风格，默认为 false'
        }
        //   {
        //       attribute: 'String'
        //   }
      ],
      slotColumns: [
        {
          name: 'slot',
          required: true,
          align: 'left',
          label: '插槽',
          field: 'slot'
        },
        {
          name: 'desc',
          required: true,
          align: 'left',
          label: '描述',
          field: 'desc'
        }
      ],
      slotData: [
        { slot: 'title', desc: 'Dialog 标题区的内容' },
        { slot: 'footer', desc: 'Dialog 按钮操作区的内容' }
      ],
      templateCode: `
      <template #demo>
        <d-button type="primary" @click="dialogVisiable = true"
          >显示对话框</d-button
        >
        <d-dialog
          title="tip"
          width="40%"
          top="200px"
          :visiable.sync="dialogVisiable"
        >
          <template v-slot:title>
            <span>提示</span>
          </template>
          <span>这是一段信息</span>
          <template v-slot:footer>
            <d-button @click="dialogVisiable = false">取消</d-button>
            <d-button type="primary" @click="dialogVisiable = false"
              >确定</d-button
            >
          </template>
        </d-dialog>
      </template>`,
      scriptCode: `
      export default {
          data() {
              return {
                 dialogVisiable: false,
               }
          }
      }
      `
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
