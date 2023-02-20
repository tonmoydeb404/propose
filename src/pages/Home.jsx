import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import ProposeForm from '../components/ProposeForm';
import Image from '../static/images/hero.svg';

const Home = ({ className = '' }) => (
    <header className={`hero ${className}`}>
        <Container>
            <Row className="hero_content justify-content-between py-5">
                <Col md={7} lg={6} className="hero_text-wrapper">
                    <div className="hero_text">
                        <h1 className="hero_text-title mb-2">
                            Afraid To <font className="text-danger">Propose</font> Someone?
                        </h1>
                        <p className="hero_text-description">
                            don’t worry I am here to help you. enter your valentines name and generate a propose link.
                        </p>

                        <ProposeForm className="hero_text-form mt-4 mt-md-5" />
                        <p className="hero_credit">
                            developed by{' '}
                            <a
                                href="https://tonmoydeb.com"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                @tonmoydeb
                            </a>
                        </p>
                    </div>
                </Col>
                <Col md={5} className="hero_media-wrapper">
                    <div className="hero_media">
                        <img
                            src={Image}
                            alt="Afraid To Propose Someone?"
                            className="hero_media-img img-fluid"
                        />
                    </div>
                </Col>
            </Row>
        </Container>
    </header>
);

export default Home;
