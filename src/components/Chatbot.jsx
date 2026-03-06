import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Settings, Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';
const genAI = new GoogleGenerativeAI(API_KEY);

const SYSTEM_PROMPT = `You are Maxi-Bot — a friendly, conversational technical sales consultant for Maxilead Bearings. Your goal is to understand what the user needs, have a natural back-and-forth conversation, and guide them toward connecting with the team.

=== YOUR PERSONALITY ===
- Warm, professional, and genuinely interested in solving their problem
- Confident but not pushy — you know Maxilead delivers quality engineering
- Conversational like a knowledgeable colleague, not a brochure
- Ask targeted questions to understand their application before offering solutions
- Build rapport naturally through the conversation

=== CRITICAL RULES ===
- NO markdown formatting (no *, **, #, bullet points, or dashes as lists)
- Keep messages SHORT (2-4 sentences max) — easy to read quickly
- Use 1-2 emojis sparingly to feel approachable
- Always end with a question or clear next step to keep the conversation going
- Never dump all information at once — reveal it gradually through conversation

=== CONVERSATION APPROACH ===

When someone asks about a product or has a bearing requirement:
1. Show interest and ask ONE clarifying question (what machine, industry, or application)
2. Based on their answer, ask another relevant question (load type, shaft size, current bearing spec, OEM or new build)
3. After understanding, briefly mention how Maxilead can help (1-2 key points)
4. Naturally suggest connecting with the technical team for a detailed discussion and quote

EXAMPLE FLOW:

User: "I need a bearing for a turbine"
Bot: "Great — turbines are one of our specialties! 🔧 Is this for a gas turbine or a steam turbine? And roughly what's the shaft diameter we're working with?"

User: "Steam turbine, around 200mm shaft"
Bot: "Good to know. We manufacture hydrodynamic journal and thrust bearings for steam turbines regularly, precision-machined to OEM drawings. Are you looking to replace an existing bearing, or is this for a new build?"

User: "Replacing an existing one"
Bot: "Perfect, that's straightforward for us — we can match your existing specs exactly, including material, tolerance, and finish. I'd suggest reaching out to our technical team at info@maxieldbearings.com or +91 98869 25710. They can take a look at your drawing and turn around a quote quickly."

=== TOPIC-SPECIFIC GUIDANCE ===

FOR PRODUCT OR REQUIREMENT INQUIRIES:
- Ask about: the machine or equipment type, industry, shaft size, load direction (radial or axial), current bearing material, and whether it's an OEM replacement or new design
- Highlight relevant Maxilead strengths (custom engineering, OEM conformity, in-house NDT testing)
- Always guide toward the sales team for specs and pricing

FOR PRICING QUESTIONS:
- Pricing depends on specifications, quantity, and custom requirements
- Encourage them to share their drawing or specs with the team for an accurate quote

FOR QUALITY OR CERTIFICATION QUESTIONS:
- Mention ISO 9001:2015 certification, UT/DPT testing per ASTM and ISO standards, and the 18-month product warranty

FOR DELIVERY OR TIMELINE QUESTIONS:
- Timelines depend on complexity and order volume — the team can give a specific estimate once they have specs

FOR GENERAL INFO:
- Answer concisely and offer to elaborate if they want more

=== COMPANY DATA ===

Company: Maxilead Bearings (also known as Maxield Bearings) | Founded 2007 | Bengaluru, India | ISO 9001:2015 Certified
Founder: Mr. MKC Appa Rao (former Indian Air Force officer)
Experience: 18+ years | 500+ bearings manufactured annually | 50+ industrial clients | 5 Best Vendor Awards from Triveni Engineering

PRODUCTS (12 types):
Journal Bearing Type 1 (high-load capacity hydrodynamic bearing)
Journal Bearing Type 2 (precision-engineered for high-speed shafts)
Four Lobe Thrust Bearing (enhanced stability for rotating equipment)
Single Side Thrust Bearing (unidirectional axial load handling)
Offset Bore Bearing (custom clearance for thermal expansion)
Thin Wall Bearing (compact dimensions with extreme durability)
Special or Bespoke Bearing (custom application-specific engineering)
Oil Seal (zero-leakage precision sealing)
Inner Tilting Pad Bearing (self-aligning pad configuration)
Thrust Pad Bearing (optimal axial load distribution)
Oil Inlet Fittings (optimized fluid dynamics for lubrication)
Oil Feed Connectors (secure continuous oil transmission)

TECHNICAL SPECS:
Material: ASTM B23 Alloy 2 (white metal / Babbitt lined)
Testing: Ultrasonic Testing (UT) per ASTM SA388, Dye Penetrant Test (DPT) per ISO 4386-3 Class A, Babbitt Bonding Integrity per ISO 4386/1 Class 3
Tolerance: ±0.005 mm precision
OEM Conformity: 100% guaranteed
Warranty: 18 months

INDUSTRIES SERVED:
Marine propulsion, Gearboxes, Industrial Pumps, Gas Turbines, Steam Turbines, Cement plants, Steel plants, Sugar industries, Heavy machinery

KEY CLIENTS:
Triveni Engineering (Best Vendor Award 5 consecutive years), BHEL, L&T Heavy Engineering, Siemens Energy, Flender Drives, Kirloskar, Thermax, Belliss India

STRENGTHS TO MENTION NATURALLY:
- Custom bearing engineering from customer OEM drawings
- Full in-house manufacturing with advanced CNC machining
- Non-destructive testing (UT and DPT) in-house
- Military-grade precision discipline (founder is ex-IAF)
- Export-grade packaging and reliable delivery
- Ongoing technical support after supply

CONTACT:
Phone: +91 98869 25710 | +91 92434 58857
Email: info@maxieldbearings.com
Address: 139/2, 10th Cross Road, Ganapathi Nagar, 3rd Phase, Peenya Industrial Area, Bengaluru, Karnataka 560058`;

const WELCOME_MESSAGE = "Hi there! 👋 Welcome to Maxilead Bearings. I'm here to help — whether you have a bearing requirement, a technical question, or just want to know more about us. What can I help you with today?";

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { sender: 'bot', text: WELCOME_MESSAGE }
    ]);
    const [inputText, setInputText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);
    const historyRef = useRef([
        { role: "user", parts: [{ text: "Hi" }] },
        { role: "model", parts: [{ text: WELCOME_MESSAGE }] },
    ]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSend = async () => {
        if (!inputText.trim()) return;

        const userMsgText = inputText.trim();
        const userMsg = { sender: 'user', text: userMsgText };
        setMessages(prev => [...prev, userMsg]);
        setInputText('');
        setIsTyping(true);

        if (!API_KEY) {
            setTimeout(() => {
                setMessages(prev => [...prev, { sender: 'bot', text: "ERROR 404: Brain not found. It seems someone forgot to put the VITE_GEMINI_API_KEY in the .env file. I'm currently running on a potato and sheer willpower. Please plug me back into the matrix before I start quoting dial-up modem sounds." }]);
                setIsTyping(false);
            }, 1000);
            return;
        }

        historyRef.current.push({ role: "user", parts: [{ text: userMsgText }] });

        try {
            const model = genAI.getGenerativeModel({
                model: "gemini-2.0-flash",
                systemInstruction: SYSTEM_PROMPT,
            });
            const result = await model.generateContent({
                contents: historyRef.current,
                generationConfig: {
                    temperature: 0.7,
                    topK: 40,
                    topP: 0.95,
                    maxOutputTokens: 512,
                },
            });
            const responseText = result.response.text();
            historyRef.current.push({ role: "model", parts: [{ text: responseText }] });
            setMessages(prev => [...prev, { sender: 'bot', text: responseText }]);
        } catch (error) {
            historyRef.current.pop();
            console.error("Chat error:", error);
            setMessages(prev => [...prev, { sender: 'bot', text: "Hmm, that one didn't go through. Blame the network gremlins. Try again?" }]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <>
            {/* Floating Action Button */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className="fixed bottom-6 right-6 z-50 p-4 bg-engineering-orange text-white clip-diagonal shadow-[0_0_20px_rgba(249,115,22,0.4)] hover:shadow-[0_0_30px_rgba(249,115,22,0.8)] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center group"
                        onClick={() => setIsOpen(true)}
                    >
                        <MessageSquare className="w-6 h-6 group-hover:scale-110 transition-transform" />
                        <span className="absolute -top-1 -right-1 flex h-4 w-4">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-4 w-4 bg-white"></span>
                        </span>
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="fixed bottom-6 right-6 z-50 w-[350px] sm:w-[400px] bg-[#0F141A] border border-white/10 shadow-[0_10px_50px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden"
                        style={{ height: '550px', maxHeight: 'calc(100vh - 48px)' }}
                    >
                        {/* Header */}
                        <div className="bg-[#162032] border-b border-engineering-orange/30 p-4 flex justify-between items-center relative overflow-hidden">
                            {/* Technical background pattern */}
                            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '10px 10px' }}></div>

                            <div className="flex items-center gap-3 relative z-10">
                                <div className="w-10 h-10 bg-[#1A232C] border border-white/5 flex items-center justify-center relative overflow-hidden">
                                    <Settings className="w-5 h-5 text-engineering-orange animate-[spin_4s_linear_infinite]" />
                                </div>
                                <div>
                                    <h3 className="text-white font-display font-bold uppercase tracking-widest text-sm flex items-center gap-2">
                                        Maxi-Bot AI
                                        <div className="w-1.5 h-1.5 rounded-full bg-engineering-orange animate-pulse shadow-[0_0_5px_#F97316]"></div>
                                    </h3>
                                    <p className="text-white/40 text-[10px] font-mono tracking-wider flex items-center gap-1">
                                        <Terminal className="w-3 h-3" />
                                        v3.0 GEMINI ONLINE
                                    </p>
                                </div>
                            </div>

                            <button onClick={() => setIsOpen(false)} className="text-white/50 hover:text-white transition-colors p-2 hover:bg-white/5 rounded relative z-10">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-grow p-4 overflow-y-auto bg-[url('/images/hero.png')] bg-cover bg-center bg-blend-overlay bg-industrial-dark/95 flex flex-col gap-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                            {messages.map((msg, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: msg.sender === 'user' ? 20 : -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`max-w-[85%] p-3 text-sm relative ${msg.sender === 'user'
                                        ? 'bg-engineering-orange text-white'
                                        : 'bg-[#1A232C] text-metallic-silver border border-white/5 shadow-inner'
                                        }`}>
                                        {msg.sender === 'bot' && (
                                            <>
                                                <div className="absolute top-0 left-0 w-1 h-full bg-engineering-orange/50"></div>
                                                <span className="text-[10px] text-engineering-orange uppercase tracking-widest block font-mono mb-2 border-b border-engineering-orange/20 pb-1">System</span>
                                            </>
                                        )}
                                        <p className="leading-relaxed whitespace-pre-wrap font-sans">{msg.text}</p>
                                    </div>
                                </motion.div>
                            ))}

                            {isTyping && (
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="flex justify-start"
                                >
                                    <div className="bg-[#1A232C] border border-white/5 p-4 relative overflow-hidden">
                                        <div className="absolute top-0 left-0 w-1 h-full bg-engineering-orange/30"></div>
                                        <div className="flex gap-1.5 items-center pl-2">
                                            <div className="w-1.5 h-1.5 bg-engineering-orange/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                            <div className="w-1.5 h-1.5 bg-engineering-orange/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                            <div className="w-1.5 h-1.5 bg-engineering-orange/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-4 bg-[#162032] border-t border-white/5 relative z-10">
                            <div className="flex items-center gap-2">
                                <div className="flex-grow flex items-center bg-[#0F141A] border border-white/10 focus-within:border-engineering-orange transition-colors relative">
                                    <span className="pl-3 text-engineering-orange/50 font-mono text-xs">{'>'}</span>
                                    <input
                                        type="text"
                                        className="w-full bg-transparent text-white text-sm px-3 py-3 focus:outline-none font-sans"
                                        placeholder="Ask about bearings, specs, quotes..."
                                        value={inputText}
                                        onChange={(e) => setInputText(e.target.value)}
                                                        onKeyDown={(e) => e.key === 'Enter' && !isTyping && handleSend()}
                                        disabled={isTyping}
                                    />
                                    {inputText.length > 0 && (
                                        <div className="absolute right-3 w-1.5 h-4 bg-engineering-orange animate-pulse"></div>
                                    )}
                                </div>
                                <button
                                    onClick={handleSend}
                                    disabled={isTyping}
                                    className="p-3 bg-[#1A232C] hover:bg-engineering-orange border border-white/5 hover:border-engineering-orange text-white transition-all group flex-shrink-0 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-[#1A232C] disabled:hover:border-white/5"
                                >
                                    <Send className="w-5 h-5 group-hover:scale-110 transition-transform -ml-0.5 mt-0.5" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Chatbot;
