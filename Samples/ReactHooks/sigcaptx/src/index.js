import React, {createContext, useContext, useEffect, useRef, useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const SignerContext = createContext();

const signer = 
{ 
  firstName: "John",
  lastName:  "Smith"
};

const boxStyle = {
	height: "70mm",
	width: "120mm",
	border: "1px solid #d3d3d3",
};

const btnStyle = {
	height: "10mm",
	width: "35mm",
};

const tblStyle = {
  paddingLeft: "20px",
  paddingRight: "20px;",
};

function FormElements()
{
  const signatory = useContext(SignerContext);

  const btnRestore = useRef();
  const chkB64 = useRef();
  const chkSigText = useRef();
  const firstName = useRef("");
  const lastName = useRef("");
  const imageBox = useRef();
  const txtSignature = useRef();
  const txtDisplay = useRef();
  
  const [chkValue, setChecked] = useState(false);

  const setRestoreButtonState = (buttonState) => {
    setChecked(buttonState);
    document.getElementById("Restore").disabled = buttonState;
    setChecked(!buttonState);
  };

  useEffect(() => {
    document.getElementById("Restore").disabled = true;  // Default the Restore button to disabled at start
  },[]);

  return (
  <>
  <h2>SigCaptX React Signature Capture</h2>
  <br/><br/>
  <table style={tblStyle}>
    <tr>
      <td rowspan="3">
        <div id="imageBox" ref={imageBox} style={boxStyle} title="Double-click a signature to display its details"></div>
      </td>
      <td  style={tblStyle}>
        <button value="Capture" style={btnStyle} title="Capture a signature" 
                onClick={() => (window.capture(firstName.current, lastName.current, imageBox.current, txtSignature.current, chkSigText.current, chkB64.current))}>Capture</button>
      </td>
      <td style={tblStyle}>
        <button value="Verify" style={btnStyle} title="Checks the signature hash" onClick={() => (window.verifySignedData())}>Verify</button>
      </td>
    </tr>
    <tr>
      <td style={tblStyle}>
        <button value="Signature Details" style={btnStyle} title="Displays capture details of the signature" onClick={() => (window.displaySignatureDetails())}>Details</button>
      </td>
      <td style={tblStyle}>
        <button value="License Info" style={btnStyle} title="Displays the Help About box" onClick={() => (window.aboutBox())}>License</button>
      </td>
    </tr>
    <tr>
      <td style={tblStyle}>
        <button value="Clear" style={btnStyle} title="Clears the signature" onClick={() => (window.clearSignature())}>Clear</button>
      </td>
      <td style={tblStyle}>
        <button value="Restore" id="Restore" style={btnStyle} ref={btnRestore} title="Restores the signature from the SigText data. To use this function please tick Output SigText to form" 
                onClick={() => (window.setSignatureText())} >Restore</button>
      </td>
    </tr>
  </table>
  <br/><br/>
  <b>Data included in the hash: </b>
  <input id="fname" ref={firstName} defaultValue={`${signatory.firstName}`}/>
  <input id="lname" ref={lastName} defaultValue={`${signatory.lastName}`}/>
  <br/><br/>
  <b>Options:</b>
  <br/>
  <input type="checkbox" id="chkUseB64Image" ref={chkB64}/>Use base-64 signature image
  <br/>
  <input type="checkbox" id="chkShowSigText" onChange={() => setRestoreButtonState(chkValue)} ref={chkSigText} />Output SigText to form 
  <br/><br/>
  <textarea cols="125" rows="15" id="txtDisplay" ref={txtDisplay}></textarea>
  <br/>
  <br/>SigText:<br/>
  <textarea cols="125" rows="15" id="txtSignature" ref={txtSignature}></textarea>
  </>
  );
};

function App()
{
  useEffect(() => {
    // When the form is first drawn call the bodyOnLoad() function to initialise the SigCaptX session
    window.bodyOnLoad(document.getElementById("txtDisplay"), document.getElementById("chkShowSigText"), document.getElementById("Restore"));
  }, []);
  return FormElements();
}

ReactDOM.render(
  <SignerContext.Provider value={signer}>
    <App />
  </SignerContext.Provider>,
  document.getElementById('root')
)
