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
      favourites: [],
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
    let oldData = JSON.parse(localStorage.getItem("movies") || "[]");
    this.setState({
      favourites: [...oldData]
    })
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
    if (this.state.curp > 1) {
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
    if (this.state.curp >= this.state.parr.length) {
      for (let i = 1; i <= this.state.parr.length + 1; i++) {
        tempArr.push(i);
      }
      this.setState(
        {
          parr: [...tempArr],
          curp: this.state.curp + 1,
        },
        this.changeMovies
      );
    } else {
      this.setState(
        {
          curp: this.state.curp + 1,
        },
        this.changeMovies
      );
    }
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
  handleFavourites = (movie) => {
    let oldData = JSON.parse(localStorage.getItem("movies"));
    if (!oldData) {
      oldData = [];
    }
    if (this.state.favourites.includes(movie.id)) {
      oldData = oldData.filter((m) => m.id != movie.id);
    } else {
      console.log(oldData);
      oldData.push(movie);
    }
    localStorage.setItem("movies", JSON.stringify(oldData));
    this.handleFavouritesState();
  };
  handleFavouritesState = () => {
    const oldData = JSON.parse(localStorage.getItem("movies" || "[]"));
    const temp = oldData.map((movie) => movie.id);
    this.setState({
      favourites: [...temp],
    });
  };
  render() {

    return (

      <>
        {this.state.movies.length === 0 ? (
          <div className="spinner-border text-primary center" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          <div className="movies">
            <h1 className="text-center">
              <strong>Trendings</strong>
            </h1>
            <div className="movie-list">
              {this.state.movies.map((movieobj) => (
                <div
                  key={movieobj.id}
                  className="card movie-card"
                  onMouseEnter={() => {
                    this.setState({ hover: movieobj.id });
                  }}
                  onMouseLeave={() => {
                    this.state.hover = "";
                  }}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/original${movieobj.poster_path}`}
                    className="card-img-top movie-img"
                    alt="..."
                  />
                  <h5 className="card-title movie-title">
                    {movieobj.original_title}
                  </h5>
                  <div
                    className="button-wrapper"
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    {this.state.hover === movieobj.id && (
                      <a
                        className="btn btn-primary movies-btn"
                        onClick={() => this.handleFavourites(movieobj)}
                      >
                        {this.state.favourites.includes(movieobj.id)
                          ? "Remove from Favourites"
                          : "Add to Favourites"}
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <nav aria-label="...">
                <ul className="pagination">
                  <li className="page-item" onClick={this.handleRight}>
                    {this.state.curp === 1 ? (
                      <span className="page-link deactive">Prev</span>
                    ) : (
                      <a className="page-link">Prev</a>
                    )}
                  </li>
                  {this.state.parr.map((i) =>
                    i === this.state.curp ? (
                      <li
                        key={i}
                        className="page-item active"
                        aria-current="page"
                      >
                        <span className="page-link">{i}</span>
                      </li>
                    ) : (
                      <li
                        key={i}
                        className="page-item"
                        onClick={() => this.handleClick(i)}
                      >
                        <a className="page-link">{i}</a>
                      </li>
                    )
                  )}
                  <li className="page-item" onClick={this.handleLeft}>
                    <a className="page-link">...</a>
                  </li>
                  <li className="page-item" onClick={this.handleLeft}>
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
