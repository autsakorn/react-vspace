import React, { Component } from 'react';
// import { ButtonToolbar,Button,DropdownButton,MenuItem } from 'react-bootstrap';
class UserInfo extends Component {
  constructor(props){
    super(props);
    this.state = {info:this.props.info};
  }
  handleSignOut(){
    localStorage.removeItem("case_email");
    localStorage.removeItem("case_token");
    location.reload();
  }
  render(){
    // const buttonsInstance = (
    //   <ButtonToolbar>
    //     <DropdownButton bsSize="small" title={this.state.info.name} id="dropdown-size-small" className="button-style-right">
    //       <MenuItem onClick={this.handleSignOut} eventKey="1">Sign Out</MenuItem>
    //     </DropdownButton>
    //   </ButtonToolbar>
    // );

      // {buttonsInstance}
    return(
      <span className="dropdown">
      </span>
    )
  }
}

export default UserInfo;

// <MenuItem eventKey="2">Another action</MenuItem>
// <MenuItem eventKey="3">Something else here</MenuItem>
// <MenuItem divider />
// <MenuItem eventKey="4">Separated link</MenuItem>


// <span className="dropdown ddd">
//   <button id="dLabel" role="button" data-toggle="dropdown" className="button-style-right" data-target="#">{this.state.info.name}<span className="caret"></span>
//   </button>
//   <ul className="dropdown-menu multi-level" role="menu" aria-labelledby="dropdownMenu">
//     <li><a href="#">Profile</a></li>
//     <li><a href="#">Timeline</a></li>
//     <li className="divider"></li>
//     <li><a href="#">Sign Out</a></li>
//   </ul>
//   {buttonsInstance}
// </span>
