import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/applications/',
    component: () => import(/* webpackChunkName: "applications" */ '@/views/Applications/index.vue'),
    props: true,
    children: [
      {
        path: 'application',
        name: 'application',
        component: () => import(/* webpackChunkName: "application" */ '@/views/Applications/underConstruction.vue'),
      },
      {
        path: 'documents',
        name: 'documents',
        component: () => import(/* webpackChunkName: "documents" */ '@/views/Applications/documents.vue'),
      },
      {
        path: 'filogix',
        name: 'filogix',
        component: () => import(/* webpackChunkName: "filogix" */ '@/views/Applications/underConstruction.vue'),
      },
      {
        path: 'directToLender',
        name: 'directToLender',
        component: () => import(/* webpackChunkName: "directToLender" */ '@/views/Applications/underConstruction.vue'),
      },
      {
        path: '',
        redirect: { name: 'documents' },
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
