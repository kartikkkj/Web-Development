import React, { Component } from "react";
import axios from "axios";

export default class Banner extends Component {
  constructor() {
    super();
    this.state = {
      movie: [],
    };
  }
  async componentDidMount() {
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=5540e483a20e0b20354dabc2d66a31c9&language=e-US&page=${this.state.curp}`
    );
    const data = res.data;
    this.setState({
      movie: data.results[0],
    });
  }
  render() {
    return (
      <>
        {this.state.movie === "" ? (
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          <div className="card banner-card">
            <img
              src={`https://image.tmdb.org/t/p/original${this.state.movie.backdrop_path}`}
              className="card-img-top banner-img"
              alt="..."
            />
            <h1 className="card-title banner-title">
              {this.state.movie.original_title}
            </h1>
            <p className="card-text banner-text">{this.state.movie.overview}</p>
          </div>
        )}
      </>
    );
  }
}
