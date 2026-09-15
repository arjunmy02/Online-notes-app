import { useEffect, useMemo, useState } from 'react';
import { Plus, Search, LogOut, NotebookPen, RefreshCw } from 'lucide-react';
import { useAuth } from './context/AuthContext';
import api from './api/api';
import AuthScreen from './components/AuthScreen';
import NoteCard from './components/NoteCard';
import NoteModal from './components/NoteModal';

export default function App(){
 const {user,logout}=useAuth(); const [notes,setNotes]=useState([]); const [search,setSearch]=useState(''); const [filter,setFilter]=useState('all'); const [modal,setModal]=useState(null); const [loading,setLoading]=useState(false); const [error,setError]=useState('');
 const load=async()=>{setLoading(true);setError('');try{const p={};if(search.trim())p.search=search;if(filter==='pinned')p.pinned=true;const r=await api.get('/notes',{params:p});setNotes(r.data)}catch(e){setError(e.response?.data?.message||'Could not load notes')}finally{setLoading(false)}};
 useEffect(()=>{if(user)load()},[user,filter]);
 useEffect(()=>{const t=setTimeout(()=>user&&load(),250);return()=>clearTimeout(t)},[search]);
 const save=async data=>{try{if(modal==='new')await api.post('/notes',data);else await api.put(`/notes/${modal._id}`,data);setModal(null);load()}catch(e){setError(e.response?.data?.message||'Could not save note')}};
 const del=async id=>{if(!confirm('Delete this note?'))return;try{await api.delete(`/notes/${id}`);load()}catch(e){setError(e.response?.data?.message||'Could not delete note')}};
 const pin=async n=>{try{await api.put(`/notes/${n._id}`,{pinned:!n.pinned});load()}catch(e){setError(e.response?.data?.message||'Could not update note')}};
 if(!user)return <AuthScreen/>;
 return <div className="app"><header><div className="brand"><NotebookPen/><strong>NotesFlow</strong></div><div className="user-area"><span>Hi, {user.name}</span><button className="secondary" onClick={logout}><LogOut size={16}/> Logout</button></div></header><main className="dashboard"><div className="hero"><div><h1>My Notes</h1><p>Capture ideas, tasks and important thoughts.</p></div><button className="primary" onClick={()=>setModal('new')}><Plus/> New note</button></div><div className="toolbar"><div className="search"><Search size={19}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search notes..."/></div><div className="filters"><button className={filter==='all'?'filter active':'filter'} onClick={()=>setFilter('all')}>All</button><button className={filter==='pinned'?'filter active':'filter'} onClick={()=>setFilter('pinned')}>Pinned</button><button className="icon" onClick={load} title="Refresh"><RefreshCw size={18}/></button></div></div>{error&&<div className="error banner">{error}</div>}{loading?<div className="empty">Loading notes…</div>:notes.length===0?<div className="empty"><div className="empty-icon"><NotebookPen/></div><h2>{search?'No matching notes':'No notes yet'}</h2><p>{search?'Try another search.':'Create your first note to get started.'}</p>{!search&&<button className="primary" onClick={()=>setModal('new')}><Plus/> Create note</button>}</div>:<section className="notes-grid">{notes.map(n=><NoteCard key={n._id} note={n} onEdit={setModal} onDelete={del} onPin={pin}/>)}</section>}</main>{modal&&<NoteModal note={modal==='new'?null:modal} onClose={()=>setModal(null)} onSave={save}/>}</div>;
}
