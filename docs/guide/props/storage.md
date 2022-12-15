# Storage

Array of reactions id's that user already select

| Prop name | Type                      | Default value | Required |
|-----------|---------------------------|---------------|----------|
| storage   | `string[]` or `number[]`  | -             | Y        |

## Code example

```vue
<template>
  <vue-reactions :storage="storage" />
</template>

<script setup lang="ts">
import { ref } from "vue";

const storage = ref([1,2,3.4]);
</script>
```
