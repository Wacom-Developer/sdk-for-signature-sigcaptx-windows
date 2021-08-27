/* **************************************************************************
  SigCaptX-Wizard-PadDefs.js
   
  This file contains the functions which define the properties of the pad 
  and the objects which are to be displayed on each screen of the wizard sequence.
  The object classes are defined in SigCaptX-Wizard-Main.js
  
  Copyright (c) 2021 Wacom Co. Ltd. All rights reserved.
  
   v1.1  Use React state objects for updating the DOM
  
***************************************************************************/


// This function sets up the main properties to be used for the display depending on which
// STU has been detected.

function CPad_STU(padWidth, padHeight, checkBoxSize)
{
  //print ("Defining pad for width/height : " + padWidth + "/" + padHeight);
  this.Font = "Verdana";
  this.Height = padHeight;
  this.TitleBold = true;
  this.Width = padWidth;
  
  // Set the pad model using the display width
  
  switch (padWidth)
  {
    case 640: 
      this.Range = padRange.STU500;
      this.Type = padType.STU500;
      if (checkBoxSize == checkSizeSelection.LARGE)
      {
        this.CheckSize = checkSize.STU500_Large;
      }
      else
      {
        this.CheckSize = checkSize.STU500_Small;
      }
      this.ButtonBold = false;
      this.ButtonSize = 22;
      this.ButtonWidth = 110;
      this.TextBold = false;
      this.TextLS = 30;
      this.TextSize = 16;
      this.TitleSize = 22;
      this.xButtonLeft = 30;
      this.xButtonRight = 500;
      this.yButton = 415;
      this.yText = 120;
      this.yTitle = 10;
      break;
    case 800:
      this.Range = padRange.STU5X0;
      this.Type = padType.STU5X0;
      if (checkBoxSize == checkSizeSelection.LARGE)
      {
        this.CheckSize = checkSize.STU5X0_Large;
      }
      else
      {
        this.CheckSize = checkSize.STU5X0_Small;
      }
      this.ButtonBold = false;
      this.ButtonSize = 22;
      this.ButtonWidth = 110;
      this.TextBold = false;
      this.TextLS = 30;
      this.TextSize = 16;
      this.TitleSize = 22;
      this.xButtonLeft = 30;
      this.xButtonRight = 660;
      this.yButton = 415;
      this.yText = 120;
      this.yTitle = 10;
      break;
      
    case 396:
      this.Range = padRange.STU300;
      this.Type = padType.STU300;
      if (checkBoxSize == checkSizeSelection.LARGE)
      {
        this.CheckSize = checkSize.STU300_Large;
      }
      else
      {
        this.CheckSize = checkSize.STU300_Small;
      }
      this.ButtonBold = true;
      this.ButtonSize = 8;
      this.ButtonWidth = 70;
      this.TextBold = false;
      this.TextLS = 12;
      this.TextSize = 8;
      this.TitleSize = 8;
      this.xButtonLeft = 10;
      this.xButtonRight = 316;
      this.yButton = 82;
      this.yText = 20;
      this.yTitle = 2;
      break;
      
    case 320:
      this.Range = padRange.STU430;
      this.Type = padType.STU430;
      if (checkBoxSize == checkSizeSelection.LARGE)
      {
        this.CheckSize = checkSize.STU430_Large;
      }
      else
      {
        this.CheckSize = checkSize.STU430_Small;
      }
      this.ButtonBold = true;
      this.ButtonSize = 12;
      this.ButtonWidth = 70;
      this.TextBold = true;
      this.TextLS = 15;
      this.TextSize = 9;
      this.TitleSize = 11;
      this.xButtonLeft = 5;
      this.xButtonRight = 243;
      this.yButton = 170;
      this.yText = 40;
      this.yTitle = 3;
      break;
  }
}

// This function sets up the object definitions for the first screen in the wizard sequence
function screen_Display1(pad, buttonTextSource)
{ 
  // Object 1 - set up the "Step 1 of 3" text box
  this.stepMsg1 = new textObject();
  this.stepMsg1.xPos = "right";
  this.stepMsg1.yPos = 2;
  this.stepMsg1.textString = "Step 1 of 3";
  this.stepMsg1.fontName = pad.Font;
  this.stepMsg1.fontBold = true;
  this.stepMsg1.fontSize = pad.TextSize;
  this.stepMsg1.type = "txt";
 
  // Object 2 - set up the "Check boxes provide options...." text message
  this.infoText = new textObject();
  this.infoText.textString = "Check boxes provide options for the signing process and can be transferred to the document";
  this.infoText.fontName = pad.Font;
  this.infoText.fontBold = pad.TextBold;
  this.infoText.fontSize = pad.TextSize;  
  this.infoText.fontForeColor = "";
  this.infoText.fontBackColor = "";
  
  switch (pad.Range)
  {
    case padRange.STU300:
      this.infoText.xPos = 10;
      this.infoText.yPos = 20;
      break;
    case padRange.STU430:
      this.infoText.xPos = 10;
      this.infoText.yPos = 40;
      // If using large check box the text message must be moved up
      if (pad.CheckSize == checkSize.STU430_Large)
      {
        this.infoText.yPos = 32;
      }
      break;
    case padRange.STU500:
      this.infoText.xPos = 30;
      this.infoText.yPos = 120;
      break;
    case padRange.STU5X0:
      this.infoText.xPos = 30;
      this.infoText.yPos = 120;
      this.infoText.fontForeColor = padColors.BLUE;
      this.infoText.fontBackColor = padColors.WHITE;
      break;
  }
  
  // Set up the details for the check box object
  this.checkboxObj = new checkboxObject();
  
  // If we are setting up the STU 300 definitions for the large checkbox sample then we need to adjust the position
  // of the check box otherwise the screen gets too crowded
  if (pad.Range == padRange.STU300 && pad.CheckSize == checkSize.STU300_Large)
  {
    this.checkboxObj.xPos = pad.Width / 4;
    this.checkboxObj.yPos = 44;
  }
  else
  if (pad.Range == padRange.STU430 && pad.CheckSize == checkSize.STU430_Large)
  {
    this.checkboxObj.xPos = pad.Width/8;
    this.checkboxObj.yPos = pad.Height/2 - 25;
  }
  else
  {
    this.checkboxObj.xPos = pad.Width/6;
    this.checkboxObj.yPos = pad.Height/2;
  }
  this.checkboxObj.options = CHECKBOX_USETICKSYMBOL;
  this.checkboxObj.fontName = pad.Font;
  this.checkboxObj.fontSize = pad.CheckSize;

  // Set up the details of the "I am signing as a representative" text box
  this.signingText = new textObject();
  // If we are setting up the STU 300 definitions for the large checkbox sample then we need to adjust the position
  // of the "I am signing..." text to prevent overlapping
  if (pad.Range == padRange.STU300 && pad.CheckSize == checkSize.STU300_Large)
  {
     this.signingText.xPos = this.checkboxObj.xPos + 2 * pad.CheckSize;
     this.signingText.yPos = 44 + pad.CheckSize - pad.TextSize;
  }
  else
  if (pad.Range == padRange.STU430 && pad.CheckSize == checkSize.STU430_Large)
  {
     this.signingText.xPos = this.checkboxObj.xPos + 2 * pad.CheckSize;
     this.signingText.yPos = this.checkboxObj.yPos + pad.CheckSize - pad.TextSize;
  }
  else
  {
    this.signingText.xPos = this.checkboxObj.xPos + 2 * pad.CheckSize;
    this.signingText.yPos = pad.Height/2 + pad.CheckSize - pad.TextSize;
  }
  this.signingText.textString = "I am signing as a representative";
  this.signingText.fontSize = pad.TextSize;
  this.signingText.fontName = pad.Font;
  
  if (pad.Range == padRange.STU5X0)
  {
    this.signingText.fontForeColor = padColors.GREEN;
    this.signingText.fontBackColor = padColors.WHITE;
  }
  else
  {
    this.signingText.fontForeColor = "";
    this.signingText.fontBackColor = "";
  }
  
  // Set up the "When you are ready" text object. Done in separate function because also used later for screen 2
  this.nextToContinue = setupContinueText(pad, buttonTextSource);
  
  // Set up the Next and Cancel button objects using separate functions so they can be reused for screen2 and 3
  this.nextButton = setupNextButton(pad, buttonTextSource);
  //print("Setting up previous button for screen 1");
  this.cancelButton = setupCancelButton(pad, buttonTextSource, buttonFunction.PREVIOUS);  

  // Set up the rectangle or line object used to improve the screen aesthetics  
  if (pad.Range == padRange.STU300)
  {
    this.step1Line = new lineObject();
    this.step1Line.x1Pos = 5;
    this.step1Line.y1Pos = 15;
    this.step1Line.x2Pos = pad.Width-3;
    this.step1Line.y2Pos = 15; 
    this.step1Line.lineWidth = 1;
    this.step1Line.options = SOLIDLINE;
  }
  else
  {
    //print("Defining step1Rectangle for pad " + pad.Range);
    this.step1Rectangle = new rectangleObject();
    this.step1Rectangle.x1Pos = "left";
    this.step1Rectangle.y1Pos = pad.Height/8;
    this.step1Rectangle.x2Pos = "right";
    this.step1Rectangle.y2Pos = pad.Height*4/5;  
    this.step1Rectangle.lineWidth = 1;
    this.step1Rectangle.options = OUTLINE; 
  }
}

// This function sets up the object definitions for the second screen in the wizard sequence
function screen_Display2(pad, buttonTextSource)
{
  // Set up the "Step 2 of 3" text message object
  this.stepMsg2 = new textObject();
  this.stepMsg2.xPos = "right";
  this.stepMsg2.yPos = 2;
  this.stepMsg2.textString = "Step 2 of 3";
  this.stepMsg2.fontName = pad.Font;
  this.stepMsg2.fontBold = true;
  this.stepMsg2.fontSize = pad.TextSize;
  this.stepMsg2.fontForeColor = "";
  this.stepMsg2.fontBackColor = "";
  this.stepMsg2.type = "txt";

  // Set up the informational text object
  this.infoObject = new textObject();
  this.infoObject.textString = "Radio buttons provide options for the signing process and can be transferred to the document";
  this.infoObject.fontName = "Verdana";
  this.infoObject.type = "txt";
  
  if (pad.Range == padRange.STU5X0)
  {
    this.infoObject.fontForeColor = padColors.BLUE;
    this.infoObject.fontBackColor = padColors.WHITE;
  }
  else
  {
    this.infoObject.fontForeColor = "";
    this.infoObject.fontBackColor = "";
  }
  
  switch (pad.Range)
  {
    case padRange.STU300:
      this.infoObject.xPos = 10;
      this.infoObject.yPos = 20;
      this.infoObject.fontSize = 8;
      this.infoObject.fontBold = false;
      break;
    case padRange.STU430:
      this.infoObject.xPos = 10;
      this.infoObject.yPos = 40;
      this.infoObject.fontSize = 9;
      this.infoObject.fontBold = true;
      break;
    case padRange.STU500:
    case padRange.STU5X0:
      this.infoObject.xPos = 30;
      this.infoObject.yPos = 120;
      this.infoObject.fontSize = 16;
      this.infoObject.fontBold = false;
      break;
  }

  // Next define the radio buttons
  this.maleRadio = new radioObject();
  this.maleRadio.buttonLabel = "Male";
  this.maleRadio.groupName = "Gender";
  this.maleRadio.buttonChecked = true;
  
  if (pad.Range == padRange.STU5X0)
  {
    this.maleRadio.fontForeColor = padColors.GREEN;
    this.maleRadio.fontBackColor = padColors.WHITE;
  }
  else
  {
    this.maleRadio.fontForeColor = "";
    this.maleRadio.fontBackColor = "";
  }

  // Now the second radio button - the "Female" option
  this.femaleRadio = new radioObject();
  this.femaleRadio.buttonLabel = "Female";
  this.femaleRadio.groupName = "Gender";
  this.femaleRadio.buttonChecked = false;
  
  switch (pad.Range)
  {
    case padRange.STU300:
      this.maleRadio.xPos = 50;
      this.maleRadio.yPos = 50;
      this.femaleRadio.xPos = 240;
      this.femaleRadio.yPos = 50;
      break;
    case padRange.STU430:
      this.maleRadio.xPos = 40;
      this.maleRadio.yPos = 90;
      this.femaleRadio.xPos = 200;
      this.femaleRadio.yPos = 90;
      break;
    case padRange.STU500:
      this.maleRadio.xPos = 100;
      this.maleRadio.yPos = 220;
      this.femaleRadio.xPos = 350;
      this.femaleRadio.yPos = 220;
      break;
    case padRange.STU5X0:
      this.maleRadio.xPos = 100;
      this.maleRadio.yPos = 220;
      this.femaleRadio.xPos = 500;
      this.femaleRadio.yPos = 220;
      break;
  }  

  // Set up the "Press NEXT to continue" object  
  this.nextToContinue = setupContinueText(pad, buttonTextSource);
  
  // Set up the rectangle object for display aesthetics
  this.step1Rectangle = new rectangleObject();
  this.step1Rectangle.lineWidth = 1;
  
  if (pad.Range == padRange.STU300)
  {
    this.step1Line = new lineObject();
    this.step1Line.x1Pos = 5;
    this.step1Line.y1Pos = 15;
    this.step1Line.x2Pos = pad.Width-3;
    this.step1Line.y2Pos = 15; 
    this.step1Line.lineWidth = 1;
    this.step1Line.options = SOLIDLINE;
  }
  else
  {
    this.step1Rectangle.x1Pos = "left";
    this.step1Rectangle.y1Pos = pad.Height/8;
    this.step1Rectangle.x2Pos = "right";
    this.step1Rectangle.y2Pos = pad.Height*4/5;  
    this.step1Rectangle.options = OUTLINE;
  }

  // Set up the Next and Previous button objects using separate functions
  this.nextButton = setupNextButton(pad, buttonTextSource);
  this.cancelButton = setupPreviousButton(pad, buttonTextSource);
}

// This function sets up the object definitions for the third screen in the wizard sequence
function screen_Display3(pad, buttonTextSource)
{
  // Set up the "Step 3 of 3" text message object
  this.stepMsg3 = new textObject();
  this.stepMsg3.xPos = "right";
  this.stepMsg3.yPos = 2;
  this.stepMsg3.textString = "Step 3 of 3";
  this.stepMsg3.fontName = pad.Font;
  this.stepMsg3.fontBold = true;
  this.stepMsg3.fontSize = pad.TextSize;
  this.stepMsg3.type = "txt"; 
  
  if (pad.Range == padRange.STU5X0)
  {
    this.stepMsg3.fontForeColor = padColors.BLACK;
    this.stepMsg3.fontBackColor = padColors.WHITE;
  }
  else
  {
    this.stepMsg3.fontForeColor = "";
    this.stepMsg3.fontBackColor = "";
  }
 
  // Set up the rectangle object for screen aesthetics 
  this.step2Rectangle = new rectangleObject();
  this.step2Rectangle.lineWidth = 1;
  
  if (pad.Range == padRange.STU300)
  { 
     this.step2Rectangle.x1Pos = 5;
     this.step2Rectangle.y1Pos = 15;
     this.step2Rectangle.x2Pos = pad.Width-5;
     this.step2Rectangle.y2Pos = 15;  
     this.step2Rectangle.options = SOLIDLINE;
  }
  else
  {
     this.step2Rectangle.x1Pos = "left";
     this.step2Rectangle.y1Pos = pad.Height/8;
     this.step2Rectangle.x2Pos = "right";
     this.step2Rectangle.y2Pos = pad.Height*4/5;  
     this.step2Rectangle.options = OUTLINE;
  }

  // Set up the "Please sign" text object
  this.pleaseSign = new textObject();
  this.pleaseSign.xPos = "center";
  this.pleaseSign.yPos = pad.yText;
  this.pleaseSign.textString = "Please now sign below";
  this.pleaseSign.fontBold = pad.TextBold;
  this.pleaseSign.fontSize = pad.TextSize;
  this.pleaseSign.fontName = pad.Font;
  this.pleaseSign.type = "txt"; 
  
  if (pad.Range == padRange.STU5X0)
  {
    this.pleaseSign.fontForeColor = padColors.BLUE;
    this.pleaseSign.fontBackColor = padColors.WHITE;
  }
  else
  {
    this.pleaseSign.fontForeColor = "";
    this.pleaseSign.fontBackColor = "";
  }

  //print("Setting up XMark on screen display 3 for pad : " + pad.Range);
  
  // Set up the "X" object for marking where the signature is to be input  
  this.XMark = new textObject();
  this.XMark.textString = "X";
  this.XMark.type = "txt";
  this.XMark.fontName = pad.Font;
  this.XMark.fontForeColor = "";
  this.XMark.fontBackColor = "";
    
  switch (pad.Range)
  {
     case padRange.STU300:
       this.XMark.fontSize = 18;
       this.XMark.xPos = 30;
       this.XMark.yPos = 100;
       this.XMark.fontBold = pad.TextBold;
       break;
     case padRange.STU430:
       this.XMark.fontSize = 15;
       this.XMark.xPos = 20;
       this.XMark.yPos = 100;
       this.XMark.fontBold = false;
       break;
     case padRange.STU500:
       this.XMark.fontSize = 32;
       this.XMark.xPos = 80;
       this.XMark.yPos = 250;
       this.XMark.fontBold = pad.TextBold;
       break;
     case padRange.STU5X0:
       this.XMark.fontSize = 32;
       this.XMark.xPos = 80;
       this.XMark.yPos = 250;
       this.XMark.fontBold = pad.TextBold;
       this.XMark.fontForeColor = padColors.RED;
       this.XMark.fontBackColor = padColors.WHITE;
       break;
  }
  
  // Set up the underlining for the signature
  this.sigMarkerLine = new textObject();
  this.sigMarkerLine.type = "txt";
  this.sigMarkerLine.fontBold = pad.TextBold;
  this.sigMarkerLine.fontName = pad.Font;
  
  this.sigMarkerLine.fontForeColor = "";
  this.sigMarkerLine.fontBackColor = "";
      
  switch (pad.Range)
  {
    case padRange.STU300:
      this.sigMarkerLine.fontSize = 18;  
      this.sigMarkerLine.xPos = 110;
      this.sigMarkerLine.yPos = 250;
      this.sigMarkerLine.textString = "..............................";
      break;
    case padRange.STU430:
      this.sigMarkerLine.fontSize = 15;  
      this.sigMarkerLine.xPos = 40;
      this.sigMarkerLine.yPos = 100;
      this.sigMarkerLine.textString = "..............................";
      break;
    case padRange.STU500:
      this.sigMarkerLine.fontSize = 15;  
      this.sigMarkerLine.xPos = 110;
      this.sigMarkerLine.yPos = 250;
      this.sigMarkerLine.textString = "..............................";
      break;
    case padRange.STU5X0:
      this.sigMarkerLine.fontSize = 32;  
      this.sigMarkerLine.xPos = 110;
      this.sigMarkerLine.yPos = 250;
      this.sigMarkerLine.textString = "........................................";
      this.sigMarkerLine.fontForeColor = padColors.GREEN;
      this.sigMarkerLine.fontBackColor = padColors.WHITE;
      break;
  }

  // Set up the signatory object
  this.who = new textObject();
  this.who.textString = "J Smith";
  this.who.type = "who";     
  
  if (pad.Range == padRange.STU300)
  {
    this.who.xPos = "left";
    this.who.yPos = pad.yText;
  }
  else
  {
    this.who.xPos = "right";
    this.who.yPos = 0.65*pad.Height;
  }
  
  //print("Setting who position for " + pad.Range + " to " + this.who.xPos + " " + this.who.yPos);
  //print ("who yPos = " + this.who.yPos + " from height " + pad.Height);

  // Set up the Reason for signing text object  
  this.why = new textObject();
  this.why.type = "why";
  this.why.textString = "I certify that the information is correct";
  this.why.fontForeColor = "";
  this.why.fontBackColor = "";
  
  if (pad.Range == padRange.STU300)
  {
    this.why.xPos = "left";
    this.why.yPos = 2;
  }
  else
  {
    this.why.xPos = "right";
    this.why.yPos = 0.65*pad.Height + pad.TextLS;
    if (pad.Range == padRange.STU5X0)
    {
      this.why.fontForeColor = padColors.BLUE;
      this.why.fontBackColor = padColors.WHITE;
    }
  }

  // Set up the OK button object
  this.okButton = new buttonObject();
  
  this.okButton.xPos = pad.xButtonRight;
  this.okButton.yPos = pad.yButton;
  this.okButton.buttonSize = pad.ButtonSize;
  this.okButton.width = pad.ButtonWidth;
  this.okButton.buttonBold = pad.ButtonBold;
  this.okButton.buttonType = "OK";
  this.okButton.buttonText = "OK";
  
  if (pad.Range == padRange.STU5X0)
  {
    this.okButton.fontForeColor = padColors.WHITE;
    this.okButton.fontBackColor = padColors.PURPLE;
  }
  else
  {
    this.okButton.fontForeColor = "";
    this.okButton.fontBackColor = "";
  }

  //print("Setting up button contents on screen display 3 for pad : " + pad.Range);
  
  // Set up the source of the button depending on what the user has selected on the HTML document
 //print("Setting up buttons from source: " + buttonTextSource);
  switch (buttonTextSource)  
  {
    case textSource.UTF8:
      this.okButton.buttonText = "好";
      break;
      
    case textSource.LOCAL:
      // Override the positions of the buttons when using images
      this.okButton.xPos = "right";
      this.okButton.yPos = "bottom";
      this.okButton.imageFile = setButtonImageFile(buttonTextSource, pad.Range, "Accept");
      break;
      
    case textSource.REMOTE:
      // Override the positions of the buttons when using images
      this.okButton.xPos = "right";
      this.okButton.yPos = "bottom";
      this.okButton.imageFile = setButtonImageFile(buttonTextSource, pad.Range, "Accept");
      break;
  } 

  // Set up the Clear button object
  this.clearButton = new buttonObject();
  this.clearButton.xPos = "center";
  this.clearButton.yPos = pad.yButton;
  this.clearButton.buttonSize = pad.ButtonSize;
  this.clearButton.width = pad.ButtonWidth;
  this.clearButton.buttonBold = pad.ButtonBold;
  this.clearButton.buttonType = "Clear";
  this.clearButton.buttonText = "Clear";

  // Set up the source of the button depending on what the user has selected on the HTML document
 //print("Setting up Clear button from source: " + buttonTextSource);
  switch (buttonTextSource)  
  {
    case textSource.UTF8:
      this.clearButton.buttonText = "肃清";
      break;
      
    case textSource.LOCAL:
      // Override the positions of the buttons when using images
      this.clearButton.xPos = "centre";
      this.clearButton.yPos = "bottom";
      this.clearButton.imageFile = setButtonImageFile(buttonTextSource, pad.Range, "Clear");
      break;
      
    case textSource.REMOTE:
      // Override the positions of the buttons when using images
      this.clearButton.xPos = "centre";
      this.clearButton.yPos = "bottom";
      this.clearButton.imageFile = setButtonImageFile(buttonTextSource, pad.Range, "Clear");
      break;
  } 

  // Set up the Cancel button object
  //print("Setting up cancel button for screen 3");
  this.cancelButton = setupCancelButton(pad, buttonTextSource, buttonFunction.CANCEL); 

  this.signatureFontSize = pad.TextSize;
 //print("Signature font size = " + this.signatureFontSize);
  
  // Finally add 2 objects which are specific to the 300
  if (pad.Range == padRange.STU300)
  {
    this.line = new lineObject();
    this.line.x1Pos = 5;
    this.line.y1Pos = 15;
    this.line.x2Pos = pad.Width-3;
    this.line.y2Pos = 15;  
    this.line.lineWidth = 1;
    this.line.options = SOLIDLINE;
  
    this.penSymbol = new textObject(); 
    this.penSymbol.xPos = "right";
    this.penSymbol.yPos = 25;
    this.penSymbol.textString = "\x3f";
    this.penSymbol.fontBold = false;
    this.penSymbol.fontSize = 30;
    this.penSymbol.fontName = "Wingdings";
    this.penSymbol.type = "txt";
  }
}

// Function to set up the properties of the Next button 
function setupNextButton(pad, buttonTextSource)
{
  // Set up the Next button object
  this.nextButton = new buttonObject();
  this.nextButton.xPos = pad.xButtonRight;
  this.nextButton.yPos = pad.yButton;
  this.nextButton.buttonSize = pad.ButtonSize;
  this.nextButton.width = pad.ButtonWidth;
  this.nextButton.buttonBold = pad.ButtonBold;
  this.nextButton.buttonType = "Next";
  this.nextButton.buttonText = "Next";
  
  if (pad.Range == padRange.STU5X0)
  {
    this.nextButton.fontForeColor = padColors.WHITE;
    this.nextButton.fontBackColor = padColors.PURPLE;
  }
  else
  {
    this.nextButton.fontForeColor = ""
    this.nextButton.fontBackColor = "";
  }
  
 //print("Setting up buttons for button text source " + buttonTextSource);
  
  // Set up the source of the button depending on what the user has selected on the HTML document
 //print("Setting up buttons from source: " + buttonTextSource);
  switch (buttonTextSource)  
  {
    case textSource.UTF8:
      this.nextButton.buttonText = "下一個";
      break;
      
    case textSource.LOCAL:
      // Override the positions of the buttons when using images
      this.nextButton.xPos = "right";
      this.nextButton.yPos = "bottom";
      this.nextButton.imageFile = setButtonImageFile(buttonTextSource, pad.Range, "RightArrow");
      break;
      
    case textSource.REMOTE:
      // Override the positions of the buttons when using images
      this.nextButton.xPos = "right";
      this.nextButton.yPos = "bottom";
      this.nextButton.imageFile = setButtonImageFile(buttonTextSource, pad.Range, "RightArrow");
      break;
  } 
  return this.nextButton;
}


// Function to set up the properties of the Cancel button
function setupCancelButton(pad, buttonTextSource, buttonFunc)
{
  var imageFilePrefix;
  
  // Set up the Cancel button object
  //print("setupCancelButton " + pad + " " + buttonTextSource + " " + buttonFunc);
  
  var cancelButton = new buttonObject();  
  cancelButton.xPos = pad.xButtonLeft;
  cancelButton.yPos = pad.yButton;
  cancelButton.buttonSize = pad.ButtonSize;
  cancelButton.width = pad.ButtonWidth;
  cancelButton.buttonBold = pad.ButtonBold;
  cancelButton.buttonType = "Cancel";
  cancelButton.buttonText = "Cancel";
  
  if (pad.Range == padRange.STU5X0)
  {
    cancelButton.fontForeColor = padColors.WHITE;
    cancelButton.fontBackColor = padColors.PURPLE;
  }
  else
  {
    cancelButton.fontForeColor = "";
    cancelButton.fontBackColor = "";
  }
  
  if (buttonFunc == buttonFunction.PREVIOUS)
  {
    imageFilePrefix = "LeftArrow";
  }
  else
  {
    imageFilePrefix = "Cancel";
  }
  //print ("imageFilePrefix is " + imageFilePrefix);
  
  //print ("textSource.LOCAL: " + textSource.LOCAL );
  //print ("buttonTextSource: " + buttonTextSource);
  
  // Set up the source of the button depending on what the user has selected on the HTML document
  //print("Setting up buttons from source: " + buttonTextSource + " using prefix " + imageFilePrefix);
  
  switch (buttonTextSource)  
  {
    case textSource.UTF8:
      //print("UTF8");
      cancelButton.buttonText = "取消";
      break;
      
    case textSource.LOCAL:
      // Override the positions of the buttons when using images
      //print("LOCAL");
      cancelButton.xPos = "left";
      cancelButton.yPos = "bottom";
      // print("Setting up image file for cancel button using range " + pad.Range + " and prefix " + imageFilePrefix);
      cancelButton.imageFile = setButtonImageFile(buttonTextSource, pad.Range, imageFilePrefix);
     //print("Cancel button image file is " + cancelButton.imageFile);
      break;
      
    case textSource.REMOTE:
      //print("REMOTE");
      // Override the positions of the buttons when using images
      cancelButton.xPos = "left";
      cancelButton.yPos = "bottom";
      cancelButton.imageFile = setButtonImageFile(buttonTextSource, pad.Range, imageFilePrefix);
      break;
  } 
  return cancelButton;
}

// Function to set up the properties of the Previous button (arrow)
function setupPreviousButton(pad, buttonTextSource)
{
  // Set up the Previous button object
  previousButton = new buttonObject();  
  previousButton.xPos = pad.xButtonLeft;
  previousButton.yPos = pad.yButton;
  previousButton.buttonSize = pad.ButtonSize;
  previousButton.width = pad.ButtonWidth;
  previousButton.buttonBold = pad.ButtonBold;
  previousButton.buttonType = "Cancel";
  previousButton.buttonText = "Previous";
  
  if (pad.Range == padRange.STU5X0)
  {
    previousButton.fontForeColor = padColors.WHITE;
    previousButton.fontBackColor = padColors.PURPLE;
  }
  else
  {
    previousButton.fontForeColor = "";
    previousButton.fontBackColor = "";
  }
  
  // Set up the source of the button depending on what the user has selected on the HTML document
 //print("Setting up previous button from source: " + buttonTextSource);
  switch (buttonTextSource)  
  {
    case textSource.UTF8:
      previousButton.buttonText = "取消";
      break;
      
    case textSource.LOCAL:
      // Override the positions of the buttons when using images
      previousButton.xPos = "left";
      previousButton.yPos = "bottom";
      previousButton.imageFile = setButtonImageFile(buttonTextSource, pad.Range, "LeftArrow");
      break;
      
    case textSource.REMOTE:
      // Override the positions of the buttons when using images
      previousButton.xPos = "left";
      previousButton.yPos = "bottom";
      previousButton.imageFile = setButtonImageFile(buttonTextSource, pad.Range, "LeftArrow");
      break;
  } 
  return previousButton;
}

// Function to set up the properties of the text which prompts the user to press Next or right arrow to continue
function setupContinueText(pad, buttonTextSource)
{
  nextToContinue = new textObject();
  nextToContinue.xPos = "center";
  nextToContinue.fontName = "Verdana";
  nextToContinue.fontSize = 16;
  nextToContinue.fontBold = false;
  nextToContinue.type = "txt";
  
  if (pad.Range == padRange.STU300)
  {
    nextToContinue.yPos = "bottom";
  }
  else
  {
    nextToContinue.yPos = pad.Height*2/3;
  }
  
  // For the colour pads set up the font colours
  if (pad.Range == padRange.STU5X0)
  {
    nextToContinue.fontForeColor = padColors.BLUE;
    nextToContinue.fontBackColor = padColors.WHITE;
  }
  else
  {
    nextToContinue.fontForeColor = "";
    nextToContinue.fontBackColor = "";
  }
  
  
  /* The text of the "When ready press Next to continue" message varies depending on which pad is in use  
     (there is less space available on the 300) and whether the user has selected images for the    
      Next and Cancel buttons because the images are arrows, not words */
   
  if (buttonTextSource == textSource.LOCAL || buttonTextSource == textSource.REMOTE)
  {
    nextToContinue.textString = "Press right arrow to continue";
  }   
  else
  {
    if (pad.Range == padRange.STU300)
    {
      nextToContinue.textString = "Press Next to continue";
    }
    else
    {
      nextToContinue.textString = "When you are ready press NEXT to continue";
    }
  }
  return nextToContinue;
}

// Function to define the image file which is used for a given button
function setButtonImageFile(buttonTextSource, currentPadRange, imagePrefix)
{
  var imageFile;
  var currDir = getCurrentDir();
 
  print("setButtonImageFile: " + buttonTextSource + " "+ currentPadRange + " " + imagePrefix);
  
  if (buttonTextSource == textSource.LOCAL)
  {
    //print("Getting directory from process");
    //currDir = "C:\\Users\\Wacom Frome\\Documents\\react\\sigcaptx-wiz\\public";
    currDir = process.cwd();
    //print("currDir : " + currDir);
    filePath = currDir + "\\images\\";
  }
  else
  {
    filePath = "http://gsdt.wacom.eu/SigCaptX/images/";
  }

  //print("filePath: " + filePath);
  
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