<template>
  <main>
    <RouterView />
  </main>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import IdentityService from "./services/IdentityService";

export default class App extends Vue {
  created() {
    IdentityService.loadStoredIdentity();
  }
}
</script>

<style>
</style>