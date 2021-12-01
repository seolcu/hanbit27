import Head from "next/head";
import styles from "../styles/Home.module.scss";
import Link from "next/link";
import HeaderComponent from "../components/HeaderComponent";
import Image from "next/image";
import spaceImg from "../public/image/spaceBackgroundImage.webp";
import bigDipperImg from "../public/image/big_dipper.png";

const SubOverlay = ({ BGColor, URL, title, desc }) => {
  return (
    <div
      className={`container-fluid p-5 text-light ${styles.subOverlay}`}
      style={{ background: BGColor }}
    >
      <div className="container">
        <p className="display-3">
          <Link href={URL}>
            <a>{title}</a>
          </Link>
        </p>
        <p className="h3">{desc}</p>
      </div>
    </div>
  );
};

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
        <Image alt="Big Dipper" src={bigDipperImg} width={300} height={260} />
        <h1 style={{ marginTop: "2.5rem" }}>To the Big Dipper.</h1>
        <h1>: 북두칠성으로.</h1>
        <h1>2021. 12. 23.</h1>
        <Link href="/product">
          <a>
            <h2>한빛마켓</h2>
          </a>
        </Link>
        <Link href="/viewOrder">
          <a>
            <h2>주문 조회</h2>
          </a>
        </Link>
      </div>
      <SubOverlay
        BGColor="#012326"
        URL="/product"
        title="한빛마켓"
        desc={
          <>
            제고의 중고장터 대파마켓,
            <br />
            다양한 온라인 부스들과
            <br />제 27회 한빛제만의 굿즈들 보러가기
          </>
        }
      />
      <SubOverlay
        BGColor="#081a40"
        URL="/viewOrder"
        title="주문조회"
        desc={
          <>
            한빛마켓에서 구매하신 제품을
            <br />
            학번과 이름, 전화번호로 조회해 보아요
          </>
        }
      />
    </>
  );
};

export default Home;
