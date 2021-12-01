import Image from "next/image";
import Link from "next/link";

const MaskKingCard = ({ num, name, music, artist, thumbSrc }) => {
  return (
    <Link href={`/maskKing/${num}`}>
      <a>
        <div className="">
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
          <h1 className="display-4 fw-bold">
            #{num} {name}
          </h1>
          <h3>
            {music} - {artist}
          </h3>
        </div>
      </a>
    </Link>
  );
};

export default MaskKingCard;
