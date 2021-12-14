/* **************************************************************************
  SigCaptX-Wizard-PadDisp1.js
   
  This file contains the functions which define the objects 
	that are to be displayed on the first screen of the wizard sequence
	and the methods which actually display them.
  
  Copyright (c) 2021 Wacom Co. Ltd. All rights reserved.
  
  v4.0
  
***************************************************************************/

class stuProperties
{
	constructor(padWidth, padHeight, checkBoxSize)
	{
		this.font = "Verdana";
		this.height = padHeight;
		this.titleBold = true;
		this.width = padWidth;
		
		// Set the pad model using the display width
		switch (padWidth)  // This is an STU-500
		{
			case 640: 
				this.range = padRange.STU500;
				this.type = padType.STU500;
				if (checkBoxSize == checkSizeSelection.LARGE)
				{
					this.checkSize = checkSize.STU500_Large;
				}
				else
				{
					this.checkSize = checkSize.STU500_Small;
				}
				this.buttonBold = false;
				this.buttonSize = 22;
				this.buttonWidth = 110;
				this.textBold = false;
				this.textLS = 30;
				this.textSize = 16;
				this.titleSize = 22;
				this.xButtonLeft = 30;
				this.xButtonRight = 500;
				this.yButton = 415;
				this.yText = 120;
				this.yTitle = 10;
				break;
			case 800:  // This is a 520, 530, 540 or 541
				this.range = padRange.STU5X0;
				this.type = padType.STU5X0;
				if (checkBoxSize == checkSizeSelection.LARGE)
				{
					this.checkSize = checkSize.STU5X0_Large;
				}
				else
				{
					this.checkSize = checkSize.STU5X0_Small;
				}
				this.buttonBold = false;
				this.buttonSize = 22;
				this.buttonWidth = 110;
				this.textBold = false;
				this.textLS = 30;
				this.textSize = 16;
				this.titleSize = 22;
				this.xButtonLeft = 30;
				this.xButtonRight = 660;
				this.yButton = 415;
				this.yText = 120;
				this.yTitle = 10;
				break;
				
			case 396:  // This is the STU-300
				this.range = padRange.STU300;
				this.type = padType.STU300;
				if (checkBoxSize == checkSizeSelection.LARGE)
				{
					this.checkSize = checkSize.STU300_Large;
				}
				else
				{
					this.checkSize = checkSize.STU300_Small;
				}
				this.buttonBold = true;
				this.buttonSize = 8;
				this.buttonWidth = 70;
				this.textBold = false;
				this.textLS = 12;
				this.textSize = 8;
				this.titleSize = 8;
				this.xButtonLeft = 10;
				this.xButtonRight = 316;
				this.yButton = 82;
				this.yText = 20;
				this.yTitle = 2;
				break;
				
			case 320:  // This is the 430
				this.range = padRange.STU430;
				this.type = padType.STU430;
				if (checkBoxSize == checkSizeSelection.LARGE)
				{
					this.checkSize = checkSize.STU430_Large;
				}
				else
				{
					this.checkSize = checkSize.STU430_Small;
				}
				this.buttonBold = true;
				this.buttonSize = 12;
				this.buttonWidth = 70;
				this.textBold = true;
				this.textLS = 15;
				this.textSize = 9;
				this.titleSize = 11;
				this.xButtonLeft = 5;
				this.xButtonRight = 243;
				this.yButton = 170;
				this.yText = 40;
				this.yTitle = 3;
				break;
		}
	}
}

class PadDisplay
{
	constructor(stepMsgText, stuProperties, buttonTextSource)
	{
		// First set up the "Step x of 3" message which is common to all 3 screens in the sequence
		this.stepMsg = new WizTextObject("txt", stepMsgText, "right", 2, pad.font, true, pad.textSize, "", "");
		this.backColor = "";
		this.fontBold = false;
		this.fontSize = 0;
		this.foreColor = "";
		this.xPos = 0;
		this.yPos = 0;
		PadDisplay.step1Rectangle = null;
	}

	// This function sets up the object definitions for the first screen in the wizard sequence
	setupDisplay1 = (pad, buttonTextSource) =>
	{ 		
		switch (pad.range)
		{
			case padRange.STU300:
				this.xPos = 10;
				this.yPos = 20;
				break;
			case padRange.STU430:
				this.xPos = 10;
				this.yPos = 40;
				// If using large check box the text message must be moved up
				if (pad.checkSize === checkSize.STU430_Large)
				{
					this.yPos = 32;
				}
				break;
			case padRange.STU500:
				this.xPos = 30;
				this.yPos = 120;
				break;
			case padRange.STU5X0:
				this.xPos = 30;
				this.yPos = 120;
				this.foreColor = padColors.BLUE;
				this.backColor = padColors.WHITE;
				break;
		}
		
		// Object 2 - set up the "Check boxes provide options...." text message
		this.infoText = new WizTextObject("txt", 
													"Check boxes provide options for the signing process and can be transferred to the document", 
													this.xPos, this.yPos, pad.font, pad.textBold, pad.textSize, this.backColor, this.foreColor);

		 // If we are setting up the STU 300 definitions for the large checkbox sample then we need to adjust the position
		// of the check box otherwise the screen gets too crowded
		if (pad.range === padRange.STU300 && pad.checkSize === checkSize.STU300_Large)
		{
			this.xPos = pad.width / 4;
			this.yPos = 44;
		}
		else
		if (pad.range === padRange.STU430 && pad.checkSize === checkSize.STU430_Large)
		{
			this.xPos = pad.width/8;
			this.yPos = pad.height/2 - 25;
		}
		else
		{
			this.xPos = pad.width/6;
			this.yPos = pad.height/2;
		}
		// Set up the details for the check box object
		this.checkboxObj = new CheckBoxObject(this.xPos, this.yPos, pad.font, pad.checkSize, this.backColor, this.foreColor, CHECKBOX_USETICKSYMBOL);
	 
		// Set up the details of the "I am signing as a representative" text box
		// If we are setting up the STU 300 definitions for the large checkbox sample then we need to adjust the position
		// of the "I am signing..." text to prevent overlapping
		if (pad.range === padRange.STU300 && pad.checkSize === checkSize.STU300_Large)
		{
			 this.xPos = this.checkboxObj.xPos + 2 * pad.checkSize;
			 this.yPos = 44 + pad.checkSize - pad.textSize;
		}
		else
		if (pad.range === padRange.STU430 && pad.checkSize === checkSize.STU430_Large)
		{
			 this.xPos = this.checkboxObj.xPos + 2 * pad.checkSize;
			 this.yPos = this.checkboxObj.yPos + pad.checkSize - pad.textSize;
		}
		else
		{
			this.xPos = this.checkboxObj.xPos + 2 * pad.checkSize;
			this.yPos = pad.height/2 + pad.checkSize - pad.textSize;
		}
		
		if (pad.range === padRange.STU5X0)
		{
			this.foreColor = padColors.GREEN;
			this.backColor = padColors.WHITE;
		}
		else
		{
			this.foreColor = "";
			this.backColor = "";
		}
		this.signingText = new WizTextObject("txt", "I am signing as a representative", 
										this.xPos, this.yPos, pad.font, pad.textBold, pad.textSize, this.backColor, this.foreColor);

		// Set up the "When you are ready" text object. Done in separate function because also used later for screen 2
		this.nextToContinue = PadDisplay.setupContinueText(pad, buttonTextSource);
		
		// Set up the Next and Cancel button objects using separate functions so they can be reused for screen2 and 3
		this.nextButton = PadDisplay.setupNextButton(pad, buttonTextSource);
		//print("Setting up previous button for screen 1");
		this.cancelButton = PadDisplay.setupCancelButton(pad, buttonTextSource, buttonFunction.PREVIOUS);  

		// Set up the rectangle or line object used to improve the screen aesthetics  
		if (pad.range === padRange.STU300)
		{
			this.step1Line = new ShapeObject(5, 15, pad.font, pad.textSize, "", "", pad.width-3, 15, 1, SOLIDLINE);
		}
		else
		{
			this.step1Rectangle = new ShapeObject("left", pad.height/8, pad.font, pad.textSize, "", "", "right", pad.height*4/5, 1, OUTLINE);
		}
	}
	
	static displayScreen1()
	{
		wizCtl.Reset(PadDisplay.step1_onWizCtlReset);
	}
  
  static step1_onWizCtlReset(wizCtlV, status)
  {
    if(wgssSignatureSDK.ResponseStatus.OK === status)
    {
      setFont(display_1.stepMsg.fontName, display_1.stepMsg.fontSize,display_1.stepMsg.fontBold, false, PadDisplay.step1_onPutFontstepMsg);
    }
    else
    {
      UserMsg.print("WizCtl Reset" + status);
      if(wgssSignatureSDK.ResponseStatus.INVALID_SESSION == status)
      {
        actionWhenRestarted(window.Step1);
      }
    }
  }
  
  static step1_onPutFontstepMsg(wizCtlV, status)
  {
    if(callbackStatusOK("WizCtl PutFontstepMsg", status))
    {
       addTextObject(display_1.stepMsg, PadDisplay.step1_onAddTextStep1);
    }
  }

  static step1_onAddTextStep1(wizCtlV, status)
  {
    if(callbackStatusOK("WizCtl AddObject", status))
    {
      if (pad.range === padRange.STU300)
      {
        addLine(display_1.step1Line, PadDisplay.step1_onAddRectangle);
      }
      else
      { 
         addRectangle( display_1.step1Rectangle, PadDisplay.step1_onAddRectangle);
      }
    }
  }
  
  static step1_onAddRectangle(wizCtlV, status)
  {
    if(callbackStatusOK("WizCtl Primitive", status))
    {
      setFont(display_1.infoText.fontName, display_1.infoText.fontSize, display_1.infoText.fontBold, false, PadDisplay.step1_onPutFontInfoText);
    }
  }
  
  static step1_onPutFontInfoText(wizCtlV, status)
  {   
    if(callbackStatusOK("WizCtl PutFontInfoText", status))
    {
      /* If we are using a colour pad then set the colour of the foreground 
					and background fonts up now if defined in the text object */
      if (display_1.infoText.fontForeColor != "")
      {
        setFontForeColor(display_1.infoText.fontForeColor, PadDisplay.step1_onSetFontForeColor);
      }
      else
      {  
         addTextObject(display_1.infoText, PadDisplay.step1_onAddTextInfoText);
      }
    }
    else
    {
      addTextObject(display_1.infoText, PadDisplay.step1_onAddTextInfoText);
    }
  }
  
  static step1_onSetFontForeColor(wizCtlV, status)
  {
    if(callbackStatusOK("WizCtl SetFontForeColor", status))
    {
      // If a foreground colour has been set then we assume a background colour must also be required
      setFontBackColor(display_1.infoText.fontBackColor, PadDisplay.step1_onSetFontBackColor);
    }
  }
  
  static step1_onSetFontBackColor(wizCtlV, status)
  {
    if(callbackStatusOK("WizCtl SetFontBackColor", status))
    {
      // After setting up the font colours set up the text string itself
      addTextObject(display_1.infoText, PadDisplay.step1_onAddTextInfoText);
    }
  }
  
  static step1_onAddTextInfoText(wizCtlV, status)
  {
    if(callbackStatusOK("WizCtl AddTextInfoText", status))
    {
      setFont(display_1.checkboxObj.fontName, display_1.checkboxObj.fontSize, display_1.checkboxObj.fontBold, false, PadDisplay.step1_onPutFontCheckbox);
    }
  }
  
  static step1_onPutFontCheckbox(wizCtlV, status)
  {
    if(callbackStatusOK("WizCtl PutFontCheckbox", status))
    {
      addCheckBox(display_1.checkboxObj.xPos, display_1.checkboxObj.yPos, display_1.checkboxObj.options, PadDisplay.step1_onAddCheck);
    }
  }
  
  static step1_onAddCheck(wizCtlV, status)
  {
    if(callbackStatusOK("WizCtl AddCheck", status))
    {
      setFont(display_1.signingText.fontName, display_1.signingText.fontSize, display_1.signingText.fontBold, false, PadDisplay.step1_onPutFontSigningText);
    }
  }
  
  static step1_onPutFontSigningText(wizCtlV, status)
  {
    if (callbackStatusOK("WizCtl PutFontSigningText", status))
    {
      /* If we are using a colour pad then set the colour of the foreground and 
					background fonts up now if defined in the text object */
      if (display_1.signingText.fontForeColor != "")
      {
        setFontForeColor(display_1.signingText.fontForeColor, PadDisplay.step1_onSetSigningTextFontForeColor);
      }
      else
      {
        addTextObject(display_1.signingText, PadDisplay.step1_onAddTextSigningText);
      }
    }
  }
  
  static step1_onSetSigningTextFontForeColor(wizCtlV, status)
  {
    if(callbackStatusOK("WizCtl SetSigningTextFontForeColor", status))
    {
      // If a foreground colour has been set then we assume a background colour must also be required
      setFontBackColor(display_1.signingText.fontBackColor, PadDisplay.step1_onSetSigningTextFontBackColor);
    }
  }
  
  static step1_onSetSigningTextFontBackColor(wizCtlV, status)
  {
    if(callbackStatusOK("WizCtl SetSigningTextFontBackColor", status))
    {
      // After setting up the font colours set up the text string itself
      addTextObject(display_1.signingText, PadDisplay.step1_onAddTextSigningText);
    }
  }
  
  static step1_onAddTextSigningText(wizCtlV, status)
  {
    if(callbackStatusOK("WizCtl AddTextSigningText", status))
    {
      if (display_1.nextToContinue.fontForeColor != "")
      {
        setFontForeColor(display_1.nextToContinue.fontForeColor, PadDisplay.step1_onSetContinueTextFontForeColor);
      }
      else
      {
        addTextObject(display_1.nextToContinue, PadDisplay.step1_onAddTextNextCont);
      }
    }
  }

  static step1_onSetContinueTextFontForeColor(wizCtlV, status)
  {
    if(callbackStatusOK("WizCtl SetContinueTextFontForeColor", status))
    {
      // If a foreground colour has been set then we assume a background colour must also be required
      setFontBackColor(display_1.nextToContinue.fontBackColor, PadDisplay.step1_onSetContinueTextFontBackColor);
    }
  }
  
  static step1_onSetContinueTextFontBackColor(wizCtlV, status)
  {
    if(callbackStatusOK("WizCtl SetContinueTextFontBackColor", status))
    {
      // After setting up the font colours set up the text string itself
      addTextObject(display_1.nextToContinue, PadDisplay.step1_onAddTextNextCont);
    }
  }
  
  static step1_onAddTextNextCont(wizCtlV, status)
  {
    //print("step1_onAddTextNextCont");
    if(callbackStatusOK("WizCtl AddTextNextCont", status))
    {
      setFont(pad.font, display_1.cancelButton.buttonSize, display_1.cancelButton.buttonBold, false, PadDisplay.step1_onPutFontCancel);
    }
  }
  
  static step1_onPutFontCancel(wizCtlV, status)
  {
    if(callbackStatusOK("WizCtl PutFontCancel", status))
    {
      if (buttonTextType === textSource.STANDARD || buttonTextType === textSource.UTF8) 
      {
        // Set up font colours if required for colour pads
        if (display_1.cancelButton.fontForeColor !== "")
        {
          setFontForeColor(display_1.cancelButton.fontForeColor, PadDisplay.step1_onSetCancelButtonFontForeColor);
        }
        else
        {
          addButtonObject(display_1.cancelButton, PadDisplay.step1_onAddCancelButton);
        }
      }
      else
      {
        addObjectImage(display_1.cancelButton, PadDisplay.step1_onAddCancelButton, display_1.cancelButton.imageFile);
      }
    }
  }
	
	static step1_onSetCancelButtonFontForeColor(wizCtlV, status)
	{
		if(callbackStatusOK("WizCtl setFontCancelButtonForeColor", status))
		{
			setFontBackColor(display_1.cancelButton.fontBackColor, PadDisplay.step1_onSetCancelButtonFontBackColor);
		}
	}
	
	static step1_onSetCancelButtonFontBackColor(wizCtlV, status)
	{
		if(callbackStatusOK("WizCtl setCancelButtonFontBackColor", status))
		{
			addButtonObject(display_1.cancelButton, PadDisplay.step1_onAddCancelButton);
		}
	} 
		
  static step1_onAddCancelButton(wizCtlV, status)
  {
    if(callbackStatusOK("WizCtl AddCancelButton", status))
    {
      /* If the user has chosen to use images for the buttons then add the image object, otherwise a standard button object */
      if (buttonTextType === textSource.STANDARD || buttonTextType === textSource.UTF8)
      {
        addButtonObject(display_1.nextButton, PadDisplay.step1_onAddNextButton);
      }
      else
      {
        addObjectImage(display_1.nextButton, PadDisplay.step1_onAddNextButton, buttonTextType);
      }
    }
  }
  
  static step1_onAddNextButton(wizCtlV, status)
  {
    if(callbackStatusOK("WizCtl AddNextButton", status))
    {
      wizCtl.Display(PadDisplay.step1_onDisplay);
    }
  }
  
  static step1_onDisplay(wizCtlV, status)
  {
    if(callbackStatusOK("WizCtl Display", status))
    {
      wizCtl.SetEventHandler(PadDisplay.step1_Handler);
    }
  }
	
	/* This is the event handler for the user input on the first screen of the wizard */
	static step1_Handler(ctl, id, type, status)
	{
		if(wgssSignatureSDK.ResponseStatus.OK === status)
		{
			switch(id) 
			{
				case buttonEvent.NEXT:
					wizCtl.GetObjectState("Check", PadDisplay.step1_onGetObjectState);
					break;
				case buttonEvent.CHECK:
					break;
				case buttonEvent.CANCEL:
					WizSessionCtrl.script_Cancelled();
					break;
				default:
					UserMsg.print("Unexpected event: " + id);
					alert("Unexpected event: " + id);
					break;
			}
		}
		else
		{
			UserMsg.print("Wizard window closed");
			WizSessionCtrl.script_Cancelled();
		}
	}
	
	static step1_onGetObjectState(wizCtlV, objState, status)
	{
		if(wgssSignatureSDK.VariantType.VARIANT_NUM == objState.type && 1 == objState.num)
		{
			UserMsg.print("Check box was selected");
		}
		PadDisplay2.displayScreen2();
	}

	// Function to set up the properties of the Next button 
	static setupNextButton = (pad, buttonTextSource) =>
	{
		let buttonText = "Next";
		let imageFile;
		
		// Set up the Next button object
		this.xPos = pad.xButtonRight;
		this.yPos = pad.yButton;
		
		if (pad.range === padRange.STU5X0)
		{
			this.foreColor = padColors.WHITE;
			this.backColor = padColors.PURPLE;
		}
		else
		{
			this.foreColor = ""
			this.backColor = "";
		}

		// Set up the source of the button depending on what the user has selected on the HTML document
		switch (buttonTextSource)  
		{
			case textSource.UTF8:
				buttonText = "下一個";
				break;
				
			case textSource.LOCAL:
				// Override the positions of the buttons when using images
				this.xPos = "right";
				this.yPos = "bottom";
				this.imageFile = PadDisplay.setButtonImageFile(buttonTextSource, pad.range, "RightArrow");
				break;
				
			case textSource.REMOTE:
				// Override the positions of the buttons when using images
				this.xPos = "right";
				this.yPos = "bottom";
				this.imageFile = PadDisplay.setButtonImageFile(buttonTextSource, pad.range, "RightArrow");
				break;
		} 
		
		const nextButton = new ButtonObject(this.xPos, this.yPos, pad.font, pad.buttonBold, pad.buttonSize, 
																				this.backColor, this.foreColor, buttonText, "Next", pad.buttonWidth, this.imageFile);
										
		return nextButton;
	}

	// Function to set up the properties of the Cancel button
	static setupCancelButton(pad, buttonTextSource, buttonFunc)
	{
		let buttonText;
		let imageFilePrefix;
		
		// Set up the Cancel button object  
		this.xPos = pad.xButtonLeft;
		this.yPos = pad.yButton;
		buttonText = "Cancel";
		
		if (pad.range === padRange.STU5X0)
		{
			this.foreColor = padColors.WHITE;
			this.backColor = padColors.PURPLE;
		}
		else
		{
			this.foreColor = "";
			this.backColor = "";
		}
		
		if (buttonFunc === buttonFunction.PREVIOUS)
		{
			imageFilePrefix = "LeftArrow";
		}
		else
		{
			imageFilePrefix = "Cancel";
		}
		
		// Set up the source of the button depending on what the user has selected on the HTML document
		switch (buttonTextSource)  
		{
			case textSource.UTF8:
				buttonText = "取消";
				break;
				
			case textSource.LOCAL:
				// Override the positions of the buttons when using images
				this.xPos = "left";
				this.yPos = "bottom";
				this.imageFile = PadDisplay.setButtonImageFile(buttonTextSource, pad.range, imageFilePrefix);
				break;
				
			case textSource.REMOTE:
				// Override the positions of the buttons when using images
				this.xPos = "left";
				this.yPos = "bottom";
				this.imageFile = PadDisplay.setButtonImageFile(buttonTextSource, pad.range, imageFilePrefix);
				break;
		} 
		const cancelButton = new ButtonObject(this.xPos, this.yPos, pad.font, pad.buttonBold, pad.buttonSize, 
										this.backColor, this.foreColor, buttonText, "Cancel", pad.buttonWidth, this.imageFile);
		return cancelButton;
	}

	// Function to set up the properties of the Previous button (arrow)
	static setupPreviousButton = (pad, buttonTextSource) =>
	{
		let buttonText;
		
		// Set up the Previous button object
		this.xPos = pad.xButtonLeft;
		this.yPos = pad.yButton;
		buttonText = "Previous";
		
		if (pad.range === padRange.STU5X0)
		{
			this.foreColor = padColors.WHITE;
			this.backColor = padColors.PURPLE;
		}
		else
		{
			this.foreColor = "";
			this.backColor = "";
		}
		
		// Set up the source of the button depending on what the user has selected on the HTML document
	 //print("Setting up previous button from source: " + buttonTextSource);
		switch (buttonTextSource)  
		{
			case textSource.UTF8:
				buttonText = "取消";
				break;
				
			case textSource.LOCAL:
				// Override the positions of the buttons when using images
				this.xPos = "left";
				this.yPos = "bottom";
				this.imageFile = PadDisplay.setButtonImageFile(buttonTextSource, pad.range, "LeftArrow");
				break;
				
			case textSource.REMOTE:
				// Override the positions of the buttons when using images
				this.xPos = "left";
				this.yPos = "bottom";
				this.imageFile = PadDisplay.setButtonImageFile(buttonTextSource, pad.range, "LeftArrow");
				break;
		} 
		const previousButton = new ButtonObject(this.xPos, this.yPos, pad.font, pad.buttonBold, pad.buttonSize, 
																						this.backColor, this.foreColor, buttonText, "Cancel", pad.buttonWidth, this.imageFile);
		return previousButton;
	}

	// Function to set up the properties of the text which prompts the user to press Next or right arrow to continue
	static setupContinueText = (pad, buttonTextSource) =>
	{
		let nextToContinue;
		let textString;
		
		if (pad.range === padRange.STU300)
		{
			this.yPos = "bottom";
		}
		else
		{
			this.yPos = pad.height*2/3;
		}
		
		// For the colour pads set up the font colours
		if (pad.range === padRange.STU5X0)
		{
			this.foreColor = padColors.BLUE;
			this.backColor = padColors.WHITE;
		}
		else
		{
			this.foreColor = "";
			this.backColor = "";
		}
		
		
		/* The text of the "When ready press Next to continue" message varies depending on which pad is in use  
			 (there is less space available on the 300) and whether the user has selected images for the    
				Next and Cancel buttons because the images are arrows, not words */
		 
		if (buttonTextSource === textSource.LOCAL || buttonTextSource === textSource.REMOTE)
		{
			textString = "Press right arrow to continue";
		}   
		else
		{
			if (pad.range === padRange.STU300)
			{
				textString = "Press Next to continue";
			}
			else
			{
				textString = "When you are ready press NEXT to continue";
			}
		}
		nextToContinue = new WizTextObject("txt", textString, "center", this.yPos, 
																				pad.font, false, 16, this.backColor, this.foreColor);
		
		return nextToContinue;
	}

	// Function to define the image file which is used for a given button
	static setButtonImageFile = (buttonTextSource, currentPadRange, imagePrefix) =>
	{
		let filePath;
		let imageFile;
		const currDir = getCurrentDir();
		
		if (buttonTextSource === textSource.LOCAL)
		{
			filePath = currDir + "\\images\\";
		}
		else
		{
			filePath = "http://gsdt.wacom.eu/SigCaptX/images/";
		}
		
		switch (currentPadRange)
		{
			case padRange.STU300:
				imageFile = filePath + imagePrefix + "300.png";
				break;
			case padRange.STU430:
				imageFile = filePath + imagePrefix + "430.png";
				break;
			case padRange.STU500:
				imageFile = filePath + imagePrefix + "500.png";
				break;
			case padRange.STU5X0:
				imageFile = filePath + imagePrefix + "530.png";
				break;
		}
		return imageFile;
	}
}

// This function sets the scene ready for kicking off the wizard sequence
const startDisplay = (padHeight, padWidth) =>
{
  let chkBoxSize = checkSizeSelection.STANDARD;

	/* If the user wants a large check box pass this as a parameter to ScreenDisplay in SigCaptX-Wizard-PadDefs.js */
	/* Note that this code is also used by the PIN pad sample which doesn't have the user options so make sure
		 the tags exist first */
      
	if (HTMLIds.chkLargeCheckbox != null)
	{
		if (HTMLIds.chkLargeCheckbox.checked)
		{
			chkBoxSize = checkSizeSelection.LARGE;
		}
	}
    
	//UserMsg.print("Setting up for pad width/height:" + padWidth + "/" + padHeight);
	pad = new stuProperties(padWidth, padHeight, chkBoxSize);
	
	display_1 = new PadDisplay("Step 1 of 3", pad, buttonTextType);
	display_1.setupDisplay1(pad, buttonTextType);
	
	display_2 = new PadDisplay2("Step 2 of 3", pad, buttonTextType);
	display_2.setupDisplay2(pad, buttonTextType);
	
	display_3 = new PadDisplay3("Step 3 of 3", pad, buttonTextType);
	display_3.setupDisplay3(pad, buttonTextType);
	
	PadDisplay.displayScreen1();
}