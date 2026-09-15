import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
const colors=['#fff7a8','#dff7e6','#dff0ff','#f1e3ff','#ffe1e8','#ffe9c7'];
export default function NoteModal({ note, onClose, onSave }) {
  const [form,setForm]=useState({title:'',content:'',color:colors[0],pinned:false});
  useEffect(()=>{if(note)setForm({title:note.title,content:note.content||'',color:note.color||colors[0],pinned:!!note.pinned})},[note]);
  return <div className="overlay"><form className="modal" onSubmit={e=>{e.preventDefault();onSave(form)}}><div className="modal-head"><h2>{note?'Edit note':'New note'}</h2><button type="button" className="icon" onClick={onClose}><X/></button></div><label>Title<input autoFocus required maxLength="150" value={form.title} onChange={e=>setForm({...form,title:e.target.value})}/></label><label>Content<textarea rows="9" value={form.content} onChange={e=>setForm({...form,content:e.target.value})}/></label><div><span className="field-label">Color</span><div className="colors">{colors.map(c=><button type="button" key={c} className={form.color===c?'color-dot selected':'color-dot'} style={{background:c}} onClick={()=>setForm({...form,color:c})}/>)}</div></div><label className="check"><input type="checkbox" checked={form.pinned} onChange={e=>setForm({...form,pinned:e.target.checked})}/> Pin this note</label><div className="modal-actions"><button type="button" className="secondary" onClick={onClose}>Cancel</button><button className="primary">Save note</button></div></form></div>;
}
