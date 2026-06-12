"use client";

import { useState } from "react";
import Link from "next/link";

const inputStyle: React.CSSProperties = {
  width: "100%",
  fontFamily: "var(--font-inter, system-ui, sans-serif)",
  fontSize: "0.9375rem",
  padding: "14px 18px",
  borderRadius: "12px",
  border: "1px solid var(--border)",
  background: "#fff",
  color: "var(--ink)",
  outline: "none",
  transition: "border-color 0.2s ease, box-shadow 0.2s ease",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontFamily: "var(--font-inter, system-ui, sans-serif)",
  fontSize: "0.75rem",
  fontWeight: 600,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "var(--ink-muted)",
  marginBottom: "8px",
};

const errorStyle: React.CSSProperties = {
  fontFamily: "var(--font-inter, system-ui, sans-serif)",
  fontSize: "0.75rem",
  color: "#e53e3e",
  marginTop: "6px",
};

function focusIn(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
  e.currentTarget.style.borderColor = "#c46a3a";
  e.currentTarget.style.boxShadow = "0 0 0 3px rgba(196,106,58,0.12)";
}
function focusOut(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
  e.currentTarget.style.borderColor = "var(--border)";
  e.currentTarget.style.boxShadow = "none";
}
function errorFocus(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
  e.currentTarget.style.borderColor = "#e53e3e";
  e.currentTarget.style.boxShadow = "0 0 0 3px rgba(229,62,62,0.12)";
}

interface FormFields {
  name: string;
  email: string;
  org: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

function validateForm(fields: FormFields): FormErrors {
  const errors: FormErrors = {};
  if (!fields.name.trim()) errors.name = "Please enter your name.";
  if (!fields.email.trim()) {
    errors.email = "Please enter your email address.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!fields.subject) errors.subject = "Please select a topic.";
  if (!fields.message.trim()) errors.message = "Please enter your message.";
  else if (fields.message.trim().length < 10) errors.message = "Message must be at least 10 characters.";
  return errors;
}

function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sent">("idle");
  const [fields, setFields] = useState<FormFields>({
    name: "",
    email: "",
    org: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  function handleChange(key: keyof FormFields, value: string) {
    setFields((f) => ({ ...f, [key]: value }));
    // Clear error when user starts typing
    if (errors[key as keyof FormErrors]) {
      setErrors((e) => ({ ...e, [key]: undefined }));
    }
  }

  function handleBlur(key: keyof FormFields) {
    setTouched((t) => ({ ...t, [key]: true }));
    // Validate on blur
    const fieldErrors = validateForm(fields);
    if (fieldErrors[key as keyof FormErrors]) {
      setErrors((e) => ({ ...e, [key]: fieldErrors[key as keyof FormErrors] }));
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const formErrors = validateForm(fields);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setTouched({ name: true, email: true, subject: true, message: true });
      return;
    }
    setStatus("sent");
  }

  if (status === "sent") {
    return (
      <div
        className="rounded-[24px] p-8 sm:p-10"
        style={{
          background: "#fff",
          border: "1px solid var(--border-subtle)",
          boxShadow: "0 2px 8px rgba(0,0,0,0.04), 0 16px 48px rgba(0,0,0,0.06)",
        }}
      >
        <div className="text-center py-12">
          <div
            className="inline-flex items-center justify-center size-16 rounded-full mb-6"
            style={{ background: "rgba(196,106,58,0.10)" }}
          >
            <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#c46a3a" strokeWidth="2" aria-hidden>
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <p className="font-display text-[1.6rem] tracking-tight mb-2" style={{ color: "var(--ink)" }}>Message sent!</p>
          <p className="font-ui text-[0.9375rem] mb-8" style={{ color: "var(--ink-muted)" }}>
            We&apos;ll get back to you within 1–2 business days.
          </p>
          <button
            type="button"
            onClick={() => {
              setStatus("idle");
              setFields({ name: "", email: "", org: "", subject: "", message: "" });
              setErrors({});
              setTouched({});
            }}
            className="font-ui text-sm font-medium transition-opacity hover:opacity-70"
            style={{ color: "var(--copper)" }}
          >
            Send another message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="rounded-[24px] p-8 sm:p-10"
      style={{
        background: "#fff",
        border: "1px solid var(--border-subtle)",
        boxShadow: "0 2px 8px rgba(0,0,0,0.04), 0 16px 48px rgba(0,0,0,0.06)",
      }}
    >
      <h2
        className="font-display font-normal leading-[1.08] tracking-[-0.025em] mb-8"
        style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", color: "var(--ink)" }}
      >
        Send a message
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label style={labelStyle} htmlFor="contact-name">Name *</label>
            <input
              id="contact-name"
              type="text"
              placeholder="Your name"
              value={fields.name}
              onChange={(e) => handleChange("name", e.target.value)}
              onBlur={() => handleBlur("name")}
              style={{
                ...inputStyle,
                borderColor: touched.name && errors.name ? "#e53e3e" : undefined,
              }}
              onFocus={touched.name && errors.name ? errorFocus : focusIn}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
            />
            {touched.name && errors.name && (
              <p id="name-error" style={errorStyle} role="alert">{errors.name}</p>
            )}
          </div>
          <div>
            <label style={labelStyle} htmlFor="contact-email">Email *</label>
            <input
              id="contact-email"
              type="email"
              placeholder="your@email.com"
              value={fields.email}
              onChange={(e) => handleChange("email", e.target.value)}
              onBlur={() => handleBlur("email")}
              style={{
                ...inputStyle,
                borderColor: touched.email && errors.email ? "#e53e3e" : undefined,
              }}
              onFocus={touched.email && errors.email ? errorFocus : focusIn}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {touched.email && errors.email && (
              <p id="email-error" style={errorStyle} role="alert">{errors.email}</p>
            )}
          </div>
        </div>

        <div>
          <label style={labelStyle} htmlFor="contact-org">
            Organisation <span style={{ fontWeight: 400, textTransform: "none", letterSpacing: 0 }}>(optional)</span>
          </label>
          <input
            id="contact-org"
            type="text"
            placeholder="Company or institution"
            value={fields.org}
            onChange={(e) => handleChange("org", e.target.value)}
            style={inputStyle}
            onFocus={focusIn}
            onBlur={focusOut}
          />
        </div>

        <div>
          <label style={labelStyle} htmlFor="contact-subject">Subject *</label>
          <select
            id="contact-subject"
            value={fields.subject}
            onChange={(e) => handleChange("subject", e.target.value)}
            onBlur={() => handleBlur("subject")}
            style={{
              ...inputStyle,
              appearance: "none",
              cursor: "pointer",
              borderColor: touched.subject && errors.subject ? "#e53e3e" : undefined,
            }}
            onFocus={touched.subject && errors.subject ? errorFocus : focusIn}
            aria-invalid={!!errors.subject}
            aria-describedby={errors.subject ? "subject-error" : undefined}
          >
            <option value="">Select a topic</option>
            <option value="order">Order enquiry</option>
            <option value="wholesale">Wholesale / Institutional pricing</option>
            <option value="retail">Retail partnership</option>
            <option value="distribution">Distribution enquiry</option>
            <option value="other">Other</option>
          </select>
          {touched.subject && errors.subject && (
            <p id="subject-error" style={errorStyle} role="alert">{errors.subject}</p>
          )}
        </div>

        <div>
          <label style={labelStyle} htmlFor="contact-message">Message *</label>
          <textarea
            id="contact-message"
            placeholder="How can we help you?"
            rows={5}
            value={fields.message}
            onChange={(e) => handleChange("message", e.target.value)}
            onBlur={() => handleBlur("message")}
            style={{
              ...inputStyle,
              resize: "vertical",
              borderColor: touched.message && errors.message ? "#e53e3e" : undefined,
            }}
            onFocus={touched.message && errors.message ? errorFocus : focusIn}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "message-error" : undefined}
          />
          {touched.message && errors.message && (
            <p id="message-error" style={errorStyle} role="alert">{errors.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full font-ui text-[0.9375rem] font-medium py-[15px] rounded-full"
          style={{ background: "#c46a3a", color: "#fff", transition: "background 0.2s ease" }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#a8582e")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#c46a3a")}
        >
          Send message
        </button>
      </form>
    </div>
  );
}

const infoItems = [
  {
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#c46a3a" strokeWidth="1.6" aria-hidden>
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
      </svg>
    ),
    label: "Address",
    content: (
      <p className="font-ui text-[0.9375rem] leading-[1.75]" style={{ color: "var(--ink-muted)" }}>
        B-103, 1st Floor, Railway Commercial Complex<br />
        Sector 3, Sanpada (East)<br />
        Navi Mumbai — 400703
      </p>
    ),
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#c46a3a" strokeWidth="1.6" aria-hidden>
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21.73 16.92z" />
      </svg>
    ),
    label: "Phone",
    content: (
      <div>
        <a href="tel:+912241584158" className="block font-ui text-[0.9375rem] transition-colors duration-200" style={{ color: "var(--ink-muted)" }}>+91 22 41584158</a>
        <a href="tel:+917304487700" className="block font-ui text-[0.9375rem] transition-colors duration-200 mt-1" style={{ color: "var(--ink-muted)" }}>+91 7304 487700</a>
      </div>
    ),
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#c46a3a" strokeWidth="1.6" aria-hidden>
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    label: "Email",
    content: (
      <a href="mailto:mail@shroffpublishers.com" className="font-ui text-[0.9375rem] transition-colors duration-200 hover:opacity-70" style={{ color: "var(--ink-muted)" }}>
        mail@shroffpublishers.com
      </a>
    ),
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#c46a3a" strokeWidth="1.6" aria-hidden>
        <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    label: "Office hours",
    content: (
      <div>
        <p className="font-ui text-[0.9375rem]" style={{ color: "var(--ink-muted)" }}>Monday – Saturday</p>
        <p className="font-ui text-[0.9375rem]" style={{ color: "var(--ink-muted)" }}>9:00 am – 5:30 pm IST</p>
      </div>
    ),
  },
];

export function ContactPageClient() {
  return (
    <div style={{ background: "var(--surface)", minHeight: "100vh" }}>
      {/* Hero */}
      <div style={{ background: "linear-gradient(160deg, #f8f5f0 0%, #f0e8da 100%)", paddingTop: "80px", paddingBottom: "64px", borderBottom: "1px solid var(--border)" }}>
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 xl:px-16">
          <p className="eyebrow mb-5">Get in touch</p>
          <h1 className="font-display font-normal leading-[1.05] tracking-[-0.03em] mb-5" style={{ fontSize: "clamp(2.8rem, 6vw, 6rem)", color: "var(--ink)", maxWidth: "640px" }}>
            Let&apos;s Connect
          </h1>
          <p className="font-ui text-[1.0625rem] leading-[1.78]" style={{ color: "var(--ink-muted)", maxWidth: "480px" }}>
            For orders, institutional enquiries, wholesale pricing, and distributor partnerships — our team in Navi Mumbai is ready to help.
          </p>
        </div>
      </div>

      {/* 2-col body */}
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 xl:px-16 py-16 lg:py-24">
        <div className="grid lg:grid-cols-[1fr_1.15fr] gap-14 xl:gap-24 items-start">
          {/* Left — info */}
          <div>
            <h2 className="font-display font-normal leading-[1.08] tracking-[-0.025em] mb-10" style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", color: "var(--ink)" }}>
              Our details
            </h2>
            <div className="space-y-8">
              {infoItems.map((item) => (
                <div key={item.label} className="flex gap-5">
                  <div className="flex-shrink-0 flex items-center justify-center size-10 rounded-[12px]" style={{ background: "rgba(196,106,58,0.10)" }}>
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-ui text-[0.75rem] font-semibold uppercase tracking-[0.14em] mb-2" style={{ color: "#c46a3a" }}>{item.label}</p>
                    {item.content}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <ContactForm />
        </div>

        {/* Map */}
        <div className="mt-16 lg:mt-24 rounded-[24px] overflow-hidden" style={{ border: "1px solid var(--border)", boxShadow: "0 2px 8px rgba(0,0,0,0.05), 0 16px 48px rgba(0,0,0,0.07)" }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.6547!2d73.0108!3d19.0630!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c14b7c0b8451%3A0x1!2sSanpada%2C+Navi+Mumbai!5e0!3m2!1sen!2sin!4v1"
            width="100%" height="400" style={{ border: 0, display: "block" }}
            allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
            title="Shroff Publishers office location"
          />
        </div>
      </div>
    </div>
  );
}
