import { createApp } from 'vue';
import {
  Button,
  Picker,
  Field,
  Popup,
  Overlay,
  Icon,
  Uploader,
  Image,
  // Toast
} from 'vant';

import App from './App.vue';
import router from './router';
import store from './store';

const app = createApp(App);

app.use(store);
app.use(router);

app.use(Button);
app.use(Picker);
app.use(Field);
app.use(Popup);
app.use(Overlay);
app.use(Icon);
app.use(Uploader);
app.use(Image);
// app.use(Toast);

app.mount('#app');
