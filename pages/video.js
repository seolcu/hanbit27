import Head from "next/head";
import Image from "next/image";
import styles from "../styles/VideoPage.module.scss";
import Link from "next/link";
import HeaderComponent from "../components/HeaderComponent";

const VideoPage = () => {
  return (
    <>
      <Head>
        <title>공연 영상</title>
        <meta name="description" content="제 27회 한빛제 공연 영상" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeaderComponent />
      <div className="container-fulid p-5 bg-danger text-light">
        <div className="container">
          <h1 className="display-1 fw-bold">공연 영상</h1>
          <h3>
            축제는 역시 공연!
            <br />
            [팀명 리스트 순서대로]의
            <br />
            화려한 공연 영상들 보러가기
          </h3>
        </div>
      </div>
    </>
  );
};

export default VideoPage;
