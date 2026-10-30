import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Globe, Apple, CodeXml, ExternalLink, ArrowUpRight, Send } from 'lucide-react';
import { useHackerMode } from '../context/HackerContext';
import './Projects.css';

const Projects = () => {
  const { t } = useTranslation();
  const { toLeet } = useHackerMode();
  const sectionRef = useRef(null);
  const headerRef = useRef(null);

  const { scrollYProgress: headerScroll } = useScroll({
    target: headerRef,
    offset: ["start end", "center center", "end start"]
  });

  const headerOpacity = useTransform(headerScroll, [0.05, 0.2, 0.8, 0.95], [0, 1, 1, 0]);
  const headerY = useTransform(headerScroll, [0.05, 0.2, 0.8, 0.95], [20, 0, 0, -20]);
  const headerBlur = useTransform(headerScroll, [0.05, 0.2, 0.8, 0.95], ["blur(8px)", "blur(0px)", "blur(0px)", "blur(8px)"]);

  // 1. First & Flagship Project: Monitor ACN NIS2 (Cross-Platform)
  const featuredProject = {
    id: 'acn',
    tags: ['NIS2', 'ACN', 'Python', 'iOS', 'Telegram', 'Automation'],
    portal: 'https://frascoh.github.io/monitor-acn-nis2/',
    telegram: 'https://t.me/monitor_acn_nis2',
    appstore: 'https://apps.apple.com/au/app/nis2-cyber-monitor/id6823586798',
    github: 'https://github.com/FRASCOH/monitor-acn-nis2'
  };

  // 2. Compact Grid Projects
  const compactProjects = [
    {
      id: 'cybernews',
      tags: ['iOS', 'Swift', 'Threat Intel', 'NIS2', 'Widgets'],
      github: 'https://github.com/FRASCOH/cybernews'
    },
    {
      id: 'gdpr_guard',
      tags: ['Python', 'NLP', 'GDPR', 'Streamlit', 'CLI'],
      github: 'https://github.com/FRASCOH/GDPR-Guard-Automated-PII-Anonymizer'
    },
    {
      id: 'password_cracking',
      tags: ['Cybersecurity', 'Hashcat', 'Python', 'Entropy'],
      github: 'https://github.com/FRASCOH/Password-Cracking-Rig'
    },
    {
      id: 'smc',
      tags: ['SMC', 'Genomics', 'C++', 'Privacy'],
      github: 'https://github.com/FRASCOH/SMC-editdistance-genomic'
    },
    {
      id: 'cti',
      tags: ['Threat Intel', 'SIEM', 'QRadar', 'IBM']
    },
    {
      id: 'viewer',
      tags: ['VR', 'Unity3D', 'C#', 'Android']
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
          <div>
            <h2 className="section-title text-gradient">{t('projects.title')}</h2>
          </div>
          <a 
            href="https://github.com/FRASCOH" 
            target="_blank" 
            rel="noreferrer" 
            className="btn btn-secondary font-mono"
          >
            {t('projects.view_all')}
          </a>
        </motion.div>

        {/* FEATURED PROJECT: Monitor ACN NIS2 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="project-featured-card glass-panel"
        >
          <div className="featured-card-header">
            <div className="featured-badge font-mono">
              <span className="live-pulse-dot" />
              {t('projects.featured_badge')}
            </div>
            <span className="featured-category font-mono">
              {t(`projects.items.${featuredProject.id}.category`)}
            </span>
          </div>

          <div className="featured-card-body">
            <div className="featured-main-info">
              <h3 className="featured-title">
                {toLeet(t(`projects.items.${featuredProject.id}.title`))}
              </h3>
              <p className="featured-subtitle font-mono">
                {t(`projects.items.${featuredProject.id}.subtitle`)}
              </p>
              <p className="featured-desc">
                {t(`projects.items.${featuredProject.id}.desc`)}
              </p>

              <div className="project-tags">
                {featuredProject.tags.map(tag => (
                  <span key={tag} className="tag-capsule">{tag}</span>
                ))}
              </div>
            </div>

            <div className="featured-actions-panel">
              <span className="actions-panel-label font-mono">PLATFORMS & ECOSYSTEM</span>
              <div className="featured-links-grid">
                <a 
                  href={featuredProject.portal} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="featured-link-pill pill-portal"
                >
                  <div className="link-pill-left">
                    <Globe size={18} className="pill-icon" />
                    <span>{t('projects.links.portal')}</span>
                  </div>
                  <ArrowUpRight size={16} className="pill-arrow" />
                </a>

                <a 
                  href={featuredProject.telegram} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="featured-link-pill pill-telegram"
                >
                  <div className="link-pill-left">
                    <Send size={18} className="pill-icon" />
                    <span>{t('projects.links.telegram')}</span>
                  </div>
                  <ArrowUpRight size={16} className="pill-arrow" />
                </a>

                <a 
                  href={featuredProject.appstore} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="featured-link-pill pill-appstore"
                >
                  <div className="link-pill-left">
                    <Apple size={18} className="pill-icon" />
                    <span>{t('projects.links.appstore')}</span>
                  </div>
                  <ArrowUpRight size={16} className="pill-arrow" />
                </a>

                <a 
                  href={featuredProject.github} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="featured-link-pill pill-github"
                >
                  <div className="link-pill-left">
                    <CodeXml size={18} className="pill-icon" />
                    <span>{t('projects.links.github')}</span>
                  </div>
                  <ArrowUpRight size={16} className="pill-arrow" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* COMPACT PROJECTS GRID (CyberNews, GDPR Guard, Password Cracking, SMC, CTI, VieweR) */}
        <div className="projects-compact-grid">
          {compactProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: idx * 0.06 }}
              className="compact-project-card glass-panel"
            >
              <div className="compact-card-header">
                <span className="compact-card-category font-mono">
                  {t(`projects.items.${project.id}.category`)}
                </span>
                <div className="compact-card-links">
                  {project.github && (
                    <a 
                      href={project.github} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="compact-icon-link"
                      aria-label="GitHub"
                    >
                      <CodeXml size={17} />
                    </a>
                  )}
                  {project.demo && project.demo !== '#' && (
                    <a 
                      href={project.demo} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="compact-icon-link"
                      aria-label="Demo"
                    >
                      <ExternalLink size={17} />
                    </a>
                  )}
                </div>
              </div>

              <div className="compact-card-body">
                <h4 className="compact-card-title">
                  {toLeet(t(`projects.items.${project.id}.title`))}
                </h4>
                <p className="compact-card-desc">
                  {t(`projects.items.${project.id}.desc`)}
                </p>
              </div>

              <div className="compact-card-footer">
                <div className="project-tags">
                  {project.tags.map(tag => (
                    <span key={tag} className="tag-capsule mini">{tag}</span>
                  ))}
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
