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
  const [productData, setProductData] = useState(preProductData);

  // 선택 상품 리스트 만둘기
  const snapshot = [];
  for (let i = 0; i < productData.optionList.length; i++) snapshot.push(0);
  const [selectedOptionList, setSelectedOptionList] = useState(snapshot);

  const increaseOption = (index) => {
    const snapshot = [...selectedOptionList];
    const preValue = selectedOptionList[index];
    if (preValue < productData.optionList[index].optionStock) {
      snapshot.splice(index, 1, preValue + 1);
      setSelectedOptionList(snapshot);
    }
  };

  const decreaseOption = (index) => {
    const snapshot = [...selectedOptionList];
    const preValue = selectedOptionList[index];
    if (preValue > 0) {
      snapshot.splice(index, 1, preValue - 1);
      setSelectedOptionList(snapshot);
    }
  };

  const changeOption = (index, value) => {
    const snapshot = [...selectedOptionList];
    snapshot.splice(index, 1, parseInt(value));
    setSelectedOptionList(snapshot);
  };

  const removeOption = (index) => {
    const snapshot = [...selectedOptionList];
    snapshot.splice(index, 1, 0);
    setSelectedOptionList(snapshot);
  };

  const orderedProductList = [];
  productData.optionList.map((oneOption, index) => {
    if (selectedOptionList[index] !== 0) {
      orderedProductList.push({
        optionName: oneOption.optionName,
        price:
          parseInt(productData.defaultPrice) + parseInt(oneOption.optionPrice),
        quantity: selectedOptionList[index],
      });
    }
  });

  const [finalPrice, setFinalPrice] = useState(0);
  let finalPriceSnapshot = 0;
  orderedProductList.map((orderedProduct) => {
    finalPriceSnapshot += orderedProduct.price * orderedProduct.quantity;
  });
  if (finalPrice !== finalPriceSnapshot) {
    setFinalPrice(finalPriceSnapshot);
  }

  const orderResult = {
    productName: productData.name,
    productCategory: productData.category,
    orderedProductList: orderedProductList,
    finalPrice: finalPrice,
  };

  return (
    <>
      <Head>
        <title>한빛마켓 - {productData.name}</title>
        <meta name="description" content="제 27회 한빛제 대파마켓 & 굿즈" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MarketHeader />
      <div className="container py-3 row">
        <Image
          className="img-thumbnail col-6"
          src={productData.thumbUrl}
          alt="상품 썸네일"
          width={100}
          height={100}
        />
        <div className="col-6">
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
                <option
                  key={index}
                  value={index}
                  disabled={oneOption.optionStock == 0 ? true : false}
                >
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
          <table
            className="table border table-secondary fs-5 fw-normal mt-3"
            onClick={() => refreshProductData()}
          >
            <thead>
              <tr>
                <th scope="col">옵션명</th>
                <th scope="col">개수</th>
                <th scope="col">가격</th>
                <th scope="col">삭제</th>
              </tr>
            </thead>
            <tbody>
              {selectedOptionList.map((quantity, index) => {
                const currentOption = productData.optionList[index];
                return (
                  <tr
                    key={index}
                    style={
                      quantity == 0
                        ? { display: "none" }
                        : { display: undefined }
                    }
                  >
                    <th scope="col">{currentOption.optionName}</th>
                    <th scope="col">
                      <div className="d-flex align-items-center">
                        <button
                          className="btn btn-light"
                          onClick={() => {
                            if (quantity !== 1) {
                              decreaseOption(index);
                            }
                          }}
                        >
                          -
                        </button>
                        <div className="btn btn-light">{quantity}</div>
                        <button
                          className="btn btn-light"
                          onClick={() => {
                            if (quantity !== currentOption.optionStock)
                              increaseOption(index);
                          }}
                        >
                          +
                        </button>
                      </div>
                    </th>
                    <th scope="col">
                      {(parseInt(productData.defaultPrice) +
                        parseInt(currentOption.optionPrice)) *
                        quantity}
                    </th>
                    <th
                      scope="col"
                      className="text-danger"
                      onClick={() => removeOption(index)}
                    >
                      ❌
                    </th>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="d-flex justify-content-between">
            <h3 className="fw-bold">총 상품 금액</h3>
            <h3 className="fw-bold">{finalPrice}원</h3>
          </div>
          <div className="d-flex gap-2 justify-content-end">
            <Link href="/product">
              <a>
                <button className="btn btn-secondary fs-4 fw-bold">
                  나가기
                </button>
              </a>
            </Link>
            <button className="btn btn-primary fs-4 fw-bold">구매하기</button>
          </div>
        </div>
      </div>
      <div className="container" style={{ position: "relative" }}>
        {productData.descImageUrlList.map((url, index) => {
          return (
            <div className="d-block" key={Math.random()}>
              <Image src={url} alt="세부사진" width={100} height={100} />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Product;
