import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/MaskKingSpecificPage.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
import maskKingInfoList from "../../public/data/maskKingInfoList";
import HeaderComponent from "../../components/HeaderComponent";
import db from "../../fireStoreInit";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  limit,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { useEffect, useState } from "react";

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

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const chatCol = collection(db, `VideoChat${id}`);
  const chatQuery = query(chatCol, orderBy("createdAt"), limit(100));

  useEffect(() => {
    const unsub = onSnapshot(chatQuery, (querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMessages(data);
    });

    return unsub;
  }, [chatQuery]);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const trimmedMessage = newMessage.trim();
    if (trimmedMessage) {
      await addDoc(chatCol, {
        text: trimmedMessage,
        createdAt: serverTimestamp(),
      });
      setNewMessage("");
    }
  };

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
          <video controls className="col-lg-8 p-0">
            <source src={maskKingInfo.videoSrc} type="video/mp4" />
          </video>
          <div className="col-lg-4 p-0">
            <div className="fs-2">
              {messages.map((message) => (
                <p key={message.id} className="m-0">
                  {message.text}
                </p>
              ))}
            </div>
            <form onSubmit={handleOnSubmit} className="m-0">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="댓글을 입력하세요"
              />
              <button type="submit" disabled={!newMessage}>
                Send
              </button>
            </form>
          </div>
        </div>
        <div className={`${styles.recommendBar}`}>추천영상</div>
      </div>
    </>
  );
};

export default MaskKingSpecificPage;
