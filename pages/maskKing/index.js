import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/MaskKing.module.scss";
import Link from "next/link";
import HeaderComponent from "../../components/HeaderComponent";
import MaskKingCard from "../../components/MaskKingCard";
import maskKingInfoList from "../../public/data/maskKingInfoList";
import { useState } from "react";
import Cookies from "js-cookie";
import { MdCheck, MdClose } from "react-icons/md";

const MaskKing = () => {
  // 투표 쿠키설정
  const voteCookieName = "voted";
  const [voteState, setVoteState] = useState(Cookies.get(voteCookieName));
  return (
    <>
      <Head>
        <title>복면가왕</title>
        <meta name="description" content="제 27회 한빛제 복면가왕" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeaderComponent />
      <div className="container-fluid p-5 bg-danger text-light">
        <div className="container">
          <h1 className="display-1 fw-bold">복면가왕 예선전</h1>
          <div className="d-flex align-items-center gap-3">
            <h2 className="m-0 fs-4">
              {voteState ? (
                <>
                  <MdCheck />#{voteState} 투표함
                </>
              ) : (
                <>
                  <MdClose />
                  투표 안함
                </>
              )}
            </h2>
          </div>
        </div>
      </div>
      <div className="container">
        <div className={`mt-4 ${styles.gridContainer}`}>
          {maskKingInfoList.map((maskKingInfo, index) => {
            return (
              <MaskKingCard
                num={maskKingInfo.num}
                name={maskKingInfo.name}
                music={maskKingInfo.music}
                artist={maskKingInfo.artist}
                thumbSrc={maskKingInfo.thumbSrc}
                key={index}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default MaskKing;
