import React, { Component } from 'react';
import Column from './Column';

class MyApp extends Component{
  constructor(props) {
    super(props);
    this.state = {casetype:this.props.casetype,projectInfo:this.props.projectInfo};
    this.onAdding = this.onAdding.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.onEditChange = this.onEditChange.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onAddNew = this.onAddNew.bind(this);
    this.handleAddColumn = this.handleAddColumn.bind(this);
  }
  onAddNew(sid, data){
    var dLength = this.props.casetype.length;
    for(var i=0; i<dLength;i++){
        if(sid===this.props.casetype[i].sid){
          var maxSid = 0;
          for(var j=0;j<this.props.casetype[i].case.length;j++){
            if(this.props.casetype[i].case[j].sid>maxSid){
              maxSid = this.props.casetype[i].case[j].sid;
            }
          }
          this.props.casetype[i].case.push({sid:(maxSid+1),subject:data});
        }
    }
    console.log(this.props.casetype);
    this.setState({casetype:this.props.casetype});
  }
  onAdding(sid){
    var dLength = this.props.casetype.length;
    for(var i=0;i<dLength;i++){
      if(sid===this.props.casetype[i].sid){
        this.props.casetype[i].status = "Adding";
      }else{
        this.props.casetype[i].status = "Normal";
      }
      for(var j=0;j<this.props.casetype[i].case.length;j++){
          this.props.casetype[i].case[j].status = "Normal";
      }
    }
    this.setState({casetype:this.props.casetype});
  }
  onEdit(fSid, sSid){
    var dLength = this.props.casetype.length;
    for(var i=0; i<dLength;i++){
      if(fSid===this.props.casetype[i].sid){
        for(var j=0;j<this.props.casetype[i].case.length;j++){
            if(this.props.casetype[i].case[j].sid===sSid){
               this.props.casetype[i].case[j].status = "Editing";
            }else{
              this.props.casetype[i].case[j].status = "Normal";
            }
        }
      }else{
        for(var j2=0;j2<this.props.casetype[i].case.length;j2++){
          this.props.casetype[i].case[j2].status = "Normal";
        }
      }
      this.props.casetype[i].status = "Normal";
    }
    this.setState({casetype:this.props.casetype});
  }
  onEditChange(fSid, sSid, value){
    var dLength = this.props.casetype.length;
    for(var i=0; i<dLength;i++){
        if(fSid===this.props.casetype[i].sid){
            for(var j=0;j<this.props.casetype[i].case.length;j++){
                if(this.props.casetype[i].case[j].sid===sSid){
                    this.props.casetype[i].case[j].subject = value;
                }
            }
        }
    }
    this.setState({casetype:this.props.casetype});
  }
  onDelete(fSid, sSid){
      var dLength = this.props.casetype.length;
      var index = -1;
      for(var i=0; i<dLength;i++){
        if(fSid===this.props.casetype[i].sid){
            for(var j=0;j<this.props.casetype[i].case.length;j++){
                if(this.props.casetype[i].case[j].sid===sSid){
                    index = j;
                    break;
                }
            }
            this.props.casetype[i].case.splice(index, 1);
            this.setState( {casetype: this.props.casetype} );
        }
      }
  }
  handleAddColumn(newColumn){
    this.props.casetype.push({
      sid:(this.props.casetype.length+1),
      type:newColumn,
      status:"Normal",
      case:[]
    });
    this.setState( {casetype: this.props.casetype} );
  }
  render(){
    return(
      <div id="container">
        <Column onDelete={this.onDelete} onAdding={this.onAdding} casetype={this.state.casetype} onEdit={this.onEdit} onEditChange={this.onEditChange} onAddNew={this.onAddNew} listType={this.props.listType} projectInfo={this.props.projectInfo} onAddColumn={this.handleAddColumn} />
      </div>
      );
  }
}

export default MyApp;
