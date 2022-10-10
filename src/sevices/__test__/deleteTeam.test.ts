import mockTeamData from "../../helpers/__tests__/fixtures/mockTeamData.json";
import mockDeleteTeamData from "./fixtures/mockDeleteTeamData.json";
import fs from "fs";
import { deleteTeam } from "../crudClub";

jest.mock("fs");
const mockFS: jest.Mocked<typeof fs> = <jest.Mocked<typeof fs>>fs;
const newTeam = {
  id: 5,
  area: { id: 2072, name: "England" },
  name: "Nottingham Forest FC",
  shortName: "NTF",
  tla: null,
  crestUrl: null,
  address: null,
  phone: null,
  website: null,
  email: null,
  founded: null,
  clubColors: null,
  venue: "The City Ground",
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
  deleteTeam(62);
  expect(fs.readFileSync).toHaveBeenCalledTimes(1);
  expect(fs.readFileSync).toHaveBeenCalledWith("src/data/teams.json");
  expect(fs.writeFileSync).toHaveBeenCalledTimes(1);
  expect(fs.writeFileSync).toHaveBeenCalledWith(
    "src/data/teams.json",
    JSON.stringify(mockDeleteTeamData)
  );
});
