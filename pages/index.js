import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.scss";
import Link from "next/link";
import HeaderComponent from "../components/HeaderComponent";

const Home = () => {
  return (
    <div>
      <Head>
        <title>한빛제</title>
        <meta name="description" content="제 27회 한빛제" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeaderComponent />
      <Link href="/product">
        <a>한빛마켓 바로가기</a>
      </Link>
      <br />
      <Link href="/vieworder">
        <a>주문조회하기</a>
      </Link>
      <br />
      <Link href="/video">
        <a>공연 영상 보러가기</a>
      </Link>
      <br />
      <Link href="/feedback">
        <a>고객센터</a>
      </Link>
    </div>
  );
};

export default Home;
