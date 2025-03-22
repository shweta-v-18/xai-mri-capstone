import Link from "next/link"
import Image from "next/image"

export default function Home() {
  return (
    <main className="relative min-h-screen bg-gradient-to-br from-[#0a192f] via-[#0f2d4a] to-[#1a3b5d] text-white overflow-hidden">
      {/* Particle Background */}
      <div className="absolute inset-0 bg-[url('/digital-particles.svg')] bg-no-repeat bg-cover opacity-20 pointer-events-none z-0" />

      <div className="relative container mx-auto px-4 py-6 z-10">
        {/* Header with Brain Logo */}
        <header className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="relative w-20 h-20">
              <Image
                src="/brain-logo.svg"
                alt="XAI-MedTrack Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">XAI-MedTrack</h1>
              <p className="text-lg text-gray-300">Empowering Healthcare with Explainable AI</p>
            </div>
          </div>
          <nav className="flex gap-6">
            <Link href="/login" className="text-xl hover:text-cyan-400 transition-colors">
              LOGIN
            </Link>
            <Link href="/signup" className="text-xl hover:text-cyan-400 transition-colors">
              SIGNUP
            </Link>
          </nav>
        </header>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16 items-center">
          {/* About Section */}
          <div className="space-y-8">
            <section>
              <h2 className="text-3xl font-semibold mb-4">About Us</h2>
              <p className="text-gray-300 leading-relaxed">
                XAI-MedTrack is an AI-powered platform designed to assist healthcare professionals in diagnosing and
                tracking Alzheimer's disease using MRI scans. Our system leverages Explainable AI (XAI) to provide
                transparent and interpretable insights, ensuring doctors can trust and understand AI-driven predictions.
              </p>
              <p className="text-gray-300 leading-relaxed mt-4">
                With advanced medical imaging analysis, progression monitoring, and automated reporting, we're bridging
                the gap between cutting-edge AI and practical healthcare applications.
              </p>
            </section>

            <h2 className="text-2xl font-semibold text-cyan-400">
              Bridging AI and Healthcare for a Smarter Future!
            </h2>
          </div>

          {/* Brain Illustration */}
          <div className="relative h-[400px] flex justify-center items-center">
            <Image
              src="/ai-brain-illustration.png" // <- Replace with your actual brain-themed AI image (PNG/SVG)
              alt="AI Brain Illustration"
              width={400}
              height={400}
              className="object-contain drop-shadow-xl"
              priority
            />
          </div>
        </div>
      </div>
    </main>
  )
}
