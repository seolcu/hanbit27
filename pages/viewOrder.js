import Head from "next/head";
import Image from "next/image";
import styles from "../styles/ViewOrder.module.scss";
import Link from "next/link";
import HeaderComponent from "../components/HeaderComponent";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import firestore from "../firebase/firestoreInit";
import LoginModal from "../components/LoginModal";
import { useRouter } from "next/dist/client/router";

const orderCol = collection(firestore, "OrderList");

export const getServerSideProps = async () => {
  const preOrderList = (await getDocs(orderCol)).docs.map((snapshot) =>
    snapshot.data(),
  );
  return { props: { preOrderList } };
};

const ViewOrder = ({ preOrderList }) => {
  const router = useRouter();

  const [studentId, setStudentId] = useState(Cookies.get("studentId"));
  const [studentName, setStudentName] = useState(Cookies.get("studentName"));
  const [studentPhone, setStudentPhone] = useState(Cookies.get("studentPhone"));
  const [depositorName, setDepositorName] = useState(
    Cookies.get("depositorName"),
  );

  const [orderList, setOrderList] = useState(preOrderList);
  const [filteredOrderList, setFilteredOrderList] = useState([]);

  const [deletingState, setDeletingState] = useState(false);

  const [totalPrice, setTotalPrice] = useState(0);

  const getOrderList = async () => {
    return (await getDocs(orderCol)).docs.map((snapshot) => snapshot.data());
  };

  const getFilteredOrderList = (orderList) => {
    if (orderList == []) {
      return [];
    } else {
      let snapshot = [];
      orderList.forEach((oneOrder) => {
        if (
          oneOrder.studentId == studentId &&
          oneOrder.studentName == studentName &&
          oneOrder.studentPhone == studentPhone &&
          oneOrder.depositorName == depositorName
        ) {
          snapshot.push(oneOrder);
        }
      });
      return snapshot;
    }
  };

  const getTotalPrice = (filteredOrderList) => {
    let totalPrice = 0;
    filteredOrderList.forEach((oneOrder) => {
      totalPrice += oneOrder.finalPrice;
    });
    return totalPrice;
  };

  const handleOnRefresh = async () => {
    // 새로고침
    const newOrderList = await getOrderList();
    const newFilteredOrderList = getFilteredOrderList(newOrderList);
    const newTotalPrice = getTotalPrice(newFilteredOrderList);
    setOrderList(newOrderList);
    setFilteredOrderList(newFilteredOrderList);
    setTotalPrice(newTotalPrice);
  };

  function onClickHandler() {
    router.push("/manageOrder");
  }

  return (
    <>
      <Head>
        <title>주문 조회하기</title>
        <meta name="description" content="주문 조회하기" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeaderComponent />
      <div className="container-fluid p-3 bg-secondary text-light">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <h1 className="fw-bold">주문 조회하기</h1>
            {/* <button
              type="button"
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#adminLoginModal"
            >
              주문 관리하기 (관리자)
            </button>
            <LoginModal onClickHandler={onClickHandler} /> */}
          </div>
          <h3>학번</h3>
          <input
            type="text"
            className="form-control form-control-lg mb-2"
            placeholder="학번"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
          />
          <h3>이름</h3>
          <input
            type="text"
            className="form-control form-control-lg mb-2"
            placeholder="이름"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
          />
          <h3>전화번호</h3>
          <input
            type="text"
            className="form-control form-control-lg mb-2"
            placeholder="전화번호"
            value={studentPhone}
            onChange={(e) => setStudentPhone(e.target.value)}
          />
          <h3>입금자명</h3>
          <input
            type="text"
            className="form-control form-control-lg mb-2"
            placeholder="입금자명"
            value={depositorName}
            onChange={(e) => setDepositorName(e.target.value)}
          />
          <button
            type="button"
            disabled={
              studentId == "" ||
              studentName == "" ||
              studentPhone == "" ||
              depositorName == ""
                ? true
                : false
            }
            className="btn btn-primary mt-3 fs-5"
            style={{ marginLeft: "auto", marginRight: "0", display: "block" }}
            onClick={async () => {
              await handleOnRefresh();
            }}
          >
            조회하기
          </button>
        </div>
      </div>

      {/* 카드 */}
      <div className="container bg-light p-5 mt-3 mb-5">
        {filteredOrderList.map((oneOrder, index) => {
          return (
            <div
              className="rounded border mb-3 p-3"
              key={Math.random()}
              style={{ background: "var(--bs-gray-300)" }}
            >
              <div className="d-flex align-items-center justify-content-between">
                <Link href={`/product/${oneOrder.productId}`}>
                  <a>
                    <h1 className="fw-bold m-0">{oneOrder.productName}</h1>
                  </a>
                </Link>
                {/* 입금 확인중, 입금 확인됨, 배송중, 배송완료 */}
                <h4 className="fw-bold">{oneOrder.orderStatus}</h4>
              </div>
              <p className="m-0 fs-5">
                카테고리: {oneOrder.productCategory}
                <br />
                주문일시: {oneOrder.orderHours}시 {oneOrder.orderMinutes}분
                <br />
                주문번호: {oneOrder.orderId}
              </p>
              <table className="table border table-light fs-5 fw-normal mt-3">
                <thead className="table-secondary">
                  <tr>
                    <th scope="col">옵션명</th>
                    <th scope="col">개수</th>
                    <th scope="col">가격</th>
                  </tr>
                </thead>
                <tbody>
                  {oneOrder.orderedProductList.map((oneOption, index) => {
                    return (
                      <tr key={index}>
                        <th scope="col">{oneOption.optionName}</th>
                        <th scope="col">{oneOption.quantity}</th>
                        <th scope="col">{oneOption.price}</th>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot className="table-info">
                  <tr>
                    <th scope="col">합계</th>
                    <th scope="col"></th>
                    <th scope="col">{oneOrder.finalPrice}</th>
                  </tr>
                </tfoot>
              </table>
              <button
                className="btn btn-danger"
                style={{
                  marginLeft: "auto",
                  marginRight: "0",
                  display: "block",
                }}
                disabled={deletingState}
                key={Math.random()}
                onClick={async () => {
                  setDeletingState(true);
                  const productRef = doc(
                    firestore,
                    "ProductList",
                    oneOrder.productId,
                  );
                  let productData = (await getDoc(productRef)).data();
                  oneOrder.orderedProductList.forEach((oneOption) => {
                    // 상품 재고 원상복구
                    productData.optionList[oneOption.optionId].optionStock +=
                      oneOption.quantity;
                  });
                  // 복구된 데이터 업로드
                  await setDoc(productRef, productData);
                  // 주문 삭제
                  await deleteDoc(
                    doc(firestore, "OrderList", oneOrder.orderId),
                  );
                  await handleOnRefresh();
                  setDeletingState(false);
                }}
              >
                주문취소
              </button>
            </div>
          );
        })}
        <h1 className="text-end fw-bold mt-5">
          총 구매금액: <span className="text-primary">{totalPrice}</span>
        </h1>
        <h2 className="text-end">
          우리은행 1002361418314 김상우
          <br />
          오후 2시 전까지 입금 부탁드립니다
        </h2>
      </div>
    </>
  );
};

export default ViewOrder;
