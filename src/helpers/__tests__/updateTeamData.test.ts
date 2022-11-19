import { vi, Mocked, beforeAll, it, expect } from "vitest";
import fs from "fs";
import mockTeam from "./fixtures/mockTeam.json";
import { updateTeamData } from "../dataBaseHelper";

vi.mock("fs");
const mockFS: Mocked<typeof fs> = <Mocked<typeof fs>>fs;
const mockTeamTla = "mockTeam1";
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
  mockFS.writeFileSync.mockReturnValue();
  mockFS.statSync.mockReturnValueOnce(null);
  mockFS.statSync.mockReturnValueOnce(fileStats);
});

it("Throws error if file is not found", () => {
  expect(() => {
    updateTeamData(mockTeamTla, mockTeam);
  }).toThrow(ReferenceError("Team not found"));
});

it("Updates team data", () => {
  updateTeamData(mockTeamTla, mockTeam);
  expect(fs.writeFileSync).toHaveBeenCalledTimes(1);
  expect(fs.writeFileSync).toHaveBeenCalledWith(
    `./src/data/teams/${mockTeamTla}.json`,
    JSON.stringify(mockTeam)
  );
});
