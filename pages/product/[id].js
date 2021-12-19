import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/Product.module.scss";
import Link from "next/link";
import { collection, getDocs } from "firebase/firestore";
import HeaderComponent from "../../components/HeaderComponent";
import { useEffect, useState } from "react";
import firestore from "../../firebase/firestoreInit";
import MarketHeader from "../../components/MarketHeader";

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
  const [productData, setProductInfo] = useState(preProductData);
  const [selectedOptionId, setSelectedOptionId] = useState(0);

  return (
    <>
      <Head>
        <title>한빛마켓 - {productData.name}</title>
        <meta name="description" content="제 27회 한빛제 대파마켓 & 굿즈" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MarketHeader />
      <div className={`container py-4 ${styles.mainContainer}`}>
        <div className="container">
          <Image
            className="img-thumbnail"
            src={productData.thumbUrl}
            alt="상품 썸네일"
            width={1000}
            height={1000}
            layout="responsive"
            objectFit={"contain"}
            quality={100}
          />
        </div>
        <div className={`container py-3 ${styles.rightContainer}`}>
          <h1 className="display-3 fw-bold">{productData.name}</h1>
          <h2 className="text-primary">{productData.defaultPrice}원</h2>
          <select
            className="form-select"
            value={selectedOptionId}
            onChange={(e) => setSelectedOptionId(e.target.value)}
          >
            {productData.optionList.map((oneOption, index) => {
              return (
                <option key={index} value={index}>
                  {oneOption.optionName}{" "}
                  {oneOption.optionPrice > 0
                    ? `(+${oneOption.optionPrice})`
                    : oneOption.optionPrice < 0
                    ? `(${oneOption.optionPrice})`
                    : ""}{" "}
                  [재고: {oneOption.optionStock}]
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
