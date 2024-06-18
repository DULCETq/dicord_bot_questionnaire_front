<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { fetchTasks, createTask, getTaskStatus, updateTaskStatus, deleteTask, assignTask, findExecutor } from '../api/task';
import { Task } from '../types/Task';

export default defineComponent({
  name: 'TaskList',
  setup() {
    const tasks = ref<Task[]>([]);
    const description = ref<string>('');
    const duration = ref<number>(0);
    const taskId = ref<number>(0);
    const status = ref<string>('');
    const updateTaskId = ref<number>(0);
    const newStatus = ref<string>('');
    const deleteTaskId = ref<number>(0);
    const assignTaskId = ref<number>(0);
    const userId = ref<string>('');
    const executorTaskId = ref<number>(0);
    const executor = ref<string>('');

    onMounted(() => {
      fetchTasks().subscribe(
          (response: any) => {
            tasks.value = response.tasks;
            console.log('Fetched tasks:', response.tasks);
          },
          (error: any) => {
            console.error('Failed to fetch tasks:', error);
          }
      );
    });

    const createTaskHandler = () => {
      createTask(description.value, duration.value).subscribe(
          (response: any) => {
            console.log('Created task:', response.taskId);
            // После создания задачи, загружаем обновленный список задач
            fetchTasks().subscribe(
                (response: any) => {
                  tasks.value = response.tasks;
                  console.log('Updated tasks list after creation:', tasks.value);
                },
                (error: any) => {
                  console.error('Failed to fetch tasks after creation:', error);
                }
            );
          },
          (error: any) => {
            console.error('Failed to create task:', error);
          }
      );
    };

    const getTaskStatusHandler = () => {
      getTaskStatus(taskId.value).subscribe(
          (response: any) => {
            status.value = response.status;
          },
          (error: any) => {
            console.error('Failed to get task status:', error);
          }
      );
    };

    const updateTaskStatusHandler = () => {
      updateTaskStatus(updateTaskId.value, newStatus.value).subscribe(
          (response: any) => {
            console.log('Updated task status:', response);
          },
          (error: any) => {
            console.error('Failed to update task status:', error);
          }
      );
    };

    const deleteTaskHandler = () => {
      deleteTask(deleteTaskId.value).subscribe(
          (response: any) => {
            console.log('Deleted task:', response.message);
            // После удаления задачи, загружаем обновленный список задач
            fetchTasks().subscribe(
                (response: any) => {
                  tasks.value = response.tasks;
                  console.log('Updated tasks list after deletion:', tasks.value);
                },
                (error: any) => {
                  console.error('Failed to fetch tasks after deletion:', error);
                }
            );
          },
          (error: any) => {
            console.error('Failed to delete task:', error);
          }
      );
    };

    const assignTaskHandler = () => {
      assignTask(assignTaskId.value, userId.value).subscribe(
          (response: any) => {
            console.log('Assigned task:', response.message);
          },
          (error: any) => {
            console.error('Failed to assign task:', error);
          }
      );
    };

    const findExecutorHandler = () => {
      findExecutor(executorTaskId.value).subscribe(
          (response: any) => {
            executor.value = response.executor;
          },
          (error: any) => {
            console.error('Failed to find executor:', error);
          }
      );
    };

    return {
      tasks,
      description,
      duration,
      taskId,
      status,
      updateTaskId,
      newStatus,
      deleteTaskId,
      assignTaskId,
      userId,
      executorTaskId,
      executor,
      createTaskHandler,
      getTaskStatusHandler,
      updateTaskStatusHandler,
      deleteTaskHandler,
      assignTaskHandler,
      findExecutorHandler,
    };
  },
});
</script>

<template>
  <div class="task-list relative bg-amber-50 border border-slate-100 rounded-3xl p-8 hover:-translate-y-2 hover:shadow-xl transition">
    <ul>
      <li v-for="task in tasks" :key="task.id">ID-{{ task.id }} {{ task.description }} - {{ task.status }} -  {{ task.duration }} мин.</li>
    </ul>

    <div class="task-controls" v-auto-animate>
      <h2>Create Task</h2>
      <input v-model="description" placeholder="Description" />
      <input v-model="duration" type="number" placeholder="Duration" />
      <button @click="createTaskHandler" class="transition">Create Task</button>

      <h2>Update Task Status</h2>
      <input v-model="updateTaskId" type="number" placeholder="Enter task ID" />
      <input v-model="newStatus" placeholder="Enter new status" />
      <button @click="updateTaskStatusHandler" class="transition">Update Task Status</button>

      <h2>Delete Task</h2>
      <input v-model="deleteTaskId" type="number" placeholder="Enter task ID" />
      <button @click="deleteTaskHandler" class="transition">Delete Task</button>

      <h2>Assign Task</h2>
      <input v-model="assignTaskId" type="number" placeholder="Enter task ID" />
      <input v-model="userId" placeholder="Enter user ID" />
      <button @click="assignTaskHandler" class="transition">Assign Task</button>

      <h2>Find Executor</h2>
      <input v-model="executorTaskId" type="number" placeholder="Enter task ID" />
      <button @click="findExecutorHandler" class="transition">Find Executor</button>
      <p v-if="executor">Executor: {{ executor }}</p>
    </div>
  </div>
</template>

<style scoped>
.task-list {
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

.task-controls {
  margin-top: 20px;
}

input {
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
  margin-left: 6px
}

button:hover {
  background-color: #a59c88;
}
</style>
