<template>
  <div class="home">
    <div class="home__wrapper">
      <app-drag-btn class="home__btn" />
      <app-drag-table :params="paramsTable" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import AppDragBtn from "@/components/AppDragBtn.vue";
import AppDragTable from "@/components/AppDragTable.vue";
import ParamsTableModel from "@/types/ParamsTableModel"

const paramsTable = ref<ParamsTableModel>({rows: 5, columns: 5})

</script>

<style lang="scss">
.home {
  &__wrapper {
    display: flex;
    padding: 50px;
  }
  &__btn {
    margin-right: 50px;
  }
}
</style>
