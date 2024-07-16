# Wacom Ink SDK for signature - SigCaptX Windows

## Version 1.27.0

## History

* Release v1.27.0 17-Oct-2023
   * Upgraded to openssl3

* Release v.1.25.4 12-Apr-2022
    * Fix to JS component's compatibility issue with 1.16

* Release v.1.25.3 04-Mar-2022
    * Fixed event handler closing down
    * Improved logging detail (change of behaviour; Logging values of 1/0 enables/disables, there is no distinction of values)
    * Fixed orderly shutdown of websocket connection; closing of finished event handler requests (non-websocket) returns 204 (no content).  

* Beta Release v.1.25.2 25-Feb-2022
    * Fix for old requests for event updates not being cleared by new requests, leaving open requests which could hang the server 
    * until the browser closed the pending requests (typically by page refresh).

* Beta Release v1.25.1  24-Feb-2022  
    * Enabled restarting of a session if the server dies 
    * Improved exception handling, reviewed console.log to .debug or .warn 
    * Fixed exception in JSONReponse exception handler on server
    * General code improvements to service and server

* Beta Release v1.25.0  21-Feb-2022
    * Re-engineered to work with websockets in order to get round performance issues with pre-flight requests in Chrome

* Release v1.24.3  09-Feb-2022
    * Interim work-around for Chrome and Edge preflight request headers
    
* Release v1.23.3  29-Sep-2020
    * Fix in SigCaptX installers to allow for accented characters in Window's user ID which causes problems with Firefox

*  Release v1.23.2  23-Aug-2019
    * Rebuild Mozilla NSS tools with current source to counteract false positives in some AV engines
    
* Release v1.23.1  28-Jun-2019
    * Fixed for "flashing" window issue in wizard
    * Exception catch added to prevent network error
		
* Release v1.23.0  19-Feb-2019
    * OpenSSL v1.1
    * Change to how server process is started
    * Fix to ReadEncodedBitmap for HTTP URLs

* Release v1.21.2  25-Oct-2018
    * Includes revised Signature SDK v4.0
    * Fix for SigCaptX server startup in Edge

* Release v1.21.1  26-Sept-2018
    * Includes revised Signature SDK v3.21 which enforces the use of a license
    * Enhancements for Citrix environment
    * Revised internal build system

* Release v1.18.1  27-Mar-2018
    * Further changes to support newer versions of Firefox with new certificate database

* Release v1.18.0  20-Feb-2018
    * Fix for revised Firefox certificate database

* Release v1.17.0  18-Jan-2018
    * Updated to Signature SDK v3.19.2

* Release v1.16.0  03-Oct-2017
    * fix AddPrimitive line and rectangle 

* Release v1.15.0  29-Sept-2017
    * fixes issues in wizard associated with double-tap on a button which terminates the wizard
    * fixes incorrect rejection of negative dimension values in SigObj.RenderBitmap

* Release v1.14.0  06-July-2017
    * Added support for STU-540/541 via inclusion of updated Signature SDK
    * Includes some additional logging
    * Installer enables localhost loopback for Edge on Win 10 (so it is no longer necessary for the user to run CheckNetIsolation)

* Release v1.13.3  27-Jan-2017
    * The STU Driver is now included in the SigCaptX (EXE) installer

* Release v1.13.2  26-Jan-2017
    * fixes the NaN Status error when calling wizCtl.Reset after user closes wizard window, but Reset should not be called in that situation.

* Release v1.13.1  25-Jan-2017
    * fix installer problem
    * fix problem closing the wizard

* Release v1.13.0  20-Jan-2017
    * fix to problems occurring with repeated use of wizard
    * fix to non-display of '&amp;' character in wizard buttons and text
    * fix to incorrect display of Arabic text in Sig capture "who" and "why"
    * additional installer support for Firefox

* Release 1.12.0  15-Dec-2016
    * Revised FirefoxPortable pathname space handling
    * Revised renderBitmap inmterface: 
    *   RenderOutputPicture returns image object
    *   RenderOutputBase64 returns image string
    *   (see samples TestSDKCapture and TestSDKCapture-ImageBase64)
    *   

* Release 1.11.0  06-Dec-2016
    * Enhance installers to handle installations for 64-bit and Portable versions of Firefox

* Release 1.10.0  24-Nov-2016
    * Improved memory handling with wizard control in Chrome
    * New API wgssSignatureSDK.getVersion for getting version of SigCaptX 
	
* Release v1.9.0  17-July-2016
    * Enhance combined installer to support command line parameters JAVA, ADDPATH and MINIMAL (as per the msi)
	
* Release v1.8.0  12-July-2016
    * Updated EULA
    * Updated combined signature SDK to 3.10.1

* Release v1.7.0  17-June-2016
    * Added combined installer with Signature SDK v3.9.0
    * Added support for logging
    * Added retries in server/service connection (in case of "race" in start up)
    * Fixed inking problem on Bamboo pad 
    * Windows 10 Edge support

* Release v1.6.0  
    * Internal test release

* Release v1.5.0  31-March-2016
    * Additional fixes for UTF-8 support in api
    * Renamed server and service EXEs (to include 'wgss' prefix)
    * Renamed signaturesdk.js to wgssSigCaptX.js. Note: developers will need to change &lt;script&gt; includes in their own HTML
    * Fixed minor issues identified in testing
  
* Release v1.4.0  29-February-2016
    * Fixed UTF-8 support in api
    * Fixed minor issues identified in testing

* Release v1.3.0  14-December-2015
    * Fixed capture window on top for non-English Windows

* Release v1.2.1  02-November-2015
    * Fixed Javascript timing issue on Wizard Control
    * 
* Release v1.2.0  30-October-2015
    * Added EULA for general distribution
    * 
* Release v1.1.1  30-September-2015
    * Revised Wizard control handler with updated samples
    * Windows XP tested successfully with Firefox v35

* Release v1.0.0  28-August-2015
    * Initial release.
    * Known issues:
    * - Windows XP is not supported in this release
    * - 64-bit signature capture is not supported in this release - use 32-bit Signature-SDK-x86 and SigCaptX-x86.
    *   32-bit SigCaptX can be used in 32 and 64 bit Windows browsers.
