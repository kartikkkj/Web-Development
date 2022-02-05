// performing tasks on a particular path is called routing
const http = require("http");

// function index(req,res){
//     res.writeHead(200)
//     res.end("index")
// }
// function about(req,res){
//     res.writeHead(200)
//     res.end("about")
// }

// http.createServer((req, res)=>{
//     if(req.url=='/'){
//         return index(req,res)
//     }
//     if(req.url == '/about'){
//         return about(req,res)
//     }
// }).listen(5000)

//OR

const route = {
  "/": function index(req, res) {
    res.writeHead(200);
    res.end("index");
  },
  "/about": function about(req, res) {
    res.writeHead(200);
    res.end("about");
  },
};

http
  .createServer((req, res) => {
    if (req.url in route) {
      route[req.url](req, res);
    }
  })
  .listen(5000); // when you diploy project .listen(process.env.PORT || 8000)
