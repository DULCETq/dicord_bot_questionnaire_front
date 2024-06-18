import { createI18n } from 'vue-i18n';

const messages = {
  en: {
    welcome: 'Welcome',
    taskCreated: 'Task created with ID: {id}',
    failedToCreateTask: 'Failed to create task',
  },
};

const i18n = createI18n({ locale: 'en', messages });

export default i18n;