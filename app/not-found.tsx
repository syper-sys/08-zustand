import css from "@/app/page.module.css"
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 - Page not found | NoteHub',
  description: 'This page does not exist or has been removed',
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