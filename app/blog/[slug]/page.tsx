import { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getPostBySlug, getAllPosts } from "@/lib/blog";
import { blogComponents } from "@/components/blog/mdx-components";
import TableOfContents from "@/components/blog/TableOfContents";
import CopyMarkdownButton from "@/components/blog/CopyMarkdownButton";
import Clouds from "@/components/Clouds";
import Nav from "@/components/Nav";
import PageFooter from "@/components/PageFooter";
import styles from "./page.module.css";

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  return {
    title: `${post.title} — Toffee Blog`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  return (
    <div className={styles.gradientBg}>
      <Clouds />
      <Nav />
      <div className={styles.wrapper}>
        <article className={styles.article}>
          <header className={styles.header}>
            <time className={styles.date} dateTime={post.date}>
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <h1 className={styles.title}>{post.title}</h1>
            <p className={styles.description}>{post.description}</p>
            <CopyMarkdownButton markdown={post.content} />
            <p className={styles.authorLine}>
              Written by{" "}
              <a
                href="https://www.linkedin.com/in/vishisht-choudhary-075996213"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.authorLink}
              >
                Vishisht Choudhary
              </a>
            </p>
          </header>
          <div className={styles.content} data-mdx-content>
            <MDXRemote source={post.content} components={blogComponents} />
          </div>
        </article>
        <aside className={styles.sidebar}>
          <TableOfContents />
        </aside>
      </div>
      <PageFooter />
    </div>
  );
}
