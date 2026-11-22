/**
 * IC Indicator - Google Apps Script API
 * 1) Paste this file into Apps Script bound to the spreadsheet.
 * 2) Deploy as Web App: Execute as Me; access Anyone (Google account sign-in is enforced here).
 * 3) Add authorized emails in the Users sheet after the first setup request.
 */
const CONFIG = {
  SPREADSHEET_ID: '1u_96VmaDeQMXfxNBgiLaiwZqwK95f5mcC_QjGc9GcLI',
  GOOGLE_CLIENT_ID: 'YOUR_GOOGLE_OAUTH_CLIENT_ID.apps.googleusercontent.com',
  TIMEZONE: 'Asia/Bangkok'
};
const UNIT_NAMES = ['พวงชมพู','สูติ','รักษ์ใจ','Stroke','เคมีบำบัด','สงฆ์','NICU','Sx','Ortho','ICU','อญ','อช','พิเศษปาริฉัตร','กุมาร','ห้องคลอด'];
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
 ['iv_days','อุปกรณ์การแพทย์','IV Fluid','standard','number','วัน'],['blood_days','อุปกรณ์การแพทย์','ให้เลือด','standard','number','วัน'],['inter_cath_days','อุปกรณ์การแพทย์','Intermittent catheter','standard','number','วัน'],['ett_days','อุปกรณ์การแพทย์','ETT','standard','number','วัน'],['heparin_days','อุปกรณ์การแพทย์','Heparin lock','standard','number','วัน'],['phlebitis_days','อุปกรณ์การแพทย์','วัน On IV / เฝ้าระวัง Phlebitis','standard','number','วัน'],['phlebitis_cases','อุปกรณ์การแพทย์','P. Phlebitis ระดับ 3 ขึ้นไป','standard','number','ครั้ง'],['cline_days','อุปกรณ์การแพทย์','C-Line / Cut down','standard','number','วัน'],['umbilical_days','อุปกรณ์การแพทย์','Umbilical catheter','standard','number','วัน'],['foley_days','อุปกรณ์การแพทย์','Retained Foley catheter','standard','number','วัน'],['ventilator_days','อุปกรณ์การแพทย์','Ventilator','standard','number','วัน'],['vap_cases','อุปกรณ์การแพทย์','VAP','standard','number','ครั้ง'],['cauti_cases','อุปกรณ์การแพทย์','CAUTI','standard','number','ครั้ง'],['clabsi_cases','อุปกรณ์การแพทย์','CLABSI','standard','number','ครั้ง'],['device_ni_total','อุปกรณ์การแพทย์','NI ที่สัมพันธ์กับอุปกรณ์รวม','standard','number','ครั้ง'],['device_ni_cost','อุปกรณ์การแพทย์','ค่าใช้จ่ายรักษา NI','standard','number','บาท'],['device_ni_atb','อุปกรณ์การแพทย์','ค่ายา ATB','standard','number','บาท'],
 ['clean_wound','SSI','Clean wound','standard','number','ครั้ง'],['clean_cont_wound','SSI','Clean-contaminated wound','standard','number','ครั้ง'],['contaminated_wound','SSI','Contaminated wound','standard','number','ครั้ง'],['dirty_wound','SSI','Dirty wound','standard','number','ครั้ง'],['ssi_cases','SSI','SSI','standard','number','ครั้ง'],['ssi_cost','SSI','ค่าใช้จ่ายรักษา SSI','standard','number','บาท'],['ssi_atb_cost','SSI','ค่ายา ATB SSI','standard','number','บาท'],
 ['live_births','ทารกอายุน้อยกว่า 30 วัน','ทารกเกิดมีชีพ','standard','number','ราย'],['eye_infection','ทารกอายุน้อยกว่า 30 วัน','ติดเชื้อที่ตา','standard','number','ครั้ง'],['navel_infection','ทารกอายุน้อยกว่า 30 วัน','ติดเชื้อที่สะดือ','standard','number','ครั้ง'],['neonate_ni_cost','ทารกอายุน้อยกว่า 30 วัน','ค่าใช้จ่ายรักษา','standard','number','บาท'],['neonate_atb_cost','ทารกอายุน้อยกว่า 30 วัน','ค่ายา ATB','standard','number','บาท'],
 ['deliveries','ผู้คลอด','จำนวนผู้คลอดทั้งหมด','all','number','ราย'],['episiotomy','ผู้คลอด','Episiotomy','all','number','ราย'],['no_tear','ผู้คลอด','No tear / Slight tear','all','number','ราย'],['cs_deliveries','ผู้คลอด','ผ่าตัดคลอด C/S','all','number','ราย'],['episiotomy_ni','ผู้คลอด','ติดเชื้อแผล Episiotomy','all','number','ครั้ง'],['cs_ni','ผู้คลอด','ติดเชื้อแผล C/S','all','number','ครั้ง'],['delivery_ni_cost','ผู้คลอด','ค่าใช้จ่ายรักษา','all','number','บาท'],['delivery_atb_cost','ผู้คลอด','ค่ายา ATB','all','number','บาท'],
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
  const fields=ss.getSheetByName('Fields');
  if(fields.getLastRow()===1 && FIELD_DEFS.length) fields.getRange(2,1,FIELD_DEFS.length,6).setValues(FIELD_DEFS);
  const settings=ss.getSheetByName('Settings');
  if(settings.getLastRow()===1) settings.getRange(2,1,3,3).setValues([
    ['fiscal_year_start_month','10','ปีงบประมาณเริ่มเดือนตุลาคม'],
    ['timezone',CONFIG.TIMEZONE,'เขตเวลา'],
    ['schema_version','1.0','รุ่นโครงสร้างฐานข้อมูล']
  ]);
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
function saveHospitalInput_(b,user){
  if(user.role!=='Admin')throw new Error('เฉพาะ Admin เท่านั้นที่บันทึกข้อมูลระดับโรงพยาบาลได้');
  const sh=ss_().getSheetByName('Hospital_Inputs');sh.appendRow([b.month,b.field_key,b.value,b.note||'',new Date(),user.email]);
  return {saved:true};
}