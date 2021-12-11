import Head from "next/head";
import styles from "../styles/Home.module.scss";
import Link from "next/link";
import HeaderComponent from "../components/HeaderComponent";
import Image from "next/image";
import spaceImg from "../public/image/spaceBackgroundImage.webp";
import bigDipperImg from "../public/image/big_dipper.png";

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
          quality={60}
        />
        <Image alt="Big Dipper" src={bigDipperImg} width={300} height={260} />
        <h1 style={{ marginTop: "2.5rem" }}>To the Big Dipper.</h1>
        <h1>2021. 12. 23.</h1>
        <Link href="/product">
          <a>
            <h2>대파마켓 & 굿즈</h2>
          </a>
        </Link>
        <Link href="/video">
          <a>
            <h2>공연 영상</h2>
          </a>
        </Link>
        <Link href="/vieworder">
          <a>
            <h2>주문 조회</h2>
          </a>
        </Link>
        <Link href="/feedback">
          <a>
            <h2>고객센터</h2>
          </a>
        </Link>
      </div>
      <div
        className="container p-5 text-light"
        style={{ background: "#012326" }}
      >
        <p className="display-2 fw-bold">대파마켓 & 굿즈</p>
        <p className="h3">
          제고의 중고장터 대파마켓과,
          <br />제 27회 한빛제만의 아름다운 굿즈들 보러가기
        </p>
        <Link href="/product">
          <a>
            <button
              className="btn text-light"
              style={{ background: "#273d59" }}
            >
              대파마켓 바로가기
            </button>
          </a>
        </Link>
      </div>
      <div
        className="container p-5 text-light"
        style={{ background: "#081a40" }}
      >
        <p className="display-2 fw-bold">한빛제 공연 영상</p>
        <p className="h3">
          축제는 역시 공연!
          <br />
          화려한 공연 영상들 보러가기
        </p>
        <Link href="/video">
          <a>
            <button
              className="btn text-light"
              style={{ background: "#273d59" }}
            >
              공연 영상 보러가기
            </button>
          </a>
        </Link>
      </div>
    </>
  );
};

export default Home;
