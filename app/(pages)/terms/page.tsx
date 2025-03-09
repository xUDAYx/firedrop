import type { Metadata } from "next";
import PageWrapper from "@/components/wrapper/page-wrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Terms of Service | firedrop",
  description: "Review firedrop's terms of service to understand the rules and guidelines for using our AI-powered web automation platform. Learn about user obligations and service terms.",
  openGraph: {
    title: "Terms of Service | firedrop",
    description: "Review firedrop's terms of service to understand the rules and guidelines for using our AI-powered web automation platform. Learn about user obligations and service terms.",
    type: "website",
  },
};

export default function TermsPage() {
  return (
    <PageWrapper>
      <div className="flex flex-col justify-center items-center w-full mt-[1rem] p-3 max-w-4xl mx-auto">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Terms of Service</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-muted-foreground">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground">
                By accessing and using firedrop&apos;s services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing our service.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">2. Use License</h2>
              <p className="text-muted-foreground">
                Permission is granted to temporarily access and use firedrop&apos;s services for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose</li>
                <li>Attempt to decompile or reverse engineer any software</li>
                <li>Remove any copyright or other proprietary notations</li>
                <li>Transfer the materials to another person or mirror the materials on any other server</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">3. Service Description</h2>
              <p className="text-muted-foreground">
                firedrop provides an AI-powered web automation platform. We reserve the right to modify, suspend, or discontinue any part of the service at any time without notice.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">4. User Obligations</h2>
              <p className="text-muted-foreground">
                As a user of our service, you agree to:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Provide accurate and complete information</li>
                <li>Maintain the security of your account</li>
                <li>Use the service in compliance with all applicable laws</li>
                <li>Not engage in any unauthorized or malicious activities</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">5. Payment Terms</h2>
              <p className="text-muted-foreground">
                Some aspects of the service may be provided for a fee. You agree to pay all fees in accordance with the pricing and payment terms presented to you for such services.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">6. Limitation of Liability</h2>
              <p className="text-muted-foreground">
                firedrop shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use the service.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">7. Contact Information</h2>
              <p className="text-muted-foreground">
                Questions about the Terms of Service should be sent to us at:
              </p>
              <p className="text-muted-foreground">
                Email: legal@firedrop.com<br />
                Address: [Your Company Address]
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </PageWrapper>
  );
} 