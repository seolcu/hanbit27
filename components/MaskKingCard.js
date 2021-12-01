import Image from "next/image";
import Link from "next/link";
import { MdMusicNote } from "react-icons/md";
import styles from "./MaskKingCard.module.scss";

const MaskKingCard = ({ num, name, music, artist, thumbSrc }) => {
  return (
    <Link href={`/maskKing/${num}`}>
      <a className={styles.a}>
        <div className="mb-3">
          <div>
            <Image
              src={thumbSrc}
              alt={name}
              className="img-thumbnail"
              width={1600}
              height={900}
              layout="responsive"
              objectFit={"cover"}
              quality={100}
            />
          </div>
        </div>
        <div className="text-start">
          <h1 className="display-5 fw-bold">
            <u>
              #{num} {name}
            </u>
          </h1>
          <h2>
            <MdMusicNote />
            {music} - {artist}
          </h2>
        </div>
      </a>
    </Link>
  );
};

export default MaskKingCard;
