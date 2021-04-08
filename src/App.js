import './App.css';
import GamePage from './GamePage/GamePage';
import HomePage from './HomePage/HomePage';
import WaitingRoom from './WaitingRoom/WaitingRoom';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ScoreBoardPage from './ScoreBoardPage/ScoreBoardPage';

function App() {
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route exact path='/'>
            <HomePage />
          </Route>
          <Route path='/room/:id'>
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
