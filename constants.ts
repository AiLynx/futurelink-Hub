
import { QuizQuestion } from './types';

export const POINTS_PER_QUIZ = 100;
export const POINTS_PER_LEVEL = 150;

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    prompt: 'ในวันหยุด คุณชอบทำกิจกรรมแบบไหนมากที่สุด?',
    type: 'multiple-choice-image',
    key: 'activity',
    options: [
      { value: 'สร้างสรรค์', label: 'วาดรูป/ประดิษฐ์', image: 'https://picsum.photos/seed/art/400/300' },
      { value: 'สำรวจธรรมชาติ', label: 'เดินป่า/ดูดาว', image: 'https://picsum.photos/seed/nature/400/300' },
      { value: 'เทคโนโลยี', label: 'เขียนโค้ด/เล่นเกม', image: 'https://picsum.photos/seed/tech/400/300' },
      { value: 'ช่วยเหลือผู้อื่น', label: 'ทำงานอาสาสมัคร', image: 'https://picsum.photos/seed/help/400/300' },
    ],
  },
  {
    id: 'q2',
    prompt: 'วิชาไหนในโรงเรียนที่คุณรู้สึกสนุกและท้าทายมากที่สุด?',
    type: 'multiple-choice-text',
    key: 'subject',
    options: [
      { value: 'วิทยาศาสตร์และคณิตศาสตร์', label: 'วิทยาศาสตร์และคณิตศาสตร์' },
      { value: 'ศิลปะและดนตรี', label: 'ศิลปะและดนตรี' },
      { value: 'ภาษาและสังคมศาสตร์', label: 'ภาษาและสังคมศาสตร์' },
      { value: 'พละศึกษาและกิจกรรม', label: 'พละศึกษาและกิจกรรม' },
    ],
  },
  {
    id: 'q3',
    prompt: 'คุณชอบทำงานแบบไหนมากกว่ากัน?',
    type: 'multiple-choice-text',
    key: 'workStyle',
    options: [
      { value: 'ทำงานคนเดียวอย่างมีสมาธิ', label: 'ทำงานคนเดียวอย่างมีสมาธิ' },
      { value: 'ทำงานเป็นทีมและแลกเปลี่ยนความคิดเห็น', label: 'ทำงานเป็นทีมและแลกเปลี่ยนความคิดเห็น' },
      { value: 'ผสมผสานกันระหว่างสองอย่าง', label: 'ผสมผสานกันระหว่างสองอย่าง' },
      { value: 'เป็นผู้นำและวางแผนให้ทีม', label: 'เป็นผู้นำและวางแผนให้ทีม' },
    ],
  },
  {
    id: 'q4',
    prompt: 'ถ้ามีพลังวิเศษหนึ่งอย่าง คุณอยากจะแก้ปัญหาอะไรในโลกนี้?',
    type: 'open-ended',
    key: 'passion',
  },
];
