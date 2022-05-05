import React, { Component } from "react";
export class Favourites extends Component {
  constructor() {
    super();
    this.state = {
      genres: [],
      curG: "All Genres",
      movies: [],
      curt: "", 
      limit: "10",
      pop:1,
      sort:[],
      rat:1,
      parr:[1],
      curp:1,
      start:0
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
      movies: [...data],
      sort:[...data]
    })
  }
  genderChange = (genre) => {
    this.setState({
      curG: genre
    })
  }
   popDC=()=>{
     const temp = this.state.movies;
     temp.sort((objA,objB)=>{
       return (objB.popularity - objA.popularity)
     })
     this.setState({
      sort : [...temp],
      pop:this.state.pop+1
    })
   }
   popAC=()=>{
     const temp = this.state.movies;
     temp.sort((objA,objB)=>{
       return (objA.popularity - objB.popularity)
     })
     this.setState({
       sort : [...temp],
       pop:this.state.pop+1
     })
   }
   popNO=()=>{
     const temp = this.state.movies;
     this.setState({
      sort : [...temp],
      pop:this.state.pop+1
    })
   }
  popularityChange=()=>{
    const data = (this.state.pop)%3;
    if(data === 0){
      this.popNO()
    }
    else if(data === 1 ){
      this.popAC()
    }
    else if(data === 2){
      this.popDC()
    }
  }

  ratDC=()=>{
    const temp = this.state.movies;
    temp.sort((objA,objB)=>{
      return (objB.vote_average - objA.vote_average)
    })
    this.setState({
     sort : [...temp],
     rat:this.state.rat+1
   })
  }
  ratAC=()=>{
    const temp = this.state.movies;
    temp.sort((objA,objB)=>{
      return (objA.vote_average - objB.vote_average)
    })
    this.setState({
      sort : [...temp],
      rat:this.state.rat+1
    })
  }
  ratNO=()=>{
    const temp = this.state.movies;
    this.setState({
     sort : [...temp],
     rat:this.state.rat+1
   })
  }
 ratingChange=()=>{
   const data = (this.state.rat+1)%3;
   if(data === 0){
     this.ratNO()
   }
   else if(data === 1 ){
     this.ratAC()
   }
   else if(data === 2 ){
     this.ratDC()
   }
   
 }
 deleteBtn=(movie)=>{
   const temp = this.state.movies.filter((movieObj)=>movieObj.id !== movie.id)
   const temp2 = this.state.sort.filter((movieObj)=>movieObj.id !== movie.id)
   let oldData = JSON.parse(localStorage.getItem("movies") || "[]")
   oldData = oldData.filter((m) => m.id != movie.id);
   localStorage.setItem("movies", JSON.stringify(oldData));
   this.setState({
     movie:[...temp],
     sort:[...temp2]
   })
 }
 handleRight = () => {
  if (this.state.curp > 1) {
    this.setState(
      {
        start:(+this.state.start)-(+this.state.limit),
        curp: this.state.curp - 1,
      }
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
        start:(+this.state.start)+(+this.state.limit),
        parr: [...tempArr],
        curp: this.state.curp + 1,
      }
    );
  } else {
    this.setState(
      {
        start:(+this.state.start)+(+this.state.limit),
        curp: this.state.curp + 1,
      }
    );
  }
};
handleClick = (i) => {
  if (this.state.curp !== i){
    this.setState(
      {
        start: (i-1)*(+this.state.limit),
        curp: i,
      }
    );
  }
};



  render() {
    const genreids = { 28: "Action", 12: "Adventure", 16: "Animation", 35: "Comedy", 80: "Crime", 99: "Documentry", 18: "Drama", 10751: "Family", 14: "Fantasy", 27: "Horror", 10402: "Music", 9648: "Mystery", 10749: "Romance", 878: "Sci-Fi", 10770: "TV", 53: "Thriller", 10752: "War", 37: "Western" }
    let filterArr = []
    
    if(this.state.curG === "All Genres"){
      filterArr = this.state.sort
    }
    else{
      filterArr = this.state.sort.filter((movieObj)=>genreids[movieObj.genre_ids[0]] === this.state.curG)
    }
    if(this.state.curt !== ""){
      filterArr = this.state.sort.filter((movieObj)=>{
       const title = movieObj.original_title.toLowerCase() 
       const genre =genreids[movieObj.genre_ids[0]].toLowerCase()
       return title.includes(this.state.curt) || genre.includes(this.state.curt);
      })
    }
      filterArr = filterArr.slice(this.state.start,+(this.state.limit*this.state.curp))
    

    return (
      <>
        <div className="main">
          <div className="row">
            <div className="col-3">
              <ul className="list-group favourites-genres">
                {
                  this.state.genres.map(genre => (
                    this.state.curG === genre ? <li key={genre} className="list-group-item" style={{ backgroundColor: "#3f51b5", color: "white", fontWeight: "bold" ,cursor:"pointer"}}>{genre}</li> : <li key={genre} className="list-group-item" style={{ backgroundColor: "white", color: "#3f51b5" ,cursor:"pointer"}} onClick={() => this.genderChange(genre)}>{genre}</li>
                  ))
                }
              </ul>
            </div>
            <div className="col-9 favourites-table">
              <div className="input-group mb-3">
                <input value={this.state.curt}
                  onChange={(e) => this.setState({ curt: e.target.value })}
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
                  value={this.state.limit}
                  onChange={(e) => this.setState({ limit: e.target.value })}
                />
              </div>
              <div className="row">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">Title</th>
                      <th scope="col">Genre</th>

                      <th scope="col" style={{cursor:"pointer"}} onClick={this.popularityChange}><span className="material-icons">
                        arrow_drop_up
                      </span>Popularity<span className="material-icons">
                          arrow_drop_down
                        </span></th>
                      <th style={{cursor: "pointer"}} onClick={this.ratingChange} scope="col"><span className="material-icons">
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
                          <td><button type="button" className="btn btn-danger" onClick={()=>this.deleteBtn(movieObj)}>Delete</button></td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>
              
              <nav aria-label="..." style={{cursor:"pointer"}}>
                <ul className="pagination">
                  <li className="page-item" onClick={this.handleRight}> {this.state.curp === 1 ? (
                      <span className="page-link deactive">Prev</span>
                    ) : (<a className="page-link">Prev</a>)}
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
                  {filterArr.length>=(+this.state.limit)?(
                    <>
                    <li className="page-item" onClick={this.handleLeft}>
                    <a className="page-link">...</a>
                  </li>
                  <li className="page-item" onClick={this.handleLeft}>
                    <a className="page-link" href="#input-group">Next</a>
                  </li>
                  </>
                  ):(
                    <li className="page-item">
                      <span className="page-link deactive">Next</span>
                  </li>
                  )}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </>
    );
  }
}
