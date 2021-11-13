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
    </>
  );
};

export default VideoPage;
