const express = require("express");
const app = express();
const { Server } = require("socket.io");
const http = require("http");
const ACTION = require("../src/Actions");
const { generateFile } = require("./GenerateFile");
const { executeCpp } = require("./executeCpp");
const { executeJava } = require("./executeJava");
const { executePy } = require("./executePy");
const { executeJs } = require("./executeJs");
const cors = require("cors");
const mongoose = require("mongoose");
const Job = require("./models/Job");
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


mongoose.connect(
  "mongodb://localhost:27017/compilerapp",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.log(err);
      process.exit(1);
    } 
    console.log("connected");
  }
);

app.get("/status", async (req, res) => {
  // return res.send("hello");
  const jobId = req.query.id;
  if (jobId === undefined) {
    return res.status(400).json({ success: false, error: "Bad Request" });
  }
  try {
    const job = await Job.findById(jobId);
    
    if(job === undefined){
      return res.status(404).json({success:false, error: "Invalid Request"})
    }
    return res.status(200).json({success:true, job})

  } catch (err) {
    return res.status(500).json({success:false,error: JSON.stringify(err)})
  }
});

app.post("/run", async (req, res) => {
  const { lang, code, input } = req.body;
  if (code === undefined)
    return res.status(400).json({ success: false, error: "Empty Code Body" });

  let job;
  try {
    const filePath = await generateFile(lang, code);
    job = await new Job({lang, filePath}).save();
    const jobId = job["_id"];
    res.status(201).json({success: true, jobId});
    let output;
    job["startedAt"] = new Date();
    if (lang === "cpp") {
      output = await executeCpp(filePath, input); 
    } else if (lang === "py") {
      output = await executePy(filePath, input);
    } else if (lang === "java") {
      const arr = code.split(" ");
      const classIdx = arr.indexOf("class");
      let className = arr[classIdx + 1];
      className = className.split("\n")[0];
      className = className.split("{")[0];
      output = await executeJava(filePath, input, className);
    } else {
      output = await executeJs(filePath, input);
    }
    job["completedAt"] = new Date();
    job["status"] = "Success";
    job["output"] = output;
    job['input'] = input;
    await job.save();
    // return res.json({ filePath, output });
  } catch (err) {
    job["completedAt"] = new Date();
    job["status"] = "Error";
    job["output"] = JSON.stringify(err.stderr);
    job['input'] = input;
    await job.save();
    // res.status(500).json(err);
  }
});

app.use(express.static('build'))
app.use((req,res,next)=>{
res.sendFile(path.join(__dirname,'build','index.html'))
})
const server = http.createServer(app);
const io = new Server(server);
const userSocketMap = {};
function getAllConnectedClient(roomId) {
  return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
    (socketId) => {
      return {
        socketId,
        name: userSocketMap[socketId],
      };
    }
  );
}
io.on("connection", (socket) => {
  socket.on(ACTION.JOIN, ({ roomId, name }) => {
    userSocketMap[socket.id] = name;
    socket.join(roomId);
    const clients = getAllConnectedClient(roomId);
    clients.forEach(({ socketId }) => {
      io.to(socketId).emit(ACTION.JOINED, {
        clients,
        name,
        socketId: socket.id,
      });
    });
  });
  socket.on(ACTION.CODE_CHANGE, ({ roomId, code }) => {
    socket.in(roomId).emit(ACTION.CODE_CHANGE, { code });
  });
  socket.on(ACTION.SYNC_CODE, ({ roomId, code }) => {
    io.to(roomId).emit(ACTION.CODE_CHANGE, { code });
  });
  socket.on(ACTION.LANG, ({ val, roomId, lang }) => {
    io.to(roomId).emit(ACTION.LANG, { val });
    // io.to(roomId).emit(ACTION.LANG, { lang })
  });

  socket.on("disconnecting", () => {
    const rooms = [...socket.rooms];
    rooms.forEach((roomId) => {
      socket.in(roomId).emit(ACTION.DISCONNECTED, {
        socketId: socket.id,
        name: userSocketMap[socket.id],
      });
    });
    delete userSocketMap[socket.id];
    socket.leave();
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT);
