import { createApp } from 'vue'
import PrimeVue from 'primevue/config';
import './style.css'
import App from './App.vue'
import 'primevue/resources/themes/aura-light-green/theme.css'
import Calendar from 'primevue/calendar';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
const app = createApp(App)
console.log(import.meta.env.VITE_APP_BACKEND_URL)
app.use(PrimeVue);
app.mount('#app')
app.component('InputText',InputText);
app.component('CalendarDate', Calendar);
app.component('DropdownBar', Dropdown);