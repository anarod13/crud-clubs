import fs from "fs";
import mockTeam from "./fixtures/mockTeam.json";
import { updateTeamData } from "../dataBaseHelper";

jest.mock("fs");
const mockFS: jest.Mocked<typeof fs> = <jest.Mocked<typeof fs>>fs;
const mockTeamTla = "mockTeam1";

beforeAll(() => {
  mockFS.writeFileSync.mockClear();
  mockFS.writeFileSync.mockReturnValue();
});
it("Updates team data", () => {
  updateTeamData(mockTeamTla, mockTeam);
  expect(fs.writeFileSync).toHaveBeenCalledTimes(1);
  expect(fs.writeFileSync).toHaveBeenCalledWith(
    `./src/data/teams/${mockTeamTla}.json`,
    JSON.stringify(mockTeam)
  );
});
