import React, { Component } from 'react';
class InputNew extends Component {
  constructor(props) {
    super(props);
    this.state = {btnName:"Add",toggleTextarea:this.props.status, subject:"",initialValue:"", sid: this.props.sid}
    this.handleTextarea = this.handleTextarea.bind(this);
    this.handleAddNew = this.handleAddNew.bind(this);
    this.handleSubjectChange = this.handleSubjectChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTextareaClose = this.handleTextareaClose.bind(this);
  }
  handleTextarea(){
    this.props.onAdding(this.state.sid);
  }
  handleTextareaClose(){
    this.props.onAdding(0);
  }
  handleAddNew(){
    this.props.onAddNew(this.state.subject);
    this.setState({initialValue:""});
  }
  handleSubjectChange(e){
    this.setState({subject:e.target.value});
    this.setState({initialValue:e.target.value});
  }
  handleSubmit(e){
    this.props.onAddNew(this.state.subject);
    this.setState({initialValue:""});
    e.preventDefault();
  }
  render(){
    var textarea;
    if(this.props.toggleTextarea==="Adding"){
      textarea =
        <form onSubmit={this.handleSubmit}>
          <div className="form">
            <input className="add-subject" value={this.state.initialValue} onChange={this.handleSubjectChange} />
          </div>
          <div className="form-footer">
            <button type="button" onClick={this.handleAddNew} className="btn">Add</button>
            <a href="#" onClick={this.handleTextareaClose}><i className="fa fa-times" aria-hidden="true"></i></a>
          </div>
        </form>;
    }else{
      textarea = <a onClick={this.handleTextarea} className="open-card" href="#">{this.state.btnName}</a>
    }
    return(
      <div>
        {textarea}
      </div>
    );
  }
}
export default InputNew;
