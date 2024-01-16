import { Comment, isCommentCreate, isCommentUpdate } from '../domain/comment';
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

const save = async (comment: Comment) => {
  if (!isCommentCreate) return undefined;
  const result = await commentRepository.save(comment);
  if (!result) return undefined;
  return result;
};

const update = async (id: number, comment: Comment) => {
  if (typeof id !== 'number' || !isCommentUpdate) return undefined;
  const result = await commentRepository.update(id, comment);
  if (!result) return undefined;
  return result;
};

const deleteById = async (id: number) => {
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
};

export default commentService;
