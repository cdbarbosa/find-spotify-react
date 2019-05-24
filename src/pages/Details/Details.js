import React, { Component } from 'react'
import './details.css'
import { Link } from "react-router-dom";

class Details extends Component {
  state = {
    images: [],
    generos: []
  }

  async componentDidMount() {
    const {id} = this.props.match.params
    const getUrl = `https://api.spotify.com/v1/artists/`;
    const SPOTIFY_SEARCH = getUrl + id;
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
        console.log(json.genres)
        this.setState({ name: json.name });
        this.setState({
          images: [...this.state.images, json.images[0].url]
        });
        this.setState({ url: json.external_urls.spotify });
        this.setState({ total: json.followers.total })
        this.setState({ generos: json.genres[0] });
        this.setState({ popularidade: json.popularity })
      });
  }
  render() {
    const { name, images, url, total, generos, popularidade } = this.state;
    return (
      <div className="detailArtist">
        <h2>Perfil do artista</h2>
        <div className="container">
          <div className="photoDetail">
            <img src={images} alt="images" width="500" className="photo"></img>
          </div>
          <div className="detail">
            <h1>{name}</h1>
            <ul>
              <li>Url: {url}</li>
              <li>Seguidores: {total}</li>
              <li>
                Gênero: {generos}
              </li>
              <li>Popularidade: {popularidade}</li>
            </ul>
          </div>
          {/* <Link to={'/'}><button>Voltar</button></Link> */}
        </div>
      </div>
    )
  }
}

export default Details;