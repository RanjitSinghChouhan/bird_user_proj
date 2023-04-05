import React, { useEffect } from "react";
import bird from "../../assets/Subtract.svg";
import birdImg from "../../assets/birdImgOnly.svg";
import footPrints from "../../assets/landingPagebottom1.svg";
import { useNavigate } from "react-router";
import ScrollAnimation from 'react-animate-on-scroll';

function LandingPage() {
  const navigate = useNavigate();
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard")
    }
  }, [])
  
  return (
    <div className="px-4 py-2 bg-[#EEF7E8]">
      <div className="flex justify-between items-center">
        <div className="w-24 h-20">
          <img src={bird} alt="" />
        </div>
        <div>
          <button onClick={() => navigate("/leader-board")} className="bg-gradient-to-b from-[#6DB935] to-[#4DAA09] text-white rounded-md mr-2 font-semibold text-sm px-3 py-1">
            Leaderboard
          </button>
          <button
            onClick={() => navigate("/login")}
            className="bg-gradient-to-b from-[#6DB935] to-[#4DAA09] text-white rounded-md font-semibold text-sm px-3 py-1"
          >
            Login/Signup
          </button>
        </div>
      </div>

      <section className="flex px-16 items-center lg:h-screen">
        {/* <ScrollAnimation duration={900} animateOnce={true} animateIn='fadeIn'> */}
        <div className="relative animation-fade duration-4">
          <img src={birdImg} alt="" />
        </div>
        {/* </ScrollAnimation> */}
        <div className="animation-fade duration-7">
          {/* <ScrollAnimation animateOnce={true} animateIn='fadeIn'> */}
          <svg
            width="447"
            height="124"
            viewBox="0 0 447 124"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.05 124H21.45L28.95 72.55L36.3 124H41.7L45.3 99.85L46.05 98.5C59.25 92.2 57.45 73.45 57.45 73.45C54 79.3 49.8 82.15 47.25 85.6L56.85 18.7H51.45L39 105.25L31.65 53.65H26.1L18.75 105.25L6.3 18.7H0.9L16.05 124ZM54.9 79.75C54.9 79.75 52.65 92.2 46.35 95.2C46.35 95.2 46.65 92.35 48.3 88.75C49.5 85.75 52.65 84.25 54.9 79.75ZM64.5727 124H88.5727V118.75H69.8227V65.65H82.1227V60.25H69.8227V34.45H88.5727V29.05H64.5727V124ZM129.795 73.45L130.695 75.1L119.895 123.1L119.745 124H125.295L139.845 58.9H152.745L167.445 124H172.845L149.145 18.7H143.445L132.495 67.45C132.195 65.8 131.745 63.7 130.995 61.3C129.195 55.3 123.345 51.85 118.845 43.3C118.845 43.3 115.095 65.2 129.795 73.45ZM146.295 30.25L151.545 53.5H141.045L146.295 30.25ZM128.445 61.9C130.245 66.7 130.395 70.6 130.395 70.6C122.445 66.25 120.645 49.75 120.645 49.75C123.195 55.75 127.095 58 128.445 61.9ZM177.805 29.2V124H183.055V63.85H186.205C187.105 63.85 188.005 63.7 188.905 63.55L202.105 123.85V124H207.355L193.855 62.2C200.005 59.2 204.355 53.05 204.355 45.7V45.1C204.355 36.25 197.305 29.2 188.455 29.2H177.805ZM199.105 45.25C199.105 52.6 193.255 58.6 185.905 58.6H183.055V34.45H188.305C194.305 34.45 199.105 39.25 199.105 45.25ZM213.987 124H237.987V118.75H219.237V65.65H231.537V60.25H219.237V34.45H237.987V29.05H213.987V124ZM259.109 15.85C263.609 17.95 270.659 18.7 270.659 18.7L271.559 19.6V124H276.959V123.85C291.509 122.2 303.059 104.65 303.059 90.1V87.25C303.059 75.4 296.009 61.75 286.109 55.15C293.159 52.15 298.109 45.1 298.109 36.85V36.25C298.109 26.5 290.159 18.7 280.409 18.7H273.959L271.709 14.2C265.709 0.849994 244.709 3.24999 244.709 3.24999C251.609 7.89999 254.159 13.75 259.109 15.85ZM297.509 87.7V89.05C297.509 101.2 288.359 115.75 276.959 118.15V57.25C288.359 59.8 297.509 75.1 297.509 87.7ZM280.259 24.1C287.009 24.1 292.559 29.65 292.559 36.4C292.559 44.65 285.809 51.4 277.559 51.4H276.959V24.1H280.259ZM267.959 15.1C267.959 15.1 263.159 14.65 259.559 13C256.709 11.65 255.959 8.04999 251.609 5.79999C251.609 5.79999 265.109 8.64999 267.959 15.1ZM341.43 29.2H336.18L322.53 55.45L309.03 29.2H303.63L319.83 60.7V60.85H319.98V124H325.23V60.85H325.38L325.23 60.7L341.13 29.95L341.43 29.2ZM345.383 29.2V124H350.633V63.85H353.783C354.683 63.85 355.583 63.7 356.483 63.55L369.683 123.85V124H374.933L361.433 62.2C367.583 59.2 371.933 53.05 371.933 45.7V45.1C371.933 36.25 364.883 29.2 356.033 29.2H345.383ZM366.683 45.25C366.683 52.6 360.833 58.6 353.483 58.6H350.633V34.45H355.883C361.883 34.45 366.683 39.25 366.683 45.25ZM386.815 123.85C400.315 122.65 410.815 98.95 411.415 77.5V75.1C411.415 48.85 401.365 30.4 386.815 29.2H381.565V124H386.815V123.85ZM386.815 34.6C397.615 36.4 406.165 54.1 406.165 75.4V76.6C406.165 85.75 403.765 96.25 399.715 104.5C396.115 112.45 391.465 117.25 386.815 118.3V34.6ZM430.918 29.2C422.968 29.2 416.668 35.5 416.668 43.3V44.65C416.668 53.05 419.068 61.15 423.568 68.35L435.268 86.95C439.318 93.4 441.418 100.9 441.418 108.55C441.418 113.95 437.218 118.6 431.968 118.75C431.968 118.75 431.818 118.75 431.668 118.75C429.118 118.75 426.718 117.7 424.918 116.05C422.968 114.1 421.918 111.7 421.918 109V96.25H416.668V109.75C416.668 117.7 422.968 124 430.918 124H432.568C440.368 124 446.668 117.7 446.668 109.75V108.55C446.668 100.9 444.568 93.25 440.518 86.8L428.668 68.2C424.318 61 421.918 52.9 421.918 44.65C421.918 39.1 426.118 34.6 431.368 34.45C434.068 34.3 436.618 35.35 438.568 37.15C440.368 38.95 441.418 41.5 441.418 44.2V47.95H446.668V43.3C446.668 35.5 440.368 29.2 432.568 29.2H430.918Z"
              fill="url(#paint0_linear_280_3258)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_280_3258"
                x1="233"
                y1="-11"
                x2="233"
                y2="130"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#6DB935" />
                <stop offset="1" stopColor="#4DAA09" />
              </linearGradient>
            </defs>
          </svg>

          <div className="font-semibold text-[43px] text-[#693F00] mt-[23px]">
            We help you transform greener
          </div>
          {/* </ScrollAnimation> */}
        </div>

      </section>

      <section className="flex px-16 justify-between items-center lg:h-screen">
        <div className="max-w-3xl">
          <ScrollAnimation offset={300} animateOnce={true} animateIn='fadeIn'>
            <div className="font-bold text-[40px] text-[#BB4430]">
              Data driven large scale plantations
            </div>
            <div className="font-normal text-[30px] text-[#693F00] mr-24 mt-[25px]">
              continuous monitoring enhanced with AI and data collection, we
              ensure our plants are health and grow in the best conditions
              possible
            </div>
          </ScrollAnimation>
        </div>
        <div>
          <div className="w-[486px] h-[629px] relative flex flex-col items-center justify-center">
            <ScrollAnimation animateIn="fadeIn" animateOut="fadeOut" animateOnce={true}>
              <div className="absolute inset-0 w-full h-full bg-[#BB4430]"></div>
            </ScrollAnimation>

            <ScrollAnimation offset={300} className="z-20 relative transform translate-y-16" delay={400} animateIn="fadeIn" animateOut="fadeOut" animateOnce={true}>
              <svg
                width="347"
                height="229"
                viewBox="0 0 347 229"
                fill="none"
                x="50"
                y="50"
                // className="z-20 relative transform translate-y-16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g filter="url(#filter0_d_284_3229)">
                  <path
                    d="M336.448 0.327619C348.594 45.336 342.749 93.222 320.197 133.451C297.646 173.681 260.236 202.958 216.198 214.842C172.159 226.727 125.099 220.245 85.3708 196.823C45.6422 173.401 16.4992 134.957 4.35301 89.9487L170.4 45.1381L336.448 0.327619Z"
                    fill="#693F00"
                  />
                </g>
                <defs>
                  <filter
                    id="filter0_d_284_3229"
                    x="0.353027"
                    y="0.327637"
                    width="346.295"
                    height="228.332"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                  >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    />
                    <feOffset dy="4" />
                    <feGaussianBlur stdDeviation="2" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                    />
                    <feBlend
                      mode="normal"
                      in2="BackgroundImageFix"
                      result="effect1_dropShadow_284_3229"
                    />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect1_dropShadow_284_3229"
                      result="shape"
                    />
                  </filter>
                </defs>
              </svg>
            </ScrollAnimation>

            <ScrollAnimation offset={300} className="z-10 relative" delay={600} animateIn="fadeIn" animateOut="fadeOut" animateOnce={true}>
              <svg
                width="289"
                height="289"
                viewBox="0 0 289 289"
                fill="none"
                x="100"
                y="200"
                className="z-10 relative"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g filter="url(#filter0_d_284_3235)">
                  <circle cx="144.5" cy="140.5" r="140.5" fill="#C0F28B" />
                </g>
                <defs>
                  <filter
                    id="filter0_d_284_3235"
                    x="0"
                    y="0"
                    width="289"
                    height="289"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                  >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    />
                    <feOffset dy="4" />
                    <feGaussianBlur stdDeviation="2" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                    />
                    <feBlend
                      mode="normal"
                      in2="BackgroundImageFix"
                      result="effect1_dropShadow_284_3235"
                    />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect1_dropShadow_284_3235"
                      result="shape"
                    />
                  </filter>
                </defs>
              </svg>
            </ScrollAnimation>

            <ScrollAnimation offset={200} className="z-20 relative transform -translate-y-16" delay={800} animateIn="fadeIn" animateOut="fadeOut" animateOnce={true}>
              <svg
                width="361"
                height="192"
                viewBox="0 0 361 192"
                fill="none"
                x="70"
                y="400"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g filter="url(#filter0_dd_284_3234)">
                  <path
                    d="M356.353 7.77488C356.355 54.3934 337.797 99.1035 304.76 132.07C271.723 165.036 226.914 183.557 180.191 183.56C133.467 183.562 88.6563 165.046 55.6159 132.083C22.5755 99.1208 4.01221 54.4127 4.00964 7.79424L180.181 7.78455L356.353 7.77488Z"
                    fill="url(#paint0_linear_284_3234)"
                  />
                </g>
                <defs>
                  <filter
                    id="filter0_dd_284_3234"
                    x="0.00976562"
                    y="0.774902"
                    width="360.343"
                    height="190.785"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                  >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    />
                    <feOffset dy="-3" />
                    <feGaussianBlur stdDeviation="2" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                    />
                    <feBlend
                      mode="normal"
                      in2="BackgroundImageFix"
                      result="effect1_dropShadow_284_3234"
                    />
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    />
                    <feOffset dy="4" />
                    <feGaussianBlur stdDeviation="2" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                    />
                    <feBlend
                      mode="normal"
                      in2="effect1_dropShadow_284_3234"
                      result="effect2_dropShadow_284_3234"
                    />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect2_dropShadow_284_3234"
                      result="shape"
                    />
                  </filter>
                  <linearGradient
                    id="paint0_linear_284_3234"
                    x1="180.172"
                    y1="-167.991"
                    x2="180.191"
                    y2="183.56"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#6DB935" />
                    <stop offset="1" stopColor="#4DAA09" />
                  </linearGradient>
                </defs>
              </svg>
            </ScrollAnimation>

          </div>
        </div>
      </section>


      <section className="flex px-16 justify-between items-center lg:h-screen">
        <div>
          <div className="w-[486px] h-[629px] relative p-4">
            <ScrollAnimation offset={300} delay={100} animateIn="fadeIn" animateOut="fadeOut" animateOnce={true}>
              <div className="bg-[#448BE7] absolute inset-0 w-full h-full"></div>
            </ScrollAnimation>

            <ScrollAnimation offset={300} className="z-10 relative float-right" delay={300} animateIn="fadeIn" animateOut="fadeOut" animateOnce={true}>
              <svg
                width="205"
                height="158"
                viewBox="0 0 225 158"
                fill="none"
                x="250"
                y="15"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g filter="url(#filter0_d_325_3701)">
                  <ellipse
                    cx="181.268"
                    cy="84.2698"
                    rx="39.7324"
                    ry="36.5169"
                    fill="#FFF5F5"
                  />
                  <ellipse
                    cx="153.15"
                    cy="57.8651"
                    rx="36.6761"
                    ry="33.7079"
                    fill="#FFF5F5"
                  />
                  <ellipse
                    cx="51.9845"
                    cy="101.966"
                    rx="47.9845"
                    ry="44.1011"
                    fill="#FFF5F5"
                  />
                  <ellipse
                    cx="116.778"
                    cy="105.899"
                    rx="47.9845"
                    ry="44.1011"
                    fill="#FFF5F5"
                  />
                  <ellipse
                    cx="92.6335"
                    cy="47.7528"
                    rx="51.9577"
                    ry="47.7528"
                    fill="#FFF5F5"
                  />
                </g>
                <defs>
                  <filter
                    id="filter0_d_325_3701"
                    x="0"
                    y="0"
                    width="225"
                    height="158"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                  >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    />
                    <feOffset dy="4" />
                    <feGaussianBlur stdDeviation="2" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                    />
                    <feBlend
                      mode="normal"
                      in2="BackgroundImageFix"
                      result="effect1_dropShadow_325_3701"
                    />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect1_dropShadow_325_3701"
                      result="shape"
                    />
                  </filter>
                </defs>
              </svg>
            </ScrollAnimation>

            <ScrollAnimation offset={300} className="z-10 relative" delay={600} animateIn="fadeIn" animateOut="fadeOut" animateOnce={true}>
              <svg
                width="296"
                height="250"
                viewBox="0 0 326 250"
                fill="none"
                x="15"
                y="150"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g filter="url(#filter0_d_313_3396)">
                  <ellipse
                    cx="263.775"
                    cy="135.955"
                    rx="58.2254"
                    ry="58.9139"
                    fill="#FFF5F5"
                  />
                  <ellipse
                    cx="222.569"
                    cy="93.3559"
                    rx="53.7465"
                    ry="54.382"
                    fill="#FFF5F5"
                  />
                  <ellipse
                    cx="74.3183"
                    cy="164.506"
                    rx="70.3183"
                    ry="71.1498"
                    fill="#FFF5F5"
                  />
                  <ellipse
                    cx="169.27"
                    cy="170.85"
                    rx="70.3183"
                    ry="71.1498"
                    fill="#FFF5F5"
                  />
                  <ellipse
                    cx="133.887"
                    cy="77.0412"
                    rx="76.1408"
                    ry="77.0412"
                    fill="#FFF5F5"
                  />
                </g>
                <defs>
                  <filter
                    id="filter0_d_313_3396"
                    x="0"
                    y="0"
                    width="326"
                    height="250"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                  >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    />
                    <feOffset dy="4" />
                    <feGaussianBlur stdDeviation="2" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                    />
                    <feBlend
                      mode="normal"
                      in2="BackgroundImageFix"
                      result="effect1_dropShadow_313_3396"
                    />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect1_dropShadow_313_3396"
                      result="shape"
                    />
                  </filter>
                </defs>
              </svg>
            </ScrollAnimation>

          </div>
        </div>
        <div className="ml-32">
          <ScrollAnimation offset={300} animateOnce={true} animateIn='fadeIn'>
            <div className="font-bold text-[40px] text-[#448BE7]">
              Carbon reduction
            </div>
            <div className="font-normal text-[30px] text-[#693F00] mt-[25px]">
              we layout plans and strategies to help reduce your company's carbon
              foot print
            </div>
          </ScrollAnimation>
        </div>
      </section>

      <section className="flex flex-col items-center gap-8 justify-center px-16 lg:h-screen">
        <div>
          <div className="w-[875px] h-[379px] relative flex flex-col justify-center items-center">
            <ScrollAnimation animateIn="fadeIn" animateOut="fadeOut" animateOnce={true}>
              <div className="bg-[#FFB115] absolute inset-0 w-full h-full"></div>
            </ScrollAnimation>

            <ScrollAnimation offset={300} className="z-20 relative transform translate-y-8" delay={800} animateIn="fadeIn" animateOut="fadeOut" animateOnce={true}>
              <svg
                width="297"
                height="182"
                viewBox="0 0 297 182"
                fill="none"
                x="250"
                y="50"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g filter="url(#filter0_d_284_3258)">
                  <path
                    d="M290.487 0.986385C297.629 38.9087 289.414 78.115 267.649 109.98C245.884 141.846 212.352 163.76 174.429 170.902C136.507 178.044 97.3007 169.829 65.4354 148.064C33.5701 126.299 11.656 92.7668 4.51399 54.8445L147.5 27.9154L290.487 0.986385Z"
                    fill="#C0F28B"
                  />
                </g>
                <defs>
                  <filter
                    id="filter0_d_284_3258"
                    x="0.51416"
                    y="0.986328"
                    width="296.487"
                    height="180.43"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                  >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    />
                    <feOffset dy="4" />
                    <feGaussianBlur stdDeviation="2" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                    />
                    <feBlend
                      mode="normal"
                      in2="BackgroundImageFix"
                      result="effect1_dropShadow_284_3258"
                    />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect1_dropShadow_284_3258"
                      result="shape"
                    />
                  </filter>
                </defs>
              </svg>
            </ScrollAnimation>

            <ScrollAnimation offset={300} className="z-10 relative" delay={400} animateIn="fadeIn" animateOut="fadeOut" animateOnce={true}>
              <svg
                width="540"
                height="102"
                viewBox="0 0 540 102"
                fill="none"
                x="160"
                y="200"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g opacity="0.8" filter="url(#filter0_d_284_3257)">
                  <rect
                    x="4"
                    y="0.415527"
                    width="532"
                    height="93"
                    fill="#006DFF"
                  />
                </g>
                <defs>
                  <filter
                    id="filter0_d_284_3257"
                    x="0"
                    y="0.415527"
                    width="540"
                    height="101"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                  >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    />
                    <feOffset dy="4" />
                    <feGaussianBlur stdDeviation="2" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                    />
                    <feBlend
                      mode="normal"
                      in2="BackgroundImageFix"
                      result="effect1_dropShadow_284_3257"
                    />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect1_dropShadow_284_3257"
                      result="shape"
                    />
                  </filter>
                </defs>
              </svg>
            </ScrollAnimation>

          </div>

        </div>
        <ScrollAnimation offset={200} animateOnce={true} animateIn='fadeIn'>

          <div className="font-bold text-[40px] text-[#FFC34B]">
            As clear as water
          </div>
        </ScrollAnimation>
        <ScrollAnimation offset={200} animateOnce={true} animateIn='fadeIn'>
          <div className="text-center font-normal text-[30px] text-[#693F00] max-w-2xl">
            On demand reports and status updates for all your activities on byrds
          </div>
        </ScrollAnimation>
      </section>

      <section className="flex px-16 justify-between items-center lg:h-screen">
        <div className="h-screen overflow-y-hidden flex items-center gap-16">
          <div className="flex flex-col gap-12 h-full transform -translate-y-20">
            <Footprint delay={300} />
            <Footprint delay={600} />
            <Footprint delay={900} />
          </div>
          <div className="flex flex-col gap-12 h-full transform translate-y-20">
            <Footprint delay={1000} />
            <Footprint delay={700} />
            <Footprint delay={400} />
          </div>
        </div>
        <div className="max-w-2xl">
          <ScrollAnimation offset={300} animateOnce={true} animateIn='fadeIn'>
            <div className="font-bold text-[40px] text-[#AC6700]">
              Footprints the right direction
            </div>
            <div className="font-normal text-[30px] text-[#693F00] mt-[25px]">
              track your eco progress with intuitive dashboards and analytics
            </div>
          </ScrollAnimation>
        </div>
      </section>

      <section className="flex px-16 justify-between items-center lg:h-screen">
        <div className="max-w-2xl">
          <ScrollAnimation offset={300} animateOnce={true} animateIn='fadeIn'>
            <div className="font-bold text-[40px] text-[#182B73]">
              Gamified greenery
            </div>
            <div className="font-normal text-[30px] text-[#693F00]">
              leaderboards, points and rewards to motivate your green growth.
            </div>
          </ScrollAnimation>
        </div>
        <div>
          <div className="w-[486px] h-[628px] relative flex flex-col justify-between p-2">
            <ScrollAnimation animateIn="fadeIn" animateOut="fadeOut" animateOnce={true}>
              <div className="bg-[#182B73] absolute inset-0 w-full h-full"></div>
            </ScrollAnimation>

            <ScrollAnimation offset={300} className="z-10 relative" delay={300} animateIn="fadeIn" animateOut="fadeOut" animateOnce={true}>
              <svg
                width="133"
                height="133"
                viewBox="0 0 133 133"
                fill="none"
                x="8"
                y="8"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="66.5" cy="66.5" r="66.5" fill="#FFB115" />
              </svg>
            </ScrollAnimation>

            <div className="flex flex-col items-end">
              <ScrollAnimation offset={300} className="z-10 relative" delay={1100} animateIn="fadeIn" animateOut="fadeOut" animateOnce={true}>
                <svg width="150" height="130" viewBox="0 0 150 130" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g filter="url(#filter0_d_313_3420)">
                    <path d="M75 4L145.148 125.5H4.85194L75 4Z" fill="#00FF49" />
                  </g>
                  <defs>
                    <filter id="filter0_d_313_3420" x="0.852051" y="0" width="148.296" height="129.5" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                      <feOffset />
                      <feGaussianBlur stdDeviation="2" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_313_3420" />
                      <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_313_3420" result="shape" />
                    </filter>
                  </defs>
                </svg>

              </ScrollAnimation>

              <ScrollAnimation className="z-10 relative flex" delay={800} animateIn="fadeIn" animateOut="fadeOut" animateOnce={true}>
                <svg width="150" height="130" viewBox="0 0 150 130" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g filter="url(#filter0_d_313_3418)">
                    <path d="M75 4L145.148 125.5H4.85194L75 4Z" fill="#4CF77D" />
                  </g>
                  <defs>
                    <filter id="filter0_d_313_3418" x="0.852051" y="0" width="148.296" height="129.5" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                      <feOffset />
                      <feGaussianBlur stdDeviation="2" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_313_3418" />
                      <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_313_3418" result="shape" />
                    </filter>
                  </defs>
                </svg>

                <svg width="150" height="130" viewBox="0 0 150 130" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g filter="url(#filter0_d_313_3418)">
                    <path d="M75 4L145.148 125.5H4.85194L75 4Z" fill="#4CF77D" />
                  </g>
                  <defs>
                    <filter id="filter0_d_313_3418" x="0.852051" y="0" width="148.296" height="129.5" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                      <feOffset />
                      <feGaussianBlur stdDeviation="2" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_313_3418" />
                      <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_313_3418" result="shape" />
                    </filter>
                  </defs>
                </svg>

              </ScrollAnimation>

              <ScrollAnimation offset={0} className="z-10 relative flex" delay={500} animateIn="fadeIn" animateOut="fadeOut" animateOnce={true}>
                <svg width="150" height="130" viewBox="0 0 150 130" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g filter="url(#filter0_d_313_3415)">
                    <path d="M75 4L145.148 125.5H4.85194L75 4Z" fill="#9AFFB7" />
                  </g>
                  <defs>
                    <filter id="filter0_d_313_3415" x="0.852051" y="0" width="148.296" height="129.5" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                      <feOffset />
                      <feGaussianBlur stdDeviation="2" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_313_3415" />
                      <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_313_3415" result="shape" />
                    </filter>
                  </defs>
                </svg>

                <svg width="150" height="130" viewBox="0 0 150 130" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g filter="url(#filter0_d_313_3415)">
                    <path d="M75 4L145.148 125.5H4.85194L75 4Z" fill="#9AFFB7" />
                  </g>
                  <defs>
                    <filter id="filter0_d_313_3415" x="0.852051" y="0" width="148.296" height="129.5" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                      <feOffset />
                      <feGaussianBlur stdDeviation="2" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_313_3415" />
                      <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_313_3415" result="shape" />
                    </filter>
                  </defs>
                </svg>

                <svg width="150" height="130" viewBox="0 0 150 130" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g filter="url(#filter0_d_313_3415)">
                    <path d="M75 4L145.148 125.5H4.85194L75 4Z" fill="#9AFFB7" />
                  </g>
                  <defs>
                    <filter id="filter0_d_313_3415" x="0.852051" y="0" width="148.296" height="129.5" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                      <feOffset />
                      <feGaussianBlur stdDeviation="2" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_313_3415" />
                      <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_313_3415" result="shape" />
                    </filter>
                  </defs>
                </svg>

              </ScrollAnimation>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;


const Footprint = ({ delay = 300 }) => {
  return (
    <>
      <ScrollAnimation offset={100} className="z-10 relative" delay={delay} animateIn="fadeIn" animateOut="fadeOut" animateOnce={true}>
        <svg width="172" height="222" viewBox="0 0 172 222" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="171.529" height="222" fill="#AC6700" />
          <g filter="url(#filter0_d_284_3280)">
            <circle cx="85.9416" cy="94.4118" r="38.2941" fill="#87BAFF" />
          </g>
          <g filter="url(#filter1_d_284_3280)">
            <rect x="20.4707" y="25.7646" width="129.882" height="26.8235" fill="#FFD3A4" />
          </g>
          <g filter="url(#filter2_d_284_3280)">
            <rect x="37.6729" y="109.765" width="94.9777" height="26.8235" transform="rotate(45 37.6729 109.765)" fill="#C0F28B" />
          </g>
          <g filter="url(#filter3_d_284_3280)">
            <rect x="66.7061" y="176.924" width="94.9777" height="26.8235" transform="rotate(-45 66.7061 176.924)" fill="#C0F28B" />
          </g>
          <defs>
            <filter id="filter0_d_284_3280" x="43.6475" y="56.1177" width="84.5884" height="84.5881" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="2" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_284_3280" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_284_3280" result="shape" />
            </filter>
            <filter id="filter1_d_284_3280" x="16.4707" y="25.7646" width="137.882" height="34.8235" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="2" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_284_3280" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_284_3280" result="shape" />
            </filter>
            <filter id="filter2_d_284_3280" x="14.7056" y="109.765" width="94.1265" height="94.1265" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="2" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_284_3280" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_284_3280" result="shape" />
            </filter>
            <filter id="filter3_d_284_3280" x="62.7061" y="109.765" width="94.1265" height="94.1265" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="2" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_284_3280" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_284_3280" result="shape" />
            </filter>
          </defs>
        </svg>
      </ScrollAnimation>
    </>
  )
}
