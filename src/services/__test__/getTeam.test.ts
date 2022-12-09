import { vi, Mocked, beforeAll, it, expect } from "vitest";
import mockTeamData from "../../helpers/__tests__/fixtures/mockTeam.json";
import mockListedTeamData from "../../helpers/__tests__/fixtures/mockListedTeamData.json";

import fs from "fs";
import { getTeam } from "../crudClub.js";

vi.mock("fs");
const mockFS: Mocked<typeof fs> = <Mocked<typeof fs>>fs;

beforeAll(() => {
  mockFS.readFileSync.mockClear();
  mockFS.readFileSync.mockReturnValueOnce(
    Buffer.from(JSON.stringify(mockTeamData))
  );
});
it("Should return team's data", () => {
  const teamDataResult = getTeam("MUN");
  expect(teamDataResult).toEqual(mockTeamData);
});

it("Should throw a reference error if team doesn't exist", () => {
  expect(() => {
    getTeam("ASL");
  }).toThrow(ReferenceError("Team not found"));
});
