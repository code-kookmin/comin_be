import express from "express";
import CommunityService from "../service/community";
import { User, isUser } from "../domain/user";
import { authChecker } from "../util/authChecker";
import { CommuntiyCreate } from "../domain/community/communityCreate";
import { CommunityUpdate } from "../domain/community/communityUpdate";
import { Role, roleToNumber } from "../domain/role";

const route = express.Router();
const communityService = new CommunityService();

route.get("/:id", async (req, res) => {
  const result = await communityService.findById(parseInt(req.params.id));
  if (!result) return res.sendStatus(400);
  return res.send(result);
});

route.post("/", async (req, res) => {
  const community: CommuntiyCreate = req.body;
  if (!authChecker.checkSaveDataAuth(req)) return res.sendStatus(400);
  if (!req.session.user) return res.sendStatus(400);
  const user = req.session.user;
  if (typeof community.userId === "number" && user.role === roleToNumber(Role.ROLE_USER)) {
    community.userId = user.id;
  } else if (typeof community.userId !== "number") {
    community.userId = user.id;
  }
  const result = await communityService.save(community);
  if (!result) return res.sendStatus(400);
  return res.sendStatus(200);
});

route.put("/:id", async (req, res) => {
  const community: CommunityUpdate = req.body;
  const id = parseInt(req.params.id);
  if (!(await authChecker.checkUpdateAndDeleteAuth(req, id, communityService))) return res.sendStatus(400);
  community.id = id;
  const result = await communityService.update(community);
  if (result === undefined) return res.sendStatus(400);
  return res.sendStatus(200);
});

route.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  if (!(await authChecker.checkUpdateAndDeleteAuth(req, id, communityService))) return res.sendStatus(400);
  const result = await communityService.deleteById(id);
  if (!result) return res.sendStatus(400);
  return res.sendStatus(200);
});

export default route;
