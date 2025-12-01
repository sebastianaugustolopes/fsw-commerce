import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-black">
        <span className="text-xl font-bold text-white">B</span>
      </div>
      <span className="text-foreground hidden text-xl font-bold sm:inline">
        BEWEAR
      </span>
    </Link>
  );
};

export default Logo;
