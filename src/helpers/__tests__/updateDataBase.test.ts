import fs from "fs";
import mockTeamData from "./fixtures/mockTeamData.json";
import { updateDataBase } from "../dataBaseHelper";

jest.mock("fs");
const mockFS: jest.Mocked<typeof fs> = <jest.Mocked<typeof fs>>fs;

beforeAll(() => {
  mockFS.writeFileSync.mockClear();
  mockFS.writeFileSync.mockReturnValue();
});
it("Updates data base", () => {
  updateDataBase(mockTeamData);
  expect(fs.writeFileSync).toHaveBeenCalledTimes(1);
  expect(fs.writeFileSync).toHaveBeenCalledWith(
    "src/data/teams.json",
    JSON.stringify(mockTeamData)
  );
});
