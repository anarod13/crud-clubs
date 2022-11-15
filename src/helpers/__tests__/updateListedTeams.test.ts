import fs from "fs";
import mockListedTeamData from "./fixtures/mockListedTeamData.json";
import { updateListedTeams } from "../dataBaseHelper";

jest.mock("fs");
const mockFS: jest.Mocked<typeof fs> = <jest.Mocked<typeof fs>>fs;

beforeAll(() => {
  mockFS.writeFileSync.mockClear();
  mockFS.writeFileSync.mockReturnValue();
});
it("Updates listed teams", () => {
  updateListedTeams(mockListedTeamData);
  expect(fs.writeFileSync).toHaveBeenCalledTimes(1);
  expect(fs.writeFileSync).toHaveBeenCalledWith(
    "./src/data/teams.json",
    JSON.stringify(mockListedTeamData)
  );
});
