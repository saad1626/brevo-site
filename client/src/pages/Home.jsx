// pages/Home.jsx
// The home page. It is built from small components.
// Repeated content (cards, bullet points) is kept in arrays,
// and we use .map() to turn each item into a component.

import { Users, FileText, Gift, Mail, Phone } from "lucide-react";
import { useSettings } from "../context/SettingsContext";
import usePageTitle from "../hooks/usePageTitle";
import Button from "../components/Button";
import SectionHeading from "../components/SectionHeading";
import ImageBox from "../components/ImageBox";
import FeatureCard from "../components/FeatureCard";
import BulletPoint from "../components/BulletPoint";
import IconItem from "../components/IconItem";
import Stars from "../components/Stars";

// ---------- Content ----------

const featureCards = [
  {
    image: "/images/feature-1.jpg",
    title: "Build your list with Brevo",
    text: "Grow your audience with simple signup forms, pop-ups and landing pages, then turn everyday visitors into loyal subscribers who care about your brand."
  },
  {
    image: "/images/feature-2.jpg",
    title: "Build better campaigns with the drag-and-drop editor",
    text: "Create professional emails with the drag-and-drop editor, ready-made designs or your own HTML. Every campaign is built to get more opens and clicks."
  },
  {
    image: "/images/feature-3.jpg",
    title: "Master your automation with Brevo workflows",
    text: "Set up welcome series, follow-ups and personalised messages once, and let Brevo send them to the right person at the right moment."
  }
];

const beginnerPoints = [
  {
    title: "Made for anyone ready to grow",
    text: "No experience needed. You get beginner-friendly tools, templates, automations and ready-made workflows."
  },
  {
    title: "Manage campaigns from any device",
    text: "Open your dashboard, create campaigns and check results from your computer, tablet or phone."
  },
  {
    title: "Start with a free plan and all-in-one tools",
    text: "Email, automation, CRM, SMS, WhatsApp and transactional email in one place, with a generous free plan."
  }
];

const platformFeatures = [
  {
    title: "High-converting signup forms and pop-ups",
    text: "Collect new subscribers on your website with the form builder and pop-ups."
  },
  {
    title: "Automated customer journeys",
    text: "Welcome series, abandoned cart flows and re-engagement campaigns that run on autopilot."
  },
  {
    title: "Email analytics and A/B testing",
    text: "See opens, clicks and revenue in real time, and test subject lines to find what works."
  },
  {
    title: "AI subject line and content help",
    text: "Get instant suggestions for subject lines, preheaders and email text."
  },
  {
    title: "Integrations for webinars, quizzes and referrals",
    text: "Connect your favourite tools so list-building happens in one place."
  },
  {
    title: "Drag-and-drop editor with proven templates",
    text: "Build polished emails in minutes with no design or coding skills."
  }
];

// ---------- Page ----------

function Home() {
  const { settings } = useSettings();
  usePageTitle("Home");

  return (
    <>
      {/* 1. Hero */}
      <section className="section section-light">
        <div className="container two-columns">
          <div>
            <h1 className="hero-title">
              Scaling your vision: why Brevo email marketing is the smarter path to growth
            </h1>

            <p>
              Marketing often feels like shouting in a crowded room. You have something great to offer,
              but between technical words and constant hustle, it is easy to feel lost.
            </p>

            <p>
              That is why we focus on <strong>Brevo email marketing</strong>. It connects your ideas
              and your audience, without needing a degree in computer science.
            </p>

            <div className="hero-features">
              <div>
                <h3>Beginner-friendly and powerful</h3>
                <p>Use the drag-and-drop editor, ready templates and personalisation to launch your first campaign in minutes.</p>
                <Button to="/contact">Get started now</Button>
              </div>

              <div>
                <h3>100% cloud-based freedom</h3>
                <p>Manage contact lists and track results from anywhere: your desk or a coffee shop.</p>
                <Button to="/about" variant="dark">More detail</Button>
              </div>
            </div>
          </div>

          <ImageBox src="/images/hero.jpg" alt="Laptop showing an email automation workflow" className="tall-image" />
        </div>
      </section>

      {/* 2. Three feature cards */}
      <section className="section">
        <div className="container">
          <SectionHeading
            center
            label="Master your growth with Brevo"
            title="Use Brevo to scale your email marketing and unlock real business results"
          />

          <p className="center-text narrow">
            Whether you run a small brand, an online shop, a SaaS startup or you are a creator,
            Brevo gives you everything you need to grow your list and your revenue.
          </p>

          <div className="three-columns">
            {featureCards.map(function (card) {
              return (
                <FeatureCard key={card.title} image={card.image} title={card.title} text={card.text} />
              );
            })}
          </div>

          <div className="center-text">
            <Button to="/blog">Scale growth with Brevo automation</Button>
          </div>
        </div>
      </section>

      {/* 3. Designed for beginners */}
      <section className="section section-light">
        <div className="container two-columns">
          <div>
            <SectionHeading label="Everything you need to succeed" title="Brevo is designed for beginners and growth-focused marketers" />

            <p>
              Brevo goes beyond basic email marketing. It gives you contact segmentation, automated email
              sequences, A/B testing, a built-in CRM and messages on email, SMS, WhatsApp and web push.
            </p>

            <p>
              The automation builder makes welcome series, abandoned cart reminders and win-back campaigns
              easy, without writing any code. Whether you are new or an expert, you can launch campaigns
              that bring real results.
            </p>

            <Button to="/about" variant="dark">More info</Button>
          </div>

          <div className="bullet-list">
            {beginnerPoints.map(function (point) {
              return <BulletPoint key={point.title} title={point.title} text={point.text} />;
            })}
          </div>
        </div>
      </section>

      {/* 4. Most powerful channel + 3 stats */}
      <section className="section">
        <div className="container">
          <div className="two-columns">
            <ImageBox src="/images/growth.jpg" alt="Laptop showing a campaign success chart" className="wide-image" />

            <div>
              <SectionHeading label="What will you achieve with Brevo?" title="Email marketing is your most powerful channel for growth" />
              <p>
                Your email list is the most valuable audience you own. With Brevo email marketing you can turn
                subscribers into loyal customers and steady revenue, with simple tools for emails that get
                opened, clicked and read.
              </p>
            </div>
          </div>

          <div className="three-columns stats-row">
            <IconItem icon={Users} title="Brevo">
              Over <strong>300,000+ businesses</strong> use Brevo every day to grow.
            </IconItem>

            <IconItem icon={FileText} title="Ready-to-use tools">
              Pre-built automation workflows, signup forms and proven templates.
            </IconItem>

            <IconItem icon={Gift} title="Free plan to start">
              Regular updates, live training and beginner tools at no extra cost.
            </IconItem>
          </div>
        </div>
      </section>

      {/* 5. Dark section: platform includes */}
      <section className="section section-dark">
        <div className="container">
          <SectionHeading label="Powered by Brevo's expert-built platform" title="The Brevo platform includes" />

          <div className="two-columns bullet-grid">
            {platformFeatures.map(function (feature) {
              return <BulletPoint key={feature.title} title={feature.title} text={feature.text} />;
            })}
          </div>
        </div>
      </section>

      {/* 6. Pricing + testimonial */}
      <section className="section">
        <div className="container two-columns">
          <div className="pricing-image-wrap">
            <ImageBox src="/images/pricing.jpg" alt="Phone showing the Starter plan" className="tall-image" />

            <figure className="testimonial">
              <Stars />
              <blockquote>
                "Brevo made email marketing incredibly simple for my business. The templates, automations and
                analytics helped us grow engagement and sales faster than expected."
              </blockquote>
              <figcaption>Jennifer Hawk</figcaption>
            </figure>
          </div>

          <div>
            <SectionHeading label="Starter plan" title="Ideal for growing businesses" />
            <Stars />
            <p className="price">$9</p>

            <p>
              Send up to 5,000 emails without daily limits, remove Brevo branding and track your results
              with built-in analytics. Get round-the-clock help, flexible templates and an easy visual editor.
            </p>

            <p>
              Reach more people with WhatsApp and SMS, and build automated campaigns that run while you sleep.
            </p>

            <Button to="/contact">Get started</Button>
          </div>
        </div>
      </section>

      {/* 7. Final call to action. Email and phone come from the dashboard. */}
      <section className="section section-light">
        <div className="container two-columns">
          <div>
            <SectionHeading label="Ready to boost your ROI with Brevo?" title="Get started with Brevo today" />
            <p>
              Automate your workflows, grow your audience and boost sales with Brevo email marketing.
              Join over 300,000 businesses using Brevo for email, automation, CRM, SMS and more.
            </p>
            <p>Have a question? Read our blog or contact our team any time.</p>
          </div>

          <div className="contact-list">
            <IconItem icon={Mail} title="Email us">
              <a href={"mailto:" + settings.email}>{settings.email}</a>
            </IconItem>

            <IconItem icon={Mail} title="Support">
              <a href={"mailto:" + settings.supportEmail}>{settings.supportEmail}</a>
            </IconItem>

            <IconItem icon={Phone} title="Call us">
              <a href={"tel:" + settings.phone}>{settings.phone}</a>
            </IconItem>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
