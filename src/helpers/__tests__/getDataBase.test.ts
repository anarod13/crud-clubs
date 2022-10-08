import fs from "fs";
import mockTeamData from "./fixtures/mockTeamData.json";
import { getDataBase } from "../dataBaseHelper";

jest.mock("fs");
const mockFS: jest.Mocked<typeof fs> = <jest.Mocked<typeof fs>>fs;

beforeAll(() => {
  mockFS.readFileSync.mockClear();
  mockFS.readFileSync.mockReturnValue(
    Buffer.from(JSON.stringify(mockTeamData))
  );
});
it("Gets data base", () => {
  const teamData = getDataBase();
  expect(fs.readFileSync).toHaveBeenCalledTimes(1);
  expect(fs.readFileSync).toHaveBeenCalledWith("src/data/teams.json");
  expect(teamData).toEqual(mockTeamData);
});
