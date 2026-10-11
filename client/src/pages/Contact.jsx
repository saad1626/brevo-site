// pages/Contact.jsx

import { Mail, Phone } from "lucide-react";
import { useSettings } from "../context/SettingsContext";
import usePageTitle from "../hooks/usePageTitle";
import PageHero from "../components/PageHero";
import SectionHeading from "../components/SectionHeading";
import ImageBox from "../components/ImageBox";
import IconItem from "../components/IconItem";
import ContactForm from "../components/ContactForm";
import SocialLinks from "../components/SocialLinks";

function Contact() {
  const { settings } = useSettings();
  usePageTitle("Contact");

  return (
    <>
      <PageHero title={"Brevo email marketing support: contact " + settings.siteName}>
        <p>
          Looking for help with Brevo email campaigns, automation workflows, CRM, SMS marketing or
          deliverability? You are in the right place to grow your business.
        </p>
      </PageHero>

      <section className="section">
        <div className="container two-columns">
          <div>
            <SectionHeading label="How can we help?" title="Brevo email marketing support for growing businesses" />
            <p>
              Our Brevo specialists are ready to support you at every step. We take the time to understand
              your goals, find your key challenges and review your current marketing. Then we create a clear
              plan to help you grow with confidence.
            </p>
          </div>

          <div>
            <div className="contact-list contact-list-row">
              <IconItem icon={Mail} title="Email us">
                <a href={"mailto:" + settings.email}>{settings.email}</a>
              </IconItem>

              <IconItem icon={Phone} title="Call us">
                <a href={"tel:" + settings.phone}>{settings.phone}</a>
              </IconItem>
            </div>

            <ImageBox src="/images/contact.jpg" alt="Laptop showing a strategy map" className="wide-image" />
          </div>
        </div>
      </section>

      <section className="section section-light">
        <div className="container two-columns">
          <div>
            <SectionHeading label="Why choose us?" title="Book your free Brevo email marketing consultation" />
            <p>
              We go beyond advice to deliver data-driven strategies that help you convert more customers and
              build lasting loyalty. In your consultation we review your current marketing and create a clear,
              step-by-step plan using Brevo email marketing, automation and CRM.
            </p>

            <div className="social-row">
              <strong>Our social media:</strong>
              <SocialLinks />
            </div>
          </div>

          <div className="white-box">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}

export default Contact;
