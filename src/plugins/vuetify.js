import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    icons: {
        iconfont: 'mdi',
    },
    theme: {
        themes: {
          light: {
            primary_dark: '#24305E',
            primary: '#374785',
            secondary: '#A8D0E6',
            accent: '#F8E9A1',
            accent_red: '#F76C6C',
            bg_light: '#ECEFF1',
            error: '#C62828',
            info: '#2196F3',
            success: '#039BE5',
            warning: '#FF5252',
          },
        },
      }, 
});
