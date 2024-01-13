import {
  CommentCreate,
  CommentUpdate,
  isCommentCreate,
  isCommentUpdate,
} from '../domain/comment';
import commentRepository from '../repository/comment';

const findById = async (id: number) => {
  if (isNaN(id)) return undefined;
  try {
    const result = await commentRepository.findById(id);
    if (!result) return undefined;
    return result;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

const findByCommunityId = async (communityId: number) => {
  if (isNaN(communityId)) return undefined;
  try {
    const result = await commentRepository.findByCommunityId(communityId);
    if (!result) return undefined;
    return result;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

const save = async (comment: CommentCreate) => {
  if (!isCommentCreate) return undefined;
  try {
    const result = await commentRepository.save(comment);
    if (!result) return undefined;
    return result;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

const update = async (id: number, comment: CommentUpdate) => {
  if (typeof id !== 'number' || !isCommentUpdate) return undefined;
  try {
    const result = await commentRepository.update(id, comment);
    if (!result) return undefined;
    return result;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

const deleteById = async (id: number) => {
  if (typeof id !== 'number') return undefined;
  try {
    const result = await commentRepository.deleteById(id);
    if (!result) return undefined;
    return result;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

const commentService = {
  findById,
  findByCommunityId,
  save,
  update,
  deleteById,
};

export default commentService;
