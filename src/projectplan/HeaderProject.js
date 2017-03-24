import React, { Component } from 'react';
class HeaderProject extends Component {
  constructor(props){
    super(props);
    this.state = {...props};
  }
  render(){
    return(
      <div className="board-header">
        <span className="board-header-btn vspace-header-btn-name js-rename-board" href="#">
            <span className="board-header-btn-text" dir="auto">{this.props.projectInfo.name}</span>
        </span>
        <div className="board-header-btns mod-left">
          <span id="" className="board-header-btn perms-btn js-change-vis" href="#" title="">
            <span className="board-header-btn-text">{this.props.projectInfo.contract_no}</span>
          </span>
        </div>
        <div className="board-header-btns mod-left">
          <span id="permission-level" className="board-header-btn perms-btn js-change-vis" href="#" title="">
            <span className="board-header-btn-text"><span className="fa fa-fw fa-users"></span> End User </span>
          </span>
        </div>
      </div>
    )
  }
}

export default HeaderProject;
