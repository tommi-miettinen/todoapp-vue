import { defineStore } from "pinia";
import todoListAPI from "../api/todoListAPI";

export const useTodoListStore = defineStore({
  id: "app",
  state: () => ({
    todoLists: [],
    loggedIn: localStorage.token ? true : false,
    draggedTodo: null,
    filter: "",
  }),
  actions: {
    setDraggedTodo(todo) {
      this.draggedTodo = todo;
    },
    async createTodo(title, todoListId) {
      if (!title || !todoListId) return;
      await todoListAPI.createTodo(title, todoListId);
      await this.getTodoLists();
    },
    async editTodo(todo) {
      await todoListAPI.editTodo(todo);
      this.getTodoLists();
    },
    async toggleTodoListComplete(todoList) {
      await Promise.all([
        todoList.todos.map((todo) =>
          todoListAPI.editTodo({ ...todo, completed: todoList.completed })
        ),
        todoListAPI.editTodoList(todoList),
      ]);
      await this.getTodoLists();
    },
    async editTodoList(todoList) {
      await todoListAPI.editTodoList(todoList);
      this.getTodoLists();
    },
    async moveTodoTo(todoListId) {
      await todoListAPI.editTodo({ ...this.draggedTodo, todoListId });
      await this.getTodoLists();
    },
    async login(username, password) {
      const token = await todoListAPI.login(username, password);
      localStorage.token = token;
      this.loggedIn = true;
    },
    async getTodoLists() {
      this.todoLists = await todoListAPI.getTodoLists();
    },

    async deleteTodo(id) {
      await todoListAPI.deleteTodo(id);
      await this.getTodoLists();
    },
    async createTodoList(todoList) {
      const newTodoList = await todoListAPI.createTodoList(todoList);
      if (newTodoList) {
        this.todoLists = [...this.todoLists, newTodoList];
      }
    },

    async deleteTodoList(id) {
      await todoListAPI.deleteTodoList(id);
      this.todoLists = this.todoLists.filter((t) => t.id !== id);
    },
    filterTodoLists(filter) {
      this.filter = filter.trim().toLowerCase();
    },
    getFilteredTodoLists() {
      return this.todoLists.filter(
        (list) =>
          list.title.trim().toLowerCase().includes(this.filter) ||
          list.todos.some((t) =>
            t.title.trim().toLowerCase().includes(this.filter)
          )
      );
    },
    async signup(username, password) {
      const res = await todoListAPI.createUser({ username, password });
      return Boolean(res);
    },
  },
});
