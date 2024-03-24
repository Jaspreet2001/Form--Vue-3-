import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import './style.css'
import App from './App.vue'
import 'primevue/resources/themes/aura-light-green/theme.css'
import VueTelInput from 'vue-tel-input';
import 'vue-tel-input/vue-tel-input.css';
import Calendar from 'primevue/calendar'
import "primeicons/primeicons.css";
import InputText from 'primevue/inputtext'
import Checkbox from 'primevue/checkbox'
import Button from 'primevue/button'
import Dropdown from 'primevue/dropdown'
import InlineMessage from 'primevue/inlinemessage'
import router from "./routes/index";

import 'vue3-tel-input/dist/vue3-tel-input.css'
const app = createApp(App)

app.use(PrimeVue)
app.component('InputText', InputText)
app.component('CalendarDate', Calendar)
app.component('DropdownBar', Dropdown)
app.component('InlineMessage', InlineMessage)
app.component('CheckboxDiv', Checkbox)
app.component('ButtonDiv', Button)
app.use(VueTelInput);
app.use(router);
app.mount('#app')
