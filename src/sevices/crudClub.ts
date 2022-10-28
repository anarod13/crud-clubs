import {
  getListedTeams,
  updateListedTeams,
  getTeamData,
  updateTeamData,
  deleteTeamData,
  deleteTeamCrest,
  createNewTeam,
} from "../helpers/dataBaseHelper";
import ITeam from "../entities/ITeam";
import IListedTeam from "../entities/IListedTeam";
import mapListedTeam from "../mappers/__tests__/fixtures/teamListedMapper";

const CREST_STORAGE = "team-crests";

export function getTeamsList(): IListedTeam[] {
  return getListedTeams();
}

export function getTeam(teamTla: string): ITeam {
  return getTeamData(teamTla);
}

export function updateTeam(teamTla: string, newTeamData: ITeam) {
  newTeamData.lastUpdated = new Date().toISOString();
  updateTeamData(teamTla, newTeamData);
  updateTeamInList(mapListedTeam(newTeamData));
  return getTeamData(teamTla);
}

export function updateTeamCrest(teamTla: string, crestFileName: string) {
  const teamData = getTeamData(teamTla);
  teamData.crestUrl = crestFileName;
  teamData.lastUpdated = new Date().toISOString();
  updateTeamData(teamTla, teamData);
  updateTeamInList(mapListedTeam(teamData));
  return teamData;
}

export function createTeam(newTeam: ITeam): ITeam {
  newTeam.id = getListedTeams().length;
  newTeam.lastUpdated = new Date().toISOString();
  createNewTeam(newTeam.tla, newTeam);
  addTeamToList(mapListedTeam(newTeam));
  return getTeamData(newTeam.tla);
}

export function deleteTeam(teamTla: string) {
  const teamCrestUrl = getTeamData(teamTla).crestUrl;
  deleteTeamData(teamTla);
  deleteTeamCrest(teamCrestUrl);
  deleteTeamInList(teamTla);
}

function addTeamToList(team: IListedTeam) {
  const listedTeams = getListedTeams();
  listedTeams.push(team);
  updateListedTeams(listedTeams);
}

function updateTeamInList(team: IListedTeam) {
  const listedTeams = getListedTeams();
  const teamIndex = findTeam(team.tla, listedTeams);
  listedTeams[teamIndex] = team;
  updateListedTeams(listedTeams);
}

function deleteTeamInList(teamTla: string) {
  const listedTeams = getListedTeams();
  const teamIndex = findTeam(teamTla, listedTeams);
  listedTeams.splice(teamIndex, 1);
  updateListedTeams(listedTeams);
}

function findTeam(teamTla: string, listedTeams: IListedTeam[]): number {
  const teamIndex = listedTeams.findIndex((team) => team.tla === teamTla);
  return teamIndex;
}
