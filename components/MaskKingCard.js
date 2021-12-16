import Image from "next/image";
import Link from "next/link";

const MaskKingCard = ({ num, name, music, artist, thumbSrc }) => {
  return (
    <Link href={`/maskKing/${num}`}>
      <a>
        <div className="card p-0 mt-2 mx-5">
          <div className="card-img-top">
            <Image
              src={thumbSrc}
              alt={name}
              width={1600}
              height={900}
              layout="responsive"
              objectFit={"cover"}
              quality={100}
            />
          </div>
          <div className="card-body text-center">
            <h1 className="display-4 fw-bold">
              #{num} {name}
            </h1>
            <h3>
              {music} - {artist}
            </h3>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default MaskKingCard;
