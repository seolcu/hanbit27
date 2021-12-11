import styles from "./HeaderComponent.module.scss";
import Link from "next/link";

const HeaderComponent = () => {
  return (
    <>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="container">
          <Link href="/">
            <a className="navbar-brand fw-bold">한빛제</a>
          </Link>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link href="/product">
                <a className="nav-link active">대파마켓 & 굿즈</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/video">
                <a className="nav-link active">공연 영상</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/vieworder">
                <a className="nav-link active">주문 조회</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/feedback">
                <a className="nav-link active">고객센터</a>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default HeaderComponent;
