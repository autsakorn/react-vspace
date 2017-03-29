import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import {
  Step,
  Stepper,
  StepButton,
  StepContent,
} from 'material-ui/Stepper';
import FlatButton from 'material-ui/FlatButton';


class ServiceReportCreate extends Component {
  constructor(props){
    super(props);
    this.state = {serviceReport:this.props.serviceReport,createService:false,stepIndex: 0};
  }

  handleCreateService = () => {
    if(this.state.createService){
      this.setState({createService:false});
    }else{
      this.setState({createService:true});
    }
  }

  handleNext = () => {
    const {stepIndex} = this.state;
    if (stepIndex < 2) {
      this.setState({stepIndex: stepIndex + 1});
    }
  };

  handlePrev = () => {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  };

  renderStepActions(step) {
    return (
      <div style={{margin: '12px 0'}}>
        <RaisedButton
          label="Next"
          disableTouchRipple={true}
          disableFocusRipple={true}
          primary={true}
          onTouchTap={this.handleNext}
          style={{marginRight: 12}}
        />
        {step > 0 && (
          <FlatButton
            label="Back"
            disableTouchRipple={true}
            disableFocusRipple={true}
            onTouchTap={this.handlePrev}
          />
        )}
      </div>
    );
  }

  render(){
    const {stepIndex} = this.state;

    var createService;
    if(!this.state.createService){
      createService = <RaisedButton onClick={this.handleCreateService} label="Create Service Report" style={{marginTop:'10px'}} />;
    }else{
      createService =
        <div style={{maxWidth: 380, maxHeight: 400, margin: 'auto'}}>
          <Stepper
            activeStep={stepIndex}
            linear={false}
            orientation="vertical"
          >
            <Step>
              <StepButton onTouchTap={() => this.setState({stepIndex: 0})}>
                Select campaign settings
              </StepButton>
              <StepContent>
                <p>
                  For each ad campaign that you create, you can control how much

                </p>
                {this.renderStepActions(0)}
              </StepContent>
            </Step>
            <Step>
              <StepButton onTouchTap={() => this.setState({stepIndex: 1})}>
                Create an ad group
              </StepButton>
              <StepContent>
                <p>An ad group contains one or more ads which target a shared set of keywords.</p>
                {this.renderStepActions(1)}
              </StepContent>
            </Step>
            <Step>
              <StepButton onTouchTap={() => this.setState({stepIndex: 2})}>
                Create an ad
              </StepButton>
              <StepContent>
                <p>
                  Try out different ad text to see what brings in the most customers,
                  and learn how to enhance your ads using features like ad extensions.
                  If you run into any problems with your ads, find out how to tell if

                </p>
                {this.renderStepActions(2)}
              </StepContent>
            </Step>
          </Stepper>
        </div>
    }

    return(
      <div>
        {createService}
      </div>
    )
  }
}

export default ServiceReportCreate;
