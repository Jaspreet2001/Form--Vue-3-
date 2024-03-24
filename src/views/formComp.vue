<!-- eslint-disable no-unused-vars -->
/* eslint rule disable"*/
<script setup>
import { ref, onMounted, watchEffect, watch, computed } from "vue";
import {
  getTitles,
  getGenders,
  getMartialStatus,
  getCareOf,
  getState,
  getCity,
  getPregOptions,
  getAge,
  getPackage,
} from "../axios/article";
import { useForm } from "vee-validate";
import * as yup from "yup";
import router from "../routes/index.js";

let selectedAgeGroup = ref(null);
let selectedPackage = ref("");
const customValidationRegExp = false;
const validationMode = "auto";
const userType = ref("self");
const today = ref(new Date());
const MiddleName = ref(null);
const checkbox = ref(false);

const IMEPass = ref(null);
const CovidDoseDate1 = ref(null);
const CovidDoseDate2 = ref(null);
// Arrays to store the data
const careOfs = ref([]);
const titleOptions = ref([]);
const genderOptions = ref([]);
const martialOptions = ref([]);
const StateOptions = ref([]);
const CityOptions = ref([]);
const pregnantOptions = ref([]);
const ageGroups = ref([]);
const packageGroups = ref([]);

//Validation
const { errors, defineField, handleSubmit } = useForm({
  validationSchema: yup.object({
    CityData: yup.string().required(),
    titleName: yup.string().required(),
    firstName: yup.string().required(),
    agentName: userType.value === "agent" ? yup.string().required() : yup.string(),
    agentEmail:
      userType.value === "agent" ? yup.string().email().required() : yup.string().email(),
    agentMobile:
      userType.value === "agent"
        ? yup
            .string()
            .required()
            .matches(
              /^[0-9]{10}$/,
              "Mobile No. should be 10 digits long and contain only numbers"
            )
        : yup
            .string()
            .matches(
              /^[0-9]{10}$/,
              "Mobile No. should be 10 digits long and contain only numbers"
            ),
    Surname: yup.string().required(),
    selfEmail: yup.string().email().required(),
    selfGender: yup.string().required(),
    pregnantOption: yup.string().when("selfGender", {
      is: "Female",
      then: yup.string().required("Pregnant is required"),
    }),
    selfMartial: yup.string().required(),
    birthDate: yup.date().required(),
    careOf: yup.string().required(),
    careOfP: yup.string().required(),
    PassportNo: yup.string().required().length(8),
    PassportIssue: yup
      .string()
      .required("Passport Issue is required")
      .test({
        name: "issueDate",
        message: "Should be atleast 20 days after Date of Birth",
        test: function (value) {
          const birthDate = this.parent.birthDate;
          const twentyDaysAfterBirth = new Date(birthDate);
          twentyDaysAfterBirth.setDate(twentyDaysAfterBirth.getDate() + 20);
          return new Date(value) >= twentyDaysAfterBirth;
        },
      }),
    PassportExpiry: yup
      .string()
      .required("Passport Expiry is required")
      .test({
        name: "expiryDate",
        message: "Should be atleast 20 days after Passport Issue",
        test: function (value) {
          const issueDate = this.parent.PassportIssue;
          const twentyDaysAfterIssue = new Date(issueDate);
          twentyDaysAfterIssue.setDate(twentyDaysAfterIssue.getDate() + 20);
          return new Date(value) >= twentyDaysAfterIssue;
        },
      }),
    mobileNo: yup
      .string()
      .required("Mobile No. is required")
      .matches(
        /^[0-9]{10}$/,
        "Mobile No. should be 10 digits long and contain only numbers"
      ),

    AddressData: yup.string().required("Address is required"),
    PinCodeData: yup.string().required().length(6),

    StateData: yup.string().required("State is required"),
  }),
});

const [agentName, agentNameAttrs] = defineField("agentName");
const [agentEmail, agentEmailAttrs] = defineField("agentEmail");
const [agentMobile, agentMobileAttrs] = defineField("agentMobile");
const [titleName, titleNameAttrs] = defineField("titleName");
const [firstName, firstNameAttrs] = defineField("firstName");
const [Surname, SurnameAttrs] = defineField("Surname");
const [selfGender, selfGenderAttrs] = defineField("selfGender");
const [pregnantOption, pregnantOptionAttrs] = defineField("pregnantOption");
const [selfMartial, selfMartialAttrs] = defineField("selfMartial");
const [selfEmail, selfEmailAttrs] = defineField("selfEmail");
const [birthDate, birthDateAttrs] = defineField("birthDate");
const [careOf, careOfAttrs] = defineField("careOf");
const [careOfP, careOfPAttrs] = defineField("careOfP");
const [PassportNo, PassportNoAttrs] = defineField("PassportNo");
const [PassportIssue, PassportIssueAttrs] = defineField("PassportIssue");
const [PassportExpiry, PassportExpiryAttrs] = defineField("PassportExpiry");
const [PinCodeData, PinCodeDataAttrs] = defineField("PinCodeData");
const [AddressData, AddressDataAttrs] = defineField("AddressData");
const [StateData, StateDataAttrs] = defineField("StateData");
const [CityData, CityDataAttrs] = defineField("CityData");
//Functions

const mobileNo = ref(null);
const mobileErr = ref(null);
const mobileNoAttrs = {
  defaultCountry: "IN",
  invalidMsg: "Enter valid number",
  autoFormat: true,
  dropdownOptions: {
    showDialCodeInList: false,
    showDialCodeInSelection: false,
    showFlags: true,
  },
};

const mobileNo2 = ref(null);
const mobileErr2 = ref(null);

const handleInput = (number, phoneObject) => {
  console.log("Input changed:", number, phoneObject, phoneObject.valid);
  if (phoneObject.valid) {
    mobileErr.value = false;
  } else {
    mobileErr.value = true;
  }
};
const handleInput2 = (number, phoneObject) => {
  console.log("Input changed:", number, phoneObject, phoneObject.valid);
  if (phoneObject.valid) {
    mobileErr2.value = false;
  } else {
    mobileErr2.value = true;
  }
};

function handleUserTypeChange(value) {
  userType.value = value;
}

const onSubmit = handleSubmit((values) => {
  let obj;
  obj = {
    AgentName: agentName.value,
    AgentEmail: agentEmail.value,
    AgentMobile: agentMobile.value,
    Title: titleName.value,
    Name: firstName.value,
    MiddleName: MiddleName.value,
    Surname: Surname.value,
    Gender: selfGender.value,
    pregnantOption: pregnantOption.value,
    MaritalStatus: selfMartial.value,
    Email: selfEmail.value,
    BirthDate: birthDate.value,
    CareTaker: careOf.value,
    CareTakerName: careOfP.value,
    PassportNo: PassportNo.value,
    PassportIssue: PassportIssue.value,
    PassportExpiry: PassportExpiry.value,
    MobileNo: mobileNo.value,
    MobileNo2: mobileNo2.value,
    IMEPass: IMEPass.value,
    CovidDoseDate1: CovidDoseDate1.value,
    CovidDoseDate2: CovidDoseDate2.value,
    State: StateData.value,
    City: CityData.value,
    Address: AddressData.value,
    PinCode: PinCodeData.value,
    SelectedPackage: selectedPackage.value,
  };

  localStorage.setItem("My object", JSON.stringify(obj));

  if (checkbox.value) {
    router.push("/submit");
  } else {
    console.warn("Please accept the terms and conditions.");
  }
});

//Api Functions
const fetchTitles = async () => {
  try {
    const response = await getTitles();
    titleOptions.value = response.data;
  } catch (error) {
    console.error("Error fetching titles:", error);
  }
};

const fetchAge = async () => {
  try {
    const response = await getAge();
    ageGroups.value = response.data.data;

    console.log("ageGroups.value:", ageGroups.value);
  } catch (error) {
    console.error("Error fetching age:", error);
  }
};

const fetchGenders = async () => {
  try {
    const response = await getGenders();
    genderOptions.value = response.data;
  } catch (error) {
    console.error("Error fetching genders:", error);
  }
};

const fetchMartial = async () => {
  try {
    const response = await getMartialStatus();
    martialOptions.value = response.data;
  } catch (error) {
    console.error("Error fetching martial:", error);
  }
};

const fetchCareOf = async () => {
  try {
    const response = await getCareOf();
    careOfs.value = response.data;
  } catch (error) {
    console.error("Error fetching careOfs:", error);
  }
};

const fetchState = async () => {
  try {
    const response = await getState();
    StateOptions.value = response.data;
  } catch (error) {
    console.error("Error fetching states:", error);
  }
};
watchEffect(() => {
  if (StateData.value) {
    fetchCity(StateData.value);
  }
});

var fetchCity = async (selectedState) => {
  try {
    const response = await getCity({ state: selectedState });
    CityOptions.value = response.data;
  } catch (error) {
    console.error("Error fetching cities:", error);
  }
};

const PregSelect = async () => {
  try {
    const response = await getPregOptions();
    pregnantOptions.value = response.data;
  } catch (error) {
    console.error("Error fetching PregOption:", error);
  }
};

const calculateAge = (birthDate) => {
  const dob = new Date(birthDate);
  const month_diff = Date.now() - dob.getTime();
  const age_dt = new Date(month_diff);
  const year = age_dt.getUTCFullYear();
  return Math.abs(year - 1970);
};

const calculateAgeGroup = (birthDate) => {
  const age = calculateAge(birthDate);
  console.log("Age:", age);
  console.log(ageGroups.value);
  selectedAgeGroup.value = ageGroups.value.find(
    (group) => age >= group.start && age <= group.end
  );
  console.log(selectedAgeGroup.value);
};

watch(birthDate, () => {
  calculateAgeGroup(birthDate.value);
});

const fetchPackages = async () => {
  try {
    const response = await getPackage();
    packageGroups.value = response.data.data;
  } catch (error) {
    console.error("Error fetching packages:", error);
  }
};

const fetchPackagesByAgeGroup = async (selectedAgeGroup) => {
  try {
    const filterPackage = packageGroups.value.filter(
      (packageId) => packageId.agegroup_id === selectedAgeGroup.id
    );
    packageGroups.value = filterPackage;
  } catch (error) {
    console.error("Error fetching packages:", error);
    return [];
  }
};

watch(selectedAgeGroup, () => {
  fetchPackagesByAgeGroup(selectedAgeGroup.value);
});
onMounted(async () => {
  fetchTitles();
  fetchGenders();
  PregSelect();
  fetchMartial();
  fetchCareOf();
  fetchState();
  fetchCity();
  fetchAge();
  fetchPackages();
});

const llCountries = [];
const autoFormat = ref(true);
const customValidate = ref(false);
const defaultCountry = ref("");
const dropdownOptions = ref({
  showFlags: true,
});
const inputOptions = ref({
  placeholder: "Enter a phone number",
  showDialCode: false,
});
const invalidMsg = ref("");
const invalidMsg2 = ref("");
const mode = ref("auto");
const onlyCountries = [];

const handleValidation = (phoneObject) => {
  console.log("Validation changed:", phoneObject);

  if (phoneObject.isValid) {
    invalidMsg.value = "";
  } else {
    invalidMsg.value = "Invalid phone number for the selected country";
  }
};

const handleCountryChange = (countryObject) => {
  console.log("Country changed:", countryObject);
  invalidMsg.value = "";
};
</script>
<template>
  <div class="card-group">
    <div class="card mb-5">
      <div class="card-header" style="height: 50px">Visa Medical Form</div>
      <div class="card-body">
        <p
          id="scrollHere"
          class="cardbodyinfo"
          style="
            border-top: 1px dashed rgb(195, 195, 195);
            border-bottom: 1px dashed rgb(195, 195, 195);
          "
        >
          <b class="text-danger" style="color: rgb(209, 42, 42)"
            >NOTE: Information should be the same as on the passport</b
          >
          <br />
          Mandatory fields are marked with
          <span style="color: red">*</span>
        </p>
        <form class="text-left">
          <div role="tablist" class="accordion">
            <div class="card-agent">
              <div class="card-body1">
                <div class="row mb-1">
                  <div class="col-md-12">
                    <div class="agent-bar">
                      <div class="agent-bar1">Filling this form as ?</div>
                      <div class="row mx-2">
                        <label class="radio1">
                          <input
                            v-model="userType"
                            type="radio"
                            name="userType"
                            value="self"
                            @change="handleUserTypeChange('self')"
                          />
                          Self
                        </label>
                        <label class="radio2">
                          <input
                            v-model="userType"
                            type="radio"
                            name="userType"
                            value="agent"
                            @change="handleUserTypeChange('agent')"
                          />
                          Agent
                        </label>
                      </div>
                      <br />
                      <hr />
                      <br />
                      <div v-if="userType === 'agent'" class="agentInfoFormSelect">
                        <div class="agentInfoForm">Agent Info Form</div>
                        <hr />
                        <div class="agentInfoForm2">
                          <div class="agentInfoName">
                            <label for="Name"
                              >Name<span class="required-asterisk">*</span>:</label
                            >
                            <InputText
                              v-model="agentName"
                              type="text"
                              placeholder="Name"
                              :pt="{ root: { class: 'agentName' } }"
                              :class="errors && errors.agentName ? 'p-invalid' : ''"
                              v-bind="agentNameAttrs"
                            />
                            <InlineMessage
                              v-if="errors.agentName"
                              severity="error"
                              class="inline-message"
                            >
                              {{ errors.agentName }}
                            </InlineMessage>
                          </div>
                          <div class="agentInfoEmail">
                            <label for="Email"
                              >Email<span class="required-asterisk">*</span>:</label
                            >
                            <InputText
                              v-model="agentEmail"
                              type="text"
                              placeholder="Email"
                              :pt="{ root: { class: 'agentEmail' } }"
                              :class="errors && errors.agentEmail ? 'p-invalid' : ''"
                              v-bind="agentEmailAttrs"
                            />
                            <InlineMessage
                              v-if="errors.agentEmail"
                              severity="error"
                              class="inline-message"
                            >
                              {{ errors.agentEmail }}
                            </InlineMessage>
                          </div>
                          <div class="agentInfoMobile">
                            <label for="MobileNo"
                              >Mobile No.<span class="required-asterisk">*</span>:</label
                            >
                            <InputText
                              v-model="agentMobile"
                              type="text"
                              placeholder="Mobile Number"
                              :pt="{ root: { class: 'agentMobile' } }"
                              :class="errors && errors.agentMobile ? 'p-invalid' : ''"
                              v-bind="agentMobileAttrs"
                            />
                            <InlineMessage
                              v-if="errors.agentMobile"
                              severity="error"
                              class="inline-message"
                            >
                              {{ errors.agentMobile }}
                            </InlineMessage>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="form2-mb">Primary Applicant's Info Form:</div>
            <div class="form2-mb2">
              <div class="nameself">Name<span class="required-asterisk">*</span>:</div>

              <div class="form2-mb21">
                <div class="dropdown-container">
                  <DropdownBar
                    v-model="titleName"
                    :options="titleOptions"
                    placeholder=""
                    :pt="{
                      root: {
                        class: 'titleOption',
                        'p-invalid': errors && errors.titleName,
                      },
                    }"
                    v-bind="titleNameAttrs"
                  />
                  <InlineMessage
                    v-if="errors.titleName"
                    severity="error"
                    class="inline-message"
                  >
                    {{ errors.titleName }}
                  </InlineMessage>
                </div>
                <div class="firstName-container">
                  <InputText
                    v-model="firstName"
                    type="text"
                    placeholder="First Name"
                    :class="errors && errors.firstName ? 'p-invalid' : ''"
                    :pt="{ root: { class: 'border-teal-400' } }"
                    v-bind="firstNameAttrs"
                  />

                  <InlineMessage
                    v-if="errors.firstName"
                    severity="error"
                    class="inline-message"
                  >
                    {{ errors.firstName }}
                  </InlineMessage>
                </div>
                <div class="middle-container">
                  <InputText
                    v-model="MiddleName"
                    type="text"
                    placeholder="Middle Name"
                    :pt="{ root: { class: 'border-teal-400' } }"
                  />
                </div>
                <div class="surname-container">
                  <InputText
                    v-model="Surname"
                    type="text"
                    placeholder="Surname"
                    :class="errors && errors.Surname ? 'p-invalid' : ''"
                    :pt="{ root: { class: 'border-teal-400' } }"
                    v-bind="SurnameAttrs"
                  />
                  <InlineMessage
                    v-if="errors.Surname"
                    severity="error"
                    class="inline-message"
                  >
                    {{ errors.Surname }}
                  </InlineMessage>
                </div>
              </div>
              <div class="selfInfoForm2">
                <div class="selfInfoGender">
                  <label for="Gender"
                    >Gender<span class="required-asterisk">*</span>:</label
                  >
                  <DropdownBar
                    v-model="selfGender"
                    :options="genderOptions"
                    placeholder=""
                    :pt="{
                      root: {
                        class: 'genderOption',
                        'p-invalid': errors && errors.selfGender,
                      },
                    }"
                    v-bind="selfGenderAttrs"
                  />

                  <InlineMessage
                    v-if="errors.selfGender"
                    severity="error"
                    class="inline-message"
                  >
                    {{ errors.selfGender }}
                  </InlineMessage>
                </div>

                <div
                  v-show="selfGender && selfGender === 'Female'"
                  class="selfInfoPregnant"
                  style="display: flex; flex-direction: column"
                >
                  <label for="Pregnant"
                    >Are you Pregnant?<span
                      class="required-asterisk"
                      style="margin-right: 20px"
                      >*</span
                    >:</label
                  >
                  <DropdownBar
                    v-model="pregnantOption"
                    :options="pregnantOptions"
                    placeholder=""
                    :pt="{
                      root: {
                        class: 'pregnantOption',
                        'p-invalid': errors && errors.pregnantOption,
                      },
                    }"
                    v-bind="pregnantOptionAttrs"
                  />
                  <InlineMessage
                    v-if="errors.pregnantOption"
                    severity="error"
                    class="inline-message"
                  >
                    {{ errors.pregnantOption }}
                  </InlineMessage>
                </div>

                <div class="selfInfoMaritalStatus">
                  <label for="MaritalStatus"
                    >Marital Status<span class="required-asterisk">*</span>:</label
                  >
                  <DropdownBar
                    v-model="selfMartial"
                    :options="martialOptions"
                    placeholder=""
                    :pt="{
                      root: {
                        class: 'martialOption',
                        'p-invalid': errors && errors.selfMartial,
                      },
                    }"
                    v-bind="selfMartialAttrs"
                  />
                  <InlineMessage
                    v-if="errors.selfMartial"
                    severity="error"
                    class="inline-message"
                  >
                    {{ errors.selfMartial }}
                  </InlineMessage>
                </div>

                <div class="selfInfoEmail">
                  <label for="Email"
                    >Email<span class="required-asterisk">*</span>:</label
                  >
                  <InputText
                    v-model="selfEmail"
                    type="text"
                    placeholder="Email"
                    :class="errors && errors.selfEmail ? 'p-invalid' : ''"
                    :pt="{ root: { class: 'selfEmailOption' } }"
                    v-bind="selfEmailAttrs"
                  />
                  <InlineMessage
                    v-if="errors.selfEmail"
                    severity="error"
                    class="inline-message"
                  >
                    {{ errors.selfEmail }}
                  </InlineMessage>
                </div>
              </div>

              <div class="form3">
                <div class="selfBirth">
                  <label for="DateBirth" style="padding-left: 10px"
                    >Date of Birth<span class="required-asterisk">*</span>:</label
                  >
                  <CalendarDate
                    v-model="birthDate"
                    :max-date="today"
                    date-format="yy-mm-dd"
                    :manual-input="false"
                    :pt="{
                      input: { class: 'w-16rem' },
                      root: {
                        class: 'birthDate',
                        'p-invalid': errors && errors.birthDate,
                      },
                    }"
                    v-bind="birthDateAttrs"
                  />
                  <div
                    class="inline2"
                    style="width: 200px; display: flex; margin-top: 5px"
                  >
                    <InlineMessage
                      v-if="errors.birthDate"
                      severity="error"
                      class="inline-message"
                    >
                      {{ errors.birthDate }}
                    </InlineMessage>
                  </div>
                </div>
                <div v-if="birthDate" class="red5">
                  <label for="Packages"
                    >Packages<span class="required-asterisk">*</span>:</label
                  >
                  <DropdownBar
                    v-model="selectedPackage"
                    :options="packageGroups"
                    option-label="name"
                    option-value="id"
                    :pt="{ root: { class: 'dropdownPackage' } }"
                  />
                </div>
              </div>

              <div class="form3">
                <div class="careofSelf">
                  <label for="careof"
                    >Care Of<span class="required-asterisk">*</span>:</label
                  >
                  <DropdownBar
                    v-model="careOf"
                    :options="careOfs"
                    option-label="name"
                    option-value="name"
                    placeholder=""
                    :pt="{
                      root: {
                        class: 'careOfSelfRoot',
                        'p-invalid': errors && errors.careOf,
                      },
                      input: { class: 'careOfSelfRoot2' },
                      item: ({ props, state, context }) => ({
                        class: context.selected
                          ? 'bg-primary'
                          : context.focused
                          ? 'bg-blue-100'
                          : undefined,
                      }),
                    }"
                    v-bind="careOfAttrs"
                  />
                  <InlineMessage
                    v-if="errors.careOf"
                    severity="error"
                    class="inline-message"
                  >
                    {{ errors.careOf }}
                  </InlineMessage>
                </div>

                <div v-if="careOf" class="red5">
                  <label for="careOfPerson"
                    >{{ careOf }} 's Name<span class="required-asterisk">*</span>:</label
                  >
                  <InputText
                    v-model="careOfP"
                    type="text"
                    :placeholder="`${careOf} 's Name`"
                    :pt="{
                      root: {
                        class: 'careofPerson',
                        'p-invalid': errors && errors.careOfP,
                      },
                    }"
                    v-bind="careOfPAttrs"
                  />
                  <InlineMessage
                    v-if="errors.careOfP"
                    severity="error"
                    class="inline-message"
                  >
                    {{ errors.careOfP }}
                  </InlineMessage>
                </div>
              </div>
              <div class="PassportDiv">
                <div class="PassportNo">
                  <label for="PassportNo"
                    >Passport No.<span class="required-asterisk">*</span>:</label
                  >
                  <InputText
                    v-model="PassportNo"
                    type="text"
                    :maxlength="8"
                    placeholder="PASSPORT NUMBER [*UNEDITABLE]"
                    :pt="{ root: { class: 'PassportrootNo' } }"
                    :class="{ 'p-invalid': errors && errors.PassportNo }"
                    v-bind="PassportNoAttrs"
                  />
                  <InlineMessage
                    v-if="errors && errors.PassportNo"
                    severity="error"
                    class="inline-message"
                  >
                    {{ errors.PassportNo }}
                  </InlineMessage>
                </div>
                <div class="PassportIssue">
                  <label for="PassportIssue"
                    >Passport Issue<span class="required-asterisk">*</span>:</label
                  >
                  <CalendarDate
                    v-model="PassportIssue"
                    date-format="yy/mm/dd"
                    :pt="{
                      input: { class: 'w-16rem' },
                      root: {
                        class: 'PassportIssueRoot',
                        'p-invalid': errors && errors.PassportIssue,
                      },
                    }"
                    :disabled="!birthDate"
                    v-bind="PassportIssueAttrs"
                  />
                  <InlineMessage
                    v-if="errors.PassportIssue"
                    severity="error"
                    class="inline-message"
                  >
                    {{ errors.PassportIssue }}
                  </InlineMessage>
                </div>
                <div class="PassportExpiry">
                  <label for="PassportExpiry"
                    >Passport Expiry<span class="required-asterisk">*</span>:</label
                  >
                  <CalendarDate
                    v-model="PassportExpiry"
                    date-format="yy/mm/dd"
                    :pt="{
                      input: { class: 'w-16rem' },
                      root: {
                        class: 'PassportExpiryRoot',
                        'p-invalid': errors && errors.PassportExpiry,
                      },
                    }"
                    v-bind="PassportExpiryAttrs"
                    :disabled="!PassportIssue"
                  />
                  <InlineMessage
                    v-if="errors.PassportExpiry"
                    severity="error"
                    class="inline-message"
                  >
                    {{ errors.PassportExpiry }}
                  </InlineMessage>
                </div>
              </div>
              <div class="MobileNumber">
                <div class="PhoneNo"  style="width:300px; border-radius:5px;margin-right:20px;">
                  <label for="PhoneNo"
                    >Mobile No.<span class="required-asterisk">*</span>:</label
                  >

                  <vue-tel-input
                    v-model="mobileNo"
                    v-bind="mobileNoAttrs"
                    @on-input="handleInput"
                  ></vue-tel-input>
                  <InlineMessage v-if="mobileErr" severity="error" class="inline-message">
                    {{ mobileNoAttrs.invalidMsg }}
                  </InlineMessage>

                  <!-- <InputText
                      v-model="mobileNo"
                      type="text"
                      placeholder="Mobile Number"
                     :maxlength="10"
                      :pt="{ root: { class: 'PassportrootNo' } }"
                      :class="{ 'p-invalid': errors && errors.mobileNo }"
                      v-bind="mobileNoAttrs"
                    />  -->
                  <!-- <InlineMessage v-if="errors.mobileNo" severity="error" class="inline-message" :pt="{ root: { class: 'PassportrootNo' } }">
                      {{ errors.mobileNo }}
                  </InlineMessage>    -->
                </div>

                <div class="PhoneNo2" style="width:300px; border-radius:5px;">
                  <label for="PassportNo"
                    >Alternate No.<span class="required-asterisk">*</span>:</label
                  >
                  <vue-tel-input
                    v-model="mobileNo2"
                    v-bind="mobileNoAttrs"
                    @on-input="handleInput2"
                  ></vue-tel-input>
                  <InlineMessage
                    v-if="mobileErr2"
                    severity="error"
                    class="inline-message"
                  >
                    {{ mobileNoAttrs.invalidMsg }}
                  </InlineMessage>
                </div>
              </div>

              <div class="IMEclass">
                <div class="IMEembassy">
                  <label for="PassportNo">IME:</label>
                  <InputText
                    v-model="IMEPass"
                    type="text"
                    placeholder="IME (Received from Embassy) "
                    :pt="{ root: { class: 'IMEroot' } }"
                  />
                </div>
                <div class="CovidDose">
                  <label for="PassportIssue">1st Dose COVID Vaccine Date:</label>
                  <CalendarDate
                    v-model="CovidDoseDate1"
                    date-format="yy/mm/dd"
                    :pt="{
                      input: { class: 'w-16rem' },
                      root: { class: 'CovidDoseRoot' },
                    }"
                    :disabled="!birthDate"
                  />
                </div>
                <div class="CovidDose2">
                  <label for="PassportExpiry">2nd Dose COVID Vaccine Date:</label>
                  <CalendarDate
                    v-model="CovidDoseDate2"
                    date-format="yy/mm/dd"
                    :pt="{
                      input: { class: 'w-16rem' },
                      root: { class: 'CovidDose2Root' },
                    }"
                    :disabled="!birthDate"
                  />
                </div>
              </div>
              <div class="StateDiv">
                <div class="State2">
                  <label for="State"
                    >State<span class="required-asterisk">*</span>:</label
                  >
                  <DropdownBar
                    v-model="StateData"
                    :options="StateOptions"
                    placeholder=""
                    :pt="{
                      root: {
                        class: 'StateRoot',
                        'p-invalid': errors && errors.StateData,
                      },
                    }"
                    v-bind="StateDataAttrs"
                  />
                  <InlineMessage
                    v-if="errors.StateData"
                    severity="error"
                    class="inline-message"
                  >
                    {{ errors.StateData }}
                  </InlineMessage>
                </div>

                <div class="City2">
                  <label for="City">City<span class="required-asterisk">*</span>:</label>
                  <DropdownBar
                    v-model="CityData"
                    :options="CityOptions"
                    placeholder=""
                    :pt="{
                      root: { class: 'CityRoot', 'p-invalid': errors && errors.CityData },
                    }"
                    :disabled="!StateData"
                    v-bind="CityDataAttrs"
                  />
                  <InlineMessage
                    v-if="errors.CityData"
                    severity="error"
                    class="inline-message"
                  >
                    {{ errors.CityData }}
                  </InlineMessage>
                </div>

                <div class="Address2">
                  <label for="Address"
                    >Address<span class="required-asterisk">*</span>:</label
                  >
                  <InputText
                    v-model="AddressData"
                    type="text"
                    :placeholder="AddressData"
                    :class="errors && errors.AddressData ? 'p-invalid' : ''"
                    :pt="{ root: { class: 'AddressRoot' } }"
                    v-bind="AddressDataAttrs"
                  />
                  <InlineMessage
                    v-if="errors.AddressData"
                    severity="error"
                    class="inline-message"
                  >
                    {{ errors.AddressData }}
                  </InlineMessage>
                </div>
                <div class="Pincode2">
                  <label for="PinCode"
                    >PinCode<span class="required-asterisk">*</span>:</label
                  >
                  <InputText
                    v-model="PinCodeData"
                    type="text"
                    :placeholder="PinCodeData"
                    :maxlength="6"
                    :class="errors && errors.PinCodeData ? 'p-invalid' : ''"
                    :pt="{ root: { class: 'PincodeRoot' } }"
                    v-bind="PinCodeDataAttrs"
                  />
                  <InlineMessage
                    v-if="errors.PinCodeData"
                    severity="error"
                    class="inline-message"
                  >
                    {{ errors.PinCodeData }}
                  </InlineMessage>
                </div>
              </div>
            </div>
            <div class="checkboxdiv">
              <CheckboxDiv
                v-model="checkbox"
                input-id="checkboxinput"
                name="checkboxterm"
                value="CheckBoxTerm"
              />
              <label for="Checkbox1" class="ml-2"
                ><div class="red45">Terms and Conditions</div>
                <div class="ckform">
                  (* Our Terms and Conditions have changed please read carefully before
                  proceeding)
                </div></label
              >
            </div>

            <div class="buttonCont">
              <button
                class="buttonGreen"
                style="
                  background-color: rgb(23, 178, 23);
                  color: white;
                  width: 100px;
                  border-radius: 2px;
                "
                @click="onSubmit"
              >
                Next
              </button>
            </div>
            <div class="notediv">
              <div class="noteHeading">Note:</div>
              <div class="notePart">
                1.Your appointment will only be booked after successful payment.<br />
                2.We are accessible for Overseas Transactions.
              </div>
            </div>
            <div class="verifyDiv">Please verify your details before proceeding</div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style>
.dropdownPackage {
  width: 500px;
  height: 38px;
  text-align: left;
}
.pregnantOption {
  margin-right: 20px;
  height: 36px;
}
.dropdown-container,
.firstName-container.surname-container,
.middle-container {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}
.p-inline-message .p-inline-message-text {
  font-size: 0.65rem;
}
.inline-message {
  text-align: left;
  margin-top: 5px;
  color: red;
}
.careOfSelfRoot2 {
  text-align: left;
}
.genderOption {
  height: 37px;
  width: 130px;
  margin-right: 50px;
  text-align: left;
}
.selfEmailOption {
  width: 450px;
}
.martialOption {
  height: 37px;
  width: 140px;
  margin-right: 5px;
  text-align: left;
}
.ml-2 {
  padding-left: 10px;
  display: flex;
  flex-direction: row;
}
.ckform {
  color: #44ab3a;
}
.ckform:hover {
  color: darkgreen;
  text-decoration: underline;
}
.cardbodyinfo {
  padding: 10px;
  text-align: left;
}
.agentInfoForm2 {
  padding-top: 25px;
  padding-left: 30px;
  padding-right: 30px;
  padding-bottom: 30px;
}
.agentInfoForm {
  margin-top: 40px;
  padding-left: 6px;
  padding-top: 6px;
  align-content: center;
  background-color: rgb(237, 234, 234);
  height: 35px;
}
.agent-bar {
  padding-top: 30px;
  padding-left: 30px;
  padding-right: 30px;
  padding-bottom: 30px;
  text-align: left;
}
.card-body1 {
  border: 0.5px solid rgb(232, 226, 226);
}
.card-agent {
  border: 0.5px solid rgb(232, 226, 226);
  margin-bottom: 10px;
}
.card-group {
  border: 0.5px solid rgb(232, 226, 226);
}
.card-header {
  text-align: left;
  padding-top: 12px;
  padding-left: 15px;
  background-color: rgb(223, 226, 228);
  border: 0.5px solid rgb(232, 226, 226);
}
.verifyDiv {
  height: 50px;
  text-align: left;
  align-content: center;
  padding-top: 10px;
  background-color: rgb(237, 234, 234);
  padding-left: 20px;
  border: 0.5px solid rgb(232, 226, 226);
}
.notediv {
  text-align: left;
  padding-left: 10px;
  height: 70px;
  margin-bottom: 34px;
}

.noteHeading {
  font-weight: bold;
}
.buttonCont {
  display: flex;
  justify-content: flex-end;
}
.buttonCont2 {
  background-color: #259d1a;
}
.buttonCont23 {
  color: rgb(244, 244, 248);
}
.checkboxdiv {
  padding-top: 5px;
  display: flex;
  flex-direction: row;
  justify-content: left;
  padding-bottom: 50px;
  margin-bottom: 30px;
}
.form2-mb2 {
  background-color: #deecdc;
  width: 1100px;
  height: 850px;
  padding-bottom: 20px;
}
.StateRoot {
  width: 240px;
  margin-right: 20px;
  text-align: left;
}
.AddressRoot {
  width: 350px;
  margin-right: 20px;
}
.PincodeRoot {
  width: 150px;
}
.CityRoot {
  width: 240px;
  margin-right: 20px;
  text-align: left;
}
.MobileNumber {
  display: flex;
  margin-bottom: 30px;
  padding-left: 20px;
}
.StateDiv {
  padding-left: 20px;
  display: flex;
  margin-bottom: 30px;
}
.PassportDiv,
.IMEclass {
  display: flex;
  padding-left: 20px;
  margin-bottom: 30px;
}
.State2,
.City2,
.Address2,
.Pincode2 {
  display: flex;
  flex-direction: column;
}
.PassportNo,
.PassportIssue,
.PassportExpiry,
.PhoneNo,
.IMEembassy,
.CovidDose,
.CovidDose2 {
  display: flex;
  flex-direction: column;
}
.PhoneNo2 {
  display: flex;
  flex-direction: column;
  margin-left: 20px;
}
.PassportrootNo {
  width: 498px;
  margin-right: 20px;
}
.PassportIssueRoot {
  width: 224px;
  margin-right: 20px;
}
.PassportExpiryRoot {
  width: 224px;
}
.IMEroot {
  width: 498px;
  margin-right: 20px;
}
.CovidDoseRoot {
  width: 224px;
  margin-right: 20px;
}
.CovidDose2Root {
  width: 224px;
}
.card-group {
  display: flex;
  flex-flow: row wrap;
}
label {
  text-align: left;
}
.nameself {
  text-align: left;
  padding-left: 20px;
  padding-top: 30px;
}
.red5 {
  display: flex;
  flex-direction: column;
  padding-left: 20px;
}
.selfBirth {
  display: flex;
  flex-direction: column;
  padding-left: 2px;
}
.careofSelf {
  display: flex;
  flex-direction: column;
}
.form2-mb {
  color: white;
  text-align: left;
  padding-left: 10px;
  background-color: #259d1a;
  height: 40px;
  padding-top: 7px;
  border-radius: 5px;
}

.form2-mb21 {
  display: flex;
  align-content: flex-start;
  margin-bottom: 20px;
  padding-left: 20px;
}

.required-asterisk {
  color: red;
  justify-content: left;
}

.agentInfoForm2 {
  display: flex;
  justify-content: space-between;
}
.selfInfoForm2 {
  display: flex;
  margin-bottom: 30px;
  padding-left: 20px;
}

.selfInfoGender,
.selfInfoMaritalStatus {
  display: flex;
  flex-direction: column;
  margin-right: 20px;
}
.selfInfoEmail {
  display: flex;
  flex-direction: column;
}
.agentInfoName,
.agentInfoEmail,
.agentInfoMobile {
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  width: 300px;
}
.titleOption {
  width: 150px;
  height: 36px;
  margin-right: 20px;
  text-align: left;
}
.border-teal-400 {
  margin-right: 20px;
}
.birthDate {
  width: 300px;
  margin-bottom: 30px;
  padding-left: 5px;
}
.careOfSelfRoot,
.careOfPerson {
  width: 400px;
  height: 38px;
  margin-right: 20px;
}
.careOfPerson {
  margin-left: 20px;
}
.form3 {
  display: flex;
  margin-bottom: 30px;
  padding-left: 20px;
  padding-left: 20px;
}
</style>
