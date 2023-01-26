// import '@/styles/globals.css'
import '../styles/index.css'
import '../styles/style.css'

export default function App({ Component, pageProps }) {
  return (
    <div>
      <Component {...pageProps} />
    </div>
  )
}
