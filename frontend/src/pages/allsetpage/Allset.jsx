import { Button } from "antd";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./animation.css";
import "./animation-background.css";
// import { PiShareFatThin } from "react-icons/pi";
import { BsShare } from "react-icons/bs";
import TypeWriterEffect from "react-typewriter-effect";
import PieChartComponent from "./piechart.jsx";
// import { CProgress, CProgressBar } from "@coreui/react";
import ProgressBar from "@ramonak/react-progress-bar";

const Allset = () => {
  const navigate = useNavigate();
  const [surveyResult, setSurveyResult] = useState(null);
  const [userPercentage, setUserPercentage] = useState(null);
  let globalPercentage = 100;

  globalPercentage -= userPercentage;
  console.log("globalPercentage typeof", parseInt(globalPercentage));
  console.log("userPercentage typeof", parseInt(userPercentage));
  const data = [
    { name: "Global", value: globalPercentage || 90 },
    { name: "My percentage", value: userPercentage || 10 },
  ];

  useEffect(() => {
    const storedData = localStorage.getItem("surveyResult");
    const percentage = localStorage.getItem("percentage");

    if (storedData) {
      setSurveyResult(JSON.parse(storedData));
    }
    if (percentage) {
      setUserPercentage(parseInt(JSON.parse(percentage)));
    }
  }, []);

  const handlenextpage = () => {
    localStorage.removeItem("surveyData");
    localStorage.removeItem("surveyResult");
    navigate("/");
  };

  const handleShare = () => {
    const shareData = {
      title: "You’re all set!",
      text: "Check out this page where you're approximately in the top 10% of the global population and 5% of the USA.",
      url: window.location.href, // The current page URL
    };

    if (navigator.share) {
      // Use Web Share API if supported
      navigator
        .share(shareData)
        .then(() => console.log("Page shared successfully!"))
        .catch((error) => console.error("Error sharing:", error));
    } else {
      // Fallback: Display share options for platforms that support share URLs
      alert(
        "Sharing is not supported on this browser. Copy the URL and share it manually."
      );
    }
  };
  console.log("window", window.innerWidth);

  return (
    // <div
    //   className="flex items-center justify-center h-screen bg-gradient-to-t"
    //   style={{
    //     background: "linear-gradient(to top, #0f1835 90%, #2b0636 100%)",
    //   }}
    // >
    <div className="flex items-center justify-center h-screen bg-gradient-to-t bg-gradient-animation">
      <div className="text-center">
        {/* <h1 className="text-8xl">🎉</h1>
        <br />
        <span className="bg-gradient-to-l from-[#1A50FF] to-[#D96FF8] bg-clip-text text-transparent text-[24px] font-extrabold pt-4">
          You’re all set!
        </span> */}

        {/* <ProgressBar
          completed={90}
          bgColor="#8a4cae"
          height="30px"
          labelAlignment="center"
          isLabelVisible={false}
          baseBgColor="#787acf"
          labelColor="#fff1f1"
          labelSize="22px"
          transitionDuration="3"
          transitionTimingFunction="linear"
          animateOnRender
          maxCompleted={100}
        /> */}
        <br />

        <PieChartComponent data={data} />
        <div className="xxsm:min-w-[280px] xsm:min-w-[370px] md:min-w-[672px] min-w-[400px]">
          <p className=" max-w-2xl text-[16px] font-semibold text-[#77757F] mt-[16px] px-6">
            {/* You’re approximately top 10% of <br /> the global population and 5% of
          the USA. */}
            {/* <span>{surveyResult}</span> */}
            <TypeWriterEffect
              // textStyle={{ fontFamily: "Red Hat Display" }}
              startDelay={100}
              cursorColor="black"
              text={surveyResult}
              typeSpeed={30}
              // scrollArea={myAppRef}
            />
          </p>
        </div>
        <br />

        {/* Restart Button */}
        <Button
          onClick={handlenextpage}
          className="my-6 shadow-2xl shadow-[#d86ff898] stroke-none border-none text-[16px] font-medium"
          style={{
            marginRight: "10px",
            height: "56px",
            marginTop: "48px",
            background: "linear-gradient(to left, #1A50FF, #D96FF8)",
          }}
          type="primary"
        >
          Restart
          <svg
            className="animate-spin"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 19.3333C4.84534 19.3333 0.666667 15.1546 0.666667 9.99996C0.666667 7.02534 2.05823 4.37574 4.22587 2.66663M10 0.666626C15.1547 0.666626 19.3333 4.8453 19.3333 9.99996C19.3333 12.9746 17.9418 15.6242 15.7741 17.3333M15.3333 13.3333V18H20M0 1.99996H4.66667V6.66663"
              stroke="white"
            />
          </svg>
        </Button>

        {/* Share Button */}
        <Button
          onClick={handleShare}
          className="my-6 shadow-lg border-2 border-[#d86ff898] text-[16px] font-medium ml-6"
          style={{
            height: "55px",
            marginTop: "20px",
            background: "transparent",
          }}
          type="primary"
        >
          Share
          <BsShare className="text-xl" />
        </Button>
      </div>
    </div>
  );
};

export default Allset;
