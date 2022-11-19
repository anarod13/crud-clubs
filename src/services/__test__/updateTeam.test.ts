import { vi, Mocked, beforeAll, it, expect } from "vitest";
import mockTeamData from "../../helpers/__tests__/fixtures/mockTeamData.json";
import mockTeamUpdatedData from "./fixtures/mockTeamData.json";
import fs from "fs";
import { updateTeam } from "../crudClub";

vi.mock("fs");
const mockFS: Mocked<typeof fs> = <Mocked<typeof fs>>fs;

beforeAll(() => {
  mockFS.readFileSync.mockClear();
  mockFS.readFileSync.mockReturnValue(
    Buffer.from(JSON.stringify(mockTeamData))
  );
  mockFS.writeFileSync.mockClear();
  mockFS.writeFileSync.mockReturnValue();
  vi.useFakeTimers().setSystemTime(new Date("2022-10-10T17:17:21.576Z"));
});

it("Edits team details", () => {
  updateTeam(teamData.id, teamData);
  expect(fs.readFileSync).toHaveBeenCalledTimes(2);
  expect(fs.readFileSync).toHaveBeenCalledWith("src/data/teams.json");
  expect(fs.writeFileSync).toHaveBeenCalledTimes(1);
  expect(fs.writeFileSync).toHaveBeenCalledWith(
    "src/data/teams.json",
    JSON.stringify(mockTeamUpdatedData)
  );
});
