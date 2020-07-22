import { Request, Response } from 'express';
import { parse } from 'qs';

function getillCase(req: Request, res: Response, u: string) {
  let realUrl = u;
  if (
    !realUrl ||
    Object.prototype.toString.call(realUrl) !== '[object String]'
  ) {
    realUrl = req.url;
  }
  const { id = -1 } = req.query;
  const params = parse(realUrl, true).query as unknown;
  if (id == -1) {
    const result = {
      code: 4056,
    };
    return res.json(result);
  }

  const result = {
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
          birthday: 'Thu, 16 Jul 2020 00:00:00 GMT',
          gender: '1',
          hospitalNumber: '12331211',
          id: 3,
          idNumber: '123456200001012234',
          patientName: 'test3',
          phoneNumber1: 12441355,
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
  };
  return res.json(result);
}

export default {
  'GET /api/illCase/allinfo/find': getillCase,
};
