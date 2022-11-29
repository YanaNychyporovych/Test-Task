<template>
  <button class="drag-button">{{ title }}</button>
</template>

<script setup lang="ts">
// eslint-disable-next-line no-undef
defineProps({
  title: {
    type: String,
    default: "Button",
  },
});
</script>

<style scoped lang="scss">
.drag-button {
  width: 50px;
  height: 30px;
  color: white;
  background-color: rgba($color: #000000, $alpha: 0.7);
  cursor: pointer;
  transition: 0.2s;
  border: none;
  &:hover {
    background-color: rgba($color: #000000, $alpha: 0.5);
  }
}
</style>