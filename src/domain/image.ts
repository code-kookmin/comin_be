import { Tspec } from 'tspec';

export type ImageApiTspec = Tspec.DefineApiSpec<{
  tags: ['image'];
  paths: {
    '/image': {
      post: {
        summary: 'upload image';
        /** @mediaType multipart/form-data */
        body: {
          image: Tspec.BinaryString;
        };
        responses: {
          200: string;
        };
      };
    };
    '/image/{imageId}': {
      delete: {
        summary: 'delete image';
        path: {
          imageId: number;
        };
        responses: {
          200: string;
        };
      };
    };
  };
}>;
