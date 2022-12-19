# Demo of single reaction

<script setup>
import VueReactions from '../../../src/VueReactions.vue';
import { ref } from "vue";

const reactions = ref([
  {
    id: 1,
    label: "Heart",
    emoji: "❤️",
  },
]);

const storage = ref([]);

const selectedReactions = ref([]);

const updateStorage = (storageArray) => {
  storage.value = storageArray;
};

const updateSelectedReactions = (reactions) => {
  selectedReactions.value = reactions;
};
</script>

<ClientOnly>
    <div style="padding: 32px 0;">
        <vue-reactions
            :model-value="selectedReactions"
            :reactions="reactions"
            :storage="storage"
            @update:modelValue="updateSelectedReactions"
            @update:storage="updateStorage"
        />
    </div>
</ClientOnly>

```vue
<template>
  <vue-reactions
      :model-value="selectedReactions"
      :reactions="reactions"
      :storage="storage"
      @update:modelValue="updateSelectedReactions"
      @update:storage="updateStorage"
  />
</template>
<script setup>
import VueReactions from '@webzlodimir/vue-reactions';
import '@webzlodimir/vue-reactions/dist/style.css';
import { ref } from "vue";

const reactions = ref([
  {
    id: 1,
    label: "Heart",
    emoji: "❤️",
  },
]);

const storage = ref([]);

const selectedReactions = ref([]);

const updateStorage = (storageArray) => {
  storage.value = storageArray;
};

const updateSelectedReactions = (reactions) => {
  selectedReactions.value = reactions;
};
</script>
```
