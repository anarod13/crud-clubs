import { vi, Mocked, beforeAll, it, expect } from "vitest";
import fs from "fs";
import { checkIfTeamFileExist } from "../dataBaseHelper";

vi.mock("fs");
const mockFS: Mocked<typeof fs> = <Mocked<typeof fs>>fs;
const mockTeamTla = "mockTeam1";

beforeAll(() => {
  mockFS.statSync.mockClear();
});
it("Checks if file exist", () => {
  expect(() => {
    checkIfTeamFileExist(mockTeamTla);
  }).toThrow(ReferenceError("Team not found"));
});
