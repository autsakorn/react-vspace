import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';

class Forgot extends Component {
  state = {
   finished: false,
   stepIndex: 0,
   email:"",
   otp:"",
   newPassword:""
 };

 handleNext = () => {
   const {stepIndex} = this.state;

   this.setState({
     stepIndex: stepIndex + 1,
     finished: stepIndex >= 2,
   });
 };

 handlePrev = () => {
   const {stepIndex} = this.state;
   if (stepIndex > 0) {
     this.setState({stepIndex: stepIndex - 1});
   }
 };
 handleEmail = (e) => {
   this.setState({email:e.target.value});
 }

 getStepContent(stepIndex) {
   switch (stepIndex) {
     case 0:
       return  <TextField type="email"
      hintText="Email" value={this.state.email} onChange={this.handleEmail}
      floatingLabelText=""
      floatingLabelFixed={true} />;
     case 1:
       return <TextField
      hintText="OTP" value=""
      floatingLabelText=""
      floatingLabelFixed={true} />;
     default:
       return 'finished';
   }
 }

  render(){
    const {finished, stepIndex} = this.state;
    const contentStyle = {margin: '21px 230px'};

    return(
      <div style={{width: '100%', maxWidth: 700, margin: 'auto'}}>
          <Stepper activeStep={stepIndex}>
            <Step>
              <StepLabel>Send your e-mail address</StepLabel>
            </Step>
            <Step>
              <StepLabel>Reset Password</StepLabel>
            </Step>

          </Stepper>
          <div style={contentStyle}>
            {finished ? (
              <div>
                <a
                  href="#"
                  onClick={(event) => {
                    event.preventDefault();
                    this.setState({stepIndex: 0, finished: false});
                  }}
                >
                  Click here
                </a> to reset
              </div>
            ) : (
              <div>
                <div>{this.getStepContent(stepIndex)}</div>
                <div style={{marginTop: 12}}>
                  <FlatButton
                    label="Back"
                    disabled={stepIndex === 0}
                    onTouchTap={this.handlePrev}
                    style={{marginRight: 12}}
                  />
                  <RaisedButton
                    label={stepIndex === 2 ? 'Finish' : 'Next'}
                    primary={true}
                    onTouchTap={this.handleNext}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      );
    }
  }

export default Forgot;
