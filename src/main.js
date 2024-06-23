import { createApp } from 'vue'
// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

import App from './App.vue'

const vuetify = createVuetify({
	components,
	directives,
	theme: {
		defaultTheme: 'dark'
	  },
	icons: {
		defaultSet: 'mdi',
		aliases,
		sets: {
			mdi,
		},
	},
  })
  
  
createApp(App).use(vuetify).mount('#app')