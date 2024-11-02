import Test from './Test';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Test />
      {children}
    </>
  );
}
