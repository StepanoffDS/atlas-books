import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/books/$bookid')({
  component: () => <div>Hello /books/$bookid!</div>,
})
