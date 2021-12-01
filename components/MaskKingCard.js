const MaskKingCard = ({ src, title, subtitle }) => {
  return (
    <div className="card p-0 mt-5">
      <video controls>
        <source src={src} type="video/mp4" />
      </video>
      <div className="card-body">
        <h1 className="display-3 fw-bold">{title}</h1>
        <h3>{subtitle}</h3>
      </div>
    </div>
  );
};

export default MaskKingCard;
