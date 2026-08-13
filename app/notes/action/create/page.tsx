import type { Metadata } from 'next';
import css from '@/app/notes/action/create/page.module.css';
import NoteForm from '@/components/NoteForm/NoteForm';

export const metadata: Metadata = {
  title: `Create New Note | NoteHub`,
  description: `Make your thoughts and wishes into a note`,
  openGraph: {
    title: `Create New Note | NoteHub`,
    description: `Make your thoughts and wishes into a note`,
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: `Make your thoughts and wishes into a note`,
      },
    ],
    url: `https://08-zustand-blush-theta.vercel.app/`,
  },
};

function CreateNote() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}

export default CreateNote;
