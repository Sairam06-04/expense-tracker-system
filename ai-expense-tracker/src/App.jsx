import { useState } from 'react';
import './index.css';
import { analyzeExpensesWithAI } from './services/aiParser';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import * as XLSX from 'xlsx';

const COLORS = ['#0ea5e9', '#10b981', '#f59e0b', '#f43f5e', '#8b5cf6', '#94a3b8'];
const BAR_COLOR = '#3b82f6'; 

function App() {
  const [started, setStarted] = useState(false);
  const [file, setFile] = useState(null);
  const [analysisData, setAnalysisData] = useState(null); 
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const finishAnalysis = (data) => {
    if (data) setAnalysisData(data);
    else alert("The AI had trouble reading that file. Please ensure it is a clear bank statement.");
    setIsAnalyzing(false);
  };

  const handleFileAnalysis = async () => {
    if (!file) return alert("Please upload a file first!");
    setIsAnalyzing(true);
    setAnalysisData(null); 

    const fileExtension = file.name.split('.').pop().toLowerCase();

    if (fileExtension === 'xlsx' || fileExtension === 'xls') {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const csvText = XLSX.utils.sheet_to_csv(workbook.Sheets[workbook.SheetNames[0]]);
        finishAnalysis(await analyzeExpensesWithAI(csvText, 'text'));
      };
      reader.readAsArrayBuffer(file);
    } else if (fileExtension === 'pdf') {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64Code = e.target.result.split(',')[1]; 
        finishAnalysis(await analyzeExpensesWithAI(base64Code, 'pdf'));
      };
      reader.readAsDataURL(file);
    } else {
      const reader = new FileReader();
      reader.onload = async (e) => {
        finishAnalysis(await analyzeExpensesWithAI(e.target.result, 'text'));
      };
      reader.readAsText(file);
    }
  };

  // --- MODERN LANDING PAGE ---
  if (!started) {
    return (
      <div className="container" style={{ marginTop: '8vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        {/* Main Hero Section */}
        <div style={{ textAlign: 'center', maxWidth: '650px', marginBottom: '4rem' }}>
          <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', fontWeight: '800', letterSpacing: '-0.02em', color: '#0f172a' }}>
            Smart Expense Tracker
          </h1>
          <p style={{ color: '#475569', fontSize: '1.25rem', marginBottom: '2.5rem', lineHeight: '1.6' }}>
            Professional financial analytics powered by AI. Transform your raw bank statements into actionable business insights instantly.
          </p>
          <button 
            onClick={() => setStarted(true)}
            style={{ 
              fontSize: '1.1rem', 
              padding: '1rem 2.5rem', 
              borderRadius: '8px', 
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
              transition: 'transform 0.2s, box-shadow 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            Go to Dashboard
          </button>
        </div>

        {/* Feature Grid */}
        <div className="metrics-grid" style={{ width: '100%', maxWidth: '1000px' }}>
          <div className="card" style={{ textAlign: 'left', padding: '2rem', marginBottom: '0' }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📄</div>
            <h3 style={{ marginTop: 0, marginBottom: '0.75rem', color: '#0f172a' }}>Multi-Format Support</h3>
            <p style={{ color: '#64748b', margin: 0, lineHeight: '1.6' }}>
              Upload CSV, TXT, Excel, or complex PDF bank statements. The system processes them seamlessly.
            </p>
          </div>
          
          <div className="card" style={{ textAlign: 'left', padding: '2rem', marginBottom: '0' }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🧠</div>
            <h3 style={{ marginTop: 0, marginBottom: '0.75rem', color: '#0f172a' }}>AI-Powered Parsing</h3>
            <p style={{ color: '#64748b', margin: 0, lineHeight: '1.6' }}>
              Advanced LLM processing automatically categorizes transactions and extracts operational metrics.
            </p>
          </div>

          <div className="card" style={{ textAlign: 'left', padding: '2rem', marginBottom: '0' }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📊</div>
            <h3 style={{ marginTop: 0, marginBottom: '0.75rem', color: '#0f172a' }}>Visual Analytics</h3>
            <p style={{ color: '#64748b', margin: 0, lineHeight: '1.6' }}>
              Interactive charts and automatic anomaly detection designed for rapid business-level reviews.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // --- MAIN DASHBOARD ---
  return (
    <div className="container">
      <h1 style={{marginBottom: '2rem', fontSize: '2.5rem'}}>Financial Dashboard</h1>
      
      <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <input 
          type="file" 
          accept=".csv, .txt, .pdf, .xlsx, .xls" 
          onChange={(e) => setFile(e.target.files[0])} 
          style={{ flex: 1, padding: '0.5rem', border: '1px solid #e2e8f0', borderRadius: '6px' }}
        />
        <button onClick={handleFileAnalysis} disabled={isAnalyzing}>
          {isAnalyzing ? "Analyzing Data..." : "Generate Dashboard"}
        </button>
      </div>

      {analysisData && (
        <>
          {/* Top Section: Overview Metrics */}
          <div className="metrics-grid">
            <div className="metric-card">
              <div className="metric-title">Total Income</div>
              <div className="metric-value" style={{color: 'var(--success)'}}>
                ${analysisData.metrics?.income || 0}
              </div>
            </div>
            <div className="metric-card">
              <div className="metric-title">Total Expenses</div>
              <div className="metric-value" style={{color: 'var(--danger)'}}>
                ${analysisData.metrics?.expenses || 0}
              </div>
            </div>
            <div className="metric-card">
              <div className="metric-title">Net Savings</div>
              <div className="metric-value">
                ${analysisData.metrics?.savings || 0}
              </div>
            </div>
          </div>

          {/* Secondary Metrics: Behavior & Anomalies */}
          <div className="metrics-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
             <div className="metric-card" style={{ background: '#f8fafc' }}>
              <div className="metric-title">Transaction Volume</div>
              <div className="metric-value" style={{ fontSize: '1.75rem' }}>
                {analysisData.metrics?.totalTransactions || 0} Transactions
              </div>
            </div>
            <div className="metric-card" style={{ background: '#fef2f2', borderColor: '#fee2e2' }}>
              <div className="metric-title">Largest Single Expense</div>
              <div className="metric-value" style={{ fontSize: '1.75rem', color: '#b91c1c' }}>
                ${analysisData.metrics?.largestExpense?.amount || 0} 
                <span style={{ fontSize: '1rem', color: '#7f1d1d', marginLeft: '10px', fontWeight: 'normal' }}>
                  ({analysisData.metrics?.largestExpense?.name || 'Unknown'})
                </span>
              </div>
            </div>
          </div>

          {/* AI Insights */}
          <div className="card" style={{ background: '#f8fafc', borderLeft: '4px solid #0f172a' }}>
            <h3 style={{ marginTop: 0, marginBottom: '0.5rem' }}>AI Business Insights</h3>
            <p style={{ margin: 0, lineHeight: 1.6 }}>{analysisData.recommendation}</p>
          </div>

          {/* Charts Section */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
            
            {/* Donut Chart */}
            <div className="card" style={{ marginBottom: 0 }}>
              <h3 style={{ marginTop: 0 }}>Expense Breakdown</h3>
              <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={analysisData.chartData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={70} 
                      outerRadius={110}
                      paddingAngle={5}
                      label
                    >
                      {analysisData.chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `$${value}`} />
                    <Legend verticalAlign="bottom" height={36}/>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Bar Chart */}
            <div className="card" style={{ marginBottom: 0 }}>
              <h3 style={{ marginTop: 0 }}>Payment Methods</h3>
              <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                  <BarChart data={analysisData.paymentData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} tickFormatter={(value) => `$${value}`} />
                    <Tooltip cursor={{fill: '#f1f5f9'}} formatter={(value) => `$${value}`} />
                    <Bar dataKey="value" fill={BAR_COLOR} radius={[4, 4, 0, 0]} barSize={40} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>
        </>
      )}
    </div>
  );
}

export default App;