import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
 title: 'Yassir Aitali — AI & Software Engineer · Full Stack & DevOps',
 description: 'AI and software engineer based in Marrakech. Computer vision, AI applications, distributed backends, full-stack engineering and DevOps.',
 icons: { icon: '/favicon.svg' },
 openGraph: { title: 'Yassir Aitali — Engineering across worlds', description: 'AI engineering, full-stack systems & DevOps.' },
};
export default function RootLayout({children}:{children:React.ReactNode}) {
 return <html lang="en"><body className="bg-ink font-body text-paper antialiased">{children}</body></html>;
}
