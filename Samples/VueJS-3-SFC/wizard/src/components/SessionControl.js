/***************************************************************************
  SessionControl.js

  This file contains functions which are used for controlling the starting and stopping
  of the wizard session. It also contains the calls to the pad and screen definition
  functions in SigCaptX-Wizard-PadDefs.js

  Copyright (c) 2022 Wacom Co. Ltd. All rights reserved.

   v1.0

***************************************************************************/
import { callbackStatusOK, checkSizeSelection, LICENCEKEY, showSignature, SERVICEPORT, textSource, TIMEOUT, userMessage } from "./WizUtils.js";
import { STUPadDefs, ScreenDisplay1, ScreenDisplay2, ScreenDisplay3 } from "../../public/SigCaptX-Wizard-PadDefs.js";
import { WacomgssSignatureSDK } from "../../public/wgssSigCaptX.js";
import { step1 } from "../../public/SigCaptX-Wizard-Main.js";

let callbackFunction = null;
let bDisplayWizard = false;
let bLargeCheckBox = false;
let buttonTextSource = textSource.STANDARD;
let dynCapt = null;
let height = 0;
let pad = null;
let scriptIsRunning = false;
let sigCtl = null;
let width = 0;
let wizCtl = null;

export const timedDetect = () =>
{
  if (window.wgssSignatureSDK.running)
  {
    userMessage("Signature SDK Service detected.");
    start();
  }
  else
  {
    userMessage("Signature SDK Service not detected.");
  }
};

export const actionWhenRestarted = (callback) =>
{
  callbackFunction = callback;
  sigCtl = null;
  dynCapt = null;
  window.wgssSignatureSDK = null;

  const imageBox = document.getElementById("imageBox");

  if (imageBox != null)
  {
    if (imageBox.firstChild !== null)
    {
      imageBox.removeChild(imageBox.firstChild);
    }
  }
  window.timeout = setTimeout(timedDetect, TIMEOUT);

  // pass the starting service port  number as configured in the registry
  window.wgssSignatureSDK = new WacomgssSignatureSDK(onDetectRunning, SERVICEPORT);
};

export const onDetectRunning = () =>
{
  if (window.wgssSignatureSDK.running)
  {
    userMessage("Signature SDK Service detected.");
    clearTimeout(window.timeout);
    start();
  }
  else
  {
    userMessage("Signature SDK Service not detected.");
  }
};

export const start = () =>
{
  if (window.wgssSignatureSDK.running)
  {
    scriptIsRunning = true;
    userMessage("Checking components ...");
    sigCtl = new window.wgssSignatureSDK.SigCtl(onSigCtlConstructor);
  }
};

export const onSigCtlConstructor = (sigCtlV, status) =>
{
  if (callbackStatusOK("SigCtl constructor", status))
  {
    sigCtl.PutLicence(LICENCEKEY, onSigCtlPutLicence);
  }
};

export const onDynCaptConstructor = (dynCaptV, status) =>
{
  if (callbackStatusOK("DynCapt constructor", status))
  {
    sigCtl.GetSignature(onGetSignature);
  }
};

export const onSigCtlPutLicence = (sigCtlV, status) =>
{
  if (callbackStatusOK("SigCtl PutLicence", status))
  {
    dynCapt = new window.wgssSignatureSDK.DynamicCapture(onDynCaptConstructor);
  }
};

export const onGetSignature = (sigCtlV, sigObjV, status) =>
{
  if (callbackStatusOK("SigCapt GetSignature", status))
  {
    sigCtl.GetProperty("Component_FileVersion", onSigCtlGetFileVersion);
  }
};

export const onGetSigCaptXVersion = (version, status) =>
{
  if (callbackStatusOK("SigCaptX GetVersion", status))
  {
    userMessage("SigCaptX  v" + version);
    sigCtl.GetProperty("Component_FileVersion", onSigCtlGetFileVersion);
  }
};

export const onSigCtlGetFileVersion = (sigCtlV, property, status) =>
{
  if (callbackStatusOK("SigCtl GetProperty", status))
  {
    userMessage("DLL: flSigCOM.dll  v" + property.text);
    dynCapt.GetProperty("Component_FileVersion", onDynCaptGetFileVersion);
  }
};

export const onDynCaptGetFileVersion = (dynCaptV, property, status) =>
{
  if (callbackStatusOK("DynCapt GetProperty", status))
  {
    userMessage("DLL: flSigCapt.dll v" + property.text);
    userMessage("Test application ready.");
    userMessage("Press Start Wizard to start the wizard sequence.");

    if (typeof callbackFunction === "function")
    {
      callbackFunction();
    }
  }
};

// Function called to start off the wizard session
export const wizardStart = () =>
{
  if (!scriptIsRunning)
  {
    userMessage("Session error - script not running. Restarting the session.");
    actionWhenRestarted(wizardStart);
    return;
  }

  if (wizCtl !== null)
  {
    wizCtl.Close(onWizClose);
    return;
  }
  startwizard();
};

export const onWizClose = (wizCtlV, status) =>
{
  if (window.wgssSignatureSDK.ResponseStatus.INVALID_SESSION === status)
  {
    userMessage("Session error on close. Restarting the session.");
    actionWhenRestarted(wizardStart);
  }
  else
  {
    wizCtl = null;
    startwizard();
  }
};

export const startwizard = () =>
{
  scriptIsRunning = true;
  wizCtl = new window.wgssSignatureSDK.WizCtl(onwizCtlConstructor);
};

export const onwizCtlConstructor = (wizCtlV, status) =>
{
  if (window.wgssSignatureSDK.ResponseStatus.OK === status)
  {
    wizCtl.PutLicence(LICENCEKEY, onwizCtlPutLicence);
  }
  else
  {
    userMessage("wizCtl Constructor error: " + status);
    wizCtl = null;
    if (window.wgssSignatureSDK.ResponseStatus.INVALID_SESSION === status)
    {
      userMessage("Invalid session error - restarting the session.");
      actionWhenRestarted(wizardStart);
    }
  }
};

export const onwizCtlPutLicence = (sigCtlV, status) =>
{
  if (callbackStatusOK("wizCtl PutLicence", status) === true)
  {
    wizCtl.PutVisibleWindow(bDisplayWizard, onPutVisibleWindow);
  }
};

export const onPutVisibleWindow = (wizCtlV, status) =>
{
  if (callbackStatusOK("wizCtl PutVisibleWindow", status) === true)
  {
    wizCtl.PadConnect(onPadConnect);
  }
};

export const onPadConnect = (wizCtlV, connected, status) =>
{
  if (window.wgssSignatureSDK.ResponseStatus.OK === status && connected)
  {
    wizCtl.GetPadWidth(onGetPadWidth);
  }
  else
  {
    userMessage("Unable to make connection to the Pad. Check it is plugged in and try again.");
    wizCtl.Close(onErrorClose);
  }
};

export const onErrorClose = (wizCtlG, status) =>
{
  wizCtlG = null;
  wizCtl = null;
};

export const onGetPadWidth = (wizCtlV, padWidth, status) =>
{
  if (callbackStatusOK("wizCtl GetPadWidth", status) === true)
  {
    width = padWidth;
    wizCtl.GetPadHeight(onGetPadHeight);
  }
};

export const onGetPadHeight = (wizCtlV, padHeight, status) =>
{
  let chkBoxSize;

  // userMessage("Starting onGetPadHeight");

  if (window.wgssSignatureSDK.ResponseStatus.OK === status)
  {
    height = padHeight;

    /* If the user wants a large check box pass this as a parameter to CPad_STU in SigCaptX-Wizard-PadDefs.js */
    /* Note that this code is also used by the PIN pad sample which doesn't have the user options so make sure
      the tags exist first */

    if (bLargeCheckBox === true)
    {
      chkBoxSize = checkSizeSelection.LARGE;
    }
    else
    {
      chkBoxSize = checkSizeSelection.STANDARD;
    }

    pad = new STUPadDefs(width, height, chkBoxSize);

    /* Decide what parameter to pass to Screen1() in SigCaptX-WizardCheckbox-PadDefs.js
      This depends on what the user has selected on the HTML form. Make sure the tags exist first */

    if (document.getElementById("utf8") != null)
    {
      if (document.getElementById("utf8").checked)
      {
        buttonTextSource = textSource.UTF8;
      }
      else
      {
        if (document.getElementById("remote").checked)
        {
          buttonTextSource = textSource.REMOTE;
        }
        else
        {
          buttonTextSource = textSource.STANDARD;
        }
      }
    }
    const WizDisplay1 = new ScreenDisplay1(pad, buttonTextSource);
    const WizDisplay2 = new ScreenDisplay2(pad, buttonTextSource);
    const WizDisplay3 = new ScreenDisplay3(pad, buttonTextSource);

    step1(wizCtl, sigCtl, pad, WizDisplay1, WizDisplay2, WizDisplay3, buttonTextSource);
  }
  else
  {
    userMessage("wizCtl PutVisibleWindow error: " + status);
  }
};

export const startStop = (wizOptions, btnOptions) =>
{
  bDisplayWizard = wizOptions.displayWizard;
  bLargeCheckBox = wizOptions.largeCheckBox;

  if (btnOptions.standard)
  {
    buttonTextSource = textSource.STANDARD;
  }
  else
  {
    if (btnOptions.utf8)
    {
      buttonTextSource = textSource.UTF8;
    }
    else
    {
      buttonTextSource = textSource.REMOTE;
    }
  }
  wizardStart();
};

export const stop = (wizCtl) =>
{
  if (!scriptIsRunning)
  {
    userMessage("Script not running");
  }
  else
  {
    stopScript(wizCtl);
  }
};

export const scriptCompleted = (stopScriptNow, wizCtl) =>
{
  userMessage("Script completed");
  if (stopScriptNow)
  {
    stopScript(wizCtl);
  }
  else
  {
    showSignature(sigCtl, wizCtl);
  }
};

export const scriptCancelled = (wizCtl) =>
{
  userMessage("Script cancelled");
  stop(wizCtl);
};

// Function called to stop the wizard script
export const stopScript = (wizCtl) =>
{
  userMessage("Stopping script");
  scriptIsRunning = false;
  document.getElementById("btnStartStopWizard").value = "Start Wizard";
  if (wizCtl !== null)
  {
    wizCtl.Reset(onReset);
  }

  function onReset (wizCtlV, status)
  {
    if (callbackStatusOK("WizCtl Reset", status))
    {
      wizCtl.Close(onClose);
    }
  }

  function onClose (wizCtlV, status)
  {
    if (callbackStatusOK("WizCtl PadDisconnect", status))
    {
      wizCtl = null;
      userMessage("Pad disconnected");
    }
  }
};
