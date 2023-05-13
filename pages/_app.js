import "../styles/globals.css";

//INTERNAL IMPORT
import { Footer, Banner, NavBar, Documents} from "../Components";
import { DocusafeProvider } from "../Context/DocusafeContext";
export default function App({ Component, pageProps }) {
  return (
    <>
    <div className="min-h-screen">
      <div className="gradient-bg-hero">
      <DocusafeProvider >
        <NavBar />
        
        {/* <Documents /> */}
        <Component {...pageProps} />
        <Footer />
      </DocusafeProvider>
      </div>
      </div>
    </>
  );
}
