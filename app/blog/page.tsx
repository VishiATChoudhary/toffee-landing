import { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Blog — Toffee",
  description: "Thoughts on the agent economy, commerce infrastructure, and the future of the internet.",
};

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <main className={styles.main}>
      <h1 className={styles.heading}>Blog</h1>
      <ul className={styles.postList}>
        {posts.map((post) => (
          <li key={post.slug} className={styles.postItem}>
            <Link href={`/blog/${post.slug}`} className={styles.postLink}>
              <time className={styles.postDate} dateTime={post.date}>
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              <h2 className={styles.postTitle}>{post.title}</h2>
              <p className={styles.postDescription}>{post.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
