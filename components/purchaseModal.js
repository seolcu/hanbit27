import { useState } from "react";

const PurchaseModal = ({
  studentId,
  setStudentId,
  studentName,
  setStudentName,
  studentPhone,
  setStudentPhone,
  depositorName,
  setDepositorName,
  // onClickHandler는 화살표함수 X
  onClickHandler,
}) => {
  return (
    <div
      className="modal fade text-dark fw-bold"
      id="purchaseModal"
      tabIndex="-1"
      aria-labelledby="purchaseModalLabel"
      aria-hidden="true"
      data-bs-backdrop="static"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="adminLoginModalLabel">
              주문자 정보 입력 (축제 후 파기됩니다)
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <h5>학번</h5>
            <input
              type="text"
              className="form-control form-control-lg mb-2"
              placeholder="학번"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
            />
            <h5>이름</h5>
            <input
              type="text"
              className="form-control form-control-lg mb-2"
              placeholder="이름"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
            />
            <h5>전화번호</h5>
            <input
              type="text"
              className="form-control form-control-lg mb-2"
              placeholder="전화번호"
              value={studentPhone}
              onChange={(e) => setStudentPhone(e.target.value)}
            />
            <h5>입금자명</h5>
            <input
              type="text"
              className="form-control form-control-lg mb-2"
              placeholder="입금자명"
              value={depositorName}
              onChange={(e) => setDepositorName(e.target.value)}
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
              disabled={
                studentId == "" || studentName == "" || studentPhone == ""
                  ? true
                  : false
              }
              // 화살표함수 X
              onClick={onClickHandler}
            >
              주문하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseModal;
