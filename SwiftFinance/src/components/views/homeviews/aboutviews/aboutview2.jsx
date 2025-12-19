const AboutView2 = () => {
  const team = [
    { role: 'Founder & CEO', name: 'Dr. Alex Chen', bio: 'AI researcher with 10+ years in NLP and legal tech.' },
    { role: 'Chief Legal Officer', name: 'Jane Morrison, Esq.', bio: 'Former corporate lawyer specializing in M&A and compliance.' },
    { role: 'CTO', name: 'Marcus Williams', bio: 'Full-stack engineer building scalable AI solutions.' },
    { role: 'Head of Product', name: 'Sarah Johnson', bio: 'Product strategist passionate about improving legal workflows.' },
  ]

  return (
    <section className="slide-up bg-law-darker rounded-lg p-8">
      <h3 className="text-law-accent text-2xl font-bold mb-8 text-center">Our Team</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {team.map((member, idx) => (
          <div key={idx} className="bg-law-card border-t-4 border-law-accent rounded p-6 text-center">
            <h4 className="text-law-accent font-bold mb-1">{member.name}</h4>
            <p className="text-law-accent text-sm font-bold mb-3">{member.role}</p>
            <p className="text-law-muted text-sm leading-relaxed">{member.bio}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default AboutView2
