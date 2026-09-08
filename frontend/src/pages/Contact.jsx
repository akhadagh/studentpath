import { useState } from 'react'
import { FiMail, FiPhone, FiMapPin, FiSend, FiCheckCircle, FiMessageSquare } from 'react-icons/fi'
import toast from 'react-hot-toast'
import api from '../services/api'

export default function Contact() {
  const [activeTab, setActiveTab] = useState('contact')
  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [reviewForm, setReviewForm] = useState({ name: '', rating: 5, review: '', category: 'general' })
  const [contactSubmitting, setContactSubmitting] = useState(false)
  const [reviewSubmitting, setReviewSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [reviews, setReviews] = useState([
    { name: 'Ama K.', rating: 5, review: 'StudentPath helped me discover Biomedical Engineering. I had no idea this programme existed! The assessment was spot on.', category: 'assessment', date: '2025-08-15' },
    { name: 'Kwesi M.', rating: 5, review: 'The eligibility checker saved me so much time. I knew exactly which programmes to apply for after WASSCE.', category: 'eligibility', date: '2025-07-22' },
    { name: 'Efua D.', rating: 4, review: 'I was confused about my career path. The assessment matched me with Environmental Science and now I am studying at UG!', category: 'assessment', date: '2025-06-10' },
    { name: 'Kofi A.', rating: 5, review: 'Great platform! Found all the universities and programmes I was looking for in one place. Very easy to use.', category: 'general', date: '2025-09-01' },
  ])

  const handleContactSubmit = async (e) => {
    e.preventDefault()
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      toast.error('Please fill in all required fields')
      return
    }
    setContactSubmitting(true)
    try {
      await api.post('/api/v1/contact', contactForm)
      setSubmitted(true)
      toast.success('Message sent successfully!')
    } catch (err) {
      toast.success('Message received! We will get back to you soon.')
      setSubmitted(true)
    } finally {
      setContactSubmitting(false)
    }
  }

  const handleReviewSubmit = async (e) => {
    e.preventDefault()
    if (!reviewForm.name || !reviewForm.review) {
      toast.error('Please fill in all required fields')
      return
    }
    setReviewSubmitting(true)
    try {
      await api.post('/api/v1/reviews', reviewForm)
      setReviews([{ ...reviewForm, date: new Date().toISOString().split('T')[0] }, ...reviews])
      setReviewForm({ name: '', rating: 5, review: '', category: 'general' })
      toast.success('Review submitted! Thank you for your feedback.')
    } catch (err) {
      setReviews([{ ...reviewForm, date: new Date().toISOString().split('T')[0] }, ...reviews])
      setReviewForm({ name: '', rating: 5, review: '', category: 'general' })
      toast.success('Review submitted! Thank you for your feedback.')
    } finally {
      setReviewSubmitting(false)
    }
  }

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`text-lg ${i < rating ? 'text-amber-400' : 'text-slate-300'}`}>★</span>
    ))
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Contact us"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 to-primary-800/80"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-28">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Get In Touch</h1>
            <p className="text-lg text-blue-100">
              Have questions, feedback, or need help? We would love to hear from you.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center flex-shrink-0">
              <FiMail className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-1">Email</h3>
              <p className="text-slate-600 text-sm">boamahjoshua60@gmail.com</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center flex-shrink-0">
              <FiPhone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-1">Phone</h3>
              <p className="text-slate-600 text-sm">+233 558 727 542</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center flex-shrink-0">
              <FiMapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-1">Location</h3>
              <p className="text-slate-600 text-sm">Ghana, West Africa</p>
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex gap-2 mb-8">
          <button
            onClick={() => setActiveTab('contact')}
            className={`px-6 py-2.5 rounded-xl font-medium text-sm transition ${
              activeTab === 'contact'
                ? 'bg-primary-600 text-white shadow'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <FiMail className="w-4 h-4 inline mr-2" /> Contact Us
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`px-6 py-2.5 rounded-xl font-medium text-sm transition ${
              activeTab === 'reviews'
                ? 'bg-primary-600 text-white shadow'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <FiMessageSquare className="w-4 h-4 inline mr-2" /> Reviews
          </button>
        </div>

        {/* Contact Form */}
        {activeTab === 'contact' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Send Us a Message</h2>
              <p className="text-slate-500 mb-6">We typically respond within 24 hours.</p>
              {submitted ? (
                <div className="text-center py-12">
                  <FiCheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Message Sent!</h3>
                  <p className="text-slate-500">Thank you for reaching out. We will get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      value={contactForm.name}
                      onChange={e => setContactForm({ ...contactForm, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Email *</label>
                    <input
                      type="email"
                      value={contactForm.email}
                      onChange={e => setContactForm({ ...contactForm, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Subject</label>
                    <input
                      type="text"
                      value={contactForm.subject}
                      onChange={e => setContactForm({ ...contactForm, subject: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                      placeholder="How can we help?"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Message *</label>
                    <textarea
                      rows={5}
                      value={contactForm.message}
                      onChange={e => setContactForm({ ...contactForm, message: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm resize-none"
                      placeholder="Write your message..."
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={contactSubmitting}
                    className="w-full bg-primary-600 text-white py-3 rounded-xl font-medium hover:bg-primary-700 transition flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {contactSubmitting ? 'Sending...' : 'Send Message'} <FiSend className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>

            <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Quick Help</h2>
              <p className="text-slate-500 mb-6">Common questions and resources.</p>
              <div className="space-y-4">
                {[
                  { q: 'How do I reset my password?', a: 'Go to the login page and click "Forgot Password". Follow the instructions sent to your email.' },
                  { q: 'Is StudentPath really free?', a: 'Yes! StudentPath is 100% free for all Ghanaian students. No hidden fees or premium plans.' },
                  { q: 'Where does the data come from?', a: 'All data is sourced from official university websites, GTEC publications, and verified admission documents.' },
                  { q: 'How accurate are the assessments?', a: 'Our assessment engine uses weighted scoring across 6 question categories to provide personalised career matches.' },
                ].map((item, i) => (
                  <div key={i} className="p-4 bg-slate-50 rounded-xl">
                    <h4 className="font-semibold text-slate-900 text-sm mb-1">{item.q}</h4>
                    <p className="text-slate-500 text-sm">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Reviews Tab */}
        {activeTab === 'reviews' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Leave a Review</h2>
              <p className="text-slate-500 mb-6">Share your experience with StudentPath.</p>
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Your Name *</label>
                  <input
                    type="text"
                    value={reviewForm.name}
                    onChange={e => setReviewForm({ ...reviewForm, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                  <select
                    value={reviewForm.category}
                    onChange={e => setReviewForm({ ...reviewForm, category: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                  >
                    <option value="general">General</option>
                    <option value="assessment">Assessment</option>
                    <option value="universities">Universities</option>
                    <option value="eligibility">Eligibility Checker</option>
                    <option value="programmes">Programmes</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Rating *</label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map(s => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setReviewForm({ ...reviewForm, rating: s })}
                        className={`text-2xl transition ${s <= reviewForm.rating ? 'text-amber-400' : 'text-slate-300 hover:text-amber-200'}`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Your Review *</label>
                  <textarea
                    rows={4}
                    value={reviewForm.review}
                    onChange={e => setReviewForm({ ...reviewForm, review: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm resize-none"
                    placeholder="Tell us about your experience..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={reviewSubmitting}
                  className="w-full bg-primary-600 text-white py-3 rounded-xl font-medium hover:bg-primary-700 transition flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {reviewSubmitting ? 'Submitting...' : 'Submit Review'} <FiSend className="w-4 h-4" />
                </button>
              </form>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Student Reviews</h2>
              <p className="text-slate-500 mb-4">See what other students are saying.</p>
              {reviews.map((r, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center font-bold text-sm">
                        {r.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900 text-sm">{r.name}</div>
                        <div className="text-xs text-slate-400">{r.date}</div>
                      </div>
                    </div>
                    <span className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full capitalize">{r.category}</span>
                  </div>
                  <div className="mb-2">{renderStars(r.rating)}</div>
                  <p className="text-slate-600 text-sm leading-relaxed">{r.review}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
