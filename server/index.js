require("dotenv").config({ path: ".env" });
// const FRONTEND_ORIGIN ="https://Collab Hub-frontend.netlify.app";
const FRONTEND_ORIGIN ="http://localhost:3000/";
const PORT_NUMBER = 4000;
// const DB_CONNECTION_URL="mongodb+srv://ayush:error@cluster1.zprhwk6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1"
const DB = process.env.DB_CONNECTION_URL
const JWT_SECRET_KEY="secret"
const PEER_SERVER_PORT=9002


const express = require("express");
const cors = require("cors");
const connectDatabase = require("./config/db");
const authRouter = require("./routes/authRouter");
const meetingRouter = require("./routes/meetingRoute");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome to Collab Hub app");
});
// const request = require("request");
const axios = require("axios");
app.post("/runcode", (req, res) => {

  const { body } = req;
  // const url = `https://run.glot.io/languages/${
    const url = `https://glot.io/api/run/${
    body?.files[0]?.name?.split(".")[1]
  }/latest`;
  

  const options = {
    method: "POST",
    url: url,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Token 3beee698-177e-49ff-88db-83a8d1ee4856",
    },
    data: body,
  };

  axios
    .request(options)
    .then((data) => {
      res.send(data.data);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
});

app.use("/auth", authRouter);
app.use("/meeting", meetingRouter);

// extra
const server = require("http").Server(app);

const io = require("socket.io")(server, {
  cors: {
    origin: FRONTEND_ORIGIN,
  },
});

// const { PeerServer } = require("peer");
// const peerServer = PeerServer({ port: PEER_SERVER_PORT, path: "/" }, (exp) => {
//   console.log("Peerjs Server Running: " + exp.address().port);
// });


// peerServer.on("connection", (client) => {
//   console.log("Client Connected: ", client.id);
// });
// peerServer.on("disconnect", (client) => {
//   console.log("Client Disconnected: ", client.id);
// });

const Doc = require("./models/Doc");

// app.get('/runcode', (req, res) => {

// const { body } = req;
//     // const url = `https://glot.io/api/run/${language}/latest`;
//     const url = `https://glot.io/api/run/${body?.files[0]?.name?.split('.')[1]}/latest`;
//     const options = {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': 'Token ' + '349f7681-2a94-4cb8-92f1-c9dac48a282c'
//         }
//     };
//     options.body = JSON.stringify(body);
//     fetch(url, options)
//         .then(response => response.json())
//         .then(data => {
//             res.send(data);
//         }
//         )
//         .catch(error => {
//             console.log(error);
//             res.status(500).send(error);
//         }
//         )
// });

io.on("connection", (socket) => {
  console.log(`Connected to frontend!`);
  socket.on("get-document", async (DocId) => {
    // console.log(DocId);
    const doc = await findOrCreateDocument(DocId);

    socket.join(DocId);

    socket.emit("load-document", doc);

    socket.on("changes", (delta) => {
      socket.broadcast.to(DocId).emit("receive-changes", delta);
    });

    socket.on("drawing", (data) => {
      socket.broadcast.emit("drawing", data);
    });

    socket.on("save-document", async (data) => {
      Doc.findByIdAndUpdate(
        { _id: DocId },
        {
          html: data.html,
          css: data.css,
          js: data.js,
          pascal: data.pascal,
          perl: data.perl,
          php: data.php,
          ruby: data.ruby,
          python: data.python,
          cpp: data.cpp,
          java: data.java,
          input: data.input,
          output: data.output,
        }
      )
        .then((d) => {})
        .catch((err) => {
          console.error(err);
        });
    });

    socket.on("pencil-color-change", (color) => {
      console.log(color);
      socket.broadcast.to(DocId).emit("pencil-color-change", color);
    });
  });

  socket.on("join-room", (roomId, userId, userName) => {
    socket.join(roomId);
    socket.to(roomId).emit("user-connected", userId);

    socket.on("toggled", (userId, video, audio) => {
      socket.to(roomId).emit("received-toggled-events", userId, video, audio);
    });

    socket.on("disconnect", () => {
      socket.to(roomId).emit("user-disconnected", userId);
    });
  }); 
});

var findOrCreateDocument = async (id) => {
  if (!id) {
    return;
  }
  try {
    const document = await Doc.findById(id || "default");
    if (document) return document;
    else {
      const document = await new Doc({
        _id: id || "default",
        html: "",
        css: "",
        js: "",
        python: "",
        java: "",
        cpp: "",
        input: "",
        output: "",
        pascal: "",
        perl: "",
        php: "",
        ruby: "",
      });
      await document.save();
      return document;
    }
  } catch (err) {
    const document = await new Doc({
      _id: id || "default",
      html: "",
      css: "",
      js: "",
      python: "",
      java: "",
      cpp: "",
      input: "",
      output: "",
      pascal: "",
      perl: "",
      php: "",
      ruby: "",
    });
    await document.save();
    return document;
  }
};

// extra

server.listen(PORT_NUMBER, () => {
  try {
    connectDatabase();
    console.log(`Server is listening on port ${PORT_NUMBER}... `);
    console.log(`Socket Listening to ${FRONTEND_ORIGIN}`);
  } catch (error) {
    console.log(error);
  }
});
