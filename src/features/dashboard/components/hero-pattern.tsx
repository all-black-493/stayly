import { ShootingStars } from "@/components/ui/shooting-stars"
import { StarsBackground } from "@/components/ui/stars-background"

export function HeroPattern() {
  return (
    <div className="pointer-events-none absolute inset-0 hidden overflow-hidden lg:block bg-background">

      {/* shooting meteors */}
      <ShootingStars starColor="#2EBB48" trailColor="#22D3EE" minDelay={1500} maxDelay={4000} />
      <ShootingStars starColor="#86EFAC" trailColor="#38BDF8" minDelay={2500} maxDelay={5000} />

      {/* twinkling starfield */}
      <StarsBackground
        starDensity={0.00018}
        allStarsTwinkle
        twinkleProbability={0.9}
        minTwinkleSpeed={0.4}
        maxTwinkleSpeed={1}
      />

    </div>
  )
}