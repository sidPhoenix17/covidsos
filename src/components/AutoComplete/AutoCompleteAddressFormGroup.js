import React from "react";
import {CardText, FormGroup, InputGroup, InputGroupAddon, InputGroupText} from "reactstrap";
import AutoCompleteAddress from "./Adress";
import classnames from "classnames";

export default class AutoCompleteAddressFormGroup extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isSelected: false
    }
  }

  render() {
    const {iconClass, placeholder, ...props} = this.props;
    const {isSelected} = this.state;
    return (
        <FormGroup className={classnames({'has-danger': !isSelected})}>
          <CardText className="text-gray text-custom-small mb-0">
            {placeholder}
          </CardText>
          <InputGroup className="input-group-alternative mb-3"
                      style={{border: isSelected ? '0' : '1px solid red'}}>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                <i className={iconClass + (isSelected ? '' : ' text-red')}/>
              </InputGroupText>
            </InputGroupAddon>
            <AutoCompleteAddress {...props}
                                 onSelect={({geoaddress, latitude, longitude, place_id}) => {
                                   this.setState({isSelected: true},
                                       () => this.props.onSelect(
                                           {geoaddress, latitude, longitude, place_id}))
                                 }}/>
          </InputGroup>
          <div className="address-select-warning" hidden={isSelected}>
            Please search and select from Google dropdown only
          </div>
        </FormGroup>
    )
  }
}