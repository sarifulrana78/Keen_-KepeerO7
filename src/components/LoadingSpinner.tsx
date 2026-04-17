export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-4">
      <div className="relative w-14 h-14">
        <div
          className="absolute inset-0 rounded-full border-4 border-t-transparent animate-spin"
          style={{ borderColor: '#e8f5f1', borderTopColor: '#1a6b5a' }}
        />
      </div>
      <p className="text-gray-500 text-sm font-medium animate-pulse">Loading friends...</p>
    </div>
  );
}
