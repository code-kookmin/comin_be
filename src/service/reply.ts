import {
  ReplyCreate,
  ReplyUpdate,
  isReplyCreate,
  isReplyUpdate,
} from '../domain/reply';
import replyRepository from '../repository/reply';

const findById = async (id: number) => {
  if (isNaN(id)) return undefined;
  try {
    const result = await replyRepository.findById(id);
    if (!result) return undefined;
    return result;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

const findByCommentId = async (commentId: number) => {
  if (isNaN(commentId)) return undefined;
  try {
    const result = await replyRepository.findByCommentId(commentId);
    if (!result) return undefined;
    return result;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

const findByUserId = async (userId: number) => {
  if (isNaN(userId)) return undefined;
  try {
    const result = await replyRepository.findByUserId(userId);
    if (!result) return undefined;
    return result;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

const save = async (reply: ReplyCreate) => {
  if (!isReplyCreate(reply)) return undefined;
  try {
    const result = await replyRepository.save(reply);
    if (!result) return undefined;
    return result;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

const update = async (id: number, reply: ReplyUpdate) => {
  if (!isNaN(id) || !isReplyUpdate(reply)) return undefined;
  try {
    const result = await replyRepository.update(id, reply);
    if (!result) return undefined;
    return result;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

const deleteById = async (id: number) => {
  if (!isNaN(id)) return undefined;
  try {
    const result = await replyRepository.deleteById(id);
    if (!result) return undefined;
    return result;
  } catch (err) {
    console.log(err);
    return undefined;
  }
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
