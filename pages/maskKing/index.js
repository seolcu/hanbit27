import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/MaskKing.module.scss";
import Link from "next/link";
import HeaderComponent from "../../components/HeaderComponent";
import firestore from "../../firebase/firestoreInit";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import maskKingInfoList from "../../public/data/maskKingInfoList";

const voteRef = collection(firestore, "MaskKingVote");

export const getStaticProps = async () => {
  const preVoteCountList = (await getDocs(voteRef)).docs.map((snapshot) =>
    snapshot.data(),
  );
  return { props: { preVoteCountList }, revalidate: 15 };
};

const MaskKing = ({ preVoteCountList }) => {
  // 투표수
  const [voteCountList, setVoteCountList] = useState(preVoteCountList);

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
            <h3 key={index}>
              #{index + 1} {maskKingInfoList[index].name} {data.count}
            </h3>
          );
        })}
      </div>
    </>
  );
};

export default MaskKing;
