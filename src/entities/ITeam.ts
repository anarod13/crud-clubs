import IActiveCompetition from "./IActiveCompetition.js";
import type ITeamArea from "./ITeamArea.js";
import ITeamMember from "./ITeamMember.js";

export default interface ITeam {
  id: number;
  area: ITeamArea;
  name: string;
  activeCompetitions: IActiveCompetition[];
  squad: ITeamMember[];
  shortName: string;
  tla: string;
  crestUrl: string;
  address: string;
  phone: string | null;
  website: string;
  email: string | null;
  founded: number | null;
  clubColors: string;
  venue: string;
  lastUpdated: string;
}
