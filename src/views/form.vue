<template>
  <div class="form" v-if="!isSubmitted">
    <div class="container" dir="rtl">
      <div class="row">
        <div class="col-12">
          <image-uploader
            @onChangeFile="onChangeFile"
            :error="v$.image.$error"
            :message="v$.image.$errors"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-6">
          <Input
            type="text"
            label="الاسم الاول"
            v-model="formData.name"
            @blur="v$.name.$touch"
            :error="v$.name.$error"
            :message="v$.name.$errors"
          ></Input>
        </div>
        <div class="col-6">
          <Input
            type="text"
            label="اسم العائله"
            v-model="formData.familyName"
            @blur="v$.familyName.$touch"
            :error="v$.familyName.$error"
            :message="v$.familyName.$errors"
          ></Input>
        </div>
      </div>
      <div class="row">
        <div class="col-6">
          <Input
            type="text"
            label="البريد الالكتروني"
            v-model="formData.email"
            @blur="v$.email.$touch"
            :error="v$.email.$error"
            :message="v$.email.$errors"
          ></Input>
        </div>
        <div class="col-6">
          <Input
            type="text"
            label="الرقم القومي"
            v-model="formData.identityNumber"
            @blur="v$.identityNumber.$touch"
            :error="v$.identityNumber.$error"
            :message="v$.identityNumber.$errors"
          ></Input>
        </div>
      </div>
      <div class="row">
        <div class="col-6">
          <Input
            type="text"
            label="كلمة المرور"
            v-model="formData.password"
            @blur="v$.password.$touch"
            :error="v$.password.$error"
            :message="v$.password.$errors"
          ></Input>
        </div>
        <div class="col-6">
          <Input
            type="text"
            label="كلمة المرور"
            v-model="formData.confrimPassword"
            @blur="v$.confrimPassword.$touch"
            :error="v$.confrimPassword.$error"
            :message="v$.confrimPassword.$errors"
          ></Input>
        </div>
      </div>
      <div>
        <AddressForm
          @clearAddressForm="clearAddressForm(index)"
          :item="formData.newPlaces"
        ></AddressForm>
      </div>
      <div class="row">
        <div class="col-12">
          <NewPlace @addNewPlace="addNewPlace"></NewPlace>
        </div>
      </div>
      <div class="row inputContainer">
        <div class="col-6">
          <Calender
            label="تاريخ الميلاد"
            v-model="formData.date"
            @blur="v$.date.$touch"
            :error="v$.date.$error"
            :message="v$.date.$errors"
          ></Calender>
        </div>
        <div class="col-6">
          <Gender
            v-model="formData.gender"
            :error="v$.gender.$error"
            :message="v$.gender.$errors"
          ></Gender>
        </div>
      </div>
      <div class="row">
        <ValidateEach
          v-for="(item, index) in formData.phoneNumbers"
          :key="index"
          :state="item"
          :rules="rules"
        >
          <template #default="{ v }">
            <div class="col-6" :key="index">
              <Input
                type="text"
                label="رقم الهاتف"
                v-model="v.phone.$model"
                @blur="v.phone.$touch"
                :error="v.phone.$error"
                :message="v.phone.$errors"
              >
                <button class="plus" @click="addNewNumber">
                  <i class="fas fa-plus-square"></i>
                </button>
                <button
                  class="minus"
                  v-if="index > 0"
                  @click="deleteNumber(index)"
                >
                  <i class="fas fa-minus"></i>
                </button>
              </Input>
            </div>
          </template>
        </ValidateEach>
      </div>
      <div class="row">
        <div class="col-6"></div>
        <div class="col-6">
          <Buttons
            @submitForm="submitForm"
            @rewriteForm="rewriteForm"
          ></Buttons>
        </div>
      </div>
    </div>
  </div>
  <div v-if="isSubmitted" class="submitContainer">
    <p>تم التسجل بنجاح</p>
    <button @click="submitAgain">التسحيل مره اخره</button>
  </div>
</template>
<script>
import ImageUploader from "@/components/Forms/imageUploader.vue";
import Input from "@/components/Forms/Input.vue";
import NewPlace from "@/components/Forms/AddNewPlace.vue";
import AddressForm from "@/components/Forms/addressForm.vue";
import Calender from "@/components/Forms/calender.vue";
import { ref, computed, reactive } from "vue";
import Gender from "@/components/Forms/gender.vue";
import Buttons from "@/components/Forms/submitingButtons.vue";
import {
  required,
  sameAs,
  helpers,
  minLength,
  integer,
} from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { email } from "@vuelidate/validators";
import { ValidateEach } from "@vuelidate/components";
export default {
  components: {
    ImageUploader,
    Input,
    NewPlace,
    AddressForm,
    Calender,
    Gender,
    Buttons,
    ValidateEach,
  },

  setup() {
    const formData = ref({
      image: "",
      name: "",
      familyName: "",
      email: "",
      identityNumber: "",
      password: "",
      confrimPassword: "",
      newPlaces: [
        {
          countryName: "",
          cityName: "",
          streetNumber: "",
          departmentNumber: "",
        },
      ],
      date: "",
      gender: "",
      phoneNumbers: [
        {
          phone: null,
        },
      ],
    });

    const rules = computed(() => ({
      image: { required: helpers.withMessage("برجاء إدخال القيمه", required) },
      name: { required: helpers.withMessage("برجاء إدخال القيمه", required) },
      familyName: {
        required: helpers.withMessage("برجاء إدخال القيمه", required),
      },
      email: {
        required: helpers.withMessage("برجاء إدخال القيمه", required),
        email,
      },
      identityNumber: {
        required: helpers.withMessage("برجاء إدخال الرقم القومي", required),
        minLength: helpers.withMessage(
          "يجب أن يكون الرقم القومي 14 رقمًا",
          minLength(14)
        ),
        onlyNumbers: helpers.withMessage("اخل ارقام فقط", integer),
      },
      password: {
        required: helpers.withMessage("برجاء إدخال القيمه", required),
      },
      confrimPassword: {
        required: helpers.withMessage("برجاء إدخال القيمه", required),
        sameAsPassword: helpers.withMessage(
          "كلمة المرور غير مطابقه",
          sameAs(computed(() => formData.value.password))
        ),
      },
      date: { required: helpers.withMessage("برجاء إدخال القيمه", required) },
      gender: { required: helpers.withMessage("برجاء إدخال القيمه", required) },
      phone: {
        required: helpers.withMessage("برجاء إدخال القيمه", required),
        validPhone: helpers.withMessage(
          "رقم الهاتف غير صحيح",
          helpers.regex(/^01[0-2,5]{1}[0-9]{8}$/)
        ),
      },
    }));
    const v$ = useVuelidate(rules, formData);

    const isSubmitted = ref(false);

    const submitForm = () => {
      v$.value.$validate();

      console.log(v$.value);

      if (v$.value.$error) {
        isSubmitted.value = false;
      } else {
        isSubmitted.value = true;
      }
    };

    const onChangeFile = (inputFile) => {
      formData.value.image = inputFile;
    };

    const addNewPlace = () => {
      formData.value.newPlaces = [...formData.value.newPlaces, {}];
    };

    const addNewNumber = () => {
      const item = {
        phone: null,
      };
      formData.value.phoneNumbers = [...formData.value.phoneNumbers, item];
    };

    const clearAddressForm = (index) => {
      formData.value.newPlaces.splice(index, 1);
    };

    const deleteNumber = (idx) => {
      formData.value.phoneNumbers = formData.value.phoneNumbers.filter(
        (number, index) => index !== idx
      );
    };

    const rewriteForm = () => {
      v$.value.$reset();
      formData.value = {
        image: "",
        name: "",
        familyName: "",
        email: "",
        identityNumber: "",
        password: "",
        confrimPassword: "",
        newPlaces: [
          {
            countryName: "",
            cityName: "",
            streetNumber: "",
            departmentNumber: "",
          },
        ],
        date: "",
        gender: "",
        phoneNumbers: [
          {
            phone: null,
          },
        ],
      };
    };

    const submitAgain = () => {
      formData.value = {
        image: "",
        name: "",
        familyName: "",
        email: "",
        identityNumber: "",
        password: "",
        confrimPassword: "",
        newPlaces: [
          {
            countryName: "",
            cityName: "",
            streetNumber: "",
            departmentNumber: "",
          },
        ],
        date: "",
        gender: "",
        phoneNumbers: [
          {
            phone: null,
          },
        ],
      };
      v$.value.$reset();
      isSubmitted.value = false;
    };

    return {
      addNewPlace,
      clearAddressForm,
      addNewNumber,
      deleteNumber,
      formData,
      v$,
      submitForm,
      onChangeFile,
      rules,
      rewriteForm,
      isSubmitted,
      submitAgain,
    };
  },
};
</script>
