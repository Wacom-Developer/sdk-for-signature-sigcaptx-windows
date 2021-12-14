/* **************************************************************************
  SigCaptX-Wizard-PadDisp2.js
   
  This file contains the objects definitions and methods for the second screen of the wizard sequence.
  
  Copyright (c) 2021 Wacom Co. Ltd. All rights reserved.
  
  v4.0
  
***************************************************************************/

class PadDisplay2 extends PadDisplay
{
	
	constructor(stepMsgText, stuProperties, buttonTextSource)
	{
		super(stepMsgText, stuProperties, buttonTextSource);
		this.step2Rectangle = null;
	}
	
	// This function sets up the object definitions for the second screen in the wizard sequence
	setupDisplay2(pad, buttonTextSource)
	{		
		// Set up the informational text object
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
		
		switch (pad.range)
		{
			case padRange.STU300:
				this.xPos = 10;
				this.yPos = 20;
				this.fontSize = 8;
				this.fontBold = false;
				break;
			case padRange.STU430:
				this.xPos = 10;
				this.yPos = 40;
				this.fontSize = 9;
				this.fontBold = true;
				break;
			case padRange.STU500:
			case padRange.STU5X0:
				this.xPos = 30;
				this.yPos = 120;
				this.fontSize = 16;
				this.fontBold = false;
				break;
		}
		this.infoObject = new WizTextObject("txt", 
												"Radio buttons provide options for the signing process and can be transferred to the document", 
												this.xPos, this.yPos, pad.font, this.fontBold, this.fontSize, this.backColor, this.foreColor);

		// Next define the radio buttons
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
		switch (pad.range)
		{
			case padRange.STU300:
				this.xPos = 50;
				this.yPos = 50;
				break;
			case padRange.STU430:
				this.xPos = 40;
				this.yPos = 90;
				break;
			case padRange.STU500:
				this.xPos = 100;
				this.yPos = 220;
				break;
			case padRange.STU5X0:
				this.xPos = 100;
				this.yPos = 220;
				break;
		}  
		this.maleRadio = new RadioObject(this.xPos, this.yPos, pad.font, pad.textSize, 
																			this.backColor, this.foreColor, "Male", "Gender", true);
		
		// Now the second radio button - the "Female" option
		switch (pad.range)
		{
			case padRange.STU300:
				this.xPos = 240;
				this.yPos = 50;
				break;
			case padRange.STU430:
				this.xPos = 200;
				this.yPos = 90;
				break;
			case padRange.STU500:
				this.xPos = 350;
				this.yPos = 220;
				break;
			case padRange.STU5X0:
				this.xPos = 500;
				this.yPos = 220;
				break;
		}  
		this.femaleRadio = new RadioObject(this.xPos, this.yPos, pad.font, pad.textSize, 
																				this.backColor, this.foreColor, "Female", "Gender", false);
		// Set up the "Press NEXT to continue" object  
		this.nextToContinue = PadDisplay.setupContinueText(pad, buttonTextSource);
		
		// Set up the rectangle object for display aesthetics
		if (pad.range === padRange.STU300)
		{
			this.step2Line = new ShapeObject(5, 15, pad.font, pad.textSize, "", "", pad.width-3, 15, 1, SOLIDLINE);
		}
		else
		{
			this.step2Rectangle = new ShapeObject("left", pad.height/8, pad.font, pad.textSize, 
																						"", "", "right", pad.height*4/5, 1, OUTLINE);
		}

		// Set up the Next and Previous button objects using separate functions
		this.nextButton = PadDisplay.setupNextButton(pad, buttonTextSource);
		this.cancelButton = PadDisplay.setupPreviousButton(pad, buttonTextSource);
	}
	
	static displayScreen2()
	{
		wizCtl.Reset(PadDisplay2.step2_onWizCtlReset);
	}

	static step2_onWizCtlReset(wizCtlV, status)
	{
		if(wgssSignatureSDK.ResponseStatus.OK === status)
		{
			setFont(display_2.stepMsg.fontName, display_2.stepMsg.fontSize, display_2.stepMsg.fontWeight, false, PadDisplay2.step2_onPutFont);
		}
		else
		{
			UserMsg.print("WizCtl Reset" + status);
			if(wgssSignatureSDK.ResponseStatus.INVALID_SESSION === status)
			{
				actionWhenRestarted(window.Step2);
			}
		}
	}
    
	static step2_onPutFont(wizCtlV, status)
	{
		let fontForeColor = "";
		
		if(callbackStatusOK("WizCtl PutFont", status))
		{
			// In case font colours were changed on the previous screen make sure we revert to black on white now
			if (pad.range === padRange.STU5X0)
			{
				if (display_2.stepMsg.fontForeColor !== "")
				{
					fontForeColor = display_2.stepMsg.fontForeColor;
				}
				else
				{
					fontForeColor = padColors.BLACK;
				}
				setFontForeColor(fontForeColor, PadDisplay2.step2_onSetstepMsgFontForeColor);
			}
			else
			{
				// For monochrome pads skip the setting of font colours
				addTextObject(display_2.stepMsg, PadDisplay2.step2_onAddText1);
			}
		}
	}
  
	static step2_onSetstepMsgFontForeColor(wizCtlV, status)
	{
		let fontBackColor;
		
		if(callbackStatusOK("WizCtl setstepMsgFontForeColor", status))
		{
			if (display_2.stepMsg.fontBackColor !== "")
			{
				fontBackColor = display_2.stepMsg.fontBackColor;
			}
			else
			{
				fontBackColor = padColors.WHITE;
			}
			setFontBackColor(fontBackColor, PadDisplay2.step2_onSetstepMsgFontBackColor);
		}
	}
		
	static step2_onSetstepMsgFontBackColor(wizCtlV, status)
	{
		if(callbackStatusOK("WizCtl setstepMsgFontBackColor", status))
		{
			addTextObject(display_2.stepMsg, PadDisplay2.step2_onAddText1);
		}
	} 
  
	static step2_onAddText1(wizCtlV, status)
	{
		if(callbackStatusOK("WizCtl AddObject", status))
		{
			if (pad.range === padRange.STU300)
			{
				 addLine(display_2.step2Line, PadDisplay2.step2_onAddPrimitive1);
			}
			else
			{
				 addRectangle( display_2.step2Rectangle, PadDisplay2.step2_onAddPrimitive1);
			}
		}
	}
		
	static step2_onAddPrimitive1(wizCtlV, status)
	{
		if(callbackStatusOK("WizCtl Primitive", status))
		{
			setFont(display_2.infoObject.fontName, display_2.infoObject.fontSize, display_2.infoObject.fontBold, false, PadDisplay2.step2_onPutFont2);
		}
	}
  
	// Now add this text to the WizCtl: "Radio buttons provide options for the signing process and can be transferred to the document"
	static step2_onPutFont2(wizCtlV, status)
	{
		if(callbackStatusOK("WizCtl PutFont2", status))
		{
			/* If we are using a colour pad then set the colour of the foreground and 
					background fonts up now if defined in the text object */
			if (display_2.infoObject.fontForeColor != "")
			{
				setFontForeColor(display_2.infoObject.fontForeColor, PadDisplay2.step2_onSetFontForeColorInfoObject);
			}
			else
			{
				addTextObject(display_2.infoObject, PadDisplay2.step2_onAddText3);
			}
		}
	}
		
	static step2_onSetFontForeColorInfoObject(wizCtlV, status)
	{
		if(callbackStatusOK("WizCtl SetFontForeColorInfoObject", status))
		{
			// If a foreground colour has been set then we assume a background colour must also be required
			setFontBackColor(display_2.infoObject.fontBackColor, PadDisplay2.step2_onSetFontBackColorInfoObject);
		}
	}

	static step2_onSetFontBackColorInfoObject(wizCtlV, status)
	{
		if(callbackStatusOK("WizCtl SetFontBackColorInfoObject", status))
		{
			// After setting up the font colours set up the text string itself
			addTextObject(display_2.infoObject, PadDisplay2.step2_onAddText3);
		}
	}

	static step2_onAddText3(wizCtlV, status)
	{
		if(callbackStatusOK("WizCtl AddText3", status))
		{
			addTextObject(display_2.nextToContinue, PadDisplay2.step2_onAddText4);
		}
	}
  
	static step2_onAddText4(wizCtlV, status)
	{
		if(callbackStatusOK("WizCtl AddText4", status))
		{
			setFont(pad.font, pad.buttonSize, pad.textBold, false, PadDisplay2.step2_onPutFont5);
		}
	}

	static step2_onPutFont5(wizCtlV, status)
	{
		if (callbackStatusOK("WizCtl PutFont5", status ))
		{
			if (display_2.maleRadio.fontForeColor != "")
			{
				setFontForeColor(display_2.maleRadio.fontForeColor, PadDisplay2.step2_onSetFontForeColorMaleRadio);
			}
			else
			{
				addRadioButton( display_2.maleRadio, PadDisplay2.step2_onAddRadioButton1);
			}
		}
	}
  
	static step2_onSetFontForeColorMaleRadio()
	{
		if(callbackStatusOK("WizCtl SetFontForeColorMaleRadio", status))
		{
			// If a foreground colour has been set then we assume a background colour must also be required
			setFontBackColor(display_2.maleRadio.fontBackColor, PadDisplay2.step2_onSetFontBackColorMaleRadio);
		}
	}

	static step2_onSetFontBackColorMaleRadio(wizCtlV, status)
	{
		if(callbackStatusOK("WizCtl SetFontBackColorMaleRadio", status))
		{
			// After setting up the font colours set up the radio button itself
			addRadioButton( display_2.maleRadio, PadDisplay2.step2_onAddRadioButton1);
		}
	}

	static step2_onAddRadioButton1(wizCtlV, status)
	{
		if (callbackStatusOK("WizCtl AddRadioButton1", status ))
		{
			addRadioButton(display_2.femaleRadio, PadDisplay2.step2_onAddRadioButton2);
		}
	}
  
	static step2_onAddRadioButton2(wizCtlV, status)
	{
		if(callbackStatusOK("WizCtl AddRadioButton2", status))
		{
			if (buttonTextType === textSource.STANDARD || buttonTextType === textSource.UTF8) 
			{
				// Set up font colours if required for colour pads
				if (display_2.cancelButton.fontForeColor !== "")
				{
					setFontForeColor(display_2.cancelButton.fontForeColor, PadDisplay2.step2_onSetCancelButtonFontForeColor);
				}
				else
				{
					addButtonObject(display_2.cancelButton, PadDisplay2.step2_onAddCancelButton);
				}
			}
			else
			{
				addObjectImage(display_2.cancelButton, PadDisplay2.step2_onAddCancelButton, buttonTextType);
			}
		}
	}
  
	static step2_onSetCancelButtonFontForeColor(wizCtlV, status)
	{
		if(callbackStatusOK("WizCtl step2_setFontCancelButtonForeColor", status))
		{
			setFontBackColor(display_2.cancelButton.fontBackColor, PadDisplay2.step2_onSetCancelButtonFontBackColor);
		}
	}
	
	static step2_onSetCancelButtonFontBackColor(wizCtlV, status)
	{
		if(callbackStatusOK("WizCtl step2_setCancelButtonFontBackColor", status))
		{
			addButtonObject(display_2.cancelButton, PadDisplay2.step2_onAddCancelButton);
		}
	}   

	static step2_onAddCancelButton(wizCtlV, status)
	{
		if(callbackStatusOK("WizCtl AddCancelButton", status))
		{
			if (buttonTextType === textSource.STANDARD || buttonTextType === textSource.UTF8) 
			{
				addButtonObject(display_2.nextButton, PadDisplay2.step2_onAddNextButton);
			}
			else
			{
				addObjectImage(display_2.nextButton, PadDisplay2.step2_onAddNextButton, buttonTextType);
			}
		}
	}

	static step2_onAddNextButton(wizCtlV, status)
	{
		if(callbackStatusOK("WizCtl AddNextButton", status))
		{
			wizCtl.Display(PadDisplay2.step2_onDisplay);
		}
	}

	static step2_onDisplay(wizCtlV, status)
	{
		if(callbackStatusOK("WizCtl Display", status))
		{
			wizCtl.SetEventHandler(PadDisplay2.step2_Handler);
		}
	}

	/* This is the event handler for the user input on the second screen of the wizard */
	static step2_Handler(ctl, id, type, status)
	{ 
		if(wgssSignatureSDK.ResponseStatus.OK === status)
		{
			switch(id) {
				case buttonEvent.NEXT:
					PadDisplay3.displayScreen3();
					break;
				case buttonEvent.CHECK:
					break;
				case buttonEvent.CANCEL:
					PadDisplay.displayScreen1();
					break;
				case radioSelection.MALE:
					break;
				case radioSelection.FEMALE:
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
}