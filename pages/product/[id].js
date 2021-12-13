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
  const [selectedOption, setSelectedOption] = useState(
    productInfo.optionList[0],
  );
  console.log(productInfo);

  return (
    <>
      <Head>
        <title>한빛마켓 - {productInfo.name}</title>
        <meta name="description" content="제 27회 한빛제 대파마켓 & 굿즈" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeaderComponent />
      <div className={`container py-4 ${styles.mainContainer}`}>
        <div className="container">
          <Image
            className="rounded"
            src={productInfo.thumbUrl}
            alt="상품 썸네일"
            width={1000}
            height={1000}
            quality={100}
          />
        </div>
        <div className={`container m-5 ${styles.rightContainer}`}>
          <h1 className="display-3 fw-bold">{productInfo.name}</h1>
          <h2 className="text-primary">{productInfo.defaultPrice}원</h2>
          <select
            className="form-select"
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
          >
            {productInfo.optionList.map((oneOption, index) => {
              return (
                <option key={index} value={oneOption}>
                  {oneOption.optionName}{" "}
                  {oneOption.optionPrice > 0
                    ? `(+${oneOption.optionPrice})`
                    : oneOption.optionPrice < 0
                    ? `(${oneOption.optionPrice})`
                    : ""}
                </option>
              );
            })}
          </select>
        </div>
      </div>
    </>
  );
};

export default Product;
