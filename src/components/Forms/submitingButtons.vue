<template>
  <div class="buttonsContainer">
    <button class="next" @click="submitForm">التالي</button>

    <button class="retry" @click="rewriteForm">اعادة تعيين</button>
  </div>
</template>

<script>
export default {
  setup(props, { emit }) {
    const submitForm = () => {
      emit("submitForm");
    };

    const rewriteForm = () => {
      emit("rewriteForm");
    };

    return {
      submitForm,
      rewriteForm
    };
  },
};
</script>
