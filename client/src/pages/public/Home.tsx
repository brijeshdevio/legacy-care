import { motion } from "motion/react";
import {
  Shield,
  Heart,
  Lock,
  Users,
  Clock,
  FileText,
  CheckCircle2,
  Sparkles,
  BookOpen,
  Globe,
  DollarSign,
  Edit3,
  UserPlus,
  LayoutDashboard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function App() {
  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 pt-20 pb-32 md:grid-cols-2 md:pt-32 md:pb-48">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="space-y-8"
        >
          <motion.h1
            variants={fadeIn}
            className="font-serif text-5xl leading-[1.1] font-bold text-primary md:text-7xl"
          >
            Plan your final wishes with dignity and clarity.
          </motion.h1>
          <motion.p
            variants={fadeIn}
            className="max-w-lg text-xl leading-relaxed text-muted-foreground"
          >
            Ensure your family is never burdened with uncertainty during
            difficult times. A sanctuary for thoughtful end-of-life
            documentation.
          </motion.p>
          <motion.div variants={fadeIn} className="flex flex-wrap gap-4">
            <Button size="lg" className="h-14 rounded-full px-8 text-lg">
              Create Your Plan
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-14 rounded-full border-primary/20 bg-primary/5 px-8 text-lg"
            >
              Explore How It Works
            </Button>
          </motion.div>
          <motion.div
            variants={fadeIn}
            className="flex items-center gap-6 text-xs font-medium tracking-widest text-muted-foreground/60 uppercase"
          >
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Secure & Private
            </div>
            <div className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              Culturally Respectful
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Easy to update anytime
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-2xl"
        >
          <img
            src="https://images.unsplash.com/photo-1516414447565-b14be0adf13e?q=80&w=1973&auto=format&fit=crop"
            alt="Person writing in a journal"
            className="h-full w-full object-cover"
            referrerPolicy="no-referrer"
          />
        </motion.div>
      </section>

      {/* Why planning matters */}
      <section className="bg-muted/30 px-6 py-24">
        <div className="mx-auto max-w-7xl space-y-16 text-center">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-serif text-4xl font-bold text-primary/80 md:text-5xl"
          >
            Why planning matters
          </motion.h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Heart,
                title: "Emotional Stress",
                desc: "Families often face overwhelming grief paired with intense decision-making pressure.",
              },
              {
                icon: FileText,
                title: "No Instructions",
                desc: "Without a clear path, vital documents and specific final wishes go entirely missing.",
              },
              {
                icon: Globe,
                title: "Rituals Missed",
                desc: "Deeply personal cultural or religious requirements can be overlooked in the rush.",
              },
              {
                icon: Shield,
                title: "Last-minute Risks",
                desc: "Urgent financial and logistical choices lead to higher costs and regretful outcomes.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="h-full border-none text-left shadow-sm transition-shadow hover:shadow-md">
                  <CardContent className="space-y-4 p-8">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <item.icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-serif text-xl font-bold">
                      {item.title}
                    </h3>
                    <p className="leading-relaxed text-muted-foreground">
                      {item.desc}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="mx-auto max-w-7xl px-6 py-32">
        <div className="grid items-center gap-24 lg:grid-cols-2">
          <div className="space-y-8">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="font-serif text-4xl leading-tight font-bold text-primary md:text-6xl"
            >
              A simple, respectful solution designed for peace of mind.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg leading-relaxed text-muted-foreground"
            >
              We provide the structure and guidance to document everything from
              funeral preferences to digital asset access, safely stored until
              needed.
            </motion.p>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  icon: BookOpen,
                  title: "Funeral Plan",
                  desc: "Comprehensive guidance on ceremony style, music, and eulogy preferences.",
                  color: "bg-primary/5",
                },
                {
                  icon: Sparkles,
                  title: "Ritual Choice",
                  desc: "Document specific cultural, religious, or secular rituals with precision.",
                  color: "bg-muted",
                },
                {
                  icon: Lock,
                  title: "Secure Storage",
                  desc: "Vault for wills, insurance papers, and digital legacy instructions.",
                  color: "bg-primary text-primary-foreground",
                },
                {
                  icon: UserPlus,
                  title: "Nominee Access",
                  desc: "Designate trusted individuals who will receive access only when it's necessary.",
                  color: "bg-muted",
                },
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className={`border-none ${feature.color} h-full`}>
                    <CardContent className="space-y-4 p-8">
                      <feature.icon className="h-8 w-8" />
                      <h3 className="font-serif text-xl font-bold">
                        {feature.title}
                      </h3>
                      <p className="text-sm leading-relaxed opacity-80">
                        {feature.desc}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative aspect-square overflow-hidden rounded-[3rem] shadow-2xl"
          >
            <img
              src="https://images.unsplash.com/photo-1490127252417-7c393f993ee4?q=80&w=2070&auto=format&fit=crop"
              alt="Peaceful nature scene"
              className="h-full w-full object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>
      </section>

      {/* The Journey Section */}
      <section className="bg-muted/20 px-6 py-32">
        <div className="mx-auto max-w-4xl space-y-20">
          <div className="space-y-4 text-center">
            <h2 className="font-serif text-4xl font-bold text-primary/80 md:text-5xl">
              The Journey to Clarity
            </h2>
          </div>

          <div className="relative space-y-12">
            <div className="absolute top-0 bottom-0 left-6 hidden w-px bg-primary/10 md:block" />

            {[
              {
                step: "01",
                title: "Create Account",
                desc: "Start your private profile. Your information is encrypted from the moment you sign up, ensuring total privacy.",
              },
              {
                step: "02",
                title: "Set Preferences",
                desc: "Use our guided prompts to define your ritual choices, burial or cremation wishes, and ceremony details.",
              },
              {
                step: "03",
                title: "Services & Nominees",
                desc: "Select verified providers and assign 'Legacy Nominees' who will carry out your plan in the future.",
              },
              {
                step: "04",
                title: "Finalize & Secure",
                desc: "Review your plan and lock it in. You can return anytime to make changes as your life and wishes evolve.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative flex items-start gap-8"
              >
                <div className="z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary font-serif text-lg font-bold text-primary-foreground">
                  {i + 1}
                </div>
                <div className="space-y-2 pt-2">
                  <h3 className="font-serif text-2xl font-bold text-primary">
                    {item.title}
                  </h3>
                  <p className="max-w-xl leading-relaxed text-muted-foreground">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Details Grid */}
      <section className="mx-auto max-w-7xl px-6 py-32">
        <div className="space-y-16 text-center">
          <h2 className="font-serif text-4xl font-bold text-primary/80 md:text-5xl">
            Every detail, handled with care
          </h2>

          <div className="grid gap-12 text-left md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Edit3,
                title: "Ritual Customization",
                desc: "Tailor every moment to your beliefs, from religious liturgy to modern celebrations of life.",
              },
              {
                icon: CheckCircle2,
                title: "Verified Providers",
                desc: "Connect with funeral homes and services that meet our strict standards for empathy and ethics.",
              },
              {
                icon: Shield,
                title: "Bank-Grade Storage",
                desc: "Your documents are protected by AES-256 encryption, the same standard used by global banks.",
              },
              {
                icon: Users,
                title: "Nominee Access",
                desc: "Smart triggers ensure your plan is released only to the right people at the right time.",
              },
              {
                icon: DollarSign,
                title: "Budget Clarity",
                desc: "Avoid hidden costs with clear price estimates for your chosen services and rituals.",
              },
              {
                icon: LayoutDashboard,
                title: "Editable Anytime",
                desc: "Life changes. Your plan can too. Update your instructions instantly from any device.",
              },
            ].map((detail, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="space-y-4"
              >
                <div className="text-primary">
                  <detail.icon className="h-6 w-6" />
                </div>
                <h3 className="font-serif text-xl font-bold">{detail.title}</h3>
                <p className="leading-relaxed text-muted-foreground">
                  {detail.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Audience Cards */}
      <section className="bg-muted/10 px-6 py-32">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3">
          {[
            {
              title: "For The Planner",
              items: [
                "Authentically own your final narrative.",
                "Peace of mind knowing you're prepared.",
                "Financial protection for your estate.",
              ],
            },
            {
              title: "For Families",
              items: [
                "Relief from decision fatigue during grief.",
                "Clear roadmap for honoring rituals.",
                "Instant access to vital documents.",
              ],
            },
            {
              title: "For Providers",
              items: [
                "Detailed client briefs for better service.",
                "Streamlined coordination with families.",
                "Pre-verified ritual and cultural needs.",
              ],
            },
          ].map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="h-full border-none shadow-sm">
                <CardContent className="space-y-8 p-10">
                  <h3 className="font-serif text-2xl font-bold text-primary/70">
                    {card.title}
                  </h3>
                  <ul className="space-y-4">
                    {card.items.map((item, j) => (
                      <li
                        key={j}
                        className="flex gap-3 leading-relaxed text-muted-foreground"
                      >
                        <div className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Trust Section */}
      <section className="mx-auto max-w-4xl space-y-12 px-6 py-32 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 rounded-full bg-primary/5 px-4 py-2 text-xs font-bold tracking-widest text-primary uppercase"
        >
          <Lock className="h-3 w-3" />
          Trust & Security
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-serif text-4xl font-bold text-primary md:text-5xl"
        >
          Built with care and privacy
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-xl leading-relaxed text-muted-foreground"
        >
          We believe your final wishes are sacred. LegacyCare employs
          zero-knowledge architecture, meaning only you and your designated
          nominees can ever view your plan. Our systems are audited annually for
          the highest standards of data protection.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-8 text-xs font-bold tracking-[0.2em] text-muted-foreground/40 uppercase"
        >
          <span>HIPAA Compliant</span>
          <span>SOC2 Type II</span>
          <span>AES-256 Encrypted</span>
        </motion.div>
      </section>

      {/* Final CTA */}
      <section className="px-6 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative mx-auto max-w-7xl space-y-12 overflow-hidden rounded-[3rem] bg-primary p-12 text-center text-primary-foreground shadow-2xl md:p-24"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent)]" />

          <div className="relative z-10 space-y-6">
            <h2 className="font-serif text-5xl leading-tight font-bold md:text-7xl">
              Give your family peace, not confusion.
            </h2>
            <p className="mx-auto max-w-2xl text-xl leading-relaxed opacity-80">
              Take the first step toward a more thoughtful tomorrow. It only
              takes a few minutes to start a legacy of care.
            </p>
          </div>

          <div className="relative z-10 space-y-6">
            <Button
              size="lg"
              variant="secondary"
              className="h-16 rounded-full px-12 text-xl font-bold"
            >
              Start Planning Now
            </Button>
            <p className="text-sm opacity-60">
              Free to start — Complete in ~10 mins
            </p>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
