<template>
  <div class="vue-reactions">
    <button
      @click="toggleReaction(reactions[0])"
      type="button"
      class="vue-reactions__btn"
    >
      <span v-html="reactions[0].emoji"></span>
    </button>
    <button
      class="vue-reactions__btn"
      v-for="reaction in modelValue"
      @click="toggleReaction(reaction)"
      :key="`selected-reaction-${reaction.id}`"
      type="button"
    >
      <span v-html="reaction.emoji"></span>
      <span v-if="reaction.count > 1">{{ reaction.count }}</span>
    </button>
    <div class="vue-reactions__dropdown">
      <div class="vue-reactions__dropdown-grid">
        <button
          @click="toggleReaction(reaction)"
          v-for="reaction in reactions"
          :key="`reaction-${reaction.id}`"
          type="button"
          class="vue-reactions__reaction"
          v-html="reaction.emoji"
        ></button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

/**
 * Single reaction interface
 */
export interface IReaction {
  id: string | number;
  label?: string;
  emoji?: string;
  imgSrc?: string;
  count?: number;
}

/**
 * Props interface
 */
export interface IProps {
  id: number | string;
  reactions: IReaction[];
  modelValue: IReaction[];
  multiple?: boolean;
}

/**
 * Emits interface
 */
export interface IEmits {
  (event: "update:modelValue", value: IReaction[]): void;
}

/**
 * Props object
 */
const props = withDefaults(defineProps<IProps>(), {
  multiple: false,
});

/**
 * LocalStorage key for component
 */
const lsStorageName = `vue-reactions-${props.id}`;

/**
 * Emits object
 */
const emit = defineEmits<IEmits>();

/**
 * Ref to modelValue to mutate object
 */
const resultReactions = ref(props.modelValue);

/**
 * Add user reactions id's to localStorage
 * @param reactions
 */
const addReactionsToLS = (reactions: (string | number)[]) => {
  window.localStorage.setItem(lsStorageName, JSON.stringify(reactions));
};

/**
 * Check in localStorage that user has been already click on reaction
 * @param id
 */
const toggleReactionsInLS = (
  id: string | number
): "add" | "remove" | "replace" => {
  const lsUserReactionsJSON = window.localStorage.getItem(lsStorageName);
  if (lsUserReactionsJSON) {
    const lsUserReactions = JSON.parse(lsUserReactionsJSON);
    if (lsUserReactions && lsUserReactions.length > 0) {
      const foundLsReactionIndex = lsUserReactions.findIndex(
        (item: string | number) => Number(item) === id
      );
      if (foundLsReactionIndex !== -1) {
        lsUserReactions.splice(foundLsReactionIndex, 1);
        addReactionsToLS(lsUserReactions);
        return "remove";
      } else {
        if (props.multiple) {
          lsUserReactions.push(id);
          addReactionsToLS(lsUserReactions);
          return "add";
        } else {
          lsUserReactions[0] = id;
          addReactionsToLS(lsUserReactions);
          return "replace";
        }
      }
    } else {
      addReactionsToLS([id]);
      return "add";
    }
  } else {
    addReactionsToLS([id]);
    return "add";
  }
};

/**
 * Add reaction event
 * @param reaction
 */
const toggleReaction = (reaction: IReaction) => {
  const foundReaction = resultReactions.value.find(
    (item) => item.id === reaction.id
  );
  const foundReactionIndex = resultReactions.value.findIndex(
    (item) => item.id === reaction.id
  );
  const toggleReactionEvent = toggleReactionsInLS(reaction.id);
  if (foundReaction) {
    if (toggleReactionEvent === "add") {
      if (foundReaction.count) {
        foundReaction.count++;
      } else {
        foundReaction.count = 1;
      }
    } else if (toggleReactionEvent === "remove") {
      if (foundReaction.count) {
        if (foundReaction.count > 1) {
          foundReaction.count--;
        } else {
          resultReactions.value.splice(foundReactionIndex, 1);
        }
      } else {
        resultReactions.value.splice(foundReactionIndex, 1);
      }
    }
  } else {
    if (toggleReactionEvent === "add") {
      resultReactions.value.push({ ...reaction, count: 1 });
    } else if (toggleReactionEvent === "replace") {
      resultReactions.value.splice(foundReactionIndex, 1);
      resultReactions.value.push({ ...reaction, count: 1 });
    }
  }
  emit("update:modelValue", resultReactions.value);
};
</script>

<style lang="scss" scoped>
.vue-reactions {
  position: relative;
  display: flex;
  gap: 8px;
  font-family: Helvetica, Arial, sans-serif;

  * {
    margin: 0;
    padding: 0;
    border: 0;
    box-sizing: border-box;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }

  &__btn {
    background: #252525;
    font-size: 16px;
    height: 32px;
    border-radius: 32px;
    display: flex;
    align-items: center;
    gap: 4px;
    color: #fff;
    padding: 0 8px 0 6px;
  }

  &__dropdown {
    display: none;
    position: absolute;
    bottom: calc(-100% - 8px);
    left: 0;
    padding-top: 8px;
    &-grid {
      background: #252525;
      border-radius: 16px;
      padding-left: 8px;
      padding-right: 8px;
      display: inline-flex;
    }
  }

  &__reaction {
    font-size: 14px;
    transition: 0.2s ease;
    background: transparent;
    width: 28px;
    height: 36px;

    &:hover {
      font-size: 18px;
    }
  }

  &:hover {
    .vue-reactions__dropdown {
      display: block;
    }
  }
}
</style>
