import express from "express";
import cors from "cors";
import multer from "multer";
import {
  getTeamsList,
  createTeam,
  getTeam,
  updateTeamCrest,
  deleteTeam,
  updateTeam,
} from "./services/crudClub";

const app = express();
const puerto = 8080;

const options: cors.CorsOptions = {
  origin: "*",
  allowedHeaders: "*",
  methods: "GET,PATCH,PUT,POST,DELETE",
};

app.use(cors(options));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/team-crests", express.static("./src/data/crests/"));

app.get("/", (req, res, next) => {
  try {
    const listedTeams = getTeamsList();
    res.send(JSON.stringify(listedTeams));
  } catch (err) {
    next(err);
  }
});
app.get("/team/:team", (req, res, next) => {
  const teamTla = req.params.team;
  try {
    const teamData = getTeam(teamTla);
    res.send(JSON.stringify(teamData));
  } catch (err) {
    next(err);
  }
});

app.patch("/team/:team/update", (req, res, next) => {
  const teamTla = req.params.team;
  const newTeamData = req.body;
  try {
    const editedTeam = updateTeam(teamTla, newTeamData);
    res.send(editedTeam);
  } catch (err) {
    next(err);
  }
});

app.post("/add", (req, res, next) => {
  try {
    const newTeamData = req.body;
    const newTeam = createTeam(newTeamData);
    res.send(newTeam);
  } catch (err) {
    next(err);
  }
});

app.delete("/team/:team/delete", (req, res, next) => {
  try {
    const teamTla = req.params.team;
    deleteTeam(teamTla);
    res.statusCode = 200;
    res.end();
  } catch (err) {
    next(err);
  }
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./src/data/crests/");
  },
  filename: function (req, file, cb) {
    const id = new Date().getTime();
    cb(null, `crest-${req.params.team}-${id}.png`);
  },
});
const upload = multer({ storage: storage });

app.post(
  "/team/:team/upload-crest",
  upload.single("crest"),
  function (req, res) {
    const teamTla = req.params.team;
    const crestFileName = (req as any).file.filename;
    const updatedTeamCrest = updateTeamCrest(teamTla, crestFileName);
    res.statusCode = 200;
    res.send(updatedTeamCrest);
  }
);

app.use((error, req, res, next) => {
  if (error.name == "ReferenceError") res.status(404).send(error.message);
  else if (error.name == "TypeError") res.status(400).send(error.message);
  else res.status(500).send("Something blew up, please try again");
});

app.listen(puerto);
