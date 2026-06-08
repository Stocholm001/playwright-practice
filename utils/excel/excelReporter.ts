// import * as fs from 'fs';
// import { execSync } from 'child_process';

// const results: Record<string, string> = {};

// class ExcelReporter {
//   onTestEnd(test: any, result: any) {
//     const tcId = test.title.split(' ')[0];
//     results[tcId] = result.status === 'passed' ? 'Pass' : 'Fail';
//     console.log(`${tcId} -> ${results[tcId]}`);
//   }

//   onEnd() {
//     fs.writeFileSync('D:/TestResults/results.json', JSON.stringify(results, null, 2));
//     execSync('python utils/excel/updateExcel.py');
//     console.log('Excel updated!');
//   }
// }

// export default ExcelReporter;



import * as fs from 'fs';
import { execSync } from 'child_process';

const results: Record<string, string> = {};

class ExcelReporter {
  onTestEnd(test: any, result: any) {
    const tcId = test.title.split(' ')[0];
    const status = result.status === 'passed' ? 'Pass' : 'Fail';
    const note = result.status !== 'passed' ? (() => {
      const msg = result.errors?.[0]?.message ?? '';
      const clean = (s: string) => s.replace(/\x1B\[[0-9;]*m/g, '').trim();
      
      const expectedMatch = msg.match(/Expected:.*?"([^"]+)"/);
      const receivedMatch = msg.match(/Received:.*?"([^"]+)"/);
      const timeoutMatch  = msg.match(/Timeout:\s*(\d+ms)/);
    
      const expected = expectedMatch ? `Expected: ${expectedMatch[1]}` : '';
      const received = receivedMatch ? `Received: ${receivedMatch[1]}` : '';
      const timeout  = timeoutMatch  ? `Timeout: ${timeoutMatch[1]}`  : '';
    
      return [clean(msg.split('\n')[0]), expected, received, timeout]
        .filter(Boolean).join('\n');
    })() : '';

    results[tcId] = JSON.stringify({ status, note });
    console.log(`${tcId} -> ${status} ${note}`);
  }

  onEnd() {
    fs.writeFileSync('D:/TestResults/results.json', JSON.stringify(results, null, 2));
    execSync('python utils/excel/updateExcel.py');
    console.log('Excel updated!');
  }
}

export default ExcelReporter;