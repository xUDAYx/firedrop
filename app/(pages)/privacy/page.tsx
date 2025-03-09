import type { Metadata } from "next";
import PageWrapper from "@/components/wrapper/page-wrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Privacy Policy | firedrop",
  description: "Read firedrop's privacy policy to understand how we collect, use, and protect your personal information. Learn about our commitment to data security and privacy.",
  openGraph: {
    title: "Privacy Policy | firedrop",
    description: "Read firedrop's privacy policy to understand how we collect, use, and protect your personal information. Learn about our commitment to data security and privacy.",
    type: "website",
  },
};

export default function PrivacyPage() {
  return (
    <PageWrapper>
      <div className="flex flex-col justify-center items-center w-full mt-[1rem] p-3 max-w-4xl mx-auto">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Privacy Policy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-muted-foreground">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">1. Introduction</h2>
              <p className="text-muted-foreground">
                At firedrop, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our service.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">2. Information We Collect</h2>
              <p className="text-muted-foreground">
                We collect information that you provide directly to us, including:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Account information (name, email, password)</li>
                <li>Profile information</li>
                <li>Payment information</li>
                <li>Usage data and analytics</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">3. How We Use Your Information</h2>
              <p className="text-muted-foreground">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Provide and maintain our service</li>
                <li>Process your transactions</li>
                <li>Send you technical notices and updates</li>
                <li>Respond to your comments and questions</li>
                <li>Analyze usage patterns and improve our service</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">4. Information Sharing</h2>
              <p className="text-muted-foreground">
                We do not sell or rent your personal information to third parties. We may share your information in the following circumstances:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>With your consent</li>
                <li>To comply with legal obligations</li>
                <li>To protect our rights and safety</li>
                <li>With service providers who assist in our operations</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">5. Security</h2>
              <p className="text-muted-foreground">
                We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">6. Contact Us</h2>
              <p className="text-muted-foreground">
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <p className="text-muted-foreground">
                Email: privacy@firedrop.com<br />
                Address: [Your Company Address]
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </PageWrapper>
  );
} 