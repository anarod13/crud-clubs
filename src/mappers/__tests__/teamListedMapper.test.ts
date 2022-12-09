import { it, expect } from "vitest";
import mockListedTeamData from "./fixtures/mockListedTeamData.json";
import mockTeamData from "../../helpers/__tests__/fixtures/mockTeam.json";
import mapListedTeam from "../teamListedMapper.js";
import IListedTeam from "../../entities/IListedTeam.js";

it("Should return a team mapped", () => {
  const listedTeam = mapListedTeam(mockTeamData);
  expect(listedTeam).toEqual(mockListedTeamData);
});
