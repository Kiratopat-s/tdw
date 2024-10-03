import React from "react";

const LandscapeComponent = () => {
  return (
    <div className="container ring-2 ring-indigo-300">
      {/* Birds Front */}
      <div className="birds front">
        {[...Array(12)].map((_, x) => (
          <div key={x} className={`bird b${x + 1}`}>
            <div className="body">
              <div className="wing1">
                <div className="wing2">
                  <div className="wing3"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Birds Back */}
      <div className="birds back">
        {[...Array(12)].map((_, x) => (
          <div key={x} className={`bird b${x + 1}`}>
            <div className="body">
              <div className="wing1">
                <div className="wing2">
                  <div className="wing3"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Big Cloud */}
      <div className="cloud big">
        {[...Array(9)].map((_, x) => (
          <div key={x} className={`circle c${x}`}></div>
        ))}
      </div>

      {/* Small Cloud */}
      <div className="cloud small">
        {[...Array(9)].map((_, x) => (
          <div key={x} className={`circle c${x}`}></div>
        ))}
      </div>

      {/* Mountain */}
      <div className="mountain">
        <div className="backdrop">
          {[...Array(5)].map((_, x) => (
            <div key={x} className={`zig zag${x}`}>
              <div className="top"></div>
              <div className="mid"></div>
              <div className="bot"></div>
              <div className="base"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Range */}
      <div className="range">
        {[...Array(7)].map((_, x) => (
          <div key={x} className={`r${x + 1}`}></div>
        ))}
      </div>

      {/* Back Trees */}
      {[...Array(8)].map((_, x) => (
        <div key={x} className={`tree treeBack tree${x + 1}`}>
          <div className="top"></div>
          <div className="mid"></div>
          <div className="bot"></div>
          <div className="base"></div>
        </div>
      ))}

      {/* Tower */}
      <div className="tower">
        <div className="shadow"></div>
        <div className="flagPole"></div>
        <div className="roof1"></div>
        <div className="roof2"></div>
        <div className="wall">
          {[...Array(5)].map((_, x) => (
            <div key={x} className={`w${x + 1}`}></div>
          ))}
        </div>
        <div className="legs">
          <div className="left"></div>
          <div className="right"></div>
          <div className="support1">
            <div className="criss"></div>
            <div className="cross"></div>
            <div className="flat"></div>
          </div>
          <div className="support2">
            <div className="criss"></div>
            <div className="cross"></div>
            <div className="flat"></div>
          </div>
        </div>
        <div className="railing">
          <div className="top"></div>
          <div className="bot1"></div>
          <div className="bot2"></div>
          {[...Array(9)].map((_, x) => (
            <div key={x} className={`r${x + 1}`}></div>
          ))}
        </div>
      </div>

      {/* Mid Trees */}
      {[...Array(5)].map((_, x) => (
        <div key={x} className={`tree treeMid tree${x + 1}`}>
          <div className="top"></div>
          <div className="mid"></div>
          <div className="bot"></div>
          <div className="base"></div>
        </div>
      ))}

      {/* Front Trees */}
      {[...Array(4)].map((_, x) => (
        <div key={x} className={`tree treeFront tree${x + 1}`}>
          <div className="top"></div>
          <div className="mid"></div>
          <div className="bot"></div>
          <div className="base"></div>
        </div>
      ))}
    </div>
  );
};

export default LandscapeComponent;
