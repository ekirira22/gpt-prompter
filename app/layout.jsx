import './globals.css'

import NavBar from '@/components/NavBar'
import Provider from '@/components/Provider'

export const metadata = {
    title: "GPT Prompter™️",
    description: "Discover & Share AI Prompts"
}

const RootLayout = ( {children} ) => {
  return (
    <html>
        <body>
            <Provider>
                <div className="main">
                    <div className="gradient" />
                </div>

                <main className="app">
                    <NavBar />
                    {children}
                </main>
            </Provider>
        </body>
    </html>
  )
}

export default RootLayout;