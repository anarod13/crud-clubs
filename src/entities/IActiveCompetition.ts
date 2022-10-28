import type ITeamArea from "./ITeamArea";

export default interface IActiveCompetition {
  id: string;
  area: ITeamArea;
  name: string;
  code: string;
  plan: string;
  lastUpdated: string;
}
