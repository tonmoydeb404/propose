import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import GenQoutes from '../components/GenQoutes';
import { images } from '../data/preload-image-list.json';
import { propose, qoutes } from '../data/quotes.json';
import { genRandom } from '../utills';

const Proposal = ({ className = '' }) => {
    const { id } = useParams();
    const person = id.split('-').join(' ');

    const [texts, setTexts] = useState([]);
    const [currentText, setCurrentText] = useState({
        image: '/images/image-05.webp',
        subtext: 'I want to tell you something',
    });

    // add quotes
    const addQoutes = () => {
        const qoute = texts.length >= qoutes.length ? propose : genRandom(qoutes, texts);
        setCurrentText((prevData) => ({ ...prevData, ...qoute }));
        setTexts((prevData) => [...prevData, qoute]);
    };

    // handle click
    const handleClick = (e) => {
        const button = e.target;
        // remove previous shaking effect
        button.classList.remove('shake');
        // add quote
        addQoutes();
        // add shaking effect
        button.classList.add('shake');
        // remove shaking effect
        setTimeout(() => {
            button.classList.remove('shake');
        }, 1000);
    };

    // effects
    useEffect(() => {
        document.title = `${person} - Be My Valentine`;
    }, [person]);

    // preload images
    useEffect(() => {
        images.forEach((image) => {
            const img = new Image();
            img.src = image;
        });
    }, []);

    return (
        <div
            className={`proposal ${className}`}
            style={{
                '--image': `url(${currentText.image})`,
            }}
        >
            <div className="proposal_media bg-dark d-none d-md-block" />
            <Container>
                <Row>
                    <Col md={6} className="ms-auto">
                        <div className="proposal_content py-5">
                            <div className="proposal_header">
                                <h1 className="proposal_title h4">
                                    Hey <b>{person}</b>
                                </h1>
                                <p className="propsal_subtitle">{currentText.subtext}</p>
                            </div>

                            <GenQoutes texts={texts} className="main-content" />

                            {currentText.id !== 'finished' ? (
                                <Button variant="danger" onClick={handleClick}>
                                    {texts.length ? 'Next' : 'Continue'}
                                </Button>
                            ) : (
                                ''
                            )}
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Proposal;
