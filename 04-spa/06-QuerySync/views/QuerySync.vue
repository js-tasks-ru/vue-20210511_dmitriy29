<template>
  <meetups-view :view.sync="view" :date.sync="date" :participation.sync="participation" :search.sync="search" />
</template>

<script>
import MeetupsView from '../components/MeetupsView';
import VueRouter from 'vue-router';
const { isNavigationFailure, NavigationFailureType } = VueRouter;

export default {
  name: 'QuerySync',

  components: { MeetupsView },

  data() {
    return {
      view: 'list',
      date: 'all',
      participation: 'all',
      search: '',
    };
  },

  watch: {
    '$route.query': {
      deep: true,
      immediate: true,
      handler(newVal) {
        if (Object.keys(newVal).length) {
          if (newVal.view) this.view = newVal.view;
          if (newVal.date) this.date = newVal.date;
          if (newVal.participation) this.participation = newVal.participation;
          if (newVal.search) this.search = newVal.search;
        }
      },
    },

    $data: {
      deep: true,
      immediate: true,
      handler(newVal) {
        const q = {};
        if (newVal.view !== 'list') q.view = newVal.view;
        if (newVal.date !== 'all') q.date = newVal.date;
        if (newVal.participation !== 'all') q.participation = newVal.participation;
        if (newVal.search) q.search = newVal.search;
        this.routeUpdate(q);
        // if (Object.keys(q).length) {
        //   this.routeUpdate(q);
        // }
      },
    },
  },

  methods: {
    routeUpdate(query) {
      this.$router.push({ path: '/', query: query }).catch((err) => {
        if (!isNavigationFailure(err, NavigationFailureType.duplicated)) {
          throw err;
        }
      });
    },
  },
};
</script>
