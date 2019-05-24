import React, { Component } from 'react'
import './home.css';
import { Link } from "react-router-dom";

class Home extends Component {
  constructor(props) {
    super(props)
    this.procuraSpotify = this.procuraSpotify.bind(this)
  }
  state = {
    username: [],
    images: [],
    idArtist: [],
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
    ],
  };
  componentDidMount() {
    this.procuraSpotify();
  }

  procuraSpotify = async () => {
    this.state.obj.map(element => {
      const getUrl = `https://api.spotify.com/v1/artists/`;
      const SPOTIFY_SEARCH = getUrl + element.id;
      const accessToken =
        "BQB_qpmj78RJN7QWncCAoRfkKUdMDg8g18B3RG_M-HEyxnvZsZxfHOSO6v1CQiyljdN3hWIXSz_H0Lu8nHM6dQalw78uabgtY1i5ANtoJZvq4B9Mc6adSm7QNF1jkSOXyOm8Kn60MhVe9apOJliWjXw1F3V1TbGlUncyR_wog41rwqxPVEwhEA3TJt0kmZjgCXAxTd4xBp2PY-SpfA23laLimOxGDLzfmlL88iw8GYL1ypGQ8JamqYadTpQJ94vWpdCx6hzBK4k";
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
          this.setState({ idArtist: [...this.state.idArtist, json.id] });
          this.setState({ username: [...this.state.username, json.name] });
          this.setState({ images: [...this.state.images, json.images[0].url] });
        });
    });
  };

  onChange = evento => {
    this.setState({ username: evento.target.value });
    // console.log(evento);
  };

  render() {
    const { username, images, obj, idArtist } = this.state;

    return (
      <div className="Home">
        <div className="cards">
          {images.map((element, key) => (
            <Link to={`/details/${idArtist[key]}`}>
              <div className="card">
                <img
                  src={element}
                  key={key}
                  alt="images"
                  className="img_artist"
                />
                <div className="name">
                  <h2 className="nameArtist">{username[key]}</h2>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  }
}

export default Home;
