<script lang="ts">
import { defineComponent, ref } from 'vue';
import { sendCommand, sendMessage } from '../api/bot';

export default defineComponent({
  name: 'BotControl',
  setup() {
    const command = ref<string>('');
    const channelId = ref<string>('');
    const message = ref<string>('');

    const sendCommandHandler = () => {
      sendCommand(command.value).subscribe(
          (response: any) => {
            console.log(response.message);
          },
          (error: any) => {
            console.error('Error sending command:', error);
          }
      );
    };

    const sendMessageHandler = () => {
      sendMessage(channelId.value, message.value).subscribe(
          (response: any) => {
            console.log(response.message);
          },
          (error: any) => {
            console.error('Error sending message:', error);
          }
      );
    };

    return {
      command,
      channelId,
      message,
      sendCommand: sendCommandHandler,
      sendMessage: sendMessageHandler,
    };
  },
});
</script>

<template>
  <div class="bot-control task-list relative bg-amber-50 border border-slate-100 rounded-3xl p-8 hover:-translate-y-2 hover:shadow-xl transition">
    <div class="input-group py-4">
      <input v-model="command" placeholder="Command" />
      <button @click="sendCommand" class="transition">Send Command</button>
    </div>
    <div class="font-bold p-2">
      Commands
    </div>
    <ul class="list-disc">
      <li>!создать_задачу</li>
      <li>!обновить_задачу</li>
      <li>!удалить_задачу</li>
      <li>!назначать_задачу</li>
      <li>!найти_исполнителя</li>
      <li>!создать_опрос</li>
      <li>!статус_опроса</li>
      <li>!удалить_опрос</li>
    </ul>
  </div>
</template>


<style scoped>
.bot-control {
  max-width: 600px;
  margin: auto;
}

.input-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
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
  margin-left: 6px;
}

button:hover {
  background-color: #a59c88;
}


</style>
