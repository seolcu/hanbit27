import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/MaskKing.module.scss";
import Link from "next/link";
import HeaderComponent from "../../components/HeaderComponent";
import MaskKingCard from "../../components/MaskKingCard";
import maskKingInfoList from "../../public/data/maskKingInfoList";

const MaskKing = () => {
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
          {/* <h3>
            [멘트]
            <br />
            [멘트]
            <br />
            [멘트]
          </h3> */}
        </div>
      </div>
      <div className="container">
        <div className={styles.gridContainer}>
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
