import Link from 'next/link';
import css from './SidebarNotes.module.css';
import { ALL_TAGS } from "@/types/note"

function SidebarNotes() {
  return (
    <ul className={css.menuList}>
      <Link href="/app/notes/action/create">
        Create note
      </Link>
      <li className={css.menuItem}>
        <Link href="/notes/filter/all" className={css.menuLink}>
          All notes
        </Link>
      </li>

      {ALL_TAGS.map((tag) => (
        <li key={tag} className={css.menuItem}>
          <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
            {tag}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default SidebarNotes;