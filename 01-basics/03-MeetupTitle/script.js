import Vue from './vendor/vue.esm.browser.js';

const app = new Vue({
  data() {
    return {
      meetups: [1,2,3,4,5],
      selected: null,
      title: '',
    }
  },

  watch: {
    selected: {
      // deep: true,
      immediate: true,
      handler(newValue) {
        if (newValue > 0) {
          this.getMeetup(newValue);
        }
      },
    }
  },

  methods: {
    getMeetup(id) {
      fetch(`https://course-vue.javascript.ru/api/meetups/${id}`)
      .then(res => res.json())
      .then(data => this.title = data.title);
    }
  },

  template: `#app`,
});

app.$mount('#app');
