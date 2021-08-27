/* **************************************************************************
  App.js
   
  This React script renders the HTML form which allows the user to start  
  the signature capture and choose various options.
	
  Copyright (c) 2021 Wacom Co. Ltd. All rights reserved.
  
   v1.1  Use React state objects for updating the DOM
  
***************************************************************************/
import React from 'react';

const btnStyle = {
	height: "15mm",
  width: "35mm",
  fontSize: "20px",
}

const boxStyle = {
	height: "70mm",
	width: "120mm",
	border: "1px solid #d3d3d3",
}

const textStyle = {
  textAlign: "left",
  marginLeft: "10px",
}

const textBoxStyle = {
	marginLeft: "15px",
	padding:"10px 10px",
	textAlign:"left"
} 

export class ImageBox extends React.Component {
	
	constructor(props) {
		super(props);
    this.state = {
			imageSrc: "",
			height:270,
			width:460
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

export class ButtonStartStopWizard extends React.Component {
	constructor(props) {
		super(props);
    this.state = {disabled: false, value:"Start Wizard"};
  }
	handleOnChange(event) {
		if (this.props.id === "Restore")
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

export class RadioButtonType extends React.Component
{
	constructor(props) {
		super(props);
		this.state = {checked: true, optionSelected: 'standard'}
	}
	
	getInitialState()
	{
		return 
		{
			optionSelected: 'standard'
		};
	}
	
	handleOptionChange(changeEvent) {
		this.setState({
			optionSelected: changeEvent.target.value
		});
		this.setState({
			checked: !this.state.checked
		});
	}
	
	render()
	{
		return (
			<div>
				<div>
					<input type="radio" name="buttontype" id="radio_standard" value="standard"
						labeltext="Use standard buttons" checked={this.state.optionSelected === "standard"}
						onChange={(event) => this.handleOptionChange(event)}/>
					<label htmlFor="standard" >Standard</label>
				</div>
				<div>
					<input type="radio" name="buttontype" id="radio_utf8" value="utf8"
						labeltext="Display UTF-8 text (e.g. for languages using logograms)" checked={this.state.optionSelected === "utf8"}
						onChange={(event) => this.handleOptionChange(event)}/>
					<label htmlFor="UTF8" >Display UTF-8 text (e.g. for languages using logograms)</label>
				</div>
				<div>
					<input type="radio" name="buttontype" id="radio_remote" value="remote" checked={this.state.optionSelected === "remote"}
						labeltext="Use remote (URL) images"
						onChange={(event) => this.handleOptionChange(event)}/>
					<label htmlFor="remote" >Use remote (URL) images</label>
				</div>
			</div>
		);
	}
}
		
export class ChkBoxDisplayWizard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {checked: true}
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
			<input type="checkbox" id="chkDisplayWizard" defaultChecked="true" onChange={(event) => this.handleOnChange(event)}/>Display wizard control window 
		</div>
		);
	}
}

export class ChkBoxLargeCheckBox extends React.Component {
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
			<input type="checkbox" id="chkLargeCheckbox" onChange={(event) => this.handleOnChange(event)}/>Use enlarged checkbox 
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
		this.setState({
      checked: !this.state.checked
    })
	}
	
	render()
	{
		return(
		<div>
			<input type="checkbox" id="chkShowSigText" 
				checked={this.props.checked} 
				onChange={(event) => this.handleChange(event)} 
				/>Output SigText to browser text window
		</div>
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


class App extends React.Component {
	
	state={data:""}
	
	changeState = () => {
		this.setState({data:'mytest' });
	};
	
  render() 
  {
    return (
      <div className="App">
        <div style={{width:"100%"}}>
        <h2 style={textStyle}>SigCaptX Wizard Control Sample</h2>
        <table style={{padding: "10px 10px", cellspacing: "30"}}>
        <tbody>
          <tr>  
            <td rowSpan="2">
              <ImageBox ref={ImageBox => { window.ImageBox = ImageBox }}/>
            </td>
            <td>
							<ButtonStartStopWizard value="Start Wizard" funcName = {window.wizardEventController.start_stop} title = "Starts/stops a wizard script" 
								ref={ButtonStartStopWizard => { window.ButtonStartStopWizard = ButtonStartStopWizard }}/>
            </td>
          </tr>
          </tbody>
        </table>
				
				<h3 style={textStyle}>Options</h3>

				<div style={textStyle}>
					<ChkBoxDisplayWizard ref={ChkBoxDisplayWizard => { window.ChkBoxDisplayWizard = ChkBoxDisplayWizard }}/>
					<ChkBoxLargeCheckBox ref={ChkBoxLargeCheckBox => { window.ChkBoxLargeCheckBox = ChkBoxLargeCheckBox }}/>
					<ChkBoxSigText ref={ChkBoxSigText => { window.ChkBoxSigText = ChkBoxSigText }}/>
				</div>

				<h3 style={textStyle}>Button type</h3>

				<div style={textStyle}>
					<RadioButtonType ref={RadioButtonType => { window.RadioButtonType = RadioButtonType }}/>
					<br/>
				</div>
					<UserMsgs ref={UserMsgs => { window.UserMsgs = UserMsgs }}/>
				</div>
      </div>
    );
  }
}

export default App;

