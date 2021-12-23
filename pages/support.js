import Head from "next/head";
import Link from "next/link";
import HeaderComponent from "../components/HeaderComponent";
import Image from "next/image";
import { useState } from "react";
import Cookies from "js-cookie";
import firestore from "../firebase/firestoreInit";
import { addDoc, collection } from "firebase/firestore";

const SupportPage = () => {
  const [studentId, setStudentId] = useState(Cookies.get("studentId"));
  const [studentName, setStudentName] = useState(Cookies.get("studentName"));
  const [studentPhone, setStudentPhone] = useState(Cookies.get("studentPhone"));
  const [content, setContent] = useState("");

  const [submitState, setSubmitState] = useState(false);

  const handleOnSubmit = async () => {
    await addDoc(collection(firestore, "Complain"), {
      studentId: studentId,
      studentName: studentName,
      studentPhone: studentPhone,
      content: content,
    });
    setSubmitState(true);
  };
  return (
    <>
      <Head>
        <title>고객센터</title>
        <meta name="description" content="제 27회 고객센터" />
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
      </Head>
      <HeaderComponent />
      <div className="container-fluid bg-info text-light p-5">
        <div className="container">
          <h1 className="fw-bold display-1">고객센터 문의하기</h1>
          <h2>
            ❗꽃배달을 위해 부득이하게 코팅편지 뒤 학번과 꽃 종류를
            써두었습니다. 불편을 느끼신 분들에게 사과의 말씀 드립니다. 뒤 글자는
            아세톤이나 네일리무버로 지우는 것이 가능하므로, 편지를 깨끗이
            보관하고 싶으신 분들은 죄송하지만 개인적으로 지워주시길 바랍니다.
            다시 한번 죄송합니다.-부스운영팀-
          </h2>
        </div>
      </div>
      <div className="container mt-3 bg-light p-3">
        <h1 className="fw-bold">고객센터 문의하기</h1>
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
        <h3>문의 내용</h3>
        <input
          type="text"
          className="form-control form-control-lg mb-2"
          placeholder="문의 내용 (주문하신 상품에 대한 문의일 경우 주문번호를 알려주세요!)"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button
          type="button"
          disabled={
            studentId == "" ||
            studentName == "" ||
            studentPhone == "" ||
            content == "" ||
            submitState == true
              ? true
              : false
          }
          className="btn btn-primary mt-3 fs-5"
          style={{ marginLeft: "auto", marginRight: "0", display: "block" }}
          onClick={async () => {
            await handleOnSubmit();
          }}
        >
          {submitState ? "제출 완료!" : "제출하기"}
        </button>
      </div>
    </>
  );
};

export default SupportPage;
