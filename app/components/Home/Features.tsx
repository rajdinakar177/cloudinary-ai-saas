import {
  ImageIcon,
  VideoIcon,
  WandSparkles,
} from "lucide-react";
export default function Features() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-24">

      <h2 className="text-5xl font-bold text-center mb-16">
        Powerful Features
      </h2>

      <div className="grid md:grid-cols-3 gap-8">

        <div className="card bg-slate-800 border border-slate-700 shadow-xl">
          <div className="card-body">
            <ImageIcon size={50} />
            <h2 className="card-title">
              Image Transformation
            </h2>
            <p>
              Resize, crop and optimize images
              instantly.
            </p>
          </div>
        </div>

        <div className="card bg-slate-800 border border-slate-700 shadow-xl">
          <div className="card-body">
            <VideoIcon size={50} />
            <h2 className="card-title">
              Video Compression
            </h2>
            <p>
              Cloud based video processing and
              optimization.
            </p>
          </div>
        </div>

        <div className="card bg-slate-800 border border-slate-700 shadow-xl">
          <div className="card-body">
            <WandSparkles size={50} />
            <h2 className="card-title">
              AI Transformations
            </h2>
            <p>
              Create social media ready assets
              automatically.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}