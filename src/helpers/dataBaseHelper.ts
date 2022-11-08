import * as fs from "fs";
import IListedTeam from "../entities/IListedTeam";
import ITeam from "../entities/ITeam";
import ITeamToUpdate from "../entities/ITeamToUpdate";

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

export function getTeamData(teamTLA: string): ITeam {
  const teamFilePath = `${TEAMS_DETAILS_PATH}${teamTLA}.json`;
  const teamData = fs.readFileSync(teamFilePath);
  return JSON.parse(teamData.toString());
}

export function updateTeamData(teamTla: string, teamData: ITeam) {
  const teamFilePath = `${TEAMS_DETAILS_PATH}${teamTla}.json`;
  fs.writeFileSync(teamFilePath, JSON.stringify(teamData));
}
export function deleteTeamData(teamTLA: string) {
  const teamFilePath = `${TEAMS_DETAILS_PATH}${teamTLA}.json`;
  deleteFile(teamFilePath);
}
export function deleteTeamCrest(teamCrestUrl: string) {
  const teamCrestPath = teamCrestUrl.replace("team-crests/", TEAMS_CRESTS_PATH);
  deleteFile(teamCrestPath);
}

export function createNewTeam(teamTla: string, teamData: ITeam) {
  const newTeamPath = `${TEAMS_DETAILS_PATH}${teamTla}.json`;
  fs.writeFileSync(newTeamPath, JSON.stringify(teamData));
}

function deleteFile(filePath: string) {
  try {
    fs.statSync(filePath);
  } catch (e) {
    return false;
  }
  fs.unlinkSync(filePath);
}
