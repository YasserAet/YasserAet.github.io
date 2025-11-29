# Portfolio Customization Guide - Complete Implementation

> A comprehensive guide to replicate all customizations made to Yassir Aitali's professional portfolio website

## Table of Contents
1. [Overview](#overview)
2. [Tech Stack](#tech-stack)
3. [Header & Navigation](#1-header--navigation)
4. [Announcement Banner](#2-announcement-banner)
5. [Hero Section](#3-hero-section)
6. [About Section](#4-about-section)
7. [Experience Section](#5-experience-section)
8. [Education Section](#6-education-section)
9. [Certificates Section](#7-certificates-section)
10. [Projects Section](#8-projects-section)
11. [Skills Section](#9-skills-section)
12. [Contact Section](#10-contact-section)
13. [Footer](#11-footer)
14. [File Structure](#12-file-structure)
15. [Design & Animations](#13-design--animations)
16. [Implementation Checklist](#14-implementation-checklist)

---

## Overview

Transform a pre-made portfolio template into a professional, bilingual (English/French) portfolio website optimized for PFE internship search in February 2025.

**Target Audience**: Recruiters, HR managers, technical hiring managers  
**Primary Goal**: Showcase Full Stack Engineering & VR Development expertise  
**Key Features**: Bilingual support, featured certificates with diploma images, collapsible announcements, CV downloads

---

## Tech Stack

```json
{
  "framework": "React 18.2.0",
  "language": "TypeScript",
  "buildTool": "Vite 5.4.21",
  "styling": "Tailwind CSS 3.4.0",
  "animations": {
    "scroll": "GSAP 3.12.4 + ScrollTrigger",
    "ui": "Framer Motion 10.16.16"
  },
  "i18n": "i18next 23.7.11",
  "icons": "Lucide React",
  "utilities": "react-intersection-observer"
}
```

---

## 1. Header & Navigation

### Design Specifications

**Layout**:
- Logo (left) + Centered pill navigation + Language toggle (right)
- Glassmorphism effect with backdrop blur
- Sticky header with scroll-triggered background change

**Navigation Items**:
```
Home | About | Experience | Education | Certificates | Projects | Skills | Contact
```

**French Translation Fix**:
```tsx
// Problem: "À propos" wraps to new line
// Solution:
<div className="flex items-center space-x-1 bg-dark-900/50 rounded-full px-2 py-1.5 border border-primary-500/10 flex-nowrap">
  {navItems.map((item) => (
    <motion.button
      className="relative px-3 py-2 text-dark-200 hover:text-white transition-all duration-300 font-medium text-xs lg:text-sm rounded-full group whitespace-nowrap"
    >
      <span className="relative z-10">{t(`nav.${item}`)}</span>
    </motion.button>
  ))}
</div>
```

**Key Classes**:
- `flex-nowrap` - Prevents wrapping
- `whitespace-nowrap` - Keeps text on one line
- `px-3` (instead of `px-4`) - Reduced padding
- `text-xs lg:text-sm` - Responsive text sizing

**Language Toggle**:
```tsx
<motion.button
  onClick={toggleLanguage}
  className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-600 to-primary-700 text-white shadow-lg hover:shadow-primary-500/50 transition-all font-bold text-sm"
>
  {i18n.language.toUpperCase()}
</motion.button>
```

**Mobile Menu**:
- Hamburger icon with AnimatePresence
- Slide-in animation with staggered menu items
- Dot indicators for each item

---

## 2. Announcement Banner

### Position & Behavior

**Position**: `fixed top-28 md:top-32` (below navigation)  
**Collapsible**: Yes, with close button (X icon)  
**Animation**: Slide up on close with exit animation

### Content

**English**:
```json
{
  "badge": "Open to Opportunities",
  "title": "Actively Seeking PFE Internship",
  "details": "Available from February 2025 • 4-6 months • Open to full-time conversion",
  "cta": "Get in Touch"
}
```

**French**:
```json
{
  "badge": "Disponible pour de nouvelles opportunités",
  "title": "Recherche Active de Stage PFE",
  "details": "Disponible dès Février 2025 • 4-6 mois • Possibilité de recrutement",
  "cta": "Me Contacter"
}
```

### Implementation

```tsx
const [isAnnouncementVisible, setIsAnnouncementVisible] = useState(true);

<AnimatePresence>
  {isAnnouncementVisible && (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -100, opacity: 0 }}
      className="fixed top-28 md:top-32 left-0 right-0 z-40"
    >
      <div className="bg-gradient-to-r from-primary-600/95 via-primary-500/95 to-primary-600/95 backdrop-blur-sm rounded-xl">
        <button
          onClick={() => setIsAnnouncementVisible(false)}
          className="absolute top-2 right-2 p-1.5 rounded-full bg-white/20 hover:bg-white/30"
        >
          <X size={18} />
        </button>
        {/* Content */}
      </div>
    </motion.div>
  )}
</AnimatePresence>
```

---

## 3. Hero Section

### Layout Adjustments

**Padding**: `pt-48 md:pt-56` (to accommodate announcement banner)

### Content

**Name**: Yassir Aitali  
**Title**: VR Developer & Computer Science Engineering Student  
**Subtitle**: Full-stack web development and VR technologies specialist based in Morocco

### Buttons (3)

1. **View My Work** → Scrolls to projects
2. **Get in Touch** → Scrolls to contact
3. **Download CV** → Downloads PDF based on language

### CV Download Implementation

**Files Required**:
```
/public/YASSIR AITALI_Final_ENG.pdf
/public/YASSIR AITALI_Final.pdf
```

**Component Code**:
```tsx
import { Download } from 'lucide-react';

const cvFile = i18n.language === 'en' 
  ? '/YASSIR AITALI_Final_ENG.pdf' 
  : '/YASSIR AITALI_Final.pdf';

<motion.a
  href={cvFile}
  download
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  className="inline-flex items-center gap-2 px-8 py-4 bg-dark-700 hover:bg-dark-600 text-white rounded-full font-semibold shadow-lg transition-all"
>
  <Download size={20} />
  {t('hero.downloadCV')}
</motion.a>
```

**Translation Keys**:
```json
// en.json
"hero": {
  "downloadCV": "Download CV"
}

// fr.json
"hero": {
  "downloadCV": "Télécharger CV"
}
```

---

## 4. About Section

### Statistics Cards

```tsx
const stats = [
  { value: '3+', label: t('about.yearsExperience') },
  { value: '15+', label: t('about.projectsCompleted') },
  { value: '20+', label: t('about.technologies') }
];
```

### Professional Description

**English**:
```
Motivated Full Stack Engineer & VR Developer with a solid foundation in DevOps, Software Architecture, and Cloud development.

I am proficient in the complete Software Development Life Cycle (SDLC), focusing on developing scalable applications and implementing automated CI/CD pipelines and containerization. My technical expertise spans a wide range of languages including Java, Python, and JavaScript, and frameworks such as React, Spring Boot, and Node.js.

Furthermore, I have specialized experience in VR/XR development, leveraging skills in Unity, WebGL, and Blender to create immersive 3D environments and interactive web applications, as demonstrated by my work on VR tours and body tracking systems.

I am eager to apply my knowledge in AI/ML and Big Data to deliver technically excellent, user-focused solutions that emphasize performance and an optimal user experience.
```

**French**:
```
Ingénieur Full Stack & Développeur VR motivé, doté de solides fondations en DevOps, Architecture Logicielle et développement Cloud-Native.

Je maîtrise le Cycle de Vie Complet du Développement Logiciel (SDLC), et me concentre sur le développement d'applications évolutives, l'implémentation de pipelines CI/CD automatisés et la conteneurisation. Mon expertise technique couvre un large éventail de langages, incluant Java, Python, et JavaScript, ainsi que des frameworks comme React, Spring Boot, et Node.js.

De plus, je possède une expérience spécialisée en développement VR/XR, tirant parti de compétences en Unity, WebGL, et Blender pour créer des environnements 3D immersifs et des applications web interactives, comme en témoignent mes réalisations sur les visites VR et les systèmes de suivi corporel.

Je suis impatient de mettre à profit mes connaissances en IA/ML et Big Data pour fournir des solutions techniquement excellentes, axées sur l'utilisateur, et qui mettent l'accent sur la performance et une expérience utilisateur optimale.
```

---

## 5. Experience Section

### Timeline Fix

**Issue**: Timeline vertical line misaligned on mobile/desktop  
**Solution**: Ensure consistent positioning with proper responsive classes

### Positions

#### 1. Full-Stack & VR Developer & 3D Designer
```json
{
  "role": "Intern – Full-Stack & VR Developer & 3D Designer",
  "company": "Almoftah Real Estate",
  "location": "Muscat, Oman",
  "period": "September 2024",
  "description": "Development of VR tours for properties with interactive 3D buildings and engaging 3D web applications showcasing real estate projects.",
  "achievements": [
    "Created immersive VR property tours",
    "Developed 3D interactive building models",
    "Built engaging web-based 3D applications",
    "Optimized performance for web deployment"
  ]
}
```

#### 2. Full-Stack Developer / Game Developer
```json
{
  "role": "Intern – Full-Stack Developer / Game Developer",
  "company": "UM6P Vanguard Center",
  "location": "Benguerir, Morocco",
  "period": "August 2023",
  "description": "Developed a Unity WebGL body tracking application with live streaming via WebSocket. Focused on real-time accuracy improvement and seamless browser integration.",
  "achievements": [
    "Built WebGL body tracking system",
    "Implemented WebSocket streaming",
    "Optimized real-time performance",
    "Achieved browser compatibility"
  ]
}
```

#### 3. Full-Stack Developer
```json
{
  "role": "Intern – Full-Stack Developer",
  "company": "SEOCOM",
  "location": "Marrakech, Morocco",
  "period": "August 2021",
  "description": "Contributed to full-stack web application development, including testing, debugging, and deployment of scalable solutions.",
  "achievements": [
    "Developed full-stack web applications",
    "Performed comprehensive testing",
    "Debugged and optimized code",
    "Deployed scalable solutions"
  ]
}
```

---

## 6. Education Section

### Timeline Layout

Create a new section with timeline design similar to Experience

### Educational Background

#### 1. Engineering Cycle – MIAGE
```json
{
  "degree": "Engineering Cycle – MIAGE",
  "institution": "Moroccan School of Engineering Sciences",
  "location": "Marrakech, Morocco",
  "period": "October 2023 – Present",
  "specialization": "DevOps, AI, Big Data, Software Architecture, Cloud",
  "description": "Advanced engineering program focusing on modern software development methodologies, cloud infrastructure, and emerging technologies."
}
```

#### 2. VR Developer Diploma
```json
{
  "degree": "VR Developer Diploma",
  "institution": "IDC & VR Innovation Academy, UM6P",
  "location": "Benguerir / Marrakech, Morocco",
  "period": "May 2023",
  "specialization": "VR/AR, Immersive 3D Environments, 3D Modeling, 3D Animation, Unity, Blender, WebGL, Industry 4.0",
  "description": "Specialized training in virtual reality development with hands-on projects in immersive technologies and interactive 3D applications."
}
```

#### 3. Professional Degree: BTS
```json
{
  "degree": "Professional Degree: BTS",
  "institution": "BTS Multimedia and Web Design — Mohammed VI",
  "location": "Marrakech, Morocco",
  "period": "July 2022",
  "specialization": "Web Development, Multimedia Design, UX/UI, Interactive Content",
  "description": "Comprehensive program covering full-stack web development and multimedia design principles."
}
```

#### 4. Baccalaureate
```json
{
  "degree": "Baccalaureate",
  "institution": "Mohammed VI High School",
  "location": "Marrakech, Morocco",
  "period": "July 2020",
  "specialization": "Electrical Science and Technology",
  "description": "High school diploma with focus on electrical engineering and technology fundamentals."
}
```

---

## 7. Certificates Section

### Architecture

**Two Sections**:
1. Featured Certificates (2) - WITH diploma images
2. Regular Certificates (10) - WITH verification links

### Featured Certificates

**Critical Requirements**:
- ⚠️ **NO GSAP animations** (causes opacity: 0 issue)
- ✅ Use only Framer Motion
- ✅ Images must be visible immediately
- ✅ No shadows on certificates
- ✅ Yellow "Featured" badge (hardcoded, no translation)

**Grid Layout**:
```tsx
<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
```

**Card Structure**:
```tsx
<motion.div
  initial={{ opacity: 0, scale: 0.95 }}
  animate={inView ? { opacity: 1, scale: 1 } : {}}
  transition={{ delay: 0.2 + index * 0.1 }}
  whileHover={{ y: -8, scale: 1.02 }}
  className="certificate-card glass-effect rounded-2xl overflow-hidden group border-2 border-primary-500/30 hover:border-primary-500 transition-all w-full"
>
  {/* Diploma Image */}
  <div 
    className="relative h-80 md:h-96 overflow-hidden bg-dark-900 cursor-pointer"
    onClick={() => setSelectedImage({ src: cert.image!, title: cert.title })}
  >
    <img
      src={cert.image}
      alt={cert.title}
      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
    />
    
    {/* Featured Badge - Yellow */}
    <div className="absolute top-3 right-3 z-10">
      <span className="px-3 py-1 bg-yellow-500 text-dark-900 rounded-full text-xs font-bold shadow-lg">
        ⭐ Featured
      </span>
    </div>
    
    {/* Zoom Icon */}
    <div className="absolute top-4 left-4">
      <ZoomIn
        className="text-white/70 group-hover:text-primary-400 transition-colors"
        size={24}
      />
    </div>
  </div>
  
  {/* Certificate Details */}
  <div className="p-6">
    <h3 className="text-xl font-bold text-white mb-3">{cert.title}</h3>
    <p className="text-primary-400 text-base mb-3">{cert.issuer}</p>
    <div className="flex items-center gap-2 text-dark-300 text-sm">
      <Calendar size={16} />
      <span>{cert.date}</span>
    </div>
  </div>
</motion.div>
```

**Lightbox Modal**:
```tsx
<AnimatePresence>
  {selectedImage && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setSelectedImage(null)}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm cursor-pointer"
    >
      {/* Close Button */}
      <motion.button
        onClick={() => setSelectedImage(null)}
        className="absolute top-4 right-4 p-2 rounded-full bg-dark-800/80 hover:bg-dark-700 text-white"
      >
        <X size={24} />
      </motion.button>
      
      {/* Full-Size Image */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-6xl max-h-[90vh] w-full"
      >
        <img
          src={selectedImage.src}
          alt={selectedImage.title}
          className="w-full h-full object-contain rounded-lg"
        />
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
```

### Featured Certificate Data

#### Certificate 1: IDC VR Developer
```json
{
  "title": "Certified Advanced XR Developer Program",
  "issuer": "VR Innovation Academy / IDC Morocco",
  "date": "July 2023",
  "credentialId": "473-VRIA-EON-XR-2023",
  "link": "",
  "featured": true,
  "image": "/Yasser Aitali - IDC CERTIFICATE_page-0001.jpg"
}
```

**French**:
```json
{
  "title": "Programme Certifié Développeur XR Avancé",
  "issuer": "VR Innovation Academy / IDC Morocco",
  "date": "Juillet 2023",
  "credentialId": "473-VRIA-EON-XR-2023",
  "link": "",
  "featured": true,
  "image": "/Yasser Aitali - IDC CERTIFICATE_page-0001.jpg"
}
```

#### Certificate 2: Packt Spring Cloud
```json
{
  "title": "Advanced Spring Cloud Microservices & Deployment with Docker",
  "issuer": "Packt",
  "date": "November 2025",
  "credentialId": "",
  "link": "",
  "featured": true,
  "image": "/Advanced Spring Cloud Microservices & Deployment with Docker_page-0001.jpg"
}
```

**French**:
```json
{
  "title": "Microservices Spring Cloud Avancés & Déploiement avec Docker",
  "issuer": "Packt",
  "date": "Novembre 2025",
  "credentialId": "",
  "link": "",
  "featured": true,
  "image": "/Advanced Spring Cloud Microservices & Deployment with Docker_page-0001.jpg"
}
```

### Regular Certificates (10)

**Grid Layout**: `grid md:grid-cols-2 lg:grid-cols-3 gap-6`

**Card Component**:
```tsx
const RegularComponent = (cert.link && cert.link.trim()) ? motion.a : motion.div;
const regularLinkProps = (cert.link && cert.link.trim()) ? {
  href: cert.link,
  target: "_blank",
  rel: "noopener noreferrer"
} : {};

<RegularComponent
  {...regularLinkProps}
  whileHover={{ y: -5 }}
  className="certificate-card glass-effect rounded-2xl p-6 group hover:border-primary-500/50"
>
  <div className="w-12 h-12 bg-primary-600/20 rounded-full flex items-center justify-center">
    <Award className="text-primary-400" size={24} />
  </div>
  <h3 className="text-lg font-bold text-white mb-2">{cert.title}</h3>
  <p className="text-dark-300 text-sm mb-3">{cert.issuer}</p>
  <div className="flex items-center gap-2 text-dark-400 text-sm">
    <Calendar size={14} />
    <span>{cert.date}</span>
  </div>
  {cert.credentialId && (
    <div className="mt-3 pt-3 border-t border-dark-700">
      <p className="text-xs text-dark-400">ID: {cert.credentialId}</p>
    </div>
  )}
</RegularComponent>
```

### Certificate List

1. **Introduction to Machine Learning**
   - Issuer: Duke University
   - Date: November 2025
   - ID: ZCNXM4UPCX0Q
   - Link: https://www.coursera.org/account/accomplishments/records/ZCNXM4UPCX0Q

2. **Introduction to Containers w/ Docker, Kubernetes & OpenShift**
   - Issuer: IBM
   - Date: March 2025
   - ID: 8NP8UQP1HAY2
   - Link: https://www.coursera.org/account/accomplishments/verify/8NP8UQP1HAY2

3. **Virtual Networks in Azure**
   - Issuer: Whizlabs
   - Date: March 2025
   - ID: H8NV555OKVMT
   - Link: https://www.coursera.org/account/accomplishments/records/H8NV555OKVMT

4. **Introduction to Java and Object-Oriented Programming**
   - Issuer: University of Pennsylvania
   - Date: December 2024
   - ID: WQEVJD069EWB
   - Link: https://www.coursera.org/account/accomplishments/records/WQEVJD069EWB

5. **React Basics**
   - Issuer: Meta
   - Date: December 2024
   - ID: FCA4UBUDSNOV
   - Link: https://www.coursera.org/account/accomplishments/records/FCA4UBUDSNOV

6. **Software Engineering: Software Design and Project Management**
   - Issuer: The Hong Kong University of Science and Technology
   - Date: May 2024
   - ID: B76TWEV7DJZD
   - Link: https://www.coursera.org/account/accomplishments/records/B76TWEV7DJZD

7. **The Unix Workbench**
   - Issuer: Johns Hopkins University
   - Date: April 2024
   - ID: FKYV2U84MFLE
   - Link: https://www.coursera.org/account/accomplishments/records/FKYV2U84MFLE

8. **Introduction à la programmation orientée objet (en C++)**
   - Issuer: École Polytechnique Fédérale de Lausanne
   - Date: December 2023
   - ID: 2VHSXHT4XVCV
   - Link: https://www.coursera.org/account/accomplishments/records/2VHSXHT4XVCV

9. **Web Design for Everybody Capstone**
   - Issuer: University of Michigan
   - Date: December 2023
   - ID: Q3YJ5ZEYWJGV
   - Link: https://www.coursera.org/account/accomplishments/records/Q3YJ5ZEYWJGV

10. **Advanced Styling with Responsive Design**
    - Issuer: University of Michigan
    - Date: November 2023
    - ID: SCHKFPG5HRXT
    - Link: https://www.coursera.org/account/accomplishments/records/SCHKFPG5HRXT

### View All Button

```tsx
<a
  href="https://www.linkedin.com/in/aitali-yassir/details/certifications/"
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600/20 hover:bg-primary-600 text-primary-400 hover:text-white rounded-full font-medium transition-all group"
>
  {t('certificates.viewAll')}
  <ExternalLink className="group-hover:translate-x-1 transition-transform" size={18} />
</a>
```

---

## 8. Projects Section

### Section Title

**Change from**: "Academic Projects"  
**Change to**: "Projects"

### Project Icons

**Replace empty rectangles with icons**:

```tsx
import { Building2, Eye, ParkingSquare, Hotel, ClipboardList, Code2 } from 'lucide-react';

const projectIcons = {
  'KEY ONE': Building2,
  'WebGL Body Tracking': Eye,
  'OPTIPARK': ParkingSquare,
  'Hotel Management': Hotel,
  'Room Booking': ClipboardList,
  'default': Code2
};

// In project card:
<div className="h-48 bg-gradient-to-br from-primary-600 to-primary-800 relative overflow-hidden">
  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all flex items-center justify-center">
    <motion.div whileHover={{ scale: 1.1, rotate: 5 }}>
      <Icon className="text-white/30" size={64} />
    </motion.div>
  </div>
</div>
```

### Featured Projects (3)

**Featured Badge**:
```tsx
{project.featured && (
  <div className="absolute top-3 right-3 z-10">
    <span className="px-3 py-1 bg-yellow-500 text-dark-900 rounded-full text-xs font-bold shadow-lg">
      ⭐ Featured
    </span>
  </div>
)}
```

#### 1. KEY ONE – Real Estate VR Platform
```json
{
  "title": "KEY ONE – Real Estate VR Platform",
  "description": "Next.js-based real estate visualization platform with Three.js integration for interactive 3D property exploration and virtual tours.",
  "features": [
    "360° VR property tours with immersive navigation",
    "Interactive 3D building explorer with floor navigation",
    "Detailed floor plans and unit specifications",
    "Virtual staging capabilities for empty properties"
  ],
  "technologies": ["Next.js", "Three.js", "React", "TypeScript", "Tailwind CSS"],
  "github": "https://github.com/YasserAet/KEY1-V2",
  "year": "2024",
  "featured": true
}
```

#### 2. WebGL Body Tracking System
```json
{
  "title": "WebGL Body Tracking System",
  "description": "Real-time body tracking application using Unity WebGL with advanced pose detection and WebSocket streaming capabilities.",
  "features": [
    "Real-time pose detection and tracking",
    "WebSocket data streaming for live updates",
    "Browser-based deployment without plugins",
    "Interactive body tracking visualization"
  ],
  "technologies": ["Unity", "WebGL", "C#", "WebSocket", "JavaScript"],
  "github": "https://github.com/YasserAet/Webgl_Body_Tracking",
  "year": "2023",
  "featured": true
}
```

#### 3. OPTIPARK – Smart Parking System
```json
{
  "title": "OPTIPARK – Smart Parking System",
  "description": "Computer vision-based parking management system using Python and OpenCV for real-time space detection and monitoring.",
  "features": [
    "Real-time parking space detection and tracking",
    "Advanced image processing algorithms",
    "WebSocket integration for live updates",
    "Occupancy monitoring dashboard with analytics"
  ],
  "technologies": ["Python", "OpenCV", "WebSocket", "Computer Vision"],
  "github": "https://github.com/YasserAet/OPTIPARK",
  "year": "2024",
  "featured": true
}
```

### Additional Projects (3)

#### 4. Hotel Management System (C#)
```json
{
  "title": "Hotel Management System",
  "description": "Comprehensive desktop application for hotel operations management built with C# and Windows Forms.",
  "features": [
    "Complete reservation management system",
    "Intelligent room allocation",
    "Customer database with history tracking",
    "Automated billing and invoice generation"
  ],
  "technologies": ["C#", ".NET", "Windows Forms", "SQL Server"],
  "github": "https://github.com/YasserAet/HOTEL-MANAGEMENT-APP-2",
  "year": "2022",
  "featured": false
}
```

#### 5. HMS – Hotel Management (Qt/C++)
```json
{
  "title": "HMS – Hotel Management",
  "description": "Cross-platform hotel management system built with Qt framework for enhanced portability and modern UI.",
  "features": [
    "Cross-platform guest management",
    "Advanced room booking system",
    "Inventory tracking and management",
    "Comprehensive report generation"
  ],
  "technologies": ["C++", "Qt Framework", "SQLite", "Cross-platform"],
  "github": "https://github.com/YasserAet/HMS",
  "year": "2022",
  "featured": false
}
```

#### 6. Gestion Salles – Room Booking System
```json
{
  "title": "Gestion Salles – Room Booking System",
  "description": "Web-based room and resource booking management system built with Laravel for educational institutions.",
  "features": [
    "Efficient room reservation system",
    "Conflict-free schedule management",
    "User authentication and authorization",
    "Interactive booking calendar"
  ],
  "technologies": ["PHP", "Laravel", "MySQL", "Bootstrap"],
  "github": "https://github.com/YasserAet/Gestion_salles",
  "year": "2023",
  "featured": false
}
```

### Removals

- ❌ Remove "Click to learn more" text
- ❌ Remove two-letter abbreviations
- ✅ Keep year badge in top-right corner
- ✅ Keep featured badge with ring glow

---

## 9. Skills Section

### Categories

#### Languages & Frameworks
```json
{
  "category": "Languages & Frameworks",
  "skills": [
    { "name": "Java", "level": 85 },
    { "name": "Python", "level": 80 },
    { "name": "JavaScript", "level": 90 },
    { "name": "TypeScript", "level": 85 },
    { "name": "React", "level": 90 },
    { "name": "Spring Boot", "level": 80 },
    { "name": "Node.js", "level": 85 },
    { "name": "Laravel", "level": 75 },
    { "name": "HTML5/CSS3", "level": 95 },
    { "name": "Tailwind CSS", "level": 90 }
  ]
}
```

#### 3D/XR Technologies
```json
{
  "category": "3D/XR Technologies",
  "skills": [
    { "name": "Unity", "level": 85 },
    { "name": "Unreal Engine", "level": 70 },
    { "name": "Blender", "level": 80 },
    { "name": "WebGL", "level": 75 },
    { "name": "Three.js", "level": 80 },
    { "name": "VR/AR Development", "level": 85 }
  ]
}
```

#### DevOps & Cloud
```json
{
  "category": "DevOps & Cloud",
  "skills": [
    { "name": "Docker", "level": 85 },
    { "name": "Kubernetes", "level": 70 },
    { "name": "OpenShift", "level": 65 },
    { "name": "CI/CD", "level": 80 },
    { "name": "Git", "level": 90 },
    { "name": "Jenkins", "level": 70 },
    { "name": "Azure", "level": 75 },
    { "name": "AWS", "level": 70 }
  ]
}
```

#### Databases & Tools
```json
{
  "category": "Databases & Tools",
  "skills": [
    { "name": "MySQL", "level": 85 },
    { "name": "PostgreSQL", "level": 80 },
    { "name": "MongoDB", "level": 75 },
    { "name": "Redis", "level": 70 },
    { "name": "SQL Server", "level": 80 }
  ]
}
```

#### AI/ML & Big Data
```json
{
  "category": "AI/ML & Big Data",
  "skills": [
    { "name": "Machine Learning", "level": 70 },
    { "name": "TensorFlow", "level": 65 },
    { "name": "Big Data Concepts", "level": 70 }
  ]
}
```

---

## 10. Contact Section

### Contact Information

```json
{
  "email": "yasseraitali@outlook.fr",
  "phone": "+212 6 61 98 18 90",
  "location": "Marrakech, Morocco"
}
```

### Email Link Implementation

```tsx
<a
  href="mailto:yasseraitali@outlook.fr"
  className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 transition-colors group"
>
  <Mail size={20} />
  <span className="group-hover:underline">yasseraitali@outlook.fr</span>
</a>
```

### Social Links

```json
{
  "github": "https://github.com/YasserAet/",
  "linkedin": "https://www.linkedin.com/in/aitali-yassir/"
}
```

### Contact Form

**Important**: Remove all placeholder text!

```tsx
<form className="space-y-6">
  <div>
    <label className="block text-dark-300 mb-2">Name</label>
    <input
      type="text"
      className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-lg focus:border-primary-500 focus:outline-none text-white"
    />
  </div>
  
  <div>
    <label className="block text-dark-300 mb-2">Email</label>
    <input
      type="email"
      className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-lg focus:border-primary-500 focus:outline-none text-white"
    />
  </div>
  
  <div>
    <label className="block text-dark-300 mb-2">Message</label>
    <textarea
      rows={5}
      className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-lg focus:border-primary-500 focus:outline-none text-white"
    />
  </div>
  
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    type="submit"
    className="w-full px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold transition-all"
  >
    {t('contact.send')}
  </motion.button>
</form>
```

---

## 11. Footer

### Content

**Keep**:
- Copyright: "© 2025 Yassir Aitali. All rights reserved."

**Remove**:
- ❌ "Built with React, TypeScript, and GSAP"
- ❌ "Conçu avec React, TypeScript et GSAP"
- ❌ Heart icon

### Implementation

```tsx
<footer className="bg-dark-900 border-t border-dark-800 py-8">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center text-dark-400">
      <p>© 2025 Yassir Aitali. {t('footer.rights')}</p>
    </div>
  </div>
</footer>
```

---

## 12. File Structure

```
portfolio/
├── public/
│   ├── certificates/
│   │   ├── Yasser Aitali - IDC CERTIFICATE_page-0001.jpg
│   │   └── Advanced Spring Cloud Microservices & Deployment with Docker_page-0001.jpg
│   ├── YASSIR AITALI_Final_ENG.pdf
│   └── YASSIR AITALI_Final.pdf
├── src/
│   ├── components/
│   │   ├── Navigation.tsx
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Experience.tsx
│   │   ├── Education.tsx
│   │   ├── Certificates.tsx
│   │   ├── Projects.tsx
│   │   ├── Skills.tsx
│   │   ├── Contact.tsx
│   │   ├── Footer.tsx
│   │   └── ScrollProgress.tsx
│   ├── i18n/
│   │   ├── config.ts
│   │   └── locales/
│   │       ├── en.json
│   │       └── fr.json
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.ts
```

---

## 13. Design & Animations

### Color Scheme

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        dark: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        }
      }
    }
  }
}
```

### Glassmorphism Effect

```css
.glass-effect {
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(59, 130, 246, 0.1);
}
```

### Animation Configurations

#### GSAP Scroll Animations
```tsx
gsap.from('.fade-in-element', {
  opacity: 0,
  y: 50,
  duration: 1,
  scrollTrigger: {
    trigger: '.fade-in-element',
    start: 'top 80%',
    end: 'bottom 20%',
    toggleActions: 'play none none reverse'
  }
});
```

#### Framer Motion Variants
```tsx
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};
```

### Hover Effects

```tsx
// Button Hover
<motion.button
  whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(59, 130, 246, 0.3)' }}
  whileTap={{ scale: 0.95 }}
  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
>

// Card Hover
<motion.div
  whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)' }}
  transition={{ duration: 0.3 }}
>
```

---

## 14. Implementation Checklist

### Setup Phase
- [ ] Initialize React + TypeScript + Vite project
- [ ] Install dependencies:
  ```bash
  npm install gsap @gsap/react framer-motion i18next react-i18next lucide-react react-intersection-observer
  npm install -D tailwindcss postcss autoprefixer
  npx tailwindcss init -p
  ```
- [ ] Configure Tailwind CSS with custom colors
- [ ] Set up PostCSS configuration
- [ ] Configure TypeScript (tsconfig.json)

### i18n Setup
- [ ] Create `src/i18n/config.ts`
- [ ] Create `src/i18n/locales/en.json`
- [ ] Create `src/i18n/locales/fr.json`
- [ ] Add all translation keys (200+ keys)
- [ ] Test language switching

### Component Development

#### Navigation
- [ ] Create Navigation component
- [ ] Implement glassmorphism effect
- [ ] Add centered pill navigation
- [ ] Fix French text wrapping issue
- [ ] Add language toggle button
- [ ] Create mobile hamburger menu
- [ ] Add smooth scroll navigation

#### Announcement Banner
- [ ] Create announcement component
- [ ] Position below navigation
- [ ] Add close button with animation
- [ ] Implement AnimatePresence for exit
- [ ] Add CTA button scroll to contact
- [ ] Translate all content

#### Hero Section
- [ ] Adjust padding for announcement
- [ ] Add name, title, subtitle
- [ ] Create three CTA buttons
- [ ] **Implement CV download functionality**
- [ ] Add Download icon from lucide-react
- [ ] Test language-based file switching
- [ ] Add background animations

#### About Section
- [ ] Update professional description
- [ ] Translate full description
- [ ] Create statistics cards
- [ ] Add animations

#### Experience Section
- [ ] Create timeline layout
- [ ] Fix vertical line positioning
- [ ] Add 3 positions with achievements
- [ ] Translate all content
- [ ] Add scroll animations

#### Education Section
- [ ] **Create new Education section**
- [ ] Use timeline layout similar to Experience
- [ ] Add 4 educational entries
- [ ] Include specializations
- [ ] Translate all content

#### Certificates Section
- [ ] Create certificate interface
- [ ] **Remove GSAP animations** ⚠️
- [ ] Implement featured certificates section
- [ ] Add diploma images to public folder
- [ ] Create 2-column grid for featured
- [ ] Style yellow "Featured" badge
- [ ] Add ZoomIn icon indicator
- [ ] **Implement lightbox modal**
- [ ] Add close button and click-outside
- [ ] Create regular certificates grid (3 columns)
- [ ] Add 10 regular certificates with links
- [ ] Add "View All" button to LinkedIn
- [ ] Test all links and images
- [ ] Translate section headers

#### Projects Section
- [ ] Change title from "Academic Projects" to "Projects"
- [ ] **Replace image placeholders with icons**
- [ ] Map appropriate icons to projects
- [ ] Add 3 featured projects
- [ ] Add yellow featured badges
- [ ] Add 3 additional projects
- [ ] Remove "Click to learn more" text
- [ ] Remove two-letter abbreviations
- [ ] Add year badges
- [ ] Create project modal
- [ ] Add GitHub links
- [ ] Translate all content

#### Skills Section
- [ ] Create 5 skill categories
- [ ] Add skill bars or cards
- [ ] Animate on scroll
- [ ] Translate category names

#### Contact Section
- [ ] Add contact information
- [ ] **Make email clickable with mailto**
- [ ] Add hover effect to email
- [ ] Add social links (GitHub, LinkedIn)
- [ ] Create contact form
- [ ] **Remove all placeholder text** ⚠️
- [ ] Add form validation
- [ ] Translate labels and buttons

#### Footer
- [ ] Add copyright notice
- [ ] **Remove "Built with..." text** ⚠️
- [ ] **Remove heart icon** ⚠️
- [ ] Center align
- [ ] Translate copyright text

### Assets & Files
- [ ] Add CV PDF files to public folder
  - [ ] YASSIR AITALI_Final_ENG.pdf
  - [ ] YASSIR AITALI_Final.pdf
- [ ] Add certificate diploma images
  - [ ] Yasser Aitali - IDC CERTIFICATE_page-0001.jpg
  - [ ] Advanced Spring Cloud Microservices & Deployment with Docker_page-0001.jpg
- [ ] Optimize all images
- [ ] Test all file paths

### Testing
- [ ] Test on Chrome
- [ ] Test on Firefox
- [ ] Test on Safari
- [ ] Test on Edge
- [ ] Test on mobile devices
- [ ] Test language switching
- [ ] Test all navigation links
- [ ] Test all external links
- [ ] Test CV downloads in both languages
- [ ] Test certificate lightbox
- [ ] Test contact form
- [ ] Test announcement banner close
- [ ] Verify responsive layouts
- [ ] Check for console errors
- [ ] Test performance (Lighthouse)

### Optimization
- [ ] Optimize bundle size
- [ ] Lazy load images
- [ ] Code splitting
- [ ] Minify CSS/JS
- [ ] Compress images
- [ ] Add meta tags for SEO
- [ ] Add Open Graph tags
- [ ] Test loading speed

### Deployment
- [ ] Build production version
- [ ] Test production build locally
- [ ] Deploy to Vercel/Netlify
- [ ] Configure custom domain (optional)
- [ ] Test deployed version
- [ ] Monitor for errors
- [ ] Set up analytics (optional)

---

## 15. Common Issues & Solutions

### Issue: Certificates Invisible

**Problem**: GSAP setting opacity: 0  
**Solution**: Remove GSAP animations from Certificates component, use only Framer Motion

```tsx
// ❌ Don't do this:
useEffect(() => {
  gsap.from('.certificate-card', { opacity: 0, y: 50 });
}, []);

// ✅ Do this instead:
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={inView ? { opacity: 1, y: 0 } : {}}
/>
```

### Issue: French Navigation Wrapping

**Problem**: "À propos" wraps to new line  
**Solution**: Add flex-nowrap and whitespace-nowrap

```tsx
<div className="flex items-center space-x-1 flex-nowrap">
  <button className="whitespace-nowrap px-3 text-xs lg:text-sm">
```

### Issue: Featured Badge Shows Translation Key

**Problem**: Showing "certificates.featuredBadge"  
**Solution**: Hardcode the text, don't use translation

```tsx
// ❌ Don't do this:
<span>{t('certificates.featuredBadge')}</span>

// ✅ Do this:
<span>⭐ Featured</span>
```

### Issue: Announcement Banner Overlaps Content

**Problem**: Hero content hidden behind banner  
**Solution**: Add padding to Hero section

```tsx
<section className="pt-48 md:pt-56">
```

### Issue: CV Download Not Working

**Problem**: File not found  
**Solution**: Files must be in public folder, paths start with `/`

```tsx
const cvFile = `/YASSIR AITALI_Final_${i18n.language === 'en' ? 'ENG' : ''}.pdf`;
```

---

## 16. Final Notes

### Personal Information to Replace

When applying to another portfolio, replace:

- **Name**: Yassir Aitali
- **Email**: yasseraitali@outlook.fr
- **Phone**: +212 6 61 98 18 90
- **Location**: Marrakech, Morocco
- **GitHub**: https://github.com/YasserAet/
- **LinkedIn**: https://www.linkedin.com/in/aitali-yassir/
- **All experience entries**
- **All education entries**
- **All certificate data**
- **All project data**
- **CV PDF files**
- **Certificate images**

### Critical Success Factors

1. ✅ Remove all GSAP from Certificates component
2. ✅ Use object-contain for certificate images
3. ✅ Hardcode "Featured" badges (no translation)
4. ✅ Add flex-nowrap to navigation
5. ✅ Remove placeholder text from contact form
6. ✅ Add CV download with language switching
7. ✅ Create lightbox modal for certificates
8. ✅ Replace project images with icons
9. ✅ Make announcement banner collapsible
10. ✅ Clean up footer text

### Performance Targets

- First Contentful Paint: < 1.5s
- Time to Interactive: < 3s
- Lighthouse Score: > 90
- Bundle Size: < 500KB (gzipped)

---

**Document Version**: 1.0  
**Last Updated**: November 27, 2025  
**Author**: Yassir Aitali Portfolio Team

---

## Questions or Issues?

If you encounter any problems implementing these customizations:

1. Check the console for errors
2. Verify all file paths are correct
3. Clear browser cache (Ctrl + Shift + R)
4. Check that all dependencies are installed
5. Verify translation keys exist in both en.json and fr.json
6. Test on a different browser/device

**Good luck with your portfolio customization!** 🚀
