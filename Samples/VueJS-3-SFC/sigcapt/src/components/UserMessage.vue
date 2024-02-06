/* ********************************************************************************
   UserMessage.vue

   This contains the VUE template for the user message box which is used to show
   status messages to the user as the code progresses

   Copyright (c) 2022 Wacom Co. Ltd.

***********************************************************************************/
<script>
export default
{
  data ()
  {
    return {
      userMsgs: ""
    };
  },
  props:
  {
    messageProp: Boolean,
    messageText: String
  },
  methods:
  {
    setUserMessage (txt)
    {
      this.userMsgs = txt;
    }
  },
  watch:
  {
    messageProp: function (newVal, oldVal)
    {
      // console.log("UserMessage has been triggered " + newVal + " " + oldVal);
      this.setUserMessage(this.messageText);
    }
  }
};
</script>

<template>
    <br/><br/>
    <textarea cols="125" rows="30" id="txtDisplay" v-model="userMsgs"></textarea>
</template>
