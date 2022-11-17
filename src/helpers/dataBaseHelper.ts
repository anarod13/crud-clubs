import * as fs from "fs";
import IListedTeam from "../entities/IListedTeam";
import ITeam from "../entities/ITeam";

const LISTED_TEAMS_PATH = "./src/data/teams.json";
const TEAMS_DETAILS_PATH = "./src/data/teams/";
const TEAMS_CRESTS_PATH = "./src/data/crests/";

export function getListedTeams(): IListedTeam[] {
  const listedTeams = fs.readFileSync(LISTED_TEAMS_PATH);
  return JSON.parse(listedTeams.toString());
}

export function updateListedTeams(updatedListedTeams: IListedTeam[]) {
  fs.writeFileSync(LISTED_TEAMS_PATH, JSON.stringify(updatedListedTeams));
}

export function getTeamData(teamTla: string): ITeam {
  try {
    const teamFilePath = `${TEAMS_DETAILS_PATH}${teamTla}.json`;
    const teamData = fs.readFileSync(teamFilePath);
    return JSON.parse(teamData.toString());
  } catch (err) {
    throw ReferenceError("No team found");
  }
}

export function updateTeamData(teamTla: string, teamData: ITeam) {
  const teamFilePath = `${TEAMS_DETAILS_PATH}${teamTla}.json`;
  checkIfTeamFileExist(teamTla);
  try {
    fs.writeFileSync(teamFilePath, JSON.stringify(teamData));
  } catch (err) {
    throw Error();
  }
}
export function deleteTeamData(teamTLA: string) {
  const teamFilePath = `${TEAMS_DETAILS_PATH}${teamTLA}.json`;
  deleteFile(teamFilePath);
}
export function deleteTeamCrest(teamCrestUrl: string) {
  const teamCrestPath = teamCrestUrl.replace("team-crests/", TEAMS_CRESTS_PATH);
  deleteFile(teamCrestPath);
}

export function checkIfTeamFileExist(teamTla: string) {
  const filePath = `${TEAMS_DETAILS_PATH}${teamTla}.json`;
  try {
    fs.statSync(filePath).isFile();
  } catch (err) {
    throw ReferenceError("Team not found");
  }
}

function deleteFile(filePath: string) {
  try {
    fs.statSync(filePath);
  } catch (err) {
    return;
  }
  fs.unlinkSync(filePath);
}
