import express from "express";
import multer from "multer";
import * as fs from "fs";
import * as url from "url";
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

const app = express();
const puerto = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/team-crests", express.static("./src/data/crests/"));

const data = fs.readFileSync("src/data/teams.json");
const listedTeams = JSON.parse(data);

app.get("/", (req, res) => {
  try {
    res.end(JSON.stringify(listedTeams));
  } catch (err) {
    console.error(err);
    return;
  }
});

app.get("/:team", (req, res) => {
  try {
    const team = listedTeams.find(
      (team) => team.id === Number(req.params.team)
    );
    res.end(JSON.stringify(team));
  } catch (err) {
    console.error(err);
    return;
  }
});

app.patch("/:team/edit", (req, res) => {
  try {
    const editedTeamId = Number(req.params.team);
    const editedTeam = req.body;
    editedTeam.lastUpdated = new Date();
    const editedTeamIndex = listedTeams.findIndex(
      (team) => team.id === editedTeamId
    );
    listedTeams[editedTeamIndex] = editedTeam;
    fs.writeFileSync("src/data/teams.json", JSON.stringify(listedTeams));
    res.end();
  } catch (e) {
    console.error(e);
  }
});

app.put("/add", (req, res) => {
  try {
    const newTeam = req.body;

    const newTeamId = listedTeams.length;
    newTeam.id = newTeamId;
    newTeam.lastUpdated = new Date();
    listedTeams.push(newTeam);
    fs.writeFileSync("src/data/teams.json", JSON.stringify(listedTeams));
    res.end();
  } catch (e) {
    console.log(e);
  }
});

app.delete("/:team/delete", (req, res) => {
  try {
    const team = listedTeams.find(
      (team) => team.id === Number(req.params.team)
    );
    listedTeams.splice(listedTeams.indexOf(team), 1);
    fs.writeFileSync("src/data/teams.json", JSON.stringify(listedTeams));
    res.end();
  } catch (e) {
    console.log(e);
    3;
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
// const upload = multer({ dest: "./src/data/crests/" });
app.post("/:team/upload-crest", upload.single("crest"), function (req, res) {
  res.send("hi");
});

app.listen(puerto);
