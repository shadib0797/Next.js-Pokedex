import Head from 'next/head';
export default function Layout({ children, title }) {
    return (
        <div className="bg-gray-100">
            <Head>
                <title>{title}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="container-main mx-auto p-8 min-h-screen">
                {children}
            </main>
        </div>
    );
}