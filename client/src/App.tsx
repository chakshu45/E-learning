import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Chatbot from './components/Chatbot'
import PageTransition from './components/PageTransition'

// Pages (to be moved to src/pages)
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Courses from './pages/Courses'
import CourseDetail from './pages/CourseDetail'
import CoursePlay from './pages/CoursePlay'
import Practice from './pages/Practice'
import PracticeArena from './pages/PracticeArena'
import PracticeResults from './pages/PracticeResults'
import Subjects from './pages/Subjects'
import SubjectDetail from './pages/SubjectDetail'
import MockCheckout from './pages/MockCheckout'
import PaymentSuccess from './pages/PaymentSuccess'
import Admin from './pages/Admin'

function App() {
  const location = useLocation()

  return (
    <div className="antialiased font-sans">
      <Navbar />
      <main className="pt-16 min-h-screen">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageTransition><Home /></PageTransition>} />
            <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
            <Route path="/register" element={<PageTransition><Register /></PageTransition>} />
            <Route path="/dashboard" element={<PageTransition><Dashboard /></PageTransition>} />
            <Route path="/courses" element={<PageTransition><Courses /></PageTransition>} />
            <Route path="/courses/:id" element={<PageTransition><CourseDetail /></PageTransition>} />
            <Route path="/courses/:id/play" element={<PageTransition><CoursePlay /></PageTransition>} />
            <Route path="/courses/:id/certificate" element={<PageTransition><Dashboard /></PageTransition>} /> {/* Placeholder or dedicated page if exists */}
            <Route path="/practice" element={<PageTransition><Practice /></PageTransition>} />
            <Route path="/practice/arena" element={<PageTransition><PracticeArena /></PageTransition>} />
            <Route path="/practice/results/:id" element={<PageTransition><PracticeResults /></PageTransition>} />
            <Route path="/subjects" element={<PageTransition><Subjects /></PageTransition>} />
            <Route path="/subjects/:id" element={<PageTransition><SubjectDetail /></PageTransition>} />
            <Route path="/payment/mock-checkout" element={<PageTransition><MockCheckout /></PageTransition>} />
            <Route path="/payment/success" element={<PageTransition><PaymentSuccess /></PageTransition>} />
            <Route path="/admin" element={<PageTransition><Admin /></PageTransition>} />
          </Routes>
        </AnimatePresence>
      </main>
      <Chatbot />
      <footer className="bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-500 dark:text-slate-400">
          <p>© {new Date().getFullYear()} LearnWithSky. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
