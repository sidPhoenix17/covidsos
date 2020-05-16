import React, {Component} from 'react';
import {Button, Card, CardHeader, Col, Container, Row} from "reactstrap";
import {WhatsappIcon} from 'react-share';
import Header from "../../components/Headers/Header";

export default class FAQ extends Component {

  constructor(props) {
    super(props);
    this.state = {html: 'Loading...'}
  }

  componentDidMount() {
    fetch(
        "https://docs.google.com/document/d/e/2PACX-1vRlrh9Osh7KikB_T2Mqm0TqbbECR6gpoNHtVXeMi1epFEkrxXJ6Zkp0yX2mRo2zXs1bYYEdWbr82f_C/pub?embedded=true", {
          method: 'GET',
          mode: 'cors'
        })
    .then(response => {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response.text();
    })
    .then(data => {
      this.setState({html: data});
    });
  }

  render() {
    return (
        <>
          <Header showCards={false}/>
          {/* Page content */}
          <Container className="mt--7" fluid>
            <Card>
              <CardHeader className="bg-transparent pb-3">
                <div className="text-uppercase text-muted text-center mt-2 mb-2">
                  Frequently Asked Questions
                </div>
              </CardHeader>
              {/*<div style={{height: '60vh'}}>*/}
              {/*  <iframe*/}
              {/*      title="FAQ document"*/}
              {/*      width="100%"*/}
              {/*      height="100%"*/}
              {/*      src="https://docs.google.com/document/d/e/2PACX-1vRlrh9Osh7KikB_T2Mqm0TqbbECR6gpoNHtVXeMi1epFEkrxXJ6Zkp0yX2mRo2zXs1bYYEdWbr82f_C/pub?embedded=true"/>*/}
              {/*</div>*/}
              <div className="faq-container" dangerouslySetInnerHTML={{__html:this.state.html}}/>
            </Card>
            <Row className="mt-2">
              <Col style={{paddingLeft: '20px'}}>
                Still unsatisfied ?</Col>
            </Row>
            <Row className="mt-2">
              <Col style={{textAlign: 'center'}}>
                <Button color="primary" style={{width: '100%'}}>
                  <a href={'https://tinyurl.com/covidsos'} target="_blank" style={{color: 'white'}}
                     rel="noopener noreferrer">
                    Whatsapp Us
                    <WhatsappIcon size={32} round/>
                  </a>
                </Button>
              </Col>
            </Row>
          </Container>
        </>
    );
  }
}