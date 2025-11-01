<template>
  <DatePicker
    v-model="selectedDate"
    :locale="{ id: 'ar', masks: { weekdays: 'WWW' } }"
  >
    <template v-slot="{ inputValue, inputEvents }">
      <label class="generic-label" :class="{ labelError: error }">{{
        label
      }}</label>
      <input
        class="generic-input"
        :class="{ errorInput: error }"
        :value="inputValue"
        v-on="inputEvents"
        @blur="blur"
      />
      <p v-if="error" class="errorText">يجب ادخال {{ label }}</p>
    </template>
  </DatePicker>
</template>

<script>
import { DatePicker } from "v-calendar";
import "v-calendar/style.css";
import Input from "./Input.vue";
import { ref } from "vue";

export default {
  components: {
    DatePicker,
    Input,
  },
  props: ["label", "error"],
  setup(props, { emit }) {
    const selectedDate = ref(null);
    const blur = () => {
      emit("blur");
    };
    return {
      selectedDate,
      blur,
    };
  },
};
</script>
