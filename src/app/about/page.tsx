import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <div className="bg-cream min-h-screen py-14 lg:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <p className="section-label mb-4">Our story</p>
        <hr className="hairline mb-8" />
        <h1 className="heading-page mb-8">About Shroff Publishers</h1>
        <div className="space-y-6 text-body">
          <p>
            Shroff Publishers &amp; Distributors is one of India&apos;s leading sources for technical,
            programming, and professional books—partnering with global publishers to serve developers,
            engineers, educators, and students nationwide.
          </p>
          <p>
            From our office in Navi Mumbai, we distribute thousands of titles across programming,
            artificial intelligence, data science, cybersecurity, cloud computing, engineering, and
            business—backed by responsive customer service and pan-India delivery.
          </p>
        </div>
      </div>
    </div>
  );
}
