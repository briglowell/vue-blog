<template>
  <div id="app" class="bg-snow-img">
    <navbar />
    <router-view />
  </div>
</template>

<script>
import Navbar from '@/components/navbar'
import { computed } from 'vue'
import { AppState } from './AppState'
export default {
  name: 'App',
  setup() {
    return {
      appState: computed(() => AppState)
    }
  },
  components: {
    Navbar
  }
}
</script>
<style lang="scss">
@import "./assets/_variables.scss";
@import "bootstrap";
@import "./assets/_overrides.scss";

.bg-snow-img{
  background-image: url("https://i.ytimg.com/vi/lite9eQ8T9k/maxresdefault.jpg");
  background-size: cover;
}
img {
  max-width: 100px;
}
</style>
