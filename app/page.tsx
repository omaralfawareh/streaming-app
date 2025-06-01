import Link from "next/link";
import { AwsIvsLogo } from "../components/AwsIvsLogo";

export default function HomeSuspense() {
  return (
    <div className="pt-14 xl:pt-10 bg-background text-foreground">
      {/* Hero Section */}
      <div className="relative flex flex-col items-center justify-center h-full px-4">
        {/* Main Content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto w-full">
          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold mb-4 md:mb-6 leading-tight">
            Live Stream
            <br />
            Broadcasting
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-8 md:mb-12 px-4">
            Low latency streaming powered by AWS IVS
          </p>

          {/* Streaming Flow */}
          <div className="relative mb-8 md:mb-12">
            <div className="flex items-center justify-center gap-2 sm:gap-4 md:gap-8 lg:gap-16 px-4">
              {/* Step 1: Broadcaster */}
              <div className="flex flex-col items-center flex-shrink-0">
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 border-2 border-foreground rounded-full flex items-center justify-center mb-2 md:mb-4">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 bg-foreground rounded-full"></div>
                </div>
                <span className="text-xs sm:text-sm font-medium whitespace-nowrap">
                  Broadcaster
                </span>
              </div>

              {/* Arrow 1 */}
              <div className="flex flex-col items-center flex-shrink-0">
                <div className="flex items-center mb-2 md:mb-4">
                  <div className="w-4 sm:w-6 md:w-12 lg:w-16 h-0.5 bg-foreground"></div>
                  <div className="w-0 h-0 border-l-[6px] sm:border-l-[8px] border-l-foreground border-y-[3px] sm:border-y-[4px] border-y-transparent"></div>
                </div>
                <div className="text-xs text-muted-foreground whitespace-nowrap">
                  RTMPS
                </div>
              </div>

              {/* Step 2: AWS IVS */}
              <div className="flex flex-col items-center flex-shrink-0">
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 flex items-center justify-center mb-2 md:mb-4">
                  <AwsIvsLogo />
                </div>
                <span className="text-xs sm:text-sm font-medium whitespace-nowrap">
                  AWS IVS
                </span>
              </div>

              {/* Arrow 2 */}
              <div className="flex flex-col items-center flex-shrink-0">
                <div className="flex items-center mb-2 md:mb-4">
                  <div className="w-4 sm:w-6 md:w-12 lg:w-16 h-0.5 bg-foreground"></div>
                  <div className="w-0 h-0 border-l-[6px] sm:border-l-[8px] border-l-foreground border-y-[3px] sm:border-y-[4px] border-y-transparent"></div>
                </div>
                <div className="text-xs text-muted-foreground whitespace-nowrap">
                  Low Latency
                </div>
              </div>

              {/* Step 3: Viewers */}
              <div className="flex flex-col items-center flex-shrink-0">
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 border-2 border-foreground rounded-full flex items-center justify-center mb-2 md:mb-4">
                  <div className="flex gap-0.5 sm:gap-1">
                    <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 bg-foreground rounded-full"></div>
                    <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 bg-foreground rounded-full"></div>
                  </div>
                </div>
                <span className="text-xs sm:text-sm font-medium whitespace-nowrap">
                  Viewers
                </span>
              </div>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8 px-4 md:px-0">
            <div className="bg-card border border-border rounded-lg p-4 md:p-6">
              <h3 className="font-semibold text-base md:text-lg mb-2 text-card-foreground">
                Low Latency
              </h3>
              <p className="text-muted-foreground text-sm">
                Stream with under 5 seconds latency
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-4 md:p-6">
              <h3 className="font-semibold text-base md:text-lg mb-2 text-card-foreground">
                Global Scale
              </h3>
              <p className="text-muted-foreground text-sm">
                Worldwide reach with AWS infrastructure
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-4 md:p-6">
              <h3 className="font-semibold text-base md:text-lg mb-2 text-card-foreground">
                Secure
              </h3>
              <p className="text-muted-foreground text-sm">
                Enterprise-grade security
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="px-4 flex justify-center">
            <Link
              href="/stream"
              className="bg-primary text-primary-foreground font-semibold py-3 px-6 md:py-4 md:px-8 rounded-lg text-base md:text-lg hover:bg-primary/90 transition-colors w-full sm:w-auto"
            >
              Start Broadcasting
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
