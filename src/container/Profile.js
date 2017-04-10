import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import NavCompoment from '../nav/NavCompoment';
import TextField from 'material-ui/TextField';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import RaisedButton from 'material-ui/RaisedButton';
import get from '../config/Get.js';
import Url from '../config/url';
import InfoGen from '../config/InfoGen';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import MediaQuery from 'react-responsive';
class Profile extends Component {

  render(){
    var style = {
        container: {
        // position: 'absolute',
        padding:'20px 0px',
        margin:'auto',
        left: 0,
        right: 0,
        top: '70px',
        bottom: 0,
        backgroundColor:'#EDEFF0'
      },
      wrapper: {
        // position: 'absolute',
        // left: 0,
        // right: 0,
        // top: 0,
        // bottom: 0,
        width:'100%',
        maxWidth: '70%',
        margin : 'auto',
        textAlign:'center'
        // overflow:'auto'
      },
      profile:{
        width:'120px',
        height:'initial',
        cursor: 'pointer',
        marginRight:'20%',
        marginTop :'10%'
      }

    }

    var textField =
      <div>
          <div>
            <TextField floatingLabelText="Fullname"
            floatingLabelFixed={true}
           />
         </div>
         <div>
           <TextField
            floatingLabelText="Mobile"
            floatingLabelFixed={true}
           />
        </div>
        <div>
            <TextField
              floatingLabelText="Email"
              floatingLabelFixed={true}
             />
         </div>
         <div>
             <TextField
              floatingLabelText="Company"
              floatingLabelFixed={true}
             />
         </div>
         <div>
          <br/>
          <RaisedButton label="Save" primary={true} />
         </div>
      </div>;
    return(

      <div>
        <MuiThemeProvider>
          <div >
            <NavCompoment info={this.props.info} />

            <MediaQuery query='(min-device-width: 769px)'>
                <div id="vspace-container" style={style.container}>
                    <div className="vspace-wrapper" style={style.wrapper}>
                      <Card style={{border:'none',boxShadow:'none',backgroundColor:'#EDEFF0'}}>
                            <div style={{float:'left', width:'40%', textAlign:'right'}}>
                              <Avatar src="http://vspace.in.th/api/assets/images/employee/PS005506_11.jpg" style={style.profile}/>
                            </div>
                            <div style={{float:'right', width:'60%', textAlign:'left'}}>
                              {textField}
                           </div>
                           <div style={{clear:'both'}}></div>
                        <br/>
                      </Card>
                    </div>
                </div>
            </MediaQuery>

            <MediaQuery query='(max-device-width: 768px)'>
                  <div id="vspace-container" style={style.container}>
                      <div className="vspace-wrapper" style={style.wrapper}>
                        <Card>
                              <div>
                                <Avatar src="http://vspace.in.th/api/assets/images/employee/PS005506_11.jpg" style={style.profile}/>
                              </div>
                              <div >
                                {textField}
                             </div>
                             <div style={{clear:'both'}}></div>
                          <br/>
                        </Card>
                      </div>
                  </div>
            </MediaQuery>

          </div>

        </MuiThemeProvider>
      </div>
    )
  }
}

export default Profile;
