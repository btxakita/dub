import { DUB_LOGO, capitalize, nFormatter } from "@dub/utils";
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import { ProjectProps } from "../lib/types";
import Footer from "./components/footer";

export default function LinksLimitAlert({
  email = "panic@thedis.co",
  project = {
    id: "ckqf1q3xw0000gk5u2q1q2q1q",
    name: "Acme",
    slug: "acme",
    linksUsage: 500,
    linksLimit: 1000,
    plan: "pro",
  },
}: {
  email: string;
  project: Partial<ProjectProps>;
}) {
  const { slug, name, linksUsage, linksLimit, plan } = project as {
    slug: string;
    name: string;
    linksUsage: number;
    linksLimit: number;
    plan: string;
  };
  const percentage = Math.round((linksUsage / linksLimit) * 100);
  return (
    <Html>
      <Head />
      <Preview>
        Your Dub project, {name} has used {percentage.toString()}% of its links
        limit for the month.
      </Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white font-sans">
          <Container className="mx-auto my-10 max-w-[500px] rounded border border-solid border-gray-200 px-10 py-5">
            <Section className="mt-8">
              <Img
                src={DUB_LOGO}
                width="40"
                height="40"
                alt="Dub"
                className="mx-auto my-0"
              />
            </Section>
            <Heading className="mx-0 my-7 p-0 text-center text-xl font-semibold text-black">
              Links Limit Alert
            </Heading>
            <Text className="text-sm leading-6 text-black">
              Your Dub.co project, <strong> {name} </strong> has reached{" "}
              <strong>{percentage.toString()}%</strong> of the
              <strong> {capitalize(plan)} Plan </strong>
              limit of{" "}
              <strong>
                {nFormatter(linksLimit, { full: true })} links/month
              </strong>
              . You have created a total of{" "}
              <strong>{nFormatter(linksUsage, { full: true })} links</strong> in
              your current billing cycle.
            </Text>
            <Text className="text-sm leading-6 text-black">
              All your existing links will continue to work, and we are still
              collecting data on them, but you'll need to upgrade to view their
              stats.
            </Text>
            <Text className="text-sm leading-6 text-black">
              All your existing links will continue to work, and we are still
              collecting data on them, but you'll need to upgrade to add more
              links.
            </Text>
            <Section className="mb-8 text-center">
              <Link
                className="rounded-full bg-black px-6 py-3 text-center text-[12px] font-semibold text-white no-underline"
                href={`https://app.dub.co/${slug}?upgrade=${
                  plan === "free" ? "pro" : "business"
                }}`}
              >
                Upgrade my plan
              </Link>
            </Section>
            <Footer email={email} />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
