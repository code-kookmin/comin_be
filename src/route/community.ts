import express from 'express';
import CommunityService from '../service/community';
import { User, isUser } from '../domain/user/user';
import { Communtiy, isCommunityCreate } from '../domain/community';
import { authChecker } from '../util/authChecker';

const route = express.Router();
const communityService = new CommunityService;

route.get('/:id', async (req, res) => {
  const result = await communityService.findById(parseInt(req.params.id));
  if (!result) return res.sendStatus(400);
  return res.send(result);
});

route.post('/', async (req, res) => {
  const community: Communtiy = req.body;
  const user: User | undefined = req.session.user;
  if (!user || !isUser(user)) return res.sendStatus(400);
  community.userId = user.id;
  const result = await communityService.save(community);
  if (!result) return res.sendStatus(400);
  return res.sendStatus(200);
});

route.put('/:id', async (req, res) => {
  const community = req.body;
  const id = parseInt(req.params.id);
  if(!(await authChecker.checkUpdateAndDeleteAuth(req,id,communityService))) return res.sendStatus(400);
  const result = await communityService.update(id, community);
  if (result === undefined) return res.sendStatus(400);
  return res.sendStatus(200);
});

route.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  if(!(await authChecker.checkUpdateAndDeleteAuth(req,id,communityService))) return res.sendStatus(400);
  const result = await communityService.deleteById(id);
  if (!result) return res.sendStatus(400);
  return res.sendStatus(200);
});

export default route;
