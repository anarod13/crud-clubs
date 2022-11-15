import fs from "fs";
import { deleteTeamCrest } from "../dataBaseHelper";

jest.mock("fs");
const mockFS: jest.Mocked<typeof fs> = <jest.Mocked<typeof fs>>fs;
const mockTeamCrestUrl = "team-crests/mockTeam-crest.png";

beforeAll(() => {
  mockFS.unlinkSync.mockClear();
  mockFS.unlinkSync.mockReturnValue();
});
it("Deletes a team crest", () => {
  deleteTeamCrest(mockTeamCrestUrl);
  expect(fs.unlinkSync).toHaveBeenCalledTimes(1);
  expect(fs.unlinkSync).toHaveBeenCalledWith(
    "./src/data/crests/mockTeam-crest.png"
  );
});
// https://medium.com/nerd-for-tech/testing-in-node-js-easy-way-to-mock-filesystem-883b9f822ea4
