import Link from "next/link";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandX,
  IconMail,
} from "@tabler/icons-react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold text-white">
              CloudAI
            </h2>

            <p className="mt-4 text-slate-400">
              AI-powered image and video processing
              platform built with Next.js and Cloudinary.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold text-white mb-4">
              Product
            </h3>

            <div className="flex flex-col gap-3 text-slate-400">
              <Link href="/image-upload">
                Image Upload
              </Link>

              <Link href="/video-upload">
                Video Upload
              </Link>
            </div>
          </div>

          {/* Account */}
          <div>
            <h3 className="font-semibold text-white mb-4">
              Account
            </h3>

            <div className="flex flex-col gap-3 text-slate-400">
              <Link href="/login">
                Login
              </Link>

              <Link href="/signup">
                Sign Up
              </Link>
            </div>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold text-white mb-4">
              Connect
            </h3>

            <div className="flex gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
              >
                <IconBrandGithub
                  size={24}
                  className="hover:text-white transition"
                />
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
              >
                <IconBrandLinkedin
                  size={24}
                  className="hover:text-white transition"
                />
              </a>

              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
              >
                <IconBrandX
                  size={24}
                  className="hover:text-white transition"
                />
              </a>

              <a href="mailto:your@email.com">
                <IconMail
                  size={24}
                  className="hover:text-white transition"
                />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-6 text-center text-slate-500">
          © {new Date().getFullYear()} CloudAI. All rights reserved.
        </div>
      </div>
    </footer>
  );
}