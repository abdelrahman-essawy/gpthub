export function IconSeparator({ className, ...props }: React.ComponentProps<'svg'>) {
    return (
      <svg
        fill="none"
        shapeRendering="geometricPrecision"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1"
        viewBox="0 0 24 24"
        aria-hidden="true"
        width="60" // Adjust the width of the separator
        height="60" // Adjust the height of the separator
        className={className}
        {...props}
      >
        <path d="M16.88 3.549L7.12 20.451"></path>
      </svg>
    )
  }
  