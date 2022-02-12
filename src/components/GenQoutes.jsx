import React, { useEffect, useRef } from 'react';
import { Card } from 'react-bootstrap';

const GenQoutes = ({ className = '', texts = [] }) => {
    const qouteRef = useRef(null);

    useEffect(() => {
        if (qouteRef && texts.length) {
            const postion = qouteRef.current.getBoundingClientRect();
            if (window.outerHeight < postion.bottom + 200) {
                window.scrollTo(0, postion.bottom + 200);
                console.log('first');
            }
            console.log('body', window.outerHeight);
            console.log('scroll', postion);
        }
    }, [qouteRef, texts]);

    return (
        <div className={`qoutes ${className}`} ref={qouteRef}>
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
};

export default GenQoutes;
