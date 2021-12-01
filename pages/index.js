import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.scss";
import Link from "next/link";
import HeaderComponent from "../components/HeaderComponent";
import StarImage from "../public/image/jeremy-thomas-E0AHdsENmDg-unsplash.jpg";

const Home = () => {
  return (
    <div>
      <Head>
        <title>한빛제</title>
        <meta name="description" content="제 27회 한빛제" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeaderComponent />
      <div className={styles.mainOverlay}>
        <div>
          <h1>제 27회 한빛제</h1>
          <Link href="/product">
            <a>
              <h2>한빛마켓 {">"}</h2>
            </a>
          </Link>
          <Link href="/vieworder">
            <a>
              <h2>주문 조회하기 {">"}</h2>
            </a>
          </Link>
          <Link href="/video">
            <a>
              <h2>공연 영상 {">"}</h2>
            </a>
          </Link>
          <Link href="/feedback">
            <a>
              <h2>고객센터 {">"}</h2>
            </a>
          </Link>
        </div>
      </div>
      <br />
      <br />
      <br />
    </div>
  );
};

export default Home;
