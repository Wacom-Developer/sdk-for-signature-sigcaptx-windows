# React Samples for SigCaptX for Windows

## 1. Download the SDK

The Signature SDK and SigCaptX library will need to be installed on your local (client) machine.  
The Signature SDK must also be installed on your server (does not apply for testing on localhost). 
 
Please note that the NodeJS server-side code relies on the Signature SDK being installed on the server as well.   
This NodeJS sample has only been tested with a Windows-based server and will not currently work with a Linux server. 

Please see the GETTING-STARTED document in the root directory of this folder system for instructions on installing the Signature SDK and SigCaptX library and licence.

The instructions below are appropriate for testing the sample on a local PC using localhost.  
If testing with a remote server items 2 to 4 must be carried out on the server.  
When running from a remote server the URL should be displayed on running "npm start" and will be something like this:

```
http://176.20.4.5:3000
```
  
When installing on a server please make sure that the Windows Firewall allows Node.js to pass through it and that port 3000 is open for incoming requests (you may need to create a new Inbound rule for this).  

##  2. Download NodeJS

Install Node.js from https://nodejs.org/en/download/.  The latest release at time of writing (March 2021) is 14.16.0.  

## 3. Install the React sample code

1. Extract the SigCaptX React sample code to your chosen directory.  This should create a folder and directory structure as follows:

```
				React/sigcaptx/
				React/sigcaptx/public/
				React/sigcaptx/public/images/
				React/sigcaptx/public/nodejs/
				React/sigcaptx/src/
				
				React/sigcaptx-wiz/
				React/sigcaptx-wiz/public/
				React/sigcaptx-wiz/public/images/
				React/sigcaptx-wiz/src/
```

2. Start a command prompt and change directory to the sigcaptx folder which was created

3. Run “npm install” (see note 1 below).  

4. Repeat steps 2 and 3 for the sigcaptx-wiz folder  


## 4. Start the NodeJS server and run the sample

To test either of the samples, change directory to the appropriate project folder and type “npm start”.
This should open up the sample automatically in your default browser.

Alternatively enter http://localhost:3000/ from your chosen browser.


## General note

Please note that we cannot accept any liability for information provided on third-party web sites.




