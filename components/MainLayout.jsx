import Head from 'next/head'
import Link from 'next/link';
import style from '../styles/components/MainLayout.module.scss'

function MainLayout({ title, children }) {
    return (
        <div>
            <Head>
                <title>{title}</title>
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet" />
            </Head>
            <header className={style.header}>
                <div className={style.container}>
                    <nav>
                        <Link href={'/'}><a>Home</a></Link>
                        <Link href={'/favorite'}><a>Favorite</a></Link>
                    </nav>
                </div>
            </header>
            <main>
                {children}
            </main>
        </div>
    )
}

export default MainLayout
