export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center px-4 justify-between">
        <h1 className="text-xl font-bold tracking-tight text-primary">
          DangDang
        </h1>
        {/* Placeholder for future header actions */}
        <div className="w-8" />
      </div>
    </header>
  );
}
