// components/FeatureCard.jsx
// The 3 cards on the home page (image on top, title, text below)

import ImageBox from "./ImageBox";

function FeatureCard(props) {
  return (
    <article className="feature-card">
      <ImageBox src={props.image} alt={props.title} className="feature-card-image" />

      <div className="feature-card-body">
        <h3>{props.title}</h3>
        <p>{props.text}</p>
      </div>
    </article>
  );
}

export default FeatureCard;
