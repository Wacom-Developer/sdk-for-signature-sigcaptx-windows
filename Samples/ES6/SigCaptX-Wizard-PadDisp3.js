/* **************************************************************************
  SigCaptX-Wizard-PadDisp3.js
   
  This file contains the objects and methods relating to the third screen of the wizard sequence.
  
  Copyright (c) 2021 Wacom Co. Ltd. All rights reserved.
  
  v4.0
  
***************************************************************************/

class PadDisplay3 extends PadDisplay
{
	constructor(stepMsgText, stuProperties, buttonTextSource)
	{
		super(stepMsgText, stuProperties, buttonTextSource);
		this.step3Rectangle = null;
	}

	// This function sets up the object definitions for the third screen in the wizard sequence
	setupDisplay3(pad, buttonTextSource)
	{
		let buttonText;
		let imageFile;
		let textString;
		let x1Pos, y1Pos, x2Pos, y2Pos;
		let options;
		
		if (pad.range === padRange.STU5X0)
		{
			this.foreColor = padColors.BLACK;
			this.backColor = padColors.WHITE;
		}
		else
		{
			this.foreColor = "";
			this.backColor = "";
		}
		// Set up the rectangle object for screen aesthetics 
		if (pad.range === padRange.STU300)
		{ 
			 this.x1Pos = 5;
			 this.y1Pos = 15;
			 this.x2Pos = pad.width-5;
			 this.y2Pos = 15;  
			 this.options = SOLIDLINE;
		}
		else
		{
			 this.x1Pos = "left";
			 this.y1Pos = pad.height/8;
			 this.x2Pos = "right";
			 this.y2Pos = pad.height*4/5;  
			 this.options = OUTLINE;
		}
		this.step3Rectangle = new ShapeObject(this.x1Pos, this.y1Pos, pad.font, pad.textSize, "", "", 
																					this.x2Pos, this.y2Pos, 1, this.options);

		// Set up the "Please sign" text object
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
		this.pleaseSign = new WizTextObject("txt", "Please now sign below", "center", pad.yText, pad.font, 
																				pad.textBold, pad.textSize, this.backColor, this.foreColor);

		// Set up the "X" object for marking where the signature is to be input  
		this.foreColor = "";
		this.backColor = "";
			
		switch (pad.range)
		{
			 case padRange.STU300:
				 this.fontSize = 18;
				 this.xPos = 30;
				 this.yPos = 100;
				 this.fontBold = pad.textBold;
				 break;
			 case padRange.STU430:
				 this.fontSize = 15;
				 this.xPos = 20;
				 this.yPos = 100;
				 this.fontBold = false;
				 break;
			 case padRange.STU500:
				 this.fontSize = 32;
				 this.xPos = 80;
				 this.yPos = 250;
				 this.fontBold = pad.TextBold;
				 break;
			 case padRange.STU5X0:
				 this.fontSize = 32;
				 this.xPos = 80;
				 this.yPos = 250;
				 this.fontBold = pad.TextBold;
				 this.foreColor = padColors.RED;
				 this.backColor = padColors.WHITE;
				 break;
		}
		this.XMark = new WizTextObject("txt", "X", this.xPos, this.yPos, pad.font, 
																		this.fontBold, this.fontSize, this.backColor, this.foreColor);
	
		// Set up the underlining for the signature
		this.foreColor = "";
		this.backColor = "";
				
		switch (pad.range)
		{
			case padRange.STU300:
				this.fontSize = 18;  
				this.xPos = 110;
				this.yPos = 250;
				this.textString = "..............................";
				break;
			case padRange.STU430:
				this.fontSize = 15;  
				this.xPos = 40;
				this.yPos = 100;
				this.textString = "..............................";
				break;
			case padRange.STU500:
				this.fontSize = 15;  
				this.xPos = 110;
				this.yPos = 250;
				textString = "..............................";
				break;
			case padRange.STU5X0:
				this.fontSize = 32;  
				this.xPos = 110;
				this.yPos = 250;
				textString = "........................................";
				this.foreColor = padColors.GREEN;
				this.backColor = padColors.WHITE;
				break;
		}
		this.sigMarkerLine = new WizTextObject("txt", textString, this.xPos, this.yPos, 
																						pad.font, pad.textBold, this.fontSize, this.backColor, this.foreColor);
		
		// Set up the signatory who object  
		if (pad.range === padRange.STU300)
		{
			this.xPos = "left";
			this.yPos = pad.yText;
		}
		else
		{
			this.xPos = "right";
			this.yPos = 0.65*pad.height;
		}
		this.who = new WizTextObject("who", "J Smith", this.xPos, this.yPos, pad.font, pad.textBold, pad.textSize, "", "");
		
		// Set up the Reason for signing text object  
		this.foreColor = "";
		this.backColor = "";
		
		if (pad.range === padRange.STU300)
		{
			this.xPos = "left";
			this.yPos = 2;
		}
		else
		{
			this.xPos = "right";
			this.yPos = 0.65*pad.height + pad.textLS;
			if (pad.range === padRange.STU5X0)
			{
				this.foreColor = padColors.BLUE;
				this.backColor = padColors.WHITE;
			}
		}
		this.why = new WizTextObject("why", "I certify that the information is correct", this.xPos, this.yPos, pad.font, pad.textBold, pad.textSize, this.backColor, this.foreColor);
		
		// Set up the OK button object
		buttonText = "OK";
		this.xPos = pad.xButtonRight;
		this.yPos = pad.yButton;
		
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
		switch (buttonTextSource)  
		{
			case textSource.UTF8:
				buttonText = "好";
				break;
				
			case textSource.LOCAL:
				// Override the positions of the buttons when using images
				this.xPos = "right";
				this.yPos = "bottom";
				this.imageFile = PadDisplay.setButtonImageFile(buttonTextSource, pad.range, "Accept");
				break;
				
			case textSource.REMOTE:
				// Override the positions of the buttons when using images
				this.xPos = "right";
				this.yPos = "bottom";
				this.imageFile = PadDisplay.setButtonImageFile(buttonTextSource, pad.range, "Accept");
				break;
		} 
		this.okButton = new ButtonObject(this.xPos, this.yPos, pad.font, pad.buttonBold, pad.buttonSize, 
																			this.backColor, this.foreColor, buttonText, "OK", pad.buttonWidth, this.imageFile);

		// Set up the Clear button object
		this.yPos = pad.yButton;
		this.buttonText = "Clear";

		// Set up the source of the button depending on what the user has selected on the HTML document
		switch (buttonTextSource)  
		{
			case textSource.UTF8:
				this.buttonText = "肃清";
				break;
				
			case textSource.LOCAL:
				// Override the positions of the buttons when using images
				this.yPos = "bottom";
				this.imageFile = PadDisplay.setButtonImageFile(buttonTextSource, pad.range, "Clear");
				break;
				
			case textSource.REMOTE:
				// Override the positions of the buttons when using images
				this.yPos = "bottom";
				this.imageFile = PadDisplay.setButtonImageFile(buttonTextSource, pad.range, "Clear");
				break;
		} 
		this.clearButton = new ButtonObject("center", this.yPos, pad.font, pad.buttonBold, pad.buttonSize, 
										this.backColor, this.foreColor, this.buttonText, "Clear", pad.buttonWidth, this.imageFile);
										
		// Set up the Cancel button object
		this.cancelButton = PadDisplay.setupCancelButton(pad, buttonTextSource, buttonFunction.CANCEL); 

		this.signatureFontSize = pad.textSize;
		
		// Finally add 2 objects which are specific to the 300
		if (pad.range === padRange.STU300)
		{
			this.line = new ShapeObject(5, 15, pad.font, pad.textSize, "", "", pad.width-3, 15, 1, SOLIDLINE);
			this.penSymbol = new WizTextObject("txt", "\x3f", "right",25, "Wingdings", false, 30, "", ""); 
		}
	}

	static displayScreen3()
	{
		wizCtl.Reset(PadDisplay3.step3_onWizCtlReset);
	}

	static step3_onWizCtlReset(wizCtlV, status)
	{
		if(callbackStatusOK("WizCtl Reset", status))
		{
			setFont(display_3.stepMsg.fontName, display_3.stepMsg.fontSize, display_3.stepMsg.fontBold, false, PadDisplay3.step3_onPutFont);
		}
	}

	static step3_onPutFont(wizCtlV, status)
	{
		let fontForeColor;
		
		if(callbackStatusOK("WizCtl step3 PutFont", status))
		{
			// In case font colours were changed on the previous screen make sure we revert to black on white now
			
			if (pad.range === padRange.STU5X0)
			{
				if (display_3.stepMsg.fontForeColor !== "")
				{
					fontForeColor = display_3.stepMsg.fontForeColor;
				}
				else
				{
					fontForeColor = padColors.BLACK;
				}
				setFontForeColor(fontForeColor, PadDisplay3.step3_onSetstepMsgFontForeColor);
			}
			else
			{
				addTextObject(display_3.stepMsg, PadDisplay3.step3_onAddText1);
			}
		}
	}
		
	static step3_onSetstepMsgFontForeColor(wizCtlV, status)
	{
		let fontBackColor;
		
		if(callbackStatusOK("WizCtl setstepMsgFontForeColor", status))
		{
			if (display_3.stepMsg.fontBackColor !== "")
			{
				fontBackColor = display_3.stepMsg.fontBackColor;
			}
			else
			{
				fontBackColor = padColors.WHITE;
			}
			setFontBackColor(fontBackColor, PadDisplay3.step3_onSetstepMsgFontBackColor);
		}
	}
		
	static step3_onSetstepMsgFontBackColor(wizCtlV, status)
	{
		if(callbackStatusOK("WizCtl setstepMsgFontBackColor", status))
		{
			addTextObject(display_3.stepMsg, PadDisplay3.step3_onAddText1);
		}
	}  

	static step3_onAddText1(wizCtlV, status)
	{
		if(callbackStatusOK("WizCtl AddText1", status))
		{
			/* Because of the very different dimensions of the STU 300 we have to have use 
				a different layout for the buttons and text etc so there are separate routines just for the 300 */
			if(padType.STU300 === pad.type)
			{
				PadDisplay3.step3_isSTU300();
			}
			else
			{
				PadDisplay3.step3_notSTU300();
			}      
		}
	}
		
	static step3_notSTU300()
	{
		addRectangle( display_3.step3Rectangle, PadDisplay3.step3_onAddPrimitive1);
	}

	static step3_onAddPrimitive1(wizCtlV, status)
	{
		if(callbackStatusOK("WizCtl AddPrimitive", status))
		{
			setFont(display_3.pleaseSign.fontName, display_3.pleaseSign.fontSize, display_3.pleaseSign.fontBold, false, PadDisplay3.step3_onPutFont2);
		}
	}

	static step3_onPutFont2(wizCtlV, status)
	{
		if(callbackStatusOK("WizCtl PutFont2", status))
		{
			/* If we are using a colour pad then set the colour of the foreground and 
					background fonts up now if defined in the text object */
			if (display_3.pleaseSign.fontForeColor !== "")
			{
				setFontForeColor(display_3.pleaseSign.fontForeColor, PadDisplay3.step3_onSetFontForeColorPleaseSign);
			}
			else
			{
				addTextObject(display_3.pleaseSign, PadDisplay3.step3_onAddText2);
			}
		}
	}
		
	static step3_onSetFontForeColorPleaseSign(wizCtlV, status)
	{
		if(callbackStatusOK("WizCtl SetFontForeColorPleaseSign", status))
		{
			// If a foreground colour has been set then we assume a background colour must also be required
			setFontBackColor(display_3.pleaseSign.fontBackColor, PadDisplay3.step3_onSetFontBackColorPleaseSign);
		}
	}

	static step3_onSetFontBackColorPleaseSign(wizCtlV, status)
	{
		if(callbackStatusOK("WizCtl SetFontBackColorPleaseSign", status))
		{
			// After setting up the font colours set up the text string itself
			addTextObject(display_3.pleaseSign, PadDisplay3.step3_onAddText2);
		}
	}

	static step3_onAddText2(wizCtlV, status)
	{
		if(callbackStatusOK("WizCtl AddText2", status))
		{
			setFont(display_3.XMark.fontName, display_3.XMark.fontSize, display_3.XMark.fontBold, false, PadDisplay3.step3_onPutFontXMark);
		}
	}

	static step3_onPutFontXMark(wizCtlV, status)
	{
		if(callbackStatusOK("WizCtl FontXMark", status))
		{
			/* If we are using a colour pad then set the colour of the foreground and background 
					fonts up now if defined in the text object */
			if (display_3.XMark.fontForeColor !== "")
			{
				setFontForeColor(display_3.XMark.fontForeColor, PadDisplay3.step3_onSetFontForeColorXMark);
			}
			else
			{
				addTextObject(display_3.XMark, PadDisplay3.step3_onAddTextXMark);
			}
		}
		else
		{
			addTextObject(display_3.XMark, PadDisplay3.step3_onAddTextXMark);
		}
	}

	static step3_onSetFontForeColorXMark(wizCtlV, status)
	{
		if(callbackStatusOK("WizCtl SetFontForeColorXMark", status))
		{
			// If a foreground colour has been set then we assume a background colour must also be required
			setFontBackColor(display_3.XMark.fontBackColor, PadDisplay3.step3_onSetFontBackColorXMark);
		}
	}
		
	static step3_onSetFontBackColorXMark(wizCtlV, status)
	{
		if(callbackStatusOK("WizCtl SetFontBackColorXMark", status))
		{
			// After setting up the font colours set up the text string itself
			addTextObject(display_3.XMark, PadDisplay3.step3_onAddTextXMark);
		}
	}
 
	static step3_onAddTextXMark(wizCtlV, status)
	{
		if(callbackStatusOK("WizCtl AddTextXMark", status))
		{
			addTextObject(display_3.sigMarkerLine, PadDisplay3.step3_onAddMarkerLine);
		}
	}

	static step3_onAddMarkerLine(wizCtlV, status)
	{
		if(callbackStatusOK("WizCtl AddMarkerLine", status))
		{
			setFont(pad.font, display_3.signatureFontSize, pad.textBold, false, PadDisplay3.step3_onPutSignatureFont);
		}
	}

	static step3_onPutSignatureFont(wizCtlV, status)
	{
		if(callbackStatusOK("WizCtl PutSignatureFont", status))
		{
			addSignatureObject(sigCtl, PadDisplay3.step3_onAddSignature);
		}
	}

	static step3_onAddSignature(wizCtlV, status)
	{
		if(callbackStatusOK("WizCtl AddSignature", status))
		{
			/* If we are using a colour pad then set the colour of the foreground and 
					background fonts up now if defined in the text object */
			if (display_3.why.fontForeColor !== "")
			{
				setFontForeColor(display_3.why.fontForeColor, PadDisplay3.step3_onSetFontForeColorWhy);
			}
			else
			{
				addTextObject(display_3.who, PadDisplay3.step3_onAddWho);
			}
		}
		else
		{
			addTextObject(display_3.who, PadDisplay3.step3_onAddWho);
		}
	}

	static step3_onSetFontForeColorWhy(wizCtlV, status)
	{
		if(callbackStatusOK("WizCtl SetFontForeColorWhy", status))
		{
			// If a foreground colour has been set then we assume a background colour must also be required
			setFontBackColor(display_3.why.fontBackColor, PadDisplay3.step3_onSetFontBackColorWhy);
		}
	}
  
	static step3_onSetFontBackColorWhy(wizCtlV, status)
	{
		if(callbackStatusOK("WizCtl SetFontBackColorWhy", status))
		{
			// After setting up the font colours set up the text string itself
			addTextObject(display_3.who, PadDisplay3.step3_onAddWho);
		}
	}

	static step3_onAddWho(wizCtlV, status)
	{
		if(callbackStatusOK("WizCtl AddWho", status))
		{
			addTextObject(display_3.why, PadDisplay3.step3_onAddWhy);
		}
	}

	static step3_onAddWhy(wizCtlV, status)
	{
		if(callbackStatusOK("WizCtl AddWhy", status))
		{
			setFont(display_3.okButton.fontName, display_3.okButton.buttonSize, display_3.okButton.fontBold, false, PadDisplay3.step3_onPutFontOK);
		}
	}

	static step3_onPutFontOK(wizCtlV, status)
	{
		if(callbackStatusOK("WizCtl PutFontOK", status))
		{					
			if (buttonTextType === textSource.STANDARD || buttonTextType === textSource.UTF8) 
			{
				// Set up font colours if required for colour pads
				if (display_3.okButton.fontForeColor !== "")
				{
					setFontForeColor(display_3.okButton.fontForeColor, PadDisplay3.step3_onSetOKButtonFontForeColor);
				}
				else
				{
					addButtonObject(display_3.okButton, PadDisplay3.step3_onAddOK);
				}
			}
			else
			{
				addObjectImage(display_3.okButton, PadDisplay3.step3_onAddOK, buttonTextType);
			}
		}
	}
	static step3_onSetOKButtonFontForeColor(wizCtlV, status)
	{
		if(callbackStatusOK("WizCtl step3 setFontOKButtonForeColor", status))
		{
			setFontBackColor(display_3.okButton.fontBackColor, PadDisplay3.step3_onSetOKButtonFontBackColor);
		}
	}
		
	static step3_onSetOKButtonFontBackColor(wizCtlV, status)
	{
		if(callbackStatusOK("WizCtl step3_setOKButtonFontBackColor", status))
		{
			addButtonObject(display_3.okButton, PadDisplay3.step3_onAddOK);
		}
	}   

	static step3_onAddOK(wizCtlV, status)
	{
		if(callbackStatusOK("WizCtl AddOK", status))
		{					
			if (buttonTextType === textSource.STANDARD || buttonTextType === textSource.UTF8) 
			{
				addButtonObject(display_3.clearButton, PadDisplay3.step3_onAddClear);
			}
			else
			{
				addObjectImage(display_3.clearButton, PadDisplay3.step3_onAddClear, buttonTextType);
			}
		}
	}

	static step3_onAddClear(wizCtlV, status)
	{
		if(callbackStatusOK("WizCtl AddClear", status))
		{
			if (buttonTextType === textSource.STANDARD || buttonTextType === textSource.UTF8) 
			{
				addButtonObject(display_3.cancelButton, PadDisplay3.step3_doDisplay);
			}
			else
			{
				addObjectImage(display_3.cancelButton, PadDisplay3.step3_doDisplay, buttonTextType);
			}
		}
	}

	// The following group of methods are only applicable to the STU 300 

	static step3_isSTU300()
	{
		addLine(display_3.line, PadDisplay3.step3_onAddPrimitiveSTU300);
	}

	// STU 300
	static step3_onAddPrimitiveSTU300(wizCtlV, status)
	{
		if(callbackStatusOK("WizCtl AddPrimitiveSTU300", status))
		{
			setFont(display_3.penSymbol.fontName, display_3.penSymbol.fontSize, pad.textBold, wgssSignatureSDK.FontCharset.SYMBOL_CHARSET, PadDisplay3.step3_onPutFontPenSymbol);
		}
	}
  
  // STU 300
	static step3_onPutFontPenSymbol(wizCtlV, status)
	{
		if(callbackStatusOK("WizCtl PutFontPenSymbol", status))
		{
			wizCtl.GetFont(PadDisplay3.step3_onGetFontSTU300);
		}
	}

	// STU 300
	static step3_onGetFontSTU300(wizCtlV, font, status)
	{
		if(callbackStatusOK("WizCtl GetFontSTU300", status))
		{
			addTextObject(display_3.penSymbol, PadDisplay3.step3_onAddText1STU300);
		}
	}

	// STU 300
	static step3_onAddText1STU300(wizCtlV, status)
	{
		if(callbackStatusOK("WizCtl AddText1STU300", status))
		{
			setFont(pad.font, pad.signatureFontSize, wgssSignatureSDK.FontWeight.FW_NORMAL, false, PadDisplay3.step3_onPutSignatureFont);
		}
	}
	// end of STU300 methods

	// These next 2 methods are called regardless of the STU currently in use
	static step3_doDisplay(wizCtlV, status)
	{
		if(callbackStatusOK("WizCtl AddCancelButton", status))
		{
			wizCtl.Display(PadDisplay3.step3_onDisplay);
		}
	}

	static step3_onDisplay(wizCtlV, status)
	{
		if(callbackStatusOK("WizCtl Display", status))
		{
			wizCtl.SetEventHandler(PadDisplay3.step3_Handler);
		}
	}

	/* This is the event handler for the user input on the third screen of the wizard i.e. signature capture*/
	static step3_Handler(ctl, id, type, status)
	{    
		if(wgssSignatureSDK.ResponseStatus.OK === status)
		{
			switch(id) {
				case buttonEvent.OK:
					//UserMsg.print("OK selected");
					sigDetails = new SigDetails(ctl.sigObj);  // Needed in SigCaptX-SessionControl.j
					WizSessionCtrl.script_Completed(false);
					break;
				case buttonEvent.CLEAR:
					UserMsg.print("Clear");
					break;
				case buttonEvent.CANCEL:
					UserMsg.print("Previous");
					WizSessionCtrl.script_Cancelled();
					break;
				default:
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

