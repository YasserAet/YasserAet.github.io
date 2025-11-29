import React from 'react';
import { useTranslation } from 'react-i18next';
import './i18n';
import Navigation from './components/Navigation';
import Announcement from './components/Announcement';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Education from './components/Education';
import Certificates from './components/Certificates';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import './App.css';

function App() {
    const { t } = useTranslation();
    
    return (
        <div className="App">
            <Navigation />
            <Announcement />
            <main>
                <Hero />
                <About />
                <Experience />
                <Education />
                <Certificates />
                <Skills />
                <Projects />
                <Contact />
            </main>
            <footer className="footer">
                <div className="container">
                    <div className="footer-content">
                        <p>© {new Date().getFullYear()} Fatima Ezzahra Kelladi. {t('footer.rights')}</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default App;
