<template>
  <div class="phoneNumContainer">
    <Input type="text" label="رقم الهاتف" v-model="newNumber"></Input>
  </div>
</template>

<script>
import Input from "./Input.vue";
import { ref } from "vue";
export default {
  components: {
    Input,
  },
  props: ["numberIndex"],
  setup(props, { emit }) {
    const newNumber = ref("");

    const deleteNumber = () => {
      emit("deleteNumber");
    };
    const addNewNumber = () => {
      emit("addNewNumber");
    };
    return {
      addNewNumber,
      deleteNumber,
      newNumber,
    };
  },
};
</script>
