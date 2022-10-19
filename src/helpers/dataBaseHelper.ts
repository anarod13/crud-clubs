import * as fs from "fs";
import ITeam from "../data/ITeam";

const DATA_SOURCE = "src/data/teams.json";

export function getDataBase(): ITeam[] {
  const teamData = fs.readFileSync(DATA_SOURCE);
  const listedTeams = JSON.parse(teamData.toString());
  return listedTeams;
}

export function updateDataBase(updateTeamList: ITeam[]) {
  fs.writeFileSync(DATA_SOURCE, JSON.stringify(updateTeamList));
}

export function checkIfFileExists(filePath: string) {
  try {
    fs.statSync(filePath);
  } catch (e) {
    return false;
  }
  return true;
}

export function deleteFile(filePath: string) {
  fs.unlinkSync(filePath);
}
