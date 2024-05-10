/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { styled } from "styled-components";
import { type Swiper as SwiperCore } from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { BirthModal } from "./birth-modal";
import { InputWrapper } from "./input-wrapper";

import { ProfileData } from "@/api/types/profile-type";
import LocationSVG from "@/assets/icons/location.svg";
import { Modal } from "@/components/common/modal";
import { MyProfileModal } from "@/components/common/profile-modal";
import { useEditProfile } from "@/hooks/queries/useEditProfile";
import { profileEditState } from "@/recoil/atoms/profile-edit-state";
import { colorTheme } from "@/style/color-theme";
import "swiper/css";
import "swiper/css/pagination";
import "./location-swiper.css";
import { calculateAge } from "@/utils/date-utils";
// eslint-disable-next-line import/order

type ProfileEditModalProps = {
  profileData: ProfileData;
  onClose: () => void;
};

const ADDRESS = ["정릉 1동", "정릉 2동", "정릉 3동", "정릉 4동"];

export const ProfileEditModal = ({
  profileData,
  onClose,
}: ProfileEditModalProps) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [birthEditModal, setBirthEditModal] = useState<boolean>(false);
  const [readyModal, setReadyModal] = useState<boolean>(false);

  const [profileEdit, setProfileEdit] = useRecoilState(profileEditState);
  const activeIdx = useRef<number>(0);

  useEffect(() => {
    setProfileEdit(() => ({
      nickName: profileData.nickName,
      gender: profileData.gender,
      address: profileData.address,
      birth: profileData.birth,
      fileByte: profileData.profileImage,
    }));
  }, [profileData]);

  const { mutate } = useEditProfile();

  return (
    <>
      {editMode ? (
        <Modal onClose={() => setEditMode(false)}>
          <ModalInner>
            <FormContainer>
              <InputWrapper>
                <NicknameInput
                  type="text"
                  maxLength={5}
                  defaultValue={profileEdit.nickName}
                  onBlur={(e) =>
                    setProfileEdit((prev) => ({
                      ...prev,
                      nickName: e.target.value,
                    }))
                  }
                />
              </InputWrapper>
              <RowBox>
                <InputWrapper>
                  <GenderInput
                    onClick={() =>
                      setProfileEdit((prev) => ({
                        ...prev,
                        gender: prev.gender === "male" ? "female" : "male",
                      }))
                    }
                  >
                    {profileEdit.gender === "male" ? "남" : "여"}
                  </GenderInput>
                </InputWrapper>
                <InputWrapper>
                  <button
                    onClick={() => {
                      setEditMode(false);
                      setBirthEditModal(true);
                    }}
                  >
                    {calculateAge(profileEdit.birth)}세
                  </button>
                </InputWrapper>
              </RowBox>
              <Image src={profileData.profileImage} />
              <InputWrapper>
                <Swiper
                  initialSlide={0}
                  onSlideChange={(event: SwiperCore) => {
                    activeIdx.current = event.realIndex;
                    setProfileEdit((prev) => ({
                      ...prev,
                      address: ADDRESS[activeIdx.current],
                    }));
                  }}
                  slidesPerView={1}
                  spaceBetween={100}
                  loop={true}
                  pagination={true}
                  navigation={{
                    nextEl: ".next",
                  }}
                  modules={[Pagination, Navigation]}
                  bulletClass="swiper-bullet"
                  bulletActiveClass="swiper-acitve-bullet"
                >
                  {ADDRESS.map((location) => (
                    <SwiperSlide key={location} className="next">
                      <LocationImage />
                      {location}
                    </SwiperSlide>
                  ))}
                </Swiper>
              </InputWrapper>
            </FormContainer>
            <Modal.Button
              color="orange"
              onClick={() => {
                mutate();
                // TODO: remove edit modal
                // setReadyModal(true);
                console.log(profileEdit);
              }}
            >
              편집 완료하기
            </Modal.Button>
          </ModalInner>
        </Modal>
      ) : birthEditModal ? (
        <BirthModal
          onClose={() => {
            setBirthEditModal(false);
            setEditMode(true);
          }}
        />
      ) : (
        <MyProfileModal
          profileData={profileData}
          onEdit={() => setEditMode(true)}
          onClose={() => onClose()}
        />
      )}
      {readyModal && (
        <Modal onClose={() => setReadyModal(false)}>
          <Modal.Title text="프로필 편집은\n5/11부터 사용가능합니다\n\n조금만 기다려주세요🫣" />
        </Modal>
      )}
    </>
  );
};

const ModalInner = styled.div`
  max-width: 100%;
`;

const FormContainer = styled.div`
  display: flex;
  width: 100%;
  margin: auto;
  margin-bottom: 1.2rem;
  flex-direction: column;
  gap: 0.72rem;
  justify-content: center;
  align-items: center;
`;

const NicknameInput = styled.input`
  background-color: transparent;
  border: 0;
  text-align: center;
`;

const RowBox = styled.div`
  width: 100%;
  display: flex;
  gap: 5px;
  & > div {
    flex: 1;
  }
`;

const GenderInput = styled.div`
  overflow: hidden;
  transition: all 1s;

  &:active {
    transition: all 0.7s;
    transform: translateX(10%);
  }
`;

const Image = styled.img`
  width: 50vw;
  max-width: 500px;
  aspect-ratio: 1;
  border-radius: 1.17rem;
  border: 10px solid ${colorTheme.blue100};
  object-fit: cover;
`;

const LocationImage = styled.div`
  display: inline-block;
  width: 0.9rem;
  aspect-ratio: 1;
  background-image: url(${LocationSVG});
  background-size: contain;
  background-repeat: no-repeat;
`;
