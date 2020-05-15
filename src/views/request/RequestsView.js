import React, {Component} from 'react';
import Header from "../../components/Headers/Header";
import RequestsContainer from "../../components/containers/RequestsContainer";
import {withRouter} from "react-router";

class RequestsView extends Component {

  render() {
    const {match: {params: {type}}} = this.props;

    return (
        <>
          <Header showCards={false}/>
          {/* Page content */}
          <RequestsContainer desiredType={type || 'pending'}/>
        </>
    )
  }
}

export default withRouter(RequestsView);