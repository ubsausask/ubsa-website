import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  FaUsers, FaHandshake, FaCalendarAlt, 
  FaGraduationCap, FaQuoteLeft, FaHistory, FaArrowRight, FaFileContract 
} from 'react-icons/fa';
import '../style/About.css';

// --- IMAGE IMPORTS: 2026-2027 EXECUTIVES ---
import AdeebImg from '../assets/Exec2026-2027/adeeb.png';
import FatimaImg from '../assets/Exec2026-2027/fatima.png';
import MayaImg from '../assets/Exec2026-2027/maya.png';
import TalhaImg from '../assets/Exec2026-2027/talha.png';
import TanzeebImg from '../assets/Exec2026-2027/tanzeeb.jpg';
import WafeeqaImg from '../assets/Exec2026-2027/wafeeqa.jpg';

// --- IMAGE IMPORTS: 2025-2026 PAST EXECUTIVES ---
import PresidentImg from '../assets/Team/Rubana_Sayeda.png';
import VPImg from '../assets/Team/Nusrat_Ahona.png';
import FinanceImg from '../assets/Team/Mohammed_Khan.png';
import EventDirImg from '../assets/Team/Rodoshy_Prithibi.png';
import EventCoordImg from '../assets/Team/Ishrat_Maya.png';
import OutreachImg from '../assets/Team/Rab_Ahmed_Rwna.png';
import SocialImg from '../assets/Team/Abir_Khan.png';

export default function About() {
  const [selectedTerm, setSelectedTerm] = useState('2026-2027');
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [stats, setStats] = useState({ members: 0, sponsors: 0 });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Static site: use deterministic demo stats
    setStats({ members: 500, sponsors: 15 });
    setLoading(false);
  }, []);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const handleTermChange = (term) => {
    setSelectedTerm(term);
    setExpandedIndex(null);
  };

  const currentTeam = selectedTerm === '2026-2027' ? TEAM_2026_2027 : TEAM_2025_2026;
  const isPast = selectedTerm === '2025-2026';
  const president = currentTeam[0];
  const teamList = currentTeam.slice(1);

  return (
    <div className="about-page-wrapper">
      <div className="about-content">
        
        {/* SECTION 1: MOTIVE */}
        <section className="mission-section">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            className="glass-screen mission-card motive-themed"
          >
             <h2 className="text-highlight"><FaQuoteLeft /> Our Motive</h2>
             <p>
               UBSA aims to support the unique needs of Bangladeshi undergraduate students at USask. 
               We bridge the gap between tradition and campus life, helping students navigate university 
               services and cultural representation.
             </p>
             <button 
                className="btn-constitution-link"
                onClick={() => navigate('/constitution')}
             >
               <FaFileContract /> Read Our Constitution
             </button>
          </motion.div>
        </section>

        {/* SECTION 2: EXECUTIVES */}
        <section className="team-section">
          <h2 className="section-title">
            {isPast ? (
              <>Past Executive Team <span className="text-highlight-red">(2025–2026)</span></>
            ) : (
              <>Meet the <span className="text-highlight-red">Executive Team</span></>
            )}
          </h2>

          <AnimatePresence mode="wait">
            <motion.div 
              key={selectedTerm}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              {/* Featured President Card */}
              {president && (
                <div className="president-featured-row">
                  <motion.div className="glass-screen president-big-card" whileHover={{ scale: 1.01 }}>
                    <div className="pres-layout">
                      <img src={president.image} alt={president.name} className="pres-img" />
                      <div className="pres-info">
                        <span className="role-tag-gold">{president.role}</span>
                        <h3>{president.name}</h3>
                        <p className="dept-text"><FaGraduationCap /> {president.dept}</p>
                        <p className="punchline">"{president.punchline}"</p>
                        <p className="pres-bio">{president.bio}</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              )}

              {/* Team Grid */}
              <div className="team-grid-3-col">
                {teamList.map((member, index) => (
                  <motion.div 
                    key={index}
                    layout
                    onClick={() => toggleExpand(index)}
                    className={`glass-screen team-card-small ${expandedIndex === index ? 'expanded' : ''}`}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  >
                    <div className="card-header-simple">
                      <img src={member.image} alt={member.name} className="mini-img-small" />
                      <div className="mini-meta">
                        <span className="mini-role">{member.role}</span>
                        <h4>{member.name}</h4>
                        
                        <AnimatePresence>
                          {expandedIndex === index && (
                            <motion.div 
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="expand-details"
                            >
                              <hr className="detail-divider" />
                              <p className="dept-text"><FaGraduationCap /> {member.dept}</p>
                              <p className="punchline-small">"{member.punchline}"</p>
                              <p className="bio-text">{member.bio}</p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Bottom Action Button to switch */}
          <div className="past-exec-bottom-toggle">
            {!isPast ? (
              <button 
                className="btn-past-exec"
                onClick={() => handleTermChange('2025-2026')}
              >
                <FaHistory /> Past Exec 2025–2026
              </button>
            ) : (
              <button 
                className="btn-past-exec"
                onClick={() => handleTermChange('2026-2027')}
              >
                <FaUsers /> Back to Current Exec 2026–2027
              </button>
            )}
          </div>
        </section>

      </div>
    </div>
  );
}

const TEAM_2026_2027 = [
  { 
    name: "Ishrat Jahan Maya", 
    role: "President", 
    dept: "Biochemistry, Microbiology, and Immunology", 
    punchline: "Shaping the vision, empowering the team, and bringing UBSA's ideas to life.", 
    bio: "Leading UBSA with vision, fostering community growth, and bringing collaborative ideas to life.", 
    image: MayaImg 
  },
  { 
    name: "Talha Chowdhary", 
    role: "Vice President", 
    dept: "Chemical Engineering", 
    punchline: "Bridging culture, community, and opportunity.", 
    bio: "Supporting executive coordination, member advocacy, and strategic partnerships across campus.", 
    image: TalhaImg 
  },
  { 
    name: "Tanzeeb Rashid", 
    role: "Director of Finance", 
    dept: "Finance", 
    punchline: "Keeping our finances balanced and our goals ambitious.", 
    bio: "Managing club finances, transparent budgeting, and resource planning for all club initiatives.", 
    image: TanzeebImg 
  },
  { 
    name: "Fatima Jahanara", 
    role: "Director of Events", 
    dept: "Biomedical Sciences", 
    punchline: "Connecting people, creating experiences, and making an impact.", 
    bio: "Designing and organizing memorable cultural, academic, and social experiences for students.", 
    image: FatimaImg 
  },
  { 
    name: "Adeeb Adnan", 
    role: "Director of Outreach", 
    dept: "Computer Science", 
    punchline: "Turning connections into partnerships and partnerships into progress.", 
    bio: "Building meaningful relationships with sponsors, campus organizations, and community partners.", 
    image: AdeebImg 
  },
  { 
    name: "Wafeeqa Haque", 
    role: "Director of Socials", 
    dept: "Biomedical Sciences", 
    punchline: "Capturing our moments, sharing our culture, and keeping our community connected.", 
    bio: "Managing creative media, social channels, and student engagement to celebrate our vibrant culture.", 
    image: WafeeqaImg 
  }
];

const TEAM_2025_2026 = [
  { name: "Rubana Syeda", role: "President", dept: "Computer Science", punchline: "Debugging the blueprint for club success.", bio: "Oversees all positions and prepares the annual report.", image: PresidentImg },
  { name: "Nusrat Ahona", role: "Vice President", dept: "Economics", punchline: "Leading with vision, uniting with passion.", bio: "Manages administrative tasks and internal coordination.", image: VPImg },
  { name: "Mohammed Khan", role: "Finance Director", dept: "Env. Geoscience", punchline: "Making every contribution count.", bio: "Manages funds and presents financial statements.", image: FinanceImg },
  { name: "Rodoshy Prithibi", role: "Event Director", dept: "Psychology", punchline: "Turning cultural ideas into reality.", bio: "Plans and organizes cultural and social activities.", image: EventDirImg },
  { name: "Ishrat Maya", role: "Event Coordinator", dept: "Biomedical Sciences", punchline: "Coordinating the art of perfect events.", bio: "Recruits volunteers and manages logistics.", image: EventCoordImg },
  { name: "Rab Ahmed Rawna", role: "Outreach Director", dept: "Economics", punchline: "Building bridges beyond the campus.", bio: "Coordinates outside relations and partnerships.", image: OutreachImg },
  { name: "Abir Khan", role: "Social Director", dept: "Biomedical Sciences", punchline: "Creating social vibes that stick.", bio: "Manages social media presence and promotes activities.", image: SocialImg }
];
