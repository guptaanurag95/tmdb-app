import React, { Component } from "react";

class Card extends Component {
  state = { movieId: 157336 };

  fetchData(url) {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({
          movieId: data.id,
          imageUrl: "https://image.tmdb.org/t/p/w500/" + data.poster_path,
          title: data.original_title,
          overview: data.overview,
          homepage: data.homepage,
          tagline: data.tagline,
          backdrop: "https://image.tmdb.org/t/p/original/" + data.backdrop_path,
          genres: data.genres
        });
      });
  }

  render() {
    document.body.style.backgroundImage = "url(" + this.state.backdrop + ")";
    document.body.style.height = "100vh";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundRepeat = "no-repeat";

    let genresArray = [];
    let genres;
    if (this.state.genres !== undefined) {
      this.state.genres.forEach(element => {
        genresArray.push(element.name);
      });
      genres = genresArray.join(", ");
    }

    return (
      <div className="card mx-auto w-75 h-75">
        <div className="row no-gutters">
          <div className="col-md-4 mx-auto">
            <img src={this.state.imageUrl} className="card-img" alt="..." />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{this.state.title}</h5>
              <p className="card-text">
                <small className="text-muted">{this.state.tagline}</small>
              </p>
              <p className="card-text">{this.state.overview}</p>
              <p className="card-text font-weight-bold text-monospace">
                {genres}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    let url =
      "https://api.themoviedb.org/3/movie/" +
      this.state.movieId +
      "?api_key=410c0db6093d321924bc4bdade24b7e8";
    this.fetchData(url);
  }
}

export default Card;
