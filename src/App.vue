<template>
  <div>
    <h2>Single</h2>
    <vue-reactions
      :key="`reactions-1`"
      :id="1"
      :model-value="selectedReactions"
      @update:modelValue="updateLocalStorage"
      :reactions="reactions"
    />
    <h2>Multiple</h2>
    <vue-reactions
      :key="`reactions-2`"
      :id="2"
      multiple
      :model-value="selectedReactionsMultiple"
      @update:modelValue="updateLocalStorageMultiple"
      :reactions="reactions"
    />
  </div>
</template>

<script setup lang="ts">
import VueReactions, { IReaction } from "./VueReactions.vue";
import { ref } from "vue";

const selectedReactions = ref<IReaction[]>(
  JSON.parse(localStorage.getItem("reactions")) || []
);
const selectedReactionsMultiple = ref<IReaction[]>(
  JSON.parse(localStorage.getItem("reactions-multiple")) || []
);
const reactions = ref([
  {
    id: 1,
    label: "Cool",
    emoji: "👍",
  },
  {
    id: 2,
    label: "Bad",
    emoji: "👎",
  },
  {
    id: 3,
    label: "Heart",
    emoji: "❤️",
  },
]);

const updateLocalStorage = (reactions: IReaction[]) => {
  selectedReactions.value = reactions;
  localStorage.setItem("reactions", JSON.stringify(reactions));
};

const updateLocalStorageMultiple = (reactions: IReaction[]) => {
  selectedReactionsMultiple.value = reactions;
  localStorage.setItem("reactions-multiple", JSON.stringify(reactions));
};
</script>

<style lang="scss">
body {
  padding: 64px;
}
</style>
