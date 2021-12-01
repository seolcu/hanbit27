import Head from "next/head";
import Image from "next/image";
import styles from "../styles/VideoPage.module.scss";
import Link from "next/link";
import HeaderComponent from "../components/HeaderComponent";

const FeedbackPage = () => {
  return (
    <div>
      <Head>
        <title>고객센터</title>
        <meta name="description" content="제 27회 한빛제 고객센터" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeaderComponent />
      <h1>고객센터</h1>
      <input type="text" />
    </div>
  );
};
export default FeedbackPage;
