<script setup lang="ts">
import { useTodoListStore } from "./stores/todoListStore";

import LoginForm from "./components/LoginForm/LoginForm.vue";
import TodoLists from "./components/TodoLists/TodoLists.vue";
import Navigation from "./components/Navigation/Navigation.vue";
import "./index.css";

const store = useTodoListStore();
</script>

<template>
  <div class="h-screen bg-base-300 flex flex-col justify-center items-center">
    <Navigation />
    <div
      class="m-auto mt-4 w-screen sm:w-7/12 xl:w-3/12 rounded-xl h-2/3 bg-base-200 flex flex-col items-center justify-center"
    >
      <LoginForm v-if="!store.loggedIn" />
      <TodoLists v-if="store.loggedIn" />
    </div>
  </div>
</template>
