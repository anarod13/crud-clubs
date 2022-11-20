import { vi, Mocked, beforeAll, it, expect } from "vitest";
import mockUpdatedTeamData from "./fixtures/mockUpdatedTeam.json";
import mockListedTeamData from "../../helpers/__tests__/fixtures/mockListedTeamData.json";
import mockUpdatedListedTeamData from "./fixtures/mockUpdatedListedTeamData.json";
import mockWrongTeamData from "./fixtures/mockWrongTeamData.json";
import fs from "fs";
import { updateTeam } from "../crudClub.js";

vi.mock("fs");
const mockFS: Mocked<typeof fs> = <Mocked<typeof fs>>fs;
const fileStats: fs.Stats = {
  dev: 3229478529,
  mode: 33206,
  nlink: 1,
  uid: 0,
  gid: 0,
  rdev: 0,
  blksize: 4096,
  ino: 1970324837039946,
  size: 0,
  blocks: 0,
  atimeMs: 1582306776282,
  mtimeMs: 1582482953967,
  ctimeMs: 1582482953968.2532,
  birthtimeMs: 1582306776282.142,
  atime: new Date("2020-02-21T17:39:36.282Z"),
  mtime: new Date("2020-02-23T18:35:53.967Z"),
  ctime: new Date("2020-02-23T18:35:53.968Z"),
  birthtime: new Date("2020-02-21T17:39:36.282Z"),
  isFile: () => true,
  isDirectory: () => true,
  isBlockDevice: () => true,
  isCharacterDevice: () => true,
  isSymbolicLink: () => true,
  isFIFO: () => true,
  isSocket: () => true,
};

beforeAll(() => {
  mockFS.writeFileSync.mockClear();
  mockFS.statSync.mockReturnValue(fileStats);
  mockFS.readFileSync.mockReturnValueOnce(
    Buffer.from(JSON.stringify(mockListedTeamData))
  );
  mockFS.readFileSync.mockReturnValueOnce(
    Buffer.from(JSON.stringify(mockUpdatedTeamData))
  );
  mockFS.writeFileSync.mockReturnValue();
  vi.useFakeTimers().setSystemTime(new Date("2022-10-10T17:17:21.576Z"));
});

it("Should update team details", () => {
  const updatedTeam = updateTeam(mockUpdatedTeamData.tla, mockUpdatedTeamData);
  expect(updatedTeam).toEqual(mockUpdatedTeamData);
  expect(fs.readFileSync).toHaveBeenCalledTimes(2);
  expect(fs.readFileSync).toHaveBeenCalledWith("./src/data/teams.json");
  expect(fs.readFileSync).toHaveBeenCalledWith("./src/data/teams/EVE.json");
  expect(fs.writeFileSync).toHaveBeenCalledTimes(2);
  expect(fs.writeFileSync).toHaveBeenNthCalledWith(
    1,
    "./src/data/teams/EVE.json",
    JSON.stringify(mockUpdatedTeamData)
  );
  expect(fs.writeFileSync).toHaveBeenNthCalledWith(
    2,
    "./src/data/teams.json",
    JSON.stringify(mockUpdatedListedTeamData)
  );
});

it("Should theow a type error when team data is incomplete", () => {
  expect(() => {
    updateTeam(mockWrongTeamData.tla, mockWrongTeamData as any);
  }).toThrow(TypeError("Wrong team data"));
});
