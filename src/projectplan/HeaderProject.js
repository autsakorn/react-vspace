import React, { Component } from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import FlatButton from 'material-ui/FlatButton';
import ContactUser from './ContactUser';
import ProjectOwner from './ProjectOwner';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';

class HeaderProject extends Component {
  constructor(props){
    super(props);
    this.state = {...props};
  }
  render(){

    var columns;
    var styles;
    var cellHeight;
    var projectHeader;
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
           overflowY: 'auto',
         },
         box: {
           textAlign: 'left'
         },
         oneColumnStyle: {
           height:90,
           overflowY: 'auto'
         }
      }
      projectHeader =
        <div style={styles.oneColumnStyle}>
            <div>
              <div><span >{this.props.projectInfo.name}</span></div>

              <div><small style={{color:lightBlack}} >{this.props.projectInfo.contract_no}</small></div>
              <div><span >{this.props.projectInfo.end_user}</span></div>
              <div><small style={{color:lightBlack}} >{this.props.projectInfo.end_user_address}</small></div>

              <div ><small style={{color:grey400}} >Create {this.props.projectInfo.create_datetime_df}</small></div>
            </div>
            <div>
                <div><ProjectOwner projectOwner={this.props.projectOwner} /></div>
             </div>
             <div style={{textAlign:'left',clear:'both'}}>
                <ContactUser projectInfo={this.props.projectInfo} projectContact={this.props.projectInfo.project_contact} />
             </div>
        </div>;
    }else{
      cellHeight = 90;
      columns = 3;
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
           display: 'flex',
           flexWrap: 'wrap',
           justifyContent: 'space-around',
         },
         gridList: {
           width: '100%',
           height: 90,
           overflowY: 'auto',
         },
         box: {
           textAlign: 'center'
         }
      }

      projectHeader =
        <div style={styles.root}>
          <GridList cellHeight={cellHeight} cols={columns} style={styles.gridList}>
              <div >
                <div><span >{this.props.projectInfo.name}</span></div>

                <div><small style={{color:lightBlack}} >{this.props.projectInfo.contract_no}</small></div>
                <div><span >{this.props.projectInfo.end_user}</span></div>
                <div><small style={{color:lightBlack}} >{this.props.projectInfo.end_user_address}</small></div>

                <div ><small style={{color:grey400}} >Create {this.props.projectInfo.create_datetime_df}</small></div>
              </div>
              <div style={styles.box}>
                  <div><ProjectOwner projectOwner={this.props.projectOwner} /></div>
               </div>
               <div>
                  <div><ContactUser projectInfo={this.props.projectInfo} projectContact={this.props.projectInfo.project_contact} /></div>
               </div>
          </GridList>
        </div>
        ;
    }

    return(
      <div className="board-header" style={styles.header}>
        <div style={styles.card}>
          <div>
            {projectHeader}
          </div>
        </div>
      </div>
    )
  }
}

export default HeaderProject;
