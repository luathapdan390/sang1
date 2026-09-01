export type SkillType = 'TU' | 'QUET' | 'DOC';

export interface RawQuestion {
  cau: number;
  kyNang: SkillType;
  hoi: string;
  A: string;
  B: string;
  C: string;
  D: string;
  dapAn: 'A' | 'B' | 'C' | 'D';
}

export interface PreparedQuestion {
  id: number;
  originalCau: number;
  kyNang: SkillType;
  hoi: string;
  options: string[];
  correctAnswerText: string;
}

export interface SkillDetail {
  dung: number;
  tong: number;
}

export interface SubmissionPayload {
  ten: string;
  lop: string;
  diem: number;
  tongCau: number;
  url: string;
  chiTiet: {
    TU: SkillDetail;
    QUET: SkillDetail;
    DOC: SkillDetail;
  };
}
