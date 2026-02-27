'use client';

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            gap: '16px',
          }}
        >
          <h2 style={{ fontSize: '24px', fontWeight: 600 }}>
            Something Went Wrong
          </h2>
          <p>Something unexpected happened. Please try again.</p>
          <button
            onClick={reset}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: '1px solid #ccc',
              cursor: 'pointer',
            }}
          >
            Try Again
          </button>
        </div>
      </body>
    </html>
  );
}
