import { ContactSkeleton } from '../components/skeletons'

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-4/6 pt-20">
      <ContactSkeleton />
    </div>
  )
}
