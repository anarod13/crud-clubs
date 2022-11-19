import { vi, Mocked, beforeAll, it, expect } from "vitest";
import mockTeamData from "../../helpers/__tests__/fixtures/mockTeam.json";
import fs from "fs";
import { getTeam } from "../crudClub";

jest.mock("fs");
const mockFS: jest.Mocked<typeof fs> = <jest.Mocked<typeof fs>>fs;
const teamData = {
  id: 58,
  area: { id: 2072, name: "England" },
  name: "Aston Villa FC",
  shortName: "Aston Villa",
  tla: "AST",
  crestUrl: "./",
  address: "Villa Park Birmingham B6 6HE",
  phone: "+44 (0121) 3272299",
  website: "http://www.avfc.co.uk",
  email: null,
  founded: 1872,
  clubColors: "Claret / Sky Blue",
  venue: "Villa Park",
  lastUpdated: "2020-05-14T02:41:36Z",
};

beforeAll(() => {
  mockFS.readFileSync.mockClear();
  mockFS.readFileSync.mockReturnValue(
    Buffer.from(JSON.stringify(mockTeamData))
  );
});

it("Returns team data", () => {
  const teamDataResult = getTeam(58);
  expect(fs.readFileSync).toHaveBeenCalledTimes(1);
  expect(fs.readFileSync).toHaveBeenCalledWith("src/data/teams.json");
  expect(teamDataResult).toEqual(teamData);
});
