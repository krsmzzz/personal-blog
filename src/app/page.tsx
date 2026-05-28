import { Hero } from "@/components/home/hero";
import { FeaturedProjects } from "@/components/home/featured-projects";
import { LatestPosts } from "@/components/home/latest-posts";
import { AboutPreview } from "@/components/home/about-preview";
import { fetchAllPosts } from "@/lib/content-bridge";
import { getAllProjects } from "@/lib/content";

export default async function HomePage() {
  const posts = await fetchAllPosts();
  const projects = getAllProjects();

  return (
    <>
      <Hero />
      <FeaturedProjects projects={projects} />
      <LatestPosts posts={posts} />
      <AboutPreview />
    </>
  );
}
