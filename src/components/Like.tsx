import { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface LikeProps {
  onLike: () => void;
}

const Like = ({ onLike }: LikeProps) => {
  const [like, setLike] = useState(false);
  const likeToggle = () => {
    setLike(!like);
    onLike();
  };

  if (like)
    return <AiFillHeart color="#ff6b81" size="30" onClick={likeToggle} />;
  return <AiOutlineHeart color="#ff6b81" size="30" onClick={likeToggle} />;
};

export default Like;
