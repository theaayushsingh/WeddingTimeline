'use client'

import { useState, useEffect } from 'react'
import { Heart, Calendar, Clock, PartyPopper } from 'lucide-react'

export default function ModernWeddingCountdown() {
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [currentEvent, setCurrentEvent] = useState('')
  const [isCelebrationDay, setIsCelebrationDay] = useState(false)

  const events = [
    { name: 'Tilak Ceremony', date: new Date('2024-11-21T00:00:00') },
    { name: 'Wedding', date: new Date('2024-11-27T00:00:00') },
    { name: 'Reception', date: new Date('2024-11-28T00:00:00') }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      const todayEvent = events.find(event => 
        event.date.toDateString() === now.toDateString()
      )

      if (todayEvent) {
        setCurrentEvent(todayEvent.name)
        setIsCelebrationDay(true)
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }

      const nextEvent = events.find(event => event.date > now)

      if (!nextEvent) {
        setCurrentEvent('All events have passed!')
        setIsCelebrationDay(false)
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }

      setCurrentEvent(nextEvent.name)
      setIsCelebrationDay(false)

      const timeRemaining = nextEvent.date.getTime() - now.getTime()
      const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24))
      const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000)

      setCountdown({ days, hours, minutes, seconds })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 p-4">
      <div className="relative w-full max-w-2xl">
        {/* Decorative elements */}
        <div className="absolute -top-10 -left-10 w-20 h-20 bg-pink-500 rounded-full opacity-10 animate-pulse"></div>
        <div className="absolute -bottom-10 -right-10 w-20 h-20 bg-blue-500 rounded-full opacity-10 animate-pulse delay-300"></div>
        
        {/* Main card */}
        <div className="backdrop-blur-lg bg-white bg-opacity-10 rounded-3xl p-8 shadow-2xl border border-white border-opacity-10 overflow-hidden">
          <div className="relative z-10">
            {isCelebrationDay ? (
              <>
                <h1 className="text-4xl font-bold mb-6 text-pink-100 text-center">
                  <span className="block text-2xl mb-2 text-indigo-200">Today is the</span>
                  {currentEvent}
                </h1>
                <div className="text-center mb-8">
                  <PartyPopper className="inline-block text-yellow-300 animate-bounce" size={48} />
                  <p className="text-2xl text-red-400 mt-4">Congratulations and best wishes! 😊</p>
                  <p className='text-xl text-white mt-4'>Don't forget to click tons of picture and video.</p>
                </div>
                <div className="flex justify-center space-x-4">
                  <Heart className="text-pink-300 animate-pulse" size={24} />
                  <Calendar className="text-indigo-300" size={24} />
                  <Clock className="text-blue-300" size={24} />
                </div>
              </>
            ) : (
              <>
                <h1 className='text-4xl font-bold mb-6 text-pink-400 text-center'>Ayush & Khushboo</h1>
                <h1 className="text-4xl font-bold mb-6 text-pink-100 text-center">
                  <span className="block text-2xl mb-2 text-indigo-200">Countdown to</span>
                  {currentEvent}
                </h1>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  {Object.entries(countdown).map(([unit, value]) => (
                    <div key={unit} className="text-center">
                      <div className="text-5xl font-bold text-orange-400 mb-2">{value}</div>
                      <div className="text-sm uppercase tracking-wide text-indigo-200 opacity-80">{unit}</div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-center space-x-4">
                  <Heart className="text-pink-300 animate-pulse" size={24} />
                  <Calendar className="text-indigo-300" size={24} />
                  <Clock className="text-blue-300" size={24} />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}