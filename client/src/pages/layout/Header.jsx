import React, { useContext,useState } from 'react';
import { Container, Navbar ,NavDropdown,Modal,Button} from 'react-bootstrap';
import { UserContext } from '../../context/UserContext';
import { PostRequestWithHeader } from '../../functions/Axios';
const Header = () => {
    const {UserData, setUserData} = useContext(UserContext);
    const [modalShow, setModalShow] = useState(false);


    return (
        <div>
            <Navbar fixed className="bg-body-tertiary">
            <Container fluid>
                <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        Signed in as: <a onClick={() => setModalShow(true)}  href="#">{UserData.email}</a>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
            </Navbar>

            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
     
        </div>
    );
}

export default Header;


function MyVerticallyCenteredModal(props) {
    const {UserData, setUserData} = useContext(UserContext);

        const handleLogout = async () => {

            if (confirm('Are you sure you want to Logout?')) {
                // Save it!
                const result = await PostRequestWithHeader('/logout','post','logout');
              } else {
                // Do nothing!
                console.log('Logout action canceled');
              }
          //  console.log(accessToken);
         
              //console.log(result);
        };
    
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            User Information
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>User Email: {UserData.email}</h5>
          <h5>User Type: {UserData.isAdmin ? 'Admin' : 'User'}</h5>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="danger" onClick={() => handleLogout()}>
                Log Out
            </Button>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }