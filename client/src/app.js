import { useState } from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import './app.css';
import closeButton from './assets/images/close-button.png';
import Home from './views/home';
import SingleClap from './views/single-clap';
import DoubleClap from './views/double-clap';
import Actions from './views/actions';

export default function App() {
  const [name, setName] = useState('');

  function onNameChanged(value) {
    setName(value);
  }

  return (
    <BrowserRouter>
      <div className="container">
        <Switch>
          <Route path='/actions'>
            <Link to='/'>
              <img className="close-button__image" src={closeButton} alt="Close button" />
            </Link>
            <Actions name={name} />
          </Route>
          <Route path='/setup_2'>
            <Link to='/'>
              <img className="close-button__image" src={closeButton} alt="Close button" />
            </Link>
            <DoubleClap name={name} />
          </Route>
          <Route path='/setup_1'>
            <Link to='/'>
              <img className="close-button__image" src={closeButton} alt="Close button" />
            </Link>
            <SingleClap name={name} />
          </Route>
          <Route exact path='/'>
            <Home onNameChanged={onNameChanged}/>
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}
