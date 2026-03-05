import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Settings, Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';
const genAI = new GoogleGenerativeAI(API_KEY);

const SYSTEM_PROMPT = `You are Maxi-Bot, the hilariously over-qualified AI assistant for Maxilead Bearings. You're like that one engineer at the office who gives brilliant answers but can't help adding a ridiculous comment. You're funny, warm, and a little dramatic — but always accurate.

KNOWLEDGE BASE:
COMPANY: Maxilead Bearings (High-performance heavy-duty bearings).
PRODUCTS:
- Journal Bearings (Type 1 & 2 for high load/speed)
- Thrust Bearings (Four Lobe, Single Side, Thrust Pads)
- Offset Bore Bearings (for thermal expansion)
- Thin Wall Bearings (compact & durable)
- Special Bearings (bespoke)
- Oil Seals, Inlet Fittings, and Feed Connectors.
TECH SPECS:
- Material Standard: ASTM B23 Alloy 2
- Testing: UT / DPT / RT
- Tolerance: ±0.005 mm
- OEM Conformity: 100% Guaranteed.
INDUSTRIES SERVED: Marine, Gearboxes, Industrial Pumps, Gas & Steam Turbines, Cement, Steel.
CONTACT INFO: +91 123 456 7890 | sales@maxieldbearings.com

RULES:
1. Keep replies SHORT — 1 to 3 sentences max. No essays. People have lives.
2. Be funny and conversational. Throw in a pun, a mock complaint, or a dramatic one-liner when it fits.
3. Always give the correct technical info when asked — jokes don't excuse wrong specs.
4. Plain text only. No markdown, no asterisks, no bullet formatting in replies.
5. For anything outside the knowledge base, dramatically claim it's "classified" or blame a fictional intern, then point them to sales@maxieldbearings.com.
6. Greet warmly, respond like a chat with a funny colleague — not a manual.`;

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { sender: 'bot', text: "Hey! Maxi-Bot here. Ask me anything about our bearings — I won't judge. Well, maybe a little." }
    ]);
    const [inputText, setInputText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);
    const historyRef = useRef([
        { role: "user", parts: [{ text: "Hello." }] },
        { role: "model", parts: [{ text: "Hey! Maxi-Bot here. Ask me anything about our bearings — I won't judge. Well, maybe a little." }] },
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
                generationConfig: { temperature: 0.7 },
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
                                        placeholder="Input command query..."
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
