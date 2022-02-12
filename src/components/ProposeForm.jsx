import React, { useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';

const ProposeForm = ({ className = '', callBack = () => {} }) => {
    const [text, setText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        callBack(text);
    };

    return (
        <form className={`form_btn ${className}`} onSubmit={handleSubmit}>
            <InputGroup className="form_wrapper">
                <Form.Control
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="form_field"
                    placeholder="her/his name"
                />
                <Button className="form_btn" variant="danger" type="submit">
                    Propose Now
                </Button>
            </InputGroup>
        </form>
    );
};

export default ProposeForm;
