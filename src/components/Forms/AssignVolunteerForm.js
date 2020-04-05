/*!

=========================================================
* Argon Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
/*eslint-disable*/
import React from "react";
// nodejs library to set properties for components
// reactstrap components
import {Button, Form} from "reactstrap";
import FormGroupTemplate from "./FormGroupTemplate";
import config from "../../config/config";
import {makeApiCall} from "../../utils/utils";
import PropTypes from "prop-types";
import haversine from 'haversine-distance';

const defaultData = {
  volunteer_id: '',
  request_id: '',
  matched_by: ''
};

const kmRadius = 1;

class AssignVolunteerForm extends React.Component {
  constructor(props) {
    super(props);
    const {requestData, volunteerList} = props;
    const volunteerLists = volunteerList
    .filter(v => v.status === 1)
    .reduce((result, v) => {
      const haversineDistance = haversine({lat: requestData.latitude, lng: requestData.longitude},
          {lat: v.latitude, lng: v.longitude});
      result[haversineDistance < kmRadius * 1000 ? 0 : 1].push(v);
      return result;
    }, [[], []]);
    const volunteerOptions = volunteerLists.map(list => {
      return list.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
      .map(v => {
        return {value: v.v_id, label: v.name + ' (' + v.mob_number + ')'}
      })
    });
    this.state = {data: defaultData, isSubmitClicked: false, volunteerOptions: volunteerOptions};
  }

  updateData = (event, field) => {
    const {data} = this.state;
    data[field] = event.target.value;
    this.setState({data: data, isSubmitClicked: false});
  };

  isSubmitDisabled() {
    const {data, isSubmitClicked} = this.state;
    return isSubmitClicked || !data.volunteer_id;
  }

  submitData = (event) => {
    event.preventDefault();
    if (this.isSubmitDisabled()) {
      return;
    }
    this.setState({isSubmitClicked: true});
    const {data} = this.state;
    const {requestData} = this.props;
    data.request_id = requestData.r_id;
    data.matched_by = localStorage.getItem(config.userIdStorageKey);
    makeApiCall(config.assignEndpoint, 'POST', data);
  };

  render() {
    const {data, volunteerOptions} = this.state;
    const {requestData} = this.props;
    return (
        <Form role="form" onSubmit={this.submitData}>
          <FormGroupTemplate iconClass="fas fa-user" placeholder="Requester Name"
                             defaultValue={requestData.name} disabled/>
          <FormGroupTemplate iconClass="fas fa-hands-helping"
                             placeholder="Volunteer"
                             type="select"
                             optionGroupsArray={[
                               {
                                 label: 'Within ' + kmRadius + ' km',
                                 optionList: volunteerOptions[0]
                               },
                               {
                                 label: 'More than ' + kmRadius + ' km',
                                 optionList: volunteerOptions[1]
                               }]}
                             value={data.volunteer_id}
                             onChange={e => this.updateData(e, 'volunteer_id')}/>

          <div className="text-center">
            <Button className="mt-4" color="primary" type="submit"
                    disabled={this.isSubmitDisabled()}>
              Assign
            </Button>
          </div>
        </Form>
    )
        ;
  }
}

AssignVolunteerForm.defaultProps = {
  requestData: null,
  volunteerList: []
};

AssignVolunteerForm.propTypes = {
  requestData: PropTypes.object,
  volunteerList: PropTypes.array
};

export default AssignVolunteerForm;