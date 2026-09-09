"use client";

import { useState } from "react";
import Banner from "@/components/Banner";
import { motion, AnimatePresence } from "framer-motion";
import { FadeLeft, FadeRight, StaggerChildren, StaggerItem } from "@/components/motion/Animations";
import {
  MapPin, Phone, Mail, Clock, Send, MessageSquare, User,
  CheckCircle2, ArrowRight, Headphones, HelpCircle, Truck,
} from "lucide-react";

const contactMethods = [
  { icon: Phone, title: "Call Us", desc: "Mon-Sat, 8AM - 8PM", value: "90342-39674 / 70784-20222", color: "bg-sky-50 text-sky", href: "tel:+919034239674" },
  { icon: Mail, title: "Email Us", desc: "We reply within 24hrs", value: "anmooldairy@gmail.com", color: "bg-green-50 text-green", href: "mailto:anmooldairy@gmail.com" },
  { icon: MapPin, title: "Visit Us", desc: "Village Budhanpur, Karnal", value: "Karnal, Haryana – 132001", color: "bg-orange-50 text-orange", href: "#map" },
];

const quickTopics = [
  { icon: Truck, label: "Delivery Inquiry" },
  { icon: Headphones, label: "Support" },
  { icon: HelpCircle, label: "General Question" },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState("");
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });

  const update = (field: string, value: string) => setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="page-enter">
      <Banner
        title="Contact Us"
        tag="We'd Love to Hear From You"
        subtitle="Have a question about our products, want to place an order, or looking for more information? Feel free to get in touch."
        image="/images/contact.png"
      />

      {/* Contact Methods */}
      <section className="py-16 sm:py-20 bg-gray-300/95">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <StaggerChildren stagger={0.1} className="grid sm:grid-cols-3 gap-6">
            {contactMethods.map((m) => (
              <StaggerItem key={m.title}>
                <a href={m.href} className="block bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-500 text-center group">
                  <div className={`w-14 h-14 rounded-2xl ${m.color} mx-auto flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <m.icon size={24} />
                  </div>
                  <h3 className="font-bold text-navy mb-1">{m.title}</h3>
                  <p className="text-gray-400 text-sm mb-2">{m.desc}</p>
                  <p className="text-sky font-semibold text-sm">{m.value}</p>
                </a>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Form + Info */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-16">
            {/* Left — Info */}
            <div className="lg:col-span-2">
              <FadeLeft>
                <div className="space-y-8">
                  <div>
                    <h2 className="text-3xl sm:text-4xl font-[Poppins] font-bold text-navy mb-4">
                      Let&apos;s start a conversation
                    </h2>
                    <p className="text-gray-500 leading-relaxed">
                      Whether it&apos;s a question about our products, a delivery inquiry, or just want to say hello — we&apos;re all ears.
                    </p>
                  </div>

                  <div className="space-y-5">
                    {[
                      { icon: MapPin, title: "Anmool Dairy", sub: "Village Budhanpur, Karnal, Haryana – 132001, India" },
                      { icon: Phone, title: "90342-39674", sub: "Also: 70784-20222" },
                      { icon: Mail, title: "anmooldairy@gmail.com", sub: "We reply within 24 hours" },
                      { icon: Clock, title: "Business Hours", sub: "Mon-Sat: 8AM - 8PM | Sun: 9AM - 5PM" },
                    ].map((c) => (
                      <div key={c.title} className="flex items-start gap-4 group">
                        <div className="w-10 h-10 rounded-xl bg-navy-50 flex items-center justify-center shrink-0 group-hover:bg-navy group-hover:text-white transition-colors">
                          <c.icon size={16} className="text-navy group-hover:text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-navy text-sm">{c.title}</p>
                          <p className="text-gray-400 text-sm">{c.sub}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Quick action cards */}
                  <div className="grid grid-cols-2 gap-3">
                    <a href="tel:+919034239674" className="flex items-center justify-center gap-2 bg-navy text-white py-3 rounded-xl font-semibold text-sm hover:bg-navy-dark transition-colors">
                      <Phone size={16} /> Call 90342-39674
                    </a>
                    <a href="https://wa.me/919034239674" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-[#25D366] text-white py-3 rounded-xl font-semibold text-sm hover:bg-[#1eb855] transition-colors">
                      WhatsApp Us
                    </a>
                  </div>

                  {/* Map placeholder */}
                  <div id="map" className="relative rounded-2xl overflow-hidden bg-gray-100 h-48 border border-gray-200">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <MapPin size={28} className="text-sky mx-auto mb-2" />
                        <p className="text-sm font-medium text-gray-700">Village Budhanpur, Karnal</p>
                        <p className="text-xs text-gray-400">Haryana – 132001</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-sky-50 border border-sky/10">
                    <p className="text-sm text-navy font-semibold">For Orders & Enquiries</p>
                    <p className="text-sm text-gray-500 mt-1">WhatsApp | Call | Enquiry Form — we&apos;re here to help.</p>
                  </div>
                </div>
              </FadeLeft>
            </div>

            {/* Right — Form */}
            <div className="lg:col-span-3">
              <FadeRight>
                <div className="bg-white rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/50 p-8 sm:p-10">
                  <AnimatePresence mode="wait">
                    {submitted ? (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="text-center py-16"
                      >
                        <div className="w-20 h-20 rounded-full bg-green-50 mx-auto flex items-center justify-center mb-6">
                          <CheckCircle2 size={40} className="text-green" />
                        </div>
                        <h3 className="text-2xl font-[Poppins] font-bold text-navy mb-2">Message Sent!</h3>
                        <p className="text-gray-500 mb-8 max-w-sm mx-auto">
                          Thank you for reaching out. Our team will get back to you within 24 hours.
                        </p>
                        <button
                          onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", subject: "", message: "" }); setSelectedTopic(""); }}
                          className="inline-flex items-center gap-2 bg-navy text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-navy-dark transition-colors group"
                        >
                          Send Another Message
                          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                      </motion.div>
                    ) : (
                      <motion.form
                        key="form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onSubmit={handleSubmit}
                      >
                        <div className="mb-8">
                          <h2 className="text-2xl font-[Poppins] font-bold text-navy mb-2">Send a Message</h2>
                          <p className="text-gray-400 text-sm">Fill out the form and we&apos;ll respond shortly. Or email us at anmooldairy@gmail.com</p>
                        </div>

                        <div className="mb-6">
                          <label className="text-sm font-semibold text-navy block mb-3">What&apos;s this about?</label>
                          <div className="flex flex-wrap gap-2">
                            {quickTopics.map((t) => (
                              <button
                                key={t.label}
                                type="button"
                                onClick={() => { setSelectedTopic(t.label); update("subject", t.label); }}
                                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
                                  selectedTopic === t.label
                                    ? "bg-navy text-white border-navy"
                                    : "bg-gray-50 text-gray-600 border-gray-200 hover:border-sky hover:text-sky"
                                }`}
                              >
                                <t.icon size={14} />
                                {t.label}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                              <label className="text-sm font-semibold text-navy block mb-2">Name</label>
                              <div className="relative">
                                <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                  required
                                  value={form.name}
                                  onChange={(e) => update("name", e.target.value)}
                                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-navy placeholder:text-gray-400 focus:outline-none focus:border-sky focus:ring-2 focus:ring-sky/10 focus:bg-white transition-all text-sm"
                                  placeholder="Your name"
                                />
                              </div>
                            </div>
                            <div>
                              <label className="text-sm font-semibold text-navy block mb-2">Email</label>
                              <div className="relative">
                                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                  required
                                  type="email"
                                  value={form.email}
                                  onChange={(e) => update("email", e.target.value)}
                                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-navy placeholder:text-gray-400 focus:outline-none focus:border-sky focus:ring-2 focus:ring-sky/10 focus:bg-white transition-all text-sm"
                                  placeholder="you@example.com"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                              <label className="text-sm font-semibold text-navy block mb-2">Phone <span className="text-gray-400 font-normal">(optional)</span></label>
                              <div className="relative">
                                <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                  type="tel"
                                  value={form.phone}
                                  onChange={(e) => update("phone", e.target.value)}
                                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-navy placeholder:text-gray-400 focus:outline-none focus:border-sky focus:ring-2 focus:ring-sky/10 focus:bg-white transition-all text-sm"
                                  placeholder="90342-39674"
                                />
                              </div>
                            </div>
                            <div>
                              <label className="text-sm font-semibold text-navy block mb-2">Subject</label>
                              <div className="relative">
                                <MessageSquare size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                  required
                                  value={form.subject}
                                  onChange={(e) => update("subject", e.target.value)}
                                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-navy placeholder:text-gray-400 focus:outline-none focus:border-sky focus:ring-2 focus:ring-sky/10 focus:bg-white transition-all text-sm"
                                  placeholder="How can we help?"
                                />
                              </div>
                            </div>
                          </div>

                          <div>
                            <label className="text-sm font-semibold text-navy block mb-2">Message</label>
                            <textarea
                              required
                              rows={5}
                              value={form.message}
                              onChange={(e) => update("message", e.target.value)}
                              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-navy placeholder:text-gray-400 focus:outline-none focus:border-sky focus:ring-2 focus:ring-sky/10 focus:bg-white transition-all text-sm resize-none"
                              placeholder="Tell us more about your inquiry..."
                            />
                          </div>
                        </div>

                        <motion.button
                          type="submit"
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          className="w-full mt-6 bg-navy text-white py-4 rounded-xl font-semibold text-sm hover:bg-navy-dark transition-all flex items-center justify-center gap-2 shadow-lg shadow-navy/20 group"
                        >
                          <Send size={16} />
                          Send Message
                          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </motion.button>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </div>
              </FadeRight>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
