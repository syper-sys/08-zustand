import type { Metadata } from 'next';
import { fetchNotes } from '@/lib/api';
import { QueryClient, HydrationBoundary, dehydrate } from '@tanstack/react-query';
import NotesClient from './Notes.client';

type Props = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const rawTag = slug?.[0];
  const tag = rawTag === 'all' ? 'All Tags' : rawTag;

  return {
    title: `Notes: ${tag}`,
    description: `Search with filter ${tag}`,
    openGraph: {
      title: `Notes: ${tag}`,
      description: `Search with filter ${tag}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: `Search with filter ${tag}`,
        },
      ],
      url: `https://08-zustand-blush-theta.vercel.app/notes/filter/${rawTag}`,
    },
  };
}

const NotesByCategory = async ({ params }: Props) => {
  const { slug } = await params;
  const rawTag = slug?.[0];
  const tag = rawTag === 'all' ? undefined : rawTag;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', tag, 1, ''],
    queryFn: () => fetchNotes({ tag, page: 1, search: '' }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
};

export default NotesByCategory;
