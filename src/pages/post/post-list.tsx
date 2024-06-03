import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { styled } from "styled-components";

import ReadingGlassOrangeSVG from "@/assets/icons/reading-glass-orange.svg";
// import { Modal } from "@/components/common/modal";
import { MypageUpButton } from "@/components/mypage/mypage-up-button";
import { PostListItem } from "@/components/post/post-list-item";
import { PostPostingButton } from "@/components/post/post-posting-button";
import { PostPostingButtonMini } from "@/components/post/post-posting-button-mini";
import { useGetPostList } from "@/hooks/queries/useGetPostList";
import { usePostFcmToken } from "@/hooks/queries/usePostFcmToken";
import { requestPermission, requestToken } from "@/lib/messaging";
import { fcmTokenState } from "@/recoil/atoms/fcm-token-state";
import { colorTheme } from "@/style/color-theme";

export const PostList = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [miniButtonVisible, setMiniButtonVisible] = useState(false);
  const [tempSearch, setTempSearch] = useState("");
  const [search, setSearch] = useState("");
  const { data, fetchNextPage } = useGetPostList(search);
  const [fcmToken, setFcmToken] = useRecoilState(fcmTokenState);
  const { mutate } = usePostFcmToken();

  // const [ready, _] = useState<boolean>(true);

  useEffect(() => {
    // for alarm with fcm token
    const registerToken = async () => {
      if (fcmToken) return; // fcm token is already updated
      const permission = await requestPermission();
      if (permission === "granted") {
        const token = await requestToken();
        setFcmToken(token);
        mutate(token);
      }
    };

    void registerToken();
  }, []);

  useEffect(() => {
    if (headerRef.current) setHeaderHeight(headerRef.current.offsetHeight);

    const handleScroll = () => {
      if (wrapperRef.current) {
        const isScrollingDown = wrapperRef.current.scrollTop > headerHeight;
        setMiniButtonVisible(isScrollingDown);
        if (
          wrapperRef.current.scrollTop + wrapperRef.current.clientHeight ===
          wrapperRef.current.scrollHeight
        ) {
          void fetchNextPage();
        }
      }
    };

    wrapperRef.current?.addEventListener("scroll", handleScroll);
    return () => {
      wrapperRef.current?.removeEventListener("scroll", handleScroll);
    };
  }, [headerHeight]);

  const handleMiniButton = () => {
    if (wrapperRef.current) {
      wrapperRef.current.scrollTop = 0;
    }
  };
  return (
    <>
      <Wrapper ref={wrapperRef}>
        <div style={{ width: "100%" }} ref={headerRef}>
          {miniButtonVisible && <PostPostingButtonMini />}
          <BigHeader>전체게시물</BigHeader>
          <InputWrapper>
            <InputInnerWrapper>
              <InputTextArea
                value={tempSearch}
                onChange={(e) => setTempSearch(e.target.value)}
              />
              <SearchButton
                onClick={() => {
                  setSearch(tempSearch);
                }}
              />
            </InputInnerWrapper>
          </InputWrapper>
          <SmallHeader>
            게시글 만들기 버튼을 눌러 게시글을 만들어 보아요
          </SmallHeader>
          <PostPostingButton />
        </div>
        {data?.pages.map((page, idx) =>
          page.map((item, index) => (
            <PostListItem
              key={`${idx}-${index}`}
              postId={item.postId}
              title={item.title}
              location={item.location}
              startDate={item.startDate}
              pay={item.pay}
              status={item.status}
              currentApplicant={item.currentApplicant}
              maxNumOfPeople={item.maxNumOfPeople}
              writerProfileImg={item.writerInfo.profileImage}
              writerId={item.writerInfo.profileId}
              deleted={item.deleted}
            />
          )),
        )}
        {miniButtonVisible && <MypageUpButton onHandler={handleMiniButton} />}
      </Wrapper>
      {/* {ready && (
        <Modal onClose={() => devLog("blodk")}>
          <Modal.Title text="지금 서비스를\n재정비중이에요!\n\n내일 오전 6시 이후\n다시 접속부탁드려요🤗" />
        </Modal>
      )} */}
    </>
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: auto;
  height: 100%;
`;

const BigHeader = styled.div`
  width: 100%;
  font-size: 1.8rem;
  padding: 2.9rem 9% 0.7rem;
`;

const SmallHeader = styled.div`
  width: 100%;
  font-size: 0.83rem;
  padding: 0 8.5% 0.6rem;
`;

const InputWrapper = styled.div`
  width: 100%;
  padding: 0 7.94% 0.7rem;
`;

const InputInnerWrapper = styled.div`
  width: 100%;
  height: 2.78rem;
  border-radius: 0.56rem;
  border-color: ${colorTheme.orange400};
  border-width: 2px;
  border-style: solid;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0.16rem 0.16rem 0.16rem 0.4rem;
`;

const InputTextArea = styled.textarea`
  width: 100%;
  font-size: 1rem;
  margin-right: 0.2rem;
  color: black;
  border: none;
  background-color: transparent;
  margin-top: 0.4rem;
`;

const SearchButton = styled.button`
  background-image: url(${ReadingGlassOrangeSVG});
  width: 2.33rem;
  height: 2.33rem;
  background-color: transparent;
  border: none;
  background-repeat: no-repeat;
  background-size: cover;
`;
