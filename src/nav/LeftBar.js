import React, { Component } from 'react';
class LeftBar extends Component{
  handlevSpace(){
    localStorage.removeItem("project_sid");
    location.reload();
  }
  render(){
    return(
      <div id="left-bar">
          <button type="button" onClick={this.handlevSpace} className="button-style">
          <div className="fa fa-home" ></div><span className="text-style">vSpace</span>
         </button>
         <button type="button" className="button-style">
            <div className="fa fa-search fa-flip-horizontal search-icon"></div>
            <input type="text" className="input-style" />
         </button>
      </div>
    );
  }
}

export default LeftBar;
