import React, { Component } from 'react';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {List, ListItem} from 'material-ui/List';
import initReactFastclick from 'react-fastclick';
initReactFastclick();

class OwnerDialog extends Component {
    constructor(props){
      super(props);
      this.state = {
        listItem:this.props.listItem,
        title: this.props.title,
        label:this.props.label,
        icon:this.props.icon,
        open: false,
      };
    }
    handleOpen = () => {
      this.setState({open: true});
    };

    handleClose = () => {
      this.setState({open: false});
    };
    handleSelectOwner = (email, pic_employee, thainame, engname) => {
      this.props.onSelectItem(email, pic_employee, thainame, engname);
      this.handleClose();
    }
    render(){
      const styles = {
        radioButton: {
          marginTop: 16,
        },
        chip: {
          margin: 4
        }
      };
      const actions = [
        <FlatButton
          label="Cancel"
          primary={true}
          onTouchTap={this.handleClose}
        />,
      ];
      // <FlatButton
      //   label="Submit"
      //   primary={true}
      //   keyboardFocused={true}
      //   onTouchTap={this.handleClose}
      // />,
      var listItem = [];
      this.state.listItem.forEach((item) => {
          listItem.push(<ListItem key={item.email}
            leftAvatar={<Avatar src={item.pic_employee} />}
            primaryText={item.thainame}
            onTouchTap={()=>this.handleSelectOwner(item.email, item.pic_employee, item.thainame, item.engname)} data-id={item.email}
            secondaryText={
              <p>
                {item.engname} <br/>
                {item.email}
              </p>
            }
            secondaryTextLines={2}
          />);
      });
      return(
        <div>
          <Chip onTouchTap={this.handleOpen} style={styles.chip}><Avatar icon={this.state.icon} /> {this.state.label}</Chip>
          <Dialog
            title={this.state.title}
            actions={actions}
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose}
            autoScrollBodyContent={true}
          >
            <div>{listItem}</div>
          </Dialog>
        </div>
      );
    }
}

export default OwnerDialog;
