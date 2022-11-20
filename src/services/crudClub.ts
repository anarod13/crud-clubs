import {
  getListedTeams,
  updateListedTeams,
  getTeamData,
  updateTeamData,
  deleteTeamData,
  deleteTeamCrest,
  createNewTeam,
} from "../helpers/dataBaseHelper.js";
import ITeam from "../entities/ITeam.js";
import IListedTeam from "../entities/IListedTeam.js";
import mapListedTeam from "../mappers/teamListedMapper.js";

const CREST_STORAGE = "team-crests";

export function getTeamsList(): IListedTeam[] {
  return getListedTeams();
}

export function getTeam(teamTla: string): ITeam {
  return getTeamData(teamTla);
}

export function updateTeam(teamTla: string, newTeamData: ITeam): ITeam {
  if (checkTeamData(newTeamData)) {
    newTeamData.lastUpdated = new Date().toISOString();
    updateTeamData(teamTla, newTeamData);
    updateTeamInList(mapListedTeam(newTeamData));
    return getTeamData(teamTla);
  } else {
    throw new TypeError("Wrong team data");
  }
}

export function updateTeamCrest(teamTla: string, crestFileName: string) {
  const teamData = getTeamData(teamTla);
  deleteTeamCrest(teamData.crestUrl);
  teamData.crestUrl = `${CREST_STORAGE}/${crestFileName}`;
  teamData.lastUpdated = new Date().toISOString();
  updateTeamData(teamTla, teamData);
  updateTeamInList(mapListedTeam(teamData));
  return teamData.crestUrl;
}

export function createTeam(newTeam: ITeam): ITeam {
  if (checkTeamData(newTeam)) {
    const listedTeams = getListedTeams();
    newTeam.id = listedTeams.length;
    newTeam.lastUpdated = new Date().toISOString();
    createNewTeam(newTeam.tla, newTeam);
    addTeamToList(mapListedTeam(newTeam), listedTeams);
    return getTeamData(newTeam.tla);
  } else {
    throw TypeError("Wrong team data");
  }
}

export function deleteTeam(teamTla: string) {
  const teamCrestUrl = getTeamData(teamTla).crestUrl;
  if (teamCrestUrl) deleteTeamCrest(teamCrestUrl);
  deleteTeamData(teamTla);
  deleteTeamInList(teamTla);
}

function addTeamToList(team: IListedTeam, listedTeams: IListedTeam[]) {
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

function checkTeamData(data: any): data is ITeam {
  return (
    "name" in data &&
    typeof data["name"] === "string" &&
    "area" in data &&
    "activeCompetitions" in data &&
    "squad" in data &&
    "shortName" in data &&
    typeof data["shortName"] === ("string" || null) &&
    "tla" in data &&
    typeof data["tla"] === "string" &&
    "crestUrl" in data &&
    typeof data["crestUrl"] === ("string" || null) &&
    "address" in data &&
    typeof data["address"] === ("string" || null) &&
    "phone" in data &&
    typeof data["phone"] === ("string" || null) &&
    "website" in data &&
    typeof data["website"] === ("string" || null) &&
    "email" in data &&
    typeof data["email"] === ("string" || null) &&
    "founded" in data &&
    typeof data["founded"] === ("number" || null) &&
    "clubColors" in data &&
    typeof data["clubColors"] === ("string" || null) &&
    "venue" in data &&
    typeof data["venue"] === ("string" || null) &&
    "lastUpdated" in data &&
    typeof data["lastUpdated"] === ("string" || null)
  );
}
