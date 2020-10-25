import React, { Component } from 'react';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      playing: false,
      queue: [],
      answerQueue: [],
      counter: 0
    };

    this.toggleStart = this.toggleStart.bind(this);
    this.handleButton = this.handleButton.bind(this);
  }

  toggleStart() {
    this.setState(prevState => ({
      playing: !prevState.playing
    }), () => {
        console.log("Done toggleStart");
        if (this.state.playing) this.generateNums();
        if (!this.state.playing) this.deleteNums();
    });
  }

  generateNums() {
    const num = Math.floor(Math.random() * 4) + 1;
    this.setState(state => ({
      queue: [...state.queue, num]
    }), () => {
      console.log(this.state.queue);
      //this.deletePreviousAnswer();
    });
  }

  deleteNums() {
    this.setState(state => ({ playing: !state.playing, queue: [], answerQueue: [], counter: 0 }));
  }

  deletePreviousAnswer() {
    this.setState(state => ({
      answerQueue: [],
      counter: 0
    }),() => {
      console.log("DPA Cntr: " + this.state.counter)
      this.generateNums()
    });
  }

  handleButton(e) {
    //e.preventDefault();
    const num = parseInt(e.target.innerHTML);
    if (this.state.playing) {
      this.setState(state => ({
        answerQueue: [...state.answerQueue, num],
        counter: state.counter + 1
      }), () => {
        console.log(JSON.stringify(this.state.answerQueue));
        let cntr = this.state.counter;
        console.log("Cntr: " + cntr);
        console.log("Queue Length: " + this.state.queue.length);
        console.log(this.state.queue[cntr - 1] !== this.state.answerQueue[cntr - 1]);
        if (this.state.queue[cntr - 1] !== this.state.answerQueue[cntr - 1]) {
          this.deleteNums();
        } else {
          if (cntr === this.state.queue.length) {
            this.deletePreviousAnswer();
          } else {
          }
        }
      });
    }
  }

  render() {
    return (
      <div>
        <p>Playing?: {this.state.playing ? "true" : "false" }</p>
        <p>Queue: {this.state.queue}</p>
        <p>Answer Queue: {this.state.answerQueue}</p>
        <p>Counter: {this.state.counter}</p>
        <button onClick={this.handleButton}>1</button>
        <button onClick={this.handleButton}>2</button>
        <button onClick={this.handleButton}>3</button>
        <button onClick={this.handleButton}>4</button>
        <button id='start-btn' onClick={this.toggleStart}>Start</button>
      </div>
    )
  }
}

export default App;
