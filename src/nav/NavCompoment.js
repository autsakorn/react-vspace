import React, { Component } from 'react';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import {red500} from 'material-ui/styles/colors';
import TextField from 'material-ui/TextField';

class NavCompoment extends Component {
  constructor(props){
    super(props);
    console.log(props);
    this.state = {...props};
  }
  handleSignOut(){
    localStorage.removeItem("case_email");
    localStorage.removeItem("case_token");
    location.reload();
  }
  handlevSpace(){
    localStorage.removeItem("project_sid");
    location.reload();
  }
  render(){
    const style = {
      title: {
        fontSize:14,
        color:'#ffffff'
      },
      toolbar: {
        backgroundColor: 'rgb(0, 188, 212)',
        color: '#ffffff',
      },
      search: {color:'#FFFFFF'}
    }

    return(
      <Toolbar style={style.toolbar}>
        <TextField inputStyle={style.search} hintStyle={style.search}
          hintText="Search"
        />
        <ToolbarTitle onClick={this.handlevSpace} style={{'cursor':'pointer'}} text="vSpace">
        </ToolbarTitle>
        <ToolbarGroup>
          <ToolbarTitle style={style.title} text={this.props.info.name}>
          </ToolbarTitle>
          <IconMenu color={red500}
            iconButtonElement={
              <IconButton iconStyle={{color:"#FFFFFF"}} touch={true}>
                <NavigationExpandMoreIcon />
              </IconButton>
            }
          >
            <MenuItem primaryText="More Info" />
            <MenuItem primaryText="Sign Out" onClick={this.handleSignOut} />
          </IconMenu>
        </ToolbarGroup>
      </Toolbar>
    )
  }
}

export default NavCompoment;
