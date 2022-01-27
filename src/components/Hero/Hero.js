import React from 'react';
import './Hero.css';
import { Card, Container } from 'react-bootstrap';
import banking from '../../assets/banking.jpg';

const Hero = () => {
  return (
    <section className="hero-section">
      <Container>
        <Card>
          <Card.Body>
            <Card.Title>Welcome To the Bad Bank</Card.Title>
            <Card.Text>
              For all the banking needs, we have you covered.
            </Card.Text>
          </Card.Body>
          <Card.Img src={banking} />
        </Card>
      </Container>
    </section>
  );
};

export default Hero;
