import Image from 'next/image';

const MessageImages = ({ images }) => {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <Image
        src={images[0]}
        alt="main property image"
        width={0}
        height={0}
        sizes="100vw"
        className="w-full h-64 rounded-xl"
        priority={true}
      />
      <div className="hidden md:flex items-center justify-start">
        <div className="flex flex-wrap-reverse gap-4 items-end justify-center max-w-56 max-h-44 ml-4">
          {images.map(
            (image, index) =>
              index !== 0 && (
                <Image
                  key={index}
                  src={image}
                  alt="property image"
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="w-24 h-24 rounded-full object-cover hover:scale-[2] transition-all"
                  priority={true}
                />
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageImages;
