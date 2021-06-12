<template>
  <meetups-view
    :view.sync="query.view"
    :date.sync="query.date"
    :participation.sync="query.participation"
    :search.sync="query.search"
  />
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
      query: {
        view: 'list',
        date: 'all',
        participation: 'all',
        search: '',
      },
    };
  },

  watch: {
    '$route.query': {
      deep: true,
      immediate: true,
      handler(newVal) {
        if (Object.keys(newVal).length) {
          if (newVal.view) this.query.view = newVal.view;
          if (newVal.date) this.query.date = newVal.date;
          if (newVal.participation) this.query.participation = newVal.participation;
          if (newVal.search) this.query.search = newVal.search;
        }
      },
    },

    query: {
      deep: true,
      immediate: true,
      handler(newVal) {
        const q = {};
        if (newVal.view !== 'list') q.view = newVal.view;
        if (newVal.date !== 'all') q.date = newVal.date;
        if (newVal.participation !== 'all') q.participation = newVal.participation;
        if (newVal.search) q.search = newVal.search;
        this.routeUpdate(q);
      },
    },
  },

  methods: {
    routeUpdate(query) {
      this.$router.push({ query: query }).catch((err) => {
        if (!isNavigationFailure(err, NavigationFailureType.duplicated)) {
          throw err;
        }
      });
    },
  },
};
</script>
