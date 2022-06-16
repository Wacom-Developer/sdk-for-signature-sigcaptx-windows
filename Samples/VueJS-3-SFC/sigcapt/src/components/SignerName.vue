/* ********************************************************************************
   SignerName.vue

   This contains the VUE template for the signatory names - first and last

   Copyright (c) 2022 Wacom Co. Ltd.

***********************************************************************************/
<script>
export default
{
  data ()
  {
    return {
      fname: "John",
      lname: "Smith"
    };
  }
};
</script>
<template>
    <table style="padding: 10px 20px;">
    <tr>
    <td>Data included in the hash:</td>
    </tr>
    <tr>
        <td>
        First name: <input type="text" id="fname" v-model="fname"/>
        </td>
        <td>
        Last name: <input type="text" id="lname" v-model="lname"/>
        </td>
    </tr>
    </table>
</template>
