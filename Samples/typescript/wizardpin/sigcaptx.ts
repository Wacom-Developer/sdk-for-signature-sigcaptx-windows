/***************************************************************************
  sigcaptx.ts
   
  This is the main control file for starting up the wizard sample
  
  Copyright (c) 2021 Wacom Co. Ltd. All rights reserved.
  
   v1.0
  
***************************************************************************/
import { WizardEventController } from './SigCaptX-WizSessionCtrl';

// Declare event handlers for the buttons on the HTML form
const btnStartStopWizard = document.getElementById("btnStartStopWizard");
btnStartStopWizard.addEventListener("click", handleStartStop);

function handleStartStop(this:HTMLElement)
{
  console.log("Start/stop clicked!");
  WizardEventController.start_stop(1);
}

// Now start up the wizard script
WizardEventController.body_onload();
