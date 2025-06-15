export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='wrapper'>
      <h1 className='blind'>dfluid assignment</h1>
      <main className='' id='content'>
        {children}
      </main>
    </div>
  );
}
