import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/Product.module.scss";
import Link from "next/link";
import { collection, getDocs } from "firebase/firestore";
import HeaderComponent from "../../components/HeaderComponent";
import { useEffect, useState } from "react";
import firestore from "../../firebase/firestoreInit";
import MarketHeader from "../../components/MarketHeader";
import { async } from "@firebase/util";

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
  const [productData, setProductData] = useState(preProductData);

  const refreshProductData = async () => {
    const productDataList = (await getDocs(productCol)).docs.map((snapshot) =>
      snapshot.data(),
    );
    setProductData(productDataList[id]);
    console.log("data refreshed");
  };

  // 선택 상품 리스트 만둘기
  const snapshot = [];
  for (let i = 0; i < productData.optionList.length; i++) snapshot.push(0);
  const [selectedOptionList, setSelectedOptionList] = useState(snapshot);

  const increaseOption = (index) => {
    const snapshot = [...selectedOptionList];
    const preValue = selectedOptionList[index];
    snapshot.splice(index, 1, preValue + 1);
    setSelectedOptionList(snapshot);
  };

  const decreaseOption = (index) => {
    const snapshot = [...selectedOptionList];
    const preValue = selectedOptionList[index];
    snapshot.splice(index, 1, preValue - 1);
    setSelectedOptionList(snapshot);
  };

  const removeOption = (index) => {
    const snapshot = [...selectedOptionList];
    snapshot.splice(index, 1, 0);
    setSelectedOptionList(snapshot);
  };

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
            onClick={async () => refreshProductData()}
            onChange={(e) => {
              if (e.target.value !== "placeholder") {
                increaseOption(e.target.value);
                e.target.value = "placeholder";
              }
            }}
          >
            <option value="placeholder">옵션 선택</option>
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
          {selectedOptionList}
          <table className="table border table-secondary fs-5 fw-normal mt-3">
            <thead>
              <tr>
                <th scope="col">옵션명</th>
                <th scope="col">개수</th>
                <th scope="col">가격</th>
              </tr>
            </thead>
          </table>
          <div className="d-flex justify-content-between">
            <h3 className="fw-bold">총 상품 금액</h3>
            <h3 className="fw-bold">~원</h3>
          </div>
          <div className="d-flex gap-2">
            <button className="btn btn-secondary fs-4 fw-bold">나가기</button>
            <button className="btn btn-primary fs-4 fw-bold">구매하기</button>
          </div>
        </div>
      </div>
      {productData.descImageUrlList.map((url, index) => {
        <div className="container" style={{ position: "relative" }}>
          <Image src={url} alt="세부사진" layout="fill" />
        </div>;
      })}
    </>
  );
};

export default Product;
