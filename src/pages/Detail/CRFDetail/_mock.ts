import { Request, Response } from 'express';

function getillCase(req: Request, res: Response, u: string) {
  const result = {
    code: 200,
    data: { name: 123 },
  };
  return res.json(result);
}

export default {
  'GET /api/illCase/allinfo/find': {
    code: 200,
    data: {
      BloodBio: [],
      BloodRoutine: [],
      Coagulation: [],
      Cytokines: [],
      DetailTrePlan: [],
      FollInfo: [],
      ImageExams: [],
      Immunohis: [
        {
          ALKD5F3: 3,
          ALKD5F3N: 3,
        },
      ],
      IniDiaPro: [],
      Lung: [],
      LymSubsets: [],
      MoleDetec: [
        {
          ALK: 0,
          BIM: 0,
        },
      ],
      MyocardialEnzyme: [],
      OneToFive: [],
      OtherExams: [],
      Patient: [
        {
          account: ',54,',
          birthday: 'Wed, 08 Jul 2020 00:00:00 GMT',
          gender: null,
          hospitalNumber: null,
          id: 3,
          idNumber: '123',
          patientName: null,
          phoneNumber1: null,
          phoneNumber2: null,
          researchCenter: ',17,',
          updateTime: null,
        },
      ],
      Radiotherapy: [],
      SideEffect: [],
      Signs: [],
      Surgery: [],
      Thyroid: [],
      TreRec: [],
      TumorMarker: [],
      UrineRoutine: [],
      pastHis: [
        {
          basDisHis: null,
          drink: false,
          drinkingHis: null,
          drug: false,
          drugUseHis: null,
          hormone: false,
          hormoneUseHis: null,
          id: 4,
          infDisHis: '无',
          pid: 3,
          smoke: true,
          smokingHis: {
            smokeDayAvg: 1,
            smokeYearAvg: 1,
            stopSmoke: 0,
          },
          tumFamHis: null,
          tumHis: '大肠癌,鼻咽癌及头颈部肿瘤',
          tumor: true,
          tumorFam: false,
        },
      ],
    },
    msg: '病例的全部信息',
  },
};
