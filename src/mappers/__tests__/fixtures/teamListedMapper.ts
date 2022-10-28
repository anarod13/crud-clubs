import IListedTeam from "../../../entities/IListedTeam";
import ITeam from "../../../entities/ITeam";

export default function mapListedTeam(teamData: ITeam): IListedTeam {
  const {
    id,
    area,
    name,
    shortName,
    tla,
    crestUrl,
    address,
    phone,
    website,
    email,
    founded,
    clubColors,
    venue,
    lastUpdated,
  } = teamData;

  return {
    id,
    area,
    name,
    shortName,
    tla,
    crestUrl,
    address,
    phone,
    website,
    email,
    founded,
    clubColors,
    venue,
    lastUpdated,
  };
}
