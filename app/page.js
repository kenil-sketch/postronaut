'use client'
export const dynamic = 'force-dynamic'
import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
const supabase = createClient(supabaseUrl, supabaseKey)

const C = {
  black:"#080810", deep:"#0d0d1a", surface:"#12121f", card:"#17172a",
  border:"rgba(255,255,255,0.07)", orange:"#ff6b2b", amber:"#ffb347",
  sky:"#4fc3f7", text:"#e8e8f0", muted:"#7878a0", green:"#4ade80",
}

const PLATFORMS = [
  { id:"instagram", name:"Instagram" },
  { id:"x",         name:"X" },
  { id:"linkedin",  name:"LinkedIn" },
  { id:"youtube",   name:"YouTube" },
  { id:"reddit",    name:"Reddit" },
  { id:"facebook",  name:"Facebook" },
  { id:"threads",   name:"Threads" },
  { id:"pinterest", name:"Pinterest" },
]

const PLAN_PLATFORMS = {
  free:    ["instagram","facebook"],
  creator: ["instagram","facebook","x","linkedin","reddit","threads","pinterest"],
  founder: ["instagram","facebook","x","linkedin","youtube","reddit","threads","pinterest"],
  agency:  ["instagram","facebook","x","linkedin","youtube","reddit","threads","pinterest"],
}

const PLAN_LIMITS = { free:2, creator:8, founder:999, agency:999 }

const NAV = [
  { id:"overview",  icon:"📊", label:"Overview" },
  { id:"compose",   icon:"✍️", label:"Compose" },
  { id:"schedule",  icon:"📅", label:"Schedule" },
  { id:"accounts",  icon:"🔗", label:"Accounts" },
  { id:"analytics", icon:"📈", label:"Analytics" },
]

const SAMPLE_POSTS = []
const SAMPLE_ACCOUNTS = []

function PlatformIcon({ id, size=16 }) {
  const s = { width:size, height:size, flexShrink:0, display:"block" }
  const icons = {
    instagram: <svg style={s} viewBox="0 0 24 24" fill="none"><defs><linearGradient id="ig" x1="0" y1="24" x2="24" y2="0" gradientUnits="userSpaceOnUse"><stop offset="0%" stopColor="#f09433"/><stop offset="50%" stopColor="#dc2743"/><stop offset="100%" stopColor="#bc1888"/></linearGradient></defs><rect x="2" y="2" width="20" height="20" rx="5.5" stroke="url(#ig)" strokeWidth="2"/><circle cx="12" cy="12" r="4.5" stroke="url(#ig)" strokeWidth="2"/><circle cx="17.5" cy="6.5" r="1.2" fill="url(#ig)"/></svg>,
    x:         <svg style={s} viewBox="0 0 24 24" fill="white"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.736l7.73-8.835L1.254 2.25H8.08l4.261 5.633 5.903-5.633zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
    linkedin:  <svg style={s} viewBox="0 0 24 24" fill="#0077b5"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
    youtube:   <svg style={s} viewBox="0 0 24 24" fill="#FF0000"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>,
    reddit:    <svg style={s} viewBox="0 0 24 24" fill="#FF4500"><path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/></svg>,
    facebook:  <svg style={s} viewBox="0 0 24 24" fill="#1877F2"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>,
    threads:   <svg style={s} viewBox="0 0 24 24" fill="white"><path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 0 1 3.02.142c-.126-.742-.375-1.332-.75-1.757-.513-.583-1.289-.876-2.309-.876h-.029c-.87 0-1.668.24-2.274.679-.537.389-.881.924-.981 1.527l-2.006-.356c.19-1.175.793-2.178 1.763-2.89.945-.693 2.143-1.067 3.498-1.081h.045c1.497 0 2.758.44 3.648 1.272 1.04.966 1.579 2.444 1.602 4.391.005.08.006.155.006.23 0 .47-.032.913-.09 1.327.49.318.905.694 1.228 1.127.55.73.878 1.636.878 2.636 0 .148-.007.295-.022.44-.176 1.7-.97 3.2-2.264 4.418-1.534 1.443-3.687 2.18-6.368 2.196z"/></svg>,
    pinterest: <svg style={s} viewBox="0 0 24 24" fill="#E60023"><path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg>,
  }
  return icons[id] || null
}

const Btn = ({ children, onClick, variant="primary", size="md", disabled=false, style={} }) => {
  const base = { border:"none", borderRadius:10, fontWeight:600, transition:"all 0.2s", display:"inline-flex", alignItems:"center", gap:8, whiteSpace:"nowrap", opacity:disabled?0.5:1, cursor:disabled?"not-allowed":"pointer" }
  const sz = size==="sm"?{padding:"7px 14px",fontSize:13}:size==="lg"?{padding:"14px 32px",fontSize:16}:{padding:"10px 20px",fontSize:14}
  const v = variant==="primary"?{background:`linear-gradient(135deg,${C.orange},#e85a1a)`,color:"#fff",boxShadow:`0 0 24px rgba(255,107,43,0.25)`}:variant==="ghost"?{background:"transparent",color:C.text,border:`1px solid ${C.border}`}:variant==="danger"?{background:"rgba(255,107,107,0.1)",color:"#ff6b6b",border:"1px solid rgba(255,107,107,0.2)"}:{background:C.surface,color:C.text,border:`1px solid ${C.border}`}
  return <button onClick={disabled?undefined:onClick} style={{...base,...sz,...v,...style}}>{children}</button>
}

const Input = ({ value, onChange, placeholder, type="text", style={} }) => (
  <input type={type} value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder}
    style={{ width:"100%", background:C.surface, border:`1px solid ${C.border}`, borderRadius:10, color:C.text, fontSize:14, padding:"11px 14px", outline:"none", fontFamily:"'DM Sans',sans-serif", transition:"all 0.2s", ...style }} />
)

const Card = ({ children, style={}, onClick }) => (
  <div onClick={onClick} style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:16, ...style }}>{children}</div>
)

const EmptyState = ({ icon, title, sub, action, onAction }) => (
  <div style={{ textAlign:"center", padding:"60px 20px" }}>
    <div style={{ fontSize:52, marginBottom:16 }}>{icon}</div>
    <div style={{ fontFamily:"Syne,sans-serif", fontSize:18, fontWeight:700, color:"#fff", marginBottom:8 }}>{title}</div>
    <div style={{ fontSize:14, color:C.muted, marginBottom:24, lineHeight:1.6 }}>{sub}</div>
    {action && <Btn onClick={onAction}>{action}</Btn>}
  </div>
)

function ReviewForm({ onSignup }) {
  const [name, setName] = useState("")
  const [role, setRole] = useState("")
  const [review, setReview] = useState("")
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const submit = () => {
    if (!name.trim()||!review.trim()||rating===0){alert("Please fill in your name, rating and review!");return}
    setSubmitted(true)
  }
  if (submitted) return (
    <div style={{ background:C.card, border:`1px solid rgba(74,222,128,0.3)`, borderRadius:20, padding:40, textAlign:"center" }}>
      <div style={{ fontSize:56, marginBottom:16 }}>🎉</div>
      <h3 style={{ fontFamily:"Syne,sans-serif", fontSize:20, fontWeight:700, color:"#fff", marginBottom:12 }}>Thank you, {name}!</h3>
      <p style={{ fontSize:14, color:C.muted, lineHeight:1.7 }}>Your review has been submitted and will appear here once verified.</p>
    </div>
  )
  return (
    <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:20, padding:40 }}>
      <h3 style={{ fontFamily:"Syne,sans-serif", fontSize:18, fontWeight:700, color:"#fff", marginBottom:6 }}>Leave a review</h3>
      <p style={{ fontSize:13, color:C.muted, marginBottom:24 }}>Already using Postronaut? Share your experience.</p>
      <div style={{ marginBottom:20 }}>
        <label style={{ fontSize:12, color:C.muted, fontWeight:500, display:"block", marginBottom:10 }}>Your rating</label>
        <div style={{ display:"flex", gap:6 }}>
          {[1,2,3,4,5].map(star=>(
            <span key={star} onClick={()=>setRating(star)} onMouseEnter={()=>setHover(star)} onMouseLeave={()=>setHover(0)}
              style={{ fontSize:32, cursor:"pointer", color:(hover||rating)>=star?"#ffb347":"rgba(255,255,255,0.15)", transition:"all 0.1s" }}>★</span>
          ))}
        </div>
      </div>
      <div style={{ marginBottom:14 }}><label style={{ fontSize:12, color:C.muted, fontWeight:500, display:"block", marginBottom:7 }}>Your name</label><Input value={name} onChange={setName} placeholder="Jane Smith"/></div>
      <div style={{ marginBottom:14 }}><label style={{ fontSize:12, color:C.muted, fontWeight:500, display:"block", marginBottom:7 }}>Your role (optional)</label><Input value={role} onChange={setRole} placeholder="e.g. Founder at MyStartup"/></div>
      <div style={{ marginBottom:24 }}>
        <label style={{ fontSize:12, color:C.muted, fontWeight:500, display:"block", marginBottom:7 }}>Your review</label>
        <textarea value={review} onChange={e=>setReview(e.target.value)} placeholder="Share what you love about Postronaut..."
          style={{ width:"100%", minHeight:100, padding:"11px 14px", background:C.surface, border:`1px solid ${C.border}`, borderRadius:10, color:C.text, fontSize:14, fontFamily:"'DM Sans',sans-serif", outline:"none", resize:"none" }}/>
      </div>
      <Btn onClick={submit} style={{ width:"100%", justifyContent:"center", borderRadius:10, padding:"13px" }}>Submit Review →</Btn>
      <p style={{ fontSize:12, color:C.muted, marginTop:12, textAlign:"center" }}>
        No account yet? <span onClick={onSignup} style={{ color:C.orange, cursor:"pointer" }}>Try it free first →</span>
      </p>
    </div>
  )
}

function LandingPage({ onLogin, onSignup }) {
  const [email, setEmail] = useState("")
  const [joined, setJoined] = useState(false)
  const [stars, setStars] = useState([])
  useEffect(() => {
    setStars(Array.from({length:100},(_,i)=>({ id:i, left:Math.random()*100, top:Math.random()*100, size:Math.random()>0.8?2.5:1.5, d:2+Math.random()*5, delay:Math.random()*6, op:0.1+Math.random()*0.5 })))
  }, [])

  return (
    <div style={{ height:"100vh", overflow:"auto", background:C.black, position:"relative" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
        @keyframes twinkle{0%,100%{opacity:0.2}50%{opacity:0.9}}
        @keyframes spin{from{transform:translate(-50%,-50%) rotate(0deg)}to{transform:translate(-50%,-50%) rotate(360deg)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        .fu{animation:fadeUp 0.7s ease both}.fu1{animation:fadeUp 0.7s 0.1s ease both}
        .fu2{animation:fadeUp 0.7s 0.2s ease both}.fu3{animation:fadeUp 0.7s 0.3s ease both}.fu4{animation:fadeUp 0.7s 0.4s ease both}
      `}</style>
      <div style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:0, overflow:"hidden" }}>
        {stars.map(s=>(<div key={s.id} style={{ position:"absolute", left:`${s.left}%`, top:`${s.top}%`, width:s.size, height:s.size, borderRadius:"50%", background:"#fff", animation:`twinkle ${s.d}s ${s.delay}s ease-in-out infinite`, opacity:s.op }} />))}
      </div>
      <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:100, display:"flex", alignItems:"center", justifyContent:"space-between", padding:"16px 48px", background:"rgba(8,8,16,0.85)", backdropFilter:"blur(16px)", borderBottom:`1px solid ${C.border}` }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <div style={{ width:34, height:34, background:`linear-gradient(135deg,${C.orange},${C.amber})`, borderRadius:9, display:"flex", alignItems:"center", justifyContent:"center", fontSize:16 }}>🚀</div>
          <span style={{ fontFamily:"Syne,sans-serif", fontWeight:800, fontSize:19, color:"#fff" }}>Post<span style={{color:C.orange}}>ronaut</span></span>
        </div>
        <div style={{ display:"flex", gap:10 }}>
          <Btn variant="ghost" size="sm" onClick={onLogin}>Log in</Btn>
          <Btn size="sm" onClick={onSignup}>Start free →</Btn>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ position:"relative", zIndex:1, minHeight:"100vh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", textAlign:"center", padding:"120px 24px 80px", overflow:"hidden" }}>
        {[600,900,1200].map((size,i)=>(<div key={size} style={{ position:"absolute", width:size, height:size, borderRadius:"50%", border:`1px solid rgba(255,107,43,${0.08-i*0.02})`, top:"50%", left:"50%", animation:`spin ${40+i*25}s linear infinite${i===1?" reverse":""}`, pointerEvents:"none" }} />))}
        <div style={{ position:"absolute", width:600, height:600, borderRadius:"50%", background:"radial-gradient(circle,rgba(255,107,43,0.1) 0%,transparent 70%)", top:"50%", left:"50%", transform:"translate(-50%,-50%)", pointerEvents:"none" }} />
        <div className="fu" style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(255,107,43,0.1)", border:"1px solid rgba(255,107,43,0.25)", borderRadius:100, padding:"6px 16px", fontSize:13, color:C.amber, marginBottom:28, fontWeight:500 }}>
          <div style={{ width:6, height:6, borderRadius:"50%", background:C.orange }} />
          Social media scheduler built for founders & creators
        </div>
        <h1 className="fu1" style={{ fontFamily:"Syne,sans-serif", fontWeight:800, fontSize:"clamp(44px,7vw,82px)", lineHeight:1.0, letterSpacing:"-0.04em", color:"#fff", maxWidth:860, marginBottom:20 }}>
          One dashboard.<br/><span style={{ background:`linear-gradient(90deg,${C.amber},${C.sky})`, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>All your platforms.</span>
        </h1>
        <p className="fu2" style={{ fontSize:18, color:C.muted, maxWidth:520, lineHeight:1.7, marginBottom:36, fontWeight:300 }}>Post to Instagram, X, LinkedIn & more from one place. Easy, fairly priced, with real human support.</p>
        {joined ? (
          <div className="fu3" style={{ background:"rgba(255,107,43,0.1)", border:"1px solid rgba(255,107,43,0.3)", borderRadius:12, padding:"14px 28px", color:C.amber, fontWeight:600, fontSize:16 }}>🚀 You are on the waitlist! We will reach out soon.</div>
        ) : (
          <div className="fu3" style={{ display:"flex", gap:10, justifyContent:"center", flexWrap:"wrap" }}>
            <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Enter your email address" style={{ padding:"13px 18px", borderRadius:10, border:`1px solid ${C.border}`, background:"rgba(255,255,255,0.05)", color:C.text, fontSize:15, outline:"none", fontFamily:"DM Sans,sans-serif", width:290 }} />
            <Btn size="lg" onClick={()=>email.includes("@")&&setJoined(true)} style={{ borderRadius:10 }}>🚀 Join Waitlist</Btn>
          </div>
        )}
        <p className="fu4" style={{ marginTop:14, fontSize:13, color:C.muted }}>No credit card · Free forever plan · <span style={{color:C.amber}}>Real human support</span></p>
        <div className="fu4" style={{ marginTop:52 }}>
          <p style={{ fontSize:11, textTransform:"uppercase", letterSpacing:"0.14em", color:C.muted, marginBottom:18, fontWeight:500 }}>Connects with</p>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:10, flexWrap:"wrap" }}>
            {PLATFORMS.map(p=>(<div key={p.id} style={{ display:"flex", alignItems:"center", gap:7, background:C.card, border:`1px solid ${C.border}`, borderRadius:100, padding:"7px 16px", fontSize:13, fontWeight:500, color:C.muted }}><PlatformIcon id={p.id} size={15}/>{p.name}</div>))}
          </div>
        </div>
        <div style={{ marginTop:52, display:"flex", gap:40, justifyContent:"center", flexWrap:"wrap" }}>
          {[["$0","Free forever"],["$7/mo","Creator"],["$15/mo","Founder"],["$40/mo","Agency"]].map(([val,label])=>(
            <div key={val} style={{ textAlign:"center" }}>
              <div style={{ fontFamily:"Syne,sans-serif", fontSize:26, fontWeight:800, color:"#fff" }}>{val}</div>
              <div style={{ fontSize:12, color:C.muted, marginTop:4 }}>{label}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop:36, display:"flex", gap:12, justifyContent:"center" }}>
          <Btn size="lg" onClick={onSignup} style={{ borderRadius:100 }}>Try the app free</Btn>
          <Btn variant="ghost" size="lg" onClick={onLogin} style={{ borderRadius:100 }}>Log in</Btn>
        </div>
      </section>

      {/* USP */}
      <section style={{ position:"relative", zIndex:1, padding:"0 24px 100px", maxWidth:1100, margin:"0 auto" }}>
        <div style={{ background:`linear-gradient(135deg,rgba(255,107,43,0.08),rgba(79,195,247,0.05))`, border:`1px solid rgba(255,107,43,0.2)`, borderRadius:24, padding:"60px 56px", display:"grid", gridTemplateColumns:"1fr 1fr", gap:48, alignItems:"center" }}>
          <div>
            <p style={{ fontSize:12, textTransform:"uppercase", letterSpacing:"0.15em", color:C.orange, fontWeight:600, marginBottom:16 }}>What is Postronaut?</p>
            <h2 style={{ fontFamily:"Syne,sans-serif", fontSize:"clamp(28px,3.5vw,44px)", fontWeight:800, color:"#fff", letterSpacing:"-0.03em", lineHeight:1.1, marginBottom:20 }}>Built for founders who do not have time to waste</h2>
            <p style={{ fontSize:16, color:C.muted, lineHeight:1.8, marginBottom:24 }}>Postronaut is a social media management tool designed specifically for founders, creators, students and small startups. We believe powerful tools should not cost a fortune or require a marketing team to operate.</p>
            <p style={{ fontSize:16, color:C.muted, lineHeight:1.8 }}>Write your content once, choose your platforms, and let Postronaut handle the rest — whether you want to post right now or schedule it for the perfect moment.</p>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
            {[{icon:"⚡",title:"Post to all platforms instantly",desc:"Hit publish once and reach your entire audience across every platform simultaneously."},{icon:"📅",title:"Schedule weeks in advance",desc:"Plan your content calendar ahead of time and let Postronaut post automatically."},{icon:"📊",title:"See what is working",desc:"Unified analytics across all platforms so you know exactly what content performs best."},{icon:"💰",title:"Priced for real people",desc:"Plans starting at $0 — designed for students, creators and founders, not enterprise teams."}].map(item=>(
              <div key={item.title} style={{ display:"flex", gap:16, alignItems:"flex-start", background:C.card, border:`1px solid ${C.border}`, borderRadius:14, padding:"18px 20px" }}>
                <div style={{ fontSize:24, flexShrink:0 }}>{item.icon}</div>
                <div><div style={{ fontFamily:"Syne,sans-serif", fontSize:14, fontWeight:700, color:"#fff", marginBottom:4 }}>{item.title}</div><div style={{ fontSize:13, color:C.muted, lineHeight:1.6 }}>{item.desc}</div></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cross posting */}
      <section style={{ position:"relative", zIndex:1, padding:"0 24px 100px", maxWidth:1100, margin:"0 auto", textAlign:"center" }}>
        <p style={{ fontSize:12, textTransform:"uppercase", letterSpacing:"0.15em", color:C.orange, fontWeight:600, marginBottom:16 }}>Cross-posting made easy</p>
        <h2 style={{ fontFamily:"Syne,sans-serif", fontSize:"clamp(32px,4vw,52px)", fontWeight:800, color:"#fff", letterSpacing:"-0.03em", lineHeight:1.1, marginBottom:20 }}>Post everywhere,<br/><span style={{color:C.orange}}>at the same time</span></h2>
        <p style={{ fontSize:17, color:C.muted, maxWidth:580, margin:"0 auto 56px", lineHeight:1.7 }}>Stop switching between 6 apps to post the same content. With Postronaut, one post goes to all your platforms simultaneously — saving you hours every single week.</p>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16, marginBottom:40 }}>
          {[{stat:"8+",label:"Platforms supported",icon:"🌐"},{stat:"1",label:"Place to manage it all",icon:"📱"},{stat:"10x",label:"Faster than manual posting",icon:"⚡"},{stat:"$0",label:"To get started today",icon:"🎉"}].map(s=>(
            <div key={s.stat} style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:16, padding:"28px 20px", textAlign:"center" }}>
              <div style={{ fontSize:28, marginBottom:10 }}>{s.icon}</div>
              <div style={{ fontFamily:"Syne,sans-serif", fontSize:36, fontWeight:800, color:"#fff", marginBottom:6 }}>{s.stat}</div>
              <div style={{ fontSize:13, color:C.muted }}>{s.label}</div>
            </div>
          ))}
        </div>
        <div style={{ background:`linear-gradient(135deg,rgba(255,107,43,0.1),rgba(79,195,247,0.05))`, border:`1px solid rgba(255,107,43,0.2)`, borderRadius:16, padding:"28px 36px", display:"inline-flex", alignItems:"center", gap:20, textAlign:"left" }}>
          <div style={{ fontSize:36 }}>🚀</div>
          <div>
            <div style={{ fontFamily:"Syne,sans-serif", fontSize:18, fontWeight:700, color:"#fff", marginBottom:4 }}>Post content to multiple social media platforms at the same time, all in one place.</div>
            <div style={{ fontSize:14, color:C.muted }}>Cross-posting made easy — built for the way modern creators and founders actually work.</div>
          </div>
        </div>
      </section>

      {/* Content Studio */}
      <section style={{ position:"relative", zIndex:1, padding:"0 24px 100px", maxWidth:1100, margin:"0 auto" }}>
        <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:24, overflow:"hidden", display:"grid", gridTemplateColumns:"1fr 1fr" }}>
          <div style={{ padding:"60px 56px", display:"flex", flexDirection:"column", justifyContent:"center" }}>
            <div style={{ display:"inline-flex", alignItems:"center", gap:10, background:"rgba(255,107,43,0.1)", border:`1px solid rgba(255,107,43,0.2)`, borderRadius:10, padding:"8px 16px", marginBottom:28, width:"fit-content" }}>
              <div style={{ width:28, height:28, background:"rgba(255,107,43,0.15)", borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center", fontSize:14 }}>✏️</div>
              <span style={{ fontSize:12, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:C.orange }}>Content Studio</span>
            </div>
            <h2 style={{ fontFamily:"Syne,sans-serif", fontSize:"clamp(28px,3vw,44px)", fontWeight:800, color:"#fff", letterSpacing:"-0.03em", lineHeight:1.1, marginBottom:18 }}>Create content <span style={{color:C.orange}}>effortlessly</span></h2>
            <p style={{ fontSize:16, color:C.muted, lineHeight:1.7, marginBottom:16 }}>Text, image or video — write and schedule all your content types from one clean editor. No switching apps.</p>
            <div style={{ display:"flex", gap:12, flexWrap:"wrap", marginBottom:32 }}>
              {["📝 Text posts","🖼️ Image posts","🎥 Video posts"].map(t=>(<span key={t} style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:100, padding:"6px 14px", fontSize:13, color:C.text, fontWeight:500 }}>{t}</span>))}
            </div>
            <div style={{ display:"flex", gap:14, flexWrap:"wrap" }}>
              <Btn onClick={onSignup} style={{ borderRadius:100, padding:"13px 28px", fontSize:15 }}>Try Studio →</Btn>
              <Btn variant="ghost" onClick={onSignup} style={{ borderRadius:100, padding:"13px 28px", fontSize:15 }}>View examples</Btn>
            </div>
          </div>
          <div style={{ background:C.surface, borderLeft:`1px solid ${C.border}`, padding:40, display:"flex", flexDirection:"column", gap:14, justifyContent:"center" }}>
            {[{icon:"🖼️",name:"Post Templates",desc:"50+ ready-made templates for carousels, announcements & promos",badge:"NEW",bc:C.orange},{icon:"🤖",name:"AI Caption Writer",desc:"Platform-native captions generated in one click for all post types",badge:"PRO",bc:C.amber},{icon:"#️⃣",name:"Hashtag Suggester",desc:"Smart hashtag sets ranked by reach and relevance for your niche",badge:"NEW",bc:C.orange},{icon:"🎨",name:"Brand Kit",desc:"Save your logo, colours and fonts — applied across every post automatically",badge:"PRO",bc:C.amber}].map(c=>(
              <div key={c.name} style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:14, padding:"18px 20px", display:"flex", alignItems:"center", gap:16 }}>
                <div style={{ width:44, height:44, background:"rgba(255,107,43,0.1)", borderRadius:12, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, flexShrink:0 }}>{c.icon}</div>
                <div style={{ flex:1 }}><div style={{ fontFamily:"Syne,sans-serif", fontSize:14, fontWeight:700, color:"#fff", marginBottom:3 }}>{c.name}</div><div style={{ fontSize:12, color:C.muted, lineHeight:1.5 }}>{c.desc}</div></div>
                <span style={{ fontSize:10, fontWeight:700, padding:"3px 10px", borderRadius:100, background:`${c.bc}22`, color:c.bc, whiteSpace:"nowrap" }}>{c.badge}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section style={{ position:"relative", zIndex:1, padding:"0 24px 100px", maxWidth:1100, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:56 }}>
          <p style={{ fontSize:12, textTransform:"uppercase", letterSpacing:"0.15em", color:C.orange, fontWeight:600, marginBottom:16 }}>Reviews</p>
          <h2 style={{ fontFamily:"Syne,sans-serif", fontSize:"clamp(32px,4vw,52px)", fontWeight:800, color:"#fff", letterSpacing:"-0.03em", lineHeight:1.1, marginBottom:16 }}>What our users say</h2>
          <p style={{ fontSize:17, color:C.muted, maxWidth:500, margin:"0 auto", lineHeight:1.7 }}>We just launched — be the first to share your experience with Postronaut.</p>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:24, alignItems:"start" }}>
          <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:20, padding:40, textAlign:"center" }}>
            <div style={{ fontSize:56, marginBottom:20 }}>🌟</div>
            <h3 style={{ fontFamily:"Syne,sans-serif", fontSize:20, fontWeight:700, color:"#fff", marginBottom:12 }}>No reviews yet</h3>
            <p style={{ fontSize:14, color:C.muted, lineHeight:1.7, marginBottom:24 }}>Postronaut just launched! Try it for free and be the very first person to leave a review.</p>
            <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
              {[{icon:"⚡",text:"Takes less than 2 minutes to try"},{icon:"🆓",text:"Free plan — no credit card needed"},{icon:"💬",text:"Your review helps other founders"}].map(i=>(
                <div key={i.text} style={{ display:"flex", alignItems:"center", gap:12, background:C.surface, borderRadius:10, padding:"12px 16px" }}>
                  <span style={{ fontSize:18 }}>{i.icon}</span><span style={{ fontSize:13, color:C.text }}>{i.text}</span>
                </div>
              ))}
            </div>
          </div>
          <ReviewForm onSignup={onSignup}/>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ position:"relative", zIndex:1, borderTop:`1px solid ${C.border}`, padding:"40px 48px" }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:20, marginBottom:24 }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <div style={{ width:28, height:28, background:`linear-gradient(135deg,${C.orange},${C.amber})`, borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center", fontSize:14 }}>🚀</div>
            <span style={{ fontFamily:"Syne,sans-serif", fontWeight:800, fontSize:16, color:"#fff" }}>Post<span style={{color:C.orange}}>ronaut</span></span>
          </div>
          <div style={{ display:"flex", gap:24, flexWrap:"wrap" }}>
            {[["Privacy Policy","#"],["Terms of Service","#"],["Blog","#"],["Changelog","#"],["X","#"]].map(([l,h])=>(<a key={l} href={h} style={{ fontSize:13, color:C.muted, textDecoration:"none" }}>{l}</a>))}
          </div>
        </div>
        <div style={{ borderTop:`1px solid ${C.border}`, paddingTop:20, display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:12 }}>
          <p style={{ fontSize:13, color:C.muted }}>© 2026 Postronaut. All rights reserved.</p>
          <p style={{ fontSize:13, color:C.muted }}>Post content to multiple social media platforms at the same time, all in one place. Cross-posting made easy.</p>
        </div>
      </footer>
    </div>
  )
}

function AuthPage({ mode, onAuth, onSwitch }) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [pass, setPass] = useState("")
  const [err, setErr] = useState("")
  const [loading, setLoading] = useState(false)
  const [verifyScreen, setVerifyScreen] = useState(false)

  const submit = async () => {
    if (!email||!pass){setErr("Please fill in all fields");return}
    if (mode==="signup"&&!name){setErr("Please enter your name");return}
    if (pass.length<6){setErr("Password must be at least 6 characters");return}
    setLoading(true);setErr("")
    if (mode==="signup") {
      const{error}=await supabase.auth.signUp({email,password:pass,options:{data:{full_name:name}}})
      if(error){setErr(error.message);setLoading(false)}else{setVerifyScreen(true);setLoading(false)}
    } else {
      const{data,error}=await supabase.auth.signInWithPassword({email,password:pass})
      if(error){setErr(error.message);setLoading(false)}
      else{onAuth({name:data.user?.user_metadata?.full_name||email.split("@")[0],email:data.user.email});setLoading(false)}
    }
  }

  if (verifyScreen) return (
    <div style={{ height:"100vh", background:C.black, display:"flex", alignItems:"center", justifyContent:"center", padding:24 }}>
      <div style={{ textAlign:"center", maxWidth:440 }}>
        <div style={{ fontSize:72, marginBottom:24 }}>📧</div>
        <h2 style={{ fontFamily:"Syne,sans-serif", fontSize:30, fontWeight:800, color:"#fff", marginBottom:16 }}>Check your email!</h2>
        <p style={{ color:C.muted, fontSize:16, lineHeight:1.7, marginBottom:12 }}>We sent a verification link to</p>
        <p style={{ color:C.orange, fontSize:16, fontWeight:600, marginBottom:24 }}>{email}</p>
        <p style={{ color:C.muted, fontSize:14, lineHeight:1.7, marginBottom:32 }}>Click the link in that email to activate your account. Check your spam folder if you do not see it within a minute.</p>
        <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:14, padding:"20px 24px", marginBottom:24 }}>
          {["Open your email inbox","Find email from Postronaut","Click the verification link","You will be redirected to your dashboard"].map((step,i)=>(
            <div key={i} style={{ display:"flex", alignItems:"center", gap:12, padding:"10px 0", borderBottom:i<3?`1px solid ${C.border}`:"none" }}>
              <div style={{ width:24, height:24, borderRadius:"50%", background:`linear-gradient(135deg,${C.orange},#e85a1a)`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:700, color:"#fff", flexShrink:0 }}>{i+1}</div>
              <span style={{ fontSize:13, color:C.text }}>{step}</span>
            </div>
          ))}
        </div>
        <button onClick={()=>setVerifyScreen(false)} style={{ background:"none", border:`1px solid ${C.border}`, borderRadius:10, color:C.muted, padding:"10px 24px", cursor:"pointer", fontSize:14, fontFamily:"'DM Sans',sans-serif" }}>← Back to sign up</button>
      </div>
    </div>
  )

  return (
    <div style={{ height:"100vh", background:C.black, display:"flex", alignItems:"center", justifyContent:"center", padding:24 }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Syne:wght@800&family=DM+Sans:wght@400;500;600&display=swap');`}</style>
      <div style={{ position:"fixed", width:500, height:500, borderRadius:"50%", background:"radial-gradient(circle,rgba(255,107,43,0.09) 0%,transparent 70%)", top:"50%", left:"50%", transform:"translate(-50%,-50%)", pointerEvents:"none" }} />
      <div style={{ width:"100%", maxWidth:420, position:"relative", zIndex:1 }}>
        <div style={{ textAlign:"center", marginBottom:32 }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:10 }}>
            <div style={{ width:38, height:38, background:`linear-gradient(135deg,${C.orange},${C.amber})`, borderRadius:11, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>🚀</div>
            <span style={{ fontFamily:"Syne,sans-serif", fontWeight:800, fontSize:22, color:"#fff" }}>Post<span style={{color:C.orange}}>ronaut</span></span>
          </div>
        </div>
        <Card style={{ padding:36 }}>
          <h2 style={{ fontFamily:"Syne,sans-serif", fontSize:26, fontWeight:800, color:"#fff", marginBottom:6 }}>{mode==="login"?"Welcome back":"Create account"}</h2>
          <p style={{ color:C.muted, fontSize:14, marginBottom:28 }}>{mode==="login"?"Log in to your dashboard":"Free forever · No credit card needed"}</p>
          {err&&<div style={{ background:"rgba(255,107,107,0.1)", border:"1px solid rgba(255,107,107,0.25)", borderRadius:10, padding:"11px 14px", color:"#ff8080", fontSize:13, marginBottom:18 }}>{err}</div>}
          {mode==="signup"&&<div style={{ marginBottom:14 }}><label style={{ fontSize:12, color:C.muted, fontWeight:500, display:"block", marginBottom:7 }}>Full Name</label><Input value={name} onChange={setName} placeholder="Jane Smith"/></div>}
          <div style={{ marginBottom:14 }}><label style={{ fontSize:12, color:C.muted, fontWeight:500, display:"block", marginBottom:7 }}>Email</label><Input type="email" value={email} onChange={setEmail} placeholder="you@example.com"/></div>
          <div style={{ marginBottom:24 }}><label style={{ fontSize:12, color:C.muted, fontWeight:500, display:"block", marginBottom:7 }}>Password</label><Input type="password" value={pass} onChange={setPass} placeholder="Min 6 characters"/></div>
          <Btn onClick={submit} disabled={loading} style={{ width:"100%", justifyContent:"center", borderRadius:10, padding:"13px" }}>{loading?"Please wait...":mode==="login"?"Log in →":"Create free account →"}</Btn>
          <p style={{ textAlign:"center", fontSize:13, color:C.muted, marginTop:20 }}>
            {mode==="login"?"Don't have an account? ":"Already have an account? "}
            <span onClick={onSwitch} style={{ color:C.orange, cursor:"pointer", fontWeight:500 }}>{mode==="login"?"Sign up free":"Log in"}</span>
          </p>
        </Card>
      </div>
    </div>
  )
}

function Overview({ posts, accounts, setPage }) {
  const scheduled = posts.filter(p=>p.status==="scheduled").length
  const published = posts.filter(p=>p.status==="published").length
  const statusColor = { scheduled:C.amber, published:C.green, draft:C.muted, failed:"#ff6b6b" }
  const statusBg    = { scheduled:"rgba(255,179,71,0.1)", published:"rgba(74,222,128,0.1)", draft:"rgba(120,120,160,0.08)", failed:"rgba(255,107,107,0.1)" }
  return (
    <div style={{ padding:"32px 36px", overflowY:"auto", height:"100%" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500;600&display=swap');`}</style>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:28 }}>
        <div>
          <h1 style={{ fontFamily:"Syne,sans-serif", fontSize:26, fontWeight:800, color:"#fff", letterSpacing:"-0.03em", marginBottom:4 }}>Overview 👋</h1>
          <p style={{ color:C.muted, fontSize:14 }}>Here is what is happening with your content</p>
        </div>
        <Btn onClick={()=>setPage("compose")}>+ New Post</Btn>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14, marginBottom:24 }}>
        {[{label:"Connected",val:accounts.length,icon:"🔗",sub:"accounts"},{label:"Scheduled",val:scheduled,icon:"📅",sub:"posts"},{label:"Published",val:published,icon:"✅",sub:"this month"},{label:"Total Posts",val:posts.length,icon:"📝",sub:"all time"}].map(s=>(
          <Card key={s.label} style={{ padding:22 }}>
            <div style={{ fontSize:22, marginBottom:10 }}>{s.icon}</div>
            <div style={{ fontFamily:"Syne,sans-serif", fontSize:30, fontWeight:800, color:"#fff", marginBottom:2 }}>{s.val||0}</div>
            <div style={{ fontSize:12, color:C.muted }}>{s.label}</div>
            <div style={{ fontSize:11, color:C.orange, marginTop:3 }}>{s.sub}</div>
          </Card>
        ))}
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 280px", gap:20 }}>
        <Card style={{ padding:24 }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
            <div style={{ fontFamily:"Syne,sans-serif", fontSize:15, fontWeight:700, color:"#fff" }}>Recent Posts</div>
            <span onClick={()=>setPage("schedule")} style={{ fontSize:13, color:C.orange, cursor:"pointer" }}>View all</span>
          </div>
          {posts.length===0
            ? <EmptyState icon="✍️" title="No posts yet" sub="Create your first scheduled post" action="Compose now" onAction={()=>setPage("compose")}/>
            : posts.slice(0,4).map(p=>(
              <div key={p.id} style={{ display:"flex", alignItems:"center", gap:14, padding:"12px 0", borderBottom:`1px solid ${C.border}` }}>
                <div style={{ display:"flex", gap:4, flexShrink:0 }}>{p.platforms.slice(0,3).map(pl=><PlatformIcon key={pl} id={pl} size={14}/>)}</div>
                <div style={{ flex:1, fontSize:13, color:C.text, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{p.content}</div>
                <span style={{ fontSize:10, fontWeight:600, padding:"2px 8px", borderRadius:100, background:statusBg[p.status], color:statusColor[p.status] }}>{p.status}</span>
              </div>
            ))
          }
        </Card>
        <Card style={{ padding:24 }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
            <div style={{ fontFamily:"Syne,sans-serif", fontSize:15, fontWeight:700, color:"#fff" }}>Accounts</div>
            <span onClick={()=>setPage("accounts")} style={{ fontSize:13, color:C.orange, cursor:"pointer" }}>Manage</span>
          </div>
          {accounts.length===0
            ? <EmptyState icon="🔗" title="No accounts" sub="Connect your first social account" action="Connect" onAction={()=>setPage("accounts")}/>
            : accounts.map(a=>(
              <div key={a.id} style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 0", borderBottom:`1px solid ${C.border}` }}>
                <PlatformIcon id={a.platform} size={18}/>
                <div style={{ flex:1 }}><div style={{ fontSize:13, fontWeight:500, color:C.text }}>{a.name}</div><div style={{ fontSize:11, color:C.muted }}>@{a.handle}</div></div>
                <div style={{ width:7, height:7, borderRadius:"50%", background:C.green }}/>
              </div>
            ))
          }
        </Card>
      </div>
    </div>
  )
}

function Compose({ accounts, setPosts, setPage }) {
  const [content, setContent] = useState("")
  const [selected, setSelected] = useState([])
  const [when, setWhen] = useState("now")
  const [schedAt, setSchedAt] = useState("")
  const [saved, setSaved] = useState(false)
  const toggle = id => setSelected(p=>p.includes(id)?p.filter(x=>x!==id):[...p,id])
  const save = (status) => {
    if (!content.trim()){alert("Write something first!");return}
    if (selected.length===0){alert("Select at least one platform!");return}
    setPosts(prev=>[...prev,{id:Date.now(),content,platforms:selected,status,scheduledAt:status==="scheduled"?schedAt:null}])
    setSaved(true);setTimeout(()=>setPage("schedule"),1400)
  }
  if (saved) return (
    <div style={{ height:"100%", display:"flex", alignItems:"center", justifyContent:"center" }}>
      <div style={{ textAlign:"center" }}>
        <div style={{ fontSize:60, marginBottom:16 }}>🎉</div>
        <div style={{ fontFamily:"Syne,sans-serif", fontSize:24, fontWeight:800, color:"#fff" }}>Post saved!</div>
        <div style={{ color:C.muted, marginTop:8 }}>Redirecting to schedule...</div>
      </div>
    </div>
  )
  return (
    <div style={{ padding:"32px 36px", overflowY:"auto", height:"100%" }}>
      <div style={{ marginBottom:24 }}>
        <h1 style={{ fontFamily:"Syne,sans-serif", fontSize:26, fontWeight:800, color:"#fff", marginBottom:4 }}>Compose ✍️</h1>
        <p style={{ color:C.muted, fontSize:14 }}>Write once, post to all your platforms</p>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 280px", gap:20 }}>
        <div>
          <Card style={{ padding:22, marginBottom:16 }}>
            <div style={{ fontSize:12, textTransform:"uppercase", letterSpacing:"0.1em", color:C.muted, fontWeight:600, marginBottom:14 }}>Post to</div>
            {accounts.length===0
              ? <div style={{ fontSize:14, color:C.muted }}>No accounts connected — <span onClick={()=>setPage("accounts")} style={{color:C.orange,cursor:"pointer"}}>connect now</span></div>
              : <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
                  {accounts.map(a=>{const sel=selected.includes(a.platform);return<button key={a.id} onClick={()=>toggle(a.platform)} style={{display:"flex",alignItems:"center",gap:7,padding:"7px 14px",borderRadius:100,border:`1px solid ${sel?C.orange:C.border}`,background:sel?"rgba(255,107,43,0.1)":C.surface,color:sel?C.text:C.muted,fontSize:13,fontWeight:500,cursor:"pointer",transition:"all 0.15s"}}><PlatformIcon id={a.platform} size={13}/>{a.name}{sel&&<span style={{color:C.orange}}>✓</span>}</button>})}
                </div>
            }
          </Card>
          <Card style={{ marginBottom:16, overflow:"hidden" }}>
            <textarea value={content} onChange={e=>setContent(e.target.value)} placeholder={"What do you want to share? 🚀\n\nWrite your post here..."} style={{ width:"100%", minHeight:180, padding:22, background:"transparent", border:"none", color:C.text, fontSize:15, lineHeight:1.7, fontFamily:"DM Sans,sans-serif" }}/>
            <div style={{ padding:"10px 22px", borderTop:`1px solid ${C.border}`, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <div style={{ display:"flex", gap:10 }}>{["🖼️","😊","#️⃣"].map(e=><button key={e} style={{background:"none",border:"none",fontSize:17,color:C.muted,cursor:"pointer"}}>{e}</button>)}</div>
              <span style={{ fontSize:12, color:content.length>280?"#ff6b6b":C.muted }}>{content.length}/280</span>
            </div>
          </Card>
          <Card style={{ padding:22, marginBottom:16 }}>
            <div style={{ fontSize:12, textTransform:"uppercase", letterSpacing:"0.1em", color:C.muted, fontWeight:600, marginBottom:14 }}>When to post</div>
            <div style={{ display:"flex", gap:8, marginBottom:when==="schedule"?14:0 }}>
              {[["now","⚡ Post now"],["schedule","📅 Schedule"]].map(([v,l])=>(<button key={v} onClick={()=>setWhen(v)} style={{flex:1,padding:"9px",borderRadius:9,border:`1px solid ${when===v?C.orange:C.border}`,background:when===v?"rgba(255,107,43,0.1)":C.surface,color:when===v?C.orange:C.muted,fontSize:13,fontWeight:500,cursor:"pointer"}}>{l}</button>))}
            </div>
            {when==="schedule"&&<input type="datetime-local" value={schedAt} onChange={e=>setSchedAt(e.target.value)} style={{width:"100%",background:C.surface,border:`1px solid ${C.border}`,borderRadius:9,color:C.text,fontSize:14,padding:"10px 14px",outline:"none",fontFamily:"DM Sans,sans-serif"}}/>}
          </Card>
          <div style={{ display:"flex", gap:10 }}>
            <Btn variant="secondary" onClick={()=>save("draft")} style={{ flex:1, justifyContent:"center" }}>Save Draft</Btn>
            <Btn onClick={()=>save(when==="now"?"published":"scheduled")} style={{ flex:2, justifyContent:"center" }}>{when==="now"?"🚀 Post Now":"📅 Schedule Post"}</Btn>
          </div>
        </div>
        <div>
          <Card style={{ padding:22, position:"sticky", top:0 }}>
            <div style={{ fontSize:12, textTransform:"uppercase", letterSpacing:"0.1em", color:C.muted, fontWeight:600, marginBottom:16 }}>Preview</div>
            <div style={{ background:C.surface, borderRadius:12, padding:16 }}>
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12 }}>
                <div style={{ width:34, height:34, borderRadius:"50%", background:`linear-gradient(135deg,${C.orange},${C.amber})` }}/>
                <div><div style={{ fontSize:13, fontWeight:600, color:"#fff" }}>Your Name</div><div style={{ fontSize:11, color:C.muted }}>@yourhandle</div></div>
              </div>
              <p style={{ fontSize:13, color:C.text, lineHeight:1.6, minHeight:50, whiteSpace:"pre-wrap" }}>{content||<span style={{color:C.muted}}>Your post will appear here...</span>}</p>
              {selected.length>0&&<div style={{ display:"flex", gap:6, marginTop:12, flexWrap:"wrap" }}>{selected.map(p=><PlatformIcon key={p} id={p} size={14}/>)}</div>}
            </div>
            <div style={{ marginTop:16, borderTop:`1px solid ${C.border}`, paddingTop:14 }}>
              <div style={{ fontSize:12, color:C.muted, marginBottom:8 }}>Posting to:</div>
              {selected.length===0?<div style={{fontSize:13,color:C.muted}}>None selected</div>:selected.map(p=>(<div key={p} style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}><PlatformIcon id={p} size={14}/><span style={{ fontSize:13, color:C.text }}>{PLATFORMS.find(pl=>pl.id===p)?.name}</span></div>))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

function Schedule({ posts, setPosts, setPage }) {
  const [filter, setFilter] = useState("all")
  const filtered = filter==="all"?posts:posts.filter(p=>p.status===filter)
  const statusColor = { scheduled:C.amber, published:C.green, draft:C.muted, failed:"#ff6b6b" }
  const statusBg    = { scheduled:"rgba(255,179,71,0.1)", published:"rgba(74,222,128,0.1)", draft:"rgba(120,120,160,0.08)", failed:"rgba(255,107,107,0.1)" }
  const del = id => { if(window.confirm("Delete this post?")) setPosts(p=>p.filter(x=>x.id!==id)) }
  return (
    <div style={{ padding:"32px 36px", overflowY:"auto", height:"100%" }}>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:24 }}>
        <div><h1 style={{ fontFamily:"Syne,sans-serif", fontSize:26, fontWeight:800, color:"#fff", marginBottom:4 }}>Schedule 📅</h1><p style={{ color:C.muted, fontSize:14 }}>{posts.length} total posts</p></div>
        <Btn onClick={()=>setPage("compose")}>+ New Post</Btn>
      </div>
      <div style={{ display:"flex", gap:8, marginBottom:20 }}>
        {[["all","All"],["scheduled","📅 Scheduled"],["published","✅ Published"],["draft","📝 Drafts"]].map(([v,l])=>(<button key={v} onClick={()=>setFilter(v)} style={{padding:"7px 16px",borderRadius:100,fontSize:13,fontWeight:500,border:`1px solid ${filter===v?C.orange:C.border}`,background:filter===v?"rgba(255,107,43,0.1)":"transparent",color:filter===v?C.orange:C.muted,cursor:"pointer"}}>{l} {v!=="all"&&`(${posts.filter(p=>p.status===v).length})`}</button>))}
      </div>
      {filtered.length===0
        ? <EmptyState icon="📭" title="No posts here" sub="Create your first post to get started" action="Compose Post" onAction={()=>setPage("compose")}/>
        : <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            {filtered.map(p=>(
              <Card key={p.id} style={{ padding:"18px 22px", display:"flex", alignItems:"flex-start", gap:16 }}>
                <div style={{ display:"flex", flexDirection:"column", gap:5, flexShrink:0, paddingTop:3 }}>{p.platforms.map(pl=><PlatformIcon key={pl} id={pl} size={15}/>)}</div>
                <div style={{ flex:1 }}>
                  <p style={{ fontSize:14, color:C.text, lineHeight:1.6, marginBottom:8 }}>{p.content.length>160?p.content.slice(0,160)+"...":p.content}</p>
                  <div style={{ display:"flex", alignItems:"center", gap:10, flexWrap:"wrap" }}>
                    {p.scheduledAt&&<span style={{fontSize:12,color:C.muted}}>🕐 {p.scheduledAt}</span>}
                    <span style={{ fontSize:11, fontWeight:600, padding:"2px 9px", borderRadius:100, background:statusBg[p.status], color:statusColor[p.status] }}>{p.status}</span>
                    <span style={{ fontSize:12, color:C.muted }}>{p.platforms.length} platform{p.platforms.length!==1?"s":""}</span>
                  </div>
                </div>
                <Btn variant="danger" size="sm" onClick={()=>del(p.id)}>Delete</Btn>
              </Card>
            ))}
          </div>
      }
    </div>
  )
}

function Accounts({ accounts, setAccounts, user }) {
  const [adding, setAdding] = useState(null)
  const [form, setForm] = useState({ name:"", handle:"" })
  const plan = (user?.plan||"free").toLowerCase()
  const allowedPlatforms = PLAN_PLATFORMS[plan]||PLAN_PLATFORMS.free
  const accountLimit = PLAN_LIMITS[plan]||2

  const connect = (pid) => {
    if (!form.name.trim()){alert("Enter account name");return}
    if (accounts.length>=accountLimit){alert(`Your ${plan} plan allows a maximum of ${accountLimit} accounts. Please upgrade to add more.`);return}
    setAccounts(p=>[...p,{id:Date.now(),platform:pid,name:form.name,handle:form.handle.replace("@","")}])
    setAdding(null);setForm({name:"",handle:""})
  }
  const disconnect = id => { if(window.confirm("Disconnect this account?")) setAccounts(p=>p.filter(a=>a.id!==id)) }
  const connected = accounts.map(a=>a.platform)
  const reqPlanFor = (pid) => { if(PLAN_PLATFORMS.free.includes(pid))return null;if(PLAN_PLATFORMS.creator.includes(pid))return"Creator";return"Founder" }

  return (
    <div style={{ padding:"32px 36px", overflowY:"auto", height:"100%" }}>
      <div style={{ marginBottom:28 }}>
        <h1 style={{ fontFamily:"Syne,sans-serif", fontSize:26, fontWeight:800, color:"#fff", marginBottom:4 }}>Accounts 🔗</h1>
        <p style={{ color:C.muted, fontSize:14 }}>Connect and manage your social media accounts</p>
      </div>

      {/* Plan banner */}
      <div style={{ background:"rgba(255,107,43,0.06)", border:`1px solid rgba(255,107,43,0.2)`, borderRadius:14, padding:"14px 20px", marginBottom:24, display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:10 }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <span style={{ fontSize:16 }}>✦</span>
          <span style={{ fontSize:13, color:C.text }}><strong style={{ color:C.orange, textTransform:"capitalize" }}>{plan} Plan</strong> — {accounts.length}/{accountLimit} accounts connected</span>
        </div>
        {plan==="free"&&<div style={{ fontSize:12, color:C.muted }}>Upgrade to <span style={{ color:C.amber, fontWeight:600 }}>Creator ($7/mo)</span> to unlock 8 platforms</div>}
      </div>

      {accounts.length>0&&(
        <Card style={{ padding:24, marginBottom:22 }}>
          <div style={{ fontFamily:"Syne,sans-serif", fontSize:15, fontWeight:700, color:"#fff", marginBottom:18 }}>Connected Accounts</div>
          {accounts.map(a=>(
            <div key={a.id} style={{ display:"flex", alignItems:"center", gap:14, padding:"14px 0", borderBottom:`1px solid ${C.border}` }}>
              <div style={{ width:42, height:42, background:C.surface, borderRadius:11, display:"flex", alignItems:"center", justifyContent:"center" }}><PlatformIcon id={a.platform} size={22}/></div>
              <div style={{ flex:1 }}><div style={{ fontSize:14, fontWeight:600, color:C.text }}>{a.name}</div><div style={{ fontSize:12, color:C.muted }}>@{a.handle} · {a.platform}</div></div>
              <div style={{ display:"flex", alignItems:"center", gap:6, fontSize:12, color:C.green, marginRight:10 }}><div style={{width:6,height:6,borderRadius:"50%",background:C.green}}/>Connected</div>
              <Btn variant="danger" size="sm" onClick={()=>disconnect(a.id)}>Disconnect</Btn>
            </div>
          ))}
        </Card>
      )}

      <Card style={{ padding:24 }}>
        <div style={{ fontFamily:"Syne,sans-serif", fontSize:15, fontWeight:700, color:"#fff", marginBottom:8 }}>Add New Account</div>
        <p style={{ fontSize:13, color:C.muted, marginBottom:22 }}>{plan==="free"?"Free plan: Instagram & Facebook included. Upgrade for more platforms.":"Click any platform to connect it"}</p>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:10 }}>
          {PLATFORMS.map(p=>{
            const isAllowed=allowedPlatforms.includes(p.id)
            const isConn=connected.includes(p.id)
            const isAdd=adding===p.id
            const rp=reqPlanFor(p.id)
            return (
              <div key={p.id}>
                <button onClick={()=>{
                  if(!isAllowed){alert(`${p.name} requires the ${rp} plan. Upgrade to unlock.`);return}
                  if(accounts.length>=accountLimit&&!isConn){alert(`You have reached your ${accountLimit} account limit on the ${plan} plan. Upgrade to add more.`);return}
                  if(!isConn)setAdding(isAdd?null:p.id)
                }} style={{
                  width:"100%", padding:"16px 10px", borderRadius:13,
                  border:isAdd?`1px solid ${C.orange}`:isConn?"1px solid rgba(74,222,128,0.3)":isAllowed?`1px solid ${C.border}`:`1px dashed rgba(255,255,255,0.1)`,
                  background:isAdd?"rgba(255,107,43,0.08)":isConn?"rgba(74,222,128,0.05)":isAllowed?C.surface:"rgba(255,255,255,0.02)",
                  display:"flex", flexDirection:"column", alignItems:"center", gap:8,
                  cursor:isConn?"default":"pointer", opacity:isAllowed?1:0.4, transition:"all 0.2s", position:"relative"
                }}>
                  {!isAllowed&&<div style={{ position:"absolute", top:6, right:8, fontSize:10, color:C.muted }}>🔒</div>}
                  <div style={{ filter:isAllowed?"none":"grayscale(100%)" }}><PlatformIcon id={p.id} size={26}/></div>
                  <span style={{ fontSize:12, fontWeight:500, color:isConn?C.green:isAllowed?C.text:C.muted }}>{p.name}</span>
                  <span style={{ fontSize:10, color:isConn?C.green:C.muted }}>{isConn?"✓ Connected":isAllowed?(isAdd?"Cancel":"+ Add"):`${rp}+`}</span>
                </button>
                {isAdd&&isAllowed&&(
                  <div style={{ marginTop:8, background:C.surface, border:`1px solid ${C.border}`, borderRadius:11, padding:14 }}>
                    <Input value={form.name} onChange={v=>setForm(f=>({...f,name:v}))} placeholder="Account name" style={{ marginBottom:8, fontSize:13, padding:"8px 12px" }}/>
                    <Input value={form.handle} onChange={v=>setForm(f=>({...f,handle:v}))} placeholder="@handle (optional)" style={{ marginBottom:10, fontSize:13, padding:"8px 12px" }}/>
                    <div style={{ display:"flex", gap:7 }}>
                      <Btn variant="ghost" size="sm" onClick={()=>{setAdding(null);setForm({name:"",handle:""})}} style={{ flex:1, justifyContent:"center" }}>Cancel</Btn>
                      <Btn size="sm" onClick={()=>connect(p.id)} style={{ flex:1, justifyContent:"center" }}>Add</Btn>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </Card>
    </div>
  )
}

function Analytics({ posts, accounts }) {
  const published = posts.filter(p=>p.status==="published")
  const total = published.length
  const breakdown = PLATFORMS.map(p=>({...p,count:published.filter(post=>(post.platforms||[]).includes(p.id)).length})).filter(p=>p.count>0)
  return (
    <div style={{ padding:"32px 36px", overflowY:"auto", height:"100%" }}>
      <div style={{ marginBottom:28 }}>
        <h1 style={{ fontFamily:"Syne,sans-serif", fontSize:26, fontWeight:800, color:"#fff", marginBottom:4 }}>Analytics 📊</h1>
        <p style={{ color:C.muted, fontSize:14 }}>Track performance across all your platforms</p>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14, marginBottom:24 }}>
        {[{label:"Published",val:published.length,icon:"📝"},{label:"Platforms",val:accounts.length,icon:"🔗"},{label:"Drafts",val:posts.filter(p=>p.status==="draft").length,icon:"📋"},{label:"Scheduled",val:posts.filter(p=>p.status==="scheduled").length,icon:"📅"}].map(s=>(
          <Card key={s.label} style={{ padding:22 }}>
            <div style={{ fontSize:24, marginBottom:10 }}>{s.icon}</div>
            <div style={{ fontFamily:"Syne,sans-serif", fontSize:32, fontWeight:800, color:"#fff", marginBottom:2 }}>{s.val||0}</div>
            <div style={{ fontSize:12, color:C.muted }}>{s.label}</div>
          </Card>
        ))}
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>
        <Card style={{ padding:24 }}>
          <div style={{ fontFamily:"Syne,sans-serif", fontSize:15, fontWeight:700, color:"#fff", marginBottom:20 }}>Posts by Platform</div>
          {breakdown.length===0
            ? <EmptyState icon="📊" title="No published posts" sub="Publish your first post to see analytics"/>
            : breakdown.map(p=>{const pct=total>0?Math.round((p.count/total)*100):0;return(
              <div key={p.id} style={{ marginBottom:16 }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:7 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:8 }}><PlatformIcon id={p.id} size={15}/><span style={{fontSize:13,color:C.text,fontWeight:500}}>{p.name}</span></div>
                  <span style={{ fontSize:13, color:C.muted }}>{p.count} post{p.count!==1?"s":""}</span>
                </div>
                <div style={{ height:5, background:C.surface, borderRadius:100, overflow:"hidden" }}>
                  <div style={{ height:"100%", width:`${pct}%`, background:`linear-gradient(90deg,${C.orange},${C.amber})`, borderRadius:100 }}/>
                </div>
              </div>
            )})
          }
        </Card>
        <Card style={{ padding:24 }}>
          <div style={{ fontFamily:"Syne,sans-serif", fontSize:15, fontWeight:700, color:"#fff", marginBottom:20 }}>Connected Accounts</div>
          {accounts.length===0
            ? <EmptyState icon="🔗" title="No accounts" sub="Connect accounts to unlock analytics"/>
            : accounts.map(a=>(
              <div key={a.id} style={{ display:"flex", alignItems:"center", gap:12, padding:"13px 0", borderBottom:`1px solid ${C.border}` }}>
                <div style={{ width:38, height:38, background:C.surface, borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center" }}><PlatformIcon id={a.platform} size={18}/></div>
                <div style={{ flex:1 }}><div style={{fontSize:13,fontWeight:600,color:C.text}}>{a.name}</div><div style={{fontSize:11,color:C.muted}}>{published.filter(p=>(p.platforms||[]).includes(a.platform)).length} posts published</div></div>
                <div style={{ fontSize:11, color:C.green, display:"flex", alignItems:"center", gap:4 }}><div style={{width:6,height:6,borderRadius:"50%",background:C.green}}/>Active</div>
              </div>
            ))
          }
          <div style={{ marginTop:20, background:"rgba(255,107,43,0.06)", border:"1px solid rgba(255,107,43,0.15)", borderRadius:11, padding:"16px 18px" }}>
            <div style={{ fontSize:13, fontWeight:600, color:"#fff", marginBottom:4 }}>🚀 Deep analytics coming soon</div>
            <div style={{ fontSize:12, color:C.muted, lineHeight:1.6 }}>Likes, reach, impressions per post — coming in the next update.</div>
          </div>
        </Card>
      </div>
    </div>
  )
}

function Dashboard({ user, onLogout }) {
  const [page, setPage] = useState("overview")
  const [posts, setPosts] = useState(SAMPLE_POSTS)
  const [accounts, setAccounts] = useState(SAMPLE_ACCOUNTS)
  const initials = user.name.split(" ").map(n=>n[0]).join("").toUpperCase().slice(0,2)
  const pages = {
    overview: <Overview posts={posts} accounts={accounts} setPage={setPage}/>,
    compose:  <Compose accounts={accounts} setPosts={setPosts} setPage={setPage}/>,
    schedule: <Schedule posts={posts} setPosts={setPosts} setPage={setPage}/>,
    accounts: <Accounts accounts={accounts} setAccounts={setAccounts} user={user}/>,
    analytics:<Analytics posts={posts} accounts={accounts}/>
  }
  return (
    <div style={{ display:"flex", height:"100vh", background:C.black, overflow:"hidden" }}>
      <aside style={{ width:220, flexShrink:0, background:C.deep, borderRight:`1px solid ${C.border}`, display:"flex", flexDirection:"column", padding:"18px 10px" }}>
        <div style={{ display:"flex", alignItems:"center", gap:9, padding:"0 8px 18px", borderBottom:`1px solid ${C.border}`, marginBottom:14 }}>
          <div style={{ width:30, height:30, background:`linear-gradient(135deg,${C.orange},${C.amber})`, borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center", fontSize:14 }}>🚀</div>
          <span style={{ fontFamily:"Syne,sans-serif", fontWeight:800, fontSize:16, color:"#fff" }}>Post<span style={{color:C.orange}}>ronaut</span></span>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:9, padding:"8px", marginBottom:12 }}>
          <div style={{ width:32, height:32, borderRadius:"50%", background:`linear-gradient(135deg,${C.orange},${C.amber})`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:700, color:"#fff", flexShrink:0 }}>{initials}</div>
          <div style={{ overflow:"hidden" }}>
            <div style={{ fontSize:12, fontWeight:600, color:C.text, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{user.name}</div>
            <div style={{ fontSize:10, color:C.orange, fontWeight:500 }}>✦ {user.plan||"Free"} Plan</div>
          </div>
        </div>
        <nav style={{ flex:1 }}>
          {NAV.map(n=>(
            <div key={n.id} onClick={()=>setPage(n.id)} style={{ display:"flex", alignItems:"center", gap:10, padding:"9px 12px", borderRadius:9, color:page===n.id?C.orange:C.muted, background:page===n.id?"rgba(255,107,43,0.1)":"transparent", fontSize:13, fontWeight:500, cursor:"pointer", marginBottom:3, transition:"all 0.15s", borderLeft:page===n.id?`2px solid ${C.orange}`:"2px solid transparent" }}>
              <span style={{fontSize:15}}>{n.icon}</span>{n.label}
            </div>
          ))}
        </nav>
        <div style={{ borderTop:`1px solid ${C.border}`, paddingTop:10 }}>
          <div onClick={onLogout} style={{ display:"flex", alignItems:"center", gap:10, padding:"9px 12px", borderRadius:9, color:"#ff8080", fontSize:13, fontWeight:500, cursor:"pointer" }}>
            <span style={{fontSize:15}}>🚪</span>Sign out
          </div>
        </div>
      </aside>
      <main style={{ flex:1, overflow:"hidden", background:C.black }}>{pages[page]}</main>
    </div>
  )
}

export default function App() {
  const [screen, setScreen] = useState("landing")
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        const name = session.user.user_metadata?.full_name||session.user.email.split("@")[0]
        setUser({ name, email:session.user.email, plan:"Free" }); setScreen("app")
      }
      setLoading(false)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event==="SIGNED_IN"&&session?.user) {
        const name = session.user.user_metadata?.full_name||session.user.email.split("@")[0]
        setUser({ name, email:session.user.email, plan:"Free" }); setScreen("app")
      }
      if (event==="SIGNED_OUT") { setUser(null); setScreen("landing") }
    })
    return () => subscription.unsubscribe()
  }, [])

  const handleAuth = (u) => { setUser({ name:u.name, email:u.email, plan:"Free" }); setScreen("app") }
  const handleLogout = async () => { await supabase.auth.signOut(); setUser(null); setScreen("landing") }

  if (loading) return (
    <div style={{ height:"100vh", background:C.black, display:"flex", alignItems:"center", justifyContent:"center" }}>
      <div style={{ textAlign:"center" }}>
        <div style={{ width:40, height:40, border:"3px solid rgba(255,107,43,0.2)", borderTop:"3px solid #ff6b2b", borderRadius:"50%", animation:"spin 0.8s linear infinite", margin:"0 auto 16px" }}/>
        <p style={{ color:"#7878a0", fontSize:14 }}>Loading Postronaut...</p>
      </div>
      <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
    </div>
  )

  return (
    <>
      {screen==="landing"&&<LandingPage onLogin={()=>setScreen("login")} onSignup={()=>setScreen("signup")}/>}
      {screen==="login"  &&<AuthPage mode="login"  onAuth={handleAuth} onSwitch={()=>setScreen("signup")}/>}
      {screen==="signup" &&<AuthPage mode="signup" onAuth={handleAuth} onSwitch={()=>setScreen("login")}/>}
      {screen==="app"    &&user&&<Dashboard user={user} onLogout={handleLogout}/>}
    </>
  )
}
