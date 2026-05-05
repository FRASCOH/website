import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { CodeXml, ExternalLink } from 'lucide-react';
import './Projects.css';

const Projects = () => {
  const { t } = useTranslation();

  const projectsList = [
    {
      id: 'smc',
      tags: ['SMC', 'Genomics', 'C++', 'Privacy'],
      github: 'https://github.com/FRASCOH',
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
      github: 'https://github.com/FRASCOH/monitor-acn-nis2'
    }
  ];

  const headerVariants = {
    hidden: { opacity: 0, x: -30, filter: 'blur(10px)' },
    visible: { 
      opacity: 1, 
      x: 0, 
      filter: 'blur(0px)',
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 60, filter: 'blur(15px)', scale: 0.95 },
    visible: (i) => ({ 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)', 
      scale: 1,
      transition: { 
        duration: 1, 
        delay: i * 0.15,
        ease: [0.16, 1, 0.3, 1] 
      }
    })
  };

  return (
    <section className="projects-section" id="projects">
      <div className="content-container">
        <motion.div 
          className="projects-header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={headerVariants}
        >
          <h2 className="section-title text-gradient">{t('projects.title')}</h2>
          <a href="https://github.com/FRASCOH" target="_blank" rel="noreferrer" className="btn btn-secondary">
            {t('projects.view_all')}
          </a>
        </motion.div>

        <div className="projects-list-giant">
          {projectsList.map((project, index) => (
            <motion.div 
              key={project.id}
              className="project-giant-card glass-panel"
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={cardVariants}
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
                  {(project.github || (project.demo && project.demo !== '#')) && (
                    <div className="project-giant-links">
                      {project.github && <a href={project.github} target="_blank" rel="noreferrer" aria-label="GitHub"><CodeXml size={28} /></a>}
                      {project.demo && project.demo !== '#' && <a href={project.demo} target="_blank" rel="noreferrer" aria-label="Demo"><ExternalLink size={28} /></a>}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
