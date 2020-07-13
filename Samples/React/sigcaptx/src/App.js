/* **************************************************************************
  App.js
   
  This React script renders the HTML form which allows the user to start  
  the signature capture and choose various options.
	
  Copyright (c) 2020 Wacom Co. Ltd. All rights reserved.
  
   v1.0
  
***************************************************************************/
import React from 'react';
import './App.css';

const textStyle = {
	marginLeft: "15px",
};

const btnStyle = {
	height: "10mm",
	width: "35mm",
};

const boxStyle = {
	height: "35mm",
	width: "60mm",
	border: "1px solid #d3d3d3",
};

class Button extends React.Component {
  render()
  {
    return (
			<div>
				<input type="button" id={this.props.id} value={this.props.value} style={btnStyle} onClick={this.props.funcName} />
			</div>
    );
  }
}

class TextBox extends React.Component {
	render()
	{
		return(
			<textarea cols="125" rows="15" id={this.props.id} style={{marginLeft:"15px", padding:"10px 10px", textAlign:"left"}}></textarea>
		);
	}
}
		

class App extends React.Component {
	render() {
	  return (
		<div className="App">
		   <div style={{width: "100%"}}>
			 	<h2 style={textStyle}>Test Signature Control</h2>
			  <table>
			  <tbody>
				<tr>
				  <td rowSpan="3">
						<div id="imageBox" className="boxed" style={boxStyle} onDoubleClick={window.displaySignatureDetails} title="Double-click a signature to display its details">
					</div>
					</td>
					<td>
						<Button value="Capture" funcName={window.capture} title="Starts signature capture" />
					</td>
					<td>
						<Button value="Verify" funcName={window.verifySignedData} title="Checks the signature hash" />
					</td>
				</tr>
				<tr>
				  <td>
						<Button value="Clear" funcName={window.clearSignature} title="Clears the signature" />
				  </td>
				  <td>
						<Button value="License Info" funcName={window.aboutBox} title="Displays the Help About box" />
				  </td>
				</tr>
				<tr>
				  <td>
						<Button value="Restore" id="Restore" funcName={window.setSignatureText} title="Restores the signature from the SigText data. To use this function please tick <Output SigText to form>" />
				  </td>
				  <td>
						<Button value="Signature Details" funcName={window.displaySignatureDetails} title="Displays capture details of the signature" />
				  </td>
				</tr>
				</tbody>
			  </table>
				
			  <table>
					<tbody>
						<tr>
							<td>
								<b>Data included in the hash:</b>
							</td>
							<td>
								First name: <input type="text" id="fname" defaultValue="John"/>
							</td>
							<td>
								Last name: <input type="text" id="lname" defaultValue="Smith"/>
							</td>
						</tr>
					</tbody>
			  </table>
				
				<table>
					<tbody>
						<tr>
							<td>
								<b>Options:</b>
							</td>
							<td>
								<input type="checkbox" id="chkUseB64Image"/>Use base-64 signature image
							</td>
							<td>
								<input type="checkbox" id="chkShowSigText" onClick={window.enableRestoreButton}/>Output SigText to form
							</td>
						</tr>
					</tbody>
				</table>
				
				<TextBox id="txtDisplay"/>
				<br/>&nbsp;&nbsp;&nbsp;SigText:<br/>
				<TextBox id="txtSignature"/>
			</div>
		</div>
	  );
	}
}

export default App;
