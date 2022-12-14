# Reactions

Array of reactions for component to show in dropdown

| Prop name | Type        | Default value | Required |
|-----------|-------------|---------------|----------|
| reactions | IReaction[] | -             | Y        |

Example of prop value

```typescript
[
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
]
```

### IReaction

```typescript
interface IReaction {
  id: string | number;
  label?: string;
  emoji?: string;
}
```

| Key   | Type                 | Required |
|-------|----------------------|----------|
| id    | `string` or `number` | Y        |
| label | `string`             | N        |
| emoji | `string`             | Y        |


## Code example

```vue
<template>
  <vue-reactions :reactions="reactions" />
</template>

<script setup>
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
</script>
```
