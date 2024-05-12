import "react-notion-x/src/styles.css";
import axios from "axios";
import { BlockMap, ExtendedRecordMap } from "notion-types";
import { useEffect, useState } from "react";
import { NotionRenderer } from "react-notion-x";
import { styled } from "styled-components";

export const PrivacyPolicyNotion = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [notionData, setNotionData] = useState<ExtendedRecordMap>();

  useEffect(() => {
    const getNotion = async () => {
      setIsLoading(true);
      await axios
        .get(
          "https://notion-api.splitbee.io/v1/page/v-df2b1754a0cb4cd7936e70b29fcc077c?pvs=4",
        )
        .then(({ data }) => {
          console.log(data);
          setNotionData({
            block: data as BlockMap,
            space: {},
            collection: {},
            collection_view: {},
            notion_user: {},
            collection_query: {},
          } as unknown as ExtendedRecordMap);
        })
        .catch((err) => console.log(err));
    };

    void getNotion();
    setIsLoading(false);
  }, []);

  console.log(notionData);
  return (
    <Layout
      style={{
        margin: "auto",
        width: "90vw",
      }}
    >
      {!isLoading && (
        <NotionRenderer
          recordMap={notionData!}
          fullPage={true}
          darkMode={false}
        />
      )}
    </Layout>
  );
};

const Layout = styled.div`
  height: 100%;
  overflow: hidden;
  .notion {
    height: 100%;
  }
  .notion-header {
    display: none;
  }
  .notion-page,
  .notion-page-content {
    height: 100%;
    overflow: hidden;
  }
  & .notion-page-content-inner {
    overflow: auto;
  }
`;
