import { Hero } from "@/components/home/hero";
import { FeaturedProjects } from "@/components/home/featured-projects";
import { LatestPosts } from "@/components/home/latest-posts";
import { AboutPreview } from "@/components/home/about-preview";
import { fetchAllPosts } from "@/lib/content-bridge";

export default async function HomePage() {
  const posts = await fetchAllPosts();

  return (
    <>
      <Hero />
      <FeaturedProjects />
      <LatestPosts posts={posts} />
      <AboutPreview />
    </>
  );
}
