# update:modelValue

Event return updated array of reactions id's that user already select

| Event name     | Type                      |
|----------------|---------------------------|
| update:storage | `string[]` or `number[]`  |

## Code example

```vue
<template>
  <vue-reactions @update:storage="updateStorage" />
</template>

<script setup>
const updateStorage = (storageArray) => {
  console.log(storageArray)
};
</script>
```
