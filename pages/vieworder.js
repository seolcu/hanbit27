import Head from "next/head";
import Image from "next/image";
import styles from "../styles/ViewOrder.module.scss";
import Link from "next/link";
import HeaderComponent from "../components/HeaderComponent";

const ViewOrder = () => {
  return (
    <div>
      <Head>
        <title>주문조회</title>
        <meta name="description" content="주문 조회하기" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeaderComponent />
      <h1>주문 조회하기</h1>
      <form>
        <input type="text" placeholder="주문번호"></input>
        <br />
        <input type="text" placeholder="전화번호"></input>
      </form>
      <button>조회하기</button>
    </div>
  );
};

export default ViewOrder;
