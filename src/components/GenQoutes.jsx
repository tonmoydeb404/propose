import React from 'react';
import { Card } from 'react-bootstrap';

const GenQoutes = ({ className = '', texts = [] }) => (
    <div className={`qoutes ${className}`}>
        {texts.length
            ? texts.map((item) => (
                  <Card
                      body
                      key={item.id}
                      bg={item.id === 'finished' ? 'danger' : 'default'}
                      text={item.id === 'finished' ? 'light' : 'dark'}
                      className={`qoutes_card animIn ${item.id === 'finished' ? 'last' : ''}`}
                  >
                      <p className={`card-text mb-0 `}>{item.text}</p>
                  </Card>
              ))
            : ''}
    </div>
);

export default GenQoutes;
