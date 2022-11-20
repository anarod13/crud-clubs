import { vi, Mocked, beforeAll, it, expect } from "vitest";
import fs from "fs";
import mockTeam from "./fixtures/mockTeam.json";
import { createNewTeam } from "../dataBaseHelper.js";

vi.mock("fs");
const mockFS: Mocked<typeof fs> = <Mocked<typeof fs>>fs;
const mockTeamTla = "mockTeam1";

beforeAll(() => {
  mockFS.writeFileSync.mockClear();
  mockFS.writeFileSync.mockReturnValue();
});
it("Should create a new team", () => {
  createNewTeam(mockTeamTla, mockTeam);
  expect(fs.writeFileSync).toHaveBeenCalledTimes(1);
  expect(fs.writeFileSync).toHaveBeenCalledWith(
    `./src/data/teams/${mockTeamTla}.json`,
    JSON.stringify(mockTeam)
  );
});
