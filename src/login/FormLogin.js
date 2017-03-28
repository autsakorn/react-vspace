import React, { Component } from 'react';
import get from '../config/Get.js';
import Url from '../config/url';
import TextField from 'material-ui/TextField';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

class FormLogin extends Component{
   constructor(props){
     super(props)
     this.state = {user: "",password: ""};
      this.handleUserChange = this.handleUserChange.bind(this);
      this.handlePasswordChange = this.handlePasswordChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleUserChange(event) {
      this.setState({user: event.target.value});
    }
    handlePasswordChange(event) {
      this.setState({password: event.target.value});
    }
    handleSubmit(event) {
      var formData = new FormData();
      formData.append("email",this.state.user);
      formData.append("password",this.state.password);

      get(Url.login, formData).then(function(res){
        if(!res.error){
          localStorage.setItem("case_email", res.user.email);
          localStorage.setItem("case_token", res.token);
          location.reload();
        }else{
          alert(res.message);
        }
      });
      event.preventDefault();
    }
    handlePage = (newPage) => {
      this.props.onChangePage(newPage);
    }
    goToForgotPassword = () => {
      this.handlePage(2);
    }
    goToSignUp = () => {
      this.handlePage(3);
    }
   render(){
     const style = {
      width: 380,
      margin: '100px auto',
      textAlign: 'center',
    };
    const styleRaisedButton = {
      width: 200,
      margin: 12,
      textAlign: 'center',
      button: {
        margin: 12,
      },
    }
     const TextFieldExampleSimple = () => (
      <div>
        <Card style={style}>
          <form onSubmit={this.handleSubmit}>
            <div><FlatButton label="vSpace" /></div>
            <div>
              <TextField hintText="" floatingLabelText="Email"  onChange={this.handleUserChange}  />
            </div>
            <div>
              <TextField hintText=""  floatingLabelText="Password"  type="password" onChange={this.handlePasswordChange} />
              <br />
            </div>
            <div>
              <RaisedButton
               style={styleRaisedButton.button} onClick={this.handleSubmit} label="Sign In" primary={true}>
                <input type="submit" style={{display:'none'}} />
              </RaisedButton>
            </div>
            <div>
              <small onClick={this.goToSignUp} style={{'float':'left','marginLeft':'60px','color':'rgb(0, 188, 212)','cursor':'pointer'}}>Sign Up</small>
              <small onClick={this.goToForgotPassword} style={{'float':'right','marginRight':'10px','color':'rgb(0, 188, 212)','cursor':'pointer'}}>Forgot Password</small>
              <div style={{'clear':'both','marginBottom':'20px'}}></div>
            </div>
          </form>
        </Card>
      </div>);
     return(

         <div className="login" >
           <div className="login-screen">
            {TextFieldExampleSimple()}
           </div>
         </div>

     )
   }
 }
 export default FormLogin;
