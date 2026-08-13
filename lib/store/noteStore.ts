import { CreateNewNote, NoteTag , Note } from '@/types/note';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface NoteDraftStore {
  draft: CreateNewNote;
  setDraft: (note: Note) => void;
  clearDraft: () => void;
}

const INITIAL_DRAFT: CreateNewNote = {
  title: '',
  content: '',
  tag: 'Todo',
};

export const useDraftStore = create<NoteDraftStore>()(
  persist(
    set => ({
      draft: INITIAL_DRAFT,
      setDraft: note => set({ draft: note }),
      clearDraft: () => set({ draft: INITIAL_DRAFT }),
    }),
    {
      name: 'note-draft',
      partialize: (state) => ({ draft: state.draft }),
    }
  )
);
