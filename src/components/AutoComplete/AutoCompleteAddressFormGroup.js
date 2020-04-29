import React from "react";
import {FormGroup, InputGroup, InputGroupAddon, InputGroupText} from "reactstrap";
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
    const {iconClass, ...props} = this.props;
    const {isSelected} = this.state;
    return (
        <FormGroup className={classnames({'has-danger': !isSelected})}>
          <InputGroup className="input-group-alternative mb-3" style={{border: isSelected ? '0' : '1px solid red'}}>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                <i className={iconClass + (isSelected ? '' : ' text-red')}/>
              </InputGroupText>
            </InputGroupAddon>
            <AutoCompleteAddress {...props} onSelect={({geoaddress, latitude, longitude, place_id}) => {
              this.setState({isSelected: true}, () => this.props.onSelect(geoaddress, latitude, longitude, place_id))
            }}/>
          </InputGroup>
          <div className="address-select-warning" hidden={isSelected}>
            Please search and select from dropdown
          </div>
        </FormGroup>
    )
  }
}