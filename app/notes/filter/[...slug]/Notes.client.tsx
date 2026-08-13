'use client';

import { useState } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import Link from 'next/link';
import { useDebouncedCallback } from 'use-debounce';

import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import SearchBox from '@/components/SearchBox/SearchBox';
import { fetchNotes } from '@/lib/api';

import css from './page.module.css';

interface NotesClientProps {
  tag?: string;
}

export default function NotesClient({ tag }: NotesClientProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const [searchInputValue, setSearchInputValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  }, 500);

  const handleSearchChange = (value: string) => {
    setSearchInputValue(value);
    debouncedSearch(value);
  };

  const { data, isSuccess, isLoading, isError } = useQuery({
    queryKey: ['notes', tag, currentPage, searchQuery], 
    queryFn: () =>
      fetchNotes({
        tag,
        page: currentPage,
        search: searchQuery,
      }),
    placeholderData: keepPreviousData,
  });

  const totalPages = data?.totalPages ?? 0;
  const notes = data?.notes ?? [];

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={searchInputValue} onChange={handleSearchChange} />

        {isSuccess && totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}

        <Link href="/notes/action/create" className={css.button}>
          Create note +
        </Link>
      </header>

      <main className={css.main}>
        {isLoading && <p>Loading notes...</p>}
        {isError && <p>Error loading notes.</p>}

        {notes.length > 0 ? (
          <NoteList notes={notes} />
        ) : (
          isSuccess && <p>No notes found.</p>
        )}
      </main>
    </div>
  );
}