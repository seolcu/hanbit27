/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/Product.module.scss";
import Link from "next/link";
import {
  collection,
  getDocs,
  setDoc,
  doc,
  addDoc,
  getDoc,
  Timestamp,
  deleteDoc,
} from "firebase/firestore";
import HeaderComponent from "../../components/HeaderComponent";
import { useEffect, useState } from "react";
import firestore from "../../firebase/firestoreInit";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

const productCol = collection(firestore, "ProductList");
const orderCol = collection(firestore, "OrderList");

export async function getStaticPaths() {
  const preProductDataList = (await getDocs(productCol)).docs.map((doc) =>
    doc.data(),
  );

  let paths = [];
  preProductDataList.forEach((product) => {
    paths.push({ params: { id: product.id } });
  });

  return { paths, fallback: "blocking" };
}

export const getStaticProps = async ({ params }) => {
  const productRef = doc(firestore, "ProductList", params.id);
  const preProductData = (await getDoc(productRef)).data();
  return { props: { preProductData }, revalidate: 30 };
};

const Product = ({ preProductData }) => {
  const router = useRouter();

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
        optionId: index,
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

  const [studentId, setStudentId] = useState(Cookies.get("studentId"));
  const [studentName, setStudentName] = useState(Cookies.get("studentName"));
  const [studentPhone, setStudentPhone] = useState(Cookies.get("studentPhone"));
  const [depositorName, setDepositorName] = useState(
    Cookies.get("depositorName"),
  );

  const [uploadingState, setUploadingState] = useState(false);

  const changeOptionStock = async () => {
    let newProductData = productData;
    orderedProductList.map((orderedProduct, index) => {
      const currentStock = parseInt(
        newProductData.optionList[orderedProduct.optionId].optionStock,
      );
      newProductData.optionList[orderedProduct.optionId].optionStock =
        currentStock - parseInt(orderedProduct.quantity);
    });
    await setDoc(
      doc(firestore, "ProductList", newProductData.id),
      newProductData,
    );
  };

  async function purchaseModalOnClickHandler() {
    setUploadingState(true);
    Cookies.set("studentId", studentId);
    Cookies.set("studentName", studentName);
    Cookies.set("studentPhone", studentPhone);
    Cookies.set("depositorName", depositorName);
    await changeOptionStock();
    const orderResult = {
      orderId: "",
      // 입금 확인중, 입금 확인됨, 배송중, 배송완료
      orderStatus: "입금 확인중",
      orderHours: new Date().getHours(),
      orderMinutes: new Date().getMinutes(),
      studentId: studentId,
      studentName: studentName,
      studentPhone: studentPhone,
      depositorName: depositorName,
      productId: productData.id,
      productName: productData.name,
      productCategory: productData.category,
      productThumbUrl: productData.thumbUrl,
      productDescImageUrlList: productData.descImageUrlList,
      orderedProductList: orderedProductList,
      finalPrice: finalPrice,
    };
    const docId = await addDoc(
      collection(firestore, "OrderList"),
      orderResult,
    ).then((docRef) => docRef.id);
    orderResult.orderId = docId;
    await setDoc(doc(firestore, "OrderList", docId), orderResult);
    router.push("/viewOrder");
  }

  async function onDeleteHandler() {
    setUploadingState(true);
    await deleteDoc(doc(firestore, "ProductList", productData.id));
    router.push("/product");
  }

  if (router.isFallback) {
    return (
      <>
        <div>loading...</div>
      </>
    );
  } else {
    return (
      <>
        <Head>
          <title>{productData.name}</title>
          <meta name="description" content="제 27회 한빛제 대파마켓 & 굿즈" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <HeaderComponent />
        <div className={`container py-4 px-0 ${styles.mainContainer}`}>
          <div className="container">
            <img
              src={productData.thumbUrl}
              alt="상품 썸네일"
              style={{ width: "100%", height: "auto" }}
            />
          </div>
          <div className={`container py-3 ${styles.rightContainer}`}>
            <div className="d-flex justify-content-between align-items-center">
              <h1 className="display-3 fw-bold m-0">{productData.name}</h1>
              {/* <div className="d-flex gap-1">
                <button
                  className="btn btn-warning"
                  data-bs-toggle="modal"
                  data-bs-target="#productEditModal"
                >
                  수정
                </button>
                <ProductEditModal productData={productData} />
                <button
                  className="btn btn-danger"
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#adminLoginModal"
                >
                  삭제
                </button>
                <LoginModal onClickHandler={onDeleteHandler} />
              </div> */}
            </div>
            <p className="fs-5 text-secondary m-0">
              {productData.category}
              <br />
              상품ID: {productData.id}
            </p>
            <h2 className="text-primary fw-bold">
              {productData.defaultPrice}원
            </h2>
            <select
              className="form-select"
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
            <table className="table border table-secondary fs-5 fw-normal mt-3">
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
                  <button
                    className="btn btn-secondary fs-4 fw-bold"
                    disabled={uploadingState}
                  >
                    둘러보기
                  </button>
                </a>
              </Link>
              <button className="btn btn-primary fs-4 fw-bold" disabled={true}>
                마감되었습니다.
              </button>
            </div>
          </div>
        </div>
        <div className="container mb-5 pb-5" style={{ position: "relative" }}>
          {productData.descImageUrlList.map((url, index) => {
            return (
              <img
                src={url}
                alt="세부사진"
                key={index}
                style={{ width: "100%", height: "auto" }}
              />
            );
          })}
        </div>
      </>
    );
  }
};

export default Product;
