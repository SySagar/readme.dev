import ThemeSwitcher from "./theme/ThemeSwitcher";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p className="text-lg">
      This is a cal sans text
      </p>
      <ThemeSwitcher />
    </main>
  );
}
