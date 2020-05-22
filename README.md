# Wacom Ink SDK for signature - Windows SigCaptX

## Introduction

---

In the *Wacom Ink SDK for signature* the SigCaptX Library is an extension of the Signature Library.
The SigCaptX Library allows a signature enabled web application to be used in a range of browsers thereby giving cross-browser support.
Previously a signature enabled web application could only be used in Internet Explorer using ActiveX technology.
The product has been tested with Internet Explorer, MS Edge, Chrome and Firefox.

A prerequisite is the installation of the Wacom Signature Library, see: *Wacom Ink SDK for signature - Windows*
SigCaptX is supplied as a 32-bit application and requires the 32-bit version of the Signature Library, regardless of your Windows version.
To simplify the installation a combined installer is provided.


## Overview

In a browser with no ActiveX support it is not possible to access the Signature Library directly.
Instead calls are made indirectly via a localhost web server which is installed as part of the SigCaptX Library.
The SigCaptX JavaScript library is provided to give access to the local web server.
JSONP communication is used as the interface to the local web server using HTTPS requests.
 
To view the solution schematically:

![signature sigcaptx components](media/SigCaptX-Library.png)

The general process is as follows:

*	The web browser loads an HTML page containing JavaScript application code from the web server. The application code includes the SigCaptX JavaScript library required to access the localhost web server.
*	To perform signature library functions, the application code calls the localhost server through the SigCaptX JavaScript library. The library functions each make a JSONP HTTPS request to the localhost SigCaptX server and supply a dedicated callback function. The library functions return immediately, leaving the server to run independently.
*	The server actions the library function by calling the Signature Library. For example, in the case of signature capture the DLL performs the necessary i/o with the signature tablet.
*	On completion the server uses JSONP to start the callback function which was supplied in the request, passing the relevant return data.
*	The callback function retrieves the data and completes the operation.
*	For example, in the case of signature capture the HTML application calls the signature capture library function. Its callback function calls the renderBitmap library function to request the image of the signature. Its callback function then displays the signature image in the html page. 

To illustrate, an html page creates the signature image display area:

```ruby
<div id="imageBox" class="boxed" style="height:35mm;width:60mm; border:1px solid #d3d3d3;">
</div>

JavaScript application code provides the necessary functionality. For example to capture a signature:

function capture()
{
  if(!wgssSignatureSDK.running || null == dynCapt)
  {
    print("Session error. Restarting the session.");
    actionWhenRestarted(window.Capture);   // See SigCaptX-SessionControl.js
    return;
  }
  dynCapt.Capture(sigCtl, "John Smith", "Document Approval", null, null, onDynCaptCapture);

  function onDynCaptCapture(dynCaptV, SigObjV, status)
  {
    if(wgssSignatureSDK.ResponseStatus.INVALID_SESSION == status)
    {
      print("Error: invalid session. Restarting the session.");
      actionWhenRestarted(window.Capture);  // See SigCaptX-SessionControl.js
    }
    else
    {
      /* Check the status returned from the signature capture */
      switch( status ) 
      {
        case wgssSignatureSDK.DynamicCaptureResult.DynCaptOK:
          sigObj = SigObjV;
          print("Signature captured successfully");

          /* Set the RenderBitmap flags as appropriate depending on whether the user wants to use a picture image or B64 text value */
          if (document.getElementById("chkUseB64Image").checked)
          {
             var flags = wgssSignatureSDK.RBFlags.RenderOutputBase64 | wgssSignatureSDK.RBFlags.RenderColor32BPP;
          } 
          else
          {
             var flags = wgssSignatureSDK.RBFlags.RenderOutputPicture | wgssSignatureSDK.RBFlags.RenderColor32BPP;
          }
          sigObj.RenderBitmap("bmp", imageBox.clientWidth, imageBox.clientHeight, 0.7, 0x00000000, 0x00FFFFFF, flags, 4, 4, onRenderBitmap);
          break;

        case wgssSignatureSDK.DynamicCaptureResult.DynCaptCancel:
          print("Signature capture cancelled");
          break;
          
        case wgssSignatureSDK.DynamicCaptureResult.DynCaptPadError:
          print("No capture service available");
          break;
          
        case wgssSignatureSDK.DynamicCaptureResult.DynCaptError:
          print("Tablet Error");
          break;
          
        case wgssSignatureSDK.DynamicCaptureResult.DynCaptNotLicensed:
          print("No valid Signature Capture licence found");
          break;
          
        default: 
          print("Capture Error " + status);
          break;
      }
    }
  }
  
  function onRenderBitmap(sigObjV, bmpObj, status) 
  {
    if(wgssSignatureSDK.ResponseStatus.OK == status) 
    {
      var imageBox = document.getElementById("imageBox");
      var useB64Image = document.getElementById("chkUseB64Image").checked;

      /* If the user wants to demonstrate the use of B64 image strings then define an image and set its source to the B64 string*/
      if (useB64Image)
      {
         print("base64_image:>"+bmpObj+"<");
         img = new Image();
         img.src = "data:image/png;base64," + bmpObj;
  
         if(null == imageBox.firstChild)
         {
           imageBox.appendChild(img);
         }
         else
         {
            imageBox.replaceChild(img, imageBox.firstChild);
         }
      }
      else
      {
         /* If RenderBitmap generated a standard image (picture) then just place that picture in the img control on the HTML form */
         if(null == imageBox.firstChild)
         {
           imageBox.appendChild(bmpObj.image);
         }
         else
         {
            imageBox.replaceChild(bmpObj.image, imageBox.firstChild);
         }
      }
      /* If the user chose the option to show the SigText value on the form then call the function to do this */
      if (document.getElementById("chkShowSigText").checked)
      {
         sigObjV.GetSigText(onGetSigText);
      }
    } 
    else 
    {
      print("Signature Render Bitmap error: " + status);
    }
```
---

# Additional resources 

## Sample Code
For further samples check Wacom's Developer additional samples, see [https://github.com/Wacom-Developer](https://github.com/Wacom-Developer)

## Documentation
For further details on using the SDK see [Wacom Ink SDK for signature documentation](http://will-docs.westeurope.cloudapp.azure.com/sdk-for-signature/) 

The API Reference is available directly in the downloaded SDK.

## Support
If you experience issues with the technology components, please see related [FAQs](http://will-docs.westeurope.cloudapp.azure.com/faqs)

For further support file a ticket in our **Developer Support Portal** described here: [Request Support](http://will-docs.westeurope.cloudapp.azure.com/faqs/docs/q-support/support)

## Developer Community 
Join our developer community:

- [LinkedIn - Wacom for Developers](https://www.linkedin.com/company/wacom-for-developers/)
- [Twitter - Wacom for Developers](https://twitter.com/Wacomdevelopers)

## License 
This sample code is licensed under the [MIT License](https://choosealicense.com/licenses/mit/)

---
