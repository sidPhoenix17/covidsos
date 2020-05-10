import React from 'react';
import { Container, Card, CardHeader, Row, Col, Button }  from "reactstrap";
import {WhatsappIcon, WhatsappShareButton} from 'react-share';

const FAQ = () => (
    <Container className="faq-container" style={{ height: '55vh'}}>
        <Card>
            <CardHeader className="bg-transparent pb-3">
                <div className="text-uppercase text-muted text-center mt-2 mb-2">
                  Frequently Asked Questions
                </div>
              </CardHeader>
            <div  >
                <iframe 
                    title="FAQ document"
                    style={{ width: '100%', height: '55vh'}}
                    src="https://docs.google.com/document/d/162D6YrrjibmEIl-gn8Bue1ADRyoe-0gsB7TllnNYTcE/edit">
                </iframe>
            </div>
            </Card>
            <Row className="mt-2">
                <Col style={{ paddingLeft: '20px'}}>
                Still unsatisfied ?</Col>
            </Row>
            <Row className="mt-2">
                <Col style={{textAlign: 'center'}}>
                
                <Button color="primary" style={{ width: '100%'}}>
                <a href={'https://tinyurl.com/covidsos'} target="_blank" style={{ color: 'white'}}
                    rel="noopener noreferrer">
                        Whatsapp Us
                    <WhatsappIcon size={32} round/>
                </a>
                </Button>
                </Col>
            </Row>
    </Container>
   
);

export default FAQ;