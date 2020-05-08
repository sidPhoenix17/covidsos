import Header from "../components/Headers/Header";
import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  CardTitle,
} from "reactstrap";
import AutoCompleteAddress from "../components/AutoComplete/Adress";
import haversine from "haversine-distance";
import React from "react";

export const renderRequests = (title, requests, updateSortedRequests, viewMapper, filterData = {}) => {
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
          <Row>
             <Form inline className="navbar-search d-inline-block col-sm-8 request-filters"
                    onSubmit={e => e.preventDefault()}>
                <FormGroup>
                {
                    filterData["city"] &&
                    <InputGroup className="input-group-alternative r-filter">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fas fa-filter"/>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="City"
                        type="select"
                        value={filterData['filters']["city"]}
                        onChange={e => {
                          let value = e.target.value;
                          filterData['filterBy']('city', value);
                        }}>
                        <option value="">City</option>
                        <option value="any">Any</option>
                        {
                          filterData["city"].map((city) => {
                            return (<option key={city} value={city}>{city}</option>);
                          })
                        }
                      </Input>
                    </InputGroup>
                  }
                  {
                    filterData["source"] &&
                    <InputGroup className="input-group-alternative r-filter">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fas fa-filter"/>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Source"
                        type="select"
                        value={filterData['filters']["source"]}
                        onChange={e => {
                          let value = e.target.value;
                          filterData['filterBy']('source', value);
                        }}>
                        <option value="">Source</option>
                        <option value="any">Any</option>
                        {
                          filterData["source"].map((source) => {
                            return (<option key={source} value={source}>{source}</option>);
                          })
                        }
                      </Input>
                    </InputGroup>
                  }
                  {
                        filterData["managed_by"] &&
                        <InputGroup className="input-group-alternative r-filter">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="fas fa-filter"/>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input placeholder="Managed By" type="select"
                                 value={filterData['filters']["managed_by_id"]}
                                 onChange={e => {
                                   let value = e.target.value;
                                   filterData['filterBy']('managed_by_id', value);
                                }}>
                            <option value="">Managed By</option>
                            <option value="any">Anyone</option>
                            {
                              filterData["managed_by"].map(({ managed_by, managed_by_id }) => {
                                return (<option key={managed_by_id} value={managed_by_id}>{managed_by}</option>);
                              })
                            }
                          </Input>
                        </InputGroup>
                  }
                </FormGroup>
              </Form>
          </Row>

          <Row className="mt-5">
            {requests && requests.length > 0 ? requests.map(viewMapper) : (
              <Card>
                <CardBody>
                  <CardTitle>No requests found.</CardTitle>
                </CardBody>
              </Card>
            )}
          </Row>
        </Container>
      </>

  )
};