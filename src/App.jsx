import React, { useState, useEffect, useRef } from 'react';
import { tutorData } from './data';

// --- VISUALIZERS ---

const FuzzyVisualizer = () => {
  const [alpha, setAlpha] = useState(0.5);
  
  // Triangle points: (10, 150) -> (150, 20) -> (290, 150)
  // Height = 130px. Y scales from 150 (y=0) to 20 (y=1).
  const yAlpha = 150 - (alpha * 130);
  
  // Intersect points for alpha line
  const x1 = 10 + (alpha * 140);
  const x2 = 290 - (alpha * 140);

  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl border border-slate-200 shadow-sm mt-6 mb-8 text-center">
      <h4 className="text-xl font-bold text-slate-800 mb-2">Interactive Alpha-Cut Visualizer</h4>
      <p className="text-sm text-slate-500 mb-6">Drag the slider to adjust the Alpha (α) threshold and see the resulting crisp interval (red line).</p>
      
      <div className="flex justify-center mb-6">
        <svg viewBox="0 0 320 180" className="w-full max-w-sm bg-slate-50 rounded-lg border border-slate-100 shadow-inner">
          {/* Axes */}
          <line x1="10" y1="150" x2="310" y2="150" stroke="#cbd5e1" strokeWidth="2" />
          <line x1="10" y1="10" x2="10" y2="150" stroke="#cbd5e1" strokeWidth="2" />
          <text x="150" y="170" className="text-[10px] fill-slate-500">Universe of Discourse (X)</text>
          <text x="15" y="25" className="text-[10px] fill-slate-500">μ(x)=1</text>
          <text x="15" y="145" className="text-[10px] fill-slate-500">μ(x)=0</text>
          
          {/* Fuzzy Triangle (Full) */}
          <polygon points="10,150 150,20 290,150" fill="rgba(99, 102, 241, 0.2)" stroke="#1e40af" strokeWidth="2" strokeDasharray="4 4" />
          
          {/* Alpha Cut Fill */}
          <polygon points={`10,150 ${x1},${yAlpha} ${x2},${yAlpha} 290,150`} fill="rgba(99, 102, 241, 0.6)" stroke="#1e3a8a" strokeWidth="2" />
          
          {/* Alpha Line */}
          <line x1="10" y1={yAlpha} x2="310" y2={yAlpha} stroke="#ef4444" strokeWidth="2" />
          <text x="280" y={yAlpha - 5} className="text-[10px] font-bold fill-red-500">α = {alpha}</text>
          
          {/* Crisp Interval */}
          <line x1={x1} y1="150" x2={x2} y2="150" stroke="#ef4444" strokeWidth="4" />
        </svg>
      </div>
      
      <div className="flex items-center gap-4 max-w-sm mx-auto">
        <span className="font-bold text-slate-700 text-sm">0.0</span>
        <input 
          type="range" 
          min="0" max="1" step="0.05" 
          value={alpha} 
          onChange={(e) => setAlpha(parseFloat(e.target.value))}
          className="w-full accent-blue-800 cursor-pointer"
        />
        <span className="font-bold text-slate-700 text-sm">1.0</span>
      </div>
    </div>
  );
};

const FuzzyOpsVisualizer = () => {
  const [op, setOp] = useState('union'); 
  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl border border-slate-200 shadow-sm mt-6 mb-8 text-center">
      <h4 className="text-xl font-bold text-slate-800 mb-2">Interactive Fuzzy Operations</h4>
      <p className="text-sm text-slate-500 mb-6">Select an operation to see how Fuzzy Union (MAX) and Intersection (MIN) trace the shapes.</p>
      
      <div className="flex justify-center mb-6">
        <svg viewBox="0 0 300 150" className="w-full max-w-sm bg-slate-50 rounded-lg border border-slate-100 shadow-inner">
          <line x1="20" y1="130" x2="280" y2="130" stroke="#cbd5e1" strokeWidth="2" />
          <text x="150" y="145" className="text-[10px] fill-slate-500 text-anchor-middle">Universe of Discourse</text>
          
          <polygon points="50,130 100,30 150,130" fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 4" />
          <polygon points="100,130 150,30 200,130" fill="none" stroke="#3b82f6" strokeWidth="2" strokeDasharray="4 4" />
          <text x="70" y="80" className="text-[10px] font-bold fill-red-500">Set A</text>
          <text x="175" y="80" className="text-[10px] font-bold fill-blue-500">Set B</text>

          {op === 'union' && (
            <polygon points="50,130 100,30 125,80 150,30 200,130" fill="rgba(168, 85, 247, 0.4)" stroke="#0369a1" strokeWidth="3" />
          )}
          {op === 'intersection' && (
            <polygon points="100,130 125,80 150,130" fill="rgba(168, 85, 247, 0.6)" stroke="#0369a1" strokeWidth="3" />
          )}
        </svg>
      </div>

      <div className="flex justify-center gap-4">
        <button onClick={() => setOp('union')} className={`px-4 py-2 text-sm rounded-md font-bold transition-colors ${op === 'union' ? 'bg-sky-700 text-white' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'}`}>Union (MAX)</button>
        <button onClick={() => setOp('intersection')} className={`px-4 py-2 text-sm rounded-md font-bold transition-colors ${op === 'intersection' ? 'bg-sky-700 text-white' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'}`}>Intersection (MIN)</button>
      </div>
    </div>
  );
};

const GradientDescentVisualizer = () => {
  const [x, setX] = useState(8);
  const [lr, setLr] = useState(0.1);
  const [history, setHistory] = useState([8]);

  const step = () => {
    const grad = 2 * x;
    const newX = x - (lr * grad);
    setX(newX);
    setHistory([...history, newX]);
  };

  const reset = () => { setX(8); setHistory([8]); };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl border border-slate-200 shadow-sm mt-6 mb-8 text-center">
      <h4 className="text-xl font-bold text-slate-800 mb-2">Gradient Descent Simulator</h4>
      <p className="text-sm text-slate-500 mb-6">See how Learning Rate (α) affects weight updates. High rates bounce out, low rates are too slow!</p>

      <div className="flex justify-center mb-6">
        <svg viewBox="0 0 200 150" className="w-full max-w-sm bg-slate-50 rounded-lg border border-slate-100 shadow-inner">
          <path d="M 0 10 Q 100 170 200 10" fill="none" stroke="#cbd5e1" strokeWidth="2" />
          {history.map((hx, idx) => {
            const px = (hx + 10) * 10;
            const py = 130 - ((hx * hx) * 1.2);
            return (
              <g key={idx}>
                {idx > 0 && <line x1={(history[idx-1] + 10) * 10} y1={130 - ((history[idx-1] * history[idx-1]) * 1.2)} x2={px} y2={py} stroke="#ef4444" strokeWidth="2" strokeDasharray="2 2" />}
                <circle cx={px} cy={py} r={idx === history.length - 1 ? 5 : 3} fill={idx === history.length - 1 ? "#1e3a8a" : "#94a3b8"} />
              </g>
            );
          })}
        </svg>
      </div>

      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-4 w-full max-w-xs">
          <span className="text-sm font-bold text-slate-700">Learning Rate: {lr}</span>
          <input type="range" min="0.01" max="1.1" step="0.05" value={lr} onChange={(e) => setLr(parseFloat(e.target.value))} className="flex-1 accent-blue-800" />
        </div>
        <div className="flex gap-2">
          <button onClick={step} className="px-6 py-2 text-sm bg-blue-800 text-white font-bold rounded-md hover:bg-blue-900">Take Step</button>
          <button onClick={reset} className="px-6 py-2 text-sm bg-slate-200 text-slate-700 font-bold rounded-md hover:bg-slate-300">Reset</button>
        </div>
      </div>
    </div>
  );
};

const PSOVisualizer = () => {
  const [c1, setC1] = useState(1.0); 
  const [c2, setC2] = useState(1.0); 

  const vCognitive = { x: -100 * c1 * 0.5, y: -100 * c1 * 0.5 };
  const vSocial = { x: 100 * c2 * 0.5, y: -100 * c2 * 0.5 };
  const vTotal = { x: vCognitive.x + vSocial.x, y: vCognitive.y + vSocial.y };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl border border-slate-200 shadow-sm mt-6 mb-8 text-center">
      <h4 className="text-xl font-bold text-slate-800 mb-2">PSO Vector Calculator</h4>
      <p className="text-sm text-slate-500 mb-6">Adjust cognitive (Personal Best) and social (Global Best) attraction to see the final velocity vector.</p>

      <div className="flex justify-center mb-6">
        <svg viewBox="0 0 300 200" className="w-full max-w-sm bg-slate-50 rounded-lg border border-slate-100 shadow-inner">
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#0369a1" />
            </marker>
          </defs>
          <circle cx="50" cy="50" r="6" fill="#3b82f6" />
          <text x="35" y="40" className="text-[10px] font-bold fill-blue-600">P_best</text>

          <circle cx="250" cy="50" r="6" fill="#ef4444" />
          <text x="240" y="40" className="text-[10px] font-bold fill-red-600">G_best</text>

          <circle cx="150" cy="150" r="8" fill="#10b981" />
          <text x="135" y="170" className="text-[10px] font-bold fill-emerald-600">Particle</text>

          <line x1="150" y1="150" x2={150 + vCognitive.x} y2={150 + vCognitive.y} stroke="#3b82f6" strokeWidth="2" strokeDasharray="4 4" />
          <line x1="150" y1="150" x2={150 + vSocial.x} y2={150 + vSocial.y} stroke="#ef4444" strokeWidth="2" strokeDasharray="4 4" />
          <line x1="150" y1="150" x2={150 + vTotal.x} y2={150 + vTotal.y} stroke="#0369a1" strokeWidth="4" markerEnd="url(#arrow)" />
        </svg>
      </div>

      <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
        <div className="flex flex-col items-center">
          <label className="text-xs font-bold text-blue-600 mb-1">Cognitive (c1): {c1.toFixed(1)}</label>
          <input type="range" min="0" max="2" step="0.1" value={c1} onChange={e=>setC1(parseFloat(e.target.value))} className="w-full accent-blue-500" />
        </div>
        <div className="flex flex-col items-center">
          <label className="text-xs font-bold text-red-600 mb-1">Social (c2): {c2.toFixed(1)}</label>
          <input type="range" min="0" max="2" step="0.1" value={c2} onChange={e=>setC2(parseFloat(e.target.value))} className="w-full accent-red-500" />
        </div>
      </div>
    </div>
  );
};

const NeuronVisualizer = () => {
  const [x1, setX1] = useState(1);
  const [x2, setX2] = useState(0);
  const [w1, setW1] = useState(0.5);
  const [w2, setW2] = useState(-0.5);
  const [bias, setBias] = useState(0.2);
  const [threshold, setThreshold] = useState(0.5);

  const netInput = (x1 * w1) + (x2 * w2) + bias;
  const output = netInput >= threshold ? 1 : 0;

  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl border border-slate-200 shadow-sm mt-6 mb-8">
      <h4 className="text-xl font-bold text-slate-800 mb-2 text-center">Interactive McCulloch-Pitts Neuron</h4>
      <p className="text-sm text-slate-500 mb-6 text-center">Tweak the inputs and weights to see how the neuron computes its summation and triggers the activation function.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        {/* Inputs & Weights */}
        <div className="space-y-4 bg-slate-50 p-4 rounded-lg border border-slate-100">
          <div>
            <label className="text-[10px] font-bold text-slate-600 uppercase">Input X1 & Weight W1</label>
            <div className="flex gap-2 mt-1">
              <input type="number" value={x1} onChange={e=>setX1(parseFloat(e.target.value)||0)} className="w-1/2 p-2 border rounded text-sm" placeholder="X1" />
              <input type="number" value={w1} onChange={e=>setW1(parseFloat(e.target.value)||0)} className="w-1/2 p-2 border rounded text-sm" placeholder="W1" />
            </div>
          </div>
          <div>
            <label className="text-[10px] font-bold text-slate-600 uppercase">Input X2 & Weight W2</label>
            <div className="flex gap-2 mt-1">
              <input type="number" value={x2} onChange={e=>setX2(parseFloat(e.target.value)||0)} className="w-1/2 p-2 border rounded text-sm" placeholder="X2" />
              <input type="number" value={w2} onChange={e=>setW2(parseFloat(e.target.value)||0)} className="w-1/2 p-2 border rounded text-sm" placeholder="W2" />
            </div>
          </div>
          <div>
            <label className="text-[10px] font-bold text-slate-600 uppercase">Bias (b)</label>
            <input type="number" value={bias} onChange={e=>setBias(parseFloat(e.target.value)||0)} className="w-full p-2 border rounded mt-1 text-sm" />
          </div>
        </div>

        {/* Summation */}
        <div className="flex flex-col items-center justify-center bg-slate-100 p-4 sm:p-6 rounded-full aspect-square border-4 border-blue-200 shadow-inner relative max-w-[180px] mx-auto">
          <div className="text-[10px] font-bold text-blue-800 mb-1">Summation (Y_in)</div>
          <div className="text-2xl sm:text-3xl font-black text-blue-800">{netInput.toFixed(2)}</div>
          <div className="text-[8px] text-blue-400 mt-2 text-center absolute bottom-4">
            ({x1}×{w1}) + ({x2}×{w2}) + {bias}
          </div>
        </div>

        {/* Activation */}
        <div className="space-y-4 bg-slate-50 p-4 rounded-lg border border-slate-100 flex flex-col justify-center h-full">
          <div>
            <label className="text-[10px] font-bold text-slate-600 uppercase">Threshold (θ)</label>
            <input type="number" value={threshold} onChange={e=>setThreshold(parseFloat(e.target.value)||0)} className="w-full p-2 border rounded mt-1 text-sm" />
          </div>
          <div className="text-center mt-4">
            <div className="text-[10px] font-bold text-slate-600 uppercase mb-2">Final Output</div>
            <div className={`text-4xl font-black ${output === 1 ? 'text-emerald-500' : 'text-red-500'}`}>
              {output}
            </div>
            <div className="text-[10px] text-slate-500 mt-2">
              (Y_in {netInput >= threshold ? '≥' : '<'} {threshold})
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const GAVisualizer = () => {
  const [f1, setF1] = useState(10);
  const [f2, setF2] = useState(20);
  const [f3, setF3] = useState(50);
  const [f4, setF4] = useState(20);

  const total = f1 + f2 + f3 + f4;
  const p1 = total === 0 ? 0 : ((f1 / total) * 100).toFixed(1);
  const p2 = total === 0 ? 0 : ((f2 / total) * 100).toFixed(1);
  const p3 = total === 0 ? 0 : ((f3 / total) * 100).toFixed(1);
  const p4 = total === 0 ? 0 : ((f4 / total) * 100).toFixed(1);

  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl border border-slate-200 shadow-sm mt-6 mb-8">
      <h4 className="text-xl font-bold text-slate-800 mb-2 text-center">Interactive Roulette Wheel Math</h4>
      <p className="text-sm text-slate-500 mb-6 text-center">Change the fitness scores of the 4 individuals to see how their probability (slice of the wheel) mathematically changes.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-3">
          {[
            { id: 1, val: f1, set: setF1, color: 'bg-blue-700' },
            { id: 2, val: f2, set: setF2, color: 'bg-emerald-500' },
            { id: 3, val: f3, set: setF3, color: 'bg-amber-500' },
            { id: 4, val: f4, set: setF4, color: 'bg-rose-500' }
          ].map(item => (
            <div key={item.id} className="flex items-center gap-4">
              <div className={`w-4 h-4 rounded-full ${item.color} shrink-0`}></div>
              <label className="font-bold text-slate-700 text-sm w-24">Indiv {item.id} Fitness:</label>
              <input 
                type="number" min="0" 
                value={item.val} 
                onChange={e => item.set(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-20 p-2 border rounded text-sm"
              />
            </div>
          ))}
          <div className="mt-4 pt-4 border-t border-slate-200 font-bold text-slate-800 text-lg">
            Total Fitness: {total}
          </div>
        </div>

        <div className="space-y-4">
          <div className="text-center font-bold text-slate-700 mb-2">Selection Probabilities</div>
          {[
            { id: 1, p: p1, color: 'bg-blue-700' },
            { id: 2, p: p2, color: 'bg-emerald-500' },
            { id: 3, p: p3, color: 'bg-amber-500' },
            { id: 4, p: p4, color: 'bg-rose-500' }
          ].map(item => (
            <div key={item.id}>
              <div className="flex justify-between text-xs sm:text-sm mb-1 font-semibold text-slate-600">
                <span>Indiv {item.id}</span>
                <span>{item.p}%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-4 overflow-hidden border border-slate-200">
                <div className={`${item.color} h-4 transition-all duration-500 ease-out`} style={{ width: `${item.p}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  };

const VisualizerSelector = ({ type }) => {
  if (type === 'fuzzy') return <FuzzyVisualizer />;
  if (type === 'fuzzy_ops') return <FuzzyOpsVisualizer />;
  if (type === 'neuron') return <NeuronVisualizer />;
  if (type === 'gradient') return <GradientDescentVisualizer />;
  if (type === 'ga') return <GAVisualizer />;
  if (type === 'pso') return <PSOVisualizer />;
  return null;
};

// --- CHAT WIDGET ---

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi! I am your Interactive Study Assistant. I have loaded the syllabus and materials. Let me know if you need any mathematical breakdown or concept explanation!' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const toggleChat = () => setIsOpen(!isOpen);

  const formatText = (text) => {
    return text.split('\n').map((line, i) => {
      if (line.trim() === '') return <br key={i} />;
      const parts = line.split(/(\*\*.*?\*\*)/g);
      return (
        <span key={i}>
          {parts.map((part, j) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return <strong key={j} className="font-bold">{part.slice(2, -2)}</strong>;
            }
            return part;
          })}
          <br />
        </span>
      );
    });
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const contextText = tutorData.map(topic => 
        `Chapter: ${topic.title}\nSimplified Concept: ${topic.easyConcept}\nExam Q&A:\n${topic.examQuestions.map(q => `Q: ${q.q}\nA: ${q.a}`).join('\n')}`
      ).join('\n\n--- \n\n');
      
      const systemMessage = {
        role: 'system',
        content: `You are an expert AI professor tutoring a 3rd-semester university student in Soft Computing. You have strict instructions to be incredibly helpful, clear, and interactive. 
        
Your knowledge base is strictly defined by the COURSE MATERIALS provided below. Use this exact knowledge to answer their questions. If they don't understand a math problem or concept from the site, break it down further, provide a step-by-step calculation, or explain the equations more clearly. Use simple markdown for formatting. 

COURSE MATERIALS:
${contextText}`
      };

      const apiMessages = [systemMessage, ...newMessages.map(m => ({ role: m.role, content: m.content }))];

      const response = await fetch('https://open.bigmodel.cn/api/paas/v4/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer __ZHIPU_API_KEY__'
        },
        body: JSON.stringify({
          model: 'glm-4.7-flash',
          messages: apiMessages,
          temperature: 0.7,
        })
      });

      const data = await response.json();
      if(data.choices && data.choices[0]){
         setMessages(prev => [...prev, { role: 'assistant', content: data.choices[0].message.content }]);
      } else {
         setMessages(prev => [...prev, { role: 'assistant', content: 'Oops, something went wrong fetching the answer. Please try again.' }]);
      }
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Network error connecting to the Study Assistant.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 flex flex-col items-end animate-fade-in">
      {isOpen && (
        <div className="bg-white border border-slate-200 shadow-2xl rounded-2xl w-[calc(100vw-2rem)] sm:w-[400px] mb-4 flex flex-col overflow-hidden transition-all duration-300" style={{ height: '500px', maxHeight: '70vh' }}>
          <div className="bg-blue-800 text-white p-3 sm:p-4 font-bold flex justify-between items-center shadow-md">
            <span className="flex items-center gap-2 text-sm sm:text-base">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              Interactive Study Assistant
            </span>
            <button onClick={toggleChat} className="text-white hover:text-blue-200 focus:outline-none">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>
          <div className="flex-1 p-3 sm:p-4 overflow-y-auto bg-slate-50 space-y-4">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[90%] p-3 rounded-xl shadow-sm text-[13px] sm:text-sm leading-relaxed ${msg.role === 'user' ? 'bg-blue-800 text-white rounded-tr-none' : 'bg-white text-slate-700 border border-slate-200 rounded-tl-none'}`}>
                  {formatText(msg.content)}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[85%] p-3 rounded-xl bg-white text-slate-500 border border-slate-200 rounded-tl-none italic text-sm flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-3 bg-white border-t border-slate-200 flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
              placeholder="Ask a question..."
              className="flex-1 border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700"
            />
            <button 
              onClick={sendMessage}
              disabled={isLoading || !input.trim()}
              className="bg-blue-800 text-white rounded-lg px-3 sm:px-4 py-2 hover:bg-blue-900 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-4 h-4 transform rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
            </button>
          </div>
        </div>
      )}
      <button 
        onClick={toggleChat}
        className="bg-blue-800 text-white p-3 sm:p-4 rounded-full shadow-2xl hover:bg-blue-900 transition-transform transform hover:scale-105 active:scale-95 flex items-center justify-center"
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
        )}
      </button>
    </div>
  );
};

// --- APP & UI COMPONENTS ---

const QuizComponent = ({ quizData }) => {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [longAnswers, setLongAnswers] = useState({});
  const [longFeedback, setLongFeedback] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [randomizedQuiz, setRandomizedQuiz] = useState([]);

  useEffect(() => {
    // Shuffle the quizData and select up to 10 questions
    const shuffled = [...quizData].sort(() => 0.5 - Math.random());
    setRandomizedQuiz(shuffled.slice(0, 10));
    // Reset state for new quiz
    setSelectedAnswers({});
    setLongAnswers({});
    setLongFeedback({});
    setShowResults(false);
  }, [quizData]);

  const handleSelect = (qIndex, optionIndex) => {
    if (showResults) return;
    setSelectedAnswers(prev => ({ ...prev, [qIndex]: optionIndex }));
  };

  const handleLongText = (qIndex, text) => {
    setLongAnswers(prev => ({ ...prev, [qIndex]: text }));
  };

  const checkAnswers = () => setShowResults(true);

  const evaluateLongAnswer = async (qIdx, question, userAnswer) => {
    if (!userAnswer || !userAnswer.trim()) return;
    setLongFeedback(prev => ({ ...prev, [qIdx]: { loading: true } }));

    try {
      const systemMessage = {
        role: 'system',
        content: `You are a strict but fair university professor grading a 3rd-semester student's answer for a Soft Computing exam.
        Question: "${question}"
        Student's Answer: "${userAnswer}"
        
        Task:
        1. Evaluate if the student's answer is correct, partially correct, or incorrect based on university-level Soft Computing principles.
        2. If correct, approve it explicitly and briefly state why.
        3. If incorrect or missing key details, tell the student exactly what to add or change. Do not just give the answer, provide constructive feedback on their specific text.
        4. Keep your feedback concise, direct, and under 3-4 sentences. Format key terms in bold.`
      };

      const response = await fetch('https://open.bigmodel.cn/api/paas/v4/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer __ZHIPU_API_KEY__'
        },
        body: JSON.stringify({
          model: 'glm-4.7-flash',
          messages: [systemMessage],
          temperature: 0.3,
        })
      });

      const data = await response.json();
      if(data.choices && data.choices[0]){
         setLongFeedback(prev => ({ ...prev, [qIdx]: { loading: false, feedback: data.choices[0].message.content } }));
      } else {
         setLongFeedback(prev => ({ ...prev, [qIdx]: { loading: false, feedback: 'Error grading answer.' } }));
      }
    } catch (err) {
      setLongFeedback(prev => ({ ...prev, [qIdx]: { loading: false, feedback: 'Network error while grading.' } }));
    }
  };

  const mcqQuestions = randomizedQuiz.filter(q => q.type === 'mcq' || !q.type);
  const longQuestions = randomizedQuiz.filter(q => q.type === 'long');

  return (
    <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 mt-8 shadow-sm">
      <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2 font-serif">
        <svg className="w-6 h-6 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path></svg>
        Random 10-Question Knowledge Check
      </h3>
      
      <div className="space-y-8">
        {/* Render MCQs */}
        {randomizedQuiz.map((qObj, rawIdx) => {
          if (qObj.type === 'long') return null;
          return (
          <div key={rawIdx} className="bg-white p-5 rounded-lg shadow-sm border border-slate-100">
            <p className="font-semibold text-slate-800 mb-4 text-lg">{rawIdx + 1}. {qObj.q}</p>
            <div className="space-y-2">
              {qObj.options.map((opt, oIdx) => {
                const isSelected = selectedAnswers[rawIdx] === oIdx;
                const isCorrect = oIdx === qObj.answer;
                
                let btnClass = "w-full text-left px-4 py-3 rounded-md border transition-all duration-200 ";
                
                if (!showResults) {
                  btnClass += isSelected ? "bg-slate-100 border-blue-700 text-blue-900 font-medium" : "bg-white border-slate-200 hover:bg-slate-50 text-slate-700";
                } else {
                  if (isCorrect) {
                    btnClass += "bg-emerald-50 border-emerald-500 text-emerald-700 font-medium";
                  } else if (isSelected && !isCorrect) {
                    btnClass += "bg-red-50 border-red-500 text-red-700 font-medium";
                  } else {
                    btnClass += "bg-white border-slate-200 text-slate-400 opacity-60";
                  }
                }

                return (
                  <button 
                    key={oIdx} 
                    onClick={() => handleSelect(rawIdx, oIdx)}
                    className={btnClass}
                    disabled={showResults}
                  >
                    {String.fromCharCode(65 + oIdx)}. {opt}
                  </button>
                );
              })}
            </div>
            
            {showResults && (
              <div className={`mt-4 p-4 rounded-md text-sm ${selectedAnswers[rawIdx] === qObj.answer ? "bg-emerald-50 text-emerald-800 border border-emerald-200" : "bg-red-50 text-red-800 border border-red-200"}`}>
                <span className="font-bold mr-2">{selectedAnswers[rawIdx] === qObj.answer ? "✓ Correct!" : "✗ Incorrect."}</span>
                {qObj.explanation}
              </div>
            )}
          </div>
        )})}

        {/* Render Long Questions */}
        {randomizedQuiz.map((qObj, rawIdx) => {
          if (qObj.type !== 'long') return null;
          const fb = longFeedback[rawIdx];
          
          return (
          <div key={rawIdx} className="bg-white p-5 rounded-lg shadow-sm border border-slate-100">
            <p className="font-semibold text-slate-800 mb-4 text-lg">{rawIdx + 1}. [Subjective] {qObj.q}</p>
            <textarea
              className="w-full border border-slate-300 rounded-lg p-3 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-700 min-h-[100px]"
              placeholder="Type your exam answer here..."
              value={longAnswers[rawIdx] || ''}
              onChange={(e) => handleLongText(rawIdx, e.target.value)}
            />
            
            <button 
              onClick={() => evaluateLongAnswer(rawIdx, qObj.q, longAnswers[rawIdx])}
              disabled={!longAnswers[rawIdx] || (fb && fb.loading)}
              className="mt-3 bg-slate-800 text-white px-4 py-2 rounded-md hover:bg-slate-700 transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {fb && fb.loading ? (
                <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div> Grading Answer...</>
              ) : (
                <><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> Evaluate Answer</>
              )}
            </button>

            {fb && fb.feedback && (
              <div className="mt-4 p-4 bg-slate-100 border border-blue-100 rounded-md text-sm text-blue-900 leading-relaxed">
                <span className="font-bold block mb-1">👨‍🏫 Professor Feedback:</span>
                <span dangerouslySetInnerHTML={{ __html: fb.feedback.replace(/\n/g, '<br />').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
              </div>
            )}
          </div>
        )})}
      </div>

      {!showResults && Object.keys(selectedAnswers).length === mcqQuestions.length && mcqQuestions.length > 0 && (
        <button 
          onClick={checkAnswers}
          className="mt-8 w-full bg-blue-800 hover:bg-blue-900 text-white font-bold py-3 px-6 rounded-lg transition-colors shadow-md"
        >
          Submit MCQ Answers
        </button>
      )}
    </div>
  );
};

const QuestionCard = ({ q, a, index }) => {
  const [showAnswer, setShowAnswer] = useState(false);

  const formattedAnswer = a.split('\n').map((line, i) => {
    if (line.trim() === '') return <br key={i} />;
    
    // Replace markdown math with styled spans temporarily (simplified)
    const processedLine = line.replace(/\$(.*?)\$/g, (match, p1) => {
      return `<span class="font-mono text-blue-900 bg-slate-100 px-1 rounded">${p1}</span>`;
    });

    const parts = processedLine.split(/(\*\*.*?\*\*)/g);
    return (
      <span key={i}>
        {parts.map((part, j) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={j} className="font-bold text-slate-900">{part.slice(2, -2)}</strong>;
          }
          return <span key={j} dangerouslySetInnerHTML={{ __html: part }} />;
        })}
        <br />
      </span>
    );
  });

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 mb-4 overflow-hidden transition-all duration-300 hover:shadow-md">
      <button 
        className="w-full text-left p-5 flex justify-between items-start focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-inset"
        onClick={() => setShowAnswer(!showAnswer)}
      >
        <h4 className="font-semibold text-lg text-slate-800 pr-4 leading-tight">
          <span className="text-blue-700 mr-2">Q{index + 1}.</span>
          {q}
        </h4>
        <span className={`transform transition-transform duration-300 text-slate-400 ${showAnswer ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>
      
      <div 
        className={`transition-all duration-500 ease-in-out origin-top ${showAnswer ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="p-5 bg-slate-50 border-t border-slate-100 text-slate-700 text-base leading-relaxed">
          {formattedAnswer}
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const data = tutorData;


  const filteredData = data.filter(topic => 
    topic.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    topic.easyConcept.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBack = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSelectedTopic(null);
  };

  if (selectedTopic) {
    return (
    <>
      <div className="max-w-5xl mx-auto p-4 md:p-8 animate-fade-in relative pb-24">
        <button 
          onClick={handleBack}
          className="mb-6 text-slate-500 hover:text-blue-800 font-medium py-2 px-4 rounded-lg hover:bg-slate-100 transition-colors flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          Back to Curriculum
        </button>
        
        <div className="bg-white rounded-2xl p-6 md:p-10 shadow-xl border border-slate-100">
          <header className="mb-10 pb-6 border-b border-slate-100">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-4 tracking-tight font-serif">
              {selectedTopic.title}
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                <h4 className="text-blue-800 font-bold mb-2 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  Concept Simplified
                </h4>
                <p className="text-blue-900/80 text-sm leading-relaxed">
                  {selectedTopic.easyConcept}
                </p>
              </div>
              
              <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100">
                <h4 className="text-emerald-800 font-bold mb-2 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                  Visual & Diagram Guide
                </h4>
                <p className="text-emerald-900/80 text-sm leading-relaxed">
                  {selectedTopic.visualGuide}
                </p>
              </div>
            </div>
          </header>

          <VisualizerSelector type={selectedTopic.hasVisualizer} />

          <section className="mb-12">
            <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2 font-serif">
              <svg className="w-6 h-6 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
              Mathematical Solutions & Q&A
            </h3>
            <div className="space-y-4">
              {selectedTopic.examQuestions.map((item, idx) => (
                <QuestionCard key={idx} q={item.q} a={item.a} index={idx} />
              ))}
            </div>
          </section>

          <section>
            <QuizComponent key={selectedTopic.id} quizData={selectedTopic.quiz} />
          </section>
        </div>
      </div>
      <ChatWidget />
    </>
    );
  }

  return (
    <>
      <div className="max-w-6xl mx-auto p-4 sm:p-6 py-10 sm:py-16 animate-fade-in relative pb-24">
        <div className="text-center mb-10 sm:mb-16">
          <span className="uppercase tracking-widest text-[10px] sm:text-sm font-bold text-blue-700 mb-2 block">MAKAUT Advanced Syllabus</span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4 font-serif">
            Soft Computing Mastery
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
            Deep mathematics, step-by-step algorithms, and interactive study tools to guarantee exam success.
          </p>
        </div>

        <div className="max-w-2xl mx-auto mb-10 sm:mb-12 relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            className="block w-full pl-11 pr-4 py-3 sm:py-4 bg-white border border-slate-200 rounded-xl leading-5 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-blue-800 text-base sm:text-lg shadow-sm transition-all duration-300 font-serif"
            placeholder="Search for a topic, concept..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
          {filteredData.map((topic, idx) => (
            <div 
              key={idx}
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setSelectedTopic(topic);
              }}
              className="group bg-white rounded-2xl p-8 shadow-sm border border-slate-200 cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 bg-slate-100 text-blue-800 rounded-xl flex items-center justify-center font-bold text-xl group-hover:bg-blue-800 group-hover:text-white transition-colors">
                  {idx + 1}
                </div>
                {topic.hasVisualizer !== 'none' && (
                  <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                    Interactive
                  </span>
                )}
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-blue-800 transition-colors leading-tight font-serif">
                {topic.title.replace(/^\d+\.\s*/, '')}
              </h3>
              <p className="text-sm text-slate-500 mb-8 line-clamp-3 leading-relaxed">
                {topic.easyConcept}
              </p>
              
              <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400">
                  {topic.examQuestions.length} Math Problems
                </span>
                <span className="text-sm font-bold text-blue-800 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  Study Module <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ChatWidget />
    </>
  );
};

export default App;