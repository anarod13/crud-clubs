import { vi, Mocked, beforeAll, it, expect } from "vitest";
import fs from "fs";
import mockTeam from "./fixtures/mockTeam.json";
import { getTeamData } from "../dataBaseHelper.js";

vi.mock("fs");
const mockFS: Mocked<typeof fs> = <Mocked<typeof fs>>fs;
const mockTeamTla = "mockTeam1";

beforeAll(() => {
  mockFS.readFileSync.mockClear();
  mockFS.readFileSync.mockReturnValue(Buffer.from(JSON.stringify(mockTeam)));
});
it("Should get team data", () => {
  const teamData = getTeamData(mockTeamTla);
  expect(fs.readFileSync).toHaveBeenCalledTimes(1);
  expect(fs.readFileSync).toHaveBeenCalledWith(
    `./src/data/teams/${mockTeamTla}.json`
  );
  expect(teamData).toEqual(mockTeam);
});
