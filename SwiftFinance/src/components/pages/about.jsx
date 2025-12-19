import AboutView1 from '../views/homeviews/aboutviews/aboutview1'
import AboutView2 from '../views/homeviews/aboutviews/aboutview2'

const About = () => {
  return (
    <main style={{
      padding: '1.5rem',
      background: 'var(--card)',
      borderRadius: '8px'
    }}>
      <h1 style={{
        fontSize: '3rem',
        fontWeight: 'bold',
        color: 'var(--mint)',
        marginBottom: '2rem'
      }}>About SwiftFinance</h1>
      <AboutView1 />
      <AboutView2 />
    </main>
  )
}

export default About
