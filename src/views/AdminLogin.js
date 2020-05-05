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
// reactstrap components
import {Card, CardBody, CardFooter, CardHeader, Col, Container, Row} from "reactstrap";
import Header from "../components/Headers/Header.js";
import AdminLoginForm from "../components/Forms/AdminLoginForm";
import {isLoggedIn} from "../utils/utils";

class AdminLogin extends React.Component {
  render() {
    return (
        <>
          <Header showCards={false}/>
          {/* Page content */}
          <Container className="mt--7" fluid>
            <Row className="justify-content-center">
              <Col lg="5" md="7">
                <Card className="bg-secondary shadow border-0">
                  <CardHeader className="bg-transparent pb-3">
                    <div className="text-uppercase text-muted text-center mt-2 mb-2">
                      Login
                    </div>
                  </CardHeader>
                  <CardBody className="px-lg-5 py-lg-5">
                    {isLoggedIn() ? 'You are already logged in!' : <AdminLoginForm/>}
                  </CardBody>
                  <CardFooter className="bg-transparent">
                    If you are an NGO, request for your organizational login by <a href="/contact-us">clicking here</a>.
                  </CardFooter>
                </Card>
              </Col>
            </Row>
          </Container>
        </>
    );
  }
}

export default AdminLogin;
