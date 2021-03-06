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
    // ????????????
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
        <title>?????? ????????????</title>
        <meta name="description" content="?????? ????????????" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeaderComponent />
      <div className="container-fluid p-3 bg-secondary text-light">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <h1 className="fw-bold">?????? ????????????</h1>
            {/* <button
              type="button"
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#adminLoginModal"
            >
              ?????? ???????????? (?????????)
            </button>
            <LoginModal onClickHandler={onClickHandler} /> */}
          </div>
          <h3>??????</h3>
          <input
            type="text"
            className="form-control form-control-lg mb-2"
            placeholder="??????"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
          />
          <h3>??????</h3>
          <input
            type="text"
            className="form-control form-control-lg mb-2"
            placeholder="??????"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
          />
          <h3>????????????</h3>
          <input
            type="text"
            className="form-control form-control-lg mb-2"
            placeholder="????????????"
            value={studentPhone}
            onChange={(e) => setStudentPhone(e.target.value)}
          />
          <h3>????????????</h3>
          <input
            type="text"
            className="form-control form-control-lg mb-2"
            placeholder="????????????"
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
            ????????????
          </button>
        </div>
      </div>

      {/* ?????? */}
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
                {/* ?????? ?????????, ?????? ?????????, ?????????, ???????????? */}
                <h4 className="fw-bold">{oneOrder.orderStatus}</h4>
              </div>
              <p className="m-0 fs-5">
                ????????????: {oneOrder.productCategory}
                <br />
                ????????????: {oneOrder.orderHours}??? {oneOrder.orderMinutes}???
                <br />
                ????????????: {oneOrder.orderId}
              </p>
              <table className="table border table-light fs-5 fw-normal mt-3">
                <thead className="table-secondary">
                  <tr>
                    <th scope="col">?????????</th>
                    <th scope="col">??????</th>
                    <th scope="col">??????</th>
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
                    <th scope="col">??????</th>
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
                    // ?????? ?????? ????????????
                    productData.optionList[oneOption.optionId].optionStock +=
                      oneOption.quantity;
                  });
                  // ????????? ????????? ?????????
                  await setDoc(productRef, productData);
                  // ?????? ??????
                  await deleteDoc(
                    doc(firestore, "OrderList", oneOrder.orderId),
                  );
                  await handleOnRefresh();
                  setDeletingState(false);
                }}
              >
                ????????????
              </button>
            </div>
          );
        })}
        <h1 className="text-end fw-bold mt-5">
          ??? ????????????: <span className="text-primary">{totalPrice}</span>
        </h1>
        <h2 className="text-end">
          ???????????? 1002361418314 ?????????
          <br />
          ?????? 2??? ????????? ?????? ??????????????????
        </h2>
      </div>
    </>
  );
};

export default ViewOrder;
