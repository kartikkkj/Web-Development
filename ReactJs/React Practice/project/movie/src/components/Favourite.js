import React, { Component } from "react";
export class Favourites extends Component {
  constructor() {
    super();
    this.state = {
      genres: [],
      curG: "All Genres",
      movies: [],
      curt: "",
      limit: ""
    }
  }
  componentDidMount() {
    const data = JSON.parse(localStorage.getItem("movies") || "[]")
    const genreids = { 28: "Action", 12: "Adventure", 16: "Animation", 35: "Comedy", 80: "Crime", 99: "Documentry", 18: "Drama", 10751: "Family", 14: "Fantasy", 27: "Horror", 10402: "Music", 9648: "Mystery", 10749: "Romance", 878: "Sci-Fi", 10770: "TV", 53: "Thriller", 10752: "War", 37: "Western" }
    const temp = []
    data.forEach(movieObj => {
      if (!temp.includes(genreids[movieObj.genre_ids[0]])) {
        temp.push(genreids[movieObj.genre_ids[0]])
      }
    })
    temp.unshift("All Genres")
    this.setState({
      genres: [...temp],
      movies: [...data]
    })
  }
  genderChange = (genre) => {
    this.setState({
      curG: genre
    })

  }
  render() {
    const genreids = { 28: "Action", 12: "Adventure", 16: "Animation", 35: "Comedy", 80: "Crime", 99: "Documentry", 18: "Drama", 10751: "Family", 14: "Fantasy", 27: "Horror", 10402: "Music", 9648: "Mystery", 10749: "Romance", 878: "Sci-Fi", 10770: "TV", 53: "Thriller", 10752: "War", 37: "Western" }
    let filterArr = []
    if (this.state.curt === "") {
      filterArr = this.state.movies
    }
    else {
      filterArr = this.state.movies.filter(movieObj => {
        let title = movieObj.original_title.toLowerCase();
        return title.includes(this.state.curt.toLowerCase())
      })
    }
    if (this.curG !== "All Genres") {
      filterArr = this.state.movies
    }
    // else{
    //     filterArr = this.state.movies.filter(moviesO=>genreids[moviesO.genre_id[0]] === this.state.curG)
    // }
    return (
      <>
        <div className="main">
          <div className="row">
            <div className="col-3">
              <ul className="list-group favourites-genres">
                {
                  this.state.genres.map(genre => (
                    this.state.curG === genre ? <li key={genre} className="list-group-item" style={{ backgroundColor: "#3f51b5", color: "white", fontWeight: "bold" }}>{genre}</li> : <li key={genre} className="list-group-item" style={{ backgroundColor: "white", color: "#3f51b5" }} onClick={() => this.genderChange(genre)}>{genre}</li>
                  ))
                }
              </ul>
            </div>
            <div className="col-9 favourites-table">
              <div className="input-group mb-3">
                <input value={this.state.curt}
                  onChange={(e) => { this.setState({ curt: e.target.value }) }}
                  type="text"
                  className="form-control"
                  placeholder="Search"
                  aria-label="Username"
                />
                <input
                  type="number"
                  className="form-control"
                  placeholder="No of rows"
                  aria-label="Server"
                />
              </div>
              <div className="row">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">Title</th>
                      <th scope="col">Genre</th>

                      <th scope="col"><span className="material-icons">
                        arrow_drop_up
                      </span>Popularity<span className="material-icons">
                          arrow_drop_down
                        </span></th>
                      <th scope="col"><span className="material-icons">
                        arrow_drop_up
                      </span>Rating<span className="material-icons">
                          arrow_drop_down
                        </span></th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      filterArr.map(movieObj => (
                        <tr key={movieObj.id}>
                          <th scope="row"> <img style={{ width: "8vw", }} src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} alt="." /> {movieObj.original_title}</th>
                          <td>{genreids[movieObj.genre_ids[0]]}</td>
                          <td>{movieObj.popularity}</td>
                          <td>{movieObj.vote_average}</td>
                          <td><button type="button" className="btn btn-danger">Delete</button></td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>
              <nav aria-label="Page navigation example">
                <ul className="pagination">
                  <li className="page-item">
                    <a className="page-link" href="#">
                      1
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      2
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      3
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </>
    );
  }
}
