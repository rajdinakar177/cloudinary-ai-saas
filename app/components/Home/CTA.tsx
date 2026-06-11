import Link from "next/link";

export default function CTA() {
  return (
    <section className="py-24 ">
      <div className="max-w-5xl mx-auto text-center px-6">
        <h2 className="text-5xl font-bold">
          Ready to Transform Your Media?
        </h2>

        <p className="mt-6 text-lg text-slate-400">
          Upload images and videos, optimize them instantly,
          and create content for social media in seconds.
        </p>

        <div className="flex justify-center gap-4 mt-10">
          <Link
            href="/signup"
            className="btn btn-primary btn-lg"
          >
            Get Started
          </Link>

          <Link
            href="/social-share"
            className="btn btn-outline btn-lg"
          >
            Try Demo
          </Link>
        </div>
      </div>
    </section>
  );
}