import React, {Component} from 'react';
import Snake from './Components/Snake';
import Food from './Components/Food';
import Header from './Components/Header';
import Footer from './Components/Footer';
import FullScreen from './Components/FullScreen';
import StartGame from './Components/StartGame';
import FinishModal from './Components/FinishModal';
import clickSound from './assets/audio/click.mp3';
import eatSound from './assets/audio/eat.wav';
import backMusic from './assets/audio/back-music.mp3';
import {Howl} from 'howler';
import SoundController from './Components/SoundController';
import Settings from './Components/Settings';
import StateGame from './Components/StateGame';
import 'bootstrap/dist/css/bootstrap.min.css';
import LastTenScore from './Components/LastTenScore';

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
  modalShow: false,
  snakeDots: [
    [0,0],
    [4,0],
    [8,0],
  ],
  lastTen: [],
}

const soundClick = new Howl({
  src: clickSound
});
const soundEat = new Howl({
  src: eatSound
});

const soundBackground = new Howl({
  src: backMusic
})

let saveData;

class App extends Component {

  constructor(props) {
    super(props);
    this.state = initialState;
    this.initState()
  }

  componentDidMount() {
    //this.interval = setInterval(this.moveSnake, this.state.speed);
    document.onkeydown = this.onKeyDown;
    soundClick.volume(0.5);
    soundEat.volume(0.5);
    soundBackground.volume(0.5);
    soundBackground.loop(true);
    soundBackground.play();
  }

  initState() {
    window.addEventListener('load', this.saveNewData());
    if(saveData) {
      this.state = saveData;
      if(this.state.snakeDots[0][0] !== 0 || this.state.snakeDots[0][1] !== 0){
        this.interval = setInterval(this.moveSnake, this.state.speed);
      } 
    } else {
      if(!localStorage.getItem('lastTen')){
        localStorage.setItem('lastTen', JSON.stringify([]));  
      }
      let newScore = JSON.parse(localStorage.getItem('lastTen'));
      this.state = {
        prevLengthTail: 0,
        speedName: 'Low speed',
        speed: 200,
        beginLength: 3,
        nameFood: 'apple',
        lastTen: newScore,
        scoreShow: false,
        food: getRandomCoordinates(),
        direction: 'RIGHT',
        modalShow: false,
        snakeDots: [
          [0,0],
          [4,0],
          [8,0],
        ],
        lastTen: []
      };
    }
    this.saveState.bind(this)();
  }

  saveNewData() {
    saveData = JSON.parse(localStorage.getItem('lastState'));
  }

  saveState(){
      localStorage.setItem('lastState',JSON.stringify(this.state));
  };

  componentDidUpdate() {
    this.checkIfOutBorders();
    this.checkIfCollapsed();
    this.checkIfEat();
    this.saveState.bind(this)();
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
    this.saveState.bind(this)();
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
    this.saveState.bind(this)();
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
      soundEat.play();
      this.saveState.bind(this)();
    }
  }

  enlargeSnake() {
    let newSnake = [...this.state.snakeDots];
    newSnake.unshift([])
    this.setState( {
      snakeDots: newSnake
    })
    this.saveState.bind(this)();
  }

  increaseSpeed() {
    if(this.state.speed > 50) {
      clearInterval(this.interval);
        this.setState( {
          speed: this.state.speed - 5
      })
      this.interval = setInterval(this.moveSnake, this.state.speed);
      this.saveState.bind(this)();
    }
   
  }

  onGameOver() {
    let newScore = JSON.parse(localStorage.getItem('lastTen'));
    if(newScore.length > 9) {
      newScore.shift();
    }
    newScore.push(this.state.snakeDots.length - this.state.beginLength);
    localStorage.setItem('lastTen', JSON.stringify(newScore));
    this.setState(initialState);
    clearInterval(this.interval);
    if(!this.state.modalShow) {
      this.setState({
        prevLengthTail: this.state.snakeDots.length,
        modalShow: true,
        lastTen: newScore,
      });
    }
    this.setNeedSpeed();
    this.setNeedLength();
    this.saveState.bind(this)();
  }

  setNeedSpeed() {
    if(this.state.speedName === 'Middle speed') {
      this.setState({
        speed: 150,
      })
    } else if(this.state.speedName === 'High speed') {
      this.setState({
        speed: 100,
      })
    } else if(this.state.speedName === 'Low speed'){
      this.setState({
        speed: 200,
      })
    }
    this.saveState.bind(this)();
  }

  setNeedLength() {
    if(this.state.beginLength === 2) {
      this.setState({
        snakeDots: [
          [0,0],
          [4,0],
        ],
      })
    } else if(this.state.beginLength === 3) {
      this.setState({
        snakeDots: [
          [0,0],
          [4,0],
          [8,0]
        ],
      })
    } else if(this.state.beginLength === 4){
      this.setState({
        snakeDots: [
          [0,0],
          [4,0],
          [8,0],
          [12,0],
        ],
      })
    }
    this.saveState.bind(this)();
  }

  startNewGame() {
    soundClick.play();
    clearInterval(this.interval);
    this.setState(initialState);
    this.setNeedLength();
    this.interval = setInterval(this.moveSnake, this.state.speed);
    this.saveState.bind(this)();
  }

  fullScreenGame() {
    soundClick.play();
    if(!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }

  closeModal() {
    soundClick.play();
    if(this.state.modalShow) {
      this.setState({
        modalShow: false,
      });
    }
    this.saveState.bind(this)();
  }
  closeLastTen() {
    soundClick.play();
    if(this.state.scoreShow) {
      this.setState({
        scoreShow: false,
      });
    }
    this.saveState.bind(this);
  }

  changeMusicVolume(e) {
    soundBackground.volume(e.target.value);
  }

  changeSoundVolume(e) {
    soundClick.volume(e.target.value);
    soundEat.volume(e.target.value);
  }

  muteSound(e) {
    if(soundClick._muted === true) {
      soundClick.mute(false);
      soundEat.mute(false);
    } else {
      soundClick.mute(true);
      soundEat.mute(true);
    }
    e.currentTarget.childNodes[1].classList.toggle('image-none');
    e.currentTarget.childNodes[2].classList.toggle('image-none');
  }

  muteMusic(e) {
    if(soundBackground._muted === true) {
      soundBackground.mute(false);
    } else {
      soundBackground.mute(true);
    }
    e.currentTarget.childNodes[1].classList.toggle('image-none');
    e.currentTarget.childNodes[2].classList.toggle('image-none');
  }

  changeSpeed(e) {
    if(e.target.innerText === 'Middle') {
      this.setState({
        speed: 150,
        speedName: 'Middle speed',
      })
    } else if(e.target.innerText === 'High') {
      this.setState({
        speed: 100,
        speedName: 'High speed',
      })
    } else if(e.target.innerText === 'Low'){
      this.setState({
        speed: 200,
        speedName: 'Low speed',
      })
    }
    this.saveState.bind(this)();
  }

  changeLength(e) {
    if(e.target.innerText === '2') {
      this.setState({
        snakeDots: [
          [0,0],
          [4,0],
        ],
        beginLength: 2
      })
    } else if(e.target.innerText === '3') {
      this.setState({
        snakeDots: [
          [0,0],
          [4,0],
          [8,0],
        ],
        beginLength: 3
      })
    } else if(e.target.innerText === '4'){
      this.setState({
        snakeDots: [
          [0,0],
          [4,0],
          [8,0],
          [12,0],
        ],
        beginLength: 4
      })
    }
    this.saveState.bind(this)();
  }

  changeFood(e) {
    if(e.target.innerText === 'apple') {
      this.setState({
        nameFood: 'apple',
      })
    } else if(e.target.innerText === 'banana') {
      this.setState({
        nameFood: 'banana',
      })
    } else if(e.target.innerText === 'strawberry') {
      this.setState({
        nameFood: 'strawberry',
      })
    } 
    this.saveState.bind(this)();
  }



  render() {
    return (
      <div className="snake-game">
        <Header />
        <FinishModal
          score = {this.state.prevLengthTail - this.state.beginLength}
          tail = {this.state.prevLengthTail}
          show = {this.state.modalShow}
          onHide= {this.closeModal.bind(this)}
        />
        <LastTenScore
          tenScore = {this.state.lastTen}
          show = {this.state.scoreShow}
          onHide= {this.closeLastTen.bind(this)}
        />
        <div className="game-block">
          <div className = "panel-control">
            <StartGame onClickNewGame = {this.startNewGame.bind(this)}/>
            <FullScreen onFullScreen = {this.fullScreenGame}/>
            <Settings 
            onChangeSpeed = {(e) => {
              this.changeSpeed(e);
            }}
            onChangeLength = {(e) => {
              this.changeLength(e);
            }}
            onChangeFood = {(e) => {
              this.changeFood(e);
            }}
            currentSpeed = {this.state.speedName}
            currentFood = {`Meal: ${this.state.nameFood}`}
            currentLength = {`Length: ${this.state.beginLength}`}
            />
            <SoundController 
              onChangeSoundVolume = {(e) => {
              this.changeSoundVolume(e);
            }} 
              onChangeMusicVolume = {(e) => {
              this.changeMusicVolume(e)
            }} 
              onMuteSound = {(e) => {
                this.muteSound(e);
            }}
              onMuteMusic = {(e) => {
                this.muteMusic(e);
            }}
            />
          </div>
          <div>
            <StateGame currentLength = {this.state.snakeDots.length - this.state.beginLength}
            tail= {this.state.snakeDots.length}
            statistics = {() => {
              this.setState({
                scoreShow: true,
              })
            }}/>
          </div>
          <div className="game-area">
              <Snake snakeDots = {this.state.snakeDots} />
              <Food dot = {this.state.food} nameFood = {this.state.nameFood}/>
          </div>
        </div>
        <Footer />
      </div> 
    );
  }
}

export default App;
