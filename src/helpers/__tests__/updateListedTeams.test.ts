import { vi, Mocked, beforeAll, it, expect } from "vitest";
import fs from "fs";
import mockListedTeamData from "./fixtures/mockListedTeamData.json";
import { updateListedTeams } from "../dataBaseHelper";

vi.mock("fs");
const mockFS: Mocked<typeof fs> = <Mocked<typeof fs>>fs;

beforeAll(() => {
  mockFS.writeFileSync.mockClear();
  mockFS.writeFileSync.mockReturnValue();
});
it("Should update listed teams", () => {
  updateListedTeams(mockListedTeamData);
  expect(fs.writeFileSync).toHaveBeenCalledTimes(1);
  expect(fs.writeFileSync).toHaveBeenCalledWith(
    "./src/data/teams.json",
    JSON.stringify(mockListedTeamData)
  );
});
