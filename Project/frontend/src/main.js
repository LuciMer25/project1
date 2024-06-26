import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// import store from './store.js'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import '@fortawesome/fontawesome-free/css/all.min.css';
import "startbootstrap-sb-admin/dist/css/styles.css"
import "simple-datatables/dist/style.css"

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'



const vuetify = createVuetify({
  components,
  directives,
})


createApp(App)
.use(router)
// .use(store)
.use(vuetify)
.mount('#app')



