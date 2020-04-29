import React from "react";
import {Input} from "reactstrap";
import config from "../../config/config";
import classnames from "classnames";

export default class AutoCompleteAddress extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      query: '',
      isSelected: false
    }
  }

  componentDidMount() {
    const existingScript = document.getElementById('googleMaps');

    if (!existingScript) {
      const script = document.createElement('script');
      script.async = false;
      script.src = `https://maps.googleapis.com/maps/api/js?key=${config.googleMapAPIToken}&libraries=places`;
      script.id = 'googleMaps';
      document.body.appendChild(script);
    }

    this.initAPI();
  }

  initAPI = () => {

    if (!window.google) {
      setTimeout(() => {
        this.initAPI()
      }, 1000);
      return;
    }

    if (!window.google.maps) {
      setTimeout(() => {
        this.initAPI();
      }, 1000);
      return;
    }

    if (!window.google.maps.places) {
      setTimeout(() => {
        this.initAPI();
      }, 1000);
      return;
    }

    const {domID} = this.props;
    this.autocomplete = new window.google.maps.places.Autocomplete(
        document.getElementById(domID),
        {
          // types: ['geocode'],
          componentRestrictions: {country: 'in'}
        }
    );
    this.autocomplete.setFields(['address_component', 'geometry', 'place_id', 'name']);
    this.autocomplete.addListener('place_changed', this.handlePlaceSelect);
  }

  handlePlaceSelect = () => {
    const addressObject = this.autocomplete.getPlace();
    const addressComponents = addressObject.address_components;
    const geometry = addressObject.geometry;
    const geoaddress = (addressObject.name ? addressObject.name + ', ' : '') +
        addressComponents.map(({long_name}) => long_name).join(', ');
    const latitude = geometry.location.lat();
    const longitude = geometry.location.lng();
    const place_id = addressObject.place_id;

    this.setState({
      query: geoaddress,
      isSelected: true
    }, () => {
      this.props.onSelect({
        geoaddress,
        latitude,
        longitude,
        place_id
      });
    })
  }

  render() {
    const {placeholder, disabled, domID, showError} = this.props;
    const {query, isSelected} = this.state;

    return (
        <Input
            className={classnames({'is-invalid': showError && !isSelected})}
            type="text"
            name="address"
            id={domID}
            placeholder={placeholder}
            value={query}
            disabled={disabled}
            autoComplete="new-password"
            onChange={(event) => this.setState({query: event.target.value})}
        />
    )
  }
}