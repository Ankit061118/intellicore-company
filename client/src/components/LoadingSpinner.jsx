function LoadingSpinner({ label = 'Loading', className = '' }) {
  return (
    <div className={`loading-spinner ${className}`.trim()} role="status" aria-label={label}>
      <span className="loading-spinner__ring" aria-hidden="true" />
    </div>
  )
}

export default LoadingSpinner