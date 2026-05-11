import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { CodeXml, ExternalLink } from 'lucide-react';
import './Projects.css';

const ProjectCard = ({ project }) => {
  const { t } = useTranslation();
  const cardRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "center center", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const scale = useTransform(smoothProgress, [0.05, 0.2, 0.8, 0.95], [0.9, 1, 1, 0.9]);
  const opacity = useTransform(smoothProgress, [0.05, 0.2, 0.8, 0.95], [0, 1, 1, 0]);
  const blur = useTransform(smoothProgress, [0.05, 0.2, 0.8, 0.95], ["blur(8px)", "blur(0px)", "blur(0px)", "blur(8px)"]);
  const y = useTransform(smoothProgress, [0.05, 0.2, 0.8, 0.95], [40, 0, 0, -40]);

  return (
    <motion.div
      ref={cardRef}
      className="project-giant-card glass-panel"
      style={{ scale, opacity, filter: blur, y }}
    >
      <div className="project-giant-content">
        <h3 className="project-giant-title">{t(`projects.items.${project.id}.title`)}</h3>
        <p className="project-giant-desc">{t(`projects.items.${project.id}.desc`)}</p>
        <div className="project-giant-footer">
          <div className="project-tags">
            {project.tags.map(tag => (
              <span key={tag} className="tag-capsule">{tag}</span>
            ))}
          </div>
          {(project.website || project.github || (project.demo && project.demo !== '#')) && (
            <div className="project-giant-links">
              {project.website && <a href={project.website} target="_blank" rel="noreferrer" aria-label="Website"><ExternalLink size={28} /></a>}
              {project.github && <a href={project.github} target="_blank" rel="noreferrer" aria-label="GitHub"><CodeXml size={28} /></a>}
              {project.demo && project.demo !== '#' && <a href={project.demo} target="_blank" rel="noreferrer" aria-label="Demo"><ExternalLink size={28} /></a>}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const { scrollYProgress: headerScroll } = useScroll({
    target: headerRef,
    offset: ["start end", "center center", "end start"]
  });

  const headerOpacity = useTransform(headerScroll, [0.05, 0.2, 0.8, 0.95], [0, 1, 1, 0]);
  const headerY = useTransform(headerScroll, [0.05, 0.2, 0.8, 0.95], [20, 0, 0, -20]);
  const headerBlur = useTransform(headerScroll, [0.05, 0.2, 0.8, 0.95], ["blur(8px)", "blur(0px)", "blur(0px)", "blur(8px)"]);

  const projectsList = [
    {
      id: 'smc',
      tags: ['SMC', 'Genomics', 'C++', 'Privacy'],
      github: 'https://github.com/FRASCOH/SMC-editdistance-genomic',
      demo: '#'
    },
    {
      id: 'cti',
      tags: ['Cyber Threat Intelligence', 'SIEM', 'QRadar', 'IBM']
    },
    {
      id: 'viewer',
      tags: ['VR', 'Unity3D', 'C#', 'Android']
    },
    {
      id: 'acn',
      tags: ['Python', 'Automation', 'NIS2', 'ACN', 'Actions'],
      github: 'https://github.com/FRASCOH/monitor-acn-nis2',
      website: 'https://frascoh.github.io/monitor-acn-nis2/'
    }
  ];

  return (
    <section className="projects-section" id="projects" ref={sectionRef}>
      <div className="content-container">
        <motion.div
          ref={headerRef}
          className="projects-header"
          style={{ opacity: headerOpacity, y: headerY, filter: headerBlur }}
        >
          <h2 className="section-title text-gradient">{t('projects.title')}</h2>
          <a href="https://github.com/FRASCOH" target="_blank" rel="noreferrer" className="btn btn-secondary">
            {t('projects.view_all')}
          </a>
        </motion.div>

        <div className="projects-list-giant">
          {projectsList.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
