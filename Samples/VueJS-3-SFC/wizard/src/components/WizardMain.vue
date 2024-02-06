/***************************************************************************
  WizardMain.vue

  This file contains the basic framework definition for the HTML form plus
  a few functions which are used to start the sample going

  Copyright (c) 2022 Wacom Co. Ltd. All rights reserved.

   v1.0

***************************************************************************/
<script>
/* eslint quotes: ["error", "double"] */
/* eslint semi: ["error", "always"] */
/* eslint brace-style: ["error", "allman"] */

import { actionWhenRestarted, startStop } from "./SessionControl.js";
import ButtonOptions from "./ButtonOptions.vue";
import WizOptions from "./WizOptions.vue";
import { userMessage } from "./WizUtils.js";

export default {
  components: {
    ButtonOptions,
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
      startStop(this.$refs.wizoptions, this.$refs.btnoptions);
    }
  },
  mounted ()
  {
    this.bodyonload();
  }
};
</script>

<template>
  <div style="width: 100%">
    <table cellspacing="10">
      <tr>
        <td rowspan="2">
          <div id="imageBox" class="boxed" style="height: 70mm; width: 120mm; border: 1px solid #d3d3d3"></div>
        </td>
        <td>
          <input type="button" id="btnStartStopWizard" value="Start Wizard" style="width: 35mm" @click="startWiz" title="Starts/Stops a Wizard Script"/>
        </td>
      </tr>
    </table>

    <WizOptions ref="wizoptions"/>
    <ButtonOptions ref="btnoptions"/>

    <br/><br/>
    <textarea cols="125" rows="30" id="txtDisplay"></textarea>
  </div>
</template>
