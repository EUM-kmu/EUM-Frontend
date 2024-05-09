import { atom } from "recoil";

export const postState = atom({
  key: "postState",
  default: {
    userCurrentStatus: {
      writer: false,
      applicant: false,
      applyId: 0,
      applyStatus: "",
      report: false,
    },
    marketPostResponse: {
      postId: -1,
      title: "",
      content: "",
      location: "",
      startDate: "",
      pay: 0,
      volunteerTime: 0,
      createdDate: "",
      status: "RECRUITING",
      currentApplicant: 0,
      maxNumOfPeople: 0,
      viewsCount: 0,
      dealId: 0,
      writerInfo: {
        userId: 0,
        nickName: "",
        profileImage: "",
        address: "",
        gender: "",
        ageRange: 0,
      },
    },
  },
});
