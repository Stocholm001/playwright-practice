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



// import * as fs from 'fs';
// import { execSync } from 'child_process';

// const results: Record<string, string> = {};

// class ExcelReporter {
//   onTestEnd(test: any, result: any) {
//     const tcId = test.title.split(' ')[0];
//     const status = result.status === 'passed' ? 'Pass' : 'Fail';
//     const note = result.status !== 'passed' ? (() => {
//       const msg = result.errors?.[0]?.message ?? '';
//       const cleanMsg = msg.replace(/\x1B\[[0-9;]*m/g, '');  // ลบ ANSI ก่อน
      
//       const expectedMatch = cleanMsg.match(/Expected:.*?"([^"]+)"/);
//       const receivedMatch = cleanMsg.match(/Received:.*?"([^"]+)"/);

//       const expected = expectedMatch ? expectedMatch[1].replace('https://www.saucedemo.com', '') : '';
//       const received = receivedMatch ? receivedMatch[1].replace('https://www.saucedemo.com', '') : '';

//       return [`Expected: ${expected}`, `Received: ${received}`].filter(Boolean).join('\n');
//     })() : '';

//     results[tcId] = JSON.stringify({ status, note });
//     console.log(`${tcId} -> ${status} ${note}`);
//   }

//   onEnd() {
//     fs.writeFileSync('TestCase/results.json', JSON.stringify(results, null, 2));
//     execSync('python utils/excel/updateExcel.py');
//     console.log('Excel updated!');
//   }
// }

// export default ExcelReporter;





import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';

const results: Record<string, string> = {};
const VIDEO_TCS = ['TC-07', 'TC-08']; // ระบุเคสที่อยากเก็บ video

class ExcelReporter {
  async onTestEnd(test: any, result: any) {
    const tcId = test.title.split(' ')[0];
    const status = result.status === 'passed' ? 'Pass' : 'Fail';

    // --- Screenshot ---
    const attachment = result.attachments?.find((a: any) => a.name === 'screenshot');
    if (attachment?.path) {
      const titlePath = test.titlePath();
      const filePath = titlePath?.[2] ?? '';
      const module = filePath
        .split(/[\\\/]/)
        .pop()
        ?.replace(/^\d+\./, '')
        ?.replace('.spec.ts', '')
        ?? 'Unknown';

      const dir = path.join('TestResults', module, tcId);
      if (fs.existsSync(dir)) fs.rmSync(dir, { recursive: true, force: true });
      fs.mkdirSync(dir, { recursive: true });

      const dest = path.join(dir, `${tcId}.png`);
      const buffer = fs.readFileSync(attachment.path);
      fs.writeFileSync(dest, buffer);

      // --- Video ---
      const video = result.attachments?.find((a: any) => a.name === 'video');
      if (video?.path && VIDEO_TCS.includes(tcId)) {
        const videoDest = path.join(dir, `${tcId}.webm`);
        const videoBuffer = fs.readFileSync(video.path);
        fs.writeFileSync(videoDest, videoBuffer);
      }
    }

    // --- Note ---
    const note = result.status !== 'passed' ? (() => {
      const msg = result.errors?.[0]?.message ?? '';
      const cleanMsg = msg.replace(/\x1B\[[0-9;]*m/g, '');
      const expectedMatch = cleanMsg.match(/Expected:.*?"([^"]+)"/);
      const receivedMatch = cleanMsg.match(/Received:.*?"([^"]+)"/);
      const expected = expectedMatch ? expectedMatch[1].replace('https://www.saucedemo.com', '') : '';
      const received = receivedMatch ? receivedMatch[1].replace('https://www.saucedemo.com', '') : '';
      return [`Expected: ${expected}`, `Received: ${received}`].filter(Boolean).join('\n');
    })() : '';

    results[tcId] = JSON.stringify({ status, note });
    console.log(`${tcId} -> ${status} ${note}`);
  }

  onEnd() {
    fs.writeFileSync('TestCase/results.json', JSON.stringify(results, null, 2));
    execSync('python utils/excel/updateExcel.py');
    console.log('Excel updated!');
  }
}

export default ExcelReporter;