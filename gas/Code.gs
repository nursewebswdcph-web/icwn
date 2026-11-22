/**
 * IC Indicator - Google Apps Script API
 * 1) Paste this file into Apps Script bound to the spreadsheet.
 * 2) Deploy as Web App: Execute as Me; access Anyone (Google account sign-in is enforced here).
 * 3) Add authorized emails in the Users sheet after the first setup request.
 */
const CONFIG = {
  SPREADSHEET_ID: '1u_96VmaDeQMXfxNBgiLaiwZqwK95f5mcC_QjGc9GcLI',
  GOOGLE_CLIENT_ID: '647367010976-opfd53df2f4ckhu58tbpjef5ve51h7li.apps.googleusercontent.com',
  TIMEZONE: 'Asia/Bangkok'
};
const UNIT_NAMES = ['พวงชมพู','สูติ-นรีเวช','รักษ์ใจปันสุข','Stroke','เคมีบำบัด','สงฆ์อาพาธ','NICU-SNB','ศัลยกรรมทั่วไป','ออร์โธปิดิกส์','ICU','อายุรกรรมหญิง','อายุรกรรมชาย','ปาริฉัตร','กุมารเวชกรรม','ห้องคลอด'].sort((a,b)=>a.localeCompare(b,'th',{sensitivity:'base'}));
const SHEETS = {
  Users:['email','role','units','active'],
  Units:['unit_id','unit_name','unit_type','active'],
  Fields:['field_key','section','label','unit_type','value_type','unit'],
  Records:['record_id','unit','month','fiscal_year','status','payload_json','updated_at','updated_by','version'],
  Hospital_Inputs:['month','field_key','value','note','updated_at','updated_by'],
  AuditLog:['timestamp','email','action','unit','month','before_json','after_json','reason'],
  Settings:['key','value','description'],
  Targets:['fiscal_year','field_key','target_value','note']
};
const FIELD_DEFS = [
 ['patient_total','ข้อมูลทั่วไป','ผู้ป่วยทั้งหมด','standard','number','ราย'],['patient_days','ข้อมูลทั่วไป','วันนอนรวม','standard','number','วัน'],['discharged','ข้อมูลทั่วไป','ผู้ป่วยจำหน่าย','standard','number','ราย'],['staff_total','ข้อมูลทั่วไป','จำนวนบุคลากรทั้งหมด','all','number','คน'],['nurse_total','ข้อมูลทั่วไป','จำนวนพยาบาลทั้งหมด','all','number','คน'],
 ['iv_days','อุปกรณ์การแพทย์','IV Fluid','standard','number','วัน'],['blood_days','อุปกรณ์การแพทย์','ให้เลือด','standard','number','วัน'],['inter_cath_days','อุปกรณ์การแพทย์','Intermittent catheter','standard','number','วัน'],['ett_days','อุปกรณ์การแพทย์','ETT','standard','number','วัน'],['heparin_days','อุปกรณ์การแพทย์','Heparin lock','standard','number','วัน'],['phlebitis_days','อุปกรณ์การแพทย์','วัน On IV / เฝ้าระวัง Phlebitis','standard','number','วัน'],['phlebitis_cases','อุปกรณ์การแพทย์','P. Phlebitis ระดับ 3 ขึ้นไป','standard','number','ครั้ง'],['cline_days','อุปกรณ์การแพทย์','C-Line','standard','number','วัน'],['cutdown_days','อุปกรณ์การแพทย์','Cut down / DLC','standard','number','วัน'],['umbilical_days','อุปกรณ์การแพทย์','Umbilical catheter','standard','number','วัน'],['foley_days','อุปกรณ์การแพทย์','Retained Foley catheter','standard','number','วัน'],['ventilator_days','อุปกรณ์การแพทย์','Ventilator','standard','number','วัน'],['vap_cases','อุปกรณ์การแพทย์','VAP','standard','number','ครั้ง'],['cauti_cases','อุปกรณ์การแพทย์','CAUTI','standard','number','ครั้ง'],['clabsi_cases','อุปกรณ์การแพทย์','CLABSI','standard','number','ครั้ง'],['device_ni_total','อุปกรณ์การแพทย์','NI ที่สัมพันธ์กับอุปกรณ์รวม','standard','number','ครั้ง'],['device_ni_cost','อุปกรณ์การแพทย์','ค่าใช้จ่ายรักษา NI','standard','number','บาท'],['device_ni_atb','อุปกรณ์การแพทย์','ค่ายา ATB','standard','number','บาท'],
 ['clean_wound','SSI','Clean wound','standard','number','ครั้ง'],['clean_cont_wound','SSI','Clean-contaminated wound','standard','number','ครั้ง'],['contaminated_wound','SSI','Contaminated wound','standard','number','ครั้ง'],['dirty_wound','SSI','Dirty wound','standard','number','ครั้ง'],['ssi_cases','SSI','SSI','standard','number','ครั้ง'],['ssi_cost','SSI','ค่าใช้จ่ายรักษา SSI','standard','number','บาท'],['ssi_atb_cost','SSI','ค่ายา ATB SSI','standard','number','บาท'],
 ['live_births','ทารกอายุน้อยกว่า 30 วัน','ทารกเกิดมีชีพ','standard','number','ราย'],['eye_infection','ทารกอายุน้อยกว่า 30 วัน','ติดเชื้อที่ตา','standard','number','ครั้ง'],['navel_infection','ทารกอายุน้อยกว่า 30 วัน','ติดเชื้อที่สะดือ','standard','number','ครั้ง'],['neonate_ni_cost','ทารกอายุน้อยกว่า 30 วัน','ค่าใช้จ่ายรักษา','standard','number','บาท'],['neonate_atb_cost','ทารกอายุน้อยกว่า 30 วัน','ค่ายา ATB','standard','number','บาท'],
 ['total_deliveries','ผู้คลอด','จำนวนผู้คลอดทั้งหมด','all','number','ราย'],['deliveries','ผู้คลอด','คลอดทางช่องคลอด','all','number','ราย'],['no_tear','ผู้คลอด','No tear','all','number','ราย'],['slight_tear','ผู้คลอด','Slight tear','all','number','ราย'],['episiotomy','ผู้คลอด','Episiotomy','all','number','ราย'],['no_tear','ผู้คลอด','No tear / Slight tear','all','number','ราย'],['cs_deliveries','ผู้คลอด','ผ่าตัดคลอด C/S','all','number','ราย'],['episiotomy_ni','ผู้คลอด','ติดเชื้อแผล Episiotomy','all','number','ครั้ง'],['cs_ni','ผู้คลอด','ติดเชื้อแผล C/S','all','number','ครั้ง'],['delivery_ni_cost','ผู้คลอด','ค่าใช้จ่ายรักษา','all','number','บาท'],['delivery_atb_cost','ผู้คลอด','ค่ายา ATB','all','number','บาท'],
 ['hospital_ni','สรุปการติดเชื้อ','ติดเชื้อในโรงพยาบาล','standard','number','ครั้ง'],['community_ni','สรุปการติดเชื้อ','ติดเชื้อในชุมชน','standard','number','ครั้ง'],['undetermined_ni','สรุปการติดเชื้อ','สรุปไม่ได้','standard','number','ครั้ง'],['ni_location','สรุปการติดเชื้อ','ตำแหน่ง/ระบบที่ติดเชื้อ','standard','text',''],['ni_symptoms','สรุปการติดเชื้อ','อาการแสดง NI','standard','text',''],['ni_organism','สรุปการติดเชื้อ','เชื้อที่เป็นสาเหตุ','standard','text',''],['ni_factors','สรุปการติดเชื้อ','สาเหตุ/ปัจจัยเสี่ยง','standard','text',''],['ni_cost_total','สรุปการติดเชื้อ','ค่าใช้จ่ายรักษา NI รวม','standard','number','บาท'],['ni_atb_total','สรุปการติดเชื้อ','ค่ายา ATB รวม','standard','number','บาท'],
 ['inj_needle','เฝ้าระวังบุคลากร - อุบัติเหตุ','เข็มทิ่มตำ','all','number','ครั้ง'],['inj_blade','เฝ้าระวังบุคลากร - อุบัติเหตุ','ใบมีดบาด','all','number','ครั้ง'],['inj_tube_glass','เฝ้าระวังบุคลากร - อุบัติเหตุ','หลอดยา / tube Hct / แก้วบาด','all','number','ครั้ง'],['inj_other_sharp','เฝ้าระวังบุคลากร - อุบัติเหตุ','ของมีคมอื่น ๆ','all','number','ครั้ง'],['inj_eye','เฝ้าระวังบุคลากร - อุบัติเหตุ','สารคัดหลั่งเข้าตา','all','number','ครั้ง'],['inj_mouth','เฝ้าระวังบุคลากร - อุบัติเหตุ','สารคัดหลั่งเข้าปาก','all','number','ครั้ง'],
 ['ill_respiratory','เฝ้าระวังบุคลากร - โรคติดเชื้อ','ระบบทางเดินหายใจ','all','number','ครั้ง'],['ill_gastro','เฝ้าระวังบุคลากร - โรคติดเชื้อ','ระบบทางเดินอาหาร','all','number','ครั้ง'],['ill_conjunctivitis','เฝ้าระวังบุคลากร - โรคติดเชื้อ','ตาแดง','all','number','ครั้ง'],['ill_chickenpox','เฝ้าระวังบุคลากร - โรคติดเชื้อ','อีสุกอีใส','all','number','ครั้ง'],['ill_mumps','เฝ้าระวังบุคลากร - โรคติดเชื้อ','คางทูม','all','number','ครั้ง'],['ill_herpes','เฝ้าระวังบุคลากร - โรคติดเชื้อ','เริม','all','number','ครั้ง'],['ill_tb','เฝ้าระวังบุคลากร - โรคติดเชื้อ','TB ปอด','all','number','ครั้ง'],['ill_other','เฝ้าระวังบุคลากร - โรคติดเชื้อ','อื่น ๆ','all','number','ครั้ง'],['ill_other_detail','เฝ้าระวังบุคลากร - โรคติดเชื้อ','ระบุโรคอื่น ๆ','all','text','']
];
function doGet(){return json_({ok:true,data:{service:'IC Indicator API',version:'1.0'}});}
function doPost(e){
  try{
    const body=JSON.parse((e&&e.postData&&e.postData.contents)||'{}');
    ensureSheets_();
    const user=verifyUser_(body.idToken);
    const data=route_(body.action,body,user);
    return json_({ok:true,data:data});
  }catch(err){return json_({ok:false,error:String(err&&err.message||err)});}
}
function json_(obj){return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);}
function ss_(){return SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);}
function ensureSheets_(){
  const ss=ss_();
  Object.keys(SHEETS).forEach(name=>{
    let sh=ss.getSheetByName(name);
    if(!sh) sh=ss.insertSheet(name);
    if(sh.getLastRow()===0) sh.getRange(1,1,1,SHEETS[name].length).setValues([SHEETS[name]]);
    sh.setFrozenRows(1);
  });
  const units=ss.getSheetByName('Units');
  if(units.getLastRow()===1){
    const rows=UNIT_NAMES.map((n,i)=>['U'+String(i+1).padStart(2,'0'),n,n==='ห้องคลอด'?'labour':'standard',true]);
    units.getRange(2,1,rows.length,4).setValues(rows);
  }
  syncUnitNames_();
  const fields=ss.getSheetByName('Fields');
  if(fields.getLastRow()===1 && FIELD_DEFS.length) fields.getRange(2,1,FIELD_DEFS.length,6).setValues(FIELD_DEFS);
  else if(FIELD_DEFS.length){
    const existing=fields.getDataRange().getValues().slice(1).map(r=>String(r[0]));
    const missing=FIELD_DEFS.filter(r=>!existing.includes(r[0]));
    if(missing.length)fields.getRange(fields.getLastRow()+1,1,missing.length,6).setValues(missing);
  }
  seedUsers_();
  const settings=ss.getSheetByName('Settings');
  if(settings.getLastRow()===1) settings.getRange(2,1,3,3).setValues([
    ['fiscal_year_start_month','10','ปีงบประมาณเริ่มเดือนตุลาคม'],
    ['timezone',CONFIG.TIMEZONE,'เขตเวลา'],
    ['schema_version','1.0','รุ่นโครงสร้างฐานข้อมูล']
  ]);
}

/**
 * Seed authorized users. All listed users can access every active unit.
 * Existing unrelated user rows are preserved; listed accounts are upserted.
 */

/**
 * Migrate legacy unit labels in-place, retaining unit IDs and monthly data.
 * Safe to run repeatedly; existing records and audit history are preserved.
 */
function syncUnitNames_(){
  const props=PropertiesService.getScriptProperties();
  if(props.getProperty('IC_UNIT_NAMES_V2_MIGRATED')==='1')return;
  const rename={'สูติ':'สูติ-นรีเวช','รักษ์ใจ':'รักษ์ใจปันสุข','สงฆ์':'สงฆ์อาพาธ','NICU':'NICU-SNB','Sx':'ศัลยกรรมทั่วไป','Ortho':'ออร์โธปิดิกส์','อญ':'อายุรกรรมหญิง','อช':'อายุรกรรมชาย','พิเศษปาริฉัตร':'ปาริฉัตร','กุมาร':'กุมารเวชกรรม'};
  const ss=ss_(), units=ss.getSheetByName('Units');
  if(units.getLastRow()>1){
    const rows=units.getRange(2,1,units.getLastRow()-1,4).getValues();
    rows.forEach(r=>{const old=String(r[1]||'');if(rename[old])r[1]=rename[old];if(r[1]==='ห้องคลอด')r[2]='labour';});
    rows.sort((a,b)=>String(a[1]).localeCompare(String(b[1]),'th',{sensitivity:'base'}));
    units.getRange(2,1,rows.length,4).setValues(rows);
  }
  ['Records','AuditLog'].forEach(name=>{
    const sh=ss.getSheetByName(name);
    if(!sh||sh.getLastRow()<2)return;
    const lastCol=sh.getLastColumn(), values=sh.getRange(2,1,sh.getLastRow()-1,lastCol).getValues();
    const unitCol=name==='Records'?1:3;
    let changed=false;
    values.forEach(r=>{const old=String(r[unitCol]||'');if(rename[old]){r[unitCol]=rename[old];changed=true;}});
    if(changed)sh.getRange(2,1,values.length,lastCol).setValues(values);
  });
  props.setProperty('IC_UNIT_NAMES_V2_MIGRATED','1');
}

function seedUsers_(){
  const admins = [
    'pinyadakongkaew@gmail.com',
    'nut.kumnahom@gmail.com',
    'nurse.web.swdcph@gmail.com'
  ];
  const editors = [
    'priest.swdcph@gmail.com',
    'aiwarisa1102@gmail.com',
    'areerat6523@gmail.com',
    'baew_ly@hotmail.com',
    'bowapinya9@gmail.com',
    'buatatae@gmail.com',
    'carenwia5919@gmail.com',
    'chemoswd@gmail.com',
    'chenchira7001@gmail.com',
    'device.swdcph@gmail.com',
    'genetic.em@gmail.com',
    'parichat4.vip@gmail.com',
    'himavarika@gmail.com',
    'hodsoda.31@gmail.com',
    'jewfany@gmail.com',
    'med.female2000@gmail.com',
    'niloblphlsila2527@gmail.com',
    'ningnatta2541@gmail.com',
    'nittayawhai@gmail.com',
    'oonrampa.kh28@gmail.com',
    'phuweanwong@gmail.com',
    'pianopreeya@gmail.com',
    'plapari2536@gmail.com',
    'puttamawadee2531@gmail.com',
    'ruttanapon8685@gmail.com',
    'santana.sa2522@gmail.com',
    'strokeswang@gmail.com',
    'sunaree6374@gmail.com',
    'swd.ped@gmail.com',
    'tanayung123@gmail.com'
  ];
  const sh=ss_().getSheetByName('Users');
  const allUnits=UNIT_NAMES.join(',');
  const rows=sh.getDataRange().getValues();
  const index={};
  rows.slice(1).forEach((r,i)=>{const email=String(r[0]||'').trim().toLowerCase();if(email)index[email]=i+2;});
  admins.forEach(email=>upsertUser_(sh,index,email,'Admin',allUnits));
  editors.forEach(email=>upsertUser_(sh,index,email,'Editor',allUnits));
}
function upsertUser_(sh,index,email,role,units){
  const normalized=String(email).trim().toLowerCase();
  if(index[normalized]){
    const rowNum=index[normalized];
    const active=sh.getRange(rowNum,4).getValue();
    sh.getRange(rowNum,1,1,4).setValues([[normalized,role,units,active===''||active===null?true:active]]);
  }else{
    sh.appendRow([normalized,role,units,true]);
    index[normalized]=sh.getLastRow();
  }
}

function verifyUser_(token){
  if(!token) throw new Error('ไม่พบ Google ID token กรุณาเข้าสู่ระบบใหม่');
  if(CONFIG.GOOGLE_CLIENT_ID.indexOf('YOUR_')===0) throw new Error('ผู้ดูแลระบบยังไม่ได้กำหนด GOOGLE_CLIENT_ID ใน Code.gs');
  const url='https://oauth2.googleapis.com/tokeninfo?id_token='+encodeURIComponent(token);
  const res=UrlFetchApp.fetch(url,{muteHttpExceptions:true});
  if(res.getResponseCode()!==200) throw new Error('Google token ไม่ถูกต้องหรือหมดอายุ');
  const info=JSON.parse(res.getContentText());
  if(info.aud!==CONFIG.GOOGLE_CLIENT_ID) throw new Error('Google Client ID ไม่ตรงกับระบบ');
  if(!['accounts.google.com','https://accounts.google.com'].includes(info.iss)) throw new Error('Token issuer ไม่ถูกต้อง');
  if(Number(info.exp)*1000<Date.now()) throw new Error('Google token หมดอายุ');
  if(info.email_verified!=='true' && info.email_verified!==true) throw new Error('บัญชี Google ยังไม่ได้ยืนยันอีเมล');
  const email=String(info.email||'').toLowerCase();
  const sh=ss_().getSheetByName('Users');
  const rows=sh.getDataRange().getValues();
  const found=rows.slice(1).find(r=>String(r[0]).toLowerCase()===email && (r[3]===true || String(r[3]).toLowerCase()==='true'));
  if(!found) throw new Error('บัญชี '+email+' ยังไม่ได้รับสิทธิ์ กรุณาติดต่อผู้ดูแลระบบ');
  return {email:email,role:String(found[1]||'Viewer'),units:String(found[2]||'').split(',').map(x=>x.trim()).filter(Boolean)};
}
function route_(action,b,user){
  switch(action){
    case 'getMe': return {email:user.email,role:user.role,units:user.units};
    case 'getUnits': return allowedUnits_(user);
    case 'getRecord': return getRecord_(b.unit,b.month,user);
    case 'listRecords': return listRecords_(b.month,user);
    case 'saveRecord': return saveRecord_(b,user,'DRAFT');
    case 'submitRecord': return saveRecord_(b,user,'SUBMITTED');
    case 'getHospitalSummary': return getHospitalSummary_(b.month,user);
    case 'saveHospitalInput': return saveHospitalInput_(b,user);
    case 'getHospitalInputs': return getHospitalInputs_(b,user);
    case 'getHospitalReport': return getHospitalReport_(b,user);
    case 'getTHIPReport': return getTHIPReport_(b,user);
    case 'getUnitReport': return getUnitReport_(b,user);
    default: throw new Error('ไม่รู้จักคำสั่ง '+action);
  }
}
function allowedUnits_(user){
  const all=ss_().getSheetByName('Units').getDataRange().getValues().slice(1).filter(r=>r[3]===true);
  return all.filter(r=>user.role==='Admin'||user.role==='Viewer'||user.units.includes(r[1])).map(r=>({id:r[0],name:r[1],type:r[2]}));
}
function canEdit_(unit,user){return user.role==='Admin'||(user.role==='Editor'&&user.units.includes(unit));}
function canView_(unit,user){return user.role==='Admin'||user.role==='Viewer'||user.units.includes(unit);}
function recordRow_(unit,month){const sh=ss_().getSheetByName('Records');const v=sh.getDataRange().getValues();for(let i=1;i<v.length;i++)if(v[i][1]===unit&&v[i][2]===month)return {row:i+1,values:v[i]};return null;}
function getRecord_(unit,month,user){
  if(!canView_(unit,user))throw new Error('ไม่มีสิทธิ์ดูหน่วยงานนี้');
  const r=recordRow_(unit,month);if(!r)return null;
  return {unit:r.values[1],month:r.values[2],status:r.values[4],payload:JSON.parse(r.values[5]||'{}'),version:Number(r.values[8]||0)};
}
function listRecords_(month,user){
  const sh=ss_().getSheetByName('Records');const rows=sh.getDataRange().getValues().slice(1);
  return rows.filter(r=>(!month||r[2]===month)&&canView_(r[1],user)).map(r=>({unit:r[1],month:r[2],status:r[4],updated_at:r[6]}));
}
function saveRecord_(b,user,status){
  const unit=String(b.unit||''),month=String(b.month||''),payload=b.payload||{};
  if(!canEdit_(unit,user))throw new Error('ไม่มีสิทธิ์บันทึกหน่วยงานนี้');
  if(!/^\d{4}-\d{2}$/.test(month))throw new Error('รูปแบบเดือนต้องเป็น YYYY-MM');
  Object.keys(payload).forEach(k=>{if(typeof payload[k]==='number'&&payload[k]<0)throw new Error('จำนวนต้องไม่ติดลบ: '+k);if(payload[k]!==''&&payload[k]!==null&&payload[k]!==undefined&&/^\d+(\.\d+)?$/.test(String(payload[k]))&&Number(payload[k])<0)throw new Error('จำนวนต้องไม่ติดลบ: '+k);});
  const lock=LockService.getScriptLock();lock.waitLock(15000);
  try{
    const sh=ss_().getSheetByName('Records'),old=recordRow_(unit,month);
    const oldPayload=old?old.values[5]:'';
    if(old&&Number(b.version||0)!==Number(old.values[8]||0))throw new Error('ข้อมูลถูกแก้ไขจากผู้ใช้อื่นแล้ว กรุณาโหลดข้อมูลใหม่ก่อนบันทึก');
    const version=old?Number(old.values[8]||0)+1:1,now=new Date(),fy=fiscalYear_(month);
    const row=[Utilities.getUuid(),unit,month,fy,status,JSON.stringify(payload),now,user.email,version];
    if(old)sh.getRange(old.row,1,1,row.length).setValues([row]);else sh.appendRow(row);
    ss_().getSheetByName('AuditLog').appendRow([now,user.email,status,unit,month,oldPayload,JSON.stringify(payload),'']);
    return {unit:unit,month:month,status:status,payload:payload,version:version};
  }finally{lock.releaseLock();}
}
function fiscalYear_(month){const p=month.split('-').map(Number);return p[1]>=10?p[0]+544:p[0]+543;}
function getHospitalSummary_(month,user){
  const records=listRecords_(month,user),by={};records.forEach(r=>by[r.unit]=r);
  const units=allowedUnits_(user).map(u=>({unit:u.name,completed:!!by[u.name],status:by[u.name]?by[u.name].status:'ยังไม่บันทึก'}));
  return {month:month,units:units,total:units.length,submitted:units.filter(x=>x.status==='SUBMITTED').length};
}
function getHospitalInputs_(b,user){
  if(user.role!=='Admin')throw new Error('เฉพาะ Admin เท่านั้น');
  const month=String(b.month||'');
  const sh=ss_().getSheetByName('Hospital_Inputs'),rows=sh.getDataRange().getValues().slice(1),out={};
  rows.forEach(r=>{if(String(r[0])===month)out[String(r[1])]=r[2];});
  return {month:month,sterilization_passed:out.sterilization_passed??'',sterilization_total:out.sterilization_total??''};
}
function saveHospitalInput_(b,user){
  if(user.role!=='Admin')throw new Error('เฉพาะ Admin เท่านั้นที่บันทึกข้อมูลระดับโรงพยาบาลได้');
  const month=String(b.month||'');
  if(!/^\\d{4}-(0[1-9]|1[0-2])$/.test(month))throw new Error('รูปแบบเดือนต้องเป็น YYYY-MM');
  if(month>Utilities.formatDate(new Date(),CONFIG.TIMEZONE,'yyyy-MM'))throw new Error('ไม่อนุญาตให้บันทึกเดือนถัดไป');
  const values=b.values||{};
  const keys=['sterilization_passed','sterilization_total'];
  keys.forEach(k=>{const v=values[k];if(v!==''&&v!==null&&v!==undefined&&(!Number.isFinite(Number(v))||Number(v)<0))throw new Error('ค่าต้องเป็นตัวเลขตั้งแต่ 0 ขึ้นไป: '+k);});
  if(values.sterilization_passed!==''&&values.sterilization_total!==''&&Number(values.sterilization_passed)>Number(values.sterilization_total))throw new Error('จำนวนครั้งที่ผ่านเกณฑ์ต้องไม่มากกว่าจำนวนครั้งที่ตรวจทั้งหมด');
  const sh=ss_().getSheetByName('Hospital_Inputs');
  const lock=LockService.getScriptLock();lock.waitLock(15000);
  try{
    keys.forEach(k=>{
      const rows=sh.getDataRange().getValues();let row=0;
      for(let i=1;i<rows.length;i++)if(String(rows[i][0])===month&&String(rows[i][1])===k){row=i+1;break;}
      const record=[month,k,values[k]??'',b.note||'',new Date(),user.email];
      if(row)sh.getRange(row,1,1,6).setValues([record]);else sh.appendRow(record);
    });
    return {saved:true,month:month,values:values};
  }finally{lock.releaseLock();}
}
function reportMonths_(year,month){
  if(month)return [month];
  const fy=Number(year);
  if(!fy)throw new Error('กรุณาระบุปีงบประมาณ');
  const start=fy-544;
  return Array.from({length:12},(_,i)=>{const d=new Date(start,9+i,1);return Utilities.formatDate(d,CONFIG.TIMEZONE,'yyyy-MM');});
}
function getHospitalReport_(b,user){
  if(user.role!=='Admin')throw new Error('เฉพาะ Admin เท่านั้น');
  const months=reportMonths_(b.fiscal_year,b.month),sh=ss_().getSheetByName('Records');
  const rows=sh.getDataRange().getValues().slice(1),by={};
  rows.forEach(r=>{if(months.includes(String(r[2]))){const k=String(r[2]);(by[k]||(by[k]=[])).push({unit:r[1],p:JSON.parse(r[5]||'{}')});}});
  return {months:months,rows:months.map(m=>aggregateMonth_(m,by[m]||[]))};
}
function aggregateMonth_(month,records){
  const sum=k=>records.reduce((a,r)=>a+(Number(r.p[k])||0),0);
  const deviceDays=sum('foley_days'),ventDays=sum('ventilator_days'),ivDays=sum('iv_days')+sum('heparin_days');
  const allDevice=sum('cutdown_days')+sum('cline_days')+sum('umbilical_days');
  const injury=sum('inj_needle')+sum('inj_blade')+sum('inj_tube_glass')+sum('inj_other_sharp')+sum('inj_eye')+sum('inj_mouth');
  const illness=sum('ill_respiratory')+sum('ill_gastro')+sum('ill_conjunctivitis')+sum('ill_chickenpox')+sum('ill_mumps')+sum('ill_herpes')+sum('ill_tb')+sum('ill_other');
  const hospitalInputs=ss_().getSheetByName('Hospital_Inputs').getDataRange().getValues().slice(1).filter(r=>String(r[0])===month);
  const hi={};hospitalInputs.forEach(r=>hi[String(r[1])]=Number(r[2])||0);
  return {month,patient_total:sum('patient_total'),patient_days:sum('patient_days'),discharged:sum('discharged'),
    vap_days:ventDays,vap_cases:sum('vap_cases'),vap_rate:ventDays?sum('vap_cases')*1000/ventDays:null,
    foley_days:deviceDays,cauti_cases:sum('cauti_cases'),cauti_rate:deviceDays?sum('cauti_cases')*1000/deviceDays:null,
    iv_lock_days:ivDays,phlebitis_cases:sum('phlebitis_cases'),phlebitis_rate:ivDays?sum('phlebitis_cases')*1000/ivDays:null,
    cutdown_days:sum('cutdown_days'),cline_days:sum('cline_days'),umbilical_days:sum('umbilical_days'),clabsi_days:allDevice,clabsi_cases:sum('clabsi_cases'),clabsi_rate:allDevice?sum('clabsi_cases')*1000/allDevice:null,
    ssi_clean:sum('clean_wound'),ssi_cases:sum('ssi_cases'),ssi_rate:sum('clean_wound')?sum('ssi_cases')*100/sum('clean_wound'):null,
    eye_infection:sum('eye_infection'),navel_infection:sum('navel_infection'),
    episiotomy_ni:sum('episiotomy_ni'),cs_ni:sum('cs_ni'),
    other_infection:sum('other_infection'),hospital_ni:sum('hospital_ni'),
    staff_total:sum('staff_total'),nurse_total:sum('nurse_total'),inj_needle:sum('inj_needle'),inj_blade:sum('inj_blade'),inj_tube_glass:sum('inj_tube_glass'),inj_other_sharp:sum('inj_other_sharp'),inj_eye:sum('inj_eye'),inj_mouth:sum('inj_mouth'),injury,injury_rate:sum('staff_total')?injury*100/sum('staff_total'):null,
    ill_respiratory:sum('ill_respiratory'),ill_gastro:sum('ill_gastro'),ill_conjunctivitis:sum('ill_conjunctivitis'),ill_chickenpox:sum('ill_chickenpox'),ill_mumps:sum('ill_mumps'),ill_herpes:sum('ill_herpes'),ill_tb:sum('ill_tb'),ill_other:sum('ill_other'),illness,illness_rate:sum('staff_total')?illness*100/sum('staff_total'):null,
    sterilization_passed:hi.sterilization_passed??null,sterilization_total:hi.sterilization_total??null,
    sterilization_rate:hi.sterilization_total?hi.sterilization_passed*100/hi.sterilization_total:null};
}
function getTHIPReport_(b,user){
  if(user.role!=='Admin')throw new Error('เฉพาะ Admin เท่านั้น');
  const months=reportMonths_(b.fiscal_year,b.month),sh=ss_().getSheetByName('Records'),rows=sh.getDataRange().getValues().slice(1);
  const output=months.map(month=>{
    const rec=rows.filter(r=>String(r[2])===month).map(r=>({unit:r[1],p:JSON.parse(r[5]||'{}')}));
    const group=(names,key)=>rec.filter(r=>names.includes(r.unit)).reduce((s,r)=>s+(Number(r.p[key])||0),0);
    const all=key=>rec.reduce((s,r)=>s+(Number(r.p[key])||0),0);
    const icu=['ICU','NICU-SNB'];
    const vap=all('vap_cases'),vapDays=all('ventilator_days'),vapIcu=group(icu,'vap_cases'),vapDaysIcu=group(icu,'ventilator_days');
    const cauti=all('cauti_cases'),foley=all('foley_days'),cautiIcu=group(icu,'cauti_cases'),foleyIcu=group(icu,'foley_days');
    const injury=all('inj_needle')+all('inj_blade')+all('inj_tube_glass')+all('inj_other_sharp')+all('inj_eye')+all('inj_mouth');
    const staff=all('staff_total'),h=ss_().getSheetByName('Hospital_Inputs').getDataRange().getValues().slice(1).filter(r=>String(r[0])===month),hi={};h.forEach(r=>hi[r[1]]=Number(r[2])||0);
    return {month,vap_cases:vap,vap_days:vapDays,vap_rate:vapDays?vap*1000/vapDays:null,vap_icu_cases:vapIcu,vap_icu_days:vapDaysIcu,vap_icu_rate:vapDaysIcu?vapIcu*1000/vapDaysIcu:null,vap_non_icu_cases:vap-vapIcu,vap_non_icu_days:vapDays-vapDaysIcu,vap_non_icu_rate:(vapDays-vapDaysIcu)?(vap-vapIcu)*1000/(vapDays-vapDaysIcu):null,cauti_cases:cauti,foley_days:foley,cauti_rate:foley?cauti*1000/foley:null,cauti_icu_cases:cautiIcu,cauti_icu_days:foleyIcu,cauti_icu_rate:foleyIcu?cautiIcu*1000/foleyIcu:null,cauti_non_icu_cases:cauti-cautiIcu,cauti_non_icu_days:foley-foleyIcu,cauti_non_icu_rate:(foley-foleyIcu)?(cauti-cautiIcu)*1000/(foley-foleyIcu):null,injury,staff_average:staff,injury_rate:staff?injury*100/staff:null,sterilization_passed:hi.sterilization_passed??0,sterilization_total:hi.sterilization_total??0,sterilization_rate:hi.sterilization_total?hi.sterilization_passed*100/hi.sterilization_total:null};
  });
  return {months,rows:output};
}
function getUnitReport_(b,user){
  const unit=String(b.unit||'');
  if(!canView_(unit,user))throw new Error('ไม่มีสิทธิ์ดูหน่วยงานนี้');
  const months=reportMonths_(b.fiscal_year,b.month),sh=ss_().getSheetByName('Records'),rows=sh.getDataRange().getValues().slice(1);
  return {unit,months,rows:months.map(month=>{
    const found=rows.find(r=>String(r[1])===unit&&String(r[2])===month);
    if(!found)return {month,missing:true};
    const p=JSON.parse(found[5]||'{}');
    const injury=['inj_needle','inj_blade','inj_tube_glass','inj_other_sharp','inj_eye','inj_mouth'].reduce((s,k)=>s+(Number(p[k])||0),0);
    const illness=['ill_respiratory','ill_gastro','ill_conjunctivitis','ill_chickenpox','ill_mumps','ill_herpes','ill_tb','ill_other'].reduce((s,k)=>s+(Number(p[k])||0),0);
    const vent=Number(p.ventilator_days)||0,foley=Number(p.foley_days)||0,iv=(Number(p.iv_days)||0)+(Number(p.heparin_days)||0),device=(Number(p.cline_days)||0)+(Number(p.umbilical_days)||0);
    const clean=Number(p.clean_wound)||0,staff=Number(p.staff_total)||0,live=Number(p.live_births)||0,deliveries=Number(p.deliveries)||0,epi=Number(p.episiotomy)||0,cs=Number(p.cs_deliveries)||0;
    return {month,missing:false,status:found[4],patient_total:Number(p.patient_total)||0,patient_days:Number(p.patient_days)||0,discharged:Number(p.discharged)||0,
      ventilator_days:vent,vap_cases:Number(p.vap_cases)||0,vap_rate:vent?(Number(p.vap_cases)||0)*1000/vent:null,
      foley_days:foley,cauti_cases:Number(p.cauti_cases)||0,cauti_rate:foley?(Number(p.cauti_cases)||0)*1000/foley:null,
      iv_days:Number(p.iv_days)||0,heparin_days:Number(p.heparin_days)||0,iv_lock_days:iv,phlebitis_cases:Number(p.phlebitis_cases)||0,phlebitis_rate:iv?(Number(p.phlebitis_cases)||0)*1000/iv:null,
      cutdown_days:Number(p.cutdown_days)||0,cline_days:Number(p.cline_days)||0,umbilical_days:Number(p.umbilical_days)||0,clabsi_days:device,clabsi_cases:Number(p.clabsi_cases)||0,clabsi_rate:device?(Number(p.clabsi_cases)||0)*1000/device:null,
      clean_wound:clean,clean_cont_wound:Number(p.clean_cont_wound)||0,contaminated_wound:Number(p.contaminated_wound)||0,dirty_wound:Number(p.dirty_wound)||0,ssi_cases:Number(p.ssi_cases)||0,ssi_rate:clean?(Number(p.ssi_cases)||0)*100/clean:null,
      live_births:live,eye_infection:Number(p.eye_infection)||0,eye_rate:live?(Number(p.eye_infection)||0)*100/live:null,navel_infection:Number(p.navel_infection)||0,navel_rate:live?(Number(p.navel_infection)||0)*100/live:null,
      total_deliveries:Number(p.total_deliveries)||0,deliveries:Number(p.deliveries)||0,no_tear:Number(p.no_tear)||0,slight_tear:Number(p.slight_tear)||0,episiotomy:epi,episiotomy_ni:Number(p.episiotomy_ni)||0,episiotomy_rate:epi?(Number(p.episiotomy_ni)||0)*100/epi:null,cs_deliveries:cs,cs_ni:Number(p.cs_ni)||0,cs_rate:cs?(Number(p.cs_ni)||0)*100/cs:null,
      hospital_ni:Number(p.hospital_ni)||0,other_infection:Number(p.other_infection)||0,injury,injury_rate:staff?injury*100/staff:null,illness,illness_rate:staff?illness*100/staff:null,staff_total:staff};
  })};
}
