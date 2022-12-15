<template>
  <div class="vue-reactions">
    <template v-if="!modelValue.length">
      <button
        :title="reactions[0].label"
        @click="toggleReaction(reactions[0])"
        type="button"
        class="vue-reactions__btn"
      >
        <span v-html="reactions[0].emoji"></span>
      </button>
    </template>
    <button
      :title="reaction.label"
      class="vue-reactions__btn"
      v-for="reaction in selectedReactionsArray"
      @click="toggleReaction(reaction)"
      :key="`selected-reaction-${reaction.id}`"
      :class="{ 'vue-reactions__btn--active': isActive(reaction.id) }"
      type="button"
    >
      <span v-html="reaction.emoji"></span>
      <span v-if="reaction.count && reaction.count > 1">{{
        reaction.count
      }}</span>
    </button>
    <div v-if="reactions && hasDropdown" class="vue-reactions__dropdown">
      <div class="vue-reactions__dropdown-grid">
        <button
          :title="reaction.label"
          @click="toggleReaction(reaction)"
          v-for="reaction in reactions"
          :key="`reaction-${reaction.id}`"
          type="button"
          class="vue-reactions__reaction"
        >
          <span v-html="reaction.emoji"></span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

/**
 * Single reaction interface
 */
export interface IReaction {
  id: string | number;
  label?: string;
  emoji: string;
  count?: number;
}

/**
 * Props interface
 */
export interface IProps {
  reactions: IReaction[];
  modelValue: ISelectedReactionsItem[];
  storage: (string | number)[];
  multiple?: boolean;
  hasDropdown?: boolean;
}

/**
 * Single selected reactions item interface
 */
export interface ISelectedReactionsItem {
  id: number | string;
  count: number;
}

/**
 * Emits interface
 */
export interface IEmits {
  (event: "update:modelValue", value: ISelectedReactionsItem[]): void;
  (event: "update:storage", value: (string | number)[]): void;
}

/**
 * Props object
 */
const props = withDefaults(defineProps<IProps>(), {
  multiple: false,
  maxReactions: 3,
  hasDropdown: false,
});

/**
 * Emits object
 */
const emit = defineEmits<IEmits>();

/**
 * Ref to modelValue to mutate object
 */
const selectedReactions = ref<ISelectedReactionsItem[]>(props.modelValue);

/**
 * Check active selected reaction from user storage
 * @param id
 */
const isActive = (id: number | string) => {
  const foundStorageReactionIndex = props.storage.findIndex(
    (item: string | number) => Number(item) === id
  );
  return foundStorageReactionIndex !== -1;
};

/**
 * Check in storage that user has been already click on reaction
 * @param id
 */
const toggleReactionsInStorage = (
  id: string | number
): "add" | "remove" | "replace" => {
  const storage = [...props.storage];
  if (storage && storage.length) {
    const foundStorageReactionIndex = storage.findIndex(
      (item: string | number) => Number(item) === id
    );
    if (foundStorageReactionIndex !== -1) {
      storage.splice(foundStorageReactionIndex, 1);
      emit("update:storage", storage);
      return "remove";
    } else {
      if (props.multiple) {
        storage.push(id);
        emit("update:storage", storage);
        return "add";
      } else {
        storage[0] = id;
        emit("update:storage", storage);
        return "replace";
      }
    }
  } else {
    emit("update:storage", [id]);
    return "add";
  }
};

/**
 * Add reaction event
 * @param reaction
 */
const toggleReaction = (reaction: IReaction) => {
  const foundReaction = selectedReactions.value.find(
    (item) => item.id === reaction.id
  );
  const foundReactionIndex = selectedReactions.value.findIndex(
    (item) => item.id === reaction.id
  );
  const toggleReactionEvent = toggleReactionsInStorage(reaction.id);
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
          selectedReactions.value.splice(foundReactionIndex, 1);
        }
      } else {
        selectedReactions.value.splice(foundReactionIndex, 1);
      }
    }
  } else {
    if (toggleReactionEvent === "add") {
      selectedReactions.value.push({ id: reaction.id, count: 1 });
    } else if (toggleReactionEvent === "replace") {
      selectedReactions.value.splice(foundReactionIndex, 1);
      selectedReactions.value.push({ id: reaction.id, count: 1 });
    }
  }
  emit("update:modelValue", selectedReactions.value);
};

/**
 * Computed return already selected reactions
 */
const selectedReactionsArray = computed(() => {
  const reactionsArray: IReaction[] = [];
  props.reactions.forEach((reaction) => {
    const foundReaction = selectedReactions.value.find(
      (item) => item.id === reaction.id
    );
    if (foundReaction) {
      reactionsArray.push({ ...reaction, count: foundReaction.count });
    }
  });
  return reactionsArray;
});
</script>

<style lang="scss" scoped>
.vue-reactions {
  position: relative;
  display: inline-flex;
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

    &--active {
      background: #33a06f;
    }
  }

  &__dropdown {
    display: none;
    position: absolute;
    bottom: calc(-100% - 8px);
    left: 0;
    padding-top: 8px;
    z-index: 100;
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
