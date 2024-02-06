/***************************************************************************
  WizOptions.vue

  This file contains the VUE template for the 3 checkbox options which
  the use can select to control whether the wizard control window
  is shown on the PC monitor, whether a standard or large size is used
  for the checkbox on the first screen of the wizard and whether the
  SigText value will be extracted and displayed on the HTML form at the end

  Copyright (c) 2022 Wacom Co. Ltd. All rights reserved.

   v1.0

***************************************************************************/
<script>
export default
{
  data ()
  {
    return {
      displayWizard: true,
      largeCheckBox: false,
      showSigText: false
    };
  }
};
</script>

<template>
    <h3>Options</h3>
    <input type="checkbox" id="chkDisplayWizard" checked="checked" v-model="displayWizard"/>Display Wizard Control Window
    <input type="checkbox" id="chkLargeCheckbox" v-model="largeCheckBox"/>Large size checkbox
    <input type="checkbox" id="chkSigText" v-model="showSigText"/>Output sigtext to browser text window
</template>
