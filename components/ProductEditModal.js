import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { useRouter } from "next/dist/client/router";
import firestore from "../firebase/firestoreInit";
import axios from "axios";

const ProductEditModal = ({ productData }) => {
  const [password, setPassword] = useState("");
  const [name, setName] = useState(productData.name);
  const [defaultPrice, setDefaultPrice] = useState(productData.defaultPrice);
  const [category, setCategory] = useState(productData.category);
  const [optionName, setOptionName] = useState("");
  const [optionPrice, setOptionPrice] = useState(0);
  const [optionStock, setOptionStock] = useState(1);
  const [optionList, setOptionList] = useState(productData.optionList);
  const [optionPlusMinus, setOptionPlusMinus] = useState("+");

  // 리스트 아님
  const [thumbUrl, setThumbUrl] = useState(productData.thumbUrl);

  // 리스트
  const [descImageUrlList, setDescImageUrlList] = useState(
    productData.descImageUrlList,
  );

  const [thumbUploadingState, setThumbUploadingState] = useState(false);
  const [descImageUploadingState, setDescImageUploadingState] = useState(false);

  // 페이지이동
  const router = useRouter();

  const uploadImage = async (image) => {
    let body = new FormData();
    body.set("key", "4deb565af5d5f794861373a3825fd34d");
    body.append("image", image);

    const url = await axios({
      method: "post",
      url: "https://api.imgbb.com/1/upload",
      data: body,
    }).then((snapshot) => {
      return snapshot.data.data.image.url;
    });
    return url;
  };

  return (
    <div
      className="modal fade text-dark fw-bold"
      id="productEditModal"
      tabIndex="-1"
      aria-labelledby="productEditModalLabel"
      aria-hidden="true"
      data-bs-backdrop="static"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="productEditModalLabel">
              상품 수정
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <div className="modal-body">
            <div className="mt-3">
              <h3>
                관리자 비밀번호 {password == "hanbit27auth" ? "⭕" : "❌"}
              </h3>
              <input
                type="password"
                className="form-control form-control-lg"
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
                <option value="기타">기타</option>
              </select>
            </div>

            <div className="mt-3">
              <h3>썸네일 (한장, 사진 누르면 삭제)</h3>
              <h4>{thumbUploadingState && "업로드 중..."}</h4>
              <Image
                onClick={() => {
                  // 기본 이미지로 변경
                  setThumbUrl("/image/noImagePlaceHolder.png");
                }}
                alt={`썸네일`}
                src={thumbUrl}
                width={150}
                height={150}
                objectFit="contain"
                // 강제 리렌더링
                key={Math.random()}
              />
              <input
                className="form-control"
                type="file"
                accept="image/*"
                onChange={async (e) => {
                  setThumbUploadingState(true);
                  e.target.files[0] &&
                    setThumbUrl(await uploadImage(e.target.files[0]));
                  setThumbUploadingState(false);
                }}
                disabled={thumbUploadingState}
              />
            </div>

            <div className="mt-3">
              <h3>
                상품 설명 사진 (여러 장 가능, 순서대로 들어감, 사진 누르면 삭제)
              </h3>
              <h4>{descImageUploadingState && "업로드 중..."}</h4>
              <div className="d-flex">
                {descImageUrlList.map((url, index) => {
                  return (
                    <div key={Math.random()}>
                      <Image
                        onClick={() => {
                          // 이미지 삭제
                          const snapshot = [...descImageUrlList];
                          snapshot.splice(index, 1);
                          setDescImageUrlList(snapshot);
                        }}
                        alt={`사진${index}`}
                        src={url}
                        width={150}
                        height={150}
                        objectFit="contain"
                        // 강제 리렌더링
                        key={Math.random()}
                      />
                    </div>
                  );
                })}
              </div>
              <input
                className="form-control"
                type="file"
                accept="image/*"
                onChange={async (e) => {
                  if (e.target.files[0].name) {
                    setDescImageUploadingState(true);
                    const url = await uploadImage(e.target.files[0]);
                    const snapshot = [...descImageUrlList, url];
                    setDescImageUrlList(snapshot);
                    setDescImageUploadingState(false);
                  }
                }}
                disabled={descImageUploadingState}
              />
            </div>

            <div className="mt-3">
              <h3>옵션 추가하기</h3>
              <div className="container bg-secondary text-light border rounded p-3">
                <div>
                  <h4>옵션명 (옵션 1개 필수선택, 여러개 선택 불가)</h4>
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
                    <form className="fs-5 ms-2">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="optionPrice"
                        checked={optionPlusMinus == "+"}
                        onChange={(e) => setOptionPlusMinus("+")}
                      />
                      <label className="form-check-label">증가</label>
                      <input
                        className="form-check-input"
                        type="radio"
                        name="optionPrice"
                        checked={optionPlusMinus == "-"}
                        onChange={(e) => setOptionPlusMinus("-")}
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
                      <th scope="col">
                        {defaultPrice + oneOption.optionPrice}
                      </th>
                      <th scope="col">
                        <span
                          style={{ color: "red" }}
                          onClick={() => {
                            let newOptionList = [...optionList];
                            newOptionList.splice(index, 1);
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
            <div className="d-flex mb-5 gap-2 justify-content-end"></div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              disabled={thumbUploadingState || descImageUploadingState}
            >
              취소하기
            </button>
            <button
              type="button"
              data-bs-dismiss="modal"
              className="btn btn-warning"
              disabled={
                thumbUploadingState ||
                descImageUploadingState ||
                password !== "hanbit27auth"
              }
              onClick={async (e) => {
                let resultData = {
                  id: productData.id,
                  name: name,
                  defaultPrice: defaultPrice,
                  category: category,
                  thumbUrl: thumbUrl,
                  descImageUrlList: descImageUrlList,
                  optionList: optionList,
                };
                await setDoc(
                  doc(firestore, "ProductList", productData.id),
                  resultData,
                );
                router.push("/product");
              }}
            >
              {thumbUploadingState || descImageUploadingState
                ? "사진 업로드 중..."
                : "업로드"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductEditModal;