/* **************************************************************************
  App.js
   
  This React script renders the HTML form which allows the user to start  
  the signature wizard script.
	
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

const divStyle = {
  paddingLeft: "10px",
  width: "100%"
}

const headingStyle = {
  paddingLeft: "10px"
}

const inputStyle = {
  paddingLeft: "10px"
}

const textBoxStyle = {
	marginLeft: "15px",
	padding:"10px 10px",
	textAlign:"left"
}

function FormElements() 
{
  const [bDisplayWizard, setDisplayWiz] = useState(true);

	const btnStartStop = useRef();
  const chkDisplayWiz = useRef();
  const txtDisplay = useRef();

	return (
	<>
    <div style={divStyle}>

    <h2 style={headingStyle}>SigCaptX PIN Capture</h2>
      <br/>
      <input style={btnStyle} type="button" id="btnStartStopWizard" value="Start Wizard" title="Starts/Stops a Wizard Script" ref={btnStartStop}
             onClick={() => (window.wizardEventController.start_stop(bDisplayWizard, btnStartStop.current, txtDisplay.current))} />
      <input style={inputStyle} type="checkbox" id="chkDisplayWizard" checked={bDisplayWizard} ref={chkDisplayWiz}
             onChange={e => setDisplayWiz(e.target.checked)}/> 
        <label>Display Wizard Control Window</label>
      <br/>
      <br/>

      <textarea style={textBoxStyle} ref={txtDisplay} cols="100" rows="30" id="txtDisplay"></textarea>
    </div>
	</>
	);
};

function App()
{
  useEffect(() => {
    // When the form is first drawn call the body_onload() function to initialise the SigCaptX session
    window.wizardEventController.body_onload(document.getElementById("txtDisplay"));
  }, []);
  return FormElements();
}

ReactDOM.render(
	<React.StrictMode>
	  <App />
	</React.StrictMode>,
	document.getElementById('root')
  );