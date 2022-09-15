<script>
import { ref, toRaw } from "vue";
import TodoList from "../TodoList/TodoList.vue";
import { useTodoListStore } from "../../stores/todoListStore";

export default {
  components: {
    TodoList,
  },
  setup() {
    const store = useTodoListStore();
    store.getTodoLists();
    const todoLists = ref([]);
    const input = ref("");
    const filter = ref("");
    return {
      todoLists,
      store,
      input,
      filter,
    };
  },
  methods: {
    createTodoList() {
      this.store.createTodoList({ title: this.input });
      this.input = "";
    },
    filterTodoLists() {
      this.store.filterTodoLists(this.filter);
    },
  },
  mounted() {
    this.store.$subscribe((mutation, state) => {
      this.todoLists = toRaw(this.store.getFilteredTodoLists());
    });
  },
};
</script>

<template>
  <div class="w-full h-full p-4 flex flex-col">
    <div class="w-full mb-4 flex items-center">
      <input
        v-model="filter"
        @input="filterTodoLists()"
        placeholder="Search"
        id="filter"
        type="text"
        class="w-full input input-bordered min-h-[46px]"
      /><svg
        class="btn-square p-3 -ml-12"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="currentColor"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <circle cx="10" cy="10" r="7"></circle>
        <line x1="21" y1="21" x2="15" y2="15"></line>
      </svg>
    </div>
    <div class="p-2 w-full h-full overflow-auto flex flex-col mb-4">
      <TodoList
        v-for="todoList in todoLists"
        :todoList="todoList"
        :key="todoList.id"
      />
    </div>
    <input
      @keyup.enter="createTodoList()"
      v-model="input"
      id="todo-list-input"
      placeholder="Add"
      type="text"
      class="input mt-auto input-bordered w-full min-h-[46px]"
    />
  </div>
</template>
