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

class AssignManagerForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        data: {
            managed_by_id: props.existingData.managed_by_id
        },
        managerList: [],
        isSubmitClicked: false,
    };
  }

  componentDidMount(){
    makeApiCall(config.getUserList, 'GET', {}, (response) => {
        this.setState({
            managerList: response
        })
    }, false);

  }

  updateData = (event, field) => {
    const {data} = this.state;
    data[field] = event.target.value;
    this.setState({data: data, isSubmitClicked: false});
  };

  isSubmitDisabled() {
    const {data, isSubmitClicked} = this.state;
    return isSubmitClicked || !data.managed_by_id;
  }

  submitData = (event) => {
    event.preventDefault();
    const {existingData: { uuid }} = this.props;

    if (this.isSubmitDisabled()) {
      return;
    }
    this.setState({isSubmitClicked: true});
    const {data} = this.state;

    makeApiCall(config.addRequestManager, 'POST', {request_uuid: uuid, user_id: data.managed_by_id }, (response) => {
        this.props.afterAssign();
      }, true);
  };

  render() {
    const { data, managerList } = this.state;
    const {existingData} = this.props;

    return (
        <Form role="form" onSubmit={this.submitData}>
          <FormGroupTemplate iconClass="fas fa-user" placeholder="Requester Name"
                             defaultValue={existingData.name} disabled/>
          <FormGroupTemplate iconClass="fas fa-hands-helping"
                             placeholder="Manager"
                             type="select"
                             optionsArray={managerList.map(({id, name }) => ({ label: name, value: id }))}
                             value={data.managed_by_id}
                             onChange={e => this.updateData(e, 'managed_by_id')}/>

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

AssignManagerForm.defaultProps = {
  requestData: null,
  afterAssign: () => {}
};

AssignManagerForm.propTypes = {
  requestData: PropTypes.object,
  afterAssign: PropTypes.func
};

export default AssignManagerForm;