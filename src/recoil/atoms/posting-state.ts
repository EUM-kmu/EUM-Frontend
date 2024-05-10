import { atom } from "recoil";

const today = new Date();

export const postingState = atom({
  key: "postingState",
  default: {
    activityType: [
      { name: "이동", state: false },
      { name: "심부름", state: false },
      { name: "교육", state: false },
      { name: "장소", state: false },
      { name: "돌봄", state: false },
      { name: "수리", state: false },
      { name: "기타", state: false },
    ],
    title: "",
    content: "",
    profileImage: "",
    dateType: "",
    startDate: today,
    endDate: "",
    location: "",
    memberNum: 1,
    price: 30,
    slot: "",
    startDateSave: false,
    startTimeSave: false,
  },
});
