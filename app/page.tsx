import { Hero } from "@/components/hero"
import { EventInfo } from "@/components/event-info"
import { Countdown } from "@/components/countdown"
import { LocationMap } from "@/components/location-map"
import { RegistrationForm } from "@/components/registration-form"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Hero />
      <EventInfo />
      <LocationMap />
      <Countdown />
      <RegistrationForm />
      <Footer />
    </div>
  )
}
