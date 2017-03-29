import React, { Component } from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import FlatButton from 'material-ui/FlatButton';
class HeaderProject extends Component {
  constructor(props){
    super(props);
    this.state = {...props};
  }
  render(){
    const styles = {
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

    var contact_user;
    if(this.state.projectInfo){
      
    }
    return(
      <div className="board-header" style={styles.header}>
        <div style={styles.card}>
          <div style={styles.root}>
            <GridList
              cols={3}
              cellHeight={90}
              style={styles.gridList}
            >
                <div >
                  <div>
                      <span >{this.props.projectInfo.contract_no}</span>
                  </div>
                  <div>
                        <span >{this.props.projectInfo.end_user}</span>
                  </div>
                  <div>
                        <span >{this.props.projectInfo.end_user_address}</span>
                   </div>
                   <div >
                         <small className>{this.props.projectInfo.create_datetime_df}</small>
                  </div>
              </div>

                <div style={styles.box}>
                    <div>
                          <span >{this.props.projectInfo.name}</span>
                    </div>

                 </div>

                 <div style={{textAlign:'right'}}>
                    <div>Contact User <span> {contact_user}</span></div>
                 </div>
            </GridList>
          </div>
        </div>
      </div>
    )
  }
}

export default HeaderProject;
