import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
//Common components
import Icon from './components/Icon.vue';
import LbButton from './components/LbButton.vue';
import LbPopupBox from './components/LbPopupBox.vue';

const app = createApp(App).use(store).use(router);

app.component("Icon", Icon);
app.component("LbButton", LbButton);
app.component("LbPopupBox", LbPopupBox);

app.mount("#app");

