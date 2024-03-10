import { CommentCreate, isCommentCreate } from "../domain/comment/commentCreate";
import { CommentUpdate, isCommentUpdate } from "../domain/comment/commentUpdate";
import commentRepository from "../repository/comment";
import { ServiceLayer } from "./ServiceLayer";

export default class CommentService implements ServiceLayer {
  findAll = async () => {
    const result = await commentRepository.findAll();
    if (!result) return undefined;
    return result;
  };

  findById = async (id: number) => {
    if (isNaN(id)) return undefined;
    const result = await commentRepository.findById(id);
    if (!result) return undefined;
    return result;
  };

  findByCommunityId = async (communityId: number) => {
    if (isNaN(communityId)) return undefined;
    const result = await commentRepository.findByCommunityId(communityId);
    if (!result) return undefined;
    return result;
  };

  findByUserId = async (communityId: number) => {
    if (isNaN(communityId)) return undefined;
    const result = await commentRepository.findByUserId(communityId);
    if (!result) return undefined;
    return result;
  };

  save = async (comment: CommentCreate) => {
    if (!isCommentCreate(comment)) return undefined;
    const result = await commentRepository.save(comment);
    if (!result) return undefined;
    return result;
  };

  update = async (comment: CommentUpdate) => {
    if (!isCommentUpdate(comment)) return undefined;
    const result = await commentRepository.update(comment);
    if (!result) return undefined;
    return result;
  };

  deleteById = async (id: number) => {
    if (isNaN(id)) return undefined;
    const result = await commentRepository.deleteById(id);
    if (!result) return undefined;
    return result;
  };
}
