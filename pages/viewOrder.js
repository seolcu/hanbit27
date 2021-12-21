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

const orderCol = collection(firestore, "OrderList");

export const getServerSideProps = async () => {
  const preOrderList = (await getDocs(orderCol)).docs.map((snapshot) =>
    snapshot.data(),
  );
  return { props: { preOrderList } };
};

const ViewOrder = ({ preOrderList }) => {
  const [studentId, setStudentId] = useState(Cookies.get("studentId"));
  const [studentName, setStudentName] = useState(Cookies.get("studentName"));
  const [studentPhone, setStudentPhone] = useState(Cookies.get("studentPhone"));

  const [orderList, setOrderList] = useState(preOrderList);
  const [filteredOrderList, setFilteredOrderList] = useState([]);

  const [deletingState, setDeletingState] = useState(false);

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
          oneOrder.studentPhone == studentPhone
        ) {
          snapshot.push(oneOrder);
        }
      });
      return snapshot;
    }
  };

  async function updateFilteredList() {
    // 새로고침
    const newOrderList = await getOrderList();
    console.log(newOrderList);
    setOrderList(newOrderList);
    // 필터리스트 새로고침
    const newFilteredOrderList = getFilteredOrderList(newOrderList);
    console.log(newFilteredOrderList);
    setFilteredOrderList(newFilteredOrderList);
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
          <h1 className="fw-bold">주문 조회하기</h1>
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
          <button
            type="button"
            disabled={
              studentId == "" || studentName == "" || studentPhone == ""
                ? true
                : false
            }
            className="btn btn-primary mt-3 fs-5"
            onClick={updateFilteredList}
          >
            조회하기
          </button>
        </div>
      </div>
      {filteredOrderList.map((oneOrder, index) => {
        return (
          <div
            className="container rounded bg-light border my-3 p-3"
            key={Math.random()}
          >
            <div className="d-flex align-items-center">
              <h1 className="fw-bold m-0">{oneOrder.productName}</h1>
              <p className="m-0 fs-5 text-secondary">
                : {oneOrder.productCategory}
              </p>
            </div>
            <table className="table border table-secondary fs-5 fw-normal mt-3">
              <thead>
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
            </table>
            <button
              className="btn btn-danger"
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
                console.log("restored productData:", productData);
                // 복구된 데이터 업로드
                await setDoc(productRef, productData);
                // 주문 삭제
                await deleteDoc(doc(firestore, "OrderList", oneOrder.orderId));
                await updateFilteredList();
                // 상태수정
                setDeletingState(false);
              }}
            >
              주문취소
            </button>
          </div>
        );
      })}
    </>
  );
};

export default ViewOrder;
