import { Comment } from '../domain/comment/comment';
import { CommentCreate, isCommentCreate } from '../domain/comment/commentCreate';
import { CommentUpdate, isCommentUpdate } from '../domain/comment/commentUpdate';
import commentRepository from '../repository/comment';

const findById = async (id: number) => {
  if (isNaN(id)) return undefined;
  const result = await commentRepository.findById(id);
  if (!result) return undefined;
  return result;
};

const findByCommunityId = async (communityId: number) => {
  if (isNaN(communityId)) return undefined;
  const result = await commentRepository.findByCommunityId(communityId);
  if (!result) return undefined;
  return result;
};

const findByUserId = async (communityId: number) => {
  if (isNaN(communityId)) return undefined;
  const result = await commentRepository.findByUserId(communityId);
  if (!result) return undefined;
  return result;
};

const save = async (userId: number, comment: CommentCreate) => {
  if (!isCommentCreate) return undefined;
  const result = await commentRepository.save(userId, comment);
  if (!result) return undefined;
  return result;
};

const update = async (userId: number, id: number, comment: CommentUpdate) => {
  const commentOrigin = await commentRepository.findById(id);
  if (commentOrigin && commentOrigin.user_id != userId) return undefined;
  const result = await commentRepository.update(id, comment);
  if (!result) return undefined;
  return result;
};

const deleteById = async (userId: number, id: number) => {
  const commentOrigin = await commentRepository.findById(id);
  if (commentOrigin && commentOrigin.user_id != userId) return undefined;
  if (typeof id !== 'number') return undefined;
  const result = await commentRepository.deleteById(id);
  if (!result) return undefined;
  return result;
};

const commentService = {
  findById,
  findByCommunityId,
  save,
  update,
  deleteById,
  findByUserId,
};

export default commentService;
