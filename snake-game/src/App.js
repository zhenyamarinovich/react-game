import React, {Component} from 'react';
import Snake from './Components/Snake';
import Food from './Components/Food';
import Header from './Components/Header';
import Footer from './Components/Footer';
import FullScreen from './Components/FullScreen';
import StartGame from './Components/StartGame';
import FinishModal from './Components/FinishModal';
import 'bootstrap/dist/css/bootstrap.min.css';

const getRandomCoordinates = () => {
  let min = 0;
  let max = 96;
  let x = Math.floor((Math.random()*(max-min)+min)/4)*4;
  let y = Math.floor((Math.random()*(max-min)+min)/4)*4;
  return [x,y];
}

const initialState = {
  food: getRandomCoordinates(),
  direction: 'RIGHT',
  speed: 150,
  snakeDots: [
    [0,0],
    [4,0],
    [8,0],
  ],
  modalShow: false,
}

class App extends Component {

  state = initialState;

  componentDidMount() {
    //this.interval = setInterval(this.moveSnake, this.state.speed);
    document.onkeydown = this.onKeyDown;  
    this.setState({
      prevLengthTail: 0
    })
  }

  componentDidUpdate() {
    this.checkIfOutBorders();
    this.checkIfCollapsed();
    this.checkIfEat();
  }

  onKeyDown = (e) => {
    e = e || window.event;
    switch (e.keyCode) {
      case 38:
        this.setState({direction: 'UP'});
        break;
      case 40:
        this.setState({direction: 'DOWN'});
        break;
      case 37:
        this.setState({direction: 'LEFT'});
        break;
      case 39:
        this.setState({direction: 'RIGHT'});
        break;
      default:
        break;
    }
  }

  moveSnake = () => {
    let dots = [...this.state.snakeDots];
    let head = dots[dots.length - 1];

    switch (this.state.direction) {
      case 'RIGHT': 
        head = [head[0] + 4, head[1]];
        break;
      case 'LEFT': 
        head = [head[0] - 4, head[1]];
        break;
      case 'DOWN': 
        head = [head[0], head[1] + 4];
        break;
      case 'UP': 
        head = [head[0], head[1] - 4];
        break;
      default:
        break;
    }

    dots.push(head);
    dots.shift();
    this.setState({
      snakeDots: dots
    })
  }

  checkIfOutBorders() {
    let head = this.state.snakeDots[this.state.snakeDots.length - 1];
    if(head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
      this.onGameOver();
    }
  }

  checkIfCollapsed() {
    let snake = [...this.state.snakeDots];
    let head = snake[snake.length - 1];
    snake.pop();
    snake.forEach(dot => {
      if(head[0] === dot[0] && head[1] === dot[1]) {
        this.onGameOver();
      }
    })
  }

  checkIfEat() {
    let head = this.state.snakeDots[this.state.snakeDots.length - 1];
    let food = this.state.food;
    if(head[0] === food[0] && head[1] === food[1]) {
      this.setState({
        food: getRandomCoordinates()
      })
      this.enlargeSnake();
      this.increaseSpeed();
    }
  }

  enlargeSnake() {
    let newSnake = [...this.state.snakeDots];
    newSnake.unshift([])
    this.setState( {
      snakeDots: newSnake
    })
  }

  increaseSpeed() {
    if(this.state.speed > 40) {
      clearInterval(this.interval);
        this.setState( {
          speed: this.state.speed - 3
      })
      this.interval = setInterval(this.moveSnake, this.state.speed);
    }
  }

  onGameOver() {
    this.setState(initialState);
    clearInterval(this.interval);
    if(!this.state.modalShow) {
      this.setState({
        prevLengthTail: this.state.snakeDots.length,
        modalShow: true,
      });
    }
  }

  startNewGame() {
    clearInterval(this.interval);
    this.setState(initialState);
    this.interval = setInterval(this.moveSnake, this.state.speed);
  }

  fullScreenGame() {
    if(!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }

  closeModal() {
    if(this.state.modalShow) {
      this.setState({
        modalShow: false,
      });
    }
  }

  render() {
    return (
      <div className="snake-game">
        <Header />
        <FinishModal
            tail = {this.state.prevLengthTail}
            show = {this.state.modalShow}
            onHide= {this.closeModal.bind(this)}
        />
        <div className="game-block">
          <div>
            <StartGame onClickNewGame = {this.startNewGame.bind(this)}/>
            <FullScreen onFullScreen = {this.fullScreenGame}/>
          </div>
          <div className="game-area">
              <Snake snakeDots = {this.state.snakeDots} />
              <Food dot = {this.state.food} />
          </div>
        </div>
        <Footer />
      </div> 
    );
  }
}

export default App;
