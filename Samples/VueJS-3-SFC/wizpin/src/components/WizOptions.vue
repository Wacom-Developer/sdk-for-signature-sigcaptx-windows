/***************************************************************************
  WizOptions.vue

  This file contains the VUE template for the checkbox option which
  the user can select to control whether the wizard control window
  is shown on the PC monitor

  Copyright (c) 2022 Wacom Co. Ltd. All rights reserved.

   v1.0

***************************************************************************/
<script>
export default
{
  data ()
  {
    return {
      displayWizard: true
    };
  }
};
</script>

<template>
    <b>Options: </b>
    <input type="checkbox" id="chkDisplayWizard" checked="checked" v-model="displayWizard"/>Display Wizard Control Window
</template>
