import { vi, Mocked, beforeAll, it, expect } from "vitest";
import mockListedTeamData from "../../helpers/__tests__/fixtures/mockListedTeamData.json";
import mockTeamData from "./fixtures/mockUpdatedTeam.json";
import mockDeleteTeamData from "./fixtures/mockDeleteListedTeamData.json";
import fs from "fs";
import { deleteTeam } from "../crudClub";

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
  mockFS.readFileSync.mockClear();
  mockFS.statSync.mockReturnValue(fileStats);
  mockFS.readFileSync.mockReturnValueOnce(
    Buffer.from(JSON.stringify(mockTeamData))
  );
  mockFS.readFileSync.mockReturnValueOnce(
    Buffer.from(JSON.stringify(mockListedTeamData))
  );
  mockFS.unlinkSync.mockReturnValue();

  mockFS.writeFileSync.mockClear();
  mockFS.writeFileSync.mockReturnValue();
  vi.useFakeTimers().setSystemTime(new Date("2022-10-10T17:17:21.576Z"));
});

it("Should delete a team", () => {
  deleteTeam("EVE");
  expect(fs.readFileSync).toHaveBeenCalledTimes(2);
  expect(fs.readFileSync).toHaveBeenNthCalledWith(
    1,
    "./src/data/teams/EVE.json"
  );
  expect(fs.readFileSync).toHaveBeenNthCalledWith(2, "./src/data/teams.json");
  expect(fs.unlinkSync).toHaveBeenCalledTimes(2);
  expect(fs.unlinkSync).toHaveBeenNthCalledWith(
    1,
    "./src/data/crests/EVE-crest.png"
  );
  expect(fs.unlinkSync).toHaveBeenNthCalledWith(2, "./src/data/teams/EVE.json");
  expect(fs.writeFileSync).toHaveBeenCalledTimes(1);
  expect(fs.writeFileSync).toHaveBeenCalledWith(
    "./src/data/teams.json",
    JSON.stringify(mockDeleteTeamData)
  );
});
