<template>
  <table class="drag-table" border="1">
    <tr
      v-for="(row, index) in tableArray"
      :key="index"
      class="drag-table__rows"
    >
      <td v-for="td in row" :key="td.id" class="drag-table__item">
        <draggable
          :list="td.buttons"
          tag="div"
          class="drag-table__elem"
          item-key="id"
          group="table"
          :id="td.id"
        >
          <template #item="{ element }">
            <app-btn
              v-if="element"
              :title="element.title"
              class="drag-table__button"
              @dblclick="deleteBtn(td.id, element.id)"
            />
          </template>
        </draggable>
      </td>
    </tr>
  </table>
</template>

<script setup lang="ts">
import { ref, onBeforeMount, watch, PropType } from "vue";
import AppBtn from "./AppBtn.vue";
import draggable from "vuedraggable";
import StorageService from "@/services/StorageService";
import ParamsTableModel from "@/types/ParamsTableModel";
import TableModel from "@/types/TableModel";

// eslint-disable-next-line no-undef
const props = defineProps({
  params: {
    type: Object as PropType<ParamsTableModel>,
    default: () => ({
      rows: 5,
      columns: 5,
    }),
  }
});

const tableArray = ref<TableModel[]>([]);

onBeforeMount(() => {
  // Getting data from Local Storage
  const tableArrayLc : TableModel[] = getDataFromLc("table_array");
  if (tableArrayLc) {
    tableArray.value = tableArrayLc;
  } else {
    // Creating table
    for (let i = 0; i < props.params.rows; i++) {
      tableArray.value.push([]);
      for (let k = 0; k < props.params.columns; k++) {
        tableArray.value[i].push({
          id: i.toString() + "TD" + k.toString(),
          buttons: [],
        });
      }
    }
  }
});

// Methods for working with Local Storage
const getDataFromLc = (key: string) => {
  return StorageService.getItem(key);
};
const setDataToLc = (key: string, data: TableModel[]) => {
  StorageService.setItem(key, data);
};
// Methods for working with Local Storage

// Method for deleting button
const deleteBtn = (cellId: string, id: string) => {
  const cellFullId = cellId.split('TD')
  const rowId : number = +cellFullId[0]
  const colId : number = +cellFullId[1]
  const activeItem = tableArray.value[rowId][colId]
  activeItem.buttons = activeItem.buttons.filter((el: {id: string}) => el.id !== id)
}

watch(
  () => tableArray.value,
  (value) => {
    // Pushing data to Local Storage
    setDataToLc("table_array", value);
  },
  { deep: true }
);
</script>

<style scoped lang="scss">
.drag-table {
  border-spacing: 0;
  &__item {
    height: 30px;
    width: 50px;
    min-width: 50px;
    padding: 0;
    position: relative;
  }
  &__elem {
    width: 100%;
    height: 100%;
  }
  &__button,
  &__elem {
    top: 0;
    left: 0;
    position: absolute;
  }
}
</style>