import { vi, Mocked, beforeAll, it, expect } from "vitest";
import fs from "fs";
import mockListedTeamData from "./fixtures/mockListedTeamData.json";
import { getListedTeams } from "../dataBaseHelper";

vi.mock("fs");
const mockFS: Mocked<typeof fs> = <Mocked<typeof fs>>fs;

beforeAll(() => {
  mockFS.readFileSync.mockClear();
  mockFS.readFileSync.mockReturnValue(
    Buffer.from(JSON.stringify(mockListedTeamData))
  );
});
it("Gets listed teams", () => {
  const teamData = getListedTeams();
  expect(fs.readFileSync).toHaveBeenCalledTimes(1);
  expect(fs.readFileSync).toHaveBeenCalledWith("./src/data/teams.json");
  expect(teamData).toEqual(mockListedTeamData);
});
