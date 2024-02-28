import { Reply, isReplyCreate, isReplyUpdate } from '../domain/reply';
import replyRepository from '../repository/reply';

const findById = async (id: number) => {
  if (isNaN(id)) return undefined;
  const result = await replyRepository.findById(id);
  if (!result) return undefined;
  return result;
};

const findByCommentId = async (commentId: number) => {
  if (isNaN(commentId)) return undefined;
  const result = await replyRepository.findByCommentId(commentId);
  if (!result) return undefined;
  return result;
};

const findByUserId = async (userId: number) => {
  if (isNaN(userId)) return undefined;
  const result = await replyRepository.findByUserId(userId);
  if (!result) return undefined;
  return result;
};

const save = async (reply: Reply) => {
  const result = await replyRepository.save(reply);
  if (!result) return undefined;
  return result;
};

const update = async (userId: number, id: number, reply: Reply) => {
  const replyOrigin = await replyRepository.findById(id);
  if (replyOrigin && replyOrigin.user_id !== userId) return undefined;
  const result = await replyRepository.update(id, reply);
  if (!result) return undefined;
  return result;
};

const deleteById = async (userId: number, id: number) => {
  const replyOrigin = await replyRepository.findById(id);
  if (replyOrigin && replyOrigin.user_id !== userId) return undefined;
  const result = await replyRepository.deleteById(id);
  if (!result) return undefined;
  return result;
};

const replyService = {
  findById,
  findByCommentId,
  findByUserId,
  save,
  update,
  deleteById,
};

export default replyService;
