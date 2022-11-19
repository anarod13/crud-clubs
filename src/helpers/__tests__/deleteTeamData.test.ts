import { vi, Mocked, beforeAll, it, expect } from "vitest";
import fs from "fs";
import { deleteTeamData } from "../dataBaseHelper";

vi.mock("fs");
const mockFS: Mocked<typeof fs> = <Mocked<typeof fs>>fs;
const mockTeamTla = "mockTeam1";

beforeAll(() => {
  mockFS.unlinkSync.mockClear();
  mockFS.unlinkSync.mockReturnValue();
});
it("Should delete team data", () => {
  deleteTeamData(mockTeamTla);
  expect(fs.unlinkSync).toHaveBeenCalledTimes(1);
  expect(fs.unlinkSync).toHaveBeenCalledWith(
    `./src/data/teams/${mockTeamTla}.json`
  );
});
