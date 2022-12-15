# update:modelValue

Event return updated selected reactions

| Event name        | Type                     |
|-------------------|--------------------------|
| update:modelValue | ISelectedReactionsItem[] |

### ISelectedReactionsItem

```typescript
interface ISelectedReactionsItem {
    id: number | string;
    count: number;
}
```

| Key   | Type                 | Required |
|-------|----------------------|----------|
| id    | `string` or `number` | Y        |
| count | `number` >= 1        | Y        |


## Code example

```vue
<template>
  <vue-reactions @update:modelValue="updateSelectedReactions" />
</template>

<script setup>
const updateSelectedReactions = (reactions) => {
  console.log(reactions)
};
</script>
```
