"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { MapPin, Sparkles, Music, Star, Trophy, Camera, Mic, Heart, Gift, Crown, Flame } from "lucide-react"

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
      {[...Array(100)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: 0,
          }}
          animate={{
            y: [null, -100, window.innerHeight + 100],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 4 + 3,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 3,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )

  const FloatingElements = () => (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute top-20 left-10 text-yellow-400 opacity-30"
        animate={{
          y: [0, -30, 0],
          rotate: [0, 15, -15, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        <Music size={50} />
      </motion.div>
      <motion.div
        className="absolute top-40 right-20 text-orange-400 opacity-30"
        animate={{
          y: [0, 25, 0],
          rotate: [0, -20, 20, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 1,
        }}
      >
        <Flame size={45} />
      </motion.div>
      <motion.div
        className="absolute bottom-40 left-20 text-pink-400 opacity-30"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 25, -25, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 2,
        }}
      >
        <Crown size={40} />
      </motion.div>
      <motion.div
        className="absolute top-1/2 right-10 text-purple-400 opacity-30"
        animate={{
          y: [0, -35, 0],
          rotate: [0, 30, -30, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 7,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 0.5,
        }}
      >
        <Trophy size={55} />
      </motion.div>
    </div>
  )

  const activities = [
    {
      icon: Crown,
      title: "Ramp Walk",
      description: "Strut your style on the runway and showcase your fashion sense",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Heart,
      title: "Truth & Dare",
      description: "Classic game with exciting challenges and hilarious truths",
      color: "from-red-500 to-rose-500",
    },
    {
      icon: Mic,
      title: "Karaoke Night",
      description: "Sing your heart out with friends and show off your vocal skills",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Trophy,
      title: "Dance Battle",
      description: "Epic dance-offs with amazing prizes for the best performers",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Camera,
      title: "Photo Booth",
      description: "Capture memories with fun props and instant photo prints",
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: Gift,
      title: "Lucky Draw",
      description: "Win exciting prizes and surprises throughout the night",
      color: "from-indigo-500 to-purple-500",
    },
  ]

  const sponsors = [
    { name: "TechCorp", logo: "/placeholder.svg?height=80&width=120&text=TechCorp" },
    { name: "FoodieHub", logo: "/placeholder.svg?height=80&width=120&text=FoodieHub" },
    { name: "StyleZone", logo: "/placeholder.svg?height=80&width=120&text=StyleZone" },
    { name: "MusicBox", logo: "/placeholder.svg?height=80&width=120&text=MusicBox" },
    { name: "EventPro", logo: "/placeholder.svg?height=80&width=120&text=EventPro" },
    { name: "PhotoMagic", logo: "/placeholder.svg?height=80&width=120&text=PhotoMagic" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-x-hidden">
      <ParticleBackground />
      <FloatingElements />

      {/* Smooth Cursor Glow Effect */}
      <motion.div
        className="fixed w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full pointer-events-none z-50 mix-blend-screen opacity-80"
        style={{
          left: mousePosition.x - 16,
          top: mousePosition.y - 16,
        }}
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      {/* Navigation */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-40 backdrop-blur-xl bg-black/30 border-b border-yellow-400/30"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <motion.div
            className="text-3xl font-black bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent"
            whileHover={{ scale: 1.1, rotate: 2 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            GECR
          </motion.div>
          <div className="hidden md:flex space-x-8">
            {["Activities", "Venue", "Sponsors", "FAQ"].map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="hover:text-yellow-400 transition-all duration-300 relative font-medium"
                whileHover={{ y: -3, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                {item}
                <motion.div
                  className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-orange-500"
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
          </div>
          <motion.a
            href="#tickets"
            className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-black font-bold py-3 px-8 rounded-full shadow-lg shadow-yellow-400/30"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 40px rgba(255, 215, 0, 0.6)",
              rotate: 1,
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Get Tickets
          </motion.a>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-4 relative">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 via-orange-500/10 to-red-500/10"
          style={{ y: backgroundY }}
        />

        <motion.div
          className="z-10"
          style={{ y: textY }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.div className="mb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            <span className="text-2xl md:text-3xl text-transparent bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text font-bold tracking-wider">
              GECR Presents
            </span>
          </motion.div>

          <motion.h1
            className="text-7xl md:text-9xl lg:text-[12rem] font-black leading-tight"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.7, ease: "easeOut" }}
          >
            <motion.span
              className="block bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              style={{ backgroundSize: "200% 200%" }}
            >
              Hungama
            </motion.span>
            <motion.span
              className="block text-5xl md:text-7xl lg:text-8xl bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500 bg-clip-text text-transparent mt-2"
              animate={{
                rotate: [0, 1, -1, 0],
                scale: [1, 1.02, 1],
              }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
            >
              x The Last Submission
            </motion.span>
          </motion.h1>

          <motion.h2
            className="text-4xl md:text-6xl font-bold mt-6 bg-gradient-to-r from-yellow-300 via-orange-400 to-red-400 bg-clip-text text-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            2K25
          </motion.h2>

          <motion.p
            className="mt-8 text-xl md:text-2xl max-w-4xl mx-auto font-light text-gray-300 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
          >
            The most epic celebration in GECR history! A night of unforgettable memories, crazy activities, and pure fun
            for every student.
          </motion.p>

          <motion.div
            className="mt-12 flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2 }}
          >
            <motion.a
              href="#tickets"
              className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-black text-xl font-bold py-5 px-12 rounded-full shadow-2xl shadow-yellow-400/40 inline-flex items-center gap-3"
              whileHover={{
                scale: 1.1,
                boxShadow: "0 0 60px rgba(255, 215, 0, 0.8)",
                rotate: 2,
              }}
              whileTap={{ scale: 0.95 }}
              animate={{
                boxShadow: [
                  "0 0 30px rgba(255, 215, 0, 0.4)",
                  "0 0 50px rgba(255, 215, 0, 0.7)",
                  "0 0 30px rgba(255, 215, 0, 0.4)",
                ],
              }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              <Star className="animate-spin" />
              Book Your Spot - ₹500
            </motion.a>

            <motion.a
              href="#activities"
              className="border-2 border-yellow-400 text-yellow-400 text-xl font-bold py-5 px-12 rounded-full hover:bg-yellow-400 hover:text-black transition-all duration-300 inline-flex items-center gap-3"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 30px rgba(255, 215, 0, 0.5)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Sparkles />
              Explore Activities
            </motion.a>
          </motion.div>
        </motion.div>
      </section>

      {/* Countdown Section */}
      <motion.section
        className="py-20 bg-gradient-to-r from-gray-900/60 to-black/60 backdrop-blur-xl border-y border-yellow-400/20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto text-center px-4">
          <motion.h2
            className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent mb-12"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            The Party Starts In
          </motion.h2>

          <div className="flex justify-center space-x-6 md:space-x-12 mt-8">
            {Object.entries(timeLeft).map(([unit, value], index) => (
              <motion.div
                key={unit}
                className="text-center"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <motion.div
                  className="text-6xl md:text-8xl font-black bg-gradient-to-b from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent p-4 rounded-2xl border border-yellow-400/30 backdrop-blur-sm"
                  animate={{
                    scale: [1, 1.05, 1],
                    boxShadow: [
                      "0 0 20px rgba(255, 215, 0, 0.3)",
                      "0 0 40px rgba(255, 215, 0, 0.6)",
                      "0 0 20px rgba(255, 215, 0, 0.3)",
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: index * 0.3,
                  }}
                >
                  {String(value).padStart(2, "0")}
                </motion.div>
                <div className="text-lg md:text-xl mt-4 uppercase tracking-widest text-gray-400 font-semibold">
                  {unit}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Activities Section */}
      <motion.section
        id="activities"
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
            <h2 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
              Epic Activities
            </h2>
            <p className="mt-6 text-xl text-gray-300 max-w-3xl mx-auto">
              Get ready for the most exciting activities that will make this night unforgettable!
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activities.map((activity, index) => (
              <motion.div
                key={index}
                className="group relative backdrop-blur-xl bg-white/5 border border-yellow-400/20 p-8 rounded-3xl text-center overflow-hidden"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(255, 215, 0, 0.3)",
                  y: -10,
                }}
              >
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${activity.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                />

                <motion.div
                  className="text-yellow-400 mb-6 flex justify-center relative z-10"
                  whileHover={{
                    rotate: 360,
                    scale: 1.2,
                  }}
                  transition={{ duration: 0.8, type: "spring" }}
                >
                  <activity.icon size={60} />
                </motion.div>

                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-yellow-400 transition-colors relative z-10">
                  {activity.title}
                </h3>

                <p className="text-lg text-gray-300 group-hover:text-white transition-colors relative z-10">
                  {activity.description}
                </p>

                <motion.div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Venue Section */}
      <motion.section
        id="venue"
        className="py-20 bg-gradient-to-r from-gray-900/60 to-black/60 backdrop-blur-xl"
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
            <h2 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
              The Venue
            </h2>
            <p className="mt-6 text-xl text-gray-300 max-w-3xl mx-auto">
              A spectacular location transformed into the ultimate party destination
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-5xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-6 flex items-center gap-4">
                <motion.div
                  animate={{ bounce: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  <MapPin size={50} />
                </motion.div>
                Arjun Party Plot
              </h3>
              <p className="text-xl mb-6 text-gray-300 font-medium">
                📍 Near Sunshine Group Of Institutions, Kalavad Road, Rajkot, Gujarat 360005
              </p>
              <p className="text-gray-400 text-lg leading-relaxed">
                An expansive and beautiful outdoor venue ready to be transformed into our party paradise. With ample
                space for all activities, professional lighting, sound systems, and everything needed for an
                unforgettable night of celebration.
              </p>
            </motion.div>

            <motion.div
              className="h-96 rounded-3xl overflow-hidden border-2 border-yellow-400/40 shadow-2xl shadow-yellow-400/30"
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              whileHover={{
                scale: 1.02,
                boxShadow: "0 0 50px rgba(255, 215, 0, 0.5)",
              }}
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

      {/* Sponsors Section */}
      <motion.section
        id="sponsors"
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
            <h2 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
              Our Sponsors
            </h2>
            <p className="mt-6 text-xl text-gray-300 max-w-3xl mx-auto">
              Special thanks to our amazing sponsors who make this event possible
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {sponsors.map((sponsor, index) => (
              <motion.div
                key={index}
                className="group backdrop-blur-xl bg-white/5 border border-yellow-400/20 p-6 rounded-2xl text-center hover:bg-yellow-400/10 transition-all duration-300"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 30px rgba(255, 215, 0, 0.3)",
                  y: -5,
                }}
              >
                <motion.img
                  src={sponsor.logo}
                  alt={sponsor.name}
                  className="w-full h-16 object-contain mb-4 filter grayscale group-hover:grayscale-0 transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                />
                <p className="text-sm font-medium text-gray-400 group-hover:text-yellow-400 transition-colors">
                  {sponsor.name}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Tickets Section */}
      <motion.section
        id="tickets"
        className="py-20 bg-gradient-to-r from-gray-900/60 to-black/60 backdrop-blur-xl"
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
            <h2 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
              Secure Your Ticket
            </h2>
            <p className="mt-6 text-xl text-gray-300">Don't miss out on the event of a lifetime!</p>
          </motion.div>

          <AnimatePresence mode="wait">
            {!isFormSubmitted ? (
              <motion.div
                key="form"
                className="backdrop-blur-xl bg-white/5 border border-yellow-400/30 p-8 rounded-3xl shadow-2xl"
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
                      className="w-full bg-black/50 border border-yellow-400/40 rounded-xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all text-white placeholder-gray-400"
                      whileFocus={{ scale: 1.02, boxShadow: "0 0 20px rgba(255, 215, 0, 0.3)" }}
                    />
                    <motion.input
                      type="email"
                      placeholder="Email Address"
                      required
                      className="w-full bg-black/50 border border-yellow-400/40 rounded-xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all text-white placeholder-gray-400"
                      whileFocus={{ scale: 1.02, boxShadow: "0 0 20px rgba(255, 215, 0, 0.3)" }}
                    />
                  </div>
                  <motion.select
                    required
                    className="w-full bg-black/50 border border-yellow-400/40 rounded-xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all text-white"
                    whileFocus={{ scale: 1.02, boxShadow: "0 0 20px rgba(255, 215, 0, 0.3)" }}
                  >
                    <option value="" disabled className="bg-black">
                      Select Your Department
                    </option>
                    <option className="bg-black">Computer Engineering</option>
                    <option className="bg-black">Mechanical Engineering</option>
                    <option className="bg-black">Civil Engineering</option>
                    <option className="bg-black">Electrical Engineering</option>
                    <option className="bg-black">Electronics & Communication</option>
                    <option className="bg-black">Other</option>
                  </motion.select>
                  <motion.button
                    type="submit"
                    className="w-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-black text-xl font-bold py-4 px-10 rounded-xl shadow-2xl shadow-yellow-400/40"
                    whileHover={{
                      scale: 1.02,
                      boxShadow: "0 0 60px rgba(255, 215, 0, 0.8)",
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
                className="text-center backdrop-blur-xl bg-white/5 border border-yellow-400/30 p-12 rounded-3xl shadow-2xl"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                <motion.div
                  className="text-8xl mb-6"
                  animate={{
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  🎉
                </motion.div>
                <h3 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-6">
                  Awesome! You're In!
                </h3>
                <p className="text-xl text-gray-300">
                  Your booking is confirmed! A ticket with a unique QR code has been sent to your email. Get ready for
                  the most epic night ever!
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.section>

      {/* FAQ Section */}
      <motion.section
        id="faq"
        className="py-20"
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
            <h2 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
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
                  "The ₹500 ticket price includes entry to the event, access to all activities (ramp walk, truth & dare, karaoke, dance battles, photo booth), unlimited food and soft drinks, and participation in lucky draws.",
              },
              {
                question: "Can I buy tickets at the venue?",
                answer:
                  "Tickets are available online only and are expected to sell out quickly. We highly recommend booking your ticket in advance through this website to guarantee your spot at this epic celebration.",
              },
              {
                question: "What should I wear for the ramp walk?",
                answer:
                  "Dress to impress! Whether it's formal, casual chic, or your own unique style - show off your fashion sense. There will be prizes for the best dressed participants!",
              },
              {
                question: "Are there any prizes for the activities?",
                answer:
                  "We have exciting prizes for winners of dance battles, best dressed in ramp walk, karaoke champions, and surprise gifts through lucky draws throughout the night.",
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
                  className="w-full flex justify-between items-center text-left p-6 hover:bg-yellow-400/10 transition-colors"
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
                      <div className="px-6 pb-6 text-gray-300 text-lg leading-relaxed">{faq.answer}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="py-16 text-center border-t border-yellow-400/30 bg-gradient-to-r from-gray-900/60 to-black/60 backdrop-blur-xl">
        <div className="container mx-auto px-4">
          <motion.p
            className="text-4xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Hungama x The Last Submission 2K25
          </motion.p>
          <p className="text-gray-400 text-lg mb-4">An initiative by the students of GECR</p>
          <motion.p
            className="mt-4 text-sm text-gray-500"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
          >
            Crafted with passion by the innovators of GECR ✨
          </motion.p>
        </div>
      </footer>
    </div>
  )
}
