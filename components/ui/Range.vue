<template>
  <div class="relative mb-6">
    <label :for="labelFor" class="text-gray-900 font-semibold">{{
      labelText
    }}</label>
    <input
      :id="labelFor"
      type="range"
      v-model="rangeValue"
      :min="min"
      :max="max"
      class="w-full mt-2 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
      @input="updateValue"
    />
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  labelText: String,
  labelFor: String,
  initialValue: {
    type: Number,
  },
  min: {
    type: Number,
  },
  max: {
    type: Number,
  },
});

const emit = defineEmits(["update:modelValue"]);

const rangeValue = ref(props.initialValue);

function updateValue(event) {
  emit("update:modelValue", rangeValue.value);
}
</script>
