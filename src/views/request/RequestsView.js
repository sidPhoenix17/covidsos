import React, {Component} from 'react';
import Header from "../../components/Headers/Header";
import RequestsContainer from "../../components/containers/RequestsContainer";
import {withRouter} from "react-router";
import {isAuthorisedUserLoggedIn} from "../../utils/utils";

class RequestsView extends Component {

  render() {
    const {match: {params: {type}}} = this.props;
    const desiredType = type || 'pending';
    if (!isAuthorisedUserLoggedIn() &&
        (['pending'].indexOf(desiredType.toLowerCase()) === -1)) {
      this.props.history.push("/pending-requests");
      return null;
    }

    return (
        <>
          <Header showCards={false}/>
          {/* Page content */}
          <RequestsContainer desiredType={desiredType}/>
        </>
    )
  }
}

export default withRouter(RequestsView);