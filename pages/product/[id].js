import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/Product.module.scss";
import Link from "next/link";
import { collection, getDocs } from "firebase/firestore";
import HeaderComponent from "../../components/HeaderComponent";
import { useEffect, useState } from "react";
import firestore from "../../firebase/firestoreInit";

const productCol = collection(firestore, "ProductList");

export async function getStaticPaths() {
  const preProductDataList = (await getDocs(productCol)).docs.map((doc) =>
    doc.data(),
  );

  let paths = [];
  for (let i = 0; i < preProductDataList.length; i++) {
    paths.push({ params: { id: i.toString() } });
  }
  return { paths, fallback: false };
}

export const getStaticProps = async ({ params }) => {
  const id = params.id;
  const preProductDataList = (await getDocs(productCol)).docs.map((doc) =>
    doc.data(),
  );
  const preProductData = preProductDataList[id];
  return { props: { id, preProductData }, revalidate: 10 };
};

const Product = ({ id, preProductData }) => {
  const [productInfo, setProductInfo] = useState(preProductData);

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
            className="img-thumbnail"
            src={productInfo.thumbUrl}
            alt="상품 썸네일"
            width={1000}
            height={1000}
            layout="responsive"
            objectFit={"contain"}
            quality={100}
          />
        </div>
        <div className={`container py-3 ${styles.rightContainer}`}>
          <h1 className="display-3 fw-bold">{productInfo.name}</h1>
          <h2 className="text-primary">{productInfo.defaultPrice}원</h2>
          <select
            className="form-select"
            onChange={(e) => setSelectedOption(e.target.value)}
          >
            {productInfo.optionList.map((oneOption, index) => {
              return (
                <option key={index} value={oneOption} defaultValue={index == 0}>
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
