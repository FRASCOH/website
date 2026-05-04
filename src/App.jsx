import Header from './components/Header';
import Footer from './components/Footer';
import Scene3D from './components/Scene3D';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import './components/Scene3D.css';
import './App.css';

function App() {
  return (
    <div className="app-wrapper">
      <Scene3D />
      <Header />
      <main>
        <Hero />
        <About />
        <Projects />
      </main>
      <Footer />
    </div>
  );
}

export default App;
