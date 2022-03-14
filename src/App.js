import { useState } from 'react';


function App() {
  const [calc, setCalc] = useState("");
  const [result, setResult] = useState("");
  const [answers, setAns] = useState([]);
  const [exp, setExp] = useState([]);
  const [blocks, setBlocks] = useState([]);
  const ops = ['/', '*','+','-', '.'];
  
  const updateCalc = value => {
    if (
      (ops.includes(value) && calc === '' )||( ops.includes(value) && ops.includes(calc.slice(-1)))
      ){
        return;
      }
      setCalc(calc + value);

    if (!ops.includes(value)){
      setResult(eval(calc + value).toString());
    }

  }
  const createDigits = () => {
    const digits = [];
    for(let i = 1; i< 10; i++){
      digits.push(<button
        onClick={() => updateCalc(i.toString())}
         key={i} 
       >{i}</button>)
    }
    return digits;
  }
  const calculate = () => { 
      
      
      
    if (calc.includes('+') || calc.includes('*') || calc.includes('/') || (calc.includes('-') && calc.indexOf("-") !== 0)){
        setCalc(eval(calc).toString());
        setAns([...answers, result]);
          
          setExp([...exp, calc]);
      }
    

   
    returnOldCalc();
  }
  const deleteLast = () => {
    if(calc == ''){
      return;
    }
    const value = calc.slice(0 , -1);
    setCalc(value);
    setResult(eval(value).toString());
  }
  const returnOldCalc = () => {
    
    if (answers.length !== exp.length){
      setAns([]);
      setExp([]);
    }
    
    
    for(let i = 0; i < answers.length; i++){
        
      
      setBlocks([...blocks, 
        <div className="submittedBlock" key={i}>
          <div className="submit-exp">{exp[i]}</div>
          <div className="submit-ans">{answers[i]}</div>
        </div>
      ]);
      localStorage.setItem("blocks", blocks);
      localStorage.setItem("exp", exp);
      localStorage.setItem("answers", answers);
    }
  
    
  }
  return (
    <div className="App">
      <aside>
        {blocks.map(block => block)}
        {/* <div class="submittedBlock">
          <div className="submit-exp">2+2+2</div>
          <div className="submit-ans">0</div>
        </div> */}
      </aside>
      <main className="Apps">
      <div className="calculator">
        <div className="display">
          {result ? <span>({result})</span> : ''} &nbsp; {calc || 0}

        </div>
        <div className="operators">
          <button onClick={() => updateCalc('/')}>/</button>
          <button onClick={() => updateCalc('*')}>*</button>
          <button onClick={() => updateCalc('+')}>+</button>
          <button onClick={() => updateCalc('-')}>-</button>
          <button onClick={deleteLast}>DEL</button>
        </div>
        <div className="digits">
          {createDigits()}
          <button onClick={() => updateCalc('0')}>0</button>
          <button onClick={() => updateCalc('.')}>.</button>
          <button onClick={() => calculate()}>=</button>

        </div>
      </div>
      </main>
    </div>
  );
}

export default App;
