import fs from "fs";
import { checkIfTeamFileExist } from "../dataBaseHelper";

jest.mock("fs");
const mockFS: jest.Mocked<typeof fs> = <jest.Mocked<typeof fs>>fs;
const mockTeamTla = "mockTeam1";

beforeAll(() => {
  mockFS.statSync.mockClear();
});
it("Checks if file exist", () => {
  expect(() => {
    checkIfTeamFileExist(mockTeamTla);
  }).toThrow(ReferenceError("Team not found"));
});
