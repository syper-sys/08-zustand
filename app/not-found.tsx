import css from "@/app/page.module.css"
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 - Page not found | NoteHub',
  description: 'This page does not exist or has been removed',
  openGraph: {
    title: '404 - Page not found | NoteHub',
    description: 'This page does not exist or has been removed',
    images: {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "404 - Page not found | NoteHub"
      },
    url: `https://08-zustand-blush-theta.vercel.app/`
  }
};

function NotFound() {
  return (
    <div className={css.container}>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>Sorry, the page you are looking for does not exist.</p>
    </div>
  )
}

export default NotFound;