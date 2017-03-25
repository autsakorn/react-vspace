import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
class InputNew extends Component {
  constructor(props) {
    super(props);
    this.state = {btnName:"Add New Task",toggleTextarea:this.props.status, subject:"",initialValue:"", sid: this.props.sid}
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
    this.setState({subject:""});
  }
  handleSubjectChange(e){
    this.setState({subject:e.target.value});
    this.setState({initialValue:e.target.value});
  }
  handleSubmit(e){
    this.props.onAddNew(this.state.subject);
    this.setState({subject:""});
    e.preventDefault();
  }
  render(){
    const styles = {
      style:{
        margin: 12,
      },
      box: {
        'padding':'5px','margin':'0px 5px',
        'border': '1px solid rgb(217, 217, 217)'
      }
    }
    var textarea;
    if(this.props.toggleTextarea==="Adding"){
      textarea =
        <div style={styles.box}>
          <form onSubmit={this.handleSubmit}>
            <div className="form">
              <TextField value={this.state.subject} onChange={this.handleSubjectChange} hintText="Subject"/><br />
            </div>
            <div className="form-footer">
              <RaisedButton onClick={this.handleAddNew} primary={true} label="Add" style={styles.style} />
              <RaisedButton onClick={this.handleTextareaClose} label="Cancel" style={styles.style} />
            </div>
          </form>
        </div>;
    }else{
      textarea = <FlatButton onClick={this.handleTextarea} label={this.state.btnName} fullWidth={true} />
    }
    return(
      <div>
        {textarea}
      </div>
    );
  }
}
export default InputNew;
