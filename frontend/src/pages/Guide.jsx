import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiArrowRight, FiBookOpen, FiTarget, FiSearch, FiCheckCircle, FiAward, FiHelpCircle, FiChevronDown, FiChevronUp, FiFileText } from 'react-icons/fi';

const chapters = [
  {
    id: 'welcome',
    title: 'Welcome: Why This Guide Exists',
    icon: <FiBookOpen className="w-5 h-5" />,
    content: `Choosing what to study is one of the biggest decisions a student can make. Many students are asked to choose a programme before they fully understand themselves, the careers available, admission requirements, or the universities that offer the programmes they want.`,
    extra: `This guide helps you answer five important questions:\n\n1. Who am I?\n2. What career direction may suit me?\n3. What programme should I consider?\n4. Do my academic results meet the requirements?\n5. Which university or institution is the best option for me?\n\nThe main message is simple: choosing a programme should not be a guessing game. A strong decision combines self-knowledge, research, academic eligibility and practical realities such as cost, location and career opportunities.`,
  },
  {
    id: 'start-with-yourself',
    title: 'Chapter 1 — Start With Yourself',
    icon: <FiTarget className="w-5 h-5" />,
    content: `Before choosing a university or programme, learn about yourself.`,
    extra: `Ask:\n\n- What subjects do I genuinely enjoy?\n- What activities make me curious?\n- What problems do I enjoy solving?\n- What am I naturally good at?\n- Do I enjoy working with people, numbers, technology, machines, ideas, art or nature?\n- What kind of life and work environment do I want?\n\nInterest matters because a programme can last several years. But interest alone is not enough. You should also consider your strengths, academic preparation and opportunities connected to the field.`,
    exercise: 'Write five things you enjoy, five things you are good at and three problems in the world you would like to help solve.',
  },
  {
    id: 'career-programme-job',
    title: 'Chapter 2 — Career, Programme and Job',
    icon: <FiSearch className="w-5 h-5" />,
    content: `A CAREER is a long-term professional direction. Example: software development.\n\nA PROGRAMME is what you study. Example: BSc Computer Science.\n\nA JOB is a specific position. Example: Junior Software Developer.`,
    extra: `Think of the journey like this:\n\nINTEREST → CAREER AREA → PROGRAMME → UNIVERSITY → JOB OPPORTUNITIES\n\nOne programme can lead to several careers, and one career can sometimes be entered through different programmes. Do not choose a programme simply because of its name. Research what students actually learn and what careers it can lead to.`,
  },
  {
    id: 'explore-career-areas',
    title: 'Chapter 3 — Explore Career Areas',
    icon: <FiAward className="w-5 h-5" />,
    content: `Instead of immediately saying "I must study this one course," first explore broader career areas.`,
    extra: `Examples:\n\n- Technology and Computing\n- Engineering and Technical Careers\n- Healthcare and Medicine\n- Business and Finance\n- Creative and Media Industries\n- Science and Research\n- Education and Training\n- Agriculture and Environmental Careers\n- Law, Government and Public Policy\n- Social and Community Services\n\nInternational research shows that programme and institution choice can be influenced by abilities, previous education, career goals, programme availability, cost, location and employment opportunities. This is why StudentPath should help students consider several factors, not just one.`,
  },
  {
    id: 'interests-strengths',
    title: 'Chapter 4 — Use Interests and Strengths Together',
    icon: <FiCheckCircle className="w-5 h-5" />,
    content: `A good choice often sits where INTEREST and ABILITY meet.`,
    extra: `Examples:\n\n- You may love technology but dislike programming. Explore different technology careers instead of assuming all technology programmes are the same.\n- You may enjoy helping people and also be strong in Biology. Healthcare may be worth exploring.\n- You may enjoy Mathematics and problem-solving. Computing, engineering, economics, statistics or finance may be possibilities.\n\nDo not panic if you are good at several things. Having several strengths is an advantage. Your job is to compare the possible paths carefully.`,
  },
  {
    id: 'think-about-future',
    title: 'Chapter 5 — Think About Your Future',
    icon: <FiTarget className="w-5 h-5" />,
    content: `When choosing a programme, think about where it leads.`,
    extra: `Ask:\n\n- What skills will I develop?\n- What careers can this programme lead to?\n- Can I continue into postgraduate study?\n- Can I build a business with these skills?\n- Will I enjoy learning this subject deeply?\n- What problems will I be trained to solve?\n\nDo not choose a programme only because your friend selected it, because it sounds prestigious, or because you heard someone earns a lot from it.\n\nPopular does not automatically mean suitable for you.`,
  },
  {
    id: 'academic-profile',
    title: 'Chapter 6 — Understand Your Academic Profile',
    icon: <FiFileText className="w-5 h-5" />,
    content: `For many Ghanaian applicants, academic eligibility starts with WASSCE or another recognised qualification.`,
    extra: `Your academic profile should include:\n\n- Qualification type\n- Core subjects and grades\n- Elective subjects and grades\n- Completion year\n- Whether results are final or predicted\n\nMany universities publish general entry requirements, but programme-specific requirements can be different. A university may have general credits for admission while a particular programme additionally requires Elective Mathematics, Biology, Chemistry, Literature-in-English or another specific subject.\n\nThis is why StudentPath should never use one generic rule for every programme.`,
  },
  {
    id: 'general-vs-programme',
    title: 'Chapter 7 — General Requirements vs Programme Requirements',
    icon: <FiHelpCircle className="w-5 h-5" />,
    content: `GENERAL REQUIREMENTS tell you the basic academic standard needed to apply to an institution.\n\nPROGRAMME-SPECIFIC REQUIREMENTS tell you the subjects and grades needed for a particular programme.`,
    extra: `Official examples from Ghanaian universities show that institutions publish their own requirements and special programme conditions. The University of Ghana provides programme-specific subject requirements. KNUST publishes its undergraduate requirements and programme information. UCC and UEW publish their own admission conditions, while technical universities can have requirements tailored to technical programmes.\n\nNever assume:\n"If I qualify generally, I automatically qualify for every programme."\n\nAlways check the exact programme.`,
  },
  {
    id: 'cut-off-points',
    title: 'Chapter 8 — Understanding Cut-Off Points',
    icon: <FiSearch className="w-5 h-5" />,
    content: `Students often misunderstand cut-off points. Historical cut-offs should be treated mainly as guidance about previous admission patterns.`,
    extra: `Competitiveness can change because of:\n\n- Number of applicants\n- Available spaces\n- Programme popularity\n- Institutional policy\n- Academic year\n\nA responsible system should separate:\n1. Published minimum requirements\n2. Programme-specific subject requirements\n3. Historical cut-off or competitiveness information\n\nMeeting a previous cut-off does not guarantee admission. Meeting minimum requirements also does not automatically guarantee admission.`,
  },
  {
    id: 'choosing-university',
    title: 'Chapter 9 — Choosing a University',
    icon: <FiBookOpen className="w-5 h-5" />,
    content: `Do not choose a university only because it is famous.`,
    extra: `Compare:\n\n- Does it offer the programme you want?\n- Is the institution accredited?\n- What are the programme requirements?\n- Where is it located?\n- What will tuition and living costs be?\n- What facilities are available?\n- What type of institution is it?\n- Are there practical, laboratory or industry opportunities?\n\nIn Ghana, accreditation should be taken seriously. Use official information from the Ghana Tertiary Education Commission (GTEC) and relevant professional regulators where appropriate.`,
  },
  {
    id: 'decision-method',
    title: 'Chapter 10 — The StudentPath Decision Method',
    icon: <FiAward className="w-5 h-5" />,
    content: `This is the core method StudentPath uses to help you make an informed decision.`,
    extra: `STEP 1: DISCOVER — Understand your interests, strengths, preferences and goals.\n\nSTEP 2: EXPLORE — Identify career areas and possible programmes.\n\nSTEP 3: VERIFY — Check official programme and university information.\n\nSTEP 4: CHECK ELIGIBILITY — Compare your subjects and grades with verified requirements.\n\nSTEP 5: COMPARE — Compare your best options before making a final decision.\n\nThis method helps you move from "I don't know what to study" to a clearer, evidence-based plan.`,
  },
  {
    id: 'assessment-help',
    title: 'Chapter 11 — How the Career Assessment Helps',
    icon: <FiTarget className="w-5 h-5" />,
    content: `The Career Assessment answers: "What career directions and programme areas may suit me?"`,
    extra: `It should examine:\n\n- Interests\n- Strengths\n- Academic interests\n- Work preferences\n- Career values\n- Future goals\n\nIt should provide:\n- Top career clusters\n- Explanations of why they matched\n- Careers to explore\n- Related academic programmes\n\nThe assessment should provide guidance, not predict destiny.\n\nGood: "Your responses suggest that you may enjoy exploring..."\nBad: "You are definitely meant to become..."\n\nEvery important recommendation should explain WHY.`,
  },
  {
    id: 'eligibility-help',
    title: 'Chapter 12 — How the Eligibility Checker Helps',
    icon: <FiCheckCircle className="w-5 h-5" />,
    content: `The Eligibility Checker answers: "Based on my academic qualifications and results, what programmes may I be eligible to explore?"`,
    extra: `For a WASSCE applicant, it may collect:\n\n- English Language grade\n- Core Mathematics grade\n- Integrated Science grade\n- Social Studies grade where relevant\n- Elective subjects\n- Elective grades\n\nIt should compare the student's profile with VERIFIED programme requirements.\n\nPossible outcomes:\n- Meets Published Requirements\n- Possible Match / Needs Further Review\n- Does Not Currently Meet Requirements\n- Insufficient Verified Data\n\nEvery result should explain the reason. The system must never invent a requirement or guarantee admission.`,
  },
  {
    id: 'search-methods',
    title: 'Chapter 13 — Search by Programme or University',
    icon: <FiSearch className="w-5 h-5" />,
    content: `StudentPath supports three powerful ways to search:`,
    extra: `PROGRAMME-FIRST:\n"I want to study Computer Science. Which institutions offer it, and what are the requirements?"\n\nUNIVERSITY-FIRST:\n"I want to attend this university. Which programmes may I qualify for?"\n\nPERSONALISED SEARCH:\n"Here are my grades. Show me programmes I may be eligible to explore."\n\nThis is more useful than a simple directory because the results can be personalised and explained.`,
  },
  {
    id: 'not-meet-requirements',
    title: 'Chapter 14 — What If You Do Not Meet the Requirements?',
    icon: <FiHelpCircle className="w-5 h-5" />,
    content: `Not qualifying for one programme does not mean your future is over.`,
    extra: `Possible next steps:\n\n- Explore related programmes\n- Improve or resit relevant subjects where appropriate\n- Consider diploma or other recognised pathways\n- Explore technical and vocational routes\n- Review other accredited institutions\n- Build a longer-term education plan\n\nStudentPath should explain what requirement is missing, why it matters and which verified alternatives may fit the student's current academic profile.`,
  },
  {
    id: 'decision-matrix',
    title: 'Chapter 15 — Compare Options With a Decision Matrix',
    icon: <FiAward className="w-5 h-5" />,
    content: `Use this framework to compare your top programme options:`,
    extra: `Suggested factors:\n\n- Interest and fit — 25%\n- Academic eligibility — 25%\n- Career opportunities — 20%\n- Cost and affordability — 15%\n- Location and personal circumstances — 15%\n\nScore each option honestly.\n\nThe "best" programme is not the same for every student. The best option is usually the one with the strongest balance between personal fit, eligibility and practical reality.`,
  },
  {
    id: 'studentpath-journey',
    title: 'Chapter 16 — Build Your Personal StudentPath',
    icon: <FiTarget className="w-5 h-5" />,
    content: `Map out your personal plan:`,
    extra: `MY INTERESTS: What do I enjoy?\n\nMY STRENGTHS: What am I good at?\n\nMY CAREER AREAS: What directions should I explore?\n\nMY PROGRAMMES: Which programmes connect to those directions?\n\nMY ACADEMIC PROFILE: What subjects and grades do I have?\n\nMY ELIGIBILITY: Which verified programmes appear to match my profile?\n\nMY UNIVERSITY OPTIONS: Which accredited institutions offer them?\n\nMY NEXT ACTION: What should I do this month?\n\nA clear plan is better than trying to solve your whole future in one day.`,
  },
  {
    id: 'research-safely',
    title: 'Chapter 17 — Research Safely',
    icon: <FiCheckCircle className="w-5 h-5" />,
    content: `Use reliable sources when making your education decisions.`,
    extra: `BEST SOURCES:\n1. Official university admissions websites\n2. Official university programme pages\n3. Official admission brochures and PDFs\n4. GTEC and other relevant regulators\n5. Official professional bodies for regulated programmes\n\nBE CAREFUL WITH:\n- Old blog posts\n- Screenshots without dates\n- Random WhatsApp messages\n- Unverified social media posts\n- Websites that do not link to official sources\n\nAlways check the academic year, publication date, source organisation and whether the requirement applies to your qualification.`,
  },
  {
    id: 'complete-journey',
    title: 'Chapter 18 — The Complete StudentPath Journey',
    icon: <FiArrowRight className="w-5 h-5" />,
    content: `Here is the full journey from start to finish:`,
    extra: `DISCOVER MYSELF\n↓\nCAREER ASSESSMENT\n↓\nTOP CAREER MATCHES\n↓\nPROGRAMMES TO EXPLORE\n↓\nELIGIBILITY CHECKER\n↓\nPROGRAMMES I MAY QUALIFY FOR\n↓\nUNIVERSITIES OFFERING THEM\n↓\nREQUIREMENTS AND COMPETITIVENESS GUIDANCE\n↓\nCOMPARE MY OPTIONS\n↓\nBUILD MY PERSONAL STUDENTPATH\n\nThis is the difference between a normal university directory and an intelligent student decision platform.`,
  },
];

const worksheets = [
  {
    title: 'Worksheet 1 — Self-Discovery',
    items: ['Three subjects I enjoy:', 'Three activities I enjoy:', 'Three strengths I have:', 'Three career areas I want to explore:'],
  },
  {
    title: 'Worksheet 2 — Programme Research',
    items: ['What is the programme about?', 'What subjects are important?', 'What careers can it lead to?', 'Do I meet the requirements?', 'Which universities offer it?'],
  },
  {
    title: 'Worksheet 3 — University Comparison',
    items: ['Programme availability', 'Requirements', 'Accreditation', 'Location', 'Cost', 'Facilities', 'Personal preference'],
  },
  {
    title: 'Worksheet 4 — My Next Actions',
    items: ['This week I will:', 'This month I will:', 'Before applications I will:'],
  },
];

export default function Guide() {
  const [openChapter, setOpenChapter] = useState('welcome');

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
            <Link to="/" className="hover:text-primary-600 transition">Home</Link>
            <FiArrowRight className="w-3 h-3" />
            <span className="text-primary-600">StudentPath Guide</span>
          </div>
          <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl p-8 md:p-12 text-white">
            <span className="inline-block bg-white/10 backdrop-blur text-white/90 text-sm font-medium px-4 py-1.5 rounded-full mb-4 border border-white/20">
              A Complete, Easy-to-Understand Guide
            </span>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
              The StudentPath Guide
            </h1>
            <p className="text-lg md:text-xl text-blue-100 mb-4 max-w-3xl">
              A Complete, Easy-to-Understand Guide to Choosing Your Career, Programme and University
            </p>
            <div className="flex flex-wrap gap-3 text-sm text-blue-200">
              <span className="bg-white/10 px-3 py-1 rounded-full">Ghana-focused</span>
              <span className="bg-white/10 px-3 py-1 rounded-full">Globally expandable</span>
              <span className="bg-white/10 px-3 py-1 rounded-full">Student-friendly</span>
              <span className="bg-white/10 px-3 py-1 rounded-full">Research updated: September 2026</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Chapter List */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-xl border border-slate-200 p-4">
              <h3 className="text-sm font-semibold text-slate-900 mb-3 uppercase tracking-wider">Contents</h3>
              <div className="space-y-1 max-h-[60vh] overflow-y-auto">
                {chapters.map((ch) => (
                  <button
                    key={ch.id}
                    onClick={() => setOpenChapter(ch.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition flex items-center gap-2 ${
                      openChapter === ch.id
                        ? 'bg-primary-50 text-primary-700 font-medium'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span className="flex-shrink-0">{ch.icon}</span>
                    <span className="truncate">{ch.title}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {chapters.map((ch) => (
              <div
                key={ch.id}
                id={ch.id}
                className={`bg-white rounded-xl border transition ${
                  openChapter === ch.id ? 'border-primary-200 shadow-sm' : 'border-slate-200'
                }`}
              >
                <button
                  onClick={() => setOpenChapter(openChapter === ch.id ? '' : ch.id)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center flex-shrink-0">
                      {ch.icon}
                    </div>
                    <h2 className="text-lg font-bold text-slate-900">{ch.title}</h2>
                  </div>
                  {openChapter === ch.id ? (
                    <FiChevronUp className="w-5 h-5 text-slate-400 flex-shrink-0" />
                  ) : (
                    <FiChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
                  )}
                </button>

                {openChapter === ch.id && (
                  <div className="px-6 pb-6">
                    <div className="prose prose-slate max-w-none">
                      <p className="text-slate-700 leading-relaxed text-base whitespace-pre-line">{ch.content}</p>
                      {ch.extra && (
                        <div className="mt-4 text-slate-600 leading-relaxed text-sm whitespace-pre-line bg-slate-50 rounded-xl p-5 border border-slate-100">
                          {ch.extra}
                        </div>
                      )}
                      {ch.exercise && (
                        <div className="mt-4 p-4 bg-primary-50 rounded-xl border border-primary-100">
                          <p className="text-sm font-semibold text-primary-800 mb-1">Exercise:</p>
                          <p className="text-sm text-primary-700">{ch.exercise}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Worksheets */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-6">Practical Worksheets</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {worksheets.map((ws, i) => (
                  <div key={i} className="bg-slate-50 rounded-xl p-5 border border-slate-100">
                    <h3 className="font-semibold text-slate-900 mb-3">{ws.title}</h3>
                    <ul className="space-y-2">
                      {ws.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-slate-600">
                          <span className="w-4 h-4 rounded border border-slate-300 flex-shrink-0 mt-0.5"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Final Advice */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 text-white">
              <h2 className="text-xl font-bold mb-4">Final Advice</h2>
              <p className="text-slate-300 leading-relaxed mb-4">
                Do not rush because other people seem certain about their future. Your path can be researched, tested and improved.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
                {['Know yourself', 'Explore widely', 'Check facts', 'Verify requirements', 'Compare options'].map((tip, i) => (
                  <div key={i} className="bg-white/10 rounded-xl p-3 text-center text-sm font-medium">
                    {tip}
                  </div>
                ))}
              </div>
              <p className="text-sm text-slate-400">
                Remember: admission requirements and policies can change. Always confirm important decisions using current official information from the relevant institution.
              </p>
            </div>

            {/* Disclaimer */}
            <div className="bg-amber-50 rounded-xl border border-amber-200 p-6">
              <h3 className="font-semibold text-amber-800 mb-2">Important Disclaimer</h3>
              <p className="text-sm text-amber-700 leading-relaxed">
                This guide provides educational guidance. Meeting published minimum requirements or appearing eligible does not guarantee admission. Admission decisions remain the responsibility of the relevant institution and may depend on current policies, programme capacity, competition and additional requirements.
              </p>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/assessment" className="flex-1 px-6 py-4 bg-primary-500 text-white rounded-xl font-semibold hover:bg-primary-600 transition text-center flex items-center justify-center gap-2">
                Take the Assessment <FiArrowRight />
              </Link>
              <Link to="/eligibility" className="flex-1 px-6 py-4 bg-white border border-slate-200 text-slate-700 rounded-xl font-semibold hover:bg-slate-50 transition text-center flex items-center justify-center gap-2">
                Check Eligibility <FiCheckCircle />
              </Link>
              <Link to="/explore/universities" className="flex-1 px-6 py-4 bg-white border border-slate-200 text-slate-700 rounded-xl font-semibold hover:bg-slate-50 transition text-center flex items-center justify-center gap-2">
                Explore Universities <FiBookOpen />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
