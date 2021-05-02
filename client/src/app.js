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
            <Link to='/dog_breeds'>
              <p className="back-button"><i class="fa fa-angle-double-left"></i>Back</p>
            </Link>
            <BreedView name={name} />
          </Route>
          <Route path='/dog_breeds'>
            <Link to='/'>
              <img className="close-button__image" src={closeButton} alt="Close button" />
            </Link>
            <Link to='/actions'>
              <p className="back-button"><i class="fa fa-angle-double-left"></i>Back</p>
            </Link>
            <DogBreedsView name={name} />
          </Route>
          <Route path='/actions'>
            <Link to='/'>
              <img className="close-button__image" src={closeButton} alt="Close button" />
            </Link>
            <Link to='/setup_1'>
              <p className="back-button"><i class="fa fa-angle-double-left"></i>Back</p>
            </Link>
            <ActionsView name={name} />
          </Route>
          <Route path='/setup_2'>
            <Link to='/'>
              <img className="close-button__image" src={closeButton} alt="Close button" />
            </Link>
            <Link to='/setup_1'>
              <p className="back-button"><i class="fa fa-angle-double-left"></i>Back</p>
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
