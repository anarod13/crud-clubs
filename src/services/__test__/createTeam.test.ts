import { vi, Mocked, beforeAll, it, expect } from "vitest";
import fs from "fs";
import { createTeam } from "../crudClub";

vi.mock("fs");
const mockFS: Mocked<typeof fs> = <Mocked<typeof fs>>fs;
// const writeFile = jest.spyOn(fs, "writeFileSync");

beforeAll(() => {
  mockFS.readFileSync.mockClear();
  mockFS.readFileSync.mockReturnValue(
    Buffer.from(JSON.stringify(mockTeamData))
  );
  mockFS.writeFileSync.mockClear();
  mockFS.writeFileSync.mockReturnValue();
  jest.useFakeTimers().setSystemTime(new Date("2022-10-10T17:17:21.576Z"));
});

it("Edits team details", () => {
  createTeam(newTeam);
  expect(fs.readFileSync).toHaveBeenCalledTimes(2);
  expect(fs.readFileSync).toHaveBeenCalledWith("src/data/teams.json");
  expect(fs.writeFileSync).toHaveBeenCalledTimes(1);
  expect(fs.writeFileSync).toHaveBeenCalledWith(
    "src/data/teams.json",
    JSON.stringify(mockCreateTeamData)
  );
});
