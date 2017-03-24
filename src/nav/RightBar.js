import React, { Component } from 'react';
import UserInfo from './UserInfo';
// import { ButtonToolbar,Button,DropdownButton,MenuItem } from 'react-bootstrap';

class RightBar extends Component{
  render(){
    //   const buttonsInstance = (
    //     <ButtonToolbar>
    //       <DropdownButton bsSize="xsmall" title="Extra small button" id="dropdown-size-extra-small">
    //         <MenuItem eventKey="1">Action</MenuItem>
    //         <MenuItem eventKey="2">Another action</MenuItem>
    //         <MenuItem eventKey="3">Something else here</MenuItem>
    //         <MenuItem divider />
    //         <MenuItem eventKey="4">Separated link</MenuItem>
    //       </DropdownButton>
    //     </ButtonToolbar>
    // );
      return(
        <div id="right-bar">

           <UserInfo info={this.props.info} />

        </div>
      );
  }
}
export default RightBar;

// <button type="button" className="button-style-right">
//    <div className="fa fa-plus"></div>
// </button>
// <button type="button" className="button-style-right">
//     <div className="fa fa-info" ></div>
// </button>
// <a href="#" data="popup1">
//    <button type="button" className="button-style-right">
//      <div className="fa fa-bell-o"></div>
//    </button>
// </a>
