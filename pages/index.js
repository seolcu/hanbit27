import Head from "next/head";
import styles from "../styles/Home.module.scss";
import Link from "next/link";
import HeaderComponent from "../components/HeaderComponent";
import Image from "next/image";
import spaceImg from "../public/image/spaceBackgroundImage.webp";

const Home = () => {
  return (
    <>
      <Head>
        <title>한빛제</title>
        <meta name="description" content="제 27회 한빛제" />
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
      </Head>
      <HeaderComponent />
      <div className={styles.mainOverlay}>
        <Image
          alt="space"
          src={spaceImg}
          layout="fill"
          objectFit="cover"
          quality={100}
        />
        <h1>To the Big Dipper.</h1>
        <Link href="/product">
          <a>
            <h2>대파마켓 & 굿즈</h2>
          </a>
        </Link>
        <Link href="/vieworder">
          <a>
            <h2>주문 조회</h2>
          </a>
        </Link>
        <Link href="/video">
          <a>
            <h2>공연 영상</h2>
          </a>
        </Link>
        <Link href="/feedback">
          <a>
            <h2>고객센터</h2>
          </a>
        </Link>
      </div>
    </>
  );
};

export default Home;
