import { it, expect } from "vitest";
import mockListedTeamData from "./fixtures/mockListedTeamData.json";
import mockTeamData from "../../helpers/__tests__/fixtures/mockTeam.json";
import mapListedTeam from "../teamListedMapper";
import IListedTeam from "../../entities/IListedTeam";

it("Should return a team mapped", () => {
  const listedTeam = mapListedTeam(mockTeamData);
  expect(listedTeam).toEqual(mockListedTeamData);
});
