<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { fetchSurveys, createSurvey, getSurveyStatus, deleteSurvey } from '../api/survey';
import { Survey } from '../types/Survey';

export default defineComponent({
  name: 'SurveyList',
  setup() {
    const surveys = ref<Survey[]>([]);
    const title = ref<string>('');
    const questions = ref<string>('');
    const surveyId = ref<number>(0);
    const status = ref<string>('');
    const deleteSurveyId = ref<number>(0);

    onMounted(() => {
      fetchSurveys().subscribe(
          (response: any) => {
            surveys.value = response;
            console.log('Fetched surveys:', surveys.value);
          },
          (error: any) => {
            console.error('Failed to fetch surveys:', error);
          }
      );
    });

    const createSurveyHandler = () => {
      const questionList = questions.value.split(',').map(q => q.trim());
      createSurvey(title.value, questionList).subscribe(
          (response: any) => {
            console.log('Created survey:', response.surveyId);
            fetchSurveys().subscribe(
                (response: any) => {
                  surveys.value = response;
                  console.log('Updated surveys list after creation:', surveys.value);
                },
                (error: any) => {
                  console.error('Failed to fetch surveys after creation:', error);
                }
            );
          },
          (error: any) => {
            console.error('Failed to create survey:', error);
          }
      );
    };

    const getSurveyStatusHandler = () => {
      getSurveyStatus(surveyId.value).subscribe(
          (response: any) => {
            status.value = response.status;
          },
          (error: any) => {
            console.error('Failed to get survey status:', error);
          }
      );
    };

    const deleteSurveyHandler = () => {
      deleteSurvey(deleteSurveyId.value).subscribe(
          (response: any) => {
            console.log('Deleted survey:', response.message);
            // После удаления опроса, если требуется, можно загрузить обновленный список
            fetchSurveys().subscribe(
                (response: any) => {
                  surveys.value = response;
                  console.log('Updated surveys list after deletion:', surveys.value);
                },
                (error: any) => {
                  console.error('Failed to fetch surveys after deletion:', error);
                }
            );
          },
          (error: any) => {
            console.error('Failed to delete survey:', error);
          }
      );
    };

    return {
      surveys,
      title,
      questions,
      surveyId,
      status,
      deleteSurveyId,
      createSurveyHandler,
      getSurveyStatusHandler,
      deleteSurveyHandler,
    };
  },
});
</script>

<template>
  <div class="survey-list task-list relative bg-amber-50 border border-slate-100 rounded-3xl p-8 hover:-translate-y-2 hover:shadow-xl transition">
    <ul>
      <li v-for="survey in surveys" :key="survey.id">{{ survey.title }} - {{ survey.questions }}</li>
    </ul>

    <div class="survey-controls">
      <h2>Create Survey</h2>
      <input v-model="title" placeholder="Title" />
      <textarea v-model="questions" placeholder="Questions (comma separated)"></textarea>
      <button @click="createSurveyHandler" class="transition">Create Survey</button>

      <h2>Get Survey Status</h2>
      <input v-model="surveyId" type="number" placeholder="Enter survey ID" />
      <button @click="getSurveyStatusHandler" class="transition">Get Survey Status</button>
      <p v-if="status">Status: {{ status }}</p>

      <h2>Delete Survey</h2>
      <input v-model="deleteSurveyId" type="number" placeholder="Enter survey ID" />
      <button @click="deleteSurveyHandler" class="transition">Delete Survey</button>
    </div>
  </div>
</template>

<style scoped>
.survey-list {
  max-width: 600px;
  margin: auto;
}

ul {
  list-style-type: none;
  padding: 0;
  padding-top: 6px;
}

li {
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

.survey-controls {
  margin-top: 20px;
}

input, textarea {
  padding: 10px;
  margin: 5px;
  width: 80%;
  max-width: 300px;
  border-radius: 6px;
}

button {
  padding: 10px 20px;
  cursor: pointer;
  background-color: rgb(154, 161, 174);
  border-radius: 6px;
  margin-left: 6px;
}

button:hover {
  background-color: #a59c88;
}
</style>
