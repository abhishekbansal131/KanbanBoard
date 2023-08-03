import React, { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './Navbar.css'
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import {LogIn} from 'react-feather'

function ShowNavbar(props) {
    const [inputValue, setInputValue] = useState("");
    const history = useHistory();
    useEffect(() => {
        if (props.submit) props.submit(inputValue);
    })

    const LogOut = () => {
        history.push('/login');
        delete localStorage['userCredentials'];
    }


    return (
        <Navbar expand="lg" className="app_navbar">
            <Container fluid>
                <Navbar.Brand className="nav-heading">Kanban Board</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0 "
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                    </Nav>
                    <Form className="d-flex">
                        <Form.Control
                            type="search"
                            placeholder="Search Card"
                            className="me-2"
                            aria-label="Search"
                            value={inputValue}
                            onChange={(e) => { setInputValue(e.target.value); }}
                        />
                        <Nav.Link className="nav-links" onClick={LogOut}><LogIn></LogIn></Nav.Link>
                        
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default ShowNavbar;