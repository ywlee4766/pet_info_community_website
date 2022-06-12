import { Grid, Button } from "@mui/material";
import styled from "styled-components";

const PostMenu = styled(Grid)`
    margin: 10px 0;
    text-align: center;
`;

const SelectMenu = styled(Button)`
    padding: 0px 10px;
    margin: 10px;
    color: #386150;
    font-weight: bold;
    &:hover {
        color: black;
    }
`;

const UnSelectMenu = styled(Button)`
    padding: 0px 10px;
    margin: 10px;
    color: #818479;
    font-weight: bold;

    &:hover {
        color: black;
    }
`;
const Tag = styled(Grid)`
    color: #818479;
    font-size: 0.7rem;
    border-radius: 100px;
    background-color: #ffffff;
    border: solid 1px #eae0cc;
    margin: 0.5rem 0.5rem 0 0;
    padding: 0.3rem 0.5rem;
    font-family: "NanumSquareRound";
`;

const PostList = styled(Grid)`
    background-color: #f6f5ef;
    border-radius: 20px;
    height: 100px;
    margin: 25px 0;
    justify-content: space-between;
    width: 100%;
    overflow: hidden;
    padding: 0 15px;
    cursor: pointer;
`;
const PostUserImg = styled(Grid)`
    border-radius: 100%;
    width: 60px;
    height: 60px;
    margin: 20px 0;
`;

const PostUserInfo = styled(Grid)`
    width: 25%;
    max-width: 140px;
    height: 70px;
    margin: 20px 0;
    padding: 8px 3px;
`;

const PostInfo = styled(Grid)`
    width: 50%;
    max-width: 600px;
    height: 70px;
    margin: 20px;
    padding: 0.4rem 0;
`;

const PostSubInfo = styled(Grid)`
    width: 15%;
    max-width: 250px;
    height: 70px;
    padding: 35px 0;
    display: flex;
`;

const ListName = styled(Grid)`
    font-size: 16px;
    font-family: "NanumSquareRound";
    padding: 0.3rem 0;
`;

const ListDate = styled(Grid)`
    font-size: 12px;
`;

const ListTitle = styled(Grid)`
    font-weight: bold;
    font-family: "NanumSquareRound";
    font-size: 1rem;
`;

const WritePost = styled(Button)``;

const Count = styled(Grid)`
    font-size: 15px;
    font-color: gray;
    margin: 0 10%;
`;
export {
    PostList,
    PostUserImg,
    PostUserInfo,
    PostInfo,
    PostSubInfo,
    ListName,
    ListDate,
    ListTitle,
    WritePost,
    PostMenu,
    SelectMenu,
    UnSelectMenu,
    Tag,
    Count,
};
