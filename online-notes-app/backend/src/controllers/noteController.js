import mongoose from 'mongoose';
import Note from '../models/Note.js';

export async function listNotes(req, res, next) {
  try {
    const { search = '', pinned, color } = req.query;
    const filter = { user: req.userId };
    if (search.trim()) filter.$or = [
      { title: { $regex: search.trim(), $options: 'i' } },
      { content: { $regex: search.trim(), $options: 'i' } }
    ];
    if (pinned === 'true' || pinned === 'false') filter.pinned = pinned === 'true';
    if (color) filter.color = color;
    const notes = await Note.find(filter).sort({ pinned: -1, updatedAt: -1 });
    res.json(notes);
  } catch (e) { next(e); }
}

export async function createNote(req, res, next) {
  try {
    const { title, content, color, pinned } = req.body;
    if (!title?.trim()) return res.status(400).json({ message: 'Title is required' });
    const note = await Note.create({ user: req.userId, title, content, color, pinned });
    res.status(201).json(note);
  } catch (e) { next(e); }
}

export async function updateNote(req, res, next) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ message: 'Invalid note id' });
    const note = await Note.findOneAndUpdate({ _id: req.params.id, user: req.userId }, req.body, { new: true, runValidators: true });
    if (!note) return res.status(404).json({ message: 'Note not found' });
    res.json(note);
  } catch (e) { next(e); }
}

export async function deleteNote(req, res, next) {
  try {
    const note = await Note.findOneAndDelete({ _id: req.params.id, user: req.userId });
    if (!note) return res.status(404).json({ message: 'Note not found' });
    res.json({ message: 'Note deleted' });
  } catch (e) { next(e); }
}
