import express from 'express';
import CommunityService from '../service/community';

const route = express.Router()
const communityService = new CommunityService
route.get(":categoryId/communities", async (req,res)=>{
    const categoryId = parseInt(req.params.categoryId);
    const result = await communityService.findByCategoryId(categoryId)
    if(!result) return res.sendStatus(400)
    return res.send(result)
})