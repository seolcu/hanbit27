import styles from "./MarketHeader.module.scss";
import Link from "next/link";
import { useState } from "react";

const LoginModal = ({ password, setPassword }) => {
  return (
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
            <Link href={password == "hanbit27auth" ? "/product/upload" : ""}>
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
  );
};

const MarketHeader = () => {
  const [password, setPassword] = useState("");
  return (
    <>
      <LoginModal password={password} setPassword={setPassword} />
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="container">
          <div className="d-flex align-items-center">
            <Link href="/">
              <a className="navbar-brand">{"< 한빛제"}</a>
            </Link>
            <Link href="/product">
              <a className="navbar-brand fw-bolder fs-2">HANBIT MARKET</a>
            </Link>
          </div>
          <ul className="navbar-nav h5">
            <li className="nav-item">
              <Link href="/viewOrder">
                <a className="nav-link active">주문조회</a>
              </Link>
            </li>
            <li>
              <div
                className="nav-link active"
                data-bs-toggle="modal"
                data-bs-target="#adminLoginModal"
              >
                상품 업로드(관리자)
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default MarketHeader;
