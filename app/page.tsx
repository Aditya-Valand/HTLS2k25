"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { Calendar, Clock, MapPin, Users, Sparkles, Music, Zap, Star } from "lucide-react"

export default function EventPage() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [isFormSubmitted, setIsFormSubmitted] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const { scrollYProgress } = useScroll()
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "200%"])

  useEffect(() => {
    const targetDate = new Date("2025-09-06T15:00:00").getTime()

    const timer = setInterval(() => {
      const now = new Date().getTime()
      const difference = targetDate - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsFormSubmitted(true)
  }

  const ParticleBackground = () => (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-yellow-400 rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: 0,
          }}
          animate={{
            y: [null, -100, window.innerHeight + 100],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  )

  const FloatingElements = () => (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute top-20 left-10 text-yellow-400 opacity-20"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 10, -10, 0],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        <Music size={40} />
      </motion.div>
      <motion.div
        className="absolute top-40 right-20 text-yellow-400 opacity-20"
        animate={{
          y: [0, 20, 0],
          rotate: [0, -10, 10, 0],
        }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 1,
        }}
      >
        <Sparkles size={35} />
      </motion.div>
      <motion.div
        className="absolute bottom-40 left-20 text-yellow-400 opacity-20"
        animate={{
          y: [0, -15, 0],
          rotate: [0, 15, -15, 0],
        }}
        transition={{
          duration: 5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 2,
        }}
      >
        <Zap size={30} />
      </motion.div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-x-hidden">
      <ParticleBackground />
      <FloatingElements />

      {/* Cursor Glow Effect */}
      <motion.div
        className="fixed w-6 h-6 bg-yellow-400 rounded-full pointer-events-none z-50 mix-blend-difference"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
        }}
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 0.3,
          repeat: Number.POSITIVE_INFINITY,
        }}
      />

      {/* Navigation */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-40 backdrop-blur-xl bg-black/20 border-b border-yellow-400/20"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <motion.div
            className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent"
            whileHover={{ scale: 1.1 }}
          >
            GECR
          </motion.div>
          <div className="hidden md:flex space-x-8">
            {["Details", "Venue", "FAQ"].map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="hover:text-yellow-400 transition-colors relative"
                whileHover={{ y: -2 }}
              >
                {item}
                <motion.div
                  className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-400"
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
          </div>
          <motion.a
            href="#tickets"
            className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold py-2 px-6 rounded-full shadow-lg shadow-yellow-400/25"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 30px rgba(255, 215, 0, 0.5)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            Get Tickets
          </motion.a>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-4 relative">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 via-transparent to-yellow-600/10"
          style={{ y: backgroundY }}
        />

        <motion.div
          className="z-10"
          style={{ y: textY }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.div className="mb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            <span className="text-xl md:text-2xl text-yellow-400 font-light tracking-wider">GECR Presents</span>
          </motion.div>

          <motion.h1
            className="text-6xl md:text-8xl lg:text-9xl font-black bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent leading-tight"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            <motion.span
              animate={{
                textShadow: [
                  "0 0 20px rgba(255, 215, 0, 0.5)",
                  "0 0 40px rgba(255, 215, 0, 0.8)",
                  "0 0 20px rgba(255, 215, 0, 0.5)",
                ],
              }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              Hungama
            </motion.span>
            <br />
            <motion.span
              className="text-4xl md:text-6xl lg:text-7xl"
              animate={{ rotate: [0, 1, -1, 0] }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
            >
              x The Last Submission
            </motion.span>
          </motion.h1>

          <motion.h2
            className="text-3xl md:text-5xl font-bold mt-4 text-yellow-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            2025
          </motion.h2>

          <motion.p
            className="mt-8 text-lg md:text-2xl max-w-4xl mx-auto font-light text-gray-300"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
          >
            The biggest event in the history of the College. A night of epic celebration for every student of GECR.
          </motion.p>

          <motion.div
            className="mt-12"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2 }}
          >
            <motion.a
              href="#tickets"
              className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black text-xl font-bold py-4 px-10 rounded-full shadow-2xl shadow-yellow-400/30 inline-flex items-center gap-3"
              whileHover={{
                scale: 1.1,
                boxShadow: "0 0 50px rgba(255, 215, 0, 0.6)",
              }}
              whileTap={{ scale: 0.95 }}
              animate={{
                boxShadow: [
                  "0 0 20px rgba(255, 215, 0, 0.3)",
                  "0 0 40px rgba(255, 215, 0, 0.6)",
                  "0 0 20px rgba(255, 215, 0, 0.3)",
                ],
              }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              <Star className="animate-spin" />
              Book Your Spot - ₹500
            </motion.a>
          </motion.div>
        </motion.div>
      </section>

      {/* Countdown Section */}
      <motion.section
        className="py-20 bg-gradient-to-r from-gray-900/50 to-black/50 backdrop-blur-xl"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto text-center px-4">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-yellow-400 mb-8"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            The Party Starts In
          </motion.h2>

          <div className="flex justify-center space-x-4 md:space-x-8 mt-8">
            {Object.entries(timeLeft).map(([unit, value], index) => (
              <motion.div
                key={unit}
                className="text-center"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <motion.div
                  className="text-5xl md:text-7xl font-black bg-gradient-to-b from-yellow-400 to-yellow-600 bg-clip-text text-transparent"
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: index * 0.2,
                  }}
                >
                  {String(value).padStart(2, "0")}
                </motion.div>
                <div className="text-sm md:text-lg mt-2 uppercase tracking-widest text-gray-400">{unit}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Details Section */}
      <motion.section
        id="details"
        className="py-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
              Event Essentials
            </h2>
            <p className="mt-6 text-xl text-gray-300 max-w-3xl mx-auto">
              All the key information you need to join the celebration
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Calendar, title: "Date", value: "September 6, 2025", delay: 0 },
              { icon: Clock, title: "Time", value: "3:00 PM - 10:00 PM", delay: 0.1 },
              { icon: Users, title: "Ticket Price", value: "₹500 Per Person", delay: 0.2 },
              { icon: Sparkles, title: "Dress Code", value: "Dress to Impress", delay: 0.3 },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="backdrop-blur-xl bg-white/5 border border-yellow-400/20 p-8 rounded-3xl text-center group hover:bg-yellow-400/10 transition-all duration-300"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: item.delay }}
                viewport={{ once: true }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(255, 215, 0, 0.2)",
                }}
              >
                <motion.div
                  className="text-yellow-400 mb-6 flex justify-center"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <item.icon size={48} />
                </motion.div>
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-yellow-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xl text-gray-300">{item.value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Venue Section */}
      <motion.section
        id="venue"
        className="py-20 bg-gradient-to-r from-gray-900/50 to-black/50 backdrop-blur-xl"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
              The Location
            </h2>
            <p className="mt-6 text-xl text-gray-300 max-w-3xl mx-auto">
              A spectacular venue for our historic celebration
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-4xl font-bold text-yellow-400 mb-6 flex items-center gap-3">
                <MapPin className="animate-bounce" />
                Arjun Party Plot
              </h3>
              <p className="text-xl mb-4 text-gray-300">
                📍 Near Sunshine Group Of Institutions, Kalavad Road, Rajkot, Gujarat 360005
              </p>
              <p className="text-gray-400 text-lg leading-relaxed">
                An expansive and beautiful outdoor lawn ready to be transformed into our party paradise. With ample
                space for dancing, dining, and making memories.
              </p>
            </motion.div>

            <motion.div
              className="h-96 rounded-3xl overflow-hidden border-2 border-yellow-400/30 shadow-2xl shadow-yellow-400/20"
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.821190451878!2d70.74087531548238!3d22.28482098533168!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3959cb3a53468f5d%3A0x6824332322655b3!2sArjun%20Party%20Plot!5e0!3m2!1sen!2sin!4v1659186915152!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Tickets Section */}
      <motion.section
        id="tickets"
        className="py-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4 max-w-2xl">
          <motion.div
            className="text-center mb-16"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
              Secure Your Ticket
            </h2>
            <p className="mt-6 text-xl text-gray-300">Don't miss out on the event of a lifetime!</p>
          </motion.div>

          <AnimatePresence mode="wait">
            {!isFormSubmitted ? (
              <motion.div
                key="form"
                className="backdrop-blur-xl bg-white/5 border border-yellow-400/20 p-8 rounded-3xl"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.input
                      type="text"
                      placeholder="Full Name"
                      required
                      className="w-full bg-black/50 border border-yellow-400/30 rounded-xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
                      whileFocus={{ scale: 1.02 }}
                    />
                    <motion.input
                      type="email"
                      placeholder="Email Address"
                      required
                      className="w-full bg-black/50 border border-yellow-400/30 rounded-xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
                      whileFocus={{ scale: 1.02 }}
                    />
                  </div>
                  <motion.select
                    required
                    className="w-full bg-black/50 border border-yellow-400/30 rounded-xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
                    whileFocus={{ scale: 1.02 }}
                  >
                    <option value="" disabled>
                      Select Your Department
                    </option>
                    <option>Computer Engineering</option>
                    <option>Mechanical Engineering</option>
                    <option>Civil Engineering</option>
                    <option>Electrical Engineering</option>
                    <option>Electronics & Communication</option>
                    <option>Other</option>
                  </motion.select>
                  <motion.button
                    type="submit"
                    className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-black text-xl font-bold py-4 px-10 rounded-xl shadow-2xl shadow-yellow-400/30"
                    whileHover={{
                      scale: 1.02,
                      boxShadow: "0 0 50px rgba(255, 215, 0, 0.6)",
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Proceed to Pay ₹500
                  </motion.button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="confirmation"
                className="text-center backdrop-blur-xl bg-white/5 border border-yellow-400/20 p-12 rounded-3xl"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                <motion.div
                  className="text-8xl mb-6"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  🎉
                </motion.div>
                <h3 className="text-4xl font-bold text-yellow-400 mb-6">Thank You!</h3>
                <p className="text-xl text-gray-300">
                  Your booking is confirmed. A ticket with a unique QR code has been sent to your email address. See you
                  at the party!
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.section>

      {/* FAQ Section */}
      <motion.section
        id="faq"
        className="py-20 bg-gradient-to-r from-gray-900/50 to-black/50 backdrop-blur-xl"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            className="text-center mb-16"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
              Got Questions?
            </h2>
            <p className="mt-6 text-xl text-gray-300">We've got all the answers you need</p>
          </motion.div>

          <div className="space-y-4">
            {[
              {
                question: "Is this event open to students from other colleges?",
                answer:
                  "This event is exclusively for the students of all departments of Government Engineering College, Rajkot (GECR). A valid college ID may be required for entry.",
              },
              {
                question: "What does the ticket price include?",
                answer:
                  "The ₹500 ticket price includes entry to the event, access to all performances and DJ sets, and a selection of unlimited food and soft drinks.",
              },
              {
                question: "Can I buy tickets at the venue?",
                answer:
                  "Tickets are available online only and are expected to sell out quickly. We highly recommend booking your ticket in advance through this website to guarantee your spot.",
              },
              {
                question: "Is there parking available at the venue?",
                answer:
                  "Yes, Arjun Party Plot has ample parking space available for both two-wheelers and four-wheelers. However, we encourage carpooling to save fuel and space.",
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                className="backdrop-blur-xl bg-white/5 border border-yellow-400/20 rounded-2xl overflow-hidden"
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <motion.button
                  className="w-full flex justify-between items-center text-left p-6 hover:bg-yellow-400/5 transition-colors"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  whileHover={{ x: 10 }}
                >
                  <span className="text-xl font-bold text-white">{faq.question}</span>
                  <motion.span
                    className="text-3xl text-yellow-400 font-thin"
                    animate={{ rotate: openFaq === index ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    +
                  </motion.span>
                </motion.button>
                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 text-gray-300 text-lg">{faq.answer}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="py-16 text-center border-t border-yellow-400/20">
        <div className="container mx-auto px-4">
          <motion.p
            className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Hungama x The Last Submission 2025
          </motion.p>
          <p className="text-gray-400 text-lg">An initiative by the students of GECR</p>
          <motion.p
            className="mt-4 text-sm text-gray-500"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            Crafted with passion by the innovators of GECR ✨
          </motion.p>
        </div>
      </footer>
    </div>
  )
}
