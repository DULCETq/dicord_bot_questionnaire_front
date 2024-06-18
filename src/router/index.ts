import { createRouter, createWebHistory } from 'vue-router';
import TaskList from '../components/TaskList.vue';
import SurveyList from '../components/SurveyList.vue';
import BotControl from '../components/BotControl.vue';

const routes = [
  { path: '/', component: TaskList },
  { path: '/surveys', component: SurveyList },
  { path: '/bot-control', component: BotControl },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
