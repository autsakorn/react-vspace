import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

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
    if(this.props.case.status==="Editing"){
      return (
        <form onSubmit={this.handleSubmit}>
          <div className="form">
            <a href="#" className="pull-right" onClick={this.handleTextareaClose}><i className="fa fa-times" aria-hidden="true"></i></a>
            <input className="add-subject" onChange={this.handleTxtChange} value={this.state.name} />
            <div><a href="#"><i className="fa fa-fw fa-user"></i> {(this.state.item.owner_thainame)?this.state.item.owner_thainame:'ยังไม่กำหนด Owner'}</a></div>
            <div><a href="#"><i className="fa fa-fw fa-clock-o"></i> 1 (Man Days)</a></div>
            <div><a href="#" className="margin-left-4px" onClick={this.handleDelete}><i className="fa fa-trash-o" aria-hidden="true"></i> <small>Remove</small></a></div>
          </div>
        </form>
      )
    }else{
      return (
        <div>
          <CardHeader
            title="Without Avatar"
            subtitle="Subtitle"
            actAsExpander={false}
            showExpandableButton={true}
          />
          <CardActions>
            <FlatButton label="Action1" />
            <FlatButton label="Action2" />
          </CardActions>
          <CardText expandable={true}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
            Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
            Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
          </CardText>
          <article data-id={this.state.sid} className="card" onClick={this.handleEditing} >
            <header >{this.state.item.subject}</header>
            <div className="detail">
              <span><i className="fa fa-fw fa-user"></i> {(this.state.item.owner_thainame)?this.state.item.owner_thainame:'ยังไม่กำหนด Owner'}</span>
              <span className="pull-right"><i className="fa fa-fw fa-clock-o"></i> 1 </span>
            </div>
          </article>
        </div>
      );
    }
  }
}
export default CardItem;
