import Head from "next/head";
import Image from "next/image";
import styles from "../styles/MaskKing.module.scss";
import Link from "next/link";
import HeaderComponent from "../components/HeaderComponent";
import MaskKingCard from "../components/MaskKingCard";

const ViewOrder = () => {
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
          <h3>
            [멘트]
            <br />
            [멘트]
            <br />
            [멘트]
          </h3>
        </div>
      </div>
      <div className="container">
        <MaskKingCard
          src="/video/sample.mp4"
          title="#1 김상우 - 느린심장박동(래원)"
          subtitle="김상우의 기깔나는 느린심장박동 커버입니다"
        />
        <MaskKingCard
          src="/video/sample.mp4"
          title="#2 김상우 - 느린심장박동(래원)"
          subtitle="김상우의 기깔나는 느린심장박동 커버입니다"
        />
        <MaskKingCard
          src="/video/sample.mp4"
          title="#3 김상우 - 느린심장박동(래원)"
          subtitle="김상우의 기깔나는 느린심장박동 커버입니다"
        />
        <MaskKingCard
          src="/video/sample.mp4"
          title="#4 김상우 - 느린심장박동(래원)"
          subtitle="김상우의 기깔나는 느린심장박동 커버입니다"
        />
      </div>
    </>
  );
};

export default ViewOrder;