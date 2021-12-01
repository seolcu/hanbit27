import styles from "./HeaderComponent.module.scss";
import Link from "next/link";
import Image from "next/image";
import logoIcon from "../public/favicon.ico";

const HeaderComponent = () => {
  return (
    <header className={styles.header}>
      <Link href="/">
        <a>
          <Image src={logoIcon} alt="한빛제 로고" width={30} height={30} />
        </a>
      </Link>
    </header>
  );
};

export default HeaderComponent;
