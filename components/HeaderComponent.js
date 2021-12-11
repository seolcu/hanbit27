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
          <ul className="navbar-nav h5">
            <li className="nav-item">
              <Link href="/product">
                <a className="nav-link active">한빛마켓</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/maskking">
                <a className="nav-link active">복면가왕</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/video">
                <a className="nav-link active">공연영상</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/vieworder">
                <a className="nav-link active">주문조회</a>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default HeaderComponent;
