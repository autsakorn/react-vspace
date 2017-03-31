import React, { Component } from 'react';
import get from '../config/Get.js';
import Url from '../config/url';
import SignUp from './Signup.js';
import Forgot from './Forgot.js';

import TextField from 'material-ui/TextField';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
// import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';

import Subheader from 'material-ui/Subheader';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

import {GridList, GridTile} from 'material-ui/GridList';
// import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

class FormLogin extends Component{
   constructor(props){
     super(props)
     this.state = {user: "",password: "",page:"1"};
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
          localStorage.removeItem("project_sid");
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
      // this.props.onChangePage(newPage);
      this.setState({page:newPage});
    }
    goToForgotPassword = () => {
      this.handlePage(2);
    }
    goToSignUp = () => {
      this.handlePage(3);
    }
    goToSignIn = () => {
      this.handlePage(1);
    }
    handleRefrash = () => {
      location.reload();
    }
   render(){
     const style = {
      width: 380,
      margin: '0px auto 20px auto',
      textAlign: 'center',
      clear:'both'
    };
    const styleRaisedButton = {
      width: 200,
      margin: 12,
      textAlign: 'center',
      button: {
        margin: 12,
      },
    }
    var signUp = <div><IconButton>Sign Up</IconButton></div>;
    var starterForm;
    if(this.state.page===1){
      var formLogin = <Card style={style}>
        <form onSubmit={this.handleSubmit}>
          <div style={{'paddingTop':'20px'}}><span>ยินดีต้อนรับสู่ vSpace </span></div>
          <div>
            <TextField hintText="ตัวอย่างเช่น teerawut.p@firstlogic.co.th" floatingLabelText="Email"  onChange={this.handleUserChange}  />
          </div>
          <div>
            <TextField hintText="เช่น ..."  floatingLabelText="Password"  type="password" onChange={this.handlePasswordChange} />
            <br />
          </div>
          <div>
            <RaisedButton
             style={styleRaisedButton.button} onClick={this.handleSubmit} label="Sign In" primary={true}>
              <input type="submit" style={{display:'none'}} />
            </RaisedButton>
          </div>
          <div>
            <small onClick={this.goToForgotPassword} style={{'float':'right','marginRight':'10px','color':'rgb(0, 188, 212)','cursor':'pointer'}}>Forgot Password</small>
            <div style={{'clear':'both','marginBottom':'20px'}}></div>
          </div>
        </form>
      </Card>;

      starterForm = formLogin;
    }else if(this.state.page===3){
      starterForm = <div style={{minHeight:'300px'}}><SignUp /></div>;
    } else if(this.state.page===2){
      starterForm = <div style={{minHeight:'300px'}}><Forgot /></div>;
    }else{
      starterForm = <div></div>;
    }
    const styles = {
      root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        padding:'20px'
      },
      gridList: {
        width: '100%',
        height: 450,
        overflowY: 'auto',
      },
    };

    const tilesData = [
      {
        img: 'images/grid-list/00-52-29-429_640.jpg',
        title: 'การจัดการ Project',
        author: 'jill111',
      },
      {
        img: 'images/grid-list/burger-827309_640.jpg',
        title: 'บันทึกงานที่ต้องทำ',
        author: 'pashminu',
      },
      {
        img: 'images/grid-list/camera-813814_640.jpg',
        title: 'Camera',
        author: 'Danson67',
      },
      {
        img: 'images/grid-list/morning-819362_640.jpg',
        title: 'Morning',
        author: 'fancycrave1',
      },
      {
        img: 'images/grid-list/hats-829509_640.jpg',
        title: 'Hats',
        author: 'Hans',
      },
      {
        img: 'images/grid-list/hats-829509_641.jpg',
        title: 'Hats',
        author: 'Hans',
      }
    ];

    /**
     * A simple example of a scrollable `GridList` containing a [Subheader](/#/components/subheader).
     */
    const GridListExampleSimple = () => (
      <div style={styles.root}>
        <GridList cols={3}
          cellHeight={180}
          style={styles.gridList}
        >
          {tilesData.map((tile) => (
            <GridTile style={{border:'1px solid #f1f1f1'}}
              key={tile.img}
              title={tile.title}
              subtitle={<span></span>}
            >
            </GridTile>
          ))}
        </GridList>
      </div>
    );

     const TextFieldExampleSimple = () => (
      <div>
        <div>
          <Toolbar style={{'backgroundColor':'none','height':'100px'}}>
            <ToolbarGroup style={{'width':'33%'}}>
              <ToolbarTitle style={{'cursor':'pointer','fontSize':'36px', 'marginLeft':'20px'}} onClick={this.handleRefrash} text="vSpace">
              </ToolbarTitle>
            </ToolbarGroup>
            <ToolbarGroup>
              <FlatButton label="Sign In" onClick={this.goToSignIn} primary={true} />
              <RaisedButton label="Sign Up" onClick={this.goToSignUp} primary={true} />
            </ToolbarGroup>
          </Toolbar>
        </div>
        <div>{starterForm}</div>
        <div style={{backgroundColor:'rgb(0, 188, 212)','height':'300px'}}>
            <div></div>
        </div>
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
 // <div>
 //   <Toolbar style={{'height':'300px','backgroundColor':'none'}}>
 //       <ToolbarGroup></ToolbarGroup>
 //       <ToolbarGroup>
 //       </ToolbarGroup>
 //   </Toolbar>
 // </div>
 // <div>
 //     <Toolbar style={{'height':'300px','backgroundColor':'none'}}>
 //       <ToolbarGroup></ToolbarGroup>
 //     </Toolbar>
 // </div>
 export default FormLogin;
