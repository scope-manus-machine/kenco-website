import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "wouter";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-secondary/5 via-primary/5 to-background py-20 md:py-32">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-secondary mb-6">
                Effective Infection Control
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8">
                We partner with infection control and procurement leaders to deliver solutions that are clinically effective, operationally efficient, and financially sound.
              </p>
              <Button asChild size="lg" className="text-lg px-8">
                <Link href="/contact">Get Connected</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 bg-background">
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-secondary mb-12">
              Our Services
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Endurocide */}
              <Card className="border-2 hover:border-primary transition-colors">
                <CardHeader>
                  <div className="w-full h-24 flex items-center mb-4">
                    <img src="/endurocide-logo.jpg" alt="Endurocide" className="h-20 w-auto object-contain" />
                  </div>
                  <CardTitle className="text-secondary">Endurocide®</CardTitle>
                  <CardDescription className="text-base font-medium">
                    Antimicrobial & Sporicidal Curtains
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Disposable hospital curtains effective against spores, bacteria, mycobacteria and fungi.
                  </p>
                </CardContent>
              </Card>

              {/* ShadeCare */}
              <Card className="border-2 hover:border-primary transition-colors">
                <CardHeader>
                  <div className="w-full h-24 flex items-center mb-4">
                    <img src="/shadecare-logo.png" alt="ShadeCare" className="h-20 w-auto object-contain" />
                  </div>
                  <CardTitle className="text-secondary">ShadeCare</CardTitle>
                  <CardDescription className="text-base font-medium">
                    Vertical & Roller Blinds
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Full range of window furnishings that protect and enhance the healing environment and patient well-being.
                  </p>
                </CardContent>
              </Card>

              {/* Installations */}
              <Card className="border-2 hover:border-primary transition-colors">
                <CardHeader>
                  <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <CardTitle className="text-secondary">Installations</CardTitle>
                  <CardDescription className="text-base font-medium">
                    Country Wide
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Installation can be arranged for all major town and city centres.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Our Commitment Section */}
        <section className="py-20 bg-muted/30">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center text-secondary mb-8">
                Our Commitment
              </h2>
              <Card className="border-2 border-primary/20">
                <CardContent className="p-8">
                  <p className="text-lg text-center text-muted-foreground leading-relaxed">
                    "We partner with Infection Control and Procurement leaders to deliver solutions that are clinically effective, operationally efficient, and financially sound. Endurocide® curtains can reduce curtain-related costs by eliminating laundering and reducing change frequency."
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-secondary text-secondary-foreground">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Get Started?
              </h2>
              <p className="text-lg mb-8 opacity-90">
                Contact us today to learn more about our infection control solutions.
              </p>
              <Button asChild size="lg" variant="outline" className="bg-background text-secondary hover:bg-background/90">
                <Link href="/contact">Get Connected</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
