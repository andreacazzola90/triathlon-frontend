import Image from "next/image";

const Logo = () => {
  return (
    <div className="avatar">
      <div className="w-16 rounded my-5">
        <Image
          src="/adidas-running-logo.svg"
          alt="Adidas running Logo"
          className=""
          width={100}
          height={24}
        />
      </div>
    </div>
  );
};

export default Logo;
