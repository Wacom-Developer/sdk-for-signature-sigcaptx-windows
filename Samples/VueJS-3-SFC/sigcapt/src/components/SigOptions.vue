/* ********************************************************************************
   SigOptions.vue

   This contains the VUE template for the checkbox options to output the B64 image
   and the SigText value to the screen after capturing the signature

   Copyright (c) 2022 Wacom Co. Ltd.

***********************************************************************************/
<script>
export default
{
  data ()
  {
    return {
      useB64Image: 0
    };
  }
};
</script>

<template>
    <h3>Options</h3>
    <input type="checkbox" id="chkUseB64Image" v-model="useB64Image"/>Use base-64 signature image
    <input type="checkbox" id="chkShowSigText" @click="$emit('showSigText')"/>Output SigText to form
</template>
