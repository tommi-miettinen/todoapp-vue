<script>
import { ref, nextTick } from "vue";
import { useTodoListStore } from "../../stores/todoListStore";
export default {
  props: {
    todo: Object,
  },
  setup(props) {
    const store = useTodoListStore();
    const titleInput = ref(props.todo.title);
    const editing = ref(false);
    return { store, titleInput, editing };
  },
  methods: {
    handleDrag() {
      this.store.setDraggedTodo(this.todo);
    },
    deleteTodo() {
      this.store.deleteTodo(this.todo.id);
    },
    handleEdit() {
      this.store.editTodo({ ...this.todo, title: this.titleInput });
      this.editing = false;
    },
    toggleEditing() {
      this.editing = !this.editing;
      if (this.editing) nextTick(() => this.$refs.editInput.focus());
    },
    toggleComplete() {
      this.store.editTodo({ ...this.todo, completed: !this.todo.completed });
    },
    editTitle() {
      this.store.editTodo({ ...this.todo, title: this.title });
    },
  },
};
</script>

<template>
  <div
    class="rounded-lg p-3 ml-auto hover:bg-slate-800 cursor-pointer my-2 flex items-center"
    draggable="true"
    @dragstart="handleDrag()"
  >
    <input
      @click="toggleComplete()"
      :checked="todo.completed"
      type="checkbox"
      class="checkbox checkbox-secondary mr-3"
    />
    <div v-if="!editing">{{ todo.title }}</div>
    <input
      ref="editInput"
      @blur="handleEdit()"
      @keyup.enter="handleEdit()"
      v-model="titleInput"
      v-if="editing"
      class="input input-bordered w-full mr-2 h-8"
    />
    <div class="ml-auto flex items-center">
      <button
        @click="toggleEditing()"
        class="hover:bg-slate-700 flex items-center justify-center btn-square btn-sm rounded-md"
      >
        <svg
          class="inline-block h-4 w-4 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z"
          ></path>
        </svg>
      </button>
      <button
        @click="deleteTodo()"
        class="hover:bg-slate-700 flex items-center justify-center btn-square btn-sm rounded-md"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          style="height: 20px; width: 20px"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  </div>
</template>
