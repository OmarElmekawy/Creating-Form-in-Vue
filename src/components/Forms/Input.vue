<template>
  <div class="inputContainer phoneNumContainer">
    <label class="generic-label" :class="{labelError: error}">{{ label }}</label>

    <input
      :type="type"
      class="generic-input"
      :class="{ errorInput: error }"
      :value="modelValue"
      @input="updatedValue"
      @blur="blur"
    />
    <p v-if="error" v-for="err in message" class="errorText">{{ err.$message }}</p>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: ["type", "label", "modelValue", "error", "message"],
  setup(props, { emit }) {
    const updatedValue = (event) => {
      emit("update:modelValue", event.target.value);
    };

    const blur = () => {
      emit("blur");
    };
    return {
      updatedValue,
      blur,
    };
  },
};
</script>
