import { teamListedMapper } from "../mappers/teamMapper";
import {
  checkIfFileExists,
  deleteFile,
  getDataBase,
  updateDataBase,
} from "../helpers/dataBaseHelper";
import ITeam from "../data/ITeam";

const CREST_STORAGE = "team-crests";

export function getTeamsList(): ITeam[] {
  const teams = getDataBase();
  const listedTeams = [];
  teams.forEach((team) => {
    const listedTeam = teamListedMapper(team);
    listedTeams.push(listedTeam);
  });
  return listedTeams;
}

export function getTeam(teamId: number): ITeam {
  const teams = getDataBase();
  const teamIndex = findTeam(teamId, teams);
  const teamData = teams[teamIndex];
  return teamData;
}

export function updateTeam(teamId: number, newTeamData: ITeam): ITeam {
  const listedTeams = getDataBase();
  newTeamData.lastUpdated = new Date().toISOString();
  const teamIndex = findTeam(teamId, listedTeams);
  listedTeams[teamIndex] = newTeamData;
  updateDataBase(listedTeams);
  const updatedListedTeams = getDataBase();
  return updatedListedTeams[teamIndex];
}

export function updateTeamCrest(teamId: number) {
  const listedTeams = getDataBase();
  const teamIndex = findTeam(teamId, listedTeams);
  listedTeams[teamIndex].crestUrl = `${CREST_STORAGE}/${teamId}-crest.png`;
  listedTeams[teamIndex].lastUpdated = new Date().toISOString();
  updateDataBase(listedTeams);
}

export function createTeam(newTeam: ITeam): ITeam {
  const listedTeams = getDataBase();
  const newTeamId = listedTeams.length;
  newTeam.id = newTeamId;
  newTeam.lastUpdated = new Date().toISOString();
  listedTeams.push(newTeam);
  updateDataBase(listedTeams);
  const updatedListedTeams = getDataBase();
  return updatedListedTeams[newTeamId];
}

export function deleteTeam(teamId: number) {
  const listedTeams = getDataBase();
  const teamIndex = findTeam(teamId, listedTeams);
  const crestFilePath = getCrestFilePath(listedTeams[teamIndex].crestUrl);
  if (checkIfFileExists(crestFilePath)) deleteFile(crestFilePath);
  listedTeams.splice(teamIndex, 1);
  updateDataBase(listedTeams);
}

function findTeam(teamId: number, listedTeams: ITeam[]): number {
  const teamIndex = listedTeams.findIndex((team) => team.id === teamId);
  return teamIndex;
}

function getCrestFilePath(crestUrl: string): string {
  return crestUrl.replace("team-crests", "src/data/crests");
}
