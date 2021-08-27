/***************************************************************************
  sigcaptx.ts
   
  This is the main control file for starting up the wizard sample
  
  Copyright (c) 2021 Wacom Co. Ltd. All rights reserved.
  
   v1.0
  
***************************************************************************/
import { HTMLIds } from './SigCaptX-Globals';
import { WizardEventController } from './SigCaptX-WizSessionCtrl';

// Set up global variables referencing the HTML elements needed later
export const HTMLTags = new HTMLIds();

// Declare event handlers for the buttons on the HTML form
HTMLTags.btnStartStop.addEventListener("click", handleStartStop);

function handleStartStop(this:HTMLElement)
{
  console.log("Start/stop clicked!");
  WizardEventController.start_stop(3);
}


// Now start up the wizard script
WizardEventController.body_onload();
