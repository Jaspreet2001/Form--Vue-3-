/* eslint rule disable"*/
<script setup>
import { ref } from 'vue';

const userType = ref(null);
const birthDate = ref(null);
const today = ref(new Date());
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

</script>
<template>
    <div class="card-group">
      <div class="card mb-5">
        <div class="card-header" style="height:50px">
          Visa Medical Form
        </div>
        <div class="card-body">
          <p
id="scrollHere" class="cardbodyinfo" style="border-top: 1px dashed rgb(195,195,195);
          border-bottom:1px dashed rgb(195,195,195);">
            <b class="text-danger" style="color:rgb(209, 42, 42);">NOTE: Information should be the same as on the passport</b>
            <br>
            Mandatory fields are marked with
            <span style="color:red;">*</span>
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
                            <input v-model="userType" type="radio" name="userType" value="self" @change="handleUserTypeChange('self')">
                            Self
                          </label>
                          <label class="radio2">
                            <input v-model="userType" type="radio" name="userType" value="agent" @change="handleUserTypeChange('agent')">
                            Agent
                          </label>
                        </div>
                        <br>
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
                {{ birthDate }}
                <div class="selfBirth">
                  <label for="DateBirth">Date of Birth<span class="required-asterisk">*</span>:</label>
                  <CalendarDate
v-model="birthDate" :max-date="today" show-icon date-format="yy-mm-dd" :manual-input="false" 
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
                      option-label="name"
                      placeholder=""
                      :pt="{
                        root: { class: 'careOfSelfRoot' },
                        input:{class:'careOfSelfRoot2'},
                        item: ({ props, state, context }) => ({
                          class: context.selected ? 'bg-primary' : context.focused ? 'bg-blue-100' : undefined
                        })
                      }"
                    />
                  </div>
                  <div  v-if="careOf" class="red5">
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
                <CalendarDate
v-model="PassportIssue" date-format="yy/mm/dd"  
                :pt="{
                    input: { class: 'w-16rem' },
                    root: { class: 'PassportIssueRoot' }
                }"
                />   
            </div>
            <div class="PassportExpiry">
                <label for="PassportExpiry">Passport Expiry<span class="required-asterisk">*</span>:</label>
                <CalendarDate
v-model="PassportExpiry" date-format="yy/mm/dd"  
                :pt="{
                    input: { class: 'w-16rem' },
                    root: { class: 'PassportExpiryRoot' }
                }"
                />   
            </div>
          </div>
               <div class="MobileNumber">
                <div class="PhoneNo">
                    <label for="PhoneNo">Mobile No.<span class="required-asterisk">*</span>:</label>
                    <InputText
                      v-model="PassportNo"
                      type="text"
                      placeholder="Mobile Number"
                      :pt="{ root: { class: 'PassportrootNo' } }"
                    />   
                </div>
                <div class="PhoneNo2">
                    <label for="PassportNo">Alternate No.<span class="required-asterisk">*</span>:</label>
                    <InputText
                      v-model="PassportNo"
                      type="text"
                      placeholder="Alt.Mobile Number"
                      :pt="{ root: { class: 'PassportrootNo' } }"
                    />   
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
v-model="CovidDoseDate1" date-format="yy/mm/dd"  
                    :pt="{
                        input: { class: 'w-16rem' },
                        root: { class: 'CovidDoseRoot' }
                    }"
                    />   
                </div>
                <div class="CovidDose2">
                    <label for="PassportExpiry">2nd Dose COVID Vaccine Date:</label>
                    <CalendarDate
v-model="CovidDoseDate2" date-format="yy/mm/dd"  
                    :pt="{
                        input: { class: 'w-16rem' },
                        root: { class: 'CovidDose2Root' }
                    }"
                    />   
                </div>
              </div>
                <div class="StateDiv">
                    <div class="State2">
                        <label for="Address">State<span class="required-asterisk">*</span>:</label>
                        <InputText
                          v-model="StateData"
                          type="text"
                         
                          :pt="{ root: { class: 'StateRoot' } }"
                        />
                    </div>
                    <div class="City2">
                        <label for="Address">City<span class="required-asterisk">*</span>:</label>
                        <InputText
                          v-model="CityData"
                          type="text"
                          
                          :pt="{ root: { class: 'CityRoot' } }"
                        />
                    </div>
                    <div class="Address2">
                        <label for="Address">Address<span class="required-asterisk">*</span>:</label>
                        <InputText
                          v-model="AddressData"
                          type="text"
                          :placeholder="Address"
                          :pt="{ root: { class: 'AddressRoot' } }"
                        />
                    </div>
                    <div class="Pincode2">
                        <label for="PinCode">PinCode<span class="required-asterisk">*</span>:</label>
                        <InputText
                          v-model="PinCodeData"
                          type="text"
                          :placeholder="Pincode"
                          :pt="{ root: { class: 'PincodeRoot' } }"
                        />
                    </div>
                </div>
            </div>
            <div class="checkboxdiv">
                <CheckboxDiv v-model="checkbox" input-id="checkboxinput" name="checkboxterm" value="CheckBoxTerm" />
               <label for="Checkbox1" class="ml-2"><div class="red45">Terms and Conditions</div> <div class="ckform">(* Our Terms and Conditions have changed please read carefully before proceeding)</div></label>
            </div> 
            <div class="buttonCont">
                <!-- <Button label="Next"
                :pt="{ 
                    root:{class:buttonCont2},
                    label: { class: 'buttonCont23' } 
                }" 
                >Next</Button> -->
                <button
class="buttonGreen" style="background-color: rgb(23, 178, 23);
                color: white; width:100px ; border-radius:2px; ">
                    Next
                </button>
            </div>
            <div class="notediv">
                <div class="noteHeading">Note:</div>
                <div class="notePart">
                    1.Your appointment will only be booked after successful payment.<br>
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
.careOfSelfRoot2{
    text-align: left;
}
.ml-2{
    padding-left:10px;
    display: flex;
    flex-direction: row;
}
.ckform{
    color: #44ab3a;
}
.ckform:hover{
    color:darkgreen;
    text-decoration: underline;
}
.cardbodyinfo{
    padding:10px;
    text-align:left;
}
.agentInfoForm2{
    padding-top: 25px;
    padding-left: 30px;
    padding-right: 30px;
    padding-bottom: 30px;
}
.agentInfoForm{
    margin-top: 40px;
    padding-left:6px;
    padding-top: 6px;
align-content: center;
 background-color: rgb(237, 234, 234);
 height:35px;
}
.agent-bar{
    padding-top: 30px;
    padding-left: 30px;
    padding-right: 30px;
    padding-bottom: 30px;
    text-align: left;
}
.card-body1{
    border:0.5px solid rgb(232, 226, 226);
}
.card-agent{
    border:0.5px solid rgb(232, 226, 226);
    margin-bottom:10px;
}
.card-group{
    border:0.5px solid rgb(232, 226, 226);
}
.card-header{
    text-align: left;
    padding-top: 12px;
    padding-left:15px;
    background-color: rgb(223, 226, 228);
    border:0.5px solid rgb(232, 226, 226)
}
.verifyDiv{
    height:50px;
   text-align: left;
   align-content: center;
   padding-top: 10px;
    background-color: rgb(237, 234, 234);
    padding-left:20px;
   border:0.5px solid rgb(232, 226, 226);
}
.notediv {
    text-align: left;
    padding-left: 10px;
    height:70px;
    margin-bottom: 34px;
}

.noteHeading {
    font-weight: bold;
}
.buttonCont{
    display: flex;
    justify-content: flex-end;
}
.buttonCont2{
    background-color: #259d1a;
}
.buttonCont23{
    color:rgb(244, 244, 248);
   
 
}
.checkboxdiv{
    padding-top:5px;
    display:flex;
    flex-direction:row;
    justify-content: left;
    padding-bottom:50px;
    margin-bottom: 30px;
}
.form2-mb2{
    background-color: #deecdc;
    width:1100px;
    height:780px;
    padding-bottom:20px;
}
.StateRoot{
    width:240px;
    margin-right: 20px;
}
.AddressRoot{
    width:350px;
    margin-right: 20px;
}
.PincodeRoot{
    width:150px;
}
.CityRoot{
    width:240px;
    margin-right: 20px;
}
.MobileNumber{
    display: flex;
    margin-bottom:30px;
    padding-left: 20px;
}
.StateDiv{
    padding-left: 20px;
    display: flex;
    margin-bottom:30px;
}
.PassportDiv,.IMEclass{
    display:flex;padding-left: 20px;
    margin-bottom:30px;
}
.State2,.City2,.Address2,.Pincode2{
    display: flex;
    flex-direction: column;
}
.PassportNo,.PassportIssue,.PassportExpiry,.PhoneNo,.PhoneNo2,.IMEembassy,.CovidDose,.CovidDose2{
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
.IMEroot{
    width:498px;
    margin-right: 20px; 
}
.CovidDoseRoot{
    width:224px;
    margin-right: 20px;
}
.CovidDose2Root{
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
    padding-left: 20px;
   padding-top:30px;

}
.selfBirth,.red5{
    display: flex;
    flex-direction: column;
    padding-left: 20px;
}
.careofSelf{
    display: flex;
    flex-direction: column;
}
.form2-mb {
  color: white;
  text-align:left;
  padding-left:10px;
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

.agentInfoForm2{
  display: flex;
  justify-content: space-between;
}
.selfInfoForm2 {
    display: flex;
    margin-bottom: 30px;
    padding-left: 20px;
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
  width:300px;
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
    padding-left: 20px;
    padding-left: 20px;
}
</style>


