/* **************************************************************************
  SigCaptX-Wizard-PadDefs.ts
   
  This file contains the functions which define the properties of the pad 
  and the objects which are to be displayed on each screen of the wizard sequence.
  
  Copyright (c) 2021 Wacom Co. Ltd. All rights reserved.
  
   v1.0
  
***************************************************************************/
import { buttonEvent, CheckboxObject, checkSize, checkSizeSelection, IMAGESDIR, padColors, textSource } from './SigCaptX-Globals';
import { buttonFunction, ButtonObject, padRange, padType, RadioObject, RectangleObject, TextObject, WhoObject, WhyObject} from './SigCaptX-Globals';
import { CHECKBOX_USETICKSYMBOL, OUTLINE, SOLIDLINE } from './SigCaptX-Globals';

// This class sets up the main properties to be used for the display depending on which
// STU has been detected.

export class PadControl
{
  buttonBold:boolean;
  buttonSize:number;
  buttonWidth:number;
  checkSize:number;
  font:string;
  height:number;
  width:number;
  checkBoxSize:number;
  range:string;
  display1:any;
  textBold:boolean;
  textLS:number;
  textSize:number;
  titleBold:boolean;
  titleSize:number;
  type:string;
  xButtonLeft:number;
  xButtonRight:number;
  yButton:number;
  yButtonRight:number;
  yText:number;
  yTitle:number;

  constructor(width, height, checkBoxSize, numScreens, buttonTextSource)
  {
    this.font = "Verdana";
    this.height= height;
    this.titleBold = true;
    this.width = width;
    this.checkBoxSize = checkBoxSize;

    switch (width)
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
      case 800:
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
        
      case 396:
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
        
      case 320:
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


  // This class sets up the object definitions for the first screen in the wizard sequence
export class Screen_Display1
{ 
  cancelButton:any;
  checkboxObj:any;
  imageFile:string;
  infoText:any;
  nextButton:any;
  nextToContinue:any;
  signingText:any;
  step1Line:any;
  stepMsg1:any;
  step1Rectangle:any;
  text:string;
  xPos:any;
  yPos:any;

  constructor(pad, buttonTextSource)
  {
    // Object 1 - set up the "Step 1 of 3" text box
    this.stepMsg1 = new TextObject("Step 1 of 3", "right", 2, pad.font, pad.textSize, true);
  
    // Object 2 - set up the "Check boxes provide options...." text message
    this.text = "Check boxes provide options for the signing process and can be transferred to the document";  
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
        if (pad.checkSize == checkSize.STU430_Large)
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

        break;
    }
    this.infoText = new TextObject(this.text, this.xPos, this.yPos, pad.font, pad.textSize, pad.textBold);
    if (pad.range === padRange.STU5X0)
    {
      this.infoText.fontForeColor = padColors.BLUE;
      this.infoText.fontBackColor = padColors.WHITE;
    }
    
    // Set up the details for the check box object
    // If we are setting up the STU 300 definitions for the large checkbox sample then we need to adjust the position
    // of the check box otherwise the screen gets too crowded
    if (pad.range == padRange.STU300 && pad.checkSize == checkSize.STU300_Large)
    {
      this.xPos = pad.width / 4;
      this.yPos = 44;
    }
    else
    if (pad.range == padRange.STU430 && pad.checkSize == checkSize.STU430_Large)
    {
      this.xPos = pad.width/8;
      this.yPos = pad.height/2 - 25;
    }
    else
    {
      this.xPos = pad.width/6;
      this.yPos = pad.height/2;
    }
    this.checkboxObj = new CheckboxObject(this.xPos, this.yPos, pad.font, pad.checkSize, CHECKBOX_USETICKSYMBOL);

    // Set up the details of the "I am signing as a representative" text box
    if (pad.range == padRange.STU300 && pad.checkSize == checkSize.STU300_Large)
    {
      // If we are setting up the STU 300 definitions for the large checkbox sample then we need to adjust the position
      // of the "I am signing..." text to prevent overlapping
      this.xPos = this.checkboxObj.xPos + 2 * pad.checkSize;
      this.yPos = 44 + pad.checkSize - pad.textSize;
    }
    else
    if (pad.range == padRange.STU430 && pad.checkSize == checkSize.STU430_Large)
    {
      this.xPos = this.checkboxObj.xPos + 2 * pad.checkSize;
      this.yPos = this.checkboxObj.yPos + pad.checkSize - pad.textSize;
    }
    else
    {
      this.xPos = this.checkboxObj.xPos + 2 * pad.checkSize;
      this.yPos = pad.height/2 + pad.checkSize - pad.textSize;
    }

    this.signingText = new TextObject("I am signing as a representative", this.xPos, this.yPos, pad.font, pad.textSize);

    if (pad.range === padRange.STU5X0)
    {
      this.signingText.fontForeColor = padColors.GREEN;
      this.signingText.fontBackColor = padColors.WHITE;
    }
    
    // Set up the "When you are ready" text object. Done in separate function because also used later for screen 2
    this.nextToContinue = Display_Utils.setupContinueText(pad, buttonTextSource);
    
    // Set up the Next and Cancel button 
    this.xPos = pad.xButtonRight;
    this.yPos = pad.yButton;
    this.text = "Next";

    // Set up the source of the button depending on what the user has selected on the HTML document
    switch (buttonTextSource)  
    {
      case textSource.UTF8:
        this.text = "下一個";
        break;
        
      case textSource.REMOTE:
        // Override the positions of the buttons when using images
        this.xPos = "right";
        this.yPos = "bottom";
        break;
    } 
    this.nextButton = new ButtonObject(this.xPos, this.yPos, pad.font, pad.buttonSize, pad.buttonWidth, pad.buttonBold,  buttonEvent.NEXT, this.text);
    
    if (pad.range == padRange.STU5X0)
    {
      this.nextButton.fontForeColor = padColors.WHITE;
      this.nextButton.fontBackColor = padColors.PURPLE;
    }
    if (buttonTextSource === textSource.REMOTE)
    {
      this.nextButton.imageFile = Display_Utils.setButtonImageFile(buttonTextSource, pad.range, "RightArrow");
    }

    this.cancelButton = Display_Utils.setupCancelButton(pad, buttonTextSource, buttonFunction.PREVIOUS);  

    // Set up the rectangle or line object used to improve the screen aesthetics  
    if (pad.range == padRange.STU300)
    {
      this.step1Line = new RectangleObject(5, 15, pad.width-3, 15, 1, SOLIDLINE);
    }
    else
    {
      //print("Defining step1Rectangle for pad " + pad.range);
      this.step1Rectangle = new RectangleObject("left", pad.height/8, "right", pad.height*4/5, 1, OUTLINE);
    }
  }
}

// This class sets up the object definitions for the second screen in the wizard sequence
export class Screen_Display2
{
  cancelButton:any;
  femaleRadio:any;
  fontBold:boolean;
  fontSize:number;
  imageFile:string;
  infoObject:any;
  maleRadio:any;
  nextButton:any;
  nextToContinue:any;
  step2Line:any;
  step2Rectangle:any;
  stepMsg2:any;
  text:string;
  xPos:any;
  yPos:any;

  constructor(pad, buttonTextSource)
  {
    // Set up the "Step 2 of 3" text message object
    this.stepMsg2 = new TextObject("Step 2 of 3", "right", 2, pad.font, pad.textSize, true);
    this.stepMsg2.fontForeColor = padColors.BLACK;
    this.stepMsg2.backForeColor = padColors.WHITE;

    // Set up the informational text object
    this.text = "Radio buttons provide options for the signing process and can be transferred to the document";
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
    this.infoObject = new TextObject(this.text, this.xPos, this.yPos, "Verdana", this.fontSize, this.fontBold);
    
    if (pad.range == padRange.STU5X0)
    {
      this.infoObject.fontForeColor = padColors.BLUE;
      this.infoObject.fontBackColor = padColors.WHITE;
    }

    // Next define the radio buttons
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
    this.maleRadio = new RadioObject(this.xPos, this.yPos, pad.font, pad.textSize, pad.textBold, "Male", "Gender", true);
    
    if (pad.range == padRange.STU5X0)
    {
      this.maleRadio.fontForeColor = padColors.GREEN;
      this.maleRadio.fontBackColor = padColors.WHITE;
    }

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
    this.femaleRadio = new RadioObject(this.xPos, this.yPos, pad.font, pad.textSize, pad.textBold, "Female", "Gender", false);  
    if (pad.range == padRange.STU5X0)
    {
      this.femaleRadio.fontForeColor = padColors.GREEN;
      this.femaleRadio.fontBackColor = padColors.WHITE;
    }

    // Set up the "Press NEXT to continue" object  
    this.nextToContinue = Display_Utils.setupContinueText(pad, buttonTextSource);
    
    // Set up the rectangle or line object for display aesthetics
    
    if (pad.range == padRange.STU300)
    {
      this.step2Line = new RectangleObject(5, 15, pad.width-3, 15, 1, SOLIDLINE);
    }
    else
    {
      this.step2Rectangle = new RectangleObject("left", pad.height/8, "right", pad.height*4/5, 1, OUTLINE);
    }

    // Set up the Next and Previous button objects
    // Set up the source of the button depending on what the user has selected on the HTML document
    this.xPos = pad.xButtonRight;
    this.yPos = pad.yButton;
    this.text = "Next";
    switch (buttonTextSource)  
    {
      case textSource.UTF8:
        this.text = "下一個";
        break;
        
      case textSource.REMOTE:
        // Override the positions of the buttons when using images
        this.xPos = "right";
        this.yPos = "bottom";
        break;
    } 
    this.nextButton = new ButtonObject(this.xPos, this.yPos, pad.font, pad.buttonSize, pad.buttonWidth, pad.buttonBold, buttonEvent.NEXT, this.text);
    if (pad.range == padRange.STU5X0)
    {
      this.nextButton.fontForeColor = padColors.WHITE;
      this.nextButton.fontBackColor = padColors.PURPLE;
    }
    if (buttonTextSource === textSource.REMOTE)
    {
      this.nextButton.imageFile = Display_Utils.setButtonImageFile(buttonTextSource, pad.range, "RightArrow");
    }

    this.cancelButton = Display_Utils.setupPreviousButton(pad, buttonTextSource);
  }
}

// This class sets up the object definitions for the third screen in the wizard sequence
export class Screen_Display3
{
  cancelButton:any;
  clearButton:any;
  fontBold:boolean;
  fontSize:number;
  line:any;
  okButton:any;
  penSymbol:any;
  pleaseSign:any;
  sigMarkerLine:any;
  signatureFontSize:number;
  step3Rectangle:any;
  stepMsg3:any;
  text:string;
  who:any;
  why:any;
  XMark:any;
  xPos:any;
  yPos:any;

  constructor(pad, buttonTextSource)
  {
    // Set up the "Step 3 of 3" text message object
    this.stepMsg3 = new TextObject("Step 3 of 3", "right", 2, pad.font, pad.textSize, true);
    this.stepMsg3.fontForeColor = padColors.BLACK;
    this.stepMsg3.backForeColor = padColors.WHITE;
    
    if (pad.range == padRange.STU5X0)
    {
      this.stepMsg3.fontForeColor = padColors.BLACK;
      this.stepMsg3.fontBackColor = padColors.WHITE;
    }
  
    // Set up the rectangle object for screen aesthetics 
    if (pad.range == padRange.STU300)
    { 
      this.step3Rectangle = new RectangleObject(5, 15, pad.width-5, 15, 1, SOLIDLINE);
    }
    else
    {
      this.step3Rectangle = new RectangleObject("left", pad.height/8, "right", pad.height*4/5, 1, OUTLINE);
    }

    // Set up the "Please sign" text object
    this.pleaseSign = new TextObject("Please now sign below", "center", pad.yText, pad.font, pad.textSize, pad.textBold);
    
    if (pad.range == padRange.STU5X0)
    {
      this.pleaseSign.fontForeColor = padColors.BLUE;
      this.pleaseSign.fontBackColor = padColors.WHITE;
    }
    
    // Set up the "X" object for marking where the signature is to be input  
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
        this.xPos = 70;
        this.yPos = 230;
        this.fontBold = pad.textBold;
        break;
      case padRange.STU5X0:
        this.fontSize = 32;
        this.xPos = 80;
        this.yPos = 250;
        this.fontBold = pad.textBold;
        break;
    }
    this.XMark = new TextObject("X", this.xPos, this.yPos, pad.font, this.fontSize, this.fontBold);

    if (pad.range === padRange.STU5X0)
    {
      this.XMark.fontForeColor = padColors.RED;
      this.XMark.fontBackColor = padColors.WHITE;
    }
    
    // Set up the underlining for the signature
    switch (pad.range)
    {
      case padRange.STU300:
        this.fontSize = 18;  
        this.xPos = 110;
        this.yPos = 250;
        this.text = "..............................";
        break;
      case padRange.STU430:
        this.fontSize = 15;  
        this.xPos = 40;
        this.yPos = 100;
        this.text = "..............................";
        break;
      case padRange.STU500:
        this.fontSize = 15;  
        this.xPos = 85;
        this.yPos = 250;
        this.text = "....................................................................";
        break;
      case padRange.STU5X0:
        this.fontSize = 32;  
        this.xPos = 110;
        this.yPos = 250;
        this.text = "........................................";

        break;
    }
    this.sigMarkerLine = new TextObject(this.text, this.xPos, this.yPos, pad.font, this.fontSize, pad.textBold);
    if (pad.range === padRange.STU5X0)
    {
      this.sigMarkerLine.fontForeColor = padColors.GREEN;
      this.sigMarkerLine.fontBackColor = padColors.WHITE;
    }

    // Set up the signatory objects
    if (pad.range == padRange.STU300)
    {
      this.xPos = "left";
      this.yPos = pad.yText;
    }
    else
    {
      this.xPos = "right";
      this.yPos = 0.65*pad.height;
    }
    this.who = new WhoObject("J Smith", this.xPos, this.yPos, pad.font, pad.textSize, pad.textBold); 

    // Set up the Reason for signing text object  
        
    if (pad.range == padRange.STU300)
    {
      this.xPos = "left";
      this.yPos = 2;
    }
    else
    {
      this.xPos = "right";
      this.yPos = 0.65*pad.height + pad.textLS;
    }
    this.why = new WhyObject("I certify that the information is correct", this.xPos, this.yPos, pad.font, pad.textSize, pad.textBold);

    if (pad.range == padRange.STU5X0)
    {
      this.why.fontForeColor = padColors.BLUE;
      this.why.fontBackColor = padColors.WHITE;
    }

    // Set up the OK button object
    this.okButton = new ButtonObject(pad.xButtonRight, pad.yButton, pad.font, pad.buttonSize, pad.buttonWidth, pad.buttonBold, buttonEvent.OK, "OK");
    
    if (pad.range == padRange.STU5X0)
    {
      this.okButton.fontForeColor = padColors.WHITE;
      this.okButton.fontBackColor = padColors.PURPLE;
    }
    
    // Set up the source of the button depending on what the user has selected on the HTML document
    switch (buttonTextSource)  
    {
      case textSource.UTF8:
        this.okButton.buttonText = "好";
        break;
        
      case textSource.REMOTE:
        // Override the positions of the buttons when using images
        this.okButton.xPos = "right";
        this.okButton.yPos = "bottom";
        this.okButton.imageFile = Display_Utils.setButtonImageFile(buttonTextSource, pad.range, "Accept");
        break;
    } 

    // Set up the Clear button object
    this.clearButton = new ButtonObject("center", pad.yButton, pad.font, pad.buttonSize, pad.buttonWidth, pad.buttonBold, buttonEvent.CLEAR, "Clear");
        
    if (pad.range == padRange.STU5X0)
    {
      this.clearButton.fontForeColor = padColors.WHITE;
      this.clearButton.fontBackColor = padColors.PURPLE;
    }

    // Set up the source of the button depending on what the user has selected on the HTML document
    switch (buttonTextSource)  
    {
      case textSource.UTF8:
        this.clearButton.buttonText = "肃清";
        break;
        
      case textSource.REMOTE:
        // Override the positions of the buttons when using images
        this.clearButton.xPos = "centre";
        this.clearButton.yPos = "bottom";
        this.clearButton.imageFile = Display_Utils.setButtonImageFile(buttonTextSource, pad.range, "Clear");
        break;
    } 

    // Set up the Cancel button object
    this.cancelButton = Display_Utils.setupCancelButton(pad, buttonTextSource, buttonFunction.CANCEL); 

    this.signatureFontSize = pad.textSize;
    
    // Finally add 2 objects which are specific to the 300
    if (pad.range == padRange.STU300)
    {
      this.line = new RectangleObject(5, 15, pad.width-3, 15, 1, SOLIDLINE);
      this.penSymbol = new TextObject("\x3f", "right", 25, "WingDings", 30, false); 
    }
  }
}

export class Display_Utils
{
  // Function to set up the properties of the Next button 
  static setupNextButton = (pad, buttonTextSource) =>
  {
    // Set up the Next button object
    const nextButton = new ButtonObject(pad.xButtonRight, pad.yButton, pad.font, pad.buttonSize, pad.buttonWidth, pad.buttonBold, buttonEvent.NEXT, "Next");
    
    if (pad.range == padRange.STU5X0)
    {
      nextButton.fontForeColor = padColors.WHITE;
      nextButton.fontBackColor = padColors.PURPLE;
    }
    
    // Set up the source of the button depending on what the user has selected on the HTML document
    switch (buttonTextSource)  
    {
      case textSource.UTF8:
        nextButton.buttonText = "下一個";
        break;
        
      case textSource.REMOTE:
        // Override the positions of the buttons when using images
        nextButton.xPos = "right";
        nextButton.yPos = "bottom";
        nextButton.imageFile = Display_Utils.setButtonImageFile(buttonTextSource, pad.range, "RightArrow");
        break;
    } 
    return nextButton;
  }

  // Function to set up the properties of the Cancel button
  static setupCancelButton = (pad, buttonTextSource, buttonFunc) =>
  {
    var imageFilePrefix;
    
    var cancelButton = new ButtonObject(pad.xButtonLeft, pad.yButton, pad.font, pad.buttonSize, pad.buttonWidth, pad.buttonBold, "Cancel", "Cancel"); 
    
    if (pad.range == padRange.STU5X0)
    {
      cancelButton.fontForeColor = padColors.WHITE;
      cancelButton.fontBackColor = padColors.PURPLE;
    }
    
    if (buttonFunc == buttonFunction.PREVIOUS)
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
        cancelButton.buttonText = "取消";
        break;
        
      case textSource.REMOTE:
        // Override the positions of the buttons when using images
        cancelButton.xPos = "left";
        cancelButton.yPos = "bottom";
        cancelButton.imageFile = Display_Utils.setButtonImageFile(buttonTextSource, pad.range, imageFilePrefix);
        break;
    } 
    return cancelButton;
  }

  
  // Function to set up the properties of the Previous button (arrow)
  static setupPreviousButton = (pad, buttonTextSource) =>
  {
    // Set up the Previous button object
    const previousButton = new ButtonObject(pad.xButtonLeft, pad.yButton, pad.font, pad.buttonSize, pad.buttonWidth, pad.buttonBold, buttonEvent.CANCEL, "Previous");  
    
    if (pad.range == padRange.STU5X0)
    {
      previousButton.fontForeColor = padColors.WHITE;
      previousButton.fontBackColor = padColors.PURPLE;
    }
    
    // Set up the source of the button depending on what the user has selected on the HTML document
    switch (buttonTextSource)  
    {
      case textSource.UTF8:
        previousButton.buttonText = "取消";
        break;
        
      case textSource.REMOTE:
        // Override the positions of the buttons when using images
        previousButton.xPos = "left";
        previousButton.yPos = "bottom";
        previousButton.imageFile = Display_Utils.setButtonImageFile(buttonTextSource, pad.range, "LeftArrow");
        break;
    } 
    return previousButton;
  }
  
  // Function to set up the properties of the text which prompts the user to press Next or right arrow to continue
  static setupContinueText = (pad, buttonTextSource) =>
  {
    let text:string;
    let yPos:any;

    if (buttonTextSource == textSource.LOCAL || buttonTextSource == textSource.REMOTE)
    {
      text = "Press right arrow to continue";
    }   
    else
    {
      if (pad.range == padRange.STU300)
      {
        text = "Press Next to continue";
      }
      else
      {
        text = "When you are ready press NEXT to continue";
      }
    }
    if (pad.range == padRange.STU300)
    {
      yPos = "bottom";
    }
    else
    {
      yPos = pad.height*2/3;
    }

    const nextToContinue = new TextObject(text, "center", yPos, "Verdana", pad.textSize, false);
    
    // For the colour pads set up the font colours
    if (pad.range == padRange.STU5X0)
    {
      nextToContinue.fontForeColor = padColors.BLUE;
      nextToContinue.fontBackColor = padColors.WHITE;
    }
    
    /* The text of the "When ready press Next to continue" message varies depending on which pad is in use  
      (there is less space available on the 300) and whether the user has selected images for the    
        Next and Cancel buttons because the images are arrows, not words */

    return nextToContinue;
  }

  // Function to define the image file which is used for a given button
  static setButtonImageFile = (buttonTextSource, currentPadRange, imagePrefix) =>
  {
    var filePath;
    var imageFile;
  
    filePath = IMAGESDIR;
    
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
