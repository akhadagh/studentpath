import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'
import toast from 'react-hot-toast'
import { FiChevronRight, FiChevronLeft, FiCheck } from 'react-icons/fi'

const QUESTIONS = [
  {
    key: 'interests',
    question: 'Which activities do you enjoy most?',
    options: {
      1: 'Solving technical problems and working with technology',
      2: 'Helping and caring for other people',
      3: 'Managing projects and leading teams',
      4: 'Designing and building things',
      5: 'Research and analyzing information',
      6: 'Teaching and sharing knowledge',
      7: 'Working with nature and the environment',
      8: 'Creative expression and communication',
    },
  },
  {
    key: 'strengths',
    question: 'What are you best at in school?',
    options: {
      1: 'Mathematics and Computer Science',
      2: 'Science (Biology, Chemistry, Physics)',
      3: 'Business Studies and Economics',
      4: 'Technical and Vocational subjects',
      5: 'Social Sciences and Humanities',
      6: 'Languages and Communication',
      7: 'Agriculture and Environmental Studies',
      8: 'Arts and Creative subjects',
    },
  },
  {
    key: 'work_style',
    question: 'How do you prefer to work?',
    options: {
      1: 'Independently with computers and technology',
      2: 'In teams, directly helping others',
      3: 'In leadership roles, making decisions',
      4: 'Hands-on, building or fixing things',
      5: 'Analyzing data and finding patterns',
      6: 'In educational settings, sharing knowledge',
      7: 'Outdoors, working with nature',
      8: 'In creative, flexible environments',
    },
  },
  {
    key: 'values',
    question: 'What matters most to you in a career?',
    options: {
      1: 'High income and financial security',
      2: 'Making a difference in people\'s lives',
      3: 'Status and professional recognition',
      4: 'Job stability and benefits',
      5: 'Intellectual challenge and growth',
      6: 'Work-life balance',
      7: 'Working in a growing industry',
      8: 'Creative freedom and independence',
    },
  },
  {
    key: 'challenges',
    question: 'What type of challenges energize you?',
    options: {
      1: 'Debugging complex code or systems',
      2: 'Diagnosing and treating health conditions',
      3: 'Negotiating deals or solving business problems',
      4: 'Engineering solutions to infrastructure problems',
      5: 'Legal research and argumentation',
      6: 'Designing curricula and educating others',
      7: 'Addressing environmental or food security issues',
      8: 'Creating compelling content or designs',
    },
  },
  {
    key: 'future',
    question: 'Where do you see yourself in 10 years?',
    options: {
      1: 'Leading a tech company or startup',
      2: 'Working in a hospital or health organization',
      3: 'Running my own business',
      4: 'Managing major construction or engineering projects',
      5: 'Practicing law or working in policy',
      6: 'Teaching at a university or leading an educational institution',
      7: 'Working on sustainable development projects',
      8: 'Working in media, arts, or cultural organizations',
    },
  },
]

export default function Assessment() {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [assessmentId, setAssessmentId] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [started, setStarted] = useState(false)
  const navigate = useNavigate()

  const startAssessment = async () => {
    try {
      const res = await api.post('/api/v1/assessment/start')
      setAssessmentId(res.data.id)
      setStarted(true)
    } catch (err) {
      toast.error('Failed to start assessment')
    }
  }

  useEffect(() => { startAssessment() }, [])

  const question = QUESTIONS[currentStep]
  const progress = ((currentStep + 1) / QUESTIONS.length) * 100

  const handleSelect = (value) => {
    setAnswers({ ...answers, [question.key]: value })
  }

  const handleNext = () => {
    if (!answers[question.key]) {
      toast.error('Please select an option')
      return
    }
    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrev = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1)
  }

  const handleSubmit = async () => {
    if (!answers[question.key]) {
      toast.error('Please select an option')
      return
    }
    setSubmitting(true)
    try {
      await api.post(`/api/v1/assessment/${assessmentId}/submit`, { answers })
      toast.success('Assessment complete!')
      navigate('/results')
    } catch (err) {
      toast.error('Failed to submit assessment')
    } finally {
      setSubmitting(false)
    }
  }

  if (!started) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-[80vh] bg-slate-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <div className="flex justify-between text-sm text-slate-500 mb-2">
            <span>Question {currentStep + 1} of {QUESTIONS.length}</span>
            <span>{Math.round(progress)}% complete</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div
              className="bg-primary-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
          <h2 className="text-xl font-bold text-slate-900 mb-6">{question.question}</h2>
          <div className="space-y-3">
            {Object.entries(question.options).map(([value, label]) => (
              <button
                key={value}
                onClick={() => handleSelect(parseInt(value))}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                  answers[question.key] === parseInt(value)
                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    answers[question.key] === parseInt(value)
                      ? 'border-primary-500 bg-primary-500'
                      : 'border-slate-300'
                  }`}>
                    {answers[question.key] === parseInt(value) && (
                      <FiCheck className="w-3 h-3 text-white" />
                    )}
                  </div>
                  <span className="font-medium">{label}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={handlePrev}
            disabled={currentStep === 0}
            className="flex items-center gap-1 px-6 py-2.5 rounded-xl font-medium text-slate-600 hover:bg-slate-100 transition disabled:opacity-30"
          >
            <FiChevronLeft /> Back
          </button>
          {currentStep === QUESTIONS.length - 1 ? (
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="flex items-center gap-1 px-6 py-2.5 rounded-xl font-medium bg-accent-600 text-white hover:bg-accent-700 transition disabled:opacity-50"
            >
              {submitting ? 'Submitting...' : 'Get Results'} <FiCheck />
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="flex items-center gap-1 px-6 py-2.5 rounded-xl font-medium bg-primary-600 text-white hover:bg-primary-700 transition"
            >
              Next <FiChevronRight />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
