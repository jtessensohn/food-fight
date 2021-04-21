import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router,  Route, Switch} from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import SignIn from './pages/SignIn'
import Myteam from './pages/Myteam';


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path='/' exact>
            <Home />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/signIn">
            <SignIn />
          </Route>
          <Route>
            <Myteam />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
