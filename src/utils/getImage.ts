import { IMG_URL } from '../constants';

export const getImage = (photo: { _id: string; name: string }): string => {
  return IMG_URL + photo?._id  + '.' + photo?.name?.split('.')?.[1];
};