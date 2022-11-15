import fs from "fs";
import mockListedTeamData from "./fixtures/mockListedTeamData.json";
import { getListedTeams } from "../dataBaseHelper";

jest.mock("fs");
const mockFS: jest.Mocked<typeof fs> = <jest.Mocked<typeof fs>>fs;

beforeAll(() => {
  mockFS.readFileSync.mockClear();
  mockFS.readFileSync.mockReturnValue(
    Buffer.from(JSON.stringify(mockListedTeamData))
  );
});
it("Gets listed teams", () => {
  const teamData = getListedTeams();
  expect(fs.readFileSync).toHaveBeenCalledTimes(1);
  expect(fs.readFileSync).toHaveBeenCalledWith("./src/data/teams.json");
  expect(teamData).toEqual(mockListedTeamData);
});
