import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/ProductList.module.scss";
import Link from "next/link";
import { collection, getDocs } from "firebase/firestore";
import { useState } from "react";
import firestore from "../../firebase/firestoreInit";
import { useRouter } from "next/router";
import HeaderComponent from "../../components/HeaderComponent";

const productCol = collection(firestore, "ProductList");

export const getStaticProps = async () => {
  const productList = (await getDocs(productCol)).docs.map((doc) => doc.data());
  return { props: { productList }, revalidate: 60 };
};

const ProductList = ({ productList }) => {
  const [selectedCategory, setSelectedCategory] = useState("모두");

  const router = useRouter();
  function onClickHandler() {
    router.push("/product/upload");
  }

  const CategoryBtn = (category) => {
    return (
      <button
        type="button"
        className={
          selectedCategory == category ? "btn btn-primary" : "btn btn-light"
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
      {/* <LoginModal onClickHandler={onClickHandler} /> */}
      <div className="container mb-5">
        <h1 className="text-center m-5">
          한빛마켓이 마감되었습니다!
          <br />
          구매해주신 모든 분들 감사드립니다
        </h1>
        <div className="d-flex justify-content-between my-3">
          <div className="d-flex gap-2">
            {CategoryBtn("모두")}
            {CategoryBtn("대파마켓")}
            {CategoryBtn("온라인부스")}
            {CategoryBtn("굿즈")}
            {CategoryBtn("기타")}
          </div>
          {/* <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#adminLoginModal"
          >
            업로드
          </button> */}
        </div>
        <div className={styles.gridContainer}>
          {productList.map((product, index) => {
            return (
              <Link href={`/product/${product.id}`} key={index}>
                <a
                  style={
                    selectedCategory == "모두"
                      ? { display: "block" }
                      : selectedCategory == product.category
                      ? { display: "block" }
                      : { display: "none" }
                  }
                >
                  <div className="card p-0">
                    <div className="card-img-top">
                      <Image
                        src={product.thumbUrl}
                        alt="상품사진"
                        width={1000}
                        height={1000}
                        layout="responsive"
                        objectFit={"contain"}
                        quality={50}
                      />
                    </div>
                    <div className="card-body text-center">
                      <h3 className="fw-bold">{product.name}</h3>
                      <p className="fs-5 text-secondary">{product.category}</p>
                      <h4 className="text-primary">{product.defaultPrice}원</h4>
                    </div>
                  </div>
                </a>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ProductList;
