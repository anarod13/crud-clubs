import * as fs from "fs";
import IListedTeam from "../entities/IListedTeam";
import ITeam from "../entities/IListedTeam";
import ITeamToUpdate from "../entities/ITeamToUpdate";

const LISTED_TEAMS_PATH = "./src/data/teams.json";
const TEAMS_DETAILS_PATH = "./src/data/teams/";
const TEAMS_CRESTS_PATH = "./src/data/teams/";

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

export function updateTeamData(teamToUpdate: ITeamToUpdate) {
  const teamFilePath = `${TEAMS_DETAILS_PATH}${teamToUpdate.tla}.json`;
  fs.writeFileSync(teamFilePath, JSON.stringify(teamToUpdate.teamData));
}
export function deleteTeamData(teamTLA: string) {
  const teamFilePath = `${TEAMS_DETAILS_PATH}${teamTLA}.json`;
  deleteFile(teamFilePath);
}
export function deleteTeamCrest(teamCrest: string) {
  const teamCrestPath = `${TEAMS_CRESTS_PATH}${teamCrest}.png`;
  deleteFile(teamCrestPath);
}

function deleteFile(filePath: string) {
  try {
    fs.statSync(filePath);
  } catch (e) {
    return false;
  }
  fs.unlinkSync(filePath);
}
