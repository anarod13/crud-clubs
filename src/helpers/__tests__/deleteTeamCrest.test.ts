import { vi, Mocked, beforeAll, it, expect } from "vitest";
import fs from "fs";
import { deleteTeamCrest } from "../dataBaseHelper";

vi.mock("fs");
const mockFS: Mocked<typeof fs> = <Mocked<typeof fs>>fs;
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
