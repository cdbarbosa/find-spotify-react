import React, { Component } from 'react'
import './home.css';
import { Link } from "react-router-dom";

class Home extends Component {
  state = {
    username: [],
    images: [],
    idArtist: 0,
    obj: [
      {
        name: "Leela",
        id: "11irmEzISytQwB3G8uhC5E"
      },
      {
        name: "Alcymar Monteiro",
        id: "0TcVnvKse98awlZxtUKIOk"
      },
      {
        name: "Ney Alves",
        id: "2UhA8yc1DpFfkutXq5lMah"
      }
    ]
  };
  componentDidUpdate() {
    window.addEventListener('load', this.procuraSpotify)
  }
  componentDidMount() {
    window.addEventListener('load', this.procuraSpotify)
  }

  procuraSpotify = async () => {
    this.state.obj.map(element => {
      const getUrl = `https://api.spotify.com/v1/artists/`;
      const SPOTIFY_SEARCH = getUrl + element.id;
      const accessToken =
        "BQCCM-0rx8eNVkk_7q4v5JfYmoo8d3nuTO5snAp3pqyS7TU5OScRQDR8hSAA8ORAh7Ul00xIaRQ1Lelt_vu4LxxPtWM0pT5ggN2VfHou4LGJG6SAZ-ZFA0HsQgb3usahgePynu7vKOmMc_HbMuDhsS3UCkKJ_ejx1uh_LXwsPny8ou6Fm5urzjBPkEmZP0fuS-jKkhJq9SYDT_3HaqRlXoBeAqqnxjaTWOFNgFMmS8kZ3Qxahoe1NctKqGq3YCPXwWUUlBeJ6lQ";
      const myOptions = {
        method: "GET",
        headers: {
          Authorization: "Bearer " + accessToken
        },
        mode: "cors",
        cache: "default"
      };
      fetch(SPOTIFY_SEARCH, myOptions)
        .then(response => response.json())
        .then(json => {
          this.setState({ username: [...this.state.username, json.name] });
          this.setState({ images: [...this.state.images, json.images[0].url]})
        });
    })
  };

  onChange = evento => {
    this.setState({ username: evento.target.value });
    // console.log(evento);
  };

  render() {
    const { username, images, obj } = this.state;
    
    return (
      <div className="Home">
        <h1>Selecione um dos artistas abaixo...</h1>
        <div className="cards">
          {images.map((element, key) => (
            <Link to={`/details/${obj[key].id}`}>
              <div className="card">
                <img
                  src={element}
                  key={key}
                  alt="images"
                  className="img_artist"
                />
                <h2 className="nameArtist">{username[key]}</h2>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  }
}

export default Home;
