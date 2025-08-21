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

export default function NoData() {
  const randomGif = useMemo(
    () => gifs[Math.floor(Math.random() * gifs.length)],
    []
  );
  return (
    <div
      className={`min-h-[60vh] flex flex-col justify-center items-center px-4 text-center`}
    >
      <img
        src={randomGif}
        alt="status gif"
        className="
          w-40 h-40 
          sm:w-48 sm:h-48 
          md:w-64 md:h-64 
          lg:w-[28rem] lg:h-[28rem] 
          object-contain mb-6
        "
      />
      <p className="text-lg md:text-xl font-medium">No Data Available</p>
    </div>
  );
}
