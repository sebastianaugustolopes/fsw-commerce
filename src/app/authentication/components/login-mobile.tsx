import Image from "next/image";

import LoginWithGoogle from "./sign-in-with-google-button";
const LoginMobile = () => {
  return (
    <div className="fixed inset-0 h-screen w-screen overflow-hidden">
      <Image
        src="/loginpage-mobile-cover.jpg"
        alt="Mobile cover"
        fill
        sizes="100vw"
        className="object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/50 to-black/90" />

      {/* content container */}
      <div className="relative z-10 flex h-screen flex-col">
        <div className="flex-1" />
        {/* Fixed button at the bottom */}

        <p className="fixed right-0 bottom-38 left-0 z-30 pr-20 pl-5 font-semibold text-amber-50 text-2xl">
          A jornada mais difícil é vencer a si mesmo.
        </p>
        <div className="fixed right-0 bottom-15 left-0 z-20 p-4">
          <LoginWithGoogle/>
        </div>
      </div>
    </div>
  );
};

export default LoginMobile;
