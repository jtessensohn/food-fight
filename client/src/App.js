import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router,  Route, Switch} from 'react-router-dom';
import {  Nav, Navbar,Form, FormControl,Button } from 'react-bootstrap';
import Home from './pages/Home';


function App() {
  return (
    <div className="App">
      <Router>
      <Navbar bg="primary" variant="dark">
    <Navbar.Brand href="#home">Navbar</Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link href="#home">Home</Nav.Link>
      <Nav.Link href="#features">Features</Nav.Link>
      <Nav.Link href="#pricing">Pricing</Nav.Link>
    </Nav>
    <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-light">Search</Button>
    </Form>
  </Navbar>
        <Switch>
          <Route path='/' exact>
            <Home />
          </Route>
          <Route path="/register">
          {/* <Register /> */}
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
