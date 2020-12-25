<template>
  <q-page class="flex column q-pa-md">
    <div class="install">
      <h4>安装</h4>
      <Prism language="markup">npm i demot-ui</Prism>
    </div>
    <div class="global-register">
      <h4>全局注册</h4>
      <Prism language="javascript">{{ globalRegisterCode }}</Prism>
    </div>
    <div class="register">
      <h4>按需导入</h4>
      <Prism language="javascript">
        {{ registerCode }}
      </Prism>
    </div>
    <div class="import-css">
      <h4>导入样式</h4>
      <Prism language="javascript">
        {{ importCssCode }}
      </Prism>
    </div>
    <div class="import-fontawesome">
      <h4>导入字体图标</h4>
      <Prism language="javascript">
        {{ importFontCode }}
      </Prism>
    </div>
  </q-page>
</template>

<script>
import Prism from 'vue-prism-component'
export default {
  data() {
    return {
      globalRegisterCode: `
      import DemoUI from 'demot-ui'
      Vue.use(DemoUI)
      `,
      registerCode: `import DemoUI, { Button } from 'demot-ui'
      Vue.use(DemoUI, { components: [Button] }`,
      importCssCode: "import 'demot-ui/dist/demot-ui.css'",
      importFontCode: `
      import { library } from '@fortawesome/fontawesome-svg-core'
      import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
      import {
      faEnvelope,
      faStar,
      faEdit,
      faTrashAlt,
      faSmile,
      faTimesCircle,
      faEye
      } from '@fortawesome/free-regular-svg-icons'
      import { faCheck } from '@fortawesome/free-solid-svg-icons'`
    }
  },
  name: 'PageIndex',
  components: {
    Prism
  }
}
</script>
