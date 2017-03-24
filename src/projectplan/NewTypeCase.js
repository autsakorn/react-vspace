import React, { Component } from 'react';
class NewTypeCase extends Component {
  constructor(props){
    super(props);
    this.state = {openAddNewColumn:false, selectValue:this.props.listType[0].name, listType:this.props.listType};
    this.handleAddNewColumn = this.handleAddNewColumn.bind(this);
    this.handleTextareaClose = this.handleTextareaClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleAddColumn = this.handleAddColumn.bind(this);
  }
  handleAddNewColumn(){
    this.setState({openAddNewColumn:true});
  }
  handleSubmit(){
  }
  handleChange(e){
    this.setState({selectValue:e.target.value});
  }
  handleAddColumn(){
    this.props.onAddColumn(this.state.selectValue);
    this.setState({openAddNewColumn:false});
  }
  handleTextareaClose(){
    this.setState({openAddNewColumn:false});
  }
  render(){
    var ele;
   if(!this.state.openAddNewColumn){
      ele = <div className="lists mode-add"><div onClick={this.handleAddNewColumn}>Add New Column...</div></div>
   }else{
      var listType = this.props.listType.map(function(item,k){
          return <option key={k}>{item.name}</option>;
      });
      ele =
        <div className="lists">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group form-group-sm">
              <select className="form-control" onChange={this.handleChange}>
                {listType}
              </select>
            </div>
            <div className="form-footer">
              <button onClick={this.handleAddColumn} type="button" className="btn">Add</button>
              <a href="#" onClick={this.handleTextareaClose}><i className="fa fa-times" aria-hidden="true"></i></a>
            </div>
          </form>
        </div>
   }
   return (
     <div>{ele}</div>
   );
  }
}
export default NewTypeCase;
