import { useRouter } from "next/router";
import { useState } from "react";

const LoginModal = ({ onClickHandler }) => {
  // onClickHandler는 화살표함수 X
  const [password, setPassword] = useState("");
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
            <button
              type="button"
              className="btn btn-primary"
              data-bs-dismiss="modal"
              disabled={password == "hanbit27auth" ? false : true}
              // 화살표함수 X
              onClick={onClickHandler}
            >
              로그인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
