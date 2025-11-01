<template>
  <label class="genderLabel" :class="{ labelError: error }">النوع</label>
  <div class="genderContainer">
    <div class="row">
      <div class="col-6">
        <div>
          <input
            type="radio"
            class="genderInput"
            name="gender"
            value="male"
            @input="updateGenderValue"
          />
          <label class="typeLabel">ذكر</label>
        </div>
      </div>
      <div class="col-6">
        <div>
          <input
            type="radio"
            name="gender"
            value="female"
            @input="updateGenderValue"
          />
          <label class="typeLabel">انثى</label>
        </div>
      </div>
      <p v-if="error" class="errorText" v-for="err in message">
        {{ err.$message }}
      </p>
    </div>
  </div>
</template>

<script>
import Input from "./Input.vue";
export default {
  components: {
    Input,
  },
  props: ["modelValue", "error", "message"],
  setup(props, { emit }) {
    const updateGenderValue = (event) => {
      emit("update:modelValue", event.target.value);
    };
    return {
      updateGenderValue,
    };
  },
};
</script>
