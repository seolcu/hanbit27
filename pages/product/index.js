import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/ProductList.module.scss";
import Link from "next/link";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
import HeaderComponent from "../../components/HeaderComponent";

export const getServerSideProps = async () => {
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
  return { props: { productList } };
};

const ProductList = ({ productList }) => {
  console.log(productList);
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
          <p className="display-1 fw-bold">한빛마켓</p>
          <h3>
            제고의 중고장터, 대파마켓
            <br />& 다양한 온라인부스
            <br />& 제 27회 한빛제만의 아름다운 굿즈들
          </h3>
          <div className="d-flex justify-content-between">
            <div className="d-flex gap-1">
              <button type="button" className="btn btn-light">
                모두
              </button>
              <button type="button" className="btn btn-light">
                의류
              </button>
              <button type="button" className="btn btn-light">
                교재
              </button>
              <button type="button" className="btn btn-light">
                굿즈
              </button>
            </div>
            <Link href="/product/upload">
              <a>
                <button className="btn btn-light">
                  상품 업로드하기(관리자)
                </button>
              </a>
            </Link>
          </div>
        </div>
      </div>
      <div className="container">
        <div className={styles.gridContainer}>
          {productList.map((product, index) => {
            return (
              <div className="card p-0" key={index}>
                <Image
                  className="card-img-top"
                  src={
                    "https://firebasestorage.googleapis.com/v0/b/hanbit27-b2a04.appspot.com/o/821b92d616639ecfda49526554e9d693.jpg?alt=media&token=f0df3cf4-4bb6-49bf-9eef-9722c23b82b8"
                  }
                  alt="상품사진"
                  width={500}
                  height={500}
                  quality={100}
                />
                <div className="card-body">
                  <p className="h3 fw-bold">{product.이름}</p>
                  <p className="h4 text-primary">{product.가격}원</p>
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
