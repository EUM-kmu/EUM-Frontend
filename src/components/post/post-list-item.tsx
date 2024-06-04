import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

import { PostListItemProps } from "./type";

import ApplicantSVG from "@/assets/icons/applicant.svg";
import Category1SVG from "@/assets/icons/category1.svg";
import Category2SVG from "@/assets/icons/category2.svg";
import Category3SVG from "@/assets/icons/category3.svg";
import Category4SVG from "@/assets/icons/category4.svg";
import Category5SVG from "@/assets/icons/category5.svg";
import Category6SVG from "@/assets/icons/category6.svg";
import Category7SVG from "@/assets/icons/category7.svg";
import DateSVG from "@/assets/icons/date.svg";
import KnotSVG from "@/assets/icons/knot.svg";
import LocationSVG from "@/assets/icons/location.svg";
import { colorTheme } from "@/style/color-theme";
import { BackdateToItemtype } from "@/utils/backdate-to-itemtype";
import { devLog } from "@/utils/dev-log";
import { TypeIdInteractionString } from "@/utils/type-id-interaction-string";

export const PostListItem = (props: PostListItemProps) => {
  const navigate = useNavigate();
  return (
    <Wrapper
      onClick={() => {
        navigate(`/post/${props.postId}`);
      }}
    >
      <RowBox>
        {props.status == "RECRUITING" && !props.deleted && (
          <StateIng>모집중</StateIng>
        )}
        {props.status == "RECRUITMENT_COMPLETED" && !props.deleted && (
          <StateFin>모집완료</StateFin>
        )}
        {props.status == "TRANSACTION_COMPLETED" && !props.deleted && (
          <StateFin>거래완료</StateFin>
        )}
        {props.deleted && <StateFin>삭제된 글</StateFin>}

        <TopIcon src={ApplicantSVG} />
        <StateSpan>
          {props.currentApplicant}/{props.maxNumOfPeople}명
        </StateSpan>
        {props.category === 1 && <TopIcon src={Category1SVG} />}
        {props.category === 2 && <TopIcon src={Category2SVG} />}
        {props.category === 3 && <TopIcon src={Category3SVG} />}
        {props.category === 4 && <TopIcon src={Category4SVG} />}
        {props.category === 5 && <TopIcon src={Category5SVG} />}
        {props.category === 6 && <TopIcon src={Category6SVG} />}
        {props.category === 7 && <TopIcon src={Category7SVG} />}
        <StateSpan>
          {TypeIdInteractionString({
            categoryId: props.category,
            idToString: true,
          })}
        </StateSpan>
        <TopIcon src={KnotSVG} />
        <StateSpan>{props.pay}타임</StateSpan>
      </RowBox>
      <Title>{props.title}</Title>
      <BottomRowBox>
        <BottomColumnBox>
          <RowBox>
            <BottomIcon icon={LocationSVG} />
            <StateSpan>{props.location}</StateSpan>
          </RowBox>
          <RowBox>
            <BottomIcon icon={DateSVG} />
            <StateSpan>{BackdateToItemtype(props.startDate)}</StateSpan>
          </RowBox>
        </BottomColumnBox>
        <ProfileImg
          src={props.writerProfileImg}
          onClick={() => devLog("user: ", props.writerId)}
        />
      </BottomRowBox>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  padding: 1.06rem 8.46%;
  border-bottom: 1px solid #d9d9d9;
  display: flex;
  flex-direction: column;
  border-left-width: 0;
  border-right-width: 0;
`;

const RowBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 0.3rem;
`;

const StateIng = styled.div`
  padding: 0.22rem 0.7rem;
  font-size: 1rem;
  color: white;
  background-color: ${colorTheme.orange400};
  border-radius: 0.44rem;
  line-height: 1.22rem;
`;

const StateFin = styled.div`
  font-size: 1rem;
  color: ${colorTheme.blue900};
  padding: 0.22rem;
`;

const Title = styled.span`
  width: 100%;
  font-size: 1.56rem;
  font-weight: bold;
  line-height: 2.22rem;
  margin: 0.39rem 0 1.11rem 0;
`;

const TopIcon = styled.img`
  margin: 0 0.39rem 0 0.72rem;
  width: 1rem;
  height: 1rem;
`;

const StateSpan = styled.span`
  font-size: 0.83rem;
`;

const BottomIcon = styled.div<{ icon: string }>`
  margin-right: 0.78rem;
  width: 1rem;
  height: 1rem;
  border-radius: 1px;
  background-image: url(${({ icon }) => icon});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
`;

const BottomRowBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const BottomColumnBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProfileImg = styled.img`
  width: 2.06rem;
  height: 2.06rem;
  border: 0.17rem solid ${colorTheme.orange400};
  border-radius: 0.56rem;
`;
