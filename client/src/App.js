import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router,  Route, Switch} from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Myteam from './pages/Myteam';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { setUser } from './redux/actions';



function App() {
  const dispatch = useDispatch();
  const [ userStatus, setUserStatus ] = useState('LOADING');

  useEffect(() => {
    fetch('/api/v1/users/current')
      .then(res => res.json())
      .then(data => {
        if (!data.error) {
          dispatch(setUser(data))
        }
        setUserStatus('CHECKED')
      })
  }, [dispatch])

  return (
    <div className="App">
      <Router>
    
    { userStatus === 'LOADING' && (
      'Loading...'
    )}
    { userStatus === 'CHECKED' && (

      <Switch>
          <Route path='/' exact>
            <Home />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/myteam">
            <Myteam />
          </Route>
        </Switch>
        
    )}
      </Router>
    </div>
  );
}

export default App;
