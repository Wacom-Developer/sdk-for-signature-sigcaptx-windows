/* ********************************************************************************
   SigText.vue

   This contains the VUE template for the text box which is used to display
   the SigText value after the signature has been captured (if required)

   Copyright (c) 2022 Wacom Co. Ltd.

***********************************************************************************/
<script>
export default
{
  data ()
  {
    return {
      signatureText: ""
    };
  },
  props:
  {
    triggerProp: Boolean,
    sigText: String
  },
  methods:
  {
    setSigText (txt)
    {
      this.signatureText = txt;
    }
  },
  watch:
  {
    triggerProp: function (newVal, oldVal)
    {
      // console.log("sigTrigger has been triggered " + newVal + " " + oldVal);
      this.setSigText(this.sigText);
    }
  }
};
</script>
<template>
    <br/>SigText:<br/>
    <textarea cols="125" rows="15" id="txtSignature" v-model="signatureText"></textarea>
</template>
