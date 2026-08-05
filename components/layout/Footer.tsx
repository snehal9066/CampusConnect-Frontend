import Link from "next/link";

export default function Footer() {
  return (
    <footer
      id="contact"
      className="bg-slate-950 border-t border-slate-800 text-slate-300"
    >
      <div className="mx-auto max-w-7xl px-6 py-14">

        <div className="grid gap-10 md:grid-cols-4">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 text-xl">
                🎓
              </div>

              <div>
                <h2 className="text-xl font-bold text-white">
                  CampusConnect
                </h2>

                <p className="text-sm text-slate-400">
                  Connect • Chat • Discover
                </p>
              </div>

            </div>

            <p className="mt-5 text-sm leading-7 text-slate-400">
              CampusConnect helps verified university students build
              meaningful friendships, find study partners, enjoy coffee chats,
              and connect safely through anonymous conversations.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 font-semibold text-white">
              Quick Links
            </h3>

            <ul className="space-y-3">

              <li>
                <Link href="/" className="hover:text-white">
                  Home
                </Link>
              </li>

              <li>
                <a href="#features" className="hover:text-white">
                  Features
                </a>
              </li>

              <li>
                <Link href="/login" className="hover:text-white">
                  Login
                </Link>
              </li>

              <li>
                <Link href="/register" className="hover:text-white">
                  Register
                </Link>
              </li>

            </ul>
          </div>

          {/* Features */}
          <div>
            <h3 className="mb-4 font-semibold text-white">
              Features
            </h3>

            <ul className="space-y-3">

              <li>🎭 Anonymous Matching</li>
              <li>💬 Real-Time Chat</li>
              <li>🔒 Mutual Identity Reveal</li>
              <li>📚 Study Buddy</li>
              <li>🤝 Friendships</li>

            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 font-semibold text-white">
              Contact
            </h3>

            <p className="mb-3">
              🎓 CUSAT
            </p>

            <p className="mb-3">
              📧 support@campusconnect.com
            </p>

            <p>
              🌍 Kerala, India
            </p>
          </div>

        </div>

        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-sm text-slate-500">

          © 2026 CampusConnect. All rights reserved.

          <br />

          Made with ❤️ for Campus Communities.

        </div>

      </div>
    </footer>
  );
}