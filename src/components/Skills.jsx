import { motion } from 'framer-motion'
import { skillGroups } from '../data'
import { SplitText } from './SplitText'
import SkillSphere from './SkillSphere'
import TiltCard from './TiltCard'

export default function Skills() {
  return (
    <section id="skills" className="section">
      <div className="wrap">
        <p className="kicker mono">02 — ARSENAL</p>
        <SplitText as="h2" className="h2" text="Tools I reach for." />

        <div className="skills-grid">
          <motion.div
            initial={{ opacity: 0, scale: 0.6, rotate: -20 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 1.2, ease: [0.2, 0.7, 0.1, 1] }}
          >
            <SkillSphere />
          </motion.div>

          <div className="skill-groups">
            {skillGroups.map((g, gi) => (
              <TiltCard key={g.title} className="glass skill-card" intensity={9}>
                <h3 className="mono" style={{ transform: 'translateZ(30px)' }}>
                  {g.title}
                </h3>
                <ul style={{ transform: 'translateZ(20px)' }}>
                  {g.items.map((item, i) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, y: 14, scale: 0.8 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: gi * 0.08 + i * 0.06, type: 'spring', stiffness: 160, damping: 14 }}
                    >
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </TiltCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
