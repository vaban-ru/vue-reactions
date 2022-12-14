<template>
  <div>
    <h2>Single</h2>
    <vue-reactions
      :key="`reactions-1`"
      :id="1"
      :model-value="selectedReactions"
      :reactions="reactions"
      :storage="storage"
      has-dropdown
      multiple
      @update:modelValue="updateSelectedReactions"
      @update:storage="updateStorage"
    />
  </div>
</template>

<script setup lang="ts">
import VueReactions, { ISelectedReactionsItem } from "./VueReactions.vue";
import { ref } from "vue";

const reactions = ref([
  {
    id: 1,
    label: "Heart",
    emoji: "❤️",
  },
  {
    id: 2,
    label: "Cool",
    emoji: "👍",
  },
  {
    id: 3,
    label: "Bad",
    emoji: "👎",
  },
]);

const storage = ref<(number | string)[]>(
  JSON.parse(localStorage.getItem("some-storage")) || []
);

const updateStorage = (storageArray: (number | string)[]) => {
  storage.value = storageArray;
  localStorage.setItem("some-storage", JSON.stringify(storageArray));
};

const selectedReactions = ref<ISelectedReactionsItem[]>(
  JSON.parse(localStorage.getItem("reactions")) || []
);
const updateSelectedReactions = (reactions: ISelectedReactionsItem[]) => {
  selectedReactions.value = reactions;
  localStorage.setItem("reactions", JSON.stringify(reactions));
};
</script>

<style lang="scss">
body {
  padding: 64px;
}
</style>
