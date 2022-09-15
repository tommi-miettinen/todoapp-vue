<script>
import { ref, nextTick } from "vue";
import { useTodoListStore } from "../../stores/todoListStore";
import Todo from "../Todo/Todo.vue";
export default {
  components: {
    Todo,
  },
  props: {
    todoList: Object,
  },
  setup(props) {
    const store = useTodoListStore();
    const isOpen = ref(false);
    const editing = ref(false);
    const editedTitle = ref(props.todoList.title);
    const editInputRef = ref(null);
    const addingTodo = ref(false);
    const todoTitle = ref("");
    return {
      store,
      isOpen,
      editing,
      addingTodo,
      todoTitle,
      editedTitle,
      editInputRef,
    };
  },

  methods: {
    toggleOpen(e) {
      if (e.target.id === "todolist") {
        this.isOpen = !this.isOpen;
        this.addingTodo = false;
      }
    },
    setInputRef(ref) {
      this.editInputRef = ref;
    },
    handleEdit() {
      this.store.editTodoList({ ...this.todoList, title: this.editedTitle });
      this.editing = false;
    },
    toggleAddingTodo() {
      this.addingTodo = !this.addingTodo;
      if (this.addingTodo) nextTick(() => this.$refs.addInput.focus());
    },
    toggleAllComplete() {
      this.store.toggleTodoListComplete({
        ...this.todoList,
        completed: !this.todoList.completed,
      });
    },
    toggleComplete() {
      this.store.editTodoList({
        ...this.todoList,
        completed: !this.todoList.completed,
      });
    },
    handleInput(e) {
      this.editedTitle = e.target.value;
    },
    toggleEditing() {
      this.editing = !this.editing;
      if (this.editing) nextTick(() => this.$refs.editInput.focus());
    },
    handleTodoDrop() {
      this.store.moveTodoTo(this.todoList.id);
    },
    deleteTodoList() {
      this.store.deleteTodoList(this.todoList.id);
    },
    createTodo() {
      this.store.createTodo(this.todoTitle, this.todoList.id);
      this.todoTitle = "";
    },
    duplicateTodoList() {
      this.store.createTodoList({
        ...this.todoList,
        completed: false,
        todos: this.todoList.todos.map((t) => ({ ...t, completed: false })),
      });
    },
    duplicateTodoListWithState() {
      this.store.createTodoList(this.todoList);
    },
  },
};
</script>

<template>
  <div @drop="handleTodoDrop()" @dragover.prevent @dragenter.prevent>
    <div
      id="todolist"
      @click="(e) => toggleOpen(e)"
      class="px-4 py-2 my-1 w-full bg-base-100 rounded-xl flex items-center hover:bg-slate-800 cursor-pointer"
    >
      <input
        @click="toggleComplete()"
        :checked="todoList.completed"
        type="checkbox"
        class="checkbox checkbox-secondary mr-3"
      /><span v-if="!editing">{{ todoList.title }}</span>
      <input
        ref="editInput"
        @blur="handleEdit()"
        @keyup.enter="handleEdit()"
        v-model="editedTitle"
        v-if="editing"
        class="input input-bordered w-full mr-2 h-10"
      />
      <div class="dropdown dropdown-end ml-auto m-1">
        <button
          tabindex="0"
          class="btn btn-ghost btn-sm btn-square hover:bg-slate-700 rounded-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            class="bi bi-three-dots-vertical"
            viewBox="0 0 16 16"
          >
            <path
              d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"
            />
          </svg>
        </button>
        <ul
          tabindex="0"
          class="dropdown-content menu p-1 shadow bg-slate-900 mt-1 rounded-xl z-10 w-52 border border-slate-700"
        >
          <li @click="deleteTodoList()"><a>Delete</a></li>
          <li @click="duplicateTodoList()"><a>Duplicate</a></li>
          <li @click="duplicateTodoListWithState()">
            <a>Duplicate with state</a>
          </li>
          <li @click="toggleEditing()">
            <a>Edit</a>
          </li>
          <li @click="toggleAllComplete()">
            <a>{{ todoList.completed ? "Incomplete all" : "Complete all" }}</a>
          </li>
        </ul>
      </div>
      <div
        class="ml-1 btn-square btn-sm flex items-center justify-center font-semibold rounded-md bg-slate-800"
      >
        {{ todoList.todos.length }}
      </div>
    </div>
    <div v-if="isOpen" class="w-11/12 ml-auto box-border">
      <Todo v-for="todo of todoList.todos" :todo="todo" />
      <button
        class="btn btn-ghost hover:bg-slate-800 rounded-lg w-full px-2"
        @click="toggleAddingTodo()"
        v-if="!addingTodo"
      >
        <svg
          class="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          ></path>
        </svg>
        <span class="mr-auto capitalize text-md">Add todo</span>
      </button>
      <input
        @keyup.enter="createTodo()"
        ref="addInput"
        v-if="addingTodo"
        v-model="todoTitle"
        placeholder="Add"
        type="text"
        class="input mt-auto input-bordered w-full min-h-[46px]"
      />
    </div>
  </div>
</template>
