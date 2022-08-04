import { createApp } from 'vue';
import App from './App.vue';
import router from './router/router.js';
import store from './store';
//Common components
import Icon from './components/Icon.vue';
import LbButton from './components/LbButton.vue';
import LbPopupBox from './components/LbPopupBox.vue';
import LbSpinner from './components/LbSpinner.vue';

const app = createApp(App).use(store).use(router);

app.component("Icon", Icon);
app.component("LbButton", LbButton);
app.component("LbPopupBox", LbPopupBox);
app.component("LbSpinner", LbSpinner);

app.mount("#app");

