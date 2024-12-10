import Image from "next/image";
import appStore from "./app_store.png"
import playStore from "./play_store.png"

export default function DownloadApp() {
    return (
      <div 
        className="flex justify-center items-center flex-col gap-[7vh] leading-10 px-[5%] mt-[5%]" 
        id='app-download'
      >
        <p className="text-center text-5xl leading-tight">
          For Better Experience Download The <br/> Feast Flow App
        </p>
        <div className="flex justify-center items-center gap-[3vw]">
          <Image 
            src={appStore} 
            height={300} 
            width={300} 
            alt="appstore" 
            className="object-contain cursor-pointer transition-transform duration-300 hover:scale-105"
          />
          <Image 
            src={playStore} 
            height={300} 
            width={300} 
            alt="playstore" 
            className="object-contain cursor-pointer transition-transform duration-300 hover:scale-105"
          />
        </div>
      </div>
    )
  }
