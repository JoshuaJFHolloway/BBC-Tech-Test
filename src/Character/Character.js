import React, { Component } from 'react';
import {
  Route, Switch, Link
} from 'react-router-dom'
import './Character.css';
import ErrorView from '../Error/Error';

class Character extends Component {
  constructor(props) {
    super(props);
    this.state = {
      character: [],
      pageId: props.match.params.characterId
    };
  }

  componentDidMount() {
    fetch('/characters.json').then((response) => {
      return response.json()
    }).then((data) => {
      let character = data.characters.find((character) => {
        return `${character.firstName.toLowerCase()}-${character.lastName.toLowerCase()}` === this.state.pageId
      });
      this.setState({character: character})
    }) 
  }

  source() {
    let image = undefined;
    if(this.state.character === undefined){image =
      <Switch>
        <Route component={ErrorView}/>}
      </Switch>}
    else {
      image =
        <div className="viewFullContent">
          <Link to="/" className="closeButton">
            Close
          </Link>
          <div className="characterPic">
            <img src={`/images/${this.state.character.image}`} alt="Character"/>
          </div>
          <div className="characterBio">
            Aliquam erat volutpat. Ut ultrices nisi enim, eget condimentum urna condimentum sit amet. Proin vulputate
            malesuada nisl nec elementum. Phasellus mi est, laoreet quis molestie sit amet, cursus sit amet enim.
          </div>
        </div>
    }
    return image
  }

  render() {

    return (
      <div>
          {this.source()}
      </div>
  )
  }
}

export default Character;
