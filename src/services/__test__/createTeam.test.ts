import { vi, Mocked, beforeAll, it, expect } from "vitest";
import mockNewTeamData from "../../helpers/__tests__/fixtures/mockTeam.json";
import mockListedTeams from "../../helpers/__tests__/fixtures/mockListedTeamData.json";
import mockNewTeamCreated from "./fixtures/mockCreatedTeam.json";
import mockTeamAddedList from "./fixtures/mockTeamAddedList.json";
import fs from "fs";
import { createTeam } from "../crudClub";

vi.mock("fs");
const mockFS: Mocked<typeof fs> = <Mocked<typeof fs>>fs;

beforeAll(() => {
  mockFS.readFileSync.mockClear();
  mockFS.readFileSync.mockReturnValueOnce(
    Buffer.from(JSON.stringify(mockListedTeams))
  );
  mockFS.readFileSync.mockReturnValueOnce(
    Buffer.from(JSON.stringify(mockNewTeamCreated))
  );
  mockFS.writeFileSync.mockClear();
  vi.useFakeTimers().setSystemTime(new Date("2022-10-10T17:17:21.576Z"));
});

it("Creates a new team", () => {
  const newTeam = createTeam(mockNewTeamData);
  expect(newTeam).toEqual(mockNewTeamCreated);
  expect(fs.readFileSync).toHaveBeenCalledTimes(2);
  expect(fs.readFileSync).toHaveBeenNthCalledWith(1, "./src/data/teams.json");
  expect(fs.readFileSync).toHaveBeenNthCalledWith(
    2,
    "./src/data/teams/MUN.json"
  );
  expect(fs.writeFileSync).toHaveBeenCalledTimes(2);
  expect(fs.writeFileSync).toHaveBeenNthCalledWith(
    1,
    "./src/data/teams/MUN.json",
    JSON.stringify(mockNewTeamCreated)
  );
  expect(fs.writeFileSync).toHaveBeenNthCalledWith(
    2,
    "./src/data/teams.json",
    JSON.stringify(mockTeamAddedList)
  );
});
