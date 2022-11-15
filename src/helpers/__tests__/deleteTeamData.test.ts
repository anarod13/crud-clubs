import fs from "fs";
import { deleteTeamData } from "../dataBaseHelper";

jest.mock("fs");
const mockFS: jest.Mocked<typeof fs> = <jest.Mocked<typeof fs>>fs;
const mockTeamTla = "mockTeam1";

beforeAll(() => {
  mockFS.unlinkSync.mockClear();
  mockFS.unlinkSync.mockReturnValue();
});
it("Deletes team data", () => {
  deleteTeamData(mockTeamTla);
  expect(fs.unlinkSync).toHaveBeenCalledTimes(1);
  expect(fs.unlinkSync).toHaveBeenCalledWith(
    `./src/data/teams/${mockTeamTla}.json`
  );
});
// https://medium.com/nerd-for-tech/testing-in-node-js-easy-way-to-mock-filesystem-883b9f822ea4
