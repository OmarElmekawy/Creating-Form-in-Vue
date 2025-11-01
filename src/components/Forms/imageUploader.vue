<template>
  <div class="uploaderContainer">
    <label class="uploaderLabel" :class="{labelError: error}">الصوره الشخصيه</label>
    <div class="fileLabelContainer">
      <div class="deleteImage" v-if="imageUrl" @click="imageUrl = null">x</div>
      <label for="file" class="uploader">
        <i class="fas fa-camera cameraIcon" v-if="!imageUrl"></i>
        <img :src="imageUrl" v-else alt="vv" />
      </label>
    </div>

    <input
      type="file"
      id="file"
      class="d-none"
      @change="onChangeFile"
      ref="inputFile"
      :class="{ inputError: error }"
    />
  </div>
  <p v-if="error" class="errorText" v-for="err in message">
    {{ err.$message }}
  </p>
</template>

<script>
import { ref } from "vue";

export default {
  props: ["message", "error"],
  setup(props, { emit }) {
    const inputFile = ref("");
    const imageUrl = ref("");

    const onChangeFile = (event) => {
      inputFile.value = event.target.files[0];
      imageUrl.value = URL.createObjectURL(event.target.files[0]);
      emit("onChangeFile", event.target.files[0]);
      console.log(inputFile.value.name);
    };
    return {
      onChangeFile,
      inputFile,
      imageUrl,
    };
  },
};
</script>
