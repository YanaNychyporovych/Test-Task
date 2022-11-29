<template>
  <draggable
    :list="btnData"
    tag="div"
    item-key="id"
    :group="{ name: 'table', pull: 'clone', put: false }"
    @end="changeId"
  >
    <template #item="{ element }">
      <app-btn :title="element.title" />
    </template>
  </draggable>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import AppBtn from "./AppBtn.vue";
import draggable from "vuedraggable";
import BtnModel from "@/types/BtnModel";

let i = ref<number>(1);

//  Creating data for button
const btnData = computed<BtnModel[]>(() => {
  const unicId: string  = "btnId-" + i.value;
  return [{ title: "Button", id: unicId }];
});

//  Changing custom id
const changeId = () => {
  i.value++
};

</script>