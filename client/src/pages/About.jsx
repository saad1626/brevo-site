// pages/About.jsx

import { Link } from "react-router-dom";
import { useSettings } from "../context/SettingsContext";
import usePageTitle from "../hooks/usePageTitle";
import PageHero from "../components/PageHero";
import SectionHeading from "../components/SectionHeading";
import ImageBox from "../components/ImageBox";
import SubscribeForm from "../components/SubscribeForm";

function About() {
  const { settings } = useSettings();
  usePageTitle("About");

  return (
    <>
      <PageHero title={"Brevo email marketing: why " + settings.siteName + " trusts it"}>
        <p>
          We are your partner for simple, clear and practical digital marketing guidance. We help you
          understand what really works and how to grow your business with tools like Brevo.
        </p>
        <p>Let's build your next stage of growth together.</p>
      </PageHero>

      <section className="section">
        <div className="container two-columns">
          <div>
            <SectionHeading label="About us" title="Who will you grow with?" />

            <p>
              <strong>Here is how we help businesses succeed:</strong> choosing the right marketing partner
              makes all the difference. Our mission is simple: honest insights and practical strategies
              built around trusted tools like Brevo.
            </p>

            <p>
              Brevo is trusted by over <strong>500,000 businesses worldwide</strong>. It combines email
              marketing, SMS and WhatsApp messaging, automation, CRM and transactional email in one place.
            </p>

            <blockquote className="quote">
              "Switching to Brevo transformed our engagement. Email interactions jumped by 40%, and
              automation saved our team nearly 20 hours a week."
            </blockquote>

            <p>
              We work with entrepreneurs, small businesses, online stores, SaaS companies, creators and
              agencies. We test tools carefully before we recommend them, and we explain everything simply.
              No jargon. No confusion.
            </p>
          </div>

          <div>
            <ImageBox src="/images/about.jpg" alt="Tablet showing a strategic roadmap" className="tall-image" />

            <h3 className="sub-title">Why we rely on Brevo email marketing tools</h3>
            <p>
              Brevo combines email marketing, automation, CRM and transactional messages in a single
              dashboard. It lets businesses grow while keeping high deliverability, personalisation and
              clear performance tracking.
            </p>
          </div>
        </div>
      </section>

      <section className="section section-dark">
        <div className="container two-columns">
          <div>
            <h2>Our mission</h2>
            <p>
              At {settings.siteName}, our mission is to close the gap between powerful email automation and
              ambitious businesses that want to grow without feeling overwhelmed.
            </p>
            <p>
              Whether you are exploring Brevo's automation, CRM or multichannel messaging, we break
              everything down in a practical, beginner-friendly way, while staying ethical, compliant
              and privacy-first. Have a question? <Link to="/contact">Contact us</Link>.
            </p>
          </div>

          <div className="white-box">
            <SubscribeForm />
          </div>
        </div>
      </section>
    </>
  );
}

export default About;
