import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="w-full bg-white py-4 px-8 flex justify-between items-center shadow-md">
      {/* Logo + Title + Subtitle */}
      <div className="flex items-center gap-3">
        <Image
          src="/logo.png" // Replace with your logo filename
          alt="DharaMitra Logo"
          width={60}
          height={60}
        />

        <div className="flex flex-col leading-tight">
          <h1 className="text-xl font-bold tracking-wide text-[#c74b8c]">
            DharaMitra
          </h1>
          <p className="text-xs tracking-widest text-[#d27cab]">
            YOUR COMPANION IN HEALING
          </p>
        </div>
      </div>

      {/* Nav Links */}
      <div className="flex gap-6 text-lg font-bold text-[#f778b9]">
        <Link
          href="/"
          className="hover:opacity-80 hover:text-[#66033d] transition"
        >
          Home
        </Link>

        <Link
          href="/upload-summary"
          className="hover:opacity-80 hover:text-[#66033d] transition"
        >
          Upload Summary
        </Link>

        <Link
          href="/upload-image"
          className="hover:opacity-80 hover:text-[#66033d] transition"
        >
          Track Wound
        </Link>
      </div>
    </nav>
  );
}
