import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/VoteResult.module.scss";
import Link from "next/link";
import HeaderComponent from "../../components/HeaderComponent";
import firestore from "../../firebase/firestoreInit";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import Cookies from "js-cookie";
import maskKingInfoList from "../../public/data/maskKingInfoList";

const VoteResult = () => {
  // 투표 쿠키설정
  const voteCookieName = "voted";
  const [voteState, setVoteState] = useState(Cookies.get(voteCookieName));

  // 투표수
  const [voteCountList, setVoteCountList] = useState([]);

  // 투표 Firestore 설정
  const voteRef = collection(firestore, "MaskKingVote");
  const getVoteCountList = async () => {
    const data = (await getDocs(voteRef)).docs.map((snapshot) =>
      snapshot.data(),
    );
    setVoteCountList(data);
  };

  // 데이터 동기화
  useEffect(() => {
    getVoteCountList();
  });

  return (
    <>
      <Head>
        <title>복면가왕 예선 투표결과</title>
        <meta
          name="description"
          content="제 27회 한빛제 복면가왕 예선 투표결과"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeaderComponent />
      <div className="container-fluid p-5 bg-info text-light">
        <div className="container">
          <h1 className="display-1 fw-bold">복면가왕 예선 결과</h1>
          <h3>
            복면가왕 예선전,
            <br />그 결과는?
          </h3>
        </div>
      </div>
      <div className="container">
        {voteCountList.map((data, index) => {
          return (
            <>
              <h3>
                #{index + 1}
                {maskKingInfoList[index].name} {data.count}
              </h3>
            </>
          );
        })}
      </div>
    </>
  );
};

export default VoteResult;
