import { useState, useEffect } from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import "tailwindcss/tailwind.css";
import { FaChevronDown } from "react-icons/fa";
import { saveToLocalStorage } from "../../utils/localStorageUtils";

const Activitylevel = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(3);
  const [currentInputIndex, setCurrentInputIndex] = useState(0);
  const [surveyDataResponse, setSurveyDataResponse] = useState(null);

  const stepTitles = [
    "Personal information",
    "Physical details",
    "Habits and Hobbies",
    // "Lifestyle & diet",
    // "Location & income",
  ];

  const stepRoutes = [
    "/personalinfo",
    "/physicaldetails",
    "/activitylevel",
    "/mainpage",
    // "/lifestyle",
    // "/locationincome",
  ];

  // Define input fields for the current step
  const inputsForCurrentStep = [
    {
      name: "socials",
      placeholder: "how often do you spend on social media?",
    },
    {
      name: "countries",
      placeholder:
        "how often have you traveled outside the country in the past 5 years?",
    },
    {
      name: "gymtime",
      placeholder: "how many days of the week do you exercise?",
    },
  ];

  // State for form inputs
  const [formData, setFormData] = useState({
    socials: "",
    countries: "",
    gymtime: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log("name:", name);
    console.log("value:", value);
    setFormData({ ...formData, [name]: value });
  };

  const handleNextInput = () => {
    if (formData[inputsForCurrentStep[currentInputIndex].name]?.trim() === "")
      return;
    saveToLocalStorage(
      inputsForCurrentStep[currentInputIndex].placeholder,
      inputsForCurrentStep[currentInputIndex].name,
      formData
    );

    if (currentInputIndex < inputsForCurrentStep.length - 1) {
      setCurrentInputIndex(currentInputIndex + 1);
    } else {
      // Reset inputs after completing the current step
      // setFormData({ name: "", age: "", gender: "" });
      setCurrentInputIndex(0);
      handleNextStep();
    }
  };

  const handleNextStep = async () => {
    saveToLocalStorage(
      inputsForCurrentStep[currentInputIndex].placeholder,
      inputsForCurrentStep[currentInputIndex].name,
      formData
    );
    console.log("Form Data:", formData);
    const surveyDataFromLocalStorage = localStorage.getItem("surveyData");

    const surveyDataFromLocalStorageParsed = JSON.parse(
      surveyDataFromLocalStorage
    );
    try {
      const response = await fetch(
        "http://localhost:3001/survey/create-survey",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(surveyDataFromLocalStorageParsed),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit survey data");
      }

      const data = await response.json();
      console.log("Survey data response:", data);
      console.log(
        "data.response.message.content:",
        data.data.response.message.content
      );
      localStorage.setItem(
        "surveyResult",
        JSON.stringify(data.data.response.message.content)
      );
      localStorage.setItem("percentage", JSON.stringify(data.data.percentage));
      setSurveyDataResponse(data.data.response.message.content);
      const nextStep = Math.min(currentStep, stepRoutes.length);
      navigate(stepRoutes[nextStep]);
      setCurrentStep(nextStep + 1);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePrevStep = () => {
    if (currentInputIndex > 0) {
      setCurrentInputIndex(currentInputIndex - 1); // Go back to the previous input field
    } else {
      const prevStep = Math.max(currentStep - 2, 0);
      navigate(stepRoutes[prevStep]);
      setCurrentStep(prevStep + 1);
    }
  };

  // Use effect to handle the modal display timeout
  useEffect(() => {
    if (currentStep === 4) {
      const timer = setTimeout(() => {
        navigate("/mainpage"); // Replace with your desired route
      }, 1000); // 1000 milliseconds = 1 second

      // Cleanup function to clear the timer if the component unmounts
      return () => clearTimeout(timer);
    }
  }, [currentStep, navigate]);

  // Check if the current input is filled
  const isCurrentInputValid =
    formData[inputsForCurrentStep[currentInputIndex].name]?.trim() !== "";
  console.log("formData:", formData);
  console.log(
    "formData formData[inputsForCurrentStep]:",
    formData[inputsForCurrentStep]
  );
  console.log("formData inputsForCurrentStep:", formData[inputsForCurrentStep]);

  return (
    <div className="flex justify-center items-center bg-chatbot-bg bg-no-repeat bg-center bg-cover min-h-screen text-white">
      <div className="lg:max-w-5xl mt-32 w-full mx-auto lg:p-4 md:p-4 p-2">
        {/* Sidebar for steps */}
        <div className="w-full bg-steps-bg rounded-2xl bg-no-repeat bg-center bg-cover">
          <ul className="space-y-4 flex items-center justify-center bg-black w-full lg:h-[124px] h-[150px] rounded-2xl bg-opacity-35 border-2 border-[#34303E59] lg:pl-14 md:pl-12 pl-8 ">
            {stepTitles.map((title, index) => {
              const isCompleted = index < currentStep - 1;
              const isActive = index === currentStep - 1;

              return (
                <li className="lg:pl-4" key={index}>
                  <div
                    className="flex items-center space-x-2 cursor-pointer  "
                    onClick={() =>
                      index < currentStep && setCurrentStep(index + 1)
                    }
                  >
                    <div
                      className={`text-[16px] rounded-[12px] text-center lg:w-10 md:w-10 w-8 lg:h-10 md:h-10 h-8 flex items-center justify-center  
                        ${index === 0 && "mt-4"} 
                          ${
                            isCompleted
                              ? "bg-[#F7E2FE] text-[#C364DF]"
                              : "bg-[#1D1929] text-[#D2D1D4]"
                          } 
                          ${isActive ? "border border-purple-500" : ""}`}
                    >
                      {isCompleted ? (
                        <svg
                          width="33"
                          height="32"
                          viewBox="0 0 33 32"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            x="0.799805"
                            width="32"
                            height="32"
                            rx="12"
                            fill="#C364DF"
                          />
                          <path
                            d="M9.86621 15.4669L14.6662 20.2669L23.7329 11.2002"
                            stroke="white"
                            stroke-linecap="square"
                          />
                        </svg>
                      ) : (
                        index + 1
                      )}
                    </div>
                    {index !== 2 && (
                      <div
                        className={`h-[2px] lg:w-[120px] md:w-[80px] w-[20px] lg:ml-4 mt-21
                         ${isCompleted ? "bg-[#D96FF8]" : "bg-[#34303E]"}
                         ${index === 0 && "mt-4"} 
                         `}
                      ></div>
                    )}
                  </div>

                  <span
                    className={`${
                      isCompleted
                        ? "bg-gradient-to-l from-[#1A50FF] to-[#D96FF8] bg-clip-text text-transparent font-semibold"
                        : "text-[#34303E] font-semibold"
                    } ${isActive ? "text-[#D2D1D4]" : ""}`}
                  >
                    <div
                      className={`lg:-translate-x-14 md:-translate-x-12 -translate-x-6   pt-2
                      
                      ${index === 2 && "ml-6"} 
                      `}
                    >
                      <p className="lg:text-sm md:text-sm text-xs lg:font-bold font-medium text-center text-[#D2D1D4]">
                        Step {index + 1}
                      </p>
                      <p className="lg:text-xs md:text-xs text-[8px] text-center text-[#8E8C94] lg:block hidden">
                        {title}
                      </p>
                      <p className="lg:text-xs md:text-xs text-[8px] text-center text-[#8E8C94] block lg:hidden">
                        {title.split(" ")[0]}
                      </p>
                    </div>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Content */}
        <div className="lg:pt-[140px] md:pt-[140px] pt-[140px] lg:pb-[96px] md:pb-[96px] pb-[">
          <h1 className="text-[#A5A3A9] text-center font-normal lg:text-[46px] md:text-[46px] text-[36px] mb-4">
            {inputsForCurrentStep[currentInputIndex].placeholder}
          </h1>
        </div>

        {/* Form Container */}
        <div className="w-full text-white h-fit bg-no-repeat bg-center bg-cover rounded-3xl border-2 border-[#262136] shadow-lg mt-8 p-[1px] focus-within:bg-gradient-to-l focus-within:from-[#1A50FF] focus-within:to-[#D96FF8]">
          {inputsForCurrentStep[currentInputIndex].name === "gymtime" ? (
            <div className="relative bg-[#1D192999]">
              <select
                style={{ height: "56px", backgroundColor: "#191425" }}
                name="gymtime"
                className="w-full px-4 py-3 bg-[#1D192999] text-[#A5A3A9] rounded-3xl border-none focus:outline-none placeholder-[#A5A3A9] font-medium custom-select"
                value={formData.gymtime}
                onChange={handleInputChange}
              >
                <option value="">Select a time</option>
                <option value="minimum2days">Minimum 2 days</option>
                <option value="minimum4days">Minimum 4 days</option>
                <option value="never">Never</option>
              </select>

              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <FaChevronDown className="w-5 h-5 text-[#E8E8EA]" />
              </div>
            </div>
          ) : inputsForCurrentStep[currentInputIndex].name === "socials" ? (
            <div className="relative bg-[#1D192999]">
              <select
                style={{ height: "56px", backgroundColor: "#191425" }}
                name="socials"
                className="w-full px-4 py-3 bg-[#1D192999] text-[#A5A3A9] rounded-3xl border-none focus:outline-none placeholder-[#A5A3A9] font-medium custom-select"
                value={formData.socials}
                onChange={handleInputChange}
              >
                <option value="">Select a level</option>
                <option value="once">Sedentary</option>
                <option value="twice">Light</option>
                <option value="never">Moderate</option>
                <option value="Active">Active</option>
              </select>

              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <FaChevronDown className="w-5 h-5 text-[#E8E8EA]" />
              </div>
            </div>
          ) : (
            <div className="relative bg-[#1D192999]">
              <select
                style={{ height: "56px", backgroundColor: "#191425" }}
                name="countries"
                className="w-full px-4 py-3 bg-[#1D192999] text-[#A5A3A9] rounded-3xl border-none focus:outline-none placeholder-[#A5A3A9] font-medium custom-select"
                value={formData.countries}
                onChange={handleInputChange}
              >
                <option value="">Select a level</option>
                <option value="once">Once</option>
                <option value="twice">Twice</option>
                <option value="never">Never</option>
              </select>

              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <FaChevronDown className="w-5 h-5 text-[#E8E8EA]" />
              </div>
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-center items-center mybuttons mt-[-27px] space-x-[24px]">
          <Button
            style={{
              marginRight: "10px",
              height: "46px",
              marginTop: "26px",
              border: "1px solid #4A4754",
              borderRadius: "10px",
              backgroundColor: "transparent",
            }}
            className="border-none text-gray-400 hover:text-white bg-transparent hover:bg-gray-700"
            onClick={handlePrevStep}
          >
            <span className="bg-gradient-to-l from-[#1A50FF] to-[#D96FF8] bg-clip-text text-transparent text-[16px] font-bold">
              Previous
            </span>
          </Button>
          {currentInputIndex < inputsForCurrentStep.length - 1 ? (
            <Button
              className={`my-6  ${
                !isCurrentInputValid ? "opacity-50" : ""
              } shadow-2xl shadow-[#d86ff898] stroke-none border-none text-[16px] font-medium bg-gradient-to-l`}
              style={{
                marginRight: "10px",
                height: "44px",
                marginTop: "48px",
                background: "linear-gradient(to left, #1A50FF, #D96FF8)",
              }}
              type="primary"
              onClick={handleNextInput}
              disabled={!isCurrentInputValid}
            >
              Next
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
            </Button>
          ) : (
            <Button
              className="my-6 shadow-2xl shadow-[#d86ff898] stroke-none border-none text-[16px] font-medium"
              style={{
                marginRight: "10px",
                height: "44px",
                marginTop: "48px",
                background: "linear-gradient(to left, #1A50FF, #D96FF8)",
              }}
              type="primary"
              onClick={handleNextStep}
              disabled={!isCurrentInputValid}
            >
              Next Step
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
            </Button>
          )}
        </div>

        {/* Progress dots */}
        <div className="flex justify-center items-center  space-x-2 bg-[#00000099] w-[64px] h-[30px] mx-auto rounded-lg">
          {inputsForCurrentStep.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full ${
                index <= currentInputIndex ? "bg-[#FFFFFF]" : "bg-[#667085]"
              }`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Activitylevel;
