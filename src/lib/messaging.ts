import { getToken } from "@firebase/messaging";

import { messaging } from "@/lib/firebase";
import { devLog } from "@/utils/dev-log";

export type PermissionType = "granted" | "denied" | "default";

async function requestPermission(): Promise<PermissionType> {
  return await Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      devLog("권한 승인");
    } else {
      devLog("권한 거부");
    }
    return permission as PermissionType;
  });
}

async function requestToken(): Promise<string | null> {
  if (!messaging) {
    alert("이 브라우저는 알림을 지원하지 않습니다.");
    devLog("알람 지원X. 현재 브라우저 정보: ", navigator.userAgent);
    return null;
  }

  const token = await getToken(messaging, {
    vapidKey: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
  })
    .then((currentToken) => {
      if (currentToken) {
        devLog(currentToken);
      } else {
        devLog("알림 권한이 거부되어있습니다.");
      }
      return currentToken;
    })
    .catch((err) => {
      alert("권한이 허가되어있지 않아 알림을 보낼 수 없습니다");
      devLog("토큰을 받는 과정에서 에러가 발생하였습니다 ", err);
      // ...
      return null;
    });
  return token as string;
}

export { requestPermission, requestToken };
