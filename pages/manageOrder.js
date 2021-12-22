import Head from "next/head";
import Link from "next/link";
import HeaderComponent from "../components/HeaderComponent";
import Image from "next/image";
import { useState } from "react";
import firestore from "../firebase/firestoreInit";

const ManageOrderPage = () => {
  const [sortBy, setSortBy] = useState("입금자명");
  const [classifyBy, setClassifyBy] = useState("모두");

  const SortingBtn = (sorting) => {
    return (
      <button
        type="button"
        className={sortBy == sorting ? "btn btn-primary" : "btn btn-light"}
        onClick={() => {
          setSortBy(sorting);
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
        onClick={() => {
          setClassifyBy(classifying);
        }}
      >
        {classifying}
      </button>
    );
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
    </>
  );
};

export default ManageOrderPage;
