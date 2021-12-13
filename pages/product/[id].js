import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/Product.module.scss";
import Link from "next/link";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
import HeaderComponent from "../../components/HeaderComponent";
import { useState } from "react";
import { useRouter } from "next/router";

export async function getStaticPaths() {
  const firebaseConfig = {
    apiKey: "AIzaSyCUfi7nR-NNy07bL9jr9gbxfZaFv58_7I8",
    authDomain: "hanbit27-b2a04.firebaseapp.com",
    projectId: "hanbit27-b2a04",
    storageBucket: "hanbit27-b2a04.appspot.com",
    messagingSenderId: "214043574262",
    appId: "1:214043574262:web:c266001a679ca1068811d7",
  };
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const productCol = collection(db, "ProductList");
  const productSnapshot = await getDocs(productCol);
  const productList = productSnapshot.docs.map((doc) => doc.data());

  let paths = [];
  for (let i = 0; i < productList.length; i++) {
    paths.push({ params: { id: i.toString() } });
  }
  return { paths, fallback: false };
}

export const getStaticProps = async ({ params }) => {
  const firebaseConfig = {
    apiKey: "AIzaSyCUfi7nR-NNy07bL9jr9gbxfZaFv58_7I8",
    authDomain: "hanbit27-b2a04.firebaseapp.com",
    projectId: "hanbit27-b2a04",
    storageBucket: "hanbit27-b2a04.appspot.com",
    messagingSenderId: "214043574262",
    appId: "1:214043574262:web:c266001a679ca1068811d7",
  };
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const productCol = collection(db, "ProductList");
  const productSnapshot = await getDocs(productCol);
  const productList = productSnapshot.docs.map((doc) => doc.data());
  return { props: { productList }, revalidate: 15 };
};

const Product = ({ productList }) => {
  const router = useRouter();
  const { id } = router.query;
  const productInfo = productList[id];

  return (
    <>
      <Head>
        <title>{productInfo.name}</title>
        <meta name="description" content="제 27회 한빛제 대파마켓 & 굿즈" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeaderComponent />
      <div className="container d-flex">
        <div>이미지</div>
        <div>
          <h1></h1>
        </div>
      </div>
    </>
  );
};

export default Product;
