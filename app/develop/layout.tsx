import PageAnimateLayout from '@app/layout/PageAnimateLayout';
import Test from './Test';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Test />
      <PageAnimateLayout>{children}</PageAnimateLayout>
    </>
  );
}
