import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/MaskKingSpecificPage.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
import maskKingInfoList from "../../public/data/maskKingInfoList";
import HeaderComponent from "../../components/HeaderComponent";
import db from "../../fireStoreInit";
import { doc, getDoc } from "firebase/firestore";

export const getStaticPaths = async () => {
  const paths = maskKingInfoList.map((maskKingInfo) => ({
    params: { id: maskKingInfo.num },
  }));
  return { paths, fallback: false };
};

export const getStaticProps = async ({ params }) => {
  const id = params.id;
  const chatDoc = doc(db, "VideoChat", params.id);
  const chatSnapshot = await getDoc(chatDoc);
  const chatData = chatSnapshot.data();
  return { props: { id, chatData } };
};

const MaskKingSpecificPage = ({ id, chatData }) => {
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
      <div className="container-fluid p-0">
        <div className={`row ${styles.outerContainer}`}>
          <video controls className="col-lg-8 p-0 m-5">
            <source src={maskKingInfo.videoSrc} type="video/mp4" />
          </video>
          <div className="col-lg-4 p-0">댓글</div>
        </div>
        <div className={`${styles.recommendBar}`}>추천영상</div>
      </div>
    </>
  );
};

export default MaskKingSpecificPage;
