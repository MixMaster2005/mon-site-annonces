export function Input({ className = '', ...props }) {
  return (
    <input
      className={`h-11 w-full rounded-2xl border border-border bg-background px-4 text-sm text-foreground outline-none transition focus:border-primary focus:ring-1 focus:ring-primary/20 ${className}`}
      {...props}
    />
  )
}
