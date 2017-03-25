import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import FontIcon from 'material-ui/FontIcon';

class CardItem extends Component {
  constructor(props) {
    super(props);
    this.state = {item:this.props.case,editing:false,sid:this.props.case.sid,name:this.props.case.subject};
    this.handleEditing = this.handleEditing.bind(this);
    this.handleTxtChange = this.handleTxtChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTextareaClose = this.handleTextareaClose.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  handleEditing(){
    this.props.onEdit(this.state.sid);
  }
  handleTxtChange(e){
    this.setState({name:e.target.value});
    this.props.onEditChange(this.state.sid, e.target.value);
  }
  handleSubmit(e){
    e.preventDefault();
    this.props.onEdit(0);
  }
  handleTextareaClose(){
    this.props.onEdit(0);
  }
  handleDelete(){
    if(confirm("Are you sure delete?")){
      this.props.onDelete(this.state.sid);
    }
  }
  render(){
    const iconStyles = {
      marginRight: 24,
    };
    const style = {
      box: {
        'padding':'5px','margin':'0px 5px','border': '1px solid rgb(217, 217, 217)'
      }
    }
    if(this.props.case.status==="Editing"){
      return (
        <div style={style.box}>
          <form onSubmit={this.handleSubmit}>
            <div className="form">
              <FontIcon className="material-icons" onClick={this.handleTextareaClose} style={iconStyles}>x</FontIcon>
              <input className="add-subject" onChange={this.handleTxtChange} value={this.state.name} />
              <div><a href="#"><i className="fa fa-fw fa-user"></i> {(this.state.item.owner_thainame)?this.state.item.owner_thainame:'ยังไม่กำหนด Owner'}</a></div>
              <div><a href="#"><i className="fa fa-fw fa-clock-o"></i> 1 (Man Days)</a></div>
              <div><a href="#" className="margin-left-4px" onClick={this.handleDelete}><i className="fa fa-trash-o" aria-hidden="true"></i> <small>Remove</small></a></div>
            </div>
          </form>
        </div>
      )
    }else{
      return (
        <div data-id={this.state.sid} style={style.box} onClick={this.handleEditing}>
          <CardHeader
            title={this.state.item.subject}
            subtitle={(this.state.item.owner_thainame)?this.state.item.owner_thainame:'ยังไม่กำหนด Owner'}
            actAsExpander={false}
            showExpandableButton={true}
          />
          <CardActions>
          </CardActions>
          <CardText expandable={true}>
          </CardText>
        </div>
      );
    }
  }
}
export default CardItem;

// <article data-id={this.state.sid} className="card" onClick={this.handleEditing} >
//   <header >{this.state.item.subject}</header>
//   <div className="detail">
//     <span><i className="fa fa-fw fa-user"></i> {(this.state.item.owner_thainame)?this.state.item.owner_thainame:'ยังไม่กำหนด Owner'}</span>
//     <span className="pull-right"><i className="fa fa-fw fa-clock-o"></i> 1 </span>
//   </div>
// </article>
