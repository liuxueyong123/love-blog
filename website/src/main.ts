import { createApp } from 'vue';
import {
  Button,
  Picker,
  Field,
  Popup,
  Overlay,
  // Toast
} from 'vant';

import App from './App.vue';
import router from './router';
import store from './store';
import axios from './middleware/axios';

const app = createApp(App);

app.use(store);
app.use(router);

app.use(Button);
app.use(Picker);
app.use(Field);
app.use(Popup);
app.use(Overlay);
// app.use(Toast);

app.config.globalProperties.$axios = axios;

app.mount('#app');
