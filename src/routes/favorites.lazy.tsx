import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/favorites')({
  component: () => <div>Hello /favorites!</div>,
})
