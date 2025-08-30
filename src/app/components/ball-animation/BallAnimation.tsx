import "./ballanimation.css";

import ballimage from "../../images/ball.png";

interface BallAnimationProps {
  isSubHeader: boolean;
}
export const BallAnimation = ({ isSubHeader }: BallAnimationProps) => {
  return (
    <div
      className={
        isSubHeader ? "animation-subheader-container" : "animation-container"
      }
    >
      <img src={ballimage} alt="football" className="ball" />
    </div>
  );
};
