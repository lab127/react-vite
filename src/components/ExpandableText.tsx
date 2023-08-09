import { useState } from "react";

interface ExpandableTextProps {
  children: string;
  maxChar?: number;
}

const ExpandableText = ({ maxChar = 100, children }: ExpandableTextProps) => {
  // jawaban aslinya
  const [isExpanded, setExpanded] = useState(false);
  if (children.length <= maxChar) return <p>{children}</p>;
  const text = isExpanded ? children : children.substring(0, maxChar);
  return (
    <p>
      {text}...
      <button onClick={() => setExpanded(!isExpanded)}>
        {isExpanded ? "Less" : "More"}
      </button>
    </p>
  );
  // Jawaban sendiri
  //   const [moreText, setMoreText] = useState(false);
  //   const moreTextToggle = () => {
  //     setMoreText(!moreText);
  //   };
  //   return (
  //     <div>
  //       {moreText === false ? children.slice(0, maxChar) : children}
  //       <button onClick={moreTextToggle}>
  //         {moreText === false ? "More" : "Less"}
  //       </button>
  //     </div>
  //   );
};

export default ExpandableText;
