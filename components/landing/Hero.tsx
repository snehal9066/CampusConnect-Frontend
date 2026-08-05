export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-950 via-indigo-900 to-purple-900 text-white">

      {/* Background Blur Effects */}
      <div className="absolute top-10 left-10 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl"></div>
      <div className="absolute bottom-10 right-10 h-80 w-80 rounded-full bg-purple-500/20 blur-3xl"></div>

      <div className="relative mx-auto max-w-7xl px-6 py-24 lg:flex lg:items-center lg:justify-between">

        {/* Left Side */}
        <div className="max-w-2xl">

          <span className="inline-block rounded-full bg-white/10 px-4 py-2 text-sm backdrop-blur-md">
            🎓 Exclusive for Verified Campus Students
          </span>

          <h1 className="mt-8 text-5xl font-extrabold leading-tight lg:text-7xl">
            Find Your
            <span className="block bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Campus Connection ❤️
            </span>
          </h1>

          <p className="mt-8 text-lg leading-8 text-slate-300">
            Meet new friends, discover study partners, enjoy anonymous
            conversations, and reveal your identity only when both people agree.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">

            <button className="rounded-2xl bg-blue-600 px-8 py-4 font-semibold transition hover:scale-105 hover:bg-blue-700">
              🚀 Get Started
            </button>

            <button className="rounded-2xl border border-white/30 bg-white/10 px-8 py-4 font-semibold backdrop-blur-md transition hover:bg-white hover:text-slate-900">
              📖 Learn More
            </button>

          </div>

          {/* Stats */}
          <div className="mt-14 flex flex-wrap gap-10">

            <div>
              <h2 className="text-3xl font-bold">100%</h2>
              <p className="text-slate-400">Verified Students</p>
            </div>

            <div>
              <h2 className="text-3xl font-bold">24/7</h2>
              <p className="text-slate-400">Anonymous Chat</p>
            </div>

            <div>
              <h2 className="text-3xl font-bold">🔒</h2>
              <p className="text-slate-400">Privacy First</p>
            </div>

          </div>

        </div>

        {/* Right Side */}
        <div className="mt-20 flex justify-center lg:mt-0">

          <div className="rounded-[40px] border border-white/20 bg-white/10 p-10 shadow-2xl backdrop-blur-xl">

            <div className="text-center">

              <div className="text-8xl">🎭</div>

              <h2 className="mt-6 text-3xl font-bold">
                Anonymous Matching
              </h2>

              <p className="mt-4 max-w-sm text-slate-300">
                Chat anonymously, build trust, and reveal your identity only
                when both users are comfortable.
              </p>

              <div className="mt-8 flex justify-center gap-4 text-5xl">
                🦊 🐼 🦉
              </div>

              <div className="mt-6 rounded-2xl bg-green-500/20 px-4 py-3 text-green-300">
                🟢 Safe • Secure • Private
              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}