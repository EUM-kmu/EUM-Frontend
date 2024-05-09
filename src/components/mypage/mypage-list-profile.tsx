import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

import DotMenuSVG from "@/assets/icons/dots-menu.svg";
import FemaleSVG from "@/assets/icons/female.svg";
import KnotWhiteBackSVG from "@/assets/icons/knot-white-back.svg";
import LocationWhiteBackSVG from "@/assets/icons/location-white-back.svg";
import MaleSVG from "@/assets/icons/male.svg";
import { DropDownMenu } from "@/components/common/drop-down-menu";
import { Modal } from "@/components/common/modal";
// import PersonSVG from "@/assets/icons/person-white-back.svg";
import { useGetBankData } from "@/hooks/queries/useGetBankData";
import { useGetProfile } from "@/hooks/queries/useGetProfile";
import { useSignOut } from "@/hooks/queries/useSignOut";
import { useWithdrawal } from "@/hooks/queries/useWithdrawal";
import { colorTheme } from "@/style/color-theme";

export const MypageListProfile = () => {
  const { data: myProfile } = useGetProfile();
  const { data: bankAccount } = useGetBankData();
  // TODO: 연동
  const { mutate: signOut } = useSignOut();
  const { mutate: withdrawal } = useWithdrawal();
  const [show, setShow] = useState<boolean>(false);

  const [withdrawalModal, setWithDrawalModal] = useState<boolean>(false);
  const [signOutModal, setSignOutModal] = useState<boolean>(false);

  return (
    <Wrapper>
      <ProfileImg src={myProfile?.profileImage} />
      <ColumnBox>
        <ProfileRowBox>
          <Name>{myProfile?.nickName}</Name>
          <OtherStateIcon
            src={myProfile?.gender == "male" ? MaleSVG : FemaleSVG}
          />
          <SexAge>
            {myProfile?.gender == "male" ? "남" : "여"} / {myProfile?.ageRange}
            대
          </SexAge>
          <MenuBox>
            <MenuSVG src={DotMenuSVG} onClick={() => setShow(!show)} />
            {show && (
              <>
                <DropDownMenu>
                  <DropDownMenu.MenuItem
                    onClick={() => {
                      setShow(false);
                      setWithDrawalModal(true);
                    }}
                  >
                    탈퇴하기
                  </DropDownMenu.MenuItem>
                  <DropDownMenu.MenuItem
                    onClick={() => {
                      setShow(false);
                      setSignOutModal(true);
                    }}
                  >
                    로그아웃하기
                  </DropDownMenu.MenuItem>
                </DropDownMenu>
              </>
            )}
          </MenuBox>
        </ProfileRowBox>
        {show && <MenuBackground onClick={() => setShow(false)} />}
        <StateOrangeBox>
          <PriceStateBox>
            <KnotIconImg src={KnotWhiteBackSVG} />
            <KnotPriceState>{bankAccount?.totalBudget}</KnotPriceState>
            <KnotPriceWon>매듭</KnotPriceWon>
          </PriceStateBox>
          <OtherStateColumnBox>
            <PriceStateBox style={{ width: "5rem" }}>
              <OtherStateIcon src={LocationWhiteBackSVG} />
              <div>{myProfile?.address}</div>
            </PriceStateBox>
            {/* <PriceStateBox style={{ width: "5rem" }}>
              <OtherStateIcon src={PersonSVG} />
            </PriceStateBox> */}
          </OtherStateColumnBox>
        </StateOrangeBox>
      </ColumnBox>

      {/** Modal */}
      {withdrawalModal && (
        <Modal onClose={() => setWithDrawalModal(false)}>
          <Modal.Title text="탈퇴하시겠습니까?" />
          <Modal.Button color="orange" onClick={() => withdrawal()}>
            탈퇴하기
          </Modal.Button>
        </Modal>
      )}
      {signOutModal && (
        <Modal onClose={() => setSignOutModal(false)}>
          <Modal.Title text="로그아웃\n하시겠습니까?" />
          <Modal.Button color="orange" onClick={() => signOut()}>
            로그아웃
          </Modal.Button>
        </Modal>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  background-color: ${colorTheme.blue100};
  border-top-left-radius: 0.83rem;
  border-top-right-radius: 0.83rem;
  padding: 1.44rem 0 1.4rem 9%;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 3.3%;
`;

const ProfileImg = styled.img`
  width: 4.33rem;
  height: 4.33rem;
  border-radius: 0.56rem;
`;

const ColumnBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
`;

const ProfileRowBox = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  gap: 1%;
  white-space: nowrap;
`;

const Name = styled.div`
  font-size: 1.39rem;
`;

const SexAge = styled.div`
  font-size: 0.56rem;
  color: ${colorTheme.shade};
`;

const MenuBox = styled.div`
  position: absolute;
  right: 3.3%;
  height: 25px;
`;

const MenuSVG = styled.img`
  height: 100%;
`;

const MenuBackground = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-color: rgba(217, 217, 217, 0.8);
  left: 0;
  top: 0;
`;

const StateOrangeBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-top-left-radius: 1.11rem;
  border-bottom-left-radius: 1.11rem;
  width: 100%;
  background-color: ${colorTheme.orange400};
  color: white;
  padding: 0.66rem 6% 0.66rem 4.5%;
`;

const PriceStateBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  gap: 3%;
`;

const KnotIconImg = styled.img`
  width: 1.39rem;
  height: 1.39rem;
`;

const KnotPriceState = styled.div`
  font-size: 1.39rem;
  font-weight: bold;
`;

const KnotPriceWon = styled.div`
  font-size: 0.722rem;
  width: 1.8rem;
`;

const OtherStateColumnBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 0.61rem;
`;

const OtherStateIcon = styled.img`
  width: 0.5rem;
  height: 0.68rem;
`;
