import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import LinkModal from '../components/LinkModal';
import ProposeForm from '../components/ProposeForm';
import Image from '../static/images/hero.svg';

const Home = ({ className = '' }) => {
    const [modal, setModal] = useState(false);
    const [person, setPerson] = useState('');

    const getName = (text) => {
        setPerson(text);
        setModal(true);
    };

    return (
        <header className={`hero ${className}`}>
            <Container>
                <Row className="hero_content justify-content-between py-5">
                    <Col md={7} lg={6} className="hero_text-wrapper">
                        <div className="hero_text">
                            <h1 className="hero_text-title mb-2">
                                Afraid To <font className="text-danger">Propose</font> Someone?
                            </h1>
                            <p className="hero_text-description">
                                don’t worry I am here to help you. just go and propose her / him.
                                have a relax
                            </p>

                            <ProposeForm
                                className="hero_text-form mt-4 mt-md-5"
                                callBack={getName}
                            />
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

            <LinkModal person={person} show={modal} onHide={() => setModal(false)} />
        </header>
    );
};

export default Home;
