import express from 'express';
import communityService from '../service/community';
const route = express.Router();
route.get('/:id', async (req, res) => {
    if (isNaN(parseInt(req.params.id)))
        return res.sendStatus(400);
    try {
        const result = await communityService.findById(parseInt(req.params.id));
        if (!result)
            return res.sendStatus(400);
        return res.send(result);
    }
    catch (err) {
        console.log(err);
        return res.sendStatus(400);
    }
});
route.post('/', async (req, res) => {
    const { title, category, content } = req.body;
    if (typeof title !== 'string' ||
        typeof category !== 'string' ||
        typeof content !== 'string')
        return res.sendStatus(400);
    try {
        const result = await communityService.save(title, category, content);
        if (result === undefined)
            return res.sendStatus(400);
        return res.sendStatus(200);
    }
    catch (err) {
        console.log(err);
        return res.sendStatus(400);
    }
});
route.delete('/', async (req, res) => {
    const id = req.body.id;
    if (typeof id !== 'number')
        return res.sendStatus(400);
    try {
        const result = await communityService.deleteById(id);
        if (result === undefined)
            return res.sendStatus(400);
        return res.sendStatus(200);
    }
    catch (err) {
        console.log(err);
        return res.sendStatus(400);
    }
});
route.put('/:id', async (req, res) => {
    const { id, title, content } = req.body;
    if (typeof id !== 'number' ||
        typeof title !== 'string' ||
        typeof content !== 'string')
        return res.sendStatus(400);
    console.log(id, title, content);
    try {
        const result = await communityService.update(id, title, content);
        if (result === undefined)
            return res.sendStatus(400);
        return res.sendStatus(200);
    }
    catch (err) {
        console.log(err);
        return res.sendStatus(400);
    }
});
export default route;
