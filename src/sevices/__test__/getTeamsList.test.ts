import mockTeamData from "../../helpers/__tests__/fixtures/mockTeamData.json";
import fs from "fs";
import { getTeamsList } from "../crudClub";

jest.mock("fs");
const mockFS: jest.Mocked<typeof fs> = <jest.Mocked<typeof fs>>fs;
const teamsListResult = [
  { id: 57, name: "Arsenal FC", country: "England" },
  { id: 58, name: "Aston Villa FC", country: "England" },
  { id: 61, name: "Chelsea FC", country: "England" },
  { id: 62, name: "Everton FC", country: "England" },
];

beforeAll(() => {
  mockFS.readFileSync.mockClear();
  mockFS.readFileSync.mockReturnValue(
    Buffer.from(JSON.stringify(mockTeamData))
  );
});

it("Gets a teams list", () => {
  const teamsList = getTeamsList();
  expect(fs.readFileSync).toHaveBeenCalledTimes(1);
  expect(fs.readFileSync).toHaveBeenCalledWith("src/data/teams.json");
  expect(teamsList).toEqual(teamsListResult);
});
