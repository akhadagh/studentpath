import { Link } from 'react-router-dom'
import { FiArrowRight, FiTarget, FiBookOpen, FiAward, FiUsers, FiBarChart2, FiSearch, FiCheckCircle, FiFileText } from 'react-icons/fi'

export default function Home() {
  const steps = [
    { icon: <FiTarget className="w-7 h-7" />, title: 'Take Assessment', desc: 'Answer questions about your interests, strengths, and goals in minutes' },
    { icon: <FiBarChart2 className="w-7 h-7" />, title: 'Get Matched', desc: 'Our engine scores and matches you with the best career directions' },
    { icon: <FiSearch className="w-7 h-7" />, title: 'Explore Programmes', desc: 'See what to study and where to achieve your career goals' },
    { icon: <FiAward className="w-7 h-7" />, title: 'Find Your Path', desc: 'Get a personalised report with your top career matches' },
  ]

  const stats = [
    { value: '41', label: 'Universities' },
    { value: '10+', label: 'Career Clusters' },
    { value: '150+', label: 'Programmes' },
    { value: '100%', label: 'Free to Use' },
  ]

  const features = [
    {
      title: 'Personalised Assessment',
      desc: 'Our smart assessment engine analyses your interests, strengths, and academic preferences to recommend the best career paths for you.',
      img: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      title: 'University Explorer',
      desc: 'Browse 41 Ghana and international universities, compare programmes, check entry requirements, and find the perfect fit for your future.',
      img: 'https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      title: 'Eligibility Checker',
      desc: 'Enter your WASSCE grades and instantly see which programmes you qualify for at your preferred universities.',
      img: 'https://images.pexels.com/photos/5428829/pexels-photo-5428829.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      title: 'Programme Search',
      desc: 'Search and filter programmes by field, university, or career cluster. Find exactly what you need to reach your goals.',
      img: 'https://images.pexels.com/photos/4145153/pexels-photo-4145153.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
  ]

  const testimonials = [
    { name: 'Ama K.', school: 'Accra Girls SHS', text: 'StudentPath helped me discover I could pursue Biomedical Engineering. I had no idea this programme existed!' },
    { name: 'Kwesi M.', school: 'Mfantsipim School', text: 'The eligibility checker saved me so much time. I knew exactly which programmes to apply for.' },
    { name: 'Efua D.', school: 'Wesley Girls SHS', text: 'I was confused about my career path. The assessment matched me with Environmental Science — now I am studying at UG!' },
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Students studying"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 via-primary-800/80 to-primary-900/90"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-24 md:py-32">
          <div className="max-w-2xl">
            <span className="inline-block bg-white/10 backdrop-blur text-white/90 text-sm font-medium px-4 py-1.5 rounded-full mb-6 border border-white/20">
              Ghana's #1 Career Guidance Platform
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Find Your Future Path
            </h1>
            <p className="text-lg md:text-xl text-blue-100 mb-8 leading-relaxed">
              StudentPath helps you discover the right career, programme, and university
              — personalised to you. Free for every Ghanaian student.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/register"
                className="bg-white text-primary-700 px-8 py-3.5 rounded-xl font-semibold text-lg hover:bg-blue-50 transition flex items-center justify-center gap-2 shadow-lg"
              >
                Start Your Journey <FiArrowRight />
              </Link>
              <Link
                to="/explore"
                className="border-2 border-white/30 text-white px-8 py-3.5 rounded-xl font-semibold text-lg hover:bg-white/10 transition text-center"
              >
                Explore Universities
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div key={i} className="text-center p-4">
                <div className="text-3xl font-bold text-primary-600">{stat.value}</div>
                <div className="text-slate-500 mt-1 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <span className="text-primary-600 font-semibold text-sm uppercase tracking-wide">Simple Process</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">How It Works</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <div key={i} className="relative bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
                <div className="w-14 h-14 rounded-2xl bg-primary-100 text-primary-600 flex items-center justify-center mb-5">
                  {step.icon}
                </div>
                <div className="text-xs font-bold text-primary-500 mb-1 uppercase tracking-wider">Step {i + 1}</div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
                {i < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 text-slate-300">
                    <FiArrowRight className="w-5 h-5" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Sections with Images */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <span className="text-primary-600 font-semibold text-sm uppercase tracking-wide">Features</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">Everything You Need</h2>
          </div>
          <div className="space-y-20">
            {features.map((feature, i) => (
              <div key={i} className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-10`}>
                <div className="w-full md:w-1/2">
                  <div className="rounded-2xl overflow-hidden shadow-lg">
                    <img
                      src={feature.img}
                      alt={feature.title}
                      className="w-full h-72 object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
                <div className="w-full md:w-1/2">
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed text-lg">{feature.desc}</p>
                  <Link
                    to="/register"
                    className="inline-flex items-center gap-2 mt-6 text-primary-600 font-semibold hover:text-primary-700 transition"
                  >
                    Get Started <FiArrowRight />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* StudentPath Guide */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-gradient-to-br from-primary-700 to-primary-900 rounded-2xl p-8 md:p-12 text-white">
            <div className="flex flex-col md:flex-row items-center gap-10">
              <div className="flex-1">
                <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center mb-6">
                  <FiFileText className="w-7 h-7" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                  The StudentPath Guide
                </h2>
                <p className="text-lg text-blue-100 mb-2 leading-relaxed">
                  A Complete, Easy-to-Understand Guide to Choosing Your Career, Programme and University
                </p>
                <p className="text-blue-200 text-sm mb-6">
                  Ghana-focused &middot; Globally expandable &middot; Student-friendly &middot; Updated September 2026
                </p>
                <div className="grid grid-cols-2 gap-3 mb-8 text-sm">
                  <div className="bg-white/10 rounded-xl p-3 text-center">
                    <div className="font-bold text-white">18 Chapters</div>
                    <div className="text-blue-200">Comprehensive guidance</div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-3 text-center">
                    <div className="font-bold text-white">4 Worksheets</div>
                    <div className="text-blue-200">Practical exercises</div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-3 text-center">
                    <div className="font-bold text-white">5-Step Method</div>
                    <div className="text-blue-200">Decision framework</div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-3 text-center">
                    <div className="font-bold text-white">Verified Sources</div>
                    <div className="text-blue-200">Official references</div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    to="/guide"
                    className="bg-white text-primary-700 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition inline-flex items-center justify-center gap-2"
                  >
                    Read the Guide <FiArrowRight />
                  </Link>
                  <Link
                    to="/eligibility"
                    className="border-2 border-white/30 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/10 transition text-center"
                  >
                    Check Your Eligibility
                  </Link>
                </div>
              </div>
              <div className="hidden md:block flex-shrink-0">
                <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20 max-w-xs">
                  <h3 className="font-bold mb-3">Quick Summary</h3>
                  <div className="space-y-2 text-sm text-blue-100">
                    <p>1. Discover yourself — interests, strengths, goals</p>
                    <p>2. Explore career areas and programmes</p>
                    <p>3. Verify requirements with official sources</p>
                    <p>4. Check your eligibility with your grades</p>
                    <p>5. Compare options and decide with confidence</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who Is StudentPath For */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <span className="text-primary-600 font-semibold text-sm uppercase tracking-wide">For Students</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">Who Is StudentPath For?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'SHS Students',
                desc: 'Choosing your programme and university after WASSCE. Get personalised guidance on what to study and where.',
                img: 'https://images.pexels.com/photos/5428829/pexels-photo-5428829.jpeg?auto=compress&cs=tinysrgb&w=600',
              },
              {
                title: 'University Students',
                desc: 'Finding your career direction while studying. Discover if your programme aligns with your goals.',
                img: 'https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=600',
              },
              {
                title: 'Career Changers',
                desc: 'Exploring new career paths and the programmes you need to make the switch successfully.',
                img: 'https://images.pexels.com/photos/4145153/pexels-photo-4145153.jpeg?auto=compress&cs=tinysrgb&w=600',
              },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-md transition">
                <img src={item.img} alt={item.title} className="w-full h-48 object-cover" loading="lazy" />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <span className="text-primary-600 font-semibold text-sm uppercase tracking-wide">Testimonials</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">What Students Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-slate-50 rounded-2xl p-8 border border-slate-100">
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map(s => (
                    <FiCheckCircle key={s} className="w-5 h-5 text-amber-400" />
                  ))}
                </div>
                <p className="text-slate-700 leading-relaxed mb-6 italic">"{t.text}"</p>
                <div>
                  <div className="font-semibold text-slate-900">{t.name}</div>
                  <div className="text-sm text-slate-500">{t.school}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/1438071/pexels-photo-1438071.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Graduation"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary-900/85"></div>
        </div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Find Your Path?</h2>
          <p className="text-lg text-blue-100 mb-8">Join thousands of Ghanaian students who have discovered their future with StudentPath.</p>
          <Link
            to="/register"
            className="bg-white text-primary-700 px-10 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition inline-flex items-center gap-2 shadow-lg"
          >
            Get Started Free <FiArrowRight />
          </Link>
        </div>
      </section>
    </div>
  )
}
