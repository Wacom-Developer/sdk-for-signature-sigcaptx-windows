/***************************************************************************
  demo-startsession.js
   
  Callback functions used for starting up the wizard session and 
  its connection to the tablet
  
  Copyright (c) 2023 Wacom Ltd. All rights reserved.
  
   v4.1
   
***************************************************************************/

function startSession(callBack)
{  
  // It's only at this point that we can work out which STU is being used by checking the width   
  // value returnedby GetPadWidth()
  function onGetPadWidth(wizCtlG, width, status)
  {
    if(status === wgssSignatureSDK.ResponseStatus.OK)
    {
	    var textSize;
	  
      padWidth = width;      
	    // Font sizes depend on the pad height and width
	    showMessage("Pad height and width: " + padHeight + " " + padWidth);
      
      // Define the various pad properties depending on its width
      setPadSpecificProperties(width);
      showMessage("Text size is " + pad.TextSize);
      
      setFont(wizCtlG, pad.Font, pad.TextSize, callBack);
    }
    else
    {
      showMessage("WizCtl GetPadWidth failed");
    }
  }
  
  function onGetPadHeight(wizCtlG, height, status)
  {
    if(status === wgssSignatureSDK.ResponseStatus.OK)
    {
      padHeight = height;
	    showMessage("WizCtl onGetPadHeight: " + padHeight);
      wizCtlG.GetPadWidth(onGetPadWidth);
    }
    else
    {
      showMessage("WizCtl onGetPadHeight failed");
    }
  }
  
  function onReset(wizCtlG, status)
  {
    var fontSize; 
	
    if(status === wgssSignatureSDK.ResponseStatus.OK)
    {
      showMessage("onReset");
      wizCtlG.GetPadHeight(onGetPadHeight);
    }
    else
    {
      showMessage("WizCtl Reset failed");
    }
  }
  
  function onClose(wizCtlG, status)
  {
    if(status === wgssSignatureSDK.ResponseStatus.OK)
    {
      showMessage("WizCtl window closed");
    }
    else
    {
      showMessage("WizCtl Close failed");
    }
  }

  function onPadConnect(wizCtlG, padConnect, status)
  {
    if(status === wgssSignatureSDK.ResponseStatus.OK && padConnect === true)
    {
      showMessage("WizCtl PadConnect");
      wizCtlG.Reset(onReset);
    }
    else
    {
      wizCtlG.Close(onClose);
      showMessage("WizCtl PadConnect failed with status " + status + " and padConnect " + padConnect);
    }
  }
  
  function onPutVisibleWindow(wizCtlG, status)
  {
    showMessage("Connecting to pad");
  
    if(status === wgssSignatureSDK.ResponseStatus.OK)
    {
      showMessage("onPutVisibleWindow");
      wizCtlG.PadConnect(onPadConnect);
    }
    else
    {
      showMessage("WizCtl PutVisibleWindow error");
    }
  }
  
  function onWizCtlPutLicence(wizCtlG, status)
  {
    if(status === wgssSignatureSDK.ResponseStatus.OK)
    {
      showMessage("WizCtl licence created");
      wizCtlG.PutVisibleWindow(true, onPutVisibleWindow);
    }
    else
    {
      showMessage("WizCtl licensing error");
    }
  }
  
  function onCreateWizCtl(wizCtlG, status)
  {
    if(status === wgssSignatureSDK.ResponseStatus.OK)
    {
      showMessage("WizCtl created");
      wizCtlG.PutLicence(LICENCEKEY, onWizCtlPutLicence);
    }
    else
    {
      showMessage("Error creating WizCtl");
    }
  }
  
  function onSigCtlPutLicence(sigCtlV, status) 
  {
    if (status === wgssSignatureSDK.ResponseStatus.OK) 
    {
      this.wizCtl = new wgssSignatureSDK.WizCtl(onCreateWizCtl);
    }
    else 
    {
      showMessage("SigCtl licensing error: " + status);
    }
  }
  
  function onCreateSigCtl(sigCtlG, status)
  {
    if(status === wgssSignatureSDK.ResponseStatus.OK)
    {
      showMessage("SigCtl created");
      pad = new setPadDefaultProperties();  // Set up default fonts etc
      sigCtlG.PutLicence(LICENCEKEY, onSigCtlPutLicence);
    }
    else
    {
      showMessage("Error creating SigCtl");
      if(wgssSignatureSDK.ResponseStatus.INVALID_SESSION == status)
      {
        restartSession(wizCapture);
      }
    }
  }

  if (wgssSignatureSDK.running) 
  {
    if(sigImageBox === null) 
    {
      sigImageBox = document.getElementById("imageBox");
      // showMessage("sigImageBox: " + sigImageBox);
    }
    sigCtl = new wgssSignatureSDK.SigCtl(onCreateSigCtl);
  }
}