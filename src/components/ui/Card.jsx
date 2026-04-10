export function Card({ children, className = '' }) {
  return (
    <div className={`rounded-3xl border border-border bg-card text-card-foreground shadow-sm ${className}`}>
      {children}
    </div>
  )
}
