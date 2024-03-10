import { Communtiy } from "../domain/community/community";
import { CommuntiyCreate, isCommunityCreate } from "../domain/community/communityCreate";
import { CommunityUpdate, isCommunityUpdate } from "../domain/community/communityUpdate";
import categoryRepository from "../repository/category";
import communityRepository from "../repository/community";
import subcategoryRepository from "../repository/subcategory";
import { ServiceLayer } from "./ServiceLayer";

export default class CommunityService implements ServiceLayer {
  findById = async function findById(id: number) {
    if (isNaN(id)) return undefined;
    const result = await communityRepository.findById(id);
    if (result === undefined) return undefined;
    return result;
  };

  findByUserId = async function findByUserId(userId: number) {
    if (isNaN(userId)) return undefined;
    const result = await communityRepository.findByUserId(userId);
    if (result === undefined) return undefined;
    return result;
  };

  findByCategoryId = async (categoryId: number, pageSize: number, pageNumber: number) => {
    if (isNaN(categoryId) || isNaN(pageSize) || isNaN(pageNumber)) return undefined;
    if (!(await categoryRepository.findCategoryById(categoryId))) return undefined;
    const result = await communityRepository.findByCategoryId(categoryId, pageSize, pageNumber);
    if (!result) return undefined;
    return result;
  };

  findBySubcategoryId = async (subcategoryId: number, pageSize: number, pageNumber: number) => {
    if (isNaN(subcategoryId) || isNaN(pageSize) || isNaN(pageNumber)) return undefined;
    if (!(await subcategoryRepository.findById(subcategoryId))) return undefined;
    const result = await communityRepository.findByCategoryId(subcategoryId, pageSize, pageNumber);
    if (!result) return undefined;
    return result;
  };

  update = async function update(community: CommunityUpdate) {
    if (!isCommunityUpdate(community)) return undefined;
    const result = await communityRepository.update(community);
    return result;
  };

  save = async function save(community: CommuntiyCreate) {
    if (!isCommunityCreate(community)) return undefined;
    const result = await communityRepository.save(community);
    if (result === undefined) return undefined;
    return result;
  };

  deleteById = async function deleteById(id: number) {
    if (isNaN(id)) return undefined;
    const result = await communityRepository.deleteById(id);
    if (result === undefined || result === 0) return undefined;
    return result;
  };
}
