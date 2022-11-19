import { vi, Mocked, beforeAll, it, expect } from "vitest";
import mockListedTeamData from "../../helpers/__tests__/fixtures/mockListedTeamData.json";
import fs from "fs";
import { getTeamsList } from "../crudClub";

vi.mock("fs");
const mockFS: Mocked<typeof fs> = <Mocked<typeof fs>>fs;

beforeAll(() => {
  mockFS.readFileSync.mockClear();
  mockFS.readFileSync.mockReturnValue(
    Buffer.from(JSON.stringify(mockTeamData))
  );
});

it("Gets a teams list", () => {
  const teamsList = getTeamsList();
  expect(fs.readFileSync).toHaveBeenCalledTimes(1);
  expect(fs.readFileSync).toHaveBeenCalledWith("src/data/teams.json");
  expect(teamsList).toEqual(teamsListResult);
});
