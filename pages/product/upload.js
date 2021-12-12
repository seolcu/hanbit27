import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/ProductUpload.module.scss";
import Link from "next/link";
import HeaderComponent from "../../components/HeaderComponent";
import { useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
} from "firebase/firestore/lite";

const ProductUpload = () => {
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [defaultPrice, setDefaultPrice] = useState(0);
  const [category, setCategory] = useState("대파마켓");
  const [optionName, setOptionName] = useState("");
  const [optionPrice, setOptionPrice] = useState(0);
  const [optionStock, setOptionStock] = useState(1);
  const [optionList, setOptionList] = useState([]);

  // firebase 설정
  const firebaseConfig = {
    apiKey: "AIzaSyCUfi7nR-NNy07bL9jr9gbxfZaFv58_7I8",
    authDomain: "hanbit27-b2a04.firebaseapp.com",
    projectId: "hanbit27-b2a04",
    storageBucket: "hanbit27-b2a04.appspot.com",
    messagingSenderId: "214043574262",
    appId: "1:214043574262:web:c266001a679ca1068811d7",
  };
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  return (
    <>
      <Head>
        <title>상품 업로드</title>
        <meta
          name="description"
          content="제 27회 한빛제 한빛마켓 상품 업로드 페이지"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeaderComponent />
      <div className="container-fluid p-5 bg-secondary text-light">
        <div className="container">
          <h1 className="display-1 fw-bold">상품 업로드</h1>
          <h3>상품을 업로드 해보아요</h3>
        </div>
      </div>

      <div className="container">
        <div className="mt-3">
          <h3>관리자 비밀번호 {password == "hanbit27auth" ? "⭕" : "❌"}</h3>
          <input
            type="password"
            className="form-control form-control-lg"
            id="비밀번호"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mt-3">
          <h3>상품명</h3>
          <input
            type="text"
            className="form-control form-control-lg"
            id="상품명"
            placeholder="상품명"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mt-3">
          <h3>기본 가격</h3>
          <input
            type="number"
            className="form-control form-control-lg"
            id="기본 가격"
            placeholder="기본 가격"
            value={defaultPrice}
            onChange={(e) => setDefaultPrice(e.target.value)}
          />
        </div>
        <div className="mt-3">
          <h3>카테고리</h3>
          <select
            className="form-select"
            aria-label="Default select example"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="대파마켓">대파마켓</option>
            <option value="온라인부스">온라인부스</option>
            <option value="굿즈">굿즈</option>
            <option value="기타">기타</option>
          </select>
        </div>
        <div className="mt-3">
          <h3>사진 추가하기 (여러장 선택 가능)</h3>
          <input
            className="form-control"
            type="file"
            id="formFileMultiple"
            accept="image/*"
            multiple
          />
        </div>

        <div className="mt-3">
          <h3>옵션 추가하기</h3>
          <div className="container bg-secondary text-light border rounded p-3">
            <div>
              <h4>
                옵션명 (구매시 꼭 옵션 한개를 선택해야 하며, 여러개 선택은
                불가능합니다.)
              </h4>
              <input
                type="text"
                className="form-control form-control-lg"
                id="옵션명"
                placeholder="옵션명"
                value={optionName}
                onChange={(e) => setOptionName(e.target.value)}
              />
            </div>
            <div className="mt-3">
              <h4>가격변동 (음수값도 가능)</h4>
              <input
                type="number"
                className="form-control form-control-lg"
                id="가격 변동"
                placeholder="가격 변동"
                value={optionPrice}
                onChange={(e) => setOptionPrice(e.target.value)}
              />
            </div>
            <div className="mt-3">
              <h4>현재 재고</h4>
              <input
                type="number"
                className="form-control form-control-lg"
                id="현재 재고"
                placeholder="현재 재고"
                value={optionStock}
                onChange={(e) => setOptionStock(e.target.value)}
              />
            </div>
            <button
              className="mt-3 btn btn-light"
              onClick={() => {
                let newOptionList = [...optionList];
                newOptionList.push({
                  optionName: optionName,
                  optionPrice: optionPrice,
                  optionStock: optionStock,
                });
                setOptionList(newOptionList);
                setOptionName("");
                setOptionPrice(0);
                setOptionStock(1);
              }}
            >
              옵션 추가하기
            </button>
          </div>
        </div>

        <h3 className="mt-3">현재 옵션들</h3>
        <table className="table border table-secondary fs-5 fw-normal">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">옵션명</th>
              <th scope="col">가격변동</th>
              <th scope="col">현재 재고</th>
              <th scope="col">선택시 합계</th>
              <th scope="col">삭제</th>
            </tr>
          </thead>
          <tbody>
            {optionList.map((oneOption, index) => {
              return (
                <tr key={index}>
                  <th scope="col">{index}</th>
                  <th scope="col">{oneOption.optionName}</th>
                  <th scope="col">{oneOption.optionPrice}</th>
                  <th scope="col">{oneOption.optionStock}</th>
                  <th scope="col">
                    {parseInt(defaultPrice) + parseInt(oneOption.optionPrice)}
                  </th>
                  <th scope="col">
                    <span
                      style={{ color: "red" }}
                      onClick={() => {
                        let newOptionList = [...optionList];
                        newOptionList.splice(index, 1);
                        console.log(newOptionList);
                        setOptionList(newOptionList);
                      }}
                    >
                      ❌
                    </span>
                  </th>
                </tr>
              );
            })}
          </tbody>
        </table>
        <hr />
        <div className="d-flex mb-5 gap-2 justify-content-end">
          <Link href="/product">
            <a>
              <button className="btn btn-danger">취소하기</button>
            </a>
          </Link>
          <Link href="/product">
            <a>
              <button
                className="btn btn-primary"
                onClick={async () => {
                  const res = await addDoc(collection(db, "ProductList"), {
                    name: name,
                    defaultPrice: defaultPrice,
                    category: category,
                    optionList: optionList,
                  });
                  console.log(res);
                }}
              >
                업로드하기
              </button>
            </a>
          </Link>
        </div>
      </div>
    </>
  );
};

export default ProductUpload;
