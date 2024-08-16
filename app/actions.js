'use server'

import { addNote, delNote, updateNote } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function saveNote(prevState, formData) {
  const noteId = formData.get('noteId')

  const data = JSON.stringify({
    title: formData.get('title'),
    content: formData.get('body'),
    updateTime: new Date()
  })
  if (noteId) {
    await updateNote(noteId, data)
    revalidatePath('/', 'layout')
    redirect(`/note/${noteId}`)
    return { message: `Edit Success!` }
  } else {
    const noteId = await addNote(data)
    revalidatePath('/', 'layout')
    redirect(`/note/${noteId}`)
    return { message: `Add Success!` }
  }
}

export async function deleteNote(prevState, formData) {
  const noteId = formData.get('noteId')
  await delNote(noteId)
  revalidatePath('/', 'layout')
  redirect('/')
}
