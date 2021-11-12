import Vue from 'vue';
import Vuetify, { VSnackbar, VTextField, VIcon } from 'vuetify/lib';
import VuetifyToast from 'vuetify-toast-snackbar-ng';
Vue.use(Vuetify, {
  components: {
    VTextField,
    VSnackbar,
    VIcon,
  },
  options: {
    customProperties: true,
  },
});

Vue.use(VuetifyToast, {
  x: 'middle', // default
  y: 'top', // default
  color: 'info', // default
  icon: 'mdi-information-outline',
  iconColor: '', // default
  classes: ['body-2'],
  timeout: 2000, // default
  dismissable: true, // default
  multiLine: false, // default
  vertical: false, // default
  queueable: false, // default
  showClose: false, // default
  closeText: '', // default
  closeIcon: 'close', // default
  closeColor: '', // default
  slot: [], //default
  shorts: {
    custom: {
      color: 'purple',
    },
  },
  property: '$toast', // default
});

export default new Vuetify({});
