import bot from "../../assets/images/Frame 88 (1).png";
import MyButton from "../../components/util/mybutton";

const Home = () => {
  return (
    <div className="bg-[#000000] bg-cover bg-no-repeat bg-center">
      <div className="container mx-auto text-white px-4 min-h-screen">
        <div className="relative">
          <div className="flex justify-center">
            <img
              src={bot}
              alt="bot"
              className=" h-[600px] object-cover absolute 2xl:bottom-12"
            />
          </div>
          <div className="text-center max-w-3xl mx-auto mt-96 2xl:mt-[640px]">
            {/* <h1 className="text-[40px]  text-center font-medium pb-[12px]">
              Welcome to Chatbot{" "}
              <span className="bg-gradient-to-l from-[#1A50FF] to-[#D96FF8] bg-clip-text text-transparent">
                AI
              </span>{" "}
            </h1> */}
            <h1 className="text-[40px]  text-center font-medium pb-[12px]">
              Discover What Makes You Truly{""}
              <span className="bg-gradient-to-l from-[#1A50FF] to-[#D96FF8] bg-clip-text text-transparent">
                {" "}
                Unique!
              </span>{" "}
            </h1>

            <p className="lg:text-xl md:text-lg text-[16px] font-normal leading-6 text-center text-[#77757F]">
              Take a quick journey through a few thought-provoking questions,
              and our AI will reveal insights into your individuality. Everyone
              is one-of-a-kind—let’s uncover what sets you apart!
            </p>
            <MyButton
              size={"large"}
              icon={
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10ZM11.3334 6.39046L14.9429 9.99994L11.3334 13.6094L10.3906 12.6666L12.3906 10.6667H5.33333V9.33333H12.3907L10.3906 7.33327L11.3334 6.39046Z"
                    fill="white"
                  />
                </svg>
              }
              text="Get Started Now"
              linktext={"personalinfo"}
              type="primary"
              link="/chat"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
