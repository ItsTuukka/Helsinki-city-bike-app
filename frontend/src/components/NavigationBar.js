import React from 'react'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

const NavigationBar = () => {
  return (
    <Navbar bg="primary" variant="dark">
      <Container>
        <Nav className="me-auto">
          <Nav.Link href="/" id="home">
            Home
          </Nav.Link>
          <Nav.Link href="/stations" id="stations">
            Stations
          </Nav.Link>
          <Nav.Link href="/journeys" id="journeys">
            Journeys
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  )
}

export default NavigationBar
