const days = [
  'Domingo', 
  'Segunda', 
  'Terça', 
  'Quarta', 
  'Quinta', 
  'Sexta', 
  'Sábado'
];

module.exports = {
  daysOfWeek:days,
  dateLabel:(d=new Date()) => {
    let di = d.getDate();
    di = di < 10 ? `0${di}` : di;

    let m = d.getMonth() + 1;
    m = m < 10 ? `0${m}` : m;

    return `${days[d.getDay()]} ${di}/${m}/${d.getFullYear()}`;
  },
  reportDateLabel:(d=new Date()) => {
    let di = d.getDate();
    di = di < 10 ? `0${di}` : di;

    let m = d.getMonth() + 1;
    m = m < 10 ? `0${m}` : m;

    return `${days[d.getDay()]}_${di}_${m}_${d.getFullYear()}`;
  },
};