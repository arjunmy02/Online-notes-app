import { Pin, Pencil, Trash2 } from 'lucide-react';
export default function NoteCard({ note, onEdit, onDelete, onPin }) {
  return <article className="note-card" style={{background: note.color}}><div className="note-top"><span className="date">{new Date(note.updatedAt).toLocaleDateString()}</span><button className={note.pinned?'icon active':'icon'} onClick={()=>onPin(note)} title="Pin"><Pin size={17}/></button></div><h3>{note.title}</h3><p>{note.content || 'No content'}</p><div className="note-actions"><button className="ghost" onClick={()=>onEdit(note)}><Pencil size={15}/> Edit</button><button className="danger ghost" onClick={()=>onDelete(note._id)}><Trash2 size={15}/> Delete</button></div></article>;
}
