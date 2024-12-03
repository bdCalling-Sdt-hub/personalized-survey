import { useState } from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import "tailwindcss/tailwind.css";
import { FaChevronDown } from "react-icons/fa";
import { saveToLocalStorage } from "../../utils/localStorageUtils";

const Personalinformation = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [currentInputIndex, setCurrentInputIndex] = useState(0);
  const [errors, setErrors] = useState({});

  const validateInput = (name, value) => {
    let error = "";

    if (name === "feet") {
      if (value < 1 || value > 8) {
        error = "Feet must be between 1 and 8.";
      }
    } else if (name === "inches") {
      if (value < 0 || value > 11) {
        error = "Inches must be between 0 and 11.";
      }
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

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
    "/lifestyle",
    "/locationincome",
  ];

  // Define input fields for the current step
  const inputsForCurrentStep = [
    {
      name: "education",
      placeholder: "what is your highest level of education?",
    },
    {
      name: "income",
      placeholder: "how much do you make annually? Per dollars?",
    },
  ];

  // State for form inputs
  const [formData, setFormData] = useState({
    // height: "",
    // feet: "",
    // inches: "",
    // weight: "",
    education: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log(formData);
    validateInput(name, value);
  };

  const handleNextInput = () => {
    // if (
    //   inputsForCurrentStep[currentInputIndex].name === "height" &&
    //   (!formData.feet.trim() || !formData.inches.trim())
    // ) {
    //   return;
    // }
    saveToLocalStorage(
      inputsForCurrentStep[currentInputIndex].placeholder,
      inputsForCurrentStep[currentInputIndex].name,
      formData
    );
    console.log("Form Data:", formData);
    if (formData[inputsForCurrentStep[currentInputIndex].name]?.trim() === "")
      return;

    // const height = `${formData.feet}' ${formData.inches}"`;
    // saveToLocalStorage(
    //   inputsForCurrentStep[currentInputIndex].placeholder,
    //   "height",
    //   { ...formData, height }
    // );
    // if (!height.trim()) return;

    if (currentInputIndex < inputsForCurrentStep.length - 1) {
      setCurrentInputIndex(currentInputIndex + 1);
    } else {
      // Reset inputs after completing the current step
      setFormData({ name: "", age: "", gender: "" });
      // setFormData({ feet: "", inches: "", weight: "" });
      setCurrentInputIndex(0);
      handleNextStep();
    }
  };

  const handleNextStep = () => {
    saveToLocalStorage(
      inputsForCurrentStep[currentInputIndex].placeholder,
      inputsForCurrentStep[currentInputIndex].name,
      formData
    );
    console.log("Form Data:", formData);
    const nextStep = Math.min(currentStep, stepRoutes.length);
    navigate(stepRoutes[nextStep]);
    setCurrentStep(nextStep + 1);
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

  // Check if the current input is filled
  // const isCurrentInputValid =
  //   formData[inputsForCurrentStep[currentInputIndex].name]?.trim() !== "";
  // const isCurrentInputValid =
  //   inputsForCurrentStep[currentInputIndex].name === "height"
  //     ? formData.feet.trim() &&
  //       formData.inches.trim() &&
  //       Number(formData.feet) >= 1 &&
  //       Number(formData.feet) <= 8 &&
  //       Number(formData.inches) >= 0 &&
  //       Number(formData.inches) <= 11
  //     : formData[inputsForCurrentStep[currentInputIndex].name]?.trim() !== "";
  const isCurrentInputValid =
    inputsForCurrentStep[currentInputIndex].name === "height"
      ? formData.feet.trim() &&
        formData.inches.trim() &&
        Number(formData.feet) >= 1 &&
        Number(formData.feet) <= 8 &&
        Number(formData.inches) >= 0 &&
        Number(formData.inches) <= 11
      : inputsForCurrentStep[currentInputIndex].name === "weight"
      ? Number(formData.weight) >= 5 && Number(formData.weight) <= 1400
      : formData[inputsForCurrentStep[currentInputIndex].name]?.trim() !== "";

  return (
    <div className="flex justify-center items-center bg-chatbot-bg bg-no-repeat bg-center bg-cover min-h-screen text-white">
      <div className="lg:max-w-5xl mt-32 w-full mx-auto lg:p-4 md:p-4 p-2">
        {/* Sidebar for steps */}
        <div className="w-full bg-steps-bg rounded-2xl bg-no-repeat bg-center bg-cover">
          <ul className="space-y-4 flex items-center justify-center bg-black w-full pt-4 pb-6 rounded-2xl bg-opacity-35 border-2 border-[#34303E59] lg:pl-14 md:pl-12 pl-8 ">
            {stepTitles.map((title, index) => {
              const isCompleted = index < currentStep - 1;
              const isActive = index === currentStep - 1;

              return (
                <li className="lg:pl-4" key={index}>
                  <div
                    className="flex items-center space-x-2 cursor-pointer"
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
                      className={`lg:-translate-x-14 md:-translate-x-12 -translate-x-4   pt-2
                      
                      ${index === 4 && "ml-6"} 
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
        <div className="lg:pt-[140px] md:pt-[140px] pt-[140px] lg:pb-[96px] md:pb-[96px] xsm:pt-[80px] ">
          <h1 className="text-[#A5A3A9] text-center font-normal lg:text-[56px] md:text-[56px] text-[36px] ">
            {inputsForCurrentStep[currentInputIndex].placeholder}
          </h1>
        </div>

        {/* Form Container */}
        <div className="w-full text-white h-fit bg-no-repeat bg-center bg-cover rounded-3xl  border-[#262136] shadow-lg mt-8 p-[1px]">
          {inputsForCurrentStep[currentInputIndex].name === "gender" ? (
            <div className="relative bg-[#1D192999]">
              <select
                style={{ height: "56px", backgroundColor: "#191425" }}
                name="gender"
                className="w-full px-4 py-3 bg-[#1D192999] text-[#A5A3A9] rounded-3xl border-none focus:outline-none placeholder-[#A5A3A9] font-medium custom-select"
                value={formData.gender}
                onChange={handleInputChange}
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>

              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <FaChevronDown className="w-5 h-5 text-[#E8E8EA]" />
              </div>
            </div>
          ) : inputsForCurrentStep[currentInputIndex].name === "education" ? (
            <div>
              <div className="relative bg-[#1D192999]">
                <select
                  style={{ height: "56px", backgroundColor: "#191425" }}
                  name="education"
                  className="w-full px-4 py-3 bg-[#1D192999] text-[#A5A3A9] rounded-3xl border-none focus:outline-none placeholder-[#A5A3A9] font-medium custom-select"
                  value={formData.education}
                  onChange={handleInputChange}
                >
                  <option value="">Select a time</option>
                  <option value="highschool">High School</option>
                  <option value="bachelors">Bachelors</option>
                  <option value="masters">Masters</option>
                </select>

                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <FaChevronDown className="w-5 h-5 text-[#E8E8EA]" />
                </div>
              </div>
            </div>
          ) : (
            <input
              type="number"
              name={inputsForCurrentStep[currentInputIndex].name}
              placeholder={inputsForCurrentStep[currentInputIndex].placeholder}
              className="w-full px-4 py-3 rounded-lg bg-[#191425] text-[#A5A3A9] border-none focus:outline-none"
              value={formData[inputsForCurrentStep[currentInputIndex].name]}
              onChange={handleInputChange}
            />
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

export default Personalinformation;
