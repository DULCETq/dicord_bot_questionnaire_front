import { mount } from '@vue/test-utils';
import TaskList from '../components/TaskList.vue';

describe('TaskList.vue', () => {
  it('renders tasks', async () => {
    const wrapper = mount(TaskList);
    await wrapper.setData({ tasks: [{ id: 1, description: 'Test Task', status: 'pending' }] });
    expect(wrapper.text()).toContain('Test Task - pending');
  });
});
