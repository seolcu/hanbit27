import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/MaskKingSpecificPage.module.scss";
import Link from "next/link";
import maskKingInfoList from "../../public/data/maskKingInfoList";
import HeaderComponent from "../../components/HeaderComponent";
import firestore from "../../firebase/firestoreInit";

export const getStaticPaths = async () => {
  const paths = maskKingInfoList.map((maskKingInfo) => ({
    params: { id: maskKingInfo.num },
  }));
  return { paths, fallback: false };
};

export const getStaticProps = async ({ params }) => {
  const id = params.id;
  return { props: { id } };
};

const MaskKingSpecificPage = ({ id }) => {
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
      <div className="container p-5">
        <div className={`row`}>
          <div className="col-lg-10 p-0">
            <video controls className="w-100 p-0">
              <source src={maskKingInfo.videoSrc} type="video/mp4" />
            </video>
          </div>
          <div className={`col-lg-2 ${styles.recommendBar}`}>추천영상</div>
        </div>
      </div>
    </>
  );
};

export default MaskKingSpecificPage;
