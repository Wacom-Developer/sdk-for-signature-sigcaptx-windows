/***************************************************************************
  SigCaptX-Utils.js
   
  This file contains a number of common routines which are used by the capture, wizard and PIN pad samples
  
  Copyright (c) 2021 Wacom Ltd. All rights reserved.
  
   v4.0
  
***************************************************************************/
 
// Display a text message in a multi-line text box on the current HTML document
class UserMsg 
{
	constructor()
	{
		this.txtDisplay = document.getElementById("txtDisplay");
	}
	
	static print(txt)
	{
		txtDisplay.value += txt + "\n";
		txtDisplay.scrollTop = txtDisplay.scrollHeight; // scroll to end
	}
	
	static clearTextBox()
	{
		txtDisplay.value = "";
	}
}

/* This function simply checks the response status set by the previous callback routine and returns true or false.
   If an error status is found an error message is printed containing the name of the calling routine from 
   the parameter and the status code    */
const callbackStatusOK  = ( methodName, status ) =>
{
  if(wgssSignatureSDK.ResponseStatus.OK === status)
  {
    return true;
  }
  else
  {
    UserMsg.print(methodName + " error: " + status);
    return false;
  }
} 

class SigUtils
{
	constructor()
	{
		//
	}
	 // Displays version and licence information about the current Signature SDK and SigCaptX installation
	static aboutBox()
	{
		if(!wgssSignatureSDK.running || null === sigCtl)
		{
			print("Session error. Restarting the session.");
			actionWhenRestarted(window.aboutBox);
			return;
		}
		else
		{
			sigCtl.AboutBox(this.onAboutBox);
		}
	}
	static onAboutBox(sigCtlV, status)
	{
		if(wgssSignatureSDK.ResponseStatus.OK !== status) 
		{
			print("AboutBox error: " + status);
			if(wgssSignatureSDK.ResponseStatus.INVALID_SESSION === status)
			{
				print("Session error. Restarting the session.");
				actionWhenRestarted(window.AboutBox);
			}
		}
	}
}

class SigDetails
{
	constructor(sigObj)
	{
		this.sigObj = sigObj;
	}
	
	/* Called if the user double-clicks on the signature image on the HTML document or 
	   clicks the Signature Details button it displays basic capture details about the signature */
	displaySignatureDetails = () =>
	{
		if(!wgssSignatureSDK.running || null === this.sigObj)
		{
			UserMsg.print("Session error. Restarting the session." );
			actionWhenRestarted(window.displaySignatureDetails);
			return;
		}
		else
		{
			this.sigObj.GetIsCaptured(this.onGetIsCaptured);
		}
	}
	
	onGetIsCaptured(sigObj, isCaptured, status)
	{
		if(wgssSignatureSDK.ResponseStatus.OK === status) 
		{
			if(!isCaptured)
			{
				UserMsg.print("No signature has been captured yet." );
				return;
			}
			else
			{
				sigObj.GetWho(sigDetails.onGetWho);
			}
		}
		else 
		{
			UserMsg.print("Signature GetWho error: " + status);
			if(wgssSignatureSDK.ResponseStatus.INVALID_SESSION === status)
			{
				UserMsg.print("Session error. Restarting the session.");
				actionWhenRestarted(window.displaySignatureDetails);
			}
		}
	}
		
	// Displays the name of the person who entered the signature
	onGetWho = (sigObjV, who, status) =>
	{
		if(wgssSignatureSDK.ResponseStatus.OK === status) 
		{
			UserMsg.print("  Name:   " + who);
			var tz = wgssSignatureSDK.TimeZone.TimeLocal;
			sigObjV.GetWhen(tz, this.onGetWhen);
		} 
		else 
		{
			UserMsg.print("Signature GetWho error: " + status);
		}
	}
		
	// Displays the time of signature capture
	onGetWhen = (sigObjV, when, status) =>
	{
		if(wgssSignatureSDK.ResponseStatus.OK === status) 
		{
			UserMsg.print("  Date:   " + when.toString() );
			sigObjV.GetWhy(this.onGetWhy);
		} 
		else 
		{
			print("Signature GetWhen error: " + status);
		}
	}

	// Displays the reason for signature capture  
	onGetWhy = (sigObjV, why, status) =>
	{
		if(wgssSignatureSDK.ResponseStatus.OK == status) 
		{
			UserMsg.print("  Reason: " + why);
		} 
		else 
		{
			UserMsg.print("Signature GetWhy error: " + status);
		}
	}
	 
	// Called when the wizard script is completed and displays the image of the captured signature in the
	// signature image on the HTML document. Optionally also displays the SigText string
	showSignature = () =>
	{
		//UserMsg.print("Showing signature");
		sigCtl.GetSignature(this.onGetSignature);
	}
	
	onGetSignature = (sigCtlV, sigObjV, status) =>
	{
		if(wgssSignatureSDK.ResponseStatus.OK === status)
		{
			const outputFlags = wgssSignatureSDK.RBFlags.RenderOutputPicture | wgssSignatureSDK.RBFlags.RenderColor24BPP;
			const sigObj = sigObjV;
			//print("Rendering bitmap");
			sigObj.RenderBitmap(BITMAP_IMAGEFORMAT, HTMLIds.imageBox.clientWidth, HTMLIds.imageBox.clientHeight, BITMAP_INKWIDTH, BITMAP_INKCOLOR, BITMAP_BACKGROUNDCOLOR, outputFlags, BITMAP_PADDING_X, BITMAP_PADDING_Y, this.onRenderBitmap);
		}
		else
		{
			UserMsg.print("Error retrieving signature");
		}
	}
		
	onRenderBitmap = (sigObjV, bmpObj, status) =>
	{
		if(callbackStatusOK("Signature Render Bitmap", status))
		{
			if(null === HTMLIds.imageBox.firstChild)
			{
				HTMLIds.imageBox.appendChild(bmpObj.image);
			}
			else
			{
				HTMLIds.imageBox.replaceChild(bmpObj.image, HTMLIds.imageBox.firstChild);
			}
			if (HTMLIds.chkSigText === null)
			{
				WizSessionCtrl.stop();
			}
			else
			{
				if (HTMLIds.chkSigText.checked)
				{
					sigObjV.GetSigText(this.onGetSigText);
				}
				else
				{
					WizSessionCtrl.stop();
				}
			}
		} 
	}
		
	// Displays the SigText string in the text box on the HTML document
	onGetSigText = (sigObjV, text, status) =>
	{
		if(callbackStatusOK("Signature Render Bitmap", status))
		{
		 UserMsg.print("Sig text successfully obtained: " + text);
	
		 // At this point you can send the contents of "text" to the server 
		 // and then validate it at the server end
 
		 UserMsg.print("Stopping script");
		 WizSessionCtrl.stop();
		}
	}
}

class SigVerify
{
	constructor(hash)
	{
		this.hash = hash;
		this.callback = null;
	}
	
	// This method calculates a hash value using the first and last names on the HTML form
	getHash = (hash, callback) =>
	{
		UserMsg.print("Creating hash:");
		this.callback = callback;
		this.hash.Clear(this.onClear);
	}
	
  onClear(hashV, status)
  {
    if(wgssSignatureSDK.ResponseStatus.OK === status) 
    {
      hashV.PutType(wgssSignatureSDK.HashType.HashMD5, sigVerify.onPutType);
    } 
    else 
    {
      UserMsg.print("Hash Clear error: " + status);
    }
  }
  
  onPutType = (hashV, status) =>
  {
    if(wgssSignatureSDK.ResponseStatus.OK === status) 
    {
      const vFname = new wgssSignatureSDK.Variant();
      vFname.Set(HTMLIds.fname.value);
      hashV.Add(vFname, this.onAddFname);
    } 
    else 
    {
      UserMsg.print("Hash PutType error: " + status);
    }
  }
  
  onAddFname = (hashV, status) =>
  {
    if(wgssSignatureSDK.ResponseStatus.OK === status) 
    {
      const vLname = new wgssSignatureSDK.Variant();
      vLname.Set(HTMLIds.lname.value);
      hashV.Add(vLname, this.onAddLname);
    } 
    else 
    {
      UserMsg.print("Hash Add error: " + status);
    }
  }
  
  onAddLname = (hashV, status) =>
  {
    if(wgssSignatureSDK.ResponseStatus.OK === status) 
    {
      this.callback();
    } 
    else 
    {
      UserMsg.print("Hash Add error: " + status);
    }
  }

	// This method recalculates the hash value from the first and last names
	// and checks it against the hash embedded in the signature object
	verifySignedData = () =>
	{
		UserMsg.print("Verifying signed data...");
		if(null === sigObj)
		{
			actionWhenRestarted(window.VerifySig);
			return;
		}
		else
		{
			this.hash = null;
			sigObj.GetIsCaptured(this.onGetIsCaptured);
		}
	}
	
	onGetIsCaptured(sigObjV, isCaptured, status)
	{
		if(wgssSignatureSDK.ResponseStatus.OK === status)
		{
			if(isCaptured)
			{
				sigVerify.hash = new wgssSignatureSDK.Hash(sigVerify.onHashConstructor);
			}
			else
			{
				UserMsg.print("Signature not captured");
			}
		}
		else
		{
			UserMsg.print("GetIsCaptured error: " + status);
			if(wgssSignatureSDK.ResponseStatus.INVALID_SESSION === status)
			{
				UserMsg.print("Error: invalid session. Restarting the session.");
				actionWhenRestarted(window.VerifySig);
			}
		}
	}  
		
	onHashConstructor = (hashV, status) =>
	{
		if(wgssSignatureSDK.ResponseStatus.OK === status)
		{
			this.getHash(this.hash, this.onGetHashForVerification);
		}
		else
		{
			UserMsg.print("Hash Constructor error: " + status);
		}
	}
		
	onGetHashForVerification = (hashV, status) =>
	{
		sigObj.CheckSignedData(sigVerify.hash, this.onCheckSignedData);
	}
		
	onCheckSignedData = (hashV, status) =>
	{
		UserMsg.print("Verify result: " + status);
		if(wgssSignatureSDK.SignedData.DataGood === status)
		{
			UserMsg.print("Signed Data OK");
		}
		else
		{
			UserMsg.print("Signed Data Has Changed");
		}
	}
}

class SigDisplay
{
	constructor()
	{
		this.imageBox = HTMLIds.imageBox;
	}
	
	/* This method clears the current signature image from the signature control on the form */
	clearSignature = () =>
	{ 
		if(null !== imageBox.firstChild)
		{
			imageBox.removeChild(imageBox.firstChild);
		}
		if (null === sigObj)
		{
			actionWhenRestarted(window.ClearSignature);  // See SigCaptX-SessionControl.js
			return;
		}
		else
		{
			sigObj.Clear(this.onClearSig);
		}
	}
	onClearSig(sigObjV, status)
	{
		if(wgssSignatureSDK.ResponseStatus.OK !== status)
		{
			UserMsg.print("ClearSignature() error: " + status);
			if(wgssSignatureSDK.ResponseStatus.INVALID_SESSION === status)
			{
				UserMsg.print("Session error. Restarting the session.");
				actionWhenRestarted(window.ClearSignature);  // See SigCaptX-SessionControl.js
			}
		}
	}
  
	/* This method takes the SigText value currently displayed on the HTML form and uses it 
		 to recreate the signature image shown in the signature control tag on the form */
	setSignatureText = () =>
	{
    if(null === sigObj)
    {
      actionWhenRestarted(window.SetSignatureText);  // See SigCaptX-SessionControl.js
      return;
    }
		else
		{
			/* First of all take the SigText value currently displayed in the txtSignature 
			   field on the form and assign it to the sigObj object */
			const text = HTMLIds.txtSignature.value;
			sigObj.PutSigText(text, this.onPutSigText);
		}
  }
	onPutSigText(sigObjV, status)
	{
		if(wgssSignatureSDK.ResponseStatus.OK === status)
		{
			/* Now that the sigObj has been populated with the signature data (via the SigText) it can be used to geberate a signature image */
			const outputFlags = wgssSignatureSDK.RBFlags.RenderOutputPicture | wgssSignatureSDK.RBFlags.RenderColor24BPP;
			const imageBox = HTMLIds.imageBox;
			
			sigObj.RenderBitmap(BITMAP_IMAGEFORMAT, imageBox.clientWidth, imageBox.clientHeight, BITMAP_INKWIDTH, BITMAP_INKCOLOR, BITMAP_BACKGROUNDCOLOR, outputFlags, BITMAP_PADDING_X, BITMAP_PADDING_Y, sigDisplay.onRenderBitmapFromSigText);
		}
		else
		{
			UserMsg.print("SetSignatureText() error: " + status); 
			if(wgssSignatureSDK.ResponseStatus.INVALID_SESSION == status)
			{
				UserMsg.print("Session error. Restarting the session.");
				actionWhenRestarted(window.SetSignatureText);  // See SigCaptX-SessionControl.js
			}
		}
	}

	/* Take the image generated by RenderBitmap and use it to populate the signature image control on the form */
	onRenderBitmapFromSigText = (sigObjV, bmpObj, status) =>
	{
		if(wgssSignatureSDK.ResponseStatus.OK === status) 
		{
			if(null === this.imageBox.firstChild)
			{
				this.imageBox.appendChild(bmpObj.image);
			}
			else
			{
				this.imageBox.replaceChild(bmpObj.image, this.imageBox.firstChild);
			}
		} 
		else 
		{
			UserMsg.print("Signature Render Bitmap error: " + status);
		}
	}
}
  
// Set up the font ready for displaying the next object which could be text or a button or other object
const setFont = (fontName, fontSize, isBold, useSymbolCharset, callbackRoutine) =>
{
  let myFont = new wgssSignatureSDK.Font(fontName, fontSize);
  myFont.sWeight = (isBold? wgssSignatureSDK.FontWeight.FW_BOLD : wgssSignatureSDK.FontWeight.FW_NORMAL);
  if (useSymbolCharset)
  {
    myFont.sCharset = wgssSignatureSDK.FontCharset.SYMBOL_CHARSET;
  }
  const variantFont = new wgssSignatureSDK.Variant();
  variantFont.Set(myFont);
  wizCtl.PutFont(variantFont, callbackRoutine);
}

const setFontForeColor = (foreColor, callbackRoutine) =>
{
  let color = new wgssSignatureSDK.Variant();
  if (foreColor == "")
  {
    // Default foreground colour to black if not supplied
    foreColor = "0R 0G 0B";
  }
  color.Set (foreColor);
  wizCtl.SetProperty("ObjectForegroundColor", color, callbackRoutine);
}

const setFontBackColor = (backColor, callbackRoutine) =>
{
  let color = new wgssSignatureSDK.Variant();
  if (backColor == "")
  {
    // Default background colour to white if not supplied
    backColor = "1R 1G 1B";
  }
  color.Set (backColor);
  wizCtl.SetProperty("ObjectBackgroundColor", color, callbackRoutine);
}
  
// Add a text string to the display at co-ordinates specified by values in the text object
const addTextObject = (textObject, callbackRoutine) =>
{
  let xVar = new wgssSignatureSDK.Variant();
  let yVar = new wgssSignatureSDK.Variant();
  let objData = new wgssSignatureSDK.Variant();
  let options = new wgssSignatureSDK.Variant();
  
  xVar.Set(textObject.xPos);
  yVar.Set(textObject.yPos);
  objData.Set(textObject.textString);
  
  wizCtl.AddObject(wgssSignatureSDK.ObjectType.ObjectText, textObject.type, xVar, yVar, objData, options, callbackRoutine);	
}	
 
// Add a button to the pad display using properties already defined in the button object 
const addButtonObject = (buttonObj, callbackRoutine) =>
{
  let xVar = new wgssSignatureSDK.Variant();
  let yVar = new wgssSignatureSDK.Variant();
  let objData = new wgssSignatureSDK.Variant();
  let options = new wgssSignatureSDK.Variant();
    
  xVar.Set(buttonObj.xPos);
  yVar.Set(buttonObj.yPos);
  objData.Set(buttonObj.buttonText);
  options.Set(buttonObj.width);
  
  wizCtl.AddObject(wgssSignatureSDK.ObjectType.ObjectButton, buttonObj.buttonType, xVar, yVar, objData, options, callbackRoutine);
}
  
// Add an image to the pad display using properties already defined in the image object
const addObjectImage = (imageObj, callbackRoutine, imageSource) =>
{
  let xVar = new wgssSignatureSDK.Variant();
  let yVar = new wgssSignatureSDK.Variant();
  let objData = new wgssSignatureSDK.Variant();
  let options = new wgssSignatureSDK.Variant();
  
  xVar.Set(imageObj.xPos);
  yVar.Set(imageObj.yPos);
  objData.Set(imageObj.imageFile);
    
  wizCtl.AddObject(wgssSignatureSDK.ObjectType.ObjectImage, imageObj.buttonType, xVar, yVar, objData, options, callbackRoutine);
}
  
// Add a checkbox to the pad display using co-ordinates and options passed in as parameters
const addCheckBox = (xPosition, yPosition, optionsValue, callbackRoutine) =>
{
  let xVar = new wgssSignatureSDK.Variant();
  let yVar = new wgssSignatureSDK.Variant();
  let objData = new wgssSignatureSDK.Variant();
  let options = new wgssSignatureSDK.Variant();
    
  xVar.Set(xPosition);
  yVar.Set(yPosition);
  objData.Set(" ");
  options.Set(optionsValue);
    
  wizCtl.AddObject(wgssSignatureSDK.ObjectType.ObjectCheckbox, "Check", xVar, yVar, objData, options, callbackRoutine);
}

// Add a signature object to the pad display 
const addSignatureObject = (sigCtl, callbackRoutine) =>
{
  let xVar = new wgssSignatureSDK.Variant();
  let yVar = new wgssSignatureSDK.Variant();
  let objData = new wgssSignatureSDK.Variant();
  let options = new wgssSignatureSDK.Variant();
    
  xVar.Set(0);
  yVar.Set(0);
  objData.Set(sigCtl);
    
  wizCtl.AddObject(wgssSignatureSDK.ObjectType.ObjectSignature, "Sig", xVar, yVar, objData, options, callbackRoutine);
}
  
// Add a rectangle to the pad display (via the wizCtl)
const addRectangle = (rectangleObj, callbackRoutine) =>
{
  let x1Var = new wgssSignatureSDK.Variant();
  let y1Var = new wgssSignatureSDK.Variant();
  let x2Var = new wgssSignatureSDK.Variant();
  let y2Var = new wgssSignatureSDK.Variant();
  let objData = new wgssSignatureSDK.Variant();
  let options = new wgssSignatureSDK.Variant();
 
  x1Var.Set(rectangleObj.x1Pos);
  y1Var.Set(rectangleObj.y1Pos);
  x2Var.Set(rectangleObj.x2Pos);
  y2Var.Set(rectangleObj.y2Pos);
  objData.Set(rectangleObj.lineWidth);
  options.Set(rectangleObj.options);
   
  wizCtl.AddPrimitive(wgssSignatureSDK.PrimitiveType.PrimitiveRectangle, x1Var, y1Var, x2Var, y2Var, objData, options, callbackRoutine );
}
  
// Add a line to the pad display (via the wizCtl)
const addLine = (lineObj, callbackRoutine) =>
{
  let x1Var = new wgssSignatureSDK.Variant();
  let y1Var = new wgssSignatureSDK.Variant();
  let x2Var = new wgssSignatureSDK.Variant();
  let y2Var = new wgssSignatureSDK.Variant();
  let objData = new wgssSignatureSDK.Variant();
  let options = new wgssSignatureSDK.Variant();
  
  x1Var.Set(lineObj.x1Pos);
  y1Var.Set(lineObj.y1Pos);
  x2Var.Set(lineObj.x2Pos);
  y2Var.Set(lineObj.y2Pos);
  objData.Set(lineObj.lineWidth);
  options.Set(lineObj.options);
     
  wizCtl.AddPrimitive(wgssSignatureSDK.PrimitiveType.PrimitiveLine, x1Var, y1Var, x2Var, y2Var, objData, options, callbackRoutine);
}
  
// Add a radio button to the pad display (via the wizCtl)
const addRadioButton = (radioButtonObj, callbackRoutine) =>
{
  let xVar = new wgssSignatureSDK.Variant();
  let yVar = new wgssSignatureSDK.Variant();
  let objData = new wgssSignatureSDK.Variant();
  let options = new wgssSignatureSDK.Variant();
  let objOptn = new wgssSignatureSDK.ObjectOptions();
  
  xVar.Set(radioButtonObj.xPos);
  yVar.Set(radioButtonObj.yPos);
  
  objData.Set(radioButtonObj.buttonLabel);
  objOptn.AddOption("Group", radioButtonObj.groupName);
  objOptn.AddOption("Checked", radioButtonObj.buttonChecked);
  options.Set(objOptn);
    
  wizCtl.AddObject(wgssSignatureSDK.ObjectType.ObjectRadioButton, radioButtonObj.buttonLabel, xVar, yVar, objData, options, callbackRoutine);
}
  
// Add an input button to the pad display (via the wizCtl)
const addInputObject = (inputObj, callbackRoutine) =>
{
  let xVar = new wgssSignatureSDK.Variant();
  let yVar = new wgssSignatureSDK.Variant();
  let objData = new wgssSignatureSDK.Variant();
  let options = new wgssSignatureSDK.Variant();

  xVar.Set(0);
  yVar.Set(0);
  objData.Set(inputObj);
  wizCtl.AddObject(wgssSignatureSDK.ObjectType.ObjectInput, "input", xVar, yVar, objData, options, callbackRoutine);
}
 
// Add an input echo object to the pad display (via the wizCtl) 
const addInputObjectEcho = (xPos, yPos, callbackRoutine) =>
{
  let xVar = new wgssSignatureSDK.Variant();
  let yVar = new wgssSignatureSDK.Variant();
  let objData = new wgssSignatureSDK.Variant();
  let options = new wgssSignatureSDK.Variant();
  
  xVar.Set(xPos);
  yVar.Set(yPos);

  wizCtl.AddObject(wgssSignatureSDK.ObjectType.ObjectInputEcho, "echo", xVar, yVar, objData, options, callbackRoutine);
}

// Find out and return the current directory
const getCurrentDir = () =>
{
  let scriptFullName = window.location.pathname; // gets /c:/pathname/file.html
  scriptFullName = scriptFullName.replace(/\//g,"\\"); //convert all '/' to '\'
  let scriptPath = scriptFullName.substring( 1, scriptFullName.lastIndexOf("\\")+1 ); // c:\pathname\  
  scriptPath = unescape(scriptPath); // change %20 back to space
  return scriptPath;
}