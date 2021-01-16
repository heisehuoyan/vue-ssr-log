<template>
  <div>
    <Bar />
    <Foo />
  </div>
</template>

<script>
import Bar from "./components/bar.vue";
import Foo from "./components/foo.vue";
export default {
  components: {
    Bar,
    Foo
  }
};
</script>

<style>
</style>