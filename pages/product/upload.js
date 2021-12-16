import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/ProductUpload.module.scss";
import Link from "next/link";
import HeaderComponent from "../../components/HeaderComponent";
import { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { useRouter } from "next/dist/client/router";
import db from "../../firebase/fireStoreInit";
import storage from "../../firebase/storageInit";

const ProductUpload = () => {
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [defaultPrice, setDefaultPrice] = useState(0);
  const [category, setCategory] = useState("대파마켓");
  const [optionName, setOptionName] = useState("");
  const [optionPrice, setOptionPrice] = useState(0);
  const [optionStock, setOptionStock] = useState(1);
  const [optionList, setOptionList] = useState([]);
  const [optionPlusMinus, setOptionPlusMinus] = useState("+");

  // 리스트 아님
  const [selectedThumbnail, setSelectedThumbnail] = useState("");

  // 리스트
  const [selectedFileList, setSelectedFileList] = useState("");

  const [uploadingState, setUploadingState] = useState(false);

  // 페이지이동
  const router = useRouter();

  // 참조: https://firebase.google.com/docs/storage/web/upload-files
  const uploadImage = (image) => {
    return new Promise((resolve, reject) => {
      const storageRef = ref(storage, `images/${image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          // Handle unsuccessful uploads
          console.log(`Error uploading file ${image.name}: ${error}`);
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log(`File ${image.name} available at`, downloadURL);
            resolve(downloadURL);
          });
        },
      );
    });
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
            onChange={(e) => setDefaultPrice(parseInt(e.target.value))}
          />
        </div>
        <div className="mt-3">
          <h3>카테고리</h3>
          <select
            className="form-select"
            aria-label="Default select example"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="대파마켓">대파마켓</option>
            <option value="온라인부스">온라인부스</option>
            <option value="굿즈">굿즈</option>
            <option value="미정">미정</option>
            <option value="기타">기타</option>
          </select>
        </div>
        <div className="mt-3">
          <h3>썸네일 추가하기 (한 장)</h3>
          <input
            className="form-control"
            type="file"
            id="formFile"
            accept="image/*"
            onChange={(e) => setSelectedThumbnail(e.target.files[0])}
          />
        </div>
        <div className="mt-3">
          <h3>상품 설명 사진들 (여러장, ctrl 누른채로 순서대로 선택하기)</h3>
          <input
            className="form-control"
            type="file"
            id="formFileMultiple"
            accept="image/*"
            multiple
            onChange={(e) => setSelectedFileList(e.target.files)}
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
              <div className="d-flex">
                <h4>가격변동</h4>
                <form
                  className="fs-5 ms-2"
                  value={optionPlusMinus}
                  onChange={(e) => setOptionPlusMinus(e.target.value)}
                >
                  <input
                    className="form-check-input"
                    type="radio"
                    name="optionPrice"
                    value="+"
                    checked={optionPlusMinus == "+"}
                  />
                  <label className="form-check-label">증가</label>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="optionPrice"
                    value="-"
                    checked={optionPlusMinus == "-"}
                  />
                  <label className="form-check-label">감소</label>
                </form>
              </div>
              <input
                type="number"
                className="form-control form-control-lg"
                id="가격 변동"
                placeholder="가격 변동"
                value={optionPrice}
                // 절댓값으로 들어감
                onChange={(e) => setOptionPrice(parseInt(e.target.value))}
                min={0}
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
                onChange={(e) => setOptionStock(parseInt(e.target.value))}
                min={0}
              />
            </div>
            <button
              className="mt-3 btn btn-light"
              onClick={() => {
                let newOptionList = [...optionList];
                newOptionList.push({
                  optionName: optionName,
                  optionPrice:
                    optionPlusMinus == "+" ? optionPrice : -optionPrice,
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
                  {/* 그대로 */}
                  <th scope="col">{oneOption.optionPrice}</th>
                  <th scope="col">{oneOption.optionStock}</th>
                  <th scope="col">{defaultPrice + oneOption.optionPrice}</th>
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
              <button className="btn btn-danger" disabled={uploadingState}>
                취소하기
              </button>
            </a>
          </Link>

          <button
            className="btn btn-primary"
            disabled={uploadingState}
            onClick={async (e) => {
              setUploadingState(true);
              let thumbUrl = "/image/noImagePlaceHolder.png";
              if (selectedFileList) {
                thumbUrl = await uploadImage(selectedThumbnail);
              }
              let imageUrlList = [];
              for (let i = 0; i < selectedFileList.length; i++) {
                const imageUrlRes = await uploadImage(selectedFileList[i]);
                imageUrlList.push(imageUrlRes);
              }
              console.log("imageUrlList:", imageUrlList);
              const resultData = {
                name: name,
                defaultPrice: defaultPrice,
                category: category,
                thumbUrl: thumbUrl,
                imageUrlList: imageUrlList,
                optionList: optionList,
              };
              console.log("resultData:", resultData);
              const res = await addDoc(
                collection(db, "ProductList"),
                resultData,
              );
              console.log(res);
              e.preventDefault();
              router.push("/product");
            }}
          >
            {uploadingState == true ? "업로드 중..." : "업로드"}
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductUpload;
