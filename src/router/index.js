import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Modal from '../components/Modal.vue';

const routes = [
  {
    path: '/',
    component: Home,
    children: {
      path: '/patient/:id',
      component: Modal,
      props: true,
      meta:{
        isOpen: true
      }
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
