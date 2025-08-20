"use client"

import { useState, useEffect } from "react"

export function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const targetDate = new Date("2026-01-18T07:00:00").getTime()

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

  return (
    <section className="py-16 bg-gradient-to-r from-blue-900 to-blue-800 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">CONTAGEM REGRESSIVA</h2>
        <div className="w-20 h-1 bg-red-500 mx-auto mb-12"></div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <div className="text-4xl md:text-5xl font-bold text-red-400 mb-2">
              {timeLeft.days.toString().padStart(2, "0")}
            </div>
            <div className="text-sm uppercase tracking-wide">Dias</div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <div className="text-4xl md:text-5xl font-bold text-red-400 mb-2">
              {timeLeft.hours.toString().padStart(2, "0")}
            </div>
            <div className="text-sm uppercase tracking-wide">Horas</div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <div className="text-4xl md:text-5xl font-bold text-red-400 mb-2">
              {timeLeft.minutes.toString().padStart(2, "0")}
            </div>
            <div className="text-sm uppercase tracking-wide">Minutos</div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <div className="text-4xl md:text-5xl font-bold text-red-400 mb-2">
              {timeLeft.seconds.toString().padStart(2, "0")}
            </div>
            <div className="text-sm uppercase tracking-wide">Segundos</div>
          </div>
        </div>

        <div className="mt-8">
          <p className="text-xl font-semibold">Não perca tempo! Vagas limitadas!</p>
        </div>
      </div>
    </section>
  )
}
