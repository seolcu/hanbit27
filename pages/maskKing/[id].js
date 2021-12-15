import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/MaskKingSpecificPage.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
import maskKingInfoList from "../../public/data/maskKingInfoList";
import HeaderComponent from "../../components/HeaderComponent";

export const getStaticPaths = async () => {
  const paths = maskKingInfoList.map((maskKingInfo) => ({
    params: { id: maskKingInfo.num },
  }));
  return { paths, fallback: false };
};

export const getStaticProps = async ({ params }) => {
  return { props: {} };
};

const MaskKingSpecificPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const maskKingInfo = maskKingInfoList[parseInt(id) - 1];

  return (
    <>
      <Head>
        <title>
          #{maskKingInfo.num} {maskKingInfo.name}
        </title>
        <meta name="description" content="제 27회 한빛제 복면가왕" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeaderComponent />
      <div className={styles.outerContainer}>
        <div className={styles.mainContainer}></div>
      </div>
    </>
  );
};

export default MaskKingSpecificPage;
