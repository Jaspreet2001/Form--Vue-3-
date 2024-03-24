<script setup>
import { ref, onMounted } from 'vue';
  
  const obj= ref({});
  
  onMounted(() => {
    obj.value = JSON.parse(localStorage.getItem('My object')) || {};
  });
  </script>

  <template>
    <div class="card-group">
      <div class="card mb-5">
        <div class="card-header" style="height:50px">
            Visa Medical Form Summary
        </div>
        <br>
        <div class="card-body">
  
    <form class="text-left">
      <div role="tablist" class="accordion">

            </div>
          
        
        <div class="form2-mb">
         {{obj.titleName}} {{ obj.firstName }}'s Info :
         
        </div>
        <div class="form2-mb2">
              <div class="grid-container">
                <div v-for="(value, field) in obj" :key="field" class="grid-item">
                  <div class="field">{{ field }}</div>
                  
                  <div class="value">{{ value }}</div>
                
                </div>
                <hr>
              </div>

         </div>
    </form>
    <div class="amountPaid">Total Amount to be Paid:Rs 1900</div>
    <div class="Editing-Cont">
        <div class="Editing1">Go and Edit</div>
       <div class="Editing2"><button class="payment">Pay Using Payment Gateway1</button></div> 
    </div>
    <div class="verifyDiv">Please verify your details before proceeding</div>
  
</div>
</div>
</div>
</template>

<style>
.Editing2 {
    margin-left: auto;
    
}
.Editing1{
    margin-left: 720px;
    padding-top:10px;
}

.grid-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }
  
  .grid-item {
    font-size:15px;
    margin-right:20px;
    width: 100%;
    display: flex;
    justify-content:10px space-between;
    align-items: center;
    padding-top:10px;
   
    padding-right:20px;
    padding-left:20px;
    border-top: 1px solid #ccc;
    margin-bottom: 5px;
  }
  
  .field {
    flex: 1;
    text-align: left;
  }
  
  .value {
    flex: 1;
    text-align: right;
  }
.Editing-Cont{
    margin-top:30px;
    margin-bottom:30px;
    display: flex;
   text-align:right;
    gap: 10px;
    
}


button {
    background-color:green;
    color:white;
    
    
}
button:hover{
    background-color:rgb(4, 88, 4);
}
.Editing-Cont{
    display:flex;
    flex-direction:row;
    text-align:right;
}
.cardbodyinfo{
padding:10px;
text-align:left;
}

.card-body1{
border:0.5px solid rgb(232, 226, 226);
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

.form2-mb2{
background-color: #deecdc;
width:1100px;
height:850px;
padding-bottom:20px;
padding-top:20px;
}

.card-group {
display: flex;
flex-flow: row wrap;
}
label{
text-align: left;
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

.amountPaid {
    color: white;
    text-align:right;
    padding-left:10px;
    background-color: #96d090;
    height: 40px;
    padding-top: 7px;
    padding-right:20px;
    border-radius: 5px;
    margin-top:20px;
    margin-bottom:10px;
    }
.form2-mb21 {
display: flex;
align-content: flex-start;
margin-bottom: 20px;
padding-left: 20px;
}

.border-teal-400 {
margin-right: 20px;
}

.verifyDiv{
    height:50px;
   text-align: left;
   align-content: center;
   padding-top: 10px;
    background-color: rgb(237, 234, 234);
    padding-left:20px;
   border:0.5px solid rgb(232, 226, 226);
   margin-top:20px;
}

.form3{
display: flex;
margin-bottom: 30px;
padding-left: 20px;
padding-left: 20px;
}
</style>


*/