/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { Button, Form, InputGroup, Modal, OverlayTrigger, Tooltip } from 'react-bootstrap';

const Message = (props) => <Tooltip {...props}>copied</Tooltip>;

const LinkModal = ({ className = '', person = null, show = false, hide = () => {} }) => {
    const [proposeLink, setProposeLink] = useState(false);
    const [copied, setCopied] = useState(false);

    // generate the link
    useEffect(() => {
        if (!person || typeof person !== 'string' || !person.length) {
            setProposeLink(false);
        } else {
            const linkID = person.split(' ').join('-');
            const genLink = `${window.location.origin}/${linkID}`;

            setProposeLink(genLink);
        }
    }, [person]);

    // handle copy to to show the tooltip
    const handleCopy = () => {
        navigator.clipboard.writeText(proposeLink).then(
            () => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            },
            () => setCopied(false)
        );
    };

    return (
        <Modal
            className={className}
            onHide={() => {
                hide();
            }}
            show={show}
            backdrop="static"
            centered
        >
            <Modal.Header closeButton />
            <Modal.Body>
                <p>
                    now just copy the link and share with the person. don&apos;t shy and wish you
                    all the best.
                </p>

                <p className="text-muted small">
                    also you can take look from{' '}
                    <a href={proposeLink} target="_blank" rel="noreferrer" className="text-danger">
                        here
                    </a>{' '}
                    before sharing it
                </p>

                <InputGroup>
                    <Form.Control defaultValue={proposeLink || 'sorry there is an error'} />
                    <OverlayTrigger
                        trigger="click"
                        placement="left"
                        delay={{ show: 100, hide: 400 }}
                        overlay={Message}
                        show={copied}
                    >
                        <Button onClick={handleCopy}>copy</Button>
                    </OverlayTrigger>
                </InputGroup>
            </Modal.Body>
        </Modal>
    );
};

export default LinkModal;
