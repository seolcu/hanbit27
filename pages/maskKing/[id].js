import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/MaskKingSpecificPage.module.scss";
import Link from "next/link";
import maskKingInfoList from "../../public/data/maskKingInfoList";
import HeaderComponent from "../../components/HeaderComponent";
import firestore from "../../firebase/firestoreInit";
import { MdThumbUpOffAlt, MdMusicNote, MdThumbUpAlt } from "react-icons/md";
import { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import Cookies from "js-cookie";

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
  // 좋아요 쿠키설정
  let likeCookieName = `like${id}`;
  const maskKingInfo = maskKingInfoList[parseInt(id) - 1];
  const [likeState, setLikeState] = useState(Cookies.get(likeCookieName));
  useEffect(() => {
    Cookies.set(likeCookieName, likeState);
  });

  // 좋아요 Firestore 설정
  const likeDoc = doc(firestore, "LikeCount", id);
  const [likeCount, setLikeCount] = useState(0);
  const getLike = async () => {
    const data = await getDoc(likeDoc).then(
      (snapshot) => snapshot.data().count,
    );
    setLikeCount(data);
  };
  const updateLike = async (count) => {
    await setDoc(likeDoc, {
      count: count,
    });
    getLike();
  };

  // 투표 쿠키설정
  const voteCookieName = "voted";
  const [voteCount, setVoteCount] = useState(0);
  const [voteState, setVoteState] = useState(Cookies.get(voteCookieName));

  // 투표 Firestore 설정
  const voteDoc = doc(firestore, "MaskKingVote", id);
  const getVoteCount = async () => {
    const data = await getDoc(voteDoc).then(
      (snapshot) => snapshot.data().count,
    );
    setVoteCount(data);
  };

  // Firestore 데이터 불러오기
  useEffect(() => {
    getLike();
    getVoteCount();
  });

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
        <div className="p-0">
          <video controls className="w-100 p-0">
            <source src={maskKingInfo.videoSrc} type="video/mp4" />
          </video>
          <div className="">
            <h1 className="fw-bold mt-3">
              #{maskKingInfo.num} {maskKingInfo.name}
            </h1>
            <div className="d-flex justify-content-between align-items-center">
              <h2>
                <MdMusicNote />
                {maskKingInfo.music} - {maskKingInfo.artist}
              </h2>
              <h3>
                {likeState == 1 ? (
                  <MdThumbUpAlt
                    // key 랜덤으로 강제 리덴더링...ㄷㄷ 스택오버플로우는 미쳤어... 몇시간동안 고생했는데...
                    key={Math.random()}
                    className="display-4 d-inline"
                    onClick={() => {
                      updateLike(likeCount - 1);
                      setLikeState(0);
                    }}
                  />
                ) : (
                  <MdThumbUpOffAlt
                    key={Math.random()}
                    className="display-4 d-inline"
                    onClick={() => {
                      updateLike(likeCount + 1);
                      setLikeState(1);
                    }}
                  />
                )}{" "}
                {likeCount}
              </h3>
            </div>
          </div>
        </div>
        <div className="mt-1 d-flex justify-content-center gap-2">
          <Link href="/maskKing">
            <a>
              <button className="btn btn-secondary fs-3">더 둘러보기</button>
            </a>
          </Link>
          <button
            className="btn btn-primary fs-3"
            disabled={voteState == "true" ? true : false}
            onClick={async () => {
              if (voteState !== "true") {
                await setDoc(voteDoc, {
                  count: voteCount + 1,
                });
              }
              setVoteState("true");
              Cookies.set(voteCookieName, "true");
            }}
          >
            {voteState == "true" ? "투표함" : `#${maskKingInfo.num} 투표하기`}
          </button>
        </div>
      </div>
    </>
  );
};

export default MaskKingSpecificPage;
