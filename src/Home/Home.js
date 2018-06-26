import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom'
import './Home.css';

// const columnStyle = { display: 'inline-block', width: '50%', 'verticalAlign': 'top' };

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      characterCount: 10,
      showBio: false,
      characters: [],
      unsortedList: null,
      sort: false,
      randomBio: ["Hello, I am a crab", "Hello, I am a horse", "Hello, I am a pig", "Hello, I am a dragon", "Hello, I am a tiger"]
    };
  }

  componentDidMount() {
    fetch('/characters.json').then((response) => {
      return response.json()
    }).then((data) => {
      data.characters = data.characters.map((character) => {
        character.id = `${character.firstName.toLowerCase()}-${character.lastName ? character.lastName.toLowerCase() : ''}`;
        return character
      });
      this.setState({characters: data.characters, unsortedList: data.characters})
    }) 
  }

  handleChange(event) {
    this.setState({characterCount: event.target.value})
  }

  handleClick() {
    const unsortedList = this.state.unsortedList;
    this.state.sort ? this.setState({characters: unsortedList}) : this.sort();
    this.setState({sort: !this.state.sort});
  }

  showBio(character) {
    const updatedState = this.state;

    updatedState[character.lastName.toLowerCase()] = !updatedState[character.lastName.toLowerCase()];
    this.setState({showBio: true, updatedState});
  }

  sort() {
    const sortedCharacters = this.state.characters.sort((a, b) => a.lastName.localeCompare(b.lastName));
    this.setState({characters: sortedCharacters})
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  render() {
    const listCharacters = this.state.characters.map((character, index) => {

      if(this.state.characterCount > index){

      let imagePath = `/images/${character.image}`;
      
      let bioElement;
      const updatedState = this.state;
      if (updatedState[character.lastName.toLowerCase()]) {
        bioElement = (
          <div className="bio">{this.state.randomBio[this.getRandomInt(5)]}</div>
        )
      }

      return (
        <div key={index} className={`character border-${this.getRandomInt(5)}`}>
          <Link to={`/${character.id}`} className="viewFull">
            View full
          </Link>
          <div className={"name"}>
            <h2>{character.firstName} {character.lastName}</h2>
          </div>
          <div className="content">
            <div className="characterPic">
              <img src={imagePath} alt="Character" />
            </div>
            <button onClick={ () => this.showBio(character) }>View bio</button>
            {bioElement}
          </div>
        </div>
      )
    }
  });

    return (
      <div className="App">
        <div className="controls">
          <div className="inputBox">
            <button
            onClick={ this.handleClick.bind(this) }
            >Sort A-Z</button>
          </div>

          <div className="inputBox">
            <input type="text" placeholder="Search..."/>
          </div>

          <div className="inputBox">
            <p>How many characters to show?</p>
            <input 
              id="slider" 
              type="range" 
              min="0" max="10" step="1" 
              value={this.state.characterCount} 
              onChange={ this.handleChange.bind(this) } /> 
            <input 
              id="sliderValue"
              type="text"
              size="2"
              value={this.state.characterCount} 
              onChange={ this.handleChange.bind(this) } />
          </div>
        </div>

        <div className="characterContainer">
          {listCharacters}
        </div>

      </div>
    );
  }
}

export default Home;