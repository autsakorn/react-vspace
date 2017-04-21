import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import NavCompoment from '../nav/NavCompoment';
import TextField from 'material-ui/TextField';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import ReactUploadFile from 'react-upload-file';
// import get from '../config/Get.js';
// import Url from '../config/url';
// import InfoGen from '../config/InfoGen';
// import List from 'material-ui/List/List';
// import ListItem from 'material-ui/List/ListItem';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import MediaQuery from 'react-responsive';
import Url from '../config/url';
import get from '../config/Get';
import Put from '../config/Put';
import InfoGen from '../config/InfoGen';
class Profile extends Component {

  constructor(props){
    super(props);
    this.state = {info:this.props.info,is_update:false,openSnackbar:false,file:'',imagePreviewUrl:'',file_picture_profile:''};
  }
  handleChangeFullname = (e) => {
    var tmp = this.state.info;
    tmp.name = e.target.value;
    this.setState({info:tmp,is_update:true});
  }
  handleChangeMobile = (e) => {
    var tmp = this.state.info;
    tmp.mobile = e.target.value;
    this.setState({info:tmp, is_update:true});
  }
  handleChangeCompany = (e) => {
    var tmp = this.state.info;
    tmp.company = e.target.value;
    this.setState({info:tmp, is_update:true});
  }
  updateProfile = () => {
    var formData = new FormData();
    formData.append("email", InfoGen.email);
    formData.append("token", InfoGen.token);
    formData.append("file", this.state.file);
    formData.append('name', this.state.info.name);
    formData.append('mobile', this.state.info.mobile);
    formData.append('company', this.state.info.company);
    formData.append('company_logo', this.state.info.company_logo);
    formData.append('picture_profile', this.state.info.pic_full);
    formData.append('file_picture_profile', this.state.file_picture_profile);
    var that = this;
    if(this.state.is_update){
      Put(Url.updateProfile, formData).then(function(res){
          console.log(res);
          that.setState({is_update:false,openSnackbar:true});
          location.reload();
      });
    }
  }
  uploadLogoCompany = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    console.log(file);
    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result,
        is_update:true
      });
    }

    reader.readAsDataURL(file)
  }
  changePicture_profile = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    console.log(file);
    reader.onloadend = () => {
      this.setState({
        file_picture_profile: file,
        imagePreviewUrl: reader.result,
        is_update:true
      });
    }

    reader.readAsDataURL(file)
  }
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
        // backgroundColor:'#EDEFF0'
      },
      wrapper: {
        // position: 'absolute',
        // left: 0,
        // right: 0,
        // top: 0,
        // bottom: 0,
        width:'100%',
        // maxWidth: '70%',
        margin : 'auto',
        textAlign:'center'
        // overflow:'auto'
      },
      profile:{
        width:'120px',
        height:'initial',
        cursor: 'pointer',
        // marginRight:'20%',
        marginTop :'10%'
      }

    }

    var eleCompanyLogo;
    if(this.state.info.company_logo){
      eleCompanyLogo = <div><br/><img src={this.state.info.company_logo} style={{width:'160px'}} /></div>;
    }
    var textField =
      <div>
          <div>
            <TextField
              floatingLabelText="Email" disabled={true} value={this.state.info.email}
              floatingLabelFixed={true}
             />
         </div>
          <div>
            <TextField floatingLabelText="Fullname" onChange={this.handleChangeFullname} value={this.state.info.name}
            floatingLabelFixed={true}
           />
         </div>
         <div>
           <TextField
            floatingLabelText="Mobile" onChange={this.handleChangeMobile} value={this.state.info.mobile}
            floatingLabelFixed={true}
           />
        </div>

         <div>
             <TextField
              floatingLabelText="Company" onChange={this.handleChangeCompany} value={this.state.info.company}
              floatingLabelFixed={true}
             />
         </div>
         <div>
            {eleCompanyLogo}
            <div><small style={{color:grey400}}>Logo Company</small></div>
            <TextField onChange={this.uploadLogoCompany} type="file" hintText="" name="logo_company" />
         </div>
         <div>
          <br/>
          <RaisedButton label="Update Profile" onTouchTap={this.updateProfile} primary={this.state.is_update} />
         </div>
         <Snackbar
          open={this.state.openSnackbar}
          message="Updated Profile"
          autoHideDuration={4000}
          onRequestClose={()=>{this.setState({openSnackbar:false})}}
        />
      </div>;
    return(

      <div>
        <MuiThemeProvider>
          <div >
            <NavCompoment info={this.props.info} />

            <MediaQuery query='(min-device-width: 769px)'>
                <div id="vspace-container" style={style.container}>
                    <div className="vspace-wrapper" style={style.wrapper}>
                      <Card style={{border:'none',boxShadow:'none'}}>
                            <div style={{float:'left', width:'40%', textAlign:'right'}}>
                              <div style={{marginRight: '40px'}}><Avatar src={this.props.info.pic_full} style={style.profile}/></div>
                              <div style={{'textAlign':'right',marginRight:'50px'}}><TextField style={{width:'90px'}} onChange={this.changePicture_profile} type="file" hintText="" name="picture_profile" /></div>

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
                                <div><Avatar src={this.props.info.pic_full} style={style.profile}/></div>
                                <div style={{'textAlign':'center'}}><TextField style={{width:'85px'}} onChange={this.changePicture_profile} type="file" hintText="" name="picture_profile" /></div>
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
