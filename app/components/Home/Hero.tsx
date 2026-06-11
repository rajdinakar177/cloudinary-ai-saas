import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-32 text-center">
        <span className="badge badge-primary mb-6">
          AI Powered Media Platform
        </span>

        <h1 className="text-6xl md:text-7xl font-bold">
          Upload, Transform &
          <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            {" "}Optimize
          </span>
        </h1>

        <p className="max-w-3xl mx-auto mt-8 text-xl text-slate-400">
          Professional cloud platform for image
          transformation, video processing and social
          media optimization powered by Cloudinary.
        </p>

        <div className="flex justify-center gap-5 mt-12">
          <Link
            href="/image-upload"
            className="btn btn-primary btn-lg"
          >
            Upload Images
          </Link>

          <Link
            href="/video-upload"
            className="btn btn-outline btn-lg"
          >
            Upload Videos
          </Link>
        </div>
      </div>
    </section>
  );
}