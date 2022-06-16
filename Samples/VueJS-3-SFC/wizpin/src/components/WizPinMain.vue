/***************************************************************************
  WizPinMain.vue

  This file contains the main framework definition for the HTML form plus
  some short routines used for starting off the sample.

  Copyright (c) 2022 Wacom Co. Ltd. All rights reserved.

   v1.0

***************************************************************************/
<script>
/* eslint quotes: ["error", "double"] */
/* eslint semi: ["error", "always"] */
/* eslint brace-style: ["error", "allman"] */

import { actionWhenRestarted, startStop } from "./SessionControl.js";
import WizOptions from "./WizOptions.vue";
import { userMessage } from "./WizUtils.js";

export default {
  components: {
    WizOptions
  },
  methods:
  {
    bodyonload: function ()
    {
      userMessage(" "); // Clear the user message text box
      actionWhenRestarted();
    },
    startWiz: function ()
    {
      startStop(this.$refs.wizoptions);
    }
  },
  mounted ()
  {
    this.bodyonload();
  }
};
</script>

<template>
  <div style="width:100%">
    <br/>
    <input type="button" id="btnStartStopWizard" value="Start Wizard" style="width:35mm" @click="startWiz" title="Starts/Stops a Wizard Script" />
    <br/>
    <br/>
    <WizOptions ref="wizoptions"/>
    <br/><br/>
    <textarea cols="80" rows="40" id="txtDisplay"></textarea>
  </div>
</template>
