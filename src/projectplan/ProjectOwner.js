import React, { Component } from 'react';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import SocialPersonAdd from 'material-ui/svg-icons/social/person-add';
class ProjectOwner extends Component {
  constructor(props){
    super(props);
    this.state = {...props};
  }
  render(){
    var styles = {
        wrapper: {
          display: 'flex',
          flexWrap: 'wrap',
          float:'left'
        },
        chip: {
          margin: 4,
        }
    }
    var listOwner = [];
    this.state.projectOwner.forEach((item) => {
        var avatar = <Avatar src={item.pic_full} />;
        listOwner.push(<Chip style={styles.chip} key={item.email}>{avatar} {item.engname}</Chip>);
    });
    listOwner.push(<Chip style={styles.chip} key={0}><Avatar icon={<SocialPersonAdd />} /> Add</Chip>);
    return(<div>
      <div style={{textAlign:'left'}}><small style={{color:lightBlack}}>Owner</small></div>
      <div style={styles.wrapper}>{listOwner}</div>
    </div>);
  }
}

export default ProjectOwner;
