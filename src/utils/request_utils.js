import Header from "../components/Headers/Header";
import {Card, CardBody, Col, Container, Row} from "reactstrap";
import AutoCompleteAddress from "../components/AutoComplete/Adress";
import haversine from "haversine-distance";
import React from "react";

export const renderRequests = (title, requests, updateSortedRequests, viewMapper) => {
  return (
      <>
        <Header showCards={false}/>
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row className="justify-content-center">
            <Col lg="8" md="8">
              <Card className="bg-secondary shadow border-0">
                <CardBody className="px-lg-3 py-lg-3 text-justify">
                  <div className="text-uppercase text-center mt-2 mb-2">
                    {title}
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
        <Container className={updateSortedRequests ? 'mt-5' : 'mt-7'} fluid>
          <Row className="justify-content-center" hidden={!updateSortedRequests}>
            <Col lg="8" md="8">
              <AutoCompleteAddress
                  iconClass="fas fa-map-marker"
                  placeholder="Enter your location to see requests nearby"
                  domID='pending-requests-search-address'
                  onSelect={({latitude, longitude}) => {
                    updateSortedRequests(requests.sort((r1, r2) => {
                      const r1HaversineDistance = haversine(
                          {lat: r1.latitude, lng: r1.longitude},
                          {lat: latitude, lng: longitude});
                      const r2HaversineDistance = haversine(
                          {lat: r2.latitude, lng: r2.longitude},
                          {lat: latitude, lng: longitude});
                      return r1HaversineDistance - r2HaversineDistance;
                    }));
                  }}
                  showError={false}
              />
            </Col>
          </Row>
          <Row className="mt-5">
            {requests && requests.length > 0 ? requests.map(viewMapper) : null}
          </Row>
        </Container>
      </>

  )
};