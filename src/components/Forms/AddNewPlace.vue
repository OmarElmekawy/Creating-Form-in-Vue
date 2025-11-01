<template>
  <div class="newPlace" @click="addNewPlace">
    <p class="placeText"><i class="fas fa-plus-circle"></i>  اضافة محل اقامه جديد </p>
  </div>
</template>

<script>
export default {
  setup(props, { emit }) {
    const addNewPlace = () => {
      emit("addNewPlace");
    };
    return {
      addNewPlace,
    };
  },
};
</script>
