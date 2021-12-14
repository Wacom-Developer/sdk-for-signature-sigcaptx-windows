/* **************************************************************************
  SigCaptX-WizardPINPad-PadDefs.js
   
  This file contains the functions which define the properties of the pad 
  and the objects which are to be displayed on the PIN pad screen.
  The object classes are defined in SigCaptX-Globals.js
  
  Copyright (c) 2021 Wacom Co. Ltd. All rights reserved.
  
   v4.0
  
***************************************************************************/

class stuProperties
{
	constructor(padWidth, padHeight)
	{
	  this.font = "Verdana";
	  this.height = padHeight;
	  this.titleBold = true;
	  this.width = padWidth;
	   
	  // Set the pad model using the display width
	  
	  switch (padWidth)
	  {
		case 640: 
		  this.range = padRange.STU500;
		  this.type = padType.STU500;
		  this.textSize = 16;
		  this.yText = 10;
		  this.yLSText = 28;
		  this.buttonSize = 22;
		  this.buttonWidth = 110;
		  this.yButtonCancel = 415;
		  this.yButtonNext = 415;
		  this.xButtonCancel  =  30;
		   this.xButtonNext = 500;
		  break;
		case 800:
		  this.range = padRange.STU5X0;
		  this.type = padType.STU5X0;
		  this.textSize = 16;
		  this.yText = 10;
		  this.yLSText = 28;
		  this.buttonSize = 22;
		  this.buttonWidth = 110; 
		  this.yButtonCancel = 415;
		  this.yButtonNext = 415;
		  this.xButtonCancel  =  30;
		  this.xButtonNext = 660;
		  break;
		  
		case 396:
		  this.range = padRange.STU300;
		  this.type = padType.STU300;
		  this.textSize = 8;
		  this.yText = 5;
		  this.yLSText = 6;
		  this.buttonSize = 15;
		  this.buttonWidth = 55;
		  this.xButtonCancel = 335;
		  this.xButtonNext = 335;
		  // Note that yButtonCancel and yButtonNext for the 300 are calculated later in screen1() below
		  break;
		  
		case 320:
		  this.range = padRange.STU430;
		  this.type = padType.STU430;
		  this.textSize = 9;
		  this.yText = 10;
		  this.yLSText = 7;
		  this.buttonSize = 12;
		  this.buttonWidth = 70; 
		  this.yButtonCancel = 170;
		  this.yButtonNext = 170;
		  this.xButtonCancel  =  5;
		  this.xButtonNext = 243;
		  break;
	  }
	}
}

// Function to define the x and y values and other properties for all the objects on the screen (only 1 screen with the PIN Pad)
class PadDisplay
{
	constructor(pad)
	{
		// Calculate the x and y co-ordinates for the various screen objects
		// bearing in mind that for the buttons the x value for each column is always the same
		// and the y value for each row is always the same
		this.keyWidth = pad.width / 10;

		if (pad.range === padRange.STU300)
		{
			 this.yInputEcho = 20;
		
			 this.xButtonCol1 = pad.width/2 - pad.buttonWidth - pad.buttonWidth/2;
			 this.xButtonCol2 = pad.width/2 - pad.buttonWidth/2;
			 this.xButtonCol3 = pad.width/2 + pad.buttonWidth/2;

			 this.yButtonRow1 = pad.yText + 7*pad.yLSText;
			 this.yButtonRow2 = pad.yText + 7*pad.yLSText + pad.buttonSize;
			 this.yButtonRow3 = pad.yText + 7*pad.yLSText + (2*pad.buttonSize);
		
			 pad.yButtonCancel = this.yButtonRow1;
			 pad.yButtonNext = this.yButtonRow3;
		}
		else
		{
			this.yInputEcho = pad.yText + 4*pad.yLSText;
			this.xButtonCol1 = pad.width/2 - this.keyWidth/2 - 2*this.keyWidth;
			this.xButtonCol2 = pad.width/2 - this.keyWidth/2;
			this.xButtonCol3 = pad.width/2 - this.keyWidth/2 + 2*this.keyWidth;

			this.yButtonRow1 = pad.yText + 7*pad.yLSText;
			this.yButtonRow2 = pad.yText + 7*pad.yLSText + this.keyWidth;
			this.yButtonRow3 = pad.yText + 7*pad.yLSText + (2*this.keyWidth);
		}

		// Set up the text object for the "Enter a 4 digit PIN..." prompt
		this.enterBelow = new WizTextObject("txt", "Enter a 4 digit PIN code below", "centre", 2, pad.yText, pad.titleBold, pad.textSize, padColors.WHITE, padColors.BLUE);

		// Set up the 9 button objects for the PIN numbers
		this.pin1 = new ButtonObject(this.xButtonCol1, this.yButtonRow1, pad.font, pad.titleBold, pad.buttonSize, 
																			padColors.GREEN, padColors.BLUE, "1", "1", pad.buttonWidth, "");
																			
		this.pin2 = new ButtonObject(this.xButtonCol2, this.yButtonRow1, pad.font, pad.titleBold, pad.buttonSize, 
																			padColors.GREEN, padColors.BLUE, "2", "2", pad.buttonWidth, "");
																			
		this.pin3 = new ButtonObject(this.xButtonCol3, this.yButtonRow1, pad.font, pad.titleBold, pad.buttonSize, 
																			padColors.GREEN, padColors.BLUE, "3", "3", pad.buttonWidth, "");
																			
		this.pin4 = new ButtonObject(this.xButtonCol1, this.yButtonRow2, pad.font, pad.titleBold, pad.buttonSize, 
																			padColors.GREEN, padColors.BLUE, "4", "4", pad.buttonWidth, "");
																			
		this.pin5 = new ButtonObject(this.xButtonCol2, this.yButtonRow2, pad.font, pad.titleBold, pad.buttonSize, 
																			padColors.GREEN, padColors.BLUE, "5", "5", pad.buttonWidth, "");
																			
		this.pin6 = new ButtonObject(this.xButtonCol3, this.yButtonRow2, pad.font, pad.titleBold, pad.buttonSize, 
																			padColors.GREEN, padColors.BLUE, "6", "6", pad.buttonWidth, "");
																			
		this.pin7 = new ButtonObject(this.xButtonCol1, this.yButtonRow3, pad.font, pad.titleBold, pad.buttonSize, 
																			padColors.GREEN, padColors.BLUE, "7", "7", pad.buttonWidth, "");
																			
		this.pin8 = new ButtonObject(this.xButtonCol2, this.yButtonRow3, pad.font, pad.titleBold, pad.buttonSize, 
																			padColors.GREEN, padColors.BUE, "8", "8", pad.buttonWidth, "");
																			
		this.pin9 = new ButtonObject(this.xButtonCol3, this.yButtonRow3, pad.font, pad.titleBold, pad.buttonSize, 
																			padColors.GREEN, padColors.BLUE, "9", "9", pad.buttonWidth, "");

		// Finally set up the button objects for the Confirm and Cancel buttons
		this.nextButton = new ButtonObject(pad.xButtonNext, pad.yButtonNext, pad.font, pad.titleBold, pad.buttonSize, 
																				padColors.PURPLE, padColors.WHITE, "Confirm", buttonEvent.OK, pad.buttonWidth, "");
		this.cancelButton = new ButtonObject(pad.xButtonCancel, pad.yButtonCancel, pad.font, pad.titleBold, pad.buttonSize, 
																				padColors.PURPLE, padColors.WHITE, "Cancel", buttonEvent.CANCEL, pad.buttonWidth, "");
	}
	

	
	step1()
	{
		wizCtl.Reset(PadDisplay.step1_onWizCtlReset);
	}
  
  static step1_onWizCtlReset(wizCtlV, status)
  {
    if(wgssSignatureSDK.ResponseStatus.OK === status)
    {
      setFont(padDisplay.enterBelow.fontName, padDisplay.enterBelow.fontSize, padDisplay.enterBelow.fontBold, false, PadDisplay.onPutFontEnterBelow);
    }
    else
    {
      if(wgssSignatureSDK.ResponseStatus.INVALID_SESSION === status)
      {
        actionWhenRestarted(window.step1);
      }
    }
  }
  
 	 /* Add the text object "Enter a 4 digit PIN code below...." */
  static onPutFontEnterBelow(wizCtlV, status)
  {
    if(callbackStatusOK("WizCtl PutFontEnterBelow", status))
    {
      // If font colour is required do it now
      if (padDisplay.enterBelow.fontForeColor !== null && padDisplay.enterBelow.fontForeColor !== "")
      {
        setFontForeColor(padDisplay.enterBelow.fontForeColor, PadDisplay.step1_onSetFontForeColorEnterBelow);
      }
      else
      {
        addTextObject(padDisplay.enterBelow, PadDisplay.onAddEnterBelow);
      }
    }
  }
  
  static step1_onSetFontForeColorEnterBelow(wizCtlV, status)
  {
    if(callbackStatusOK("WizCtl SetFontForeColorEnterBelow", status))
    {
      // If a foreground colour has been set then we assume a background colour must also be required
      setFontBackColor(padDisplay.enterBelow.fontBackColor, PadDisplay.step1_onSetFontBackColorEnterBelow);
    }
  }
  
  static step1_onSetFontBackColorEnterBelow(wizCtlV, status)
  {
    if(callbackStatusOK("WizCtl SetFontBackColorEnterBelow", status))
    {
      // After setting up the font colours set up the text string itself
      addTextObject(padDisplay.enterBelow, PadDisplay.step1_onAddEnterBelow);
    }
  }
  
  /* Next 9 functions - add the buttons for the 9 PINs */
  static step1_onAddEnterBelow(wizCtlV, status)
  {
    if(callbackStatusOK("WizCtl step1 AddEnterBelow", status))
    {
      // If font colour is required do it now
      if (padDisplay.pin1.fontForeColor !== null && padDisplay.pin1.fontForeColor !== "")
      {
        setFontForeColor(padDisplay.pin1.fontForeColor, PadDisplay.step1_onSetFontForeColorPin1);
      }
      else
      {
        addButtonObject(padDisplay.pin1, PadDisplay.step1_onAddPin1Button);
      }
    }
  }

  static step1_onSetFontForeColorPin1(wizCtlV, status)
  {
    if(callbackStatusOK("WizCtl SetFontForeColorPin1", status))
    {
      // If a foreground colour has been set then we assume a background colour must also be required
      setFontBackColor(padDisplay.pin1.fontBackColor, PadDisplay.step1_onSetFontBackColorPin1);
    }
  }
  
  static step1_onSetFontBackColorPin1(wizCtlV, status)
  {
    if(callbackStatusOK("WizCtl SetFontBackColorPin1", status))
    {
      // After setting up the font colours set up the text string itself
      addButtonObject(padDisplay.pin1, PadDisplay.step1_onAddPin1Button);
    }
  }
  
  static step1_onAddPin1Button(wizCtlV, status) 
  {
    if(callbackStatusOK("WizCtl PutFontEnterBelow", status))
    {
      addButtonObject(padDisplay.pin2, PadDisplay.onAddPin2Button);
    }
  }
  
  static onAddPin2Button(wizCtlV, status)
  {
    if(callbackStatusOK("WizCtl AddPin2Button", status))
    {
      addButtonObject(padDisplay.pin3, PadDisplay.onAddPin3Button);
    }
  }
  
  static onAddPin3Button(wizCtlV, status)
  {
    if(callbackStatusOK("WizCtl AddPin3Button", status))
    {
      addButtonObject(padDisplay.pin4, PadDisplay.onAddPin4Button);
    }
  }
  
  static onAddPin4Button(wizCtlV, status)
  {
    if(callbackStatusOK("WizCtl AddPin4Button", status))
    {
      addButtonObject(padDisplay.pin5, PadDisplay.onAddPin5Button);
    }
  }
  
  static onAddPin5Button(wizCtlV, status)
  {
    if(callbackStatusOK("WizCtl AddPin5Button", status))
    {
      addButtonObject(padDisplay.pin6, PadDisplay.onAddPin6Button);
    }
  }
  
  static onAddPin6Button(wizCtlV, status)
  {
    if(callbackStatusOK("WizCtl AddPin6Button", status))
    {
      addButtonObject(padDisplay.pin7, PadDisplay.onAddPin7Button);
    }
  }
  
  static onAddPin7Button(wizCtlV, status)
  {
    if(callbackStatusOK("WizCtl AddPin7Button", status))
    {
      addButtonObject(padDisplay.pin8, PadDisplay.onAddPin8Button);
    }
  }
  
  static onAddPin8Button(wizCtlV, status)
  {
    if(callbackStatusOK("WizCtl AddPin8Button", status))
    {
      addButtonObject(padDisplay.pin9, PadDisplay.onAddPin9Button);
    }
  }
  
  /* Next create the input object for accepting the input from the user */
  static onAddPin9Button(wizCtlV, status)
  {
    if(callbackStatusOK("WizCtl AddPin9Button", status))
    {
      inputObj = new wgssSignatureSDK.InputObj(PadDisplay.onInputObjCtr);
    }
  }
  
  static onInputObjCtr(inputObjV, status) 
  {
    if (callbackStatusOK("InputObj constructor", status))
    {
      inputObj.PutMinLength(PIN_MINLENGTH, PadDisplay.onInputObjMinLen);
    }
  }

  /* The input obj has a minimum and maximum length */
  static onInputObjMinLen(inputObjV, status) 
  {
    if (callbackStatusOK("InputObj PutMinLength", status))
    {
      inputObj.PutMaxLength(PIN_MAXLENGTH, PadDisplay.onInputObjMaxLen);
    }   
  }
  
  static onInputObjMaxLen(inputObjV, status)    
  {
    if (callbackStatusOK("InputObj PutMaxLength", status))
    {
      addInputObject(inputObj, PadDisplay.onAddObjectInput);
    }
  }
  
  /* Now add the input echo object */
  static onAddObjectInput(wizCtlV, status)
  {
    if (callbackStatusOK("WizCtl addInputObj", status))
    {
      addInputObjectEcho("centre", padDisplay.yInputEcho, PadDisplay.onAddObjectInputEcho);
    }
  }
  
  /* Finally add the Next and Cancel buttons */
  static onAddObjectInputEcho(wizCtlV, status)
  {
    if(callbackStatusOK("WizCtl AddInputEcho", status))
    {
      // If font colour is required do it now
      if (padDisplay.cancelButton.fontForeColor != null && padDisplay.cancelButton.fontForeColor != "")
      {
        setFontForeColor(padDisplay.cancelButton.fontForeColor, PadDisplay.step1_onSetFontForeColorCancelButton);
      }
      else
      {
        addButtonObject(padDisplay.cancelButton, PadDisplay.step1_onAddCancelButton);
      }
    }
  }
  
  static step1_onSetFontForeColorCancelButton(wizCtlV, status)
  {
    if(callbackStatusOK("WizCtl SetFontForeColorCancelButton", status))
    {
      // If a foreground colour has been set then we assume a background colour must also be required
      setFontBackColor(padDisplay.cancelButton.fontBackColor, PadDisplay.step1_onSetFontBackColorCancelButton);
    }
  }
  
  static step1_onSetFontBackColorCancelButton(wizCtlV, status)
  {
    if(callbackStatusOK("WizCtl SetFontBackColorCancelButton", status))
    {
      // After setting up the font colours set up the text string itself
      addButtonObject(padDisplay.cancelButton, PadDisplay.step1_onAddCancelButton);
    }
  }
  
  static step1_onAddCancelButton(wizCtlV, status)
  {
    if(callbackStatusOK("WizCtl AddCancelButtno", status))
    {
       addButtonObject(padDisplay.nextButton, PadDisplay.onAddNextButton);
    }
  }
  
  static onAddNextButton(wizCtlV, status)
  {
    if(callbackStatusOK("WizCtl AddNextButton", status))
    {
      wizCtl.Display(PadDisplay.onDisplay);
    }
  }
 
  static onDisplay(wizCtlV, status)
  {
    if(callbackStatusOK("WizCtl Display", status))
    {
      wizCtl.SetEventHandler(PadDisplay.step1_Handler);
    }
  }

	/* This function handles the events generated by the user input on the pad */
	static step1_Handler(ctl, id, type, status)
	{   
		if(wgssSignatureSDK.ResponseStatus.OK == status)
		{
			switch(id) 
			{
				case "input":
					switch (type) 
					{
						case 4: 
							break; //print("min chars entered")
						case 5: 
							break; //print("max chars entered")
						case 6: 
							break; //print("attempted to exceed min/max chars")
						default: 
							UserMsg.print("Input unexpected type: " + Type); 
							break;
					}
					break;
			case buttonEvent.CLEAR:   
				break; // handled by the InputObj control
			case buttonEvent.OK:
				inputObj.GetText(PadDisplay.onInputObjGetText);
				break;
			case buttonEvent.CANCEL:
				UserMsg.print("Cancel");
				WizSessionCtrl.script_Completed(true);
				break;
			default:
				UserMsg.print( "Exception: step1_Handler(): " + "unexpected event: " + id);
				break;
			}  
		}
		else
		{
			UserMsg.print("Wizard window closed");
			WizSessionCtrl.script_Cancelled();
		}
	}

	/* Called when user clicks OK to signify that PIN input is complete */
	static onInputObjGetText(inputObjV, text, status) 
	{
		if(wgssSignatureSDK.ResponseStatus.OK == status) 
		{
			UserMsg.print("Code entered: " + text);
			WizSessionCtrl.script_Completed(true);
		}
		else
		{
			UserMsg.print("InputObj GetText error: " + status);
			WizSessionCtrl.script_Cancelled();
		}
	}
}

// This function sets the scene ready for kicking off the wizard sequence
const startDisplay = (padHeight, padWidth) =>
{   
	//UserMsg.print("Setting up for pad width/height:" + padWidth + "/" + padHeight);
	pad = new stuProperties(padWidth, padHeight);
	
	padDisplay = new PadDisplay(pad);	
	padDisplay.step1();
}