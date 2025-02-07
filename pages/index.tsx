import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface HomePageProps {
  title: string;
  description: string;
}

const HomePage: React.FC<HomePageProps> = ({ title, description }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content="ADHD, AI, Assistance, Productivity" />
        <meta name="author" content="remol" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container mx-auto py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold">{title}</h1>
          <p className="text-lg mt-4">{description}</p>
        </header>
        <section className="text-center">
          <Link href="/tasks">
            <Button className="mx-2" variant="destructive">
              Go to your TASKS
            </Button>
          </Link>
        </section>
      </main>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      title: "ADHD AI Assistance",
      description:
        "Boost your productivity with AI-powered assistance tailored for ADHD.",
    },
  };
};

export default HomePage;
