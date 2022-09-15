<script>
import { useTodoListStore } from "../../stores/todoListStore";
import checkmark from "../../assets/checkmark.json";

export default {
  data() {
    return {
      checkmark,
      username: "",
      password: "",
      success: false,
      store: useTodoListStore(),
    };
  },
  methods: {
    login() {
      this.store.login(this.username, this.password);
    },
    async signup() {
      const res = await this.store.signup(this.username, this.password);
      console.log(res);
      if (res) {
        this.success = true;
        setTimeout(() => {
          this.success = false;
        }, 2000);
      }
    },
  },
};
</script>

<template>
  <div class="card flex-shrink-0 w-full max-w-sm">
    <div v-if="!success" class="card-body">
      <div class="form-control">
        <label class="label">
          <span class="label-text">Username</span>
        </label>
        <input
          type="text"
          v-model="username"
          placeholder="username"
          class="input input-bordered"
        />
      </div>
      <div class="form-control">
        <label class="label">
          <span class="label-text">Password</span>
        </label>
        <input
          type="password"
          v-model="password"
          placeholder="password"
          class="input input-bordered"
        />
      </div>
      <div class="form-control mt-4 grid grid-cols-2 gap-2">
        <button @click="login()" class="btn btn-secondary">Login</button>
        <button @click="signup()" class="btn btn-secondary">Sign up</button>
      </div>
    </div>
    <div class="m-auto text-2xl" v-if="success">
      <Vue3Lottie style="height: 50px" :animationData="checkmark" />
      User created
    </div>
  </div>
</template>
