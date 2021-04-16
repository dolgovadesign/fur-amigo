import { useState } from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import './app.css';
import closeButton from './assets/images/close-button.png';
import HomeView from './views/home';
import SingleClapView from './views/single-clap';
import DoubleClapView from './views/double-clap';
import ActionsView from './views/actions';
import DogBreedsView from './views/dog-breeds';
import BreedView from './views/breed';

export default function App() {
  const [name, setName] = useState('');

  function onNameChanged(value) {
    setName(value);
  }

  return (
    <BrowserRouter>
      <div className="container">
        <Switch>
          <Route path='/breed/:id'>
            <Link to='/'>
              <img className="close-button__image" src={closeButton} alt="Close button" />
            </Link>
            <BreedView name={name} />
          </Route>
          <Route path='/dog-breeds'>
            <Link to='/'>
              <img className="close-button__image" src={closeButton} alt="Close button" />
            </Link>
            <DogBreedsView name={name} />
          </Route>
          <Route path='/actions'>
            <Link to='/'>
              <img className="close-button__image" src={closeButton} alt="Close button" />
            </Link>
            <ActionsView name={name} />
          </Route>
          <Route path='/setup_2'>
            <Link to='/'>
              <img className="close-button__image" src={closeButton} alt="Close button" />
            </Link>
            <DoubleClapView name={name} />
          </Route>
          <Route path='/setup_1'>
            <Link to='/'>
              <img className="close-button__image" src={closeButton} alt="Close button" />
            </Link>
            <SingleClapView name={name} />
          </Route>
          <Route exact path='/'>
            <HomeView onNameChanged={onNameChanged}/>
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}
