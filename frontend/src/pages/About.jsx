import { Link } from 'react-router-dom'
import { FiArrowRight, FiTarget, FiEye, FiHeart, FiCheckCircle } from 'react-icons/fi'

export default function About() {
  const values = [
    { icon: <FiTarget className="w-6 h-6" />, title: 'Student-First', desc: 'Every feature is designed around what students actually need — clear guidance, honest data, and zero confusion.' },
    { icon: <FiEye className="w-6 h-6" />, title: 'Transparency', desc: 'We show you verified data sources, cut-off ranges, and clear eligibility criteria. No hidden agendas.' },
    { icon: <FiHeart className="w-6 h-6" />, title: 'Accessibility', desc: 'StudentPath is completely free. Every Ghanaian student deserves guidance regardless of their financial background.' },
    { icon: <FiCheckCircle className="w-6 h-6" />, title: 'Accuracy', desc: 'Our data is sourced from official university websites, GTEC, and verified admission documents.' },
  ]

  const team = [
    { name: 'Joshua Boamah', role: 'Founder & Developer', img: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300' },
  ]

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/1438071/pexels-photo-1438071.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Students celebrating graduation"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 to-primary-800/80"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-24 md:py-32">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">About StudentPath</h1>
            <p className="text-lg text-blue-100 leading-relaxed">
              We are on a mission to help every Ghanaian student find the right career, programme, and university — making informed decisions about their future.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="w-full md:w-1/2">
              <img
                src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Team collaborating"
                className="rounded-2xl shadow-lg w-full h-80 object-cover"
              />
            </div>
            <div className="w-full md:w-1/2">
              <span className="text-primary-600 font-semibold text-sm uppercase tracking-wide">Our Mission</span>
              <h2 className="text-3xl font-bold text-slate-900 mt-2 mb-6">Bridging the Gap Between Students and Opportunities</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Every year, thousands of Ghanaian students struggle to choose the right career path and university programme. Many make uninformed decisions that affect their entire future.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                StudentPath was built to solve this problem. We combine career guidance, university data, and eligibility checking into one simple platform that every student can access for free.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Our platform covers 16 Ghana universities, 10 career clusters, and 23+ programmes — with verified data sourced from official university websites and admission documents.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <span className="text-primary-600 font-semibold text-sm uppercase tracking-wide">Our Values</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">What We Stand For</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
                <div className="w-12 h-12 rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center mb-4">
                  {v.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{v.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <span className="text-primary-600 font-semibold text-sm uppercase tracking-wide">How We Work</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">Data You Can Trust</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Official Sources',
                desc: 'All university data, programme requirements, and cut-off points are sourced from official university websites and GTEC publications.',
                img: 'https://images.pexels.com/photos/5428831/pexels-photo-5428831.jpeg?auto=compress&cs=tinysrgb&w=600',
              },
              {
                title: 'Verified Data',
                desc: 'Each data point goes through our verification process. Sources are documented and cross-referenced with multiple authorities.',
                img: 'https://images.pexels.com/photos/7681091/pexels-photo-7681091.jpeg?auto=compress&cs=tinysrgb&w=600',
              },
              {
                title: 'Regular Updates',
                desc: 'We update our database regularly to reflect the latest admission requirements, cut-off points, and programme changes.',
                img: 'https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=600',
              },
            ].map((item, i) => (
              <div key={i} className="bg-slate-50 rounded-2xl overflow-hidden border border-slate-100">
                <img src={item.img} alt={item.title} className="w-full h-48 object-cover" loading="lazy" />
                <div className="p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Your Journey?</h2>
          <p className="text-primary-100 text-lg mb-8">Join thousands of students who have found their path with StudentPath.</p>
          <Link
            to="/register"
            className="bg-white text-primary-700 px-8 py-3 rounded-xl font-semibold text-lg hover:bg-blue-50 transition inline-flex items-center gap-2"
          >
            Get Started Free <FiArrowRight />
          </Link>
        </div>
      </section>
    </div>
  )
}
