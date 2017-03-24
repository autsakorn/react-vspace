import React, { Component } from 'react';
import Lists from './Lists';
import HeaderProject from './HeaderProject';
import NewTypeCase from './NewTypeCase';

import {List, ListItem, makeSelectable} from 'material-ui/List';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

class Column extends Component {
  constructor(props) {
    super(props);
    this.state = {casetype:this.props.casetype};
    this.onAddNew = this.onAddNew.bind(this);
    this.onAdding = this.onAdding.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.onEditChange = this.onEditChange.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.handleAddColumn = this.handleAddColumn.bind(this);
  }
  onAddNew(sid, data){
    this.props.onAddNew(sid, data);
  }
  onAdding(sid){
    this.props.onAdding(sid);
  }
  onEdit(fSid, sSid){
    this.props.onEdit(fSid,sSid);
  }
  onEditChange(fSid, sSid, value){
    this.props.onEditChange(fSid, sSid, value);
  }
  onDelete(fSid, sSid){
    this.props.onDelete(fSid, sSid);
  }
  handleAddColumn(data){
    this.props.onAddColumn(data);
  }
  render() {
    var lists = [];
    var that = this;
    this.props.casetype.forEach((item,k) => {
      lists.push(<Lists key={k} sid={item.sid} header={item.type} item={item.case} onAdding={that.onAdding} status={item.status} onEdit={this.onEdit} onEditChange={this.onEditChange} onDelete={this.onDelete} onAddNew={this.onAddNew} />);
    });
    const styles = {
      root: {
        display: '-webkit-box',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        width:'100%',
        overflow:'auto'
      },
      gridList: {
        display: '-webkit-inline-box',
        flexWrap: 'nowrap',
        width:'400px'

        // overflowX: 'auto',
      },
      titleStyle: {
        color: 'rgb(0, 188, 212)',
      },
    };
    return (
      <div>
        <HeaderProject projectInfo={this.props.projectInfo} />

              <div style={styles.root}>
                <List style={styles.gridList} >
                  {lists}
                  <NewTypeCase onAddColumn={this.handleAddColumn} listType={this.props.listType}/>
                </List>
              </div>

      </div>
    );
  }
}
export default Column;
