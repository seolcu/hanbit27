import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/ProductList.module.scss";
import Link from "next/link";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
import HeaderComponent from "../../components/HeaderComponent";

export const getServerSideProps = async () => {
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
  console.log(productList);
  return { props: { productList } };
};

const ProductList = ({ productList }) => {
  console.log(productList);
  return (
    <div>
      <Head>
        <title>한빛마켓</title>
        <meta name="description" content="제 27회 한빛제 굿즈마켓" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeaderComponent />
      <h1>한빛마켓</h1>
      <h2>상품목록</h2>
      <ul></ul>
    </div>
  );
};

export default ProductList;
