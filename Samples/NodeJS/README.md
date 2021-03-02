# NodeJS Sample for SigCaptX for Windows

## 1. Download the SDK

The Signature SDK and SigCaptX library will need to be installed on your local (client) machine.  
The Signature SDK must also be installed on your server (does not apply for testing on localhost). 
 
Please note that the NodeJS server-side code relies on the Signature SDK being installed on the server as well.   
This NodeJS sample has only been tested with a Windows-based server and will not currently work with a Linux server. 

Please see the GETTING-STARTED document in the root directory of this folder system for instructions on installing the Signature SDK and SigCaptX library and licence.

The instructions below are appropriate for testing the sample on a local PC using localhost.  
If testing with a remote server items 2 to 4 must be carried out on the server instead.

## 2. Download NodeJS

Install Node.js from https://nodejs.org/en/download/.  The latest release at time of writing (March 2021) is 14.16.0.  
When installing on a server please make sure that the Windows Firewall allows Node.js to pass through it and that port 3000 is open for incoming requests (you may need to create a new Inbound rule for this).   

## 3. Install the NodeJS sample code

1. Extract the SigCaptX NodeJS sample code to your chosen directory.  This should create a folder a directory structure as follows:

        NodeJS/public/js
        NodeJS/public/images

    Please create the “images” folder if it doesn’t exist and make sure that it has write permissions. 

2. Start a command prompt and change directory to the “NodeJS” folder which was created

3. Run “npm install” (see note 1 below).  

    If any errors occur with reference to Python when running “npm install” start a Powershell with admin privileges and run the following command:  

```
npm install  --global --production windows-build-tools  
```

Then run “npm install” again.  


## 4. Start the NodeJS server and run the sample

Run “node formserver.js” - this should open up the sample automatically in your default browser.

Alternatively enter http://localhost:3000/SigCaptX-JS-SigCapt.html from your chosen browser.
If needed replace 3000 with the port number which you used when configuring NodeJS.

## Installation Note

With release 12.18.0 of Node.js the following error occurred when running “npm install”:  
```
c:\users\xxxxx\documents\sigcaptx\nodejs\sigcapture\sigcapture\node_modules\winax-dynamic-linking\src\utils.h(256):  
error C2661: 'v8::Value::BooleanValue': no overloaded function takes 0 arguments (compiling source file ..\src\utils.cpp) 
[C:\Users\xxxxx\Documents\SigCaptX\NodeJs\sigcapture\SigCapture\node_modules\winax-dynamic-linking\build\node_activex.vcxproj]  
```

This was fixed by commenting out the following lines in utils.h:  
```
inline Local<Value> Error(Isolate *isolate, const char *msg) {  
    return Exception::Error(v8str(isolate, msg));  
}  
```
and then executing “npm rebuild”.  
It is not known if this has any adverse effects on Node.js elsewhere but the sample runs successfully.

## General note

Please note that we cannot accept any liability for information provided on third-party web sites.




