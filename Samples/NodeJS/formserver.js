/***************************************************************************
  formserver.js
   
  NodeJS server script to receive the get and post requests from the signature capture
  HTML form
  
  Copyright © 2020 Wacom. All Rights Reserved.
  
  v1.0
  
**************************************************************************** */
// First of all declare the required dependencies/packages
var express = require("express");  // NodeJS package for quick development of Web server apps
var bodyParser = require("body-parser");  // Helps with handling of JSON, text and URL encoded form data
var app = express();
var axo = require("winax");   // Needed for ActiveX

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true} ));

app.use(function (req, res, next) {
	// Set the content type in the header of the response
	res.setHeader('Content-Type', 'text/html');
	next();
});

app.use(function(req, res, next) {
	// Debug function to help trace the incoming HTTP request
	console.log(`${req.method} request for '${req.url}' - ${JSON.stringify(req.body)}`);
	next();
});

app.use(express.static("./public"));  // Enable the serving of static Web pages from the public directory

// This next function is to help prevent caching of data wherever possible
app.use(function (req, res, next) {
	res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
	res.header('Expires', '-1');
	res.header('Pragma', 'no-cache');
	next();
});

// This is the POST handling function which saves the new signature to the server
app.post("/SigCaptX-JS-SigCapt.html", function(req, res) {
	console.log("Request body");
	console.log(req.body.Firstname);
	saveToServer(req.body);
});

app.listen(3000);

console.log("Express app running on port 3000");

module.exports = app;

// Function to produce a 2-digit number i.e. prefix with leading zero if < 10
function leadingZero(number)
{
	var strNumber;
	
	if (number < 9)
	   strNumber = "0" + number.toString();
	else
	   strNumber = number.toString();
   
   return strNumber;
}

// Function to save the signature to the server
function saveToServer(formData)
{
	var sigtext = formData.Sigtext;
	var signatory = formData.Firstname + " " + formData.Lastname;
	var reason = formData.Reason;
	var filename = formData.filename;
	var tablet = formData.Tablet;
	var filenamedate;
		
	// The first challenge is to get today's date and time in a format which will
	// be accepted by the datesigned field in siginfo table
	var today = new Date();
	var month;
	var day;
	var hours;
	var minutes;
	var seconds;
	
	month = leadingZero(today.getMonth() + 1);
	day = leadingZero(today.getDate() );
	hours = leadingZero(today.getHours());
	minutes = leadingZero(today.getMinutes());
	seconds = leadingZero(today.getSeconds());
	
	// Format the date and time which are to be used in the name of the file containing the signature image	
	fileNameDate = today.getFullYear() + month + day + "_" + hours + minutes + seconds;
		
	var imageFolder = "./public/images/"	
	var imageFileName = formData.Firstname + '_' + formData.Lastname + '-' + tablet + '-' + fileNameDate + ".png";
	var outputFile = imageFolder + imageFileName;
	console.log("Output file: " + outputFile);
	
	// Now generate the sigCtl and set the licence so it can be used with RenderBitmap
	var sigCtl = new ActiveXObject("Florentis.SigCtl");
	sigCtl.SetProperty("Licence","eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiI3YmM5Y2IxYWIxMGE0NmUxODI2N2E5MTJkYTA2ZTI3NiIsImV4cCI6MjE0NzQ4MzY0NywiaWF0IjoxNTYwOTUwMjcyLCJyaWdodHMiOlsiU0lHX1NES19DT1JFIiwiU0lHQ0FQVFhfQUNDRVNTIl0sImRldmljZXMiOlsiV0FDT01fQU5ZIl0sInR5cGUiOiJwcm9kIiwibGljX25hbWUiOiJTaWduYXR1cmUgU0RLIiwid2Fjb21faWQiOiI3YmM5Y2IxYWIxMGE0NmUxODI2N2E5MTJkYTA2ZTI3NiIsImxpY191aWQiOiJiODUyM2ViYi0xOGI3LTQ3OGEtYTlkZS04NDlmZTIyNmIwMDIiLCJhcHBzX3dpbmRvd3MiOltdLCJhcHBzX2lvcyI6W10sImFwcHNfYW5kcm9pZCI6W10sIm1hY2hpbmVfaWRzIjpbXX0.ONy3iYQ7lC6rQhou7rz4iJT_OJ20087gWz7GtCgYX3uNtKjmnEaNuP3QkjgxOK_vgOrTdwzD-nm-ysiTDs2GcPlOdUPErSp_bcX8kFBZVmGLyJtmeInAW6HuSp2-57ngoGFivTH_l1kkQ1KMvzDKHJbRglsPpd4nVHhx9WkvqczXyogldygvl0LRidyPOsS5H2GYmaPiyIp9In6meqeNQ1n9zkxSHo7B11mp_WXJXl0k1pek7py8XYCedCNW5qnLi4UCNlfTd6Mk9qz31arsiWsesPeR9PN121LBJtiPi023yQU8mgb9piw_a-ccciviJuNsEuRDN3sGnqONG3dMSA");
	sigCtl.Signature.SigText = formData.Sigtext;
	
	var flags = 0x481000; //SigObj.outputFilename | SigObj.color32BPP | SigObj.encodeData
	var rc = sigCtl.Signature.RenderBitmap(outputFile, 300, 150, "image/png", 0.5, 0xff0000, 0xffffff, 0.0, 0.0, flags );
	console.log("RenderBitmap returned: " + rc);
}