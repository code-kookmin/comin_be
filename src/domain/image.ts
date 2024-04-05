import { Tspec } from "tspec";

export type ImageApiTspec = Tspec.DefineApiSpec<{
  tags: ["image"];
  paths: {
    "/image": {
      post: {
        summary: "upload image";
        /** @mediaType multipart/form-data */
        body: {
          image: Tspec.BinaryString;
          key: string;
        };
        responses: {
          200: string;
        };
      };
    };
    "/image/{imageKey}": {
      post: {
        summary: "delete image";
        path: {
          imageKey: string;
        };
        responses: {
          200: string;
        };
      };
    };
  };
}>;
