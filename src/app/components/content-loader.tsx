import Image from "next/image";

interface ContentLoaderProps {
  header: string;
  content: string;
  imgSrc: string;
  imgPos: string;
  bgColor: string;
}

function ContentLoader({
  header,
  content,
  imgSrc,
  imgPos,
  bgColor,
}: ContentLoaderProps) {
  return (
    <div
      className={`size-full w-full h-500 p-32 bg-${bgColor} flex items-center px-10`}
    >
      {imgPos === "left" && (
        <div className={`flex items-center justify-center bg-${bgColor}`}>
          <Image
            src={imgSrc}
            alt="icon"
            width={400}
            height={100}
            className="left"
          />
          <div className="pl-10 flex flex-col items-right justify-center w-1/2 text-white">
            <h3 className="font-bold text-3xl pb-5">{header}</h3>
            <p className="w-1/2 ">{content}</p>
          </div>
        </div>
      )}
      {imgPos === "right" && (
        <div
          className={`w-full size-full h-500 p-32 flex items-center justify-center px-10 bg-${bgColor}`}
        >
          <div className="pl-10 flex flex-col justify-center items-left w-1/2">
            <h3 className="font-bold text-3xl pb-5">{header}</h3>
            <p className="w-1/2">{content}</p>
          </div>
          <Image
            src={imgSrc}
            alt="icon"
            width={400}
            height={100}
            className="right"
          />
        </div>
      )}
      {imgPos === "center" && (
        <div className="size-full h-500 flex items-center justify-center px-10">
          <div className="pl-10 flex flex-col items-center">
            <h3 className="font-bold text-3xl pb-5">{header}</h3>
            <p className="w-1/2">{content}</p>
          </div>
          <Image
            src={imgSrc}
            alt="icon"
            width={100}
            height={100}
            className="center"
          />
        </div>
      )}
    </div>
  );
}

export default ContentLoader;
