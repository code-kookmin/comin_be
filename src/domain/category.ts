import { Tspec } from "tspec";
import { Communtiy } from "./community/community";

export interface Category {
  name: string;
}

export function isCategory(obj: Category) {
  if (typeof obj.name !== "string") return false;
  return true;
}

export type CategoryApiTspec = Tspec.DefineApiSpec<{
  tags: ["Category"];
  paths: {
    "/category/{categoryId}/community": {
      get: {
        summary: "특정 카테고리의 게시글들 조회";
        path: { categoryId: number };
        query: { pageSize?: number; pageNumber?: number };
        responses: {
          200: Communtiy[];
        };
      };
    };
    "/category/subcategory/{subcategoryId}/community": {
      get: {
        summary: "특정 서브 카테고리를 갖는 게시글들 조회";
        path: { subcategoryId: number };
        query: { pageSize?: number; pageNumber?: number };
        responses: {
          200: Communtiy[];
        };
      };
    };
  };
}>;
