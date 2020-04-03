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
import React from "react";
// react plugin used to create maps
import mapBoxGl from "mapbox-gl";
import {Card, CardBody, CardHeader, Nav, NavItem, NavLink, Row} from "reactstrap";
import classnames from "classnames";
import {makeApiCall} from "../../utils/utils";
import {config} from "../../config/config";
// reactstrap components
// core components

const volunteerDataSource = 'volunteerData';
const requestDataSource = 'requestData';

const volunteerLayerId = 'covid-volunteer';
const requestLayerId = 'covid-request';

class Map extends React.Component {
  constructor(props) {
    super(props);
    mapBoxGl.accessToken = 'pk.eyJ1IjoiY292aWQxOS1zb3MiLCJhIjoiY2s4YnF1dnZjMGR3czNscWYwNGRtbnU1aSJ9.Ju7HmRcG8xQkaI5WauDbJA';
    this.state = {
      activeNav: 0,
      map: null,
      volunteerData: {
        type: "FeatureCollection",
        features: []
      },
      requestData: {
        type: "FeatureCollection",
        features: []
      }
    };
  }

  toggleNavs = (e, index) => {
    this.setState({activeNav: index});
    e.preventDefault();
  };

  componentDidMount() {
    this.getData();
    this.initiateMap();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!prevState.map && this.state.map) {
      this.createSource(this.state.map);
      if (this.state.map.loaded()) {
        this.addMapLayers(this.state.map);
      }
      else {
        this.state.map.on("load", () => this.addMapLayers(this.state.map));
      }
    }
    const isMapLoaded = this.state.map && this.state.map.loaded();
    const wasMapPreviouslyNotLoaded = !prevState.map || !prevState.map.loaded();
    const dataChanged =
        (prevState.volunteerData.features.length !== this.state.volunteerData.features.length) ||
        (prevState.requestData.features.length !== this.state.requestData.features.length);
    if (isMapLoaded &&
        (wasMapPreviouslyNotLoaded || dataChanged)
    ) {
      // update source
      this.state.map
      .getSource(volunteerDataSource)
      .setData(this.state.volunteerData);
      this.state.map
      .getSource(requestDataSource)
      .setData(this.state.requestData);
    }
    if (prevState.activeNav !== this.state.activeNav) {
      this.setLayerVisibility();
    }
  }

  initiateMap() {
    const map = new mapBoxGl.Map({
      container: 'mapDiv',
      style: 'mapbox://styles/covid19-sos/ck8g9p2qz018x1iqjl1c47zub',
      center: [79.08886, 23.373778],
      zoom: 3.25,
      attributionControl: false,
      maxZoom: 13.5
    })
    .addControl(
        new mapBoxGl.NavigationControl({
          showCompass: true
        })
    )
    .addControl(new mapBoxGl.FullscreenControl())
    .addControl(
        new mapBoxGl.AttributionControl({
          compact: true
        })
    )
    .addControl(new mapBoxGl.ScaleControl())
    .addControl(new mapBoxGl.GeolocateControl());
    this.setState({map: map});
  }

  getData() {
    let url = config.mapEndpoint;
    let requestData = {};
    if (localStorage.getItem(config.userIdStorageKey)) {
      url = config.mapAuthEndpoint;
      requestData = {user_id: localStorage.getItem(config.userIdStorageKey)};
    }
    makeApiCall(url, 'POST',
        requestData,
        (response) => {
          const requestDataFeatures = response.Requests.map(req => {
            req.type = 'REQUEST';
            return {
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: [req.longitude, req.latitude]
              },
              properties: req
            };
          });
          const volunteerDataFeatures = response.Volunteers.map(vol => {
            vol.type = 'VOLUNTEER';
            return {
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: [vol.longitude, vol.latitude]
              },
              properties: vol
            };
          });
          this.setState({
            requestData: {
              type: "FeatureCollection",
              features: requestDataFeatures
            },
            volunteerData: {
              type: "FeatureCollection",
              features: volunteerDataFeatures
            }
          });
        }, false);
  }

  getDataSourceConfig(data, clusterProperties){
    return {
      type: 'geojson',
      data: data,
      cluster: true,
      clusterRadius: 20,
      clusterProperties
    };
  }

  createSource(map) {
    const clusterProperties = {
      type: ["coalesce", ["get", 'type']]
    };
    if (map.loaded()) {
      map.addSource(volunteerDataSource, this.getDataSourceConfig(this.state.volunteerData, clusterProperties));
      map.addSource(requestDataSource, this.getDataSourceConfig(this.state.requestData, clusterProperties));
    } else {
      map.on("load", () => {
        map.addSource(volunteerDataSource, this.getDataSourceConfig(this.state.volunteerData, clusterProperties));
        map.addSource(requestDataSource, this.getDataSourceConfig(this.state.requestData, clusterProperties));
      });
    }
  }

  addMapLayers(map) {
    this.addLayers(map, volunteerLayerId, volunteerDataSource, 'volunteer-hands', 'green');
    this.addLayers(map, requestLayerId, requestDataSource, 'old', 'red');
  }

  addLayers(map, layerId, dataSource, icon, circleColor) {

    map.addLayer({
      id: layerId,
      type: 'symbol',
      source: dataSource,
      layout: {
        'icon-image': icon,
        'icon-size': 0.07,
        'icon-allow-overlap': true
      },
      filter: ['!has', 'point_count']
    });

    const layerIdCluster = layerId + '-cluster';
    const layerIdClusterCount = layerIdCluster + '-count';

    map.addLayer({
      id: layerIdCluster,
      type: 'circle',
      source: dataSource,
      paint: {
        'circle-color': circleColor,
        'circle-radius': [
          'step',
          ['get', 'point_count'],
          10,
          100,
          20,
          750,
          30
        ],
        'circle-opacity' : 0.5
      },
      filter: ['has', 'point_count']
    });

    map.addLayer({
      id: layerIdClusterCount,
      type: 'symbol',
      source: dataSource,
      filter: ['has', 'point_count'],
      layout: {
        'text-field': '{point_count_abbreviated}',
        'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
        'text-size': 12
      }
    });

    map.on('click', layerIdCluster, function (e) {
      const features = map.queryRenderedFeatures(e.point, {
        layers: [layerIdCluster]
      });
      const clusterId = features[0].properties.cluster_id;
      map.getSource(dataSource).getClusterExpansionZoom(
          clusterId,
          function (err, zoom) {
            if (err) {
              return;
            }
            map.easeTo({
              center: features[0].geometry.coordinates,
              zoom: zoom
            });
          }
      );
    });
    map.on('mouseenter', layerIdCluster, e => {
      map.getCanvas().style.cursor = 'pointer';
      const features = map.queryRenderedFeatures(e.point, {
        layers: [layerIdCluster]
      });
      const coordinates = features[0].geometry.coordinates.slice();
      const { properties } = features[0];
      const descriptionHtml = '<strong>Type</strong>: ' + properties.type + '<br/><strong>Count</strong>:' + properties.point_count;

      // Ensure that if the map is zoomed out such that multiple
      // copies of the feature are visible, the popup appears
      // over the copy being pointed to.
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      // Populate the popup and set its coordinates
      popup
      .setLngLat(coordinates)
      .setHTML(descriptionHtml)
      .addTo(map);
    });
    map.on('mouseleave', layerIdCluster, function () {
      map.getCanvas().style.cursor = '';
      popup.remove();
    });


    const popup = new mapBoxGl.Popup({
      closeButton: true,
      closeOnClick: false
    });
    map.on("mouseenter", layerId, e => {
      // Change the cursor style as a UI indicator.
      map.getCanvas().style.cursor = "pointer";
      const features = map.queryRenderedFeatures(e.point, {
        layers: [layerId]
      });
      const coordinates = features[0].geometry.coordinates.slice();
      const { properties } = features[0];
      const descriptionHtml = '<strong>Name</strong>: ' + properties.name + '<br/><strong>Type</strong>: ' + properties.type;

      // Ensure that if the map is zoomed out such that multiple
      // copies of the feature are visible, the popup appears
      // over the copy being pointed to.
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      // Populate the popup and set its coordinates
      popup
      .setLngLat(coordinates)
      .setHTML(descriptionHtml)
      .addTo(map);
    });

    map.on("mouseleave", layerId, () => {
      map.getCanvas().style.cursor = "";
      popup.remove();
    });
  }

  setLayerVisibility() {
    const {activeNav, map} = this.state;
    map.getStyle().layers.forEach(function (layer) {
      if (layer.id.indexOf('covid') === -1) {
        return;
      }
      let visibility = 'none';
      if (activeNav === 0) {
        visibility = 'visible';
      }
      if (activeNav === 1 && layer.id.indexOf('volunteer') !== -1) {
        visibility = 'visible';
      }
      if (activeNav === 2 && layer.id.indexOf('request') !== -1) {
        visibility = 'visible';
      }
      map.setLayoutProperty(
          layer.id,
          'visibility',
          visibility
      );
    });
  }

  render() {
    return (
        <Card className="bg-gradient-default shadow">
          <CardHeader className="bg-transparent">
            <Row className="align-items-center">
              <div className="col">
                <h2 className="text-white mb-0">Overview</h2>
              </div>
              <div className="col">
                <Nav className="justify-content-end" pills>
                  <NavItem>
                    <NavLink
                        className={classnames("py-2 px-3", {
                          active: this.state.activeNav === 0
                        })}
                        href="#"
                        onClick={e => this.toggleNavs(e, 0)}
                    >
                      <span className="d-md-block">All</span>
                      {/*<span className="d-md-none">A</span>*/}
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                        className={classnames("py-md-2 px-md-3 py-1 px-2", {
                          active: this.state.activeNav === 1
                        })}
                        href="#"
                        onClick={e => this.toggleNavs(e, 1)}
                    >
                      <span className="d-none d-md-block">Volunteer</span>
                      <span className="d-md-none">
                        <img alt="V" src={require("assets/img/icons/volunteer-hands.svg")} style={{height:'1.8rem'}}/>
                      </span>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                        className={classnames("py-md-2 px-md-3 py-1 px-2", {
                          active: this.state.activeNav === 2
                        })}
                        data-toggle="tab"
                        href="#"
                        onClick={e => this.toggleNavs(e, 2)}
                    >
                      <span className="d-none d-md-block">Requests</span>
                      <span className="d-md-none">
                        <img alt="R" src={require("assets/img/icons/old.svg")} style={{height:'1.8rem'}}/>
                      </span>
                    </NavLink>
                  </NavItem>
                </Nav>
              </div>
            </Row>
          </CardHeader>
          <CardBody className="pre-scrollable">
            <div id="mapDiv"/>
            {/*<iframe src="http://www.thebangaloreguy.com/covid19/COVID_SOS_v0.html" title="map" height="300px"/>*/}
          </CardBody>
        </Card>
    );
  }
}

export default Map;
