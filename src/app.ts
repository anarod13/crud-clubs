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
} from "./sevices/crudClub";

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

app.get("/", (req, res) => {
  try {
    const listedTeams = getTeamsList();
    res.send(JSON.stringify(listedTeams));
  } catch (err) {
    console.error(err);
    return;
  }
});
app.get("/team/:team", (req, res) => {
  try {
    const teamTla = req.params.team;
    const teamData = getTeam(teamTla);
    if (teamData) {
      res.send(JSON.stringify(teamData));
    } else {
      res.status(404).send("We couldn't find that team!");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "something blew up" });
  }
});

app.patch("/team/:team/update", (req, res) => {
  try {
    const teamTla = req.params.team;
    const newTeamData = req.body;
    const editedTeam = updateTeam(teamTla, newTeamData);
    res.send(editedTeam);
  } catch (e) {
    res.status(404).send("We couldn't find that team!");
    console.error(e);
  }
});

app.post("/add", (req, res) => {
  try {
    const newTeamData = req.body;
    const newTeam = createTeam(newTeamData);
    res.send(newTeam);
  } catch (e) {
    console.error(e);
  }
});

app.delete("/team/:team/delete", (req, res) => {
  try {
    const teamTla = req.params.team;
    deleteTeam(teamTla);
    res.statusCode = 200;
    res.end();
  } catch (e) {
    console.error(e);
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

app.listen(puerto);
