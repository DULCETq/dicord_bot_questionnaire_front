import { createApp } from 'vue';
import { createI18n } from 'vue-i18n';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import App from './App.vue';
import TaskList from './components/TaskList.vue';
import SurveyList from './components/SurveyList.vue';
import BotControl from './components/BotControl.vue';
import en from '../locales/en.json';
import ru from '../locales/ru.json';
import './style.css'

const routes: Array<RouteRecordRaw> = [
  { path: '/', component: TaskList },
  { path: '/surveys', component: SurveyList },
  { path: '/bot-control', component: BotControl },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'ru',
  messages: { en, ru },
});

createApp(App).use(router).use(i18n).mount('#app');
