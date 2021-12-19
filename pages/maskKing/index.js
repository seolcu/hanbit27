import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/MaskKing.module.scss";
import Link from "next/link";
import HeaderComponent from "../../components/HeaderComponent";
import firestore from "../../firebase/firestoreInit";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import maskKingInfoList from "../../public/data/maskKingInfoList";

const MaskKing = () => {
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
        <title>복면가왕</title>
        <meta name="description" content="제 27회 한빛제 복면가왕" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeaderComponent />
      <div
        style={{ position: "relative", width: "100%", paddingBottom: "20%" }}
      >
        <Image
          src={"/image/banner.png"}
          alt="배너"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="container">
        {voteCountList.map((data, index) => {
          return (
            <>
              <h3>
                #{index + 1} {maskKingInfoList[index].name} {data.count}
              </h3>
            </>
          );
        })}
      </div>
    </>
  );
};

export default MaskKing;
