# Model Value

Array of selected reactions to show

| Prop name   | Type                     | Default value | Required |
|-------------|--------------------------|---------------|----------|
| model-value | ISelectedReactionsItem[] | -             | Y        |

Example of prop value

```typescript
[
    {
        id: 1,
        count: 1
    },
    {
        id: 2,
        count: 2
    },
    {
        id: 3,
        count: 2
    }
]
```

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
  <vue-reactions :model-value="selectedReactions" />
</template>

<script setup>
import { ref } from "vue";

const selectedReactions = ref([
  {
    id: 1,
    count: 1
  },
  {
    id: 2,
    count: 2
  },
  {
    id: 3,
    count: 2
  }
]);
</script>
```
