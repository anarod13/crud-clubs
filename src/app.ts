import express from "express";
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
app.get("/:team", (req, res) => {
  try {
    const teamId = Number(req.params.team);
    const teamData = getTeam(teamId);
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

app.patch("/:team/update", (req, res) => {
  try {
    const teamId = Number(req.params.team);
    const newTeamData = req.body;
    const editedTeam = updateTeam(teamId, newTeamData);
    res.send(editedTeam);
  } catch (e) {
    res.status(404).send("We couldn't find that team!");
    console.error(e);
  }
});

app.put("/add", (req, res) => {
  try {
    const newTeamData = req.body;
    const newTeam = createTeam(newTeamData);
    res.send(newTeam);
  } catch (e) {
    console.error(e);
  }
});

app.delete("/:team/delete", (req, res) => {
  try {
    const teamId = Number(req.params.team);
    deleteTeam(teamId);
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
    cb(null, req.params.team + "-crest.jpg");
  },
});
const upload = multer({ storage: storage });

app.post("/:team/upload-crest", upload.single("crest"), function (req, res) {
  const teamId = Number(req.params.team);
  updateTeamCrest(teamId);
  res.statusCode = 200;
  res.end();
});

app.listen(puerto);
