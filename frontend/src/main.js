import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

//Common components
import Icon from './components/Icon.vue';

const app = createApp(App).use(store).use(router);

app.component("Icon", Icon);

app.mount("#app");

