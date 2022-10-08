import mockTeamData from "./fixtures/mockTeamData.json";
import { teamListedMapper } from "../teamMapper";
import TeamListed from "../TeamListed";

it("Returns a mapped team", () => {
  const listedTeam = teamListedMapper(mockTeamData);
  expect(listedTeam).toBeInstanceOf(TeamListed);
  expect(listedTeam).toEqual({
    id: 57,
    name: "Arsenal FC",
    country: "England",
  });
});
