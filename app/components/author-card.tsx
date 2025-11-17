import Link from 'next/link'

export default function AuthorCard() {
  return (
    <div className="mt-12 mb-8">
      <div className="bg-gradient-to-r from-neutral-50 to-indigo-50 dark:from-neutral-950/30 dark:to-indigo-950/30 rounded-lg border border-neutral-200 dark:border-neutral-800 p-6 shadow-sm">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          {/* Author Image */}
          <img
            src="/me.jpg"
            alt="Orlando Cechlar Bitencourt"
            className="w-24 h-24 rounded-full border-2 border-neutral-300 dark:border-neutral-700 flex-shrink-0"
          />
          
          {/* Author Info */}
          <div className="flex-1">
            <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-1">
              Orlando Cechlar Bitencourt
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-500 mb-3">
              Tech Lead | Senior Software Development Analyst
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}