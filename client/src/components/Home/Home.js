import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Write from '../Write/Write';
import MemoList from '../MemoList/MemoList';
import './style.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingState: false
    };
  }
  componentDidMount = () => {
    const loadUntilScrollable = () => {
      // if ($('body').height() < $(window).height()) {
      //   this.loadOldMemo().then(() => {
      //     if (!this.props.isLast) {
      //       loadUntilScrollable();
      //     }
      //   })
      // }
    }
    const loadMemoLoop = () => {
      this.loadNewMemo().then(() => {
        this.memoLoaderTimeoutId = setTimeout(loadMemoLoop, 5000);
      })
    }
    this.props.memoListRequest(true).then(() => {
      loadUntilScrollable();
      loadMemoLoop();
    })
    // $(window).scroll(() => {
    //   // WHEN HEIGHT UNDER SCROLLBOTTOM IS LESS THEN 250
    //   if ($(document).height() - $(window).height() - $(window).scrollTop() < 250) {
    //       if (!this.state.loadingState) {
    //         this.loadOldMemo();
    //         this.setState({
    //           loadingState: true
    //         });
    //       } else {
    //         if (this.state.loadingState) {
    //           this.setState({
    //             loadingState: false
    //           })
    //         }
    //       }
    //   }
    // });
  }
  componentWillUnmount = () => {
    clearTimeout(this.memoLoaderTimeoutId);
  }
  loadNewMemo = () => {
    // cancel if there is a pending request
    if (this.props.listStatus === 'WAITING') {
      return new Promise((resolve, reject) => {
        resolve();
      })
    }

    // if page is empty, do the initial loading
    if (this.props.memoData.length === 0) {
      return this.props.memoListRequest(true);
    }
    return this.props.memoListRequest(false, 'new', this.props.memoData[0]._id);
  }
  loadOldMemo = () => {
    if (this.props.isLast) {
      return new Promise((resolve, reject) => {
        resolve();
      });
    }
    let lastId = this.props.memoData[this.props.memoData.length - 1]._id;
    return this.props.memoListRequest(false, 'old', lastId).then(() => {
      if (this.props.isLast) {
        // Materialize.toast('You are reading the last page', 2000);
      }
    });
  }
  handleEdit = (id, index, contents) => {
      return this.props.memoEditRequest(id, index, contents).then(
        () => {
          if(this.props.editStatus.status==="SUCCESS") {
              // Materialize.toast('Success!', 2000);
          } else {
            /*
                ERROR CODES
                    1: INVALID ID,
                    2: EMPTY CONTENTS
                    3: NOT LOGGED IN
                    4: NO RESOURCE
                    5: PERMISSION FAILURE
            */
            let errorMessage = [
                'Something broke',
                'Please write soemthing',
                'You are not logged in',
                'That memo does not exist anymore',
                'You do not have permission'
            ];
            let error = this.props.editStatus.error;
            // NOTIFY ERROR
            // let $toastContent = $('<span style="color: #FFB4BA">' + errorMessage[error - 1] + '</span>');
            // Materialize.toast($toastContent, 2000);
            // IF NOT LOGGED IN, REFRESH THE PAGE AFTER 2 SECONDS
            if(error === 3) {
              setTimeout(()=> {location.reload(false)}, 2000);
            }
          }
        }
      );
    }
  handlePost = (contents) => {
    return this.props.memoPostRequest(contents).then(() => {
      if (this.props.postStatus === 'SUCCESS') {
        this.loadNewMemo().then(() => {
          // Materialize.toast('Success!', 2000);
        });
      } else {
        /*
          ERROR CODES
            1: NOT LOGGED IN
            2: EMPTY CONTENTS
        */
        // let $toastContent;
        switch (this.props.postStatus.error) {
          case 1:
            // $toastContent = $('<span style="color: #FFB4BA">You are not logged in</span>');
            // Materialize.toast($toastContent, 2000);
            // setTimeout(()=> {location.reload(false);}, 2000);
            break;
          case 2:
            // $toastContent = $('<span style="color: #FFB4BA">Please write something</span>');
            // Materialize.toast($toastContent, 2000);
            break;
          default:
            // $toastContent = $('<span style="color: #FFB4BA">Something Broke</span>');
            // Materialize.toast($toastContent, 2000);
            break;
        }
      }
    })
  }
  handleRemove = (id, index) => {
    this.props.memoRemoveRequest(id, index).then(() => {
      if(this.props.removeStatus.status==="SUCCESS") {
        // LOAD MORE MEMO IF THERE IS NO SCROLLBAR
        // 1 SECOND LATER. (ANIMATION TAKES 1SEC)
        // setTimeout(() => {
        //   if($("body").height() < $(window).height()) {
        //       this.loadOldMemo();
        //   }
        // }, 1000);
      } else {
        // ERROR
        /*
            DELETE MEMO: DELETE /api/memo/:id
            ERROR CODES
                1: INVALID ID
                2: NOT LOGGED IN
                3: NO RESOURCE
                4: PERMISSION FAILURE
        */
        let errorMessage = [
            'Something broke',
            'You are not logged in',
            'That memo does not exist',
            'You do not have permission'
        ];
         // NOTIFY ERROR
        // let $toastContent = $('<span style="color: #FFB4BA">' + errorMessage[this.props.removeStatus.error - 1] + '</span>');
        // Materialize.toast($toastContent, 2000);


        // IF NOT LOGGED IN, REFRESH THE PAGE
        if(this.props.removeStatus.error === 2) {
          setTimeout(()=> {location.reload(false)}, 2000);
        }
      }
    });
  }
  handleStar = (id, index) => {
    this.props.memoStarRequest(id, index).then(
      () => {
        if(this.props.starStatus.status !== 'SUCCESS') {
          /*
              TOGGLES STAR OF MEMO: POST /api/memo/star/:id
              ERROR CODES
                  1: INVALID ID
                  2: NOT LOGGED IN
                  3: NO RESOURCE
          */
          let errorMessage= [
              'Something broke',
              'You are not logged in',
              'That memo does not exist'
          ];
          // NOTIFY ERROR
          // let $toastContent = $('<span style="color: #FFB4BA">' + errorMessage[this.props.starStatus.error - 1] + '</span>');
          // Materialize.toast($toastContent, 2000);
          // IF NOT LOGGED IN, REFRESH THE PAGE
          if(this.props.starStatus.error === 2) {
              setTimeout(()=> {location.reload(false)}, 2000);
          }
        }
      }
    );
  }
  render() {
    return (
      <div className="wrapper">
        { this.props.isLoggedIn ? <Write onPost={this.handlePost} /> : undefined }
        <MemoList
          data={this.props.memoData}
          currentUser={this.props.currentUser}
          onEdit={this.handleEdit}
          onRemove={this.handleRemove}
          onStar={this.handleStar}
        />
      </div>
    );
  }
}
Home.defaultProps = {

};

Home.propTypes = {

};
export default Home;