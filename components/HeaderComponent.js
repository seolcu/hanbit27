import styles from "./HeaderComponent.module.scss";
import Link from "next/link";

const HeaderComponent = () => {
  return (
    <>
      <header className={styles.header}>
        <Link href="/">
          <a>한빛제</a>
        </Link>
      </header>
      <div className={styles.gap} />
    </>
  );
};

export default HeaderComponent;
