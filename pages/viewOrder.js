import Head from "next/head";
import Image from "next/image";
import styles from "../styles/ViewOrder.module.scss";
import Link from "next/link";
import HeaderComponent from "../components/HeaderComponent";

const ViewOrder = () => {
  return (
    <>
      <Head>
        <title>주문 조회하기</title>
        <meta name="description" content="주문 조회하기" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeaderComponent />
      <div className="container-fluid p-5 bg-warning text-light">
        <div className="container">
          <h1 className="display-1 fw-bold">주문 조회하기</h1>
          <h3>
            한빛마켓에서 구매하신 제품을
            <br />
            학번과 이름, 전화번호로 조회해 보아요.
          </h3>
        </div>
      </div>
    </>
  );
};

export default ViewOrder;
