// components/Stars.jsx
// Shows 5 stars (or any number you pass in)

import { Star } from "lucide-react";

function Stars(props) {
  const count = props.count || 5;
  const stars = [];

  for (let i = 0; i < count; i++) {
    stars.push(<Star key={i} size={16} fill="currentColor" />);
  }

  return (
    <div className="stars" aria-label={count + " out of 5 stars"}>
      {stars}
    </div>
  );
}

export default Stars;
