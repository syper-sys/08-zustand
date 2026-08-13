import css from '@/components/NoteForm/NoteForm.module.css';
import { type NoteTag, type CreateNote, ALL_TAGS } from '@/types/note';
import { useId } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '@/lib/api';

interface NoteFormProps {
  onClose: () => void;
}

function NoteForm({ onClose }: NoteFormProps) {
  const fieldId = useId();
  const queryClient = useQueryClient();

  const createNoteM = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      onClose();
    },
    onError: error => {
      console.error(error);
    },
  });

  const handleSubmit = (values: CreateNote) => {
    createNoteM.mutate(values);
  };

  return (
      <form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor={`${fieldId}-title`}>Title</label>
          <input id={`${fieldId}-title`} name="title" className={css.input} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor={`${fieldId}-content`}>Content</label>
          <textarea
            id={`${fieldId}-content`}
            name="content"
            rows={8}
            className={css.textarea}
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor={`${fieldId}-tag`}>Tag</label>
          <select id={`${fieldId}-tag`} name="tag" className={css.select}>
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </select>
        </div>

        <div className={css.actions}>
          <button onClick={onClose} type="button" className={css.cancelButton}>
            Cancel
          </button>
          <button type="submit" className={css.submitButton} disabled={false}>
            Create note
          </button>
        </div>
      </form>
  );
}

export default NoteForm;
