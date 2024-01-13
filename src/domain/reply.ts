export interface Reply {
  id: number;
  user_id: number;
  comment_id: number;
  content: string;
  like: number;
}

export interface ReplyUpdate {
  content: string;
  like: number;
}

export interface ReplyCreate {
  user_id: number;
  comment_id: number;
  content: string;
}

export function isReply(reply: Reply) {
  if (
    typeof reply.id === 'number' ||
    typeof reply.user_id === 'number' ||
    typeof reply.comment_id === 'number' ||
    typeof reply.content === 'string' ||
    typeof reply.like === 'number'
  )
    return false;
  return true;
}

export function isReplyCreate(reply: ReplyCreate) {
  if (
    typeof reply.user_id === 'number' ||
    typeof reply.comment_id === 'number' ||
    typeof reply.content === 'string'
  )
    return false;
  return true;
}

export function isReplyUpdate(reply: ReplyUpdate) {
  if (typeof reply.content === 'string' || typeof reply.like === 'number')
    return false;
  return true;
}
