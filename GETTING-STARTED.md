# Getting Started 

## Test environment

Samples are included for Windows 10 and above.
The SigCaptX samples need both the Signature and SigCaptX libraries to be installed.
To test the samples, use a Wacom device such as an STU-500 or a pen/tablet device such as a DTU-1141.

To use a pen/tablet device you will need to install the Wacom driver which provides the wintab interface used by the Signature Library.
See the FAQs for [tablet installation](http://developer-docs.wacom.com/faqs/docs/q-tablet/tablet-installation)

## Download the Wacom Ink SDK for signatures

Download the SDK from https://developer.wacom.com/developer-dashboard

* Login using your Wacom ID
* Navigate to **Downloads for signature**
* Select **More info** on **WILL SDK for ink for Windows Desktop**
* Accept the End User License Agreement and select **Download** to use the SDK

The downloaded Zip file contains the SDK with documentation.
The folders 'SignatureSDK' and 'SigCaptX' are included in the Zip file and contain the MSI and EXE library installers.


## Install the SigCaptX Library

Make sure that any browsers using SigCaptX have already been installed and run so they can be located in the installation process.
In addition note:

* Firefox 64-bit
    * With .EXE (combined) installer: no action necessary
    * With .MSI installer: must be run from command line with 'FF64=1'

* Firefox Portable
    * With .EXE (combined) installer:  
        * From command line (eg for silent install), add FFP="Firefox Portable Folder"
        * From UI, click 'Options' then enter or browse to "Firefox Portable Folder"
    * With .MSI installer:  must be run from command line with FFP="Firefox Portable Folder"
    
* MSI log files are created in the folder %TEMP%


SigCaptX is supplied as a 32-bit application and requires the 32-version of the Signature Library, regardless of your Windows version.
To simplify the installation a combined installer is included:
**Wacom-SigCaptX-XX.exe**

Run the installer with default options to install the library in:
C:\Program Files (x86)\Common Files\WacomGSS

## Signature Library License

A license must be included in your application code to use the Signature Library.
The licensing scheme has recently been relaxed and the Lite license can be used free of charge for all functions excluding:
- signature encryption
- ISO signature formatting

### Wacom Ink SDK for signature Lite License

The Wacom Ink SDK for signature Lite license is in JSON Web Token (JWT) format and can be copied here:

```
eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiI3YmM5Y2IxYWIxMGE0NmUxODI2N2E5MTJkYTA2ZTI3NiIsImV4cCI6MjE0NzQ4MzY0NywiaWF0IjoxNTYwOTUwMjcyLCJyaWdodHMiOlsiU0lHX1NES19DT1JFIiwiU0lHQ0FQVFhfQUNDRVNTIl0sImRldmljZXMiOlsiV0FDT01fQU5ZIl0sInR5cGUiOiJwcm9kIiwibGljX25hbWUiOiJTaWduYXR1cmUgU0RLIiwid2Fjb21faWQiOiI3YmM5Y2IxYWIxMGE0NmUxODI2N2E5MTJkYTA2ZTI3NiIsImxpY191aWQiOiJiODUyM2ViYi0xOGI3LTQ3OGEtYTlkZS04NDlmZTIyNmIwMDIiLCJhcHBzX3dpbmRvd3MiOltdLCJhcHBzX2lvcyI6W10sImFwcHNfYW5kcm9pZCI6W10sIm1hY2hpbmVfaWRzIjpbXX0.ONy3iYQ7lC6rQhou7rz4iJT_OJ20087gWz7GtCgYX3uNtKjmnEaNuP3QkjgxOK_vgOrTdwzD-nm-ysiTDs2GcPlOdUPErSp_bcX8kFBZVmGLyJtmeInAW6HuSp2-57ngoGFivTH_l1kkQ1KMvzDKHJbRglsPpd4nVHhx9WkvqczXyogldygvl0LRidyPOsS5H2GYmaPiyIp9In6meqeNQ1n9zkxSHo7B11mp_WXJXl0k1pek7py8XYCedCNW5qnLi4UCNlfTd6Mk9qz31arsiWsesPeR9PN121LBJtiPi023yQU8mgb9piw_a-ccciviJuNsEuRDN3sGnqONG3dMSA
```
In the samples, replace the search string `<<license>>` with the license shown.

To use the excluded functions please contact technical support for suitable sample code and a license:
[developer relations portal.](https://developer.wacom.com/developer-dashboard/support)

---

## HTML Samples

The samples demonstrate use of the SigCaptX library.

PortCheck.htm is included to check that the SigCaptX service is available, independently of signature capture.

Having downloaded the samples you will need to install your Signature license in the code:

Search and replace `<<license>>` with the standard license from above.
For example change:
```
    const LICENCEKEY = "<<license>>";
```    
to:
```
    const LICENCEKEY = "AbAD.......wQ";
```    

The samples can then be opened and run in any of the commonly used browsers: Internet Explorer/Edge/Firefox/Chrome.


| Sample                        | Description                                                           |
| ----------------------------- | --------------------------------------------------------------------- |
| PortCheck.htm                 | Use this sample to check that the SigCaptX service is available |
| SigCaptX-Capture-html         | Signature capture showing use of base64 image, SigText and hash verification |
| SigCaptX-Wizard.html          | Wizard sample showing use of check boxes, radio buttons, images for buttons, SigText generation, font sizes and colour (for STUs which support colour) |
| SigCaptX-WizardPINPad.html    | Demonstrates full version of PIN pad input |
| demo.htm                      | Basic sample illustrating use of dynamic capture, wizard capture and single digit PIN input |


### ASP.NET sample

The sample works by communicating with SigCaptX on the client device for signature capture and then uploading the completed signature to the server as an FSS file.
This means that SigCaptX needs to be installed on the client machine.

The sample has also been deployed to the Azure account here: https://asp-sig-demo.azurewebsites.net
 
If you go to this location with a computer that has SigCaptX installed, you can capture a signature and upload it to the server.
When the signature has been uploaded you will notice a message in the text box as follows: "uploaded xxxxxxx.txt to the server".
If you copy and paste this name as an extension to the URL you can then view the uploaded base64 data on the server.

For example here is the output from an in-house test:  
```
	Session error. Restarting the session.
	Signature SDK Service detected.
	DLL: flSigCOM.dll  v3.10.0.0
	DLL: flSigCapt.dll v3.10.0.0
	Test application ready.
	Press 'Start' to capture a signature.
	Signature captured successfully
	Sent 4d8839ad-f8e3-399d-cf77-7e174eb5ccc1.txt to server as BASE64 encoded FSS
```
To see the saved signature B64 value go to: https://asp-sig-demo.azurewebsites.net/4d8839ad-f8e3-399d-cf77-7e174eb5ccc1.txt

Double-click the captured signature image on the web site to display the signature details.

### NodeJS and PHP samples

Separate Readme instruction files are provided in the NodeJS and PHP folders for installing NodeJs/PHP and running their respective sample code.    
Both samples are very straightforward and operate using localhost - they capture a signature and output it to an image file.  
The PHP sample uses Apache as its Web server.  

