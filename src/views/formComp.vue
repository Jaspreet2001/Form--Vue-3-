<script setup>
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
<b class="text-danger">NOTE:Information should be same as on passport</b>
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
                                <input type="radio" name="userType" value="self" checked>
                                Self
                            </label>
                    
                            <label class="radio2">
                                <input type="radio" name="userType" value="agent">
                                Agent
                            </label>
                        </div>

                     </div>

                    </div>


                </div>
            </div>
        </div>
        <div class="form2-mb">
           <header role="tab" class="card-header p-1"><button id="toggleButton0" type="button" class="btn text-left btn-warning btn-block collapsed" aria-expanded="false" aria-controls="collapse-0" style="overflow-anchor: none;"><label class="addPrimaryText">Applicant's Info Form: </label></button></header>
           <div id="collapse-0" class="mt-2 collapse show"></div>
        
    </div>
</div>
    </form>

      </div>
    </div>
</div>

</template>
<style>
.card-group{
    display:flex;
    flex-flow:row wrap;
}
</style>