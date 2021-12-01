import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/ProductList.module.scss";
import Link from "next/link";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
import HeaderComponent from "../../components/HeaderComponent";
import { useState } from "react";

export const getStaticProps = async () => {
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
  const productCol = collection(db, "ProductList");
  const productSnapshot = await getDocs(productCol);
  const productList = productSnapshot.docs.map((doc) => doc.data());
  return { props: { productList }, revalidate: 15 };
};

const ProductList = ({ productList }) => {
  const [selectedCategory, setSelectedCategory] = useState("모두");
  const [password, setPassword] = useState("");
  const CategoryBtn = (category) => {
    return (
      <button
        type="button"
        className={
          selectedCategory == category ? "btn btn-dark" : "btn btn-light"
        }
        onClick={() => {
          setSelectedCategory(category);
        }}
      >
        {category}
      </button>
    );
  };
  return (
    <>
      <Head>
        <title>한빛마켓</title>
        <meta name="description" content="제 27회 한빛제 대파마켓 & 굿즈" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeaderComponent />
      <div className="p-5 bg-primary text-light">
        <div className="container">
          <div className="d-flex gap-3 justify-content-between">
            <p className="display-1 fw-bold">한빛마켓</p>
            <a>
              <button
                type="button"
                className="mt-2 btn btn-light"
                data-bs-toggle="modal"
                data-bs-target="#adminLoginModal"
              >
                상품 업로드(관리자)
              </button>
              {/* 관리자 로그인 모달창 */}
              <div
                className="modal fade text-dark fw-bold"
                id="adminLoginModal"
                tabIndex="-1"
                aria-labelledby="adminLoginModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="adminLoginModalLabel">
                        관리자 로그인
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      <input
                        type="password"
                        className="form-control form-control-lg"
                        id="비밀번호"
                        placeholder="비밀번호"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        취소
                      </button>
                      <Link
                        href={
                          password == "hanbit27auth" ? "/product/upload" : ""
                        }
                      >
                        <a>
                          <button
                            type="button"
                            className="btn btn-primary"
                            data-bs-dismiss="modal"
                            disabled={password == "hanbit27auth" ? false : true}
                          >
                            로그인
                          </button>
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </div>
          <h3>
            제고의 중고장터, 대파마켓
            <br />& 다양한 온라인부스
            <br />& 제 27회 한빛제만의 아름다운 굿즈들
          </h3>
          <div className="btn-group" role="group">
            {CategoryBtn("모두")}
            {CategoryBtn("대파마켓")}
            {CategoryBtn("온라인부스")}
            {CategoryBtn("굿즈")}
            {CategoryBtn("미정")}
            {CategoryBtn("기타")}
          </div>
        </div>
      </div>
      <div className="container">
        <div className={styles.gridContainer}>
          {productList.map((product, index) => {
            return (
              <div
                className="card p-0"
                key={index}
                style={
                  selectedCategory == "모두"
                    ? { display: "block" }
                    : selectedCategory == product.category
                    ? { display: "block" }
                    : { display: "none" }
                }
              >
                <Image
                  className="card-img-top"
                  src={
                    product.imageUrlList[0] || "/image/noImagePlaceHolder.png"
                  }
                  alt="상품사진"
                  width={1000}
                  height={1000}
                  quality={20}
                  layout="intrinsic"
                />
                <div className="card-body text-center">
                  <h3 className="fw-bold">{product.name}</h3>
                  <p className="fs-5 text-secondary">{product.category}</p>
                  <h4 className="text-primary">{product.defaultPrice}원</h4>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ProductList;
