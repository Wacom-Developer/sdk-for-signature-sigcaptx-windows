/* **************************************************************************
  App.js
   
  This React script renders the HTML form which allows the user to start  
  the signature capture and choose various options.
	
  Copyright (c) 2021 Wacom Co. Ltd. All rights reserved.
  
   v2.0  Use React state objects for updating the DOM
  
***************************************************************************/
import React from 'react';
import './App.css';

const textStyle = {
	marginLeft: "15px",
};

const textBoxStyle = {
	marginLeft: "15px",
	padding:"10px 10px",
	textAlign:"left"
} 

const btnStyle = {
	height: "10mm",
	width: "35mm",
};

const boxStyle = {
	height: "35mm",
	width: "60mm",
	border: "1px solid #d3d3d3",
};

export class Button extends React.Component {
	constructor(props) {
		super(props);
    this.state = {disabled: false};
  }
	handleOnChange(event) {
		if (this.props.id == "Restore")
		{
			// Disable the Restore button when required
			this.setState({
				disabled: event.target.value
			})
		}
  }
  render()
  {
    return (
			<div>
				<input type="button" id={this.props.id} value={this.props.value} disabled={this.state.disabled} style={btnStyle} 
					onChange={(event) => this.handleOnChange(event)}  
					onClick={this.props.funcName} />
			</div>
    );
  }
}

export class FirstName extends React.Component {
	constructor(props) {
		super(props);
    this.state = {firstName: "John"};
  }
	handleOnChange(event) {
    this.setState({
      firstName: event.target.value
    })
  }
  render()
  {
    return (
			<div>
				First name: <input type="text" id="fname" onChange={(event) => this.handleOnChange(event)} defaultValue={this.state.firstName}/>
			</div>
    );
  }
}


export class LastName extends React.Component {
	constructor(props) {
		super(props);
    this.state = {lastName: "Smith"};
  }
	handleOnChange(event) {
    this.setState({
      lastName: event.target.value
    })
  }
  render()
  {
    return (
			<div>
				Last name: <input type="text" id="lname" onChange={(event) => this.handleOnChange(event)} defaultValue={this.state.lastName}/>
			</div>
    );
  }
}

export class TextSignature extends React.Component {
	constructor(props) {
		super(props);
    this.state = {txtSignature: ""};
  }
	handleOnChange(event) {
    this.setState({
      txtSignature: event.target.value
    })
  }
	render()
	{
		return(
			<textarea cols="125" rows="15" value={this.state.txtSignature} onChange={(event) => this.handleOnChange(event)} style={textBoxStyle}></textarea>
		);
	}
}

// This is the class for the scrolling text area showing progress messages to the user
export class UserMsgs extends React.Component {
	constructor(props) {
		super(props);
    this.state = {
			userMessage: ""
		};
		this.textLog = React.createRef();
  }
	
	componentDidUpdate()
	{
		this.textLog.current.scrollTop = this.textLog.current.scrollHeight; // Auto-scrolls to the bottom
	}
	
	handleOnChange(event) {
    this.setState({
      userMessage: event.target.value
    })
  }

	render()
	{
		return(
			<textarea ref={this.textLog} cols="125" rows="15" value={this.state.userMessage} onChange={(event) => this.handleOnChange(event)} style={textBoxStyle}/>
		);
	}
}

export class ImageBox extends React.Component {
	
	constructor(props) {
		super(props);
    this.state = {
			imageSrc: "",
			height:135,
			width:230
		};
  }
	handleOnChange(event) {
    this.setState({
			imageSrc: event.target.value
    })
		console.log("imageSrc changed");      
  }
	render()
	{
		return(
			<div>
				<img id="imageBox" className="boxed" src={this.state.imageSrc} style={boxStyle} onChange={(event) => this.handleOnChange(event)}/>
			</div>
		);
	}
}

export class ChkBoxB64 extends React.Component {
	constructor(props) {
		super(props);
		this.state = {checked: false}
	}
	handleOnChange(event) {
		this.setState({
			checked: event.target.value
		})
	}
	render()
	{
		return(
		<div>
			<input type="checkbox" id="chkUseB64Image" onChange={(event) => this.handleOnChange(event)}/>Use base-64 signature image
		</div>
		);
	}
}

export class ChkBoxSigText extends React.Component {
	constructor(props) {
		super(props);
		this.state = {checked: false}
	}
	handleChange = () => {
		this.state.checked = !this.state.checked;
		window.enableRestoreButton(); // Enable or disable the Restore button
	}
	
	render()
	{
		return(
		<div>
			<input type="checkbox" id="chkShowSigText" 
				checked={this.props.checked} 
				onChange={(event) => this.handleChange(event)} 
				/>Output SigText to form
		</div>
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
						<ImageBox ref={ImageBox => { window.ImageBox = ImageBox }}/>
					</td>
					<td>
						<Button value="Capture" funcName = {window.capture} title = "Starts signature capture" />
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
						<Button value="Restore" id="Restore" funcName={window.setSignatureText} title="Restores the signature from the SigText data. To use this function please tick <Output SigText to form>" ref={Button => { window.Button = Button }}/>
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
								<FirstName ref={FirstName => { window.FirstName = FirstName }}/>
							</td>
							<td>
								<LastName ref={LastName => { window.LastName = LastName }}/>
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
								<ChkBoxB64 ref={ChkBoxB64 => { window.ChkBoxB64 = ChkBoxB64 }}/>
							</td>
							<td>
								<ChkBoxSigText ref={ChkBoxSigText => { window.ChkBoxSigText = ChkBoxSigText }}/>
							</td>
						</tr>
					</tbody>
				</table>
				
				<UserMsgs ref={UserMsgs => { window.UserMsgs = UserMsgs }}/>
				<br/>&nbsp;&nbsp;&nbsp;SigText:<br/>
				<TextSignature id="txtSignature" ref={TextSignature => { window.TextSignature = TextSignature }}/>

			</div>
		</div>
	  );
	}
}

export default App;