import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/ProductUpload.module.scss";
import Link from "next/link";
import HeaderComponent from "../../components/HeaderComponent";
import { useState } from "react";

const ProductUpload = () => {
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [defaultPrice, setDefaultPrice] = useState(0);
  const [optionName, setOptionName] = useState("");
  const [optionPrice, setOptionPrice] = useState(0);
  const [optionList, setOptionList] = useState([
    { optionName: "기본옵션", optionPrice: 0 },
  ]);

  const TableBody = () => {
    const result = [];
    for (let i = 0; i < optionList.length; i++) {
      result.push(
        <tr key={i}>
          <th scope="col">{i}</th>
          <th scope="col">{optionList[i].optionName}</th>
          <th scope="col">{optionList[i].optionPrice}</th>
          <th
            scope="col"
            onClick={() => {
              console.log(optionList);
              setOptionList([...optionList].splice(i, 1));
            }}
          >
            ❌
          </th>
        </tr>,
      );
    }
    return result;
  };

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
          <h3>옵션 추가하기</h3>
          <div className="container bg-secondary text-light border rounded p-3">
            <div>
              <h4>옵션명</h4>
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
              <h4>가격 변동</h4>
              <input
                type="number"
                className="form-control form-control-lg"
                id="가격 변동"
                placeholder="가격 변동"
                value={optionPrice}
                onChange={(e) => setOptionPrice(e.target.value)}
              />
            </div>
            <button
              className="mt-3 btn btn-primary"
              onClick={() => {
                setOptionList([
                  ...optionList,
                  { optionName: optionName, optionPrice: optionPrice },
                ]);
                setOptionName("");
                setOptionPrice(0);
              }}
            >
              옵션 추가하기
            </button>
          </div>
        </div>

        <h3 className="mt-3">현재 옵션들</h3>
        <table className="table h4 border table-secondary">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">옵션명</th>
              <th scope="col">가격변동(음수도 가능)</th>
            </tr>
          </thead>
          <tbody>
            <TableBody />
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ProductUpload;
