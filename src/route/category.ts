import express from 'express';
import CommunityService from '../service/community';
import CategoryService from '../service/category';
import SubCategoryService from '../service/subcategory';

const route = express.Router();
const communityService = new CommunityService();
const categoryService = new CategoryService();
const subcategoryService = new SubCategoryService();

route.get('/', async (req, res) => {
  const pageSize = req.query.pageSize ? req.query.pageSize : 20;
  const pageNumber = req.query.pageNumber ? req.query.pageNumber : 1;
  const result = await categoryService.findAllByPage(parseInt(pageSize as string), parseInt(pageNumber as string));
  if (!result) return res.sendStatus(400);
  return res.send(result);
});

route.get('/subcategory/', async (req, res) => {
  const pageSize = req.query.pageSize ? req.query.pageSize : 20;
  const pageNumber = req.query.pageNumber ? req.query.pageNumber : 1;
  const result = await subcategoryService.findAllByPage(parseInt(pageSize as string), parseInt(pageNumber as string));
  if (!result) return res.sendStatus(400);
  return res.send(result);
});

route.get('/:categoryId/community', async (req, res) => {
  const pageSize = req.query.pageSize ? req.query.pageSize : 20;
  const pageNumber = req.query.pageNumber ? req.query.pageNumber : 1;
  const categoryId = parseInt(req.params.categoryId);
  const result = await communityService.findByCategoryId(
    categoryId,
    parseInt(pageSize as string),
    parseInt(pageNumber as string)
  );
  if (!result) return res.sendStatus(400);
  return res.send(result);
});

route.get('/subcategory/:subcategoryId/community', async (req, res) => {
  const pageSize = req.query.pageSize ? req.query.pageSize : 20;
  const pageNumber = req.query.pageNumber ? req.query.pageNumber : 1;
  const subcategoryId = parseInt(req.params.subcategoryId);
  const result = await communityService.findBySubcategoryId(
    subcategoryId,
    parseInt(pageSize as string),
    parseInt(pageNumber as string)
  );
  if (!result) return res.sendStatus(400);
  return res.send(result);
});

export default route;
