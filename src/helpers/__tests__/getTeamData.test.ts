import fs from "fs";
import mockTeam from "./fixtures/mockTeam.json";
import { getTeamData } from "../dataBaseHelper";

jest.mock("fs");
const mockFS: jest.Mocked<typeof fs> = <jest.Mocked<typeof fs>>fs;
const mockTeamTla = "mockTeam1";

beforeAll(() => {
  mockFS.readFileSync.mockClear();
  mockFS.readFileSync.mockReturnValue(Buffer.from(JSON.stringify(mockTeam)));
});
it("Gets team data", () => {
  const teamData = getTeamData(mockTeamTla);
  expect(fs.readFileSync).toHaveBeenCalledTimes(1);
  expect(fs.readFileSync).toHaveBeenCalledWith(
    `./src/data/teams/${mockTeamTla}.json`
  );
  expect(teamData).toEqual(mockTeam);
});
