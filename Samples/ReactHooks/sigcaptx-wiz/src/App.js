/* **************************************************************************
  App.js
   
  This React script renders the HTML form which allows the user to start  
  the signature wizard script and choose various options.
	
  Copyright (c) 2022 Wacom Ltd. All rights reserved.
    
***************************************************************************/
import React, {useEffect, useRef, useState} from 'react';
import ReactDOM from 'react-dom';

const btnStyle = {
  height: "15mm",
  width: "35mm",
  fontSize: "20px",
  marginLeft: "20px"
}

const boxStyle = {
	height: "70mm",
	width: "120mm",
	border: "1px solid #d3d3d3",
}

const cellStyle = {
  rowSpan: "2"
}

const divStyle = {
  paddingLeft: "10px"
}

const headingStyle = {
  paddingLeft: "10px"
}

const inputStyle = {
  paddingLeft: "10px"
}

const labelStyle = {
  margin: "0px 20px 0px 3px"
}

const paraStyle = {
  marginLeft: "40px"
}

const tblStyle = {
	paddingLeft: "10px",
	paddingRight: "10px",
	cellSpacing: "30"
}

const textBoxStyle = {
	marginLeft: "15px",
	padding:"10px 10px",
	textAlign:"left"
}

function FormElements() 
{
  const [btnOption, setBtnOption] = useState("standard");

  const [bDisplayWizard, setDisplayWiz] = useState(true);
  const [bLargeCheckBox, setLargeCheckBox] = useState(false);
  const [bShowSigText, setShowSigText] = useState(false);

	const btnStartStop = useRef();
  const chkDisplayWiz = useRef();
  const chkLargeCheckBox = useRef();
	const chkSigText = useRef();
  const imageBox = useRef();
  const txtDisplay = useRef();

	return (
	<>
	<h2 style={headingStyle}>Test Wizard Control</h2>
	<table style={tblStyle}>
    <tbody>
        <tr>  
          <td style={cellStyle}>
            <div id="imageBox" style={boxStyle} ref={imageBox}></div>
          </td>
          <td>
            <input type="button" id="btnStartStopWizard" value="Start Wizard" style={btnStyle} ref={btnStartStop} onClick={() => (window.wizardEventController.start_stop(bShowSigText, bDisplayWizard, bLargeCheckBox, btnStartStop.current, txtDisplay.current, imageBox.current, btnOption))} title="Starts/Stops a Wizard Script"/>
          </td>
        </tr>
    </tbody>
  </table>

  <h3 style={headingStyle}>Options</h3>

  <div style={divStyle}>
    <input style={inputStyle} type="checkbox" id="chkDisplayWizard" defaultChecked="checked" checked={bDisplayWizard} 
          onChange={e => setDisplayWiz(e.target.checked)}  ref={chkDisplayWiz}/><label style={labelStyle}>Display Wizard Control Window</label>
    <input style={inputStyle} type="checkbox" id="chkLargeCheckbox" checked={bLargeCheckBox} 
          onChange={e => setLargeCheckBox(e.target.checked)} ref={chkLargeCheckBox}/> <label style={labelStyle}>Large size checkbox</label>
    <input style={inputStyle} type="checkbox" id="chkSigText" checked={bShowSigText} 
          onChange={e => setShowSigText(e.target.checked)} ref={chkSigText}/> <label style={labelStyle}>Output sigtext to browser text window </label>
    <br/><br/>
    Button options: 
  </div>

	<p style={paraStyle}>
      <input type="radio" name="buttontype" id="standard" value="standard" defaultChecked="checked" onClick={() => setBtnOption("standard")}/>Use standard buttons<br/>
      <input type="radio" name="buttontype" id="utf8" value="utf8" onClick={() => setBtnOption("utf8")}/>Display UTF-8 text (e.g. for languages using logograms)<br/>
      <input type="radio" name="buttontype" id="remote" value="remote" onClick={() => setBtnOption("remote")}/>Use remote (URL) images
      <br/>
	</p>
	<textarea cols="100" rows="30" id="txtDisplay" style={textBoxStyle} ref={txtDisplay}></textarea>
	</>
	);
};

function App()
{
  useEffect(() => {
    // When the form is first drawn call the body_onload() function to initialise the SigCaptX session
    window.wizardEventController.body_onload(document.getElementById("txtDisplay"), document.getElementById("imageBox"));
  }, []);
  return FormElements();
}

ReactDOM.render(
	<React.StrictMode>
	  <App />
	</React.StrictMode>,
	document.getElementById('root')
  );