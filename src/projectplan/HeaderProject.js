import React, { Component } from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import FlatButton from 'material-ui/FlatButton';
import ContactUser from './ContactUser';
import ProjectOwner from './ProjectOwner';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import Url from '../config/url';
import get from '../config/Get';
import Put from '../config/Put';
import InfoGen from '../config/InfoGen';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import HardwareKeyboardArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import HardwareKeyboardArrowUp from 'material-ui/svg-icons/hardware/keyboard-arrow-up';
class HeaderProject extends Component {
  constructor(props){
    super(props);
    this.state = {
      listUserCanAdd:this.props.listUserCanAdd,
      projectInfo:this.props.projectInfo,
      projectOwner:this.props.projectOwner,
      projectContact:this.props.projectInfo.project_contact,
      updated:false,
      showMore:false
    };
  }
  handleOpenShowMore = () => {
    this.setState({showMore:true});
  }
  handleUpdateData = () => {
    var that = this;
    var formData = new FormData();
    formData.append('token',InfoGen.token);
    formData.append('email',InfoGen.email);
    formData.append('project_sid',localStorage.getItem("project_sid"));
    get(Url.projectDetail, formData).then(function(res){

      that.setState({projectInfo:res.project_detail.project_detail});
      that.setState({projectContact:res.project_detail.project_detail.project_contact});
      location.reload();
    });
    if(that.state.updated){
      that.setState({updated:false});
    }else{
      that.setState({updated:true});
    }
  }
  render(){
    var columns;
    var styles;
    var cellHeight;
    var projectHeader;
    var contractUser = <ContactUser onUpdateData={this.handleUpdateData} projectInfo={this.state.projectInfo} projectContact={this.state.projectInfo.project_contact} />;
    var cellHeight;
    if(this.state.showMore){
      cellHeight = "auto";
    }else{
      cellHeight = 80;
    }
    var showMore;
    if(this.state.showMore){
      showMore = <HardwareKeyboardArrowUp />
    }else{
      showMore = <HardwareKeyboardArrowDown />
    }
    if(window.innerWidth<376){
      columns = 1;
      styles = {
        header: {
          margin:'0px 10px'
        },
        card: {
          'padding': '8px',
          'border': '1px solid rgb(217, 217, 217)',
          'background': '#fafbfc',
          'borderRadius': '3px'
        },
        root: {
           display: 'initial'
         },
         gridList: {
           width: '100%',
           height: 'initial',
          //  overflowY: 'auto',
         },
         box: {
           textAlign: 'left'
         },
         oneColumnStyle: {
           height:cellHeight,
           overflowY: 'auto'
         }
      }
      projectHeader =
        <div style={styles.oneColumnStyle}>
            <div style={{float:'right'}}>
              <span onTouchTap={()=>{this.setState({showMore:!this.state.showMore}) }}><small>{showMore}</small></span></div>
            <div>
              <div>
                <div><span >{this.state.projectInfo.name}</span></div>
                <div><small style={{color:lightBlack}} >{this.state.projectInfo.contract_no}</small></div>
                <div><span >{this.state.projectInfo.end_user}</span></div>
                <div><small style={{color:lightBlack}} >{this.state.projectInfo.end_user_address}</small></div>

                <div ><small style={{color:grey400}} >Create {this.state.projectInfo.create_datetime_df}</small></div>
              </div>
              <div>
                  <div><ProjectOwner projectInfo={this.state.projectInfo} listUserCanAdd={this.props.listUserCanAdd} projectOwner={this.state.projectOwner} /></div>
               </div>
               <div style={{textAlign:'left',clear:'both'}}>
                  {contractUser}
               </div>
            </div>
        </div>;
    }else{
      columns = 3;
      styles = {
        header: {
          margin:'0px 10px'
        },
        card: {
          // 'padding': '8px',
          'border': '1px solid rgb(217, 217, 217)',
          'background': '#fafbfc',
          'borderRadius': '3px'
        },
        root: {
          //  display: 'flex',
          //  flexWrap: 'wrap',
          //  justifyContent: 'space-around',
         },
         gridList: {
           width: '100%',
          //  height: 'initial',
          // height:' auto',
          //  overflowY: 'auto',
         },
         box: {
           textAlign: 'center'
         }
      }
      projectHeader =
        <div style={styles.root}>
          <Card>
            <CardText expandable={false} style={{overflow:'hidden'}}>
            <div style={{float:'right','marginTop':'-10px'}}>
              <span onTouchTap={()=>{this.setState({showMore:!this.state.showMore}) }}><small>{showMore}</small></span>
            </div>
              <GridList cellHeight={cellHeight}  cols={columns} style={styles.gridList} >
                  <div >
                    <div><span >{this.state.projectInfo.name}</span></div>

                    <div><small style={{color:lightBlack}} >{this.state.projectInfo.contract_no}</small></div>
                    <div><span >{this.state.projectInfo.end_user}</span></div>
                    <div><small style={{color:lightBlack}} >{this.state.projectInfo.end_user_address}</small></div>

                    <div ><small style={{color:grey400}} >Create {this.state.projectInfo.create_datetime_df}</small></div>
                  </div>
                  <div style={styles.box}>
                      <div><ProjectOwner onShowMore={this.handleOpenShowMore} projectInfo={this.state.projectInfo} listUserCanAdd={this.props.listUserCanAdd} projectOwner={this.state.projectOwner} /></div>
                   </div>
                   <div>
                      <div>{contractUser}</div>
                   </div>
              </GridList>

            </CardText>
          </Card>
        </div>
        ;
    }

    return(
      <div className="board-header" style={styles.header}>
        <div style={styles.card}>
          <div>
            {projectHeader}
            <div style={{display:'none'}}>{this.state.updated}</div>
          </div>
        </div>
      </div>
    )
  }
}

export default HeaderProject;
