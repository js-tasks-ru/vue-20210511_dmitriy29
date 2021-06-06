import VueRouter from 'vue-router';
import BasePage from '../views/BasePage';
import PageA from '../views/PageA';
import PageB from '../views/PageB';

const router = new VueRouter({
  mode: 'history',
  base: '04-spa/01-ContentTabs',
  // linkActiveClass: 'content-tabs__tab_active',
  routes: [
    {
      path: '/',
      component: BasePage,
      props: true,
      children: [
        {
          path: 'a',
          props: true,
          component: PageA,
        },
        {
          path: 'b',
          name: 'b',
          props: true,
          component: PageB,
        },
      ],
    },
  ],
});

export default router;
