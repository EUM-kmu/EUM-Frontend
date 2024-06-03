export type PostListItemProps = {
  postId: number;
  title: string;
  location: string;
  startDate: string;
  pay: number;
  status: string;
  currentApplicant: number;
  maxNumOfPeople: number;
  writerProfileImg: string;
  writerId: number;
  deleted: boolean;
};

export type PostCategorySelect = {
  categoryId: number;
  setCategoryId: React.Dispatch<React.SetStateAction<number>>;
};

export type categoryType = {
  id: number;
  name: string;
};
