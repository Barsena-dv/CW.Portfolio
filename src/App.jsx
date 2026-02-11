import CoreCanvas from './components/systems/CoreCanvas';
import Cursor from './components/ui/Cursor/Cursor';
import { CursorProvider } from './context/cursor-store.jsx';
import './styles/global.css';

// Placeholder Layouts (will be replaced)
import Footer from './components/layout/Footer';
import Navbar from './components/layout/Navbar';
import About from './components/sections/About';
import Hero from './components/sections/Hero';
import Subscribe from './components/sections/Subscribe';
import WorkGallery from './components/sections/WorkGallery';

function App() {
  return (
    <CursorProvider>
      <Cursor />
      <CoreCanvas>
        <Navbar />
        <main>
          <Hero />
          <WorkGallery />
          <About />
          <Subscribe />
        </main>
        <Footer />
      </CoreCanvas>
    </CursorProvider>
  );
}

export default App;
