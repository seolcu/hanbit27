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
  return { props: { productList } };
};

const ProductList = ({ productList }) => {
  console.log(productList);
  return (
    <>
      <Head>
        <title>대파마켓 & 굿즈</title>
        <meta name="description" content="제 27회 한빛제 대파마켓 & 굿즈" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeaderComponent />
      <div className={styles.titleOverlay}>
        <h1 className={styles.title}>대파마켓 & 굿즈</h1>
        <h2 className={styles.subtitle}>
          제고의 중고장터, 대파마켓
          <br />& 제 27회 한빛제만의 아름다운 굿즈들
        </h2>
        <div className={styles.category}>
          <button type="button" className="btn btn-light">
            모두
          </button>
          <button type="button" className="btn btn-light">
            의류
          </button>
          <button type="button" className="btn btn-light">
            교재
          </button>
          <button type="button" className="btn btn-light">
            굿즈
          </button>
        </div>
      </div>
      <div className={styles.gridContainer}>
        {productList.map((product, index) => {
          return (
            <div className={styles.productCard} key={index}>
              <Image
                src={
                  "https://firebasestorage.googleapis.com/v0/b/hanbit27-b2a04.appspot.com/o/%EC%8A%A4%ED%81%AC%EB%A6%B0.png?alt=media&token=56e0f6ac-0112-45d4-8cc1-51f4d96780d0"
                }
                alt="상품사진"
                width={400}
                height={400}
                layout="responsive"
              />
              <h2>{product.이름}</h2>
              <h3>{product.가격}원</h3>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ProductList;
