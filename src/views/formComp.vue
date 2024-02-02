<script setup>
import { ref, watch } from 'vue';

const userType = ref('self');
const birthDate = ref();
const today = new Date();
const careOf = ref();
const careOfPerson = ref('');
const careOfs = ref([
    { name: 'Father', label: "Father's Name" },
    { name: 'Mother', label: "Mother's Name" },
    { name: 'Spouse', label: "Spouse's Name" }
]);

function handleUserTypeChange(value) {
  userType.value = value;
}

const isDateBeforeToday = (date) => {
  const selectedDate = new Date(date);
  const todayWithoutTime = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  return selectedDate < todayWithoutTime;
};

watch(birthDate, (newDate) => {
  if (!isDateBeforeToday(newDate)) {
    birthDate.value = null; 
  }
});

</script>
<template>
    <div class="card-group">
      <div class="card mb-5">
        <div class="card-header">
          Visa Medical Form
        </div>
        <div class="card-body">
          <p id="scrollHere" class="card-text pb-2 pt-2" style="border-top: 1px dashed rgb(195,195,195);
          border-bottom:1px dashed rgb(195,195,195);">
            <b class="text-danger">NOTE: Information should be the same as on the passport</b>
            <br>
            Mandatory fields are marked with
            <span style="color:red;">*</span>
          </p>
          <form class="text-left">
            <div role="tablist" class="accordion">
              <div class="card agent">
                <div class="card-body">
                  <div class="row mb-1">
                    <div class="col-md-12">
                      <div class="agent-bar">
                        <div class="agent-bar1">Filling this form as ?</div>
                        <div class="row mx-2">
                          <label class="radio1">
                            <input type="radio" name="userType" value="self" v-model="userType" @change="handleUserTypeChange('self')">
                            Self
                          </label>
                          <label class="radio2">
                            <input type="radio" name="userType" value="agent" v-model="userType" @change="handleUserTypeChange('agent')">
                            Agent
                          </label>
                        </div>
                        <hr>
                        <br>
                        <div v-if="userType === 'agent'" class="agentInfoFormSelect">
                          <div class="agentInfoForm">Agent Info Form</div>
                          <hr>
                          <div class="agentInfoForm2">
                            <div class="agentInfoName">
                              <label for="Name">Name<span class="required-asterisk">*</span>:</label>
                              <InputText
                                v-model="agentName"
                                type="text"
                                placeholder="Name"
                                :pt="{ root: { class: 'agentName' } }"
                              />
                            </div>
                            <div class="agentInfoEmail">
                              <label for="Email">Email<span class="required-asterisk">*</span>:</label>
                              <InputText
                                v-model="agentEmail"
                                type="text"
                                placeholder="Email"
                                :pt="{ root: { class: 'agentEmail' } }"
                              />
                            </div>
                            <div class="agentInfoMobile">
                              <label for="MobileNo">Mobile No.<span class="required-asterisk">*</span>:</label>
                              <InputText
                                v-model="agentMobile"
                                type="text"
                                placeholder="Mobile Number"
                                :pt="{ root: { class: 'agentMobile' } }"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="form2-mb">
                Primary Applicant's Info Form:
              </div>
              <div class="form2-mb2">
                <div class="nameself">Name<span class="required-asterisk">*</span>:</div>
                <div class="form2-mb21">
                  <InputText
                    v-model="name12"
                    type="text"
                    placeholder=""
                    :pt="{ root: { class: 'border-teal-400' } }"
                  />
                  <InputText
                    v-model="firstName"
                    type="text"
                    placeholder="First Name"
                    :pt="{ root: { class: 'border-teal-400' } }"
                  />
                  <InputText
                    v-model="MiddleName"
                    type="text"
                    placeholder="Middle Name"
                    :pt="{ root: { class: 'border-teal-400' } }"
                  />
                  <InputText
                    v-model="Surname"
                    type="text"
                    placeholder="Surname"
                    :pt="{ root: { class: 'border-teal-400' } }"
                  />
                </div>
                <div class="selfInfoForm2">
                  <div class="selfInfoGender">
                    <label for="Gender">Gender<span class="required-asterisk">*</span>:</label>
                    <InputText
                      v-model="selfGender"
                      type="text"
                      placeholder=""
                      :pt="{ root: { class: 'selfGender' } }"
                    />
                  </div>
                  <div class="selfInfoMaritalStatus">
                    <label for="MaritalStatus">Marital Status<span class="required-asterisk">*</span>:</label>
                    <InputText
                      v-model="selfMaritalStatus"
                      type="text"
                      placeholder=""
                      :pt="{ root: { class: 'selfMaritalStatus' } }"
                    />
                  </div>
                  <div class="selfInfoEmail">
                    <label for="Email">Email<span class="required-asterisk">*</span>:</label>
                    <InputText
                      v-model="selfEmail"
                      type="text"
                      placeholder="Email"
                      :pt="{ root: { class: 'selfEmail' } }"
                    />
                  </div>
                </div>
                <div class="selfBirth">
                  <label for="DateBirth">Date of Birth<span class="required-asterisk">*</span>:</label>
                  <CalendarDate v-model="birthDate" dateFormat="yy-mm-dd" :manualInput="false" 
                  :pt="{
                      input: { class: 'w-16rem' },
                      root: { class: 'birthDate' }
                  }"
                  />
                </div>
                <div class="form3">
                  <div class="careofSelf">
                    <label for="careof">Care Of<span class="required-asterisk">*</span>:</label>
                    <DropdownBar
                      v-model="careOf"
                      :options="careOfs"
                      optionLabel="name"
                      placeholder=""
                      :pt="{
                        root: { class: 'careOfSelfRoot' },
                        item: ({ props, state, context }) => ({
                          class: context.selected ? 'bg-primary' : context.focused ? 'bg-blue-100' : undefined
                        })
                      }"
                    />
                  </div>
                  <div  class="red5" v-if="careOf">
                    <label for="careOfPerson">{{ careOf.label }}<span class="required-asterisk">*</span>:</label>
                    <InputText
                      v-model="careOfPerson"
                      type="text"
                      :placeholder="`${careOf.label}`"
                      :pt="{ root: { class: 'careofPerson' } }"
                    />
                  </div>
                </div>
          <div class="PassportDiv">
            <div class="PassportNo">
                <label for="PassportNo">Passport No.<span class="required-asterisk">*</span>:</label>
                <InputText
                  v-model="PassportNo"
                  type="text"
                  placeholder="PASSPORT NUMBER [*UNEDITABLE]"
                  :pt="{ root: { class: 'PassportrootNo' } }"
                />   
            </div>
            <div class="PassportIssue">
                <label for="PassportIssue">Passport Issue<span class="required-asterisk">*</span>:</label>
                <CalendarDate v-model="PassportIssue" dateFormat="yy/mm/dd"  
                :pt="{
                    input: { class: 'w-16rem' },
                    root: { class: 'PassportIssueRoot' }
                }"
                />   
            </div>
            <div class="PassportExpiry">
                <label for="PassportExpiry">Passport Expiry<span class="required-asterisk">*</span>:</label>
                <CalendarDate v-model="PassportExpiry" dateFormat="yy/mm/dd"  
                :pt="{
                    input: { class: 'w-16rem' },
                    root: { class: 'PassportExpiryRoot' }
                }"
                />   
            </div>
          </div>
    



              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
<style>
.PassportDiv{
    display:flex;
    margin-bottom:30px;
}
.PassportNo,.PassportIssue,.PassportExpiry{
    display: flex;
    flex-direction: column;
}
.PassportrootNo{
    width:498px;
    margin-right: 20px;
   
}
.PassportIssueRoot{
    width:224px;
    margin-right: 20px;
   
}
.PassportExpiryRoot{
width:224px;

}
.card-group {
  display: flex;
  flex-flow: row wrap;
}
label{
    text-align: left;
}
.nameself{
    text-align: left;

}
.selfBirth,.careofSelf,.red5{
    display: flex;
    flex-direction: column;
}
.form2-mb {
  color: white;
  background-color: #259d1a;
  height: 40px;
  padding-top: 7px;
  border-radius: 5px;
}

.form2-mb21 {
  display: flex;
  align-content: flex-start;
  margin-bottom: 20px;
}

.required-asterisk {
  color: red;
  justify-content: left;
}

.agentInfoForm2{
  display: flex;
  justify-content: space-between;
}
.selfInfoForm2 {
display: flex;
margin-bottom: 30px;
}


.selfInfoGender,.selfInfoMaritalStatus{
    display: flex;
    flex-direction: column;
    margin-right: 20px;
}
.selfInfoEmail{
    display: flex;
    flex-direction: column;
}
.agentInfoName,
.agentInfoEmail,
.agentInfoMobile {
  display: flex;
  flex-direction: column;
  margin-left: 20px;
}

.border-teal-400 {
  margin-right: 20px;
}
.birthDate{
    width:300px;
    margin-bottom: 30px;

}
.careOfSelfRoot,.careOfPerson{
    width:400px;
    height:38px;
    margin-right:20px;
    
}
.careOfPerson{
    margin-left:20px;
}
.form3{
    display: flex;
    margin-bottom: 30px;

}
</style>


