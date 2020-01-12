import './registerServiceWorker';
import 'vue-material-design-icons/styles.css';

const VueLoader = () => import('vue');

const AppLoader = () => import('./App.vue');


VueLoader().then(async ({ default: VueClass }) => {
  const Vue = VueClass;
  const { default: App } = await AppLoader();

  Vue.config.productionTip = false;

  new Vue({
    render: h => h(App),
  }).$mount('#app');
});
