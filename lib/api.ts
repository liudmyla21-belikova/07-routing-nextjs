import axios from 'axios';
import type { Note } from '../types/note';

axios.defaults.baseURL = 'https://notehub-public.goit.study/api/';
const myKey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const headers = {
  Authorization: `Bearer ${myKey}`,
};

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
  totalItems: number;
}

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
}

export const fetchNotes = async (
  params: FetchNotesParams
): Promise<FetchNotesResponse> => {
  const { page = 1, perPage = 12, search = '' } = params;
  const response = await axios.get<FetchNotesResponse>(`notes/`, {
    params: { page, perPage, search },
    headers,
  });
  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await axios.get<Note>(`notes/${id}`, { headers });
  return response.data;
};

export const createNote = async (
  noteData: Pick<Note, 'title' | 'content' | 'tag'>
): Promise<Note> => {
  const response = await axios.post<Note>('/notes', noteData, {
    headers,
  });
  return response.data;
};

export const deleteNote = async (noteId: string): Promise<Note> => {
  const res = await axios.delete<Note>(`/notes/${noteId}`, {
    headers,
  });
  return res.data;
};