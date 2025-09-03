import { useMemo } from "react";

import g1 from "../../gifs/g2.gif";
import g2 from "../../gifs/g2.gif";
import g3 from "../../gifs/g3.gif";
import g4 from "../../gifs/g4.gif";
import g5 from "../../gifs/g5.gif";
import g6 from "../../gifs/g6.gif";
import g7 from "../../gifs/g7.gif";
import g8 from "../../gifs/g8.gif";
import g9 from "../../gifs/g9.gif";
import g10 from "../../gifs/g10.gif";
import g11 from "../../gifs/g11.gif";
import g14 from "../../gifs/g14.gif";
import g15 from "../../gifs/g15.gif";

const gifs = [g1, g2, g3, g4, g5, g6, g7, g8, g9, g10, g11, g14, g15];

interface NoDataProps {
  displayedMessage: string;
}

export default function NoData({ displayedMessage }: NoDataProps) {
  const randomGif = useMemo(
    () => gifs[Math.floor(Math.random() * gifs.length)],
    []
  );
  return (
    <div
      className={`flex flex-col justify-left items-left text-left gap-1 m-2`}
    >
      <img
        src={randomGif}
        alt="status gif"
        className="
          w-40 h-40 
          object-contain mb-2
        "
      />
      <p className="text-xs font-medium">{displayedMessage}</p>
    </div>
  );
}
