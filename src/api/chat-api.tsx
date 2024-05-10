import axios from "axios";

import Instance from "./axios-instance";
import {
  ChatFinalResponse,
  ChatListResponse,
  ChatMakeRequest,
  ChatMakeRoom,
  ChatRoomResponse,
  ChatSendRequest,
} from "./types/chat-type";

export default class ChatApi {
  // 메세지 보내기
  static async sendChatMessages({ message, roomId }: ChatSendRequest) {
    const response = await Instance.post(
      `/chat-service/api/chatrooms/${roomId}/message`,
      message,
    );
    if (response) {
      return response.status;
    } else {
      throw new Error("Invalid response from server");
    }
  }

  // 채팅방 리스트 가져오기
  static async getChatList() {
    const response = await Instance.get(`/chat-service/api/chatrooms`);
    console.log(response);
    if (response) {
      const temp = response.data as ChatListResponse;
      return temp.result;
    } else {
      throw new Error("Invalid response from server");
    }
  }

  // 채팅방 디테일 멤버 정보랑 채팅내역 가져오기
  static async getChatRoomData(chatRoomId: string) {
    const response = await Instance.get(
      `/chat-service/api/chatrooms/${chatRoomId}`,
    );
    if (response) {
      const temp = response.data as ChatRoomResponse;
      return temp.result;
    } else {
      throw new Error("Invalid response from server");
    }
  }

  // 채팅방 새로 만들기
  static async postChatMake(data: ChatMakeRequest) {
    const response = await Instance.post(`/chat-service/api/chatrooms`, data);
    if (response) {
      const temp = response.data as ChatFinalResponse<ChatMakeRoom>;
      return temp.result;
    } else {
      throw new Error("Invalid response from server");
    }
  }

  // static async postAddingNewMember(data: {
  //   chatRoomId: string;
  //   addingData: ChatMakeRequest;
  // }) {
  //   const response = await Instance.patch(
  //     `/chat-service/api/chats/${data.chatRoomId}/members`,
  //     { postId: data.addingData.postId, memberIds: data.addingData.memberIds },
  //     {
  //       headers: {
  //         userId: localStorage.getItem("userId"),
  //       },
  //     },
  //   );
  //   if (response) {
  //     const temp = response.data as ChatFinalResponse<ChatMakeRoom>;
  //     return temp.result;
  //   } else {
  //     throw new Error("Invalid response from server");
  //   }
  // }

  static async postAddingNewMember(data: {
    chatRoomId: string;
    addingData: ChatMakeRequest;
  }) {
    const response = await axios.patch(
      `${process.env.REACT_APP_CHAT_API_BASE_URL}/chat-service/api/chatrooms/${data.chatRoomId}/members`,
      { postId: data.addingData.postId, memberIds: data.addingData.memberIds },
      {
        headers: {
          Authorization: localStorage.getItem("accessToken"),
          "Content-Type": "application/json",
          // "X-Requested-With": "XMLHttpRequest",
        },
        withCredentials: true,
      },
    );
    if (response) {
      const temp = response.data as ChatFinalResponse<ChatMakeRoom>;
      return temp.result;
    } else {
      throw new Error("Invalid response from server");
    }
  }

  static async postIdToChatRoom(postId: string | number) {
    const response = await Instance.get(
      `/chat-service/api/chatrooms/post/${postId}`,
    );
    if (response) {
      const temp = response.data as ChatFinalResponse<{ ids: string[] }>;
      return temp.result;
    } else {
      throw new Error("Invalid response from server");
    }
  }
}
