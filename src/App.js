import './App.css';
import GamePage from './GamePage/GamePage';
import HomePage from './HomePage/HomePage';
import WaitingRoom from './WaitingRoom/WaitingRoom';
import { BrowserRouter as Router, Route, Switch, useHistory } from "react-router-dom";
import ScoreBoardPage from './ScoreBoardPage/ScoreBoardPage';
import { registerListenersOnSocket } from './socket/ClientSocket';
import store from './app/store'

function App() {

  const history = useHistory()
  registerListenersOnSocket(store, history)
  
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route exact path='/'>
            <HomePage />
          </Route>
          <Route path='/room/'>
            <WaitingRoom />
          </Route>
          <Route path='/game/:id'>
            <GamePage />
          </Route>
          <Route path="/scoreboard">
            <ScoreBoardPage />
          </Route>
        </Switch>
      </Router>
    </div>
    );
}

export default App;
