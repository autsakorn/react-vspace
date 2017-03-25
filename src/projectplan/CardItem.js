import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import FontIcon from 'material-ui/FontIcon';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

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
    const styles = {
      box: {
        'padding':'2px 4px','margin':'0px 4px','border': '1px solid rgb(217, 217, 217)',
        'marginBottom':'10px'
      },
      style: {
        margin: 4,
      }
    }
    if(this.props.case.status==="Editing"){
      return (
        <div style={styles.box}>
          <form onSubmit={this.handleSubmit}>
            <div className="form">
              <TextField hintText="Subject" value={this.state.name} onChange={this.handleTxtChange} />
              <div>{(this.state.item.owner_thainame)?this.state.item.owner_thainame:'ยังไม่กำหนด Owner'}</div>
              <div>1 (Man Days)</div>
              <br/>
              <RaisedButton label="Remove" onClick={this.handleDelete} secondary={true} style={styles.style} />
              <RaisedButton label="Close" onClick={this.handleTextareaClose}  style={styles.style} />
            </div>
          </form>
        </div>
      )
    }else{
      return (
        <div data-id={this.state.sid} style={styles.box} onClick={this.handleEditing}>

            <div>
              {this.state.item.subject}
            </div>
            <div><small>{(this.state.item.owner_thainame)?this.state.item.owner_thainame:'ยังไม่กำหนด Owner'}</small></div>

        </div>
      );
    }
  }
}
export default CardItem;

// <CardActions>
// </CardActions>
// <CardText expandable={true}>
// </CardText>
// <article data-id={this.state.sid} className="card" onClick={this.handleEditing} >
//   <header >{this.state.item.subject}</header>
//   <div className="detail">
//     <span><i className="fa fa-fw fa-user"></i> {(this.state.item.owner_thainame)?this.state.item.owner_thainame:'ยังไม่กำหนด Owner'}</span>
//     <span className="pull-right"><i className="fa fa-fw fa-clock-o"></i> 1 </span>
//   </div>
// </article>
