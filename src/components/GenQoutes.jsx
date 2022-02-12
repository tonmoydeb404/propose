import React, { useEffect, useRef } from 'react';
import { Card } from 'react-bootstrap';

const GenQoutes = ({ className = '', texts = [] }) => {
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef && texts.length) {
            const postion = scrollRef.current.getBoundingClientRect();
            if (window.outerHeight < postion.bottom + 50) {
                scrollRef.current.scrollIntoView({ behavior: 'smooth' });
            }
            // console.log('body', window.innerHeight);
            // console.log('scroll', postion);
        }
    }, [scrollRef, texts]);

    return (
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

            <div className="dummyscroll" style={{ float: 'left', clear: 'both' }} ref={scrollRef} />
        </div>
    );
};

export default GenQoutes;
