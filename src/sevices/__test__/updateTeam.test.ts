import mockTeamData from "../../helpers/__tests__/fixtures/mockTeamData.json";
import mockTeamUpdatedData from "./fixtures/mockTeamData.json";
import fs from "fs";
import { editTeam } from "../crudClub";

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
  email: "foundation@avfc.co.uk",
  founded: 1872,
  clubColors: "Claret / Sky Blue",
  venue: "Villa Park",
  lastUpdated: "",
};

beforeAll(() => {
  mockFS.readFileSync.mockClear();
  mockFS.readFileSync.mockReturnValue(
    Buffer.from(JSON.stringify(mockTeamData))
  );
  mockFS.writeFileSync.mockClear();
  mockFS.writeFileSync.mockReturnValue();
  jest.useFakeTimers().setSystemTime(new Date("2022-10-10T17:17:21.576Z"));
});

it("Edits team details", () => {
  editTeam(teamData.id, teamData);
  expect(fs.readFileSync).toHaveBeenCalledTimes(2);
  expect(fs.readFileSync).toHaveBeenCalledWith("src/data/teams.json");
  expect(fs.writeFileSync).toHaveBeenCalledTimes(1);
  expect(fs.writeFileSync).toHaveBeenCalledWith(
    "src/data/teams.json",
    JSON.stringify(mockTeamUpdatedData)
  );
});
