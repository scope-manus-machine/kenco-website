import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "wouter";

export default function Services() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-gradient-to-br from-secondary/5 via-primary/5 to-background py-16">
          <div className="container">
            <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-4">Our Services</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Comprehensive infection control solutions for healthcare facilities across New Zealand.
            </p>
          </div>
        </section>

        {/* Endurocide Section */}
        <section className="py-16">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="mb-6">
                  <img src="/endurocide-logo.jpg" alt="Endurocide" className="h-24 w-auto object-contain" />
                </div>
                <h2 className="text-3xl font-bold text-secondary mb-4">Endurocide®</h2>
                <p className="text-xl text-primary font-semibold mb-4">Antimicrobial & Sporicidal Curtains</p>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Disposable hospital curtains effective against spores, bacteria, mycobacteria and fungi. Our Endurocide® curtains provide superior infection control while reducing operational costs by eliminating laundering requirements and reducing change frequency.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-muted-foreground">Effective against a broad spectrum of pathogens</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-muted-foreground">Eliminates laundering costs and logistics</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-muted-foreground">Reduces change frequency requirements</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-muted-foreground">Clinically proven infection control solution</span>
                  </li>
                </ul>
                <div className="flex gap-4">
                  <Button asChild>
                    <Link href="/contact">Learn More</Link>
                  </Button>
                  <Button asChild variant="outline">
                    <a href="https://endurocide.nz" target="_blank" rel="noopener noreferrer">
                      Visit Endurocide NZ
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </Button>
                </div>
              </div>
              <Card className="border-2 overflow-hidden">
                <CardContent className="p-0">
                  <img src="/endurocide-curtain.jpg" alt="Endurocide antimicrobial curtains in healthcare setting" className="w-full h-full object-cover" />
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* ShadeCare Section */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <Card className="border-2 order-2 lg:order-1 overflow-hidden">
                <CardContent className="p-0">
                  <img src="/shadecare-blind.jpg" alt="ShadeCare roller blinds in hospital patient room" className="w-full h-full object-cover" />
                </CardContent>
              </Card>
              <div className="order-1 lg:order-2">
                <div className="mb-6">
                  <img src="/shadecare-logo.png" alt="ShadeCare" className="h-24 w-auto object-contain" />
                </div>
                <h2 className="text-3xl font-bold text-secondary mb-4">ShadeCare</h2>
                <p className="text-xl text-primary font-semibold mb-4">Vertical & Roller Blinds</p>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Full range of window furnishings that protect and enhance the healing environment and patient well-being. Our ShadeCare solutions provide privacy, light control, and aesthetic enhancement for healthcare facilities.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-muted-foreground">Wide range of styles and materials</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-muted-foreground">Enhanced patient privacy and comfort</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-muted-foreground">Easy to clean and maintain</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-muted-foreground">Supports healing environment standards</span>
                  </li>
                </ul>
                <Button asChild>
                  <Link href="/contact">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Installations Section */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="mb-6">
                <img src="/installations-icon.png" alt="Installations" className="h-24 w-auto object-contain" />
              </div>
              <h2 className="text-3xl font-bold text-secondary mb-4">Professional Installation Services</h2>
              <p className="text-xl text-primary font-semibold mb-6">Country Wide Coverage</p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Installation can be arranged for all major town and city centres across New Zealand. Our experienced team ensures professional installation with minimal disruption to your facility operations.
              </p>
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-secondary">Installation Benefits</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                    <div className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <div>
                        <p className="font-semibold text-secondary">Professional Service</p>
                        <p className="text-sm text-muted-foreground">Experienced installation teams</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <div>
                        <p className="font-semibold text-secondary">Minimal Disruption</p>
                        <p className="text-sm text-muted-foreground">Efficient installation process</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <div>
                        <p className="font-semibold text-secondary">Nationwide Coverage</p>
                        <p className="text-sm text-muted-foreground">All major centres serviced</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <div>
                        <p className="font-semibold text-secondary">Quality Assurance</p>
                        <p className="text-sm text-muted-foreground">Guaranteed workmanship</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <div className="mt-8">
                <Button asChild size="lg">
                  <Link href="/contact">Request Installation</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
