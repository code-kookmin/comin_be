import express from 'express';
import editProfileService from '../service/editProfile';
const route = express.Router();
route.post('/', async (req, res) => {
    const user = req.body;
    const result = await editProfileService.editProfile(user);
    if (result === undefined)
        return res.sendStatus(400);
    return res.sendStatus(200);
});
export default route;
