import { useMutation } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";

import ProfileApi from "@/api/profile-api";
import { queryClient } from "@/index";
import { profileEditState } from "@/recoil/atoms/profile-edit-state";

export function useEditProfile() {
  const eProfile = useRecoilValue(profileEditState);
  console.log(eProfile);

  return useMutation({
    mutationFn: () => ProfileApi.editProfile(eProfile),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["myProfile"] });
    },
    onError: (e) => {
      console.log(e);
    },
  });
}
