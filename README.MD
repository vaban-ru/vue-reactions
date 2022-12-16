# Vue Reactions
![Size](https://img.shields.io/bundlephobia/minzip/@webzlodimir/vue-reactions)
![Downloads](https://img.shields.io/npm/dt/@webzlodimir/vue-reactions)
![Version](https://img.shields.io/npm/v/@webzlodimir/vue-reactions)

❤️Awesome and easy to use reaction component for Vue 3

![DemoImg](https://vaban.ru/reactions.png?v=1)

- [DOCS](https://vaban-ru.github.io/vue-reactions/)

## Install

### Yarn

```
yarn add @webzlodimir/vue-reactions
```

### Npm

```
npm i @webzlodimir/vue-reactions
```

## Use

### Vue 3

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

