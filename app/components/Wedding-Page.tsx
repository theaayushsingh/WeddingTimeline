'use client'

import { useState, useEffect, useRef } from 'react'
import { Heart, Calendar, Clock, PartyPopper } from 'lucide-react'
import { events, theme } from './wedding-config'

type Event = typeof events[number];

function EventTimeline() {
  return (
    <div className="mt-12 p-6 backdrop-blur-lg bg-white bg-opacity-10 rounded-3xl shadow-2xl border border-white border-opacity-10 w-full max-w-2xl">
      <h2 className="text-3xl font-bold mb-6 text-center text-pink-100">Event Timeline</h2>
      <div className="space-y-4">
        {events.map((event, index) => (
          <div key={index} className={`flex items-center p-3 rounded-lg ${theme[event.theme].primary}`}>
            <div className={`w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-full ${theme[event.theme].secondary} mr-4`}>
              <span className={`text-lg font-bold ${theme[event.theme].text}`}>{index + 1}</span>
            </div>
            <div>
              <h3 className={`font-semibold ${theme[event.theme].text}`}>{event.name}</h3>
              <p className={`text-sm ${theme[event.theme].text}`}>{event.date.toDateString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function ModernWeddingCountdown() {
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null)
  const [nextEvent, setNextEvent] = useState<Event | null>(null)
  const [isCelebrationDay, setIsCelebrationDay] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const intervalRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    const updateCountdown = () => {
      try {
        const now = new Date()
        // console.log('Current date:', now.toISOString())
        // console.log('Events:', events)

        const todayEvent = events.find(event => 
          event.date.toDateString() === now.toDateString()
        )

        if (todayEvent) {
          // console.log('Today is an event day:', todayEvent.name)
          setCurrentEvent(todayEvent)
          setIsCelebrationDay(true)
          const nextEventIndex = events.findIndex(e => e.name === todayEvent.name) + 1
          setNextEvent(nextEventIndex < events.length ? events[nextEventIndex] : null)
          return
        }

        const next = events.find(event => event.date > now)

        if (!next) {
          // console.log('All events have passed')
          setCurrentEvent(events[events.length - 1])
          setNextEvent(null)
          setIsCelebrationDay(false)
          setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 })
          return
        }

        // console.log('Next event:', next.name, 'on', next.date.toISOString())
        setCurrentEvent(next)
        const nextEventIndex = events.indexOf(next) + 1
        setNextEvent(nextEventIndex < events.length ? events[nextEventIndex] : null)
        setIsCelebrationDay(false)

        const timeRemaining = next.date.getTime() - now.getTime()
        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24))
        const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000)

        setCountdown({ days, hours, minutes, seconds })
        // console.log('Countdown updated:', { days, hours, minutes, seconds })
      } catch (err) {
        // console.error('Error updating countdown:', err)
        setError('An error occurred while updating the countdown. Please refresh the page.')
      }
    }

    updateCountdown()
    intervalRef.current = setInterval(updateCountdown, 1000)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  const currentTheme = currentEvent ? theme[currentEvent.theme] : theme.default

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-100 text-red-800 p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Error</h1>
          <p>{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-4 ${currentTheme.background}`}>
      <h1 className="text-5xl font-bold mb-8 text-center">
        <span className={currentTheme.text}>Ayush</span> <span className={currentTheme.accent}>&</span> <span className={currentTheme.text}>Khushboo</span>
      </h1>
      <div className="relative w-full max-w-2xl">
        {/* Decorative elements */}
        <div className={`absolute -top-10 -left-10 w-20 h-20 ${currentTheme.decorPrimary} rounded-full opacity-10 animate-pulse`}></div>
        <div className={`absolute -bottom-10 -right-10 w-20 h-20 ${currentTheme.decorSecondary} rounded-full opacity-10 animate-pulse delay-300`}></div>
        
        {/* Main card */}
        <div className={`backdrop-blur-lg ${currentTheme.cardBackground} rounded-3xl p-8 shadow-2xl border ${currentTheme.cardBorder} border-opacity-10 overflow-hidden`}>
          <div className="relative z-10">
            {currentEvent && (
              isCelebrationDay ? (
                <>
                  <h2 className={`text-4xl font-bold mb-6 ${currentTheme.headingText} text-center`}>
                    <span className={`block text-2xl mb-2 ${currentTheme.subHeadingText}`}>Today is the</span>
                    {currentEvent.name}
                  </h2>
                  <div className="text-center mb-8">
                    <PartyPopper className={`inline-block ${currentTheme.accent} animate-bounce`} size={48} />
                    <p className={`text-2xl ${currentTheme.text} mt-4`}>Congratulations and best wishes!</p>
                  </div>
                  {nextEvent && (
                    <div className={`mt-8 p-4 ${currentTheme.cardBackground} rounded-lg`}>
                      <h3 className={`text-xl font-semibold ${currentTheme.subHeadingText} mb-2`}>Next Event:</h3>
                      <p className={currentTheme.text}>{nextEvent.name} on {nextEvent.date.toDateString()}</p>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <h2 className={`text-4xl font-bold mb-6 ${currentTheme.headingText} text-center`}>
                    <span className={`block text-2xl mb-2 ${currentTheme.subHeadingText}`}>Countdown to</span>
                    {currentEvent.name}
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {Object.entries(countdown).map(([unit, value]) => (
                      <div key={unit} className="text-center">
                        <div className={`text-5xl font-bold ${currentTheme.text} mb-2`}>{value}</div>
                        <div className={`text-sm uppercase tracking-wide ${currentTheme.subHeadingText} opacity-80`}>{unit}</div>
                      </div>
                    ))}
                  </div>
                </>
              )
            )}
            <div className="flex justify-center space-x-4">
              <Heart className={`${currentTheme.accent} animate-pulse`} size={24} />
              <Calendar className={currentTheme.icon} size={24} />
              <Clock className={currentTheme.icon} size={24} />
            </div>
          </div>
        </div>
      </div>
      <EventTimeline />
    </div>
  )
}