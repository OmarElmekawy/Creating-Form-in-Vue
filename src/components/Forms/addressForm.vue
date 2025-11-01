<template>
  <ValidateEach
    v-for="(item, index) in item"
    :key="index"
    :state="item"
    :rules="rules"
  >
    <template #default="{ v }">
      <div class="row">
        <div class="col-12">
          <div class="addressBorder"></div>
        </div>
      </div>
      <div class="row">
        <div class="col-6">
          <Input
            label="اسم الدوله"
            type="text"
            v-model="v.countryName.$model"
            @blur="v.countryName.$touch"
            :error="v.countryName.$error"
            :message="v.countryName.$errors"
          ></Input>
        </div>
        <div class="col-6">
          <Input
            label="ااسم المحافظه"
            type="text"
            v-model="v.cityName.$model"
            @blur="v.cityName.$touch"
            :error="v.cityName.$error"
            :message="v.cityName.$errors"
          ></Input>
        </div>
      </div>
      <div class="row">
        <div class="col-6">
          <Input
            label="رقم الشارع"
            type="text"
            v-model="v.streetNumber.$model"
            @blur="v.streetNumber.$touch"
            :error="v.streetNumber.$error"
            :message="v.streetNumber.$errors"
          ></Input>
        </div>
        <div class="col-6">
          <Input
            label="رقم الشقه"
            type="text"
            v-model="v.departmentNumber.$model"
            @blur="v.departmentNumber.$touch"
            :error="v.departmentNumber.$error"
            :message="v.departmentNumber.$errors"
          ></Input>
        </div>
      </div>
      <p @click="clearAddressForm(index)" class="cleanForm" v-if="index != 0">
        <i class="fas fa-shopping-basket" style="color: red"></i>
      </p>
    </template>
  </ValidateEach>
</template>

<script>
import Input from "./Input.vue";
import { required, helpers } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { ValidateEach } from "@vuelidate/components";

export default {
  components: {
    Input,
    ValidateEach,
  },
  props: ["item", "index"],
  setup(props, { emit }) {
    const rules = {
      countryName: {
        required: helpers.withMessage("برجاء إدخال القيمه", required),
      },
      cityName: {
        required: helpers.withMessage("برجاء إدخال القيمه", required),
      },
      streetNumber: {
        required: helpers.withMessage("برجاء إدخال القيمه", required),
      },
      departmentNumber: {
        required: helpers.withMessage("برجاء إدخال القيمه", required),
      },
    };

    const v$ = useVuelidate(rules, props.item);

    const clearAddressForm = (index) => {
      emit("clearAddressForm", index);
    };

    return {
      clearAddressForm,
      v$,
      rules,
    };
  },
};
</script>
