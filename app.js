const express = require('express');
const connect = require("./schemas");
const app = express();
const port = 3000;

connect();

const blogsRouter = require("./routes/blogs");

const requestMiddleware = (req, res, next) => {
    console.log('Request URL:', req.originalUrl, ' - ', new Date());
    next();
};


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(requestMiddleware);
app.set("view engine", "ejs");
app.set("views", "./static/view");
app.use("/api", [blogsRouter]);

app.get('/', async (req, res) => {
  res.render("index");
});

app.get('/blogs', async (req, res) => {
  res.render("com");
});

app.get('/detail', async (req, res) => {
  res.render("dt");
});

app.get('/borderCorrect', async (req, res) => {
  res.render("up");
});

app.listen(port, () => {
  console.log(port, '포트로 서버가 열렸어요!');
});

