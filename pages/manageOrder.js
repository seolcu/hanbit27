import Head from "next/head";
import Link from "next/link";
import HeaderComponent from "../components/HeaderComponent";
import Image from "next/image";
import { useEffect, useState } from "react";
import firestore from "../firebase/firestoreInit";
import { collection, getDocs, setDoc, doc } from "firebase/firestore";
import { async } from "@firebase/util";

export const getServerSideProps = async () => {
  const preOrderList = (
    await getDocs(collection(firestore, "OrderList"))
  ).docs.map((doc) => doc.data());
  return { props: { preOrderList } };
};

const ManageOrderPage = ({ preOrderList }) => {
  const [sortBy, setSortBy] = useState("");
  const [classifyBy, setClassifyBy] = useState("모두");

  const [orderList, setOrderList] = useState(preOrderList);
  const [sortedOrderList, setSortedOrderList] = useState([]);

  const [deletingState, setDeletingState] = useState(false);

  const SortingBtn = (sorting) => {
    return (
      <button
        type="button"
        className={sortBy == sorting ? "btn btn-primary" : "btn btn-light"}
        onClick={async () => {
          // 새로고침
          setSortBy(sorting);
          const newOrderList = await getOrderList();
          setOrderList(newOrderList);
          // 정렬
          let newSortedOrderList = [];
          if (sorting == "입금자명") {
            newSortedOrderList = sortByDepositorName(newOrderList);
          } else if (sorting == "학번") {
            newSortedOrderList = sortByStudentId(newOrderList);
          }
          setSortedOrderList(newSortedOrderList);
        }}
      >
        {sorting}
      </button>
    );
  };

  const ClassifyingBtn = (classifying) => {
    return (
      <button
        type="button"
        className={
          classifyBy == classifying ? "btn btn-primary" : "btn btn-light"
        }
        onClick={async () => {
          // 새로고침만 하면 됨, 분류는 CSS display에서만 수정
          setClassifyBy(classifying);
          const newOrderList = await getOrderList();
          setOrderList(newOrderList);
        }}
      >
        {classifying}
      </button>
    );
  };

  const getOrderList = async () => {
    return (await getDocs(collection(firestore, "OrderList"))).docs.map((doc) =>
      doc.data(),
    );
  };

  const sortByDepositorName = (orderList) => {
    const sortedOrderList = orderList.sort(function (a, b) {
      if (a.depositorName > b.depositorName) {
        return 1;
      } else if (a.depositorName == b.depositorName) {
        return 0;
      } else if (a.depositorName < b.depositorName) {
        return -1;
      }
    });
    return sortedOrderList;
  };

  const sortByStudentId = (orderList) => {
    const sortedOrderList = orderList.sort(function (a, b) {
      if (a.studentId > b.studentId) {
        return 1;
      } else if (a.studentId == b.studentId) {
        return 0;
      } else if (a.studentId < b.studentId) {
        return -1;
      }
    });
    return sortedOrderList;
  };

  return (
    <>
      <Head>
        <title>주문 처리</title>
        <meta name="description" content="제 27회 한빛마켓 주문 처리" />
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
      </Head>
      <HeaderComponent />
      <div className="container-fluid bg-danger text-light p-5">
        <div className="container">
          <h1 className="fw-bold display-1">주문 처리하기</h1>
          <div className="d-flex gap-2 mb-2">
            <h3 className="m-0">정렬:</h3>
            {SortingBtn("입금자명")}
            {SortingBtn("학번")}
          </div>
          <div className="d-flex gap-2">
            <h3 className="m-0">상태 분류:</h3>
            {ClassifyingBtn("모두")}
            {ClassifyingBtn("입금 확인중")}
            {ClassifyingBtn("입금 확인됨")}
            {ClassifyingBtn("배송중")}
            {ClassifyingBtn("배송완료")}
          </div>
        </div>
      </div>
      <div className="container mt-3">
        {sortedOrderList.map((oneOrder, index) => {
          return (
            <div
              className="rounded border mb-3 p-3"
              key={Math.random()}
              style={{ background: "var(--bs-gray-300)" }}
            >
              <div className="d-flex align-items-center justify-content-between">
                <Link href={`/product/${oneOrder.productId}`}>
                  <a>
                    <h2 className="fw-bold m-0">
                      입금자명: {oneOrder.depositorName}
                      <br />
                      받는사람: {oneOrder.studentId} {oneOrder.studentName}
                      <br />
                      상품명: {oneOrder.productName}
                    </h2>
                  </a>
                </Link>
                {/* 입금 확인중, 입금 확인됨, 배송중, 배송완료 */}
                <h4 className="fw-bold">
                  <select
                    className="form-select"
                    defaultValue={oneOrder.orderStatus}
                    onChange={async (e) => {
                      let editedOrder = oneOrder;
                      editedOrder.orderStatus = e.target.value;
                      console.log(editedOrder);
                      await setDoc(
                        doc(firestore, "OrderList", oneOrder.orderId),
                        editedOrder,
                      );
                    }}
                  >
                    <option value="입금 확인중">입금 확인중</option>
                    <option value="입금 확인됨">입금 확인됨</option>
                    <option value="배송중">배송중</option>
                    <option value="배송완료">배송완료</option>
                  </select>
                </h4>
              </div>
              <h5 className="m-0 fs-5">
                카테고리: {oneOrder.productCategory}
                <br />
                주문일시: {oneOrder.orderHours}시 {oneOrder.orderMinutes}분
                <br />
                주문번호: {oneOrder.orderId}
              </h5>
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
      </div>
    </>
  );
};

export default ManageOrderPage;
