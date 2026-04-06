"use client"

import { FadeInUp } from "@/components/motion"
import { 
  Users, 
  UserCircle2, 
  Calendar, 
  CheckCircle2, 
  ArrowRight,
  TrendingUp,
  Target,
  FlameKindling
} from "lucide-react"

const services = [
  {
    id: "individual",
    icon: UserCircle2,
    title: "1:1 Health Coaching",
    description: "Personalized support to help you build a healthy lifestyle by sharing a meal plan, charting your health goals, and helping you stay motivated.",
    features: [
      "Custom whole-food meal plans",
      "Bi-weekly private check-ins",
      "Personalized goal tracking (SalvereTraker)",
      "Daily motivation and guidance",
      "Root-cause analysis of symptoms"
    ],
    color: "bg-[var(--vital-mint)]",
    iconColor: "text-[var(--vital-green)]",
    level: "Individual Focus"
  },
  {
    id: "corporate",
    icon: Users,
    title: "Corporate Wellness Programs",
    description: "Structured programs designed to help teams perform at their best without burning out, boosting both productivity and company culture.",
    features: [
      "Executive health audits",
      "Team productivity workshops",
      "Burnout prevention strategies",
      "Sustainable performance systems",
      "Custom reporting for leadership"
    ],
    color: "bg-[#1C1917]/5",
    iconColor: "text-[#1C1917]",
    level: "Organizational Focus"
  },
  {
    id: "open-house",
    icon: Calendar,
    title: "The Salvere Open House",
    description: "A monthly, practical, and relaxed session for professionals looking to improve their health and performance sustainably within a community.",
    features: [
      "Live Q&A with specialists",
      "Community health discussions",
      "Practical health workshops",
      "Networking with like-minds",
      "Exclusive resource access"
    ],
    color: "bg-[var(--vital-green)]/10",
    iconColor: "text-[var(--vital-green)]",
    level: "Monthly Sessions"
  }
]

export function ServicesGrid() {
  return (
    <section className="py-24 lg:py-32 bg-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {services.map((service, index) => (
            <FadeInUp key={service.id} delay={0.1 + index * 0.1}>
              <div className="group relative flex flex-col h-full rounded-[3rem] p-10 bg-[#F9FAFB] border border-transparent hover:border-[var(--vital-green)]/10 hover:shadow-2xl hover:bg-white transition-all duration-500">
                <div className={`mb-10 flex h-20 w-20 items-center justify-center rounded-3xl ${service.color} ${service.iconColor} shadow-sm group-hover:scale-110 transition-transform duration-500`}>
                  <service.icon className="h-10 w-10" />
                </div>
                
                <div className="mb-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#A8A29E]">
                  <span className="h-1 w-1 rounded-full bg-[var(--vital-green)]" />
                  {service.level}
                </div>
                
                <h3 className="font-serif text-3xl font-medium tracking-tight text-[#1C1917] mb-6">
                  {service.title}
                </h3>
                
                <p className="text-[#57534E] text-lg leading-relaxed font-light mb-10 flex-grow">
                  {service.description}
                </p>
                
                <div className="space-y-4 mb-12">
                  {service.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-[var(--vital-green)] shrink-0 mt-0.5" />
                      <span className="text-sm font-medium text-[#1C1917]">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <button className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[var(--vital-green)] hover:translate-x-1 transition-transform">
                  Learn More
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </FadeInUp>
          ))}
        </div>

        {/* Process Visual */}
        <div className="mt-40 border-t border-[#E7E5E4] pt-32">
          <FadeInUp>
            <div className="text-center mb-24">
              <h2 className="font-serif text-4xl font-medium tracking-tight text-[#1C1917] sm:text-5xl">
                Our Proven Pathway to <span className="text-[var(--vital-green)]">Vitality.</span>
              </h2>
              <p className="mt-4 text-xl text-[#57534E] max-w-2xl mx-auto font-light">
                We believe in systems over shortcuts. Here is how we guide you through the Salvere restoration model.
              </p>
            </div>
          </FadeInUp>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-center lg:px-24">
            <ProcessItem icon={Target} step="01" title="Assessment" desc="Identify root-cause imbalances and metabolic needs." />
            <ProcessItem icon={TrendingUp} step="02" title="Plan" desc="Receive a high-impact nutrition and lifestyle protocol." />
            <ProcessItem icon={FlameKindling} step="03" title="Support" desc="Ongoing expert coaching to ensure consistency." />
            <ProcessItem icon={CheckCircle2} step="04" title="Results" desc="Move from surviving to peak performance." />
          </div>
        </div>
      </div>
    </section>
  )
}

function ProcessItem({ step, title, desc, icon: Icon }: { step: string; title: string, desc: string, icon: any }) {
  return (
    <FadeInUp>
      <div className="group">
        <div className="relative mb-12 inline-flex h-24 w-24 items-center justify-center rounded-[2.5rem] bg-white border border-[#E7E5E4] shadow-sm group-hover:border-[var(--vital-green)] transition-all duration-500">
          <Icon className="h-10 w-10 text-[var(--vital-green)]" />
          <div className="absolute -bottom-4 bg-[#1C1917] text-white px-3 py-1 rounded-full text-xs font-bold tracking-widest">
            STEP {step}
          </div>
        </div>
        <h4 className="text-xl font-bold text-[#1C1917] mb-3">{title}</h4>
        <p className="text-[#57534E] text-sm leading-relaxed">{desc}</p>
      </div>
    </FadeInUp>
  )
}
