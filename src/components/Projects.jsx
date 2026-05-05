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

  return (
    <section className="projects-section" id="projects">
      <div className="content-container">
        <motion.div 
          className="projects-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
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
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
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
