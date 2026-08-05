export default function Features() {
  const features = [
    {
      icon: "🎭",
      title: "Anonymous Matching",
      description:
        "Connect with verified students while keeping your identity private until you're ready.",
    },
    {
      icon: "💬",
      title: "Real-Time Chat",
      description:
        "Enjoy smooth, instant conversations powered by Socket.IO with message history.",
    },
    {
      icon: "🔒",
      title: "Privacy First",
      description:
        "Reveal your identity only when both users mutually agree. Your privacy comes first.",
    },
    {
      icon: "📚",
      title: "Study Buddy",
      description:
        "Find classmates to study together, prepare for exams, and collaborate on projects.",
    },
    {
      icon: "☕",
      title: "Campus Meetups",
      description:
        "Discover coffee chats, campus events, sports, and casual meetups with fellow students.",
    },
    {
      icon: "🤝",
      title: "Meaningful Connections",
      description:
        "Build genuine friendships and professional connections within your university.",
    },
  ];

  return (
    <section
      id="features"
      className="bg-gradient-to-b from-slate-950 to-slate-900 py-24 text-white"
    >
      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">
          <span className="rounded-full bg-blue-600/20 px-4 py-2 text-blue-300">
            ✨ Features
          </span>

          <h2 className="mt-6 text-5xl font-bold">
            Why Choose CampusConnect?
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-slate-400">
            More than just a matching app. CampusConnect helps students
            discover friendships, study partners, meaningful conversations,
            and exciting campus experiences—all in a safe and secure
            environment.
          </p>
        </div>

        <div className="mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:border-blue-500 hover:bg-white/10 hover:shadow-2xl"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 text-3xl shadow-lg">
                {feature.icon}
              </div>

              <h3 className="mt-6 text-2xl font-bold">
                {feature.title}
              </h3>

              <p className="mt-4 leading-7 text-slate-400">
                {feature.description}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}