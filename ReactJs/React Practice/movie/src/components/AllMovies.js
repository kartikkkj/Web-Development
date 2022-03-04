import React, { Component } from "react";
import axios from "axios";
export default class AllMovies extends Component {
  constructor() {
    super();
    this.state = {
      hover: "",
      parr: [1],
      curp: 1,
      movies: [],
    };
  }
  async componentDidMount() {
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=5540e483a20e0b20354dabc2d66a31c9&language=e-US&page=${this.state.curp}`
    );
    const data = res.data;
    this.setState({
      movies: [...data.results],
    });
  }
  changeMovies = async () => {
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=5540e483a20e0b20354dabc2d66a31c9&language=e-US&page=${this.state.curp}`
    );
    const data = res.data;
    this.setState({
      movies: [...data.results],
    });
  };
  handleRight = () => {
    if (this.state.curp !== 0) {
      this.setState(
        {
          curp: this.state.curp - 1,
        },
        this.changeMovies
      );
    }
  };
  handleLeft = () => {
    const tempArr = [];
    for (let i = 0; i < this.state.parr.length + 1; i++) {
      tempArr.push(i + 1);
    }
    this.setState(
      {
        parr: [...tempArr],
        curp: this.state.curp + 1,
      },
      this.changeMovies
    );
  };
  handleClick = (i) => {
    if (this.state.curp !== i) {
      this.setState(
        {
          curp: i,
        },
        this.changeMovies
      );
    }
  };
  render() {
    return (
      <>
        {this.state.movies.length === 0 ? (
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          <div>
            <h1 className="text-center">
              <strong>Trendings</strong>
            </h1>
            <div className="movie-list">
              {this.state.movies.map((movieobj) => {
                <div
                  className="card movie-card"
                  onMouseEnter={() => {
                    this.setState({ hover: movieobj.id });
                  }}
                  onMouseLeave={() => {
                    this.state.hover = "";
                  }}
                  style={{ width: "20vw", height: "40vh" }}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/original${movieobj.backdrop_path}`}
                    className="card-img-top movie-img"
                    alt="..."
                  />
                  {/* <div className="card-body"> */}
                  <h5 className="card-title movie-title">
                    {movieobj.original_title}
                  </h5>
                  {/* <p className="card-text movie-text">{movieobj.overview}
                  </p> */}
                  <div
                    className="button-wrapper"
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    {this.state.hover === movieobj.id && (
                      <a href="#" className="btn btn-primary movies-btn">
                        Add to Favourites
                      </a>
                    )}
                  </div>
                </div>;
              })}
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <nav aria-label="...">
                <ul className="pagination">
                  <li className="page-item disabled" onClick={this.handleLeft}>
                    <a className="page-link">Prev</a>
                  </li>
                  {this.state.parr.map((i) => {
                    i === this.state.curp ? (
                      <li className="page-item active" aria-current="page">
                        <span className="page-link">{i}</span>
                      </li>
                    ) : (
                      <li
                        className="page-item"
                        onClick={() => this.handleClick(i)}
                      >
                        <a className="page-link">{i}</a>
                      </li>
                    );
                  })}
                  <li className="page-item" onClick={this.handleRight}>
                    <a className="page-link">Next</a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        )}
      </>
    );
  }
}
