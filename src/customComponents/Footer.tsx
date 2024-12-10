import Image from "next/image";
import facebook_icon from "./facebook_icon.png";
import linkedin_icon from "./linkedin_icon.png";
import twitter_icon from "./twitter_icon.png";

export default function Footer() {
  return (
    <div className="flex flex-col mt-[10%] bg-[hsl(0,0%,14.9%)] px-[10%] py-[5%] pb-[4%]">
      <div className="w-full grid grid-cols-[2fr_1fr_1fr]">
        <div className="flex flex-col items-start justify-start w-[90%] gap-5">
          {/* <img src={assets.logo} alt='logo' /> */}
          <h1 className="text-5xl text-red-500 font-bold">Feast Flow</h1>
          <p>
            Lorem Ipsum has been the industries standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
          <div className="flex justify-center items-center gap-[2vw]">
            <Image
              src={facebook_icon}
              alt="social-icon"
              height={40}
              width={40}
              className="cursor-pointer transition-transform duration-300 hover:scale-105"
            />
            <Image
              src={twitter_icon}
              alt="social-icon"
              height={40}
              width={40}
              className="cursor-pointer transition-transform duration-300 hover:scale-105"
            />
            <Image
              src={linkedin_icon}
              alt="social-icon"
              height={40}
              width={40}
              className="cursor-pointer transition-transform duration-300 hover:scale-105"
            />
          </div>
        </div>

        <div className="flex flex-col items-start justify-start w-[50%] gap-5">
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>

        <div className="flex flex-col items-start justify-start w-[50%] gap-5">
          <h2>Get in touch</h2>
          <ul>
            <li>+1-123-4567-890</li>
            <li>contact@FeastFlow.com</li>
          </ul>
        </div>
      </div>
      <hr className="bg-[grey] w-full my-[5vh] h-[2px] border-none" />
      <p className="text-center">
        Copyright 2024 © Feast-Flow.com - All Right Reserved
      </p>
    </div>
  );
}
