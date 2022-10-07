import type ITeam from "../data/ITeam";
import TeamListed from "../helpers/TeamListed";

export function teamListedMapper(team: ITeam): TeamListed {
  return new TeamListed(team.id, team.name, team.area.name);
}
