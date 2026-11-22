/* Configure GOOGLE_CLIENT_ID and GAS_URL in this file before first use. */
const CONFIG={GOOGLE_CLIENT_ID:"647367010976-opfd53df2f4ckhu58tbpjef5ve51h7li.apps.googleusercontent.com",GAS_URL:"https://script.google.com/macros/s/AKfycbxV4q2aBC7FVVZvbR2_ojE8tpthx1RQR3q5wx2E4TfwxnVXNlu9vQbgfwH-HInAmajU/exec"};
const UNITS=["พวงชมพู","สูติ-นรีเวช","รักษ์ใจปันสุข","Stroke","เคมีบำบัด","สงฆ์อาพาธ","NICU-SNB","ศัลยกรรมทั่วไป","ออร์โธปิดิกส์","ICU","อายุรกรรมหญิง","อายุรกรรมชาย","ปาริฉัตร","กุมารเวชกรรม","ห้องคลอด"].sort((a,b)=>a.localeCompare(b,"th",{sensitivity:"base"}));
const STANDARD=[
{title:"ข้อมูลทั่วไป",fields:[["patient_total","ผู้ป่วยทั้งหมด (ราย)"],["patient_days","วันนอนรวม (วัน)"],["discharged","ผู้ป่วยจำหน่าย (ราย)"],["staff_total","จำนวนบุคลากรทั้งหมด (คน)"],["nurse_total","จำนวนพยาบาลทั้งหมด (คน)"]]},
{title:"การติดเชื้อที่สัมพันธ์กับอุปกรณ์การแพทย์",fields:[["iv_days","IV Fluid (วัน)"],["heparin_days","Heparin lock (วัน)"],["phlebitis_days","วัน On IV / เฝ้าระวัง Phlebitis (วัน)"],["phlebitis_cases","P. Phlebitis ระดับ 3 ขึ้นไป (ครั้ง)"],["cline_days","C-Line (วัน)"],["cutdown_days","Cut down / DLC (วัน)"],["umbilical_days","Umbilical catheter (วัน)"],["blood_days","ให้เลือด (วัน)"],["inter_cath_days","Intermittent catheter (วัน)"],["foley_days","Retained Foley catheter (วัน)"],["ett_days","ETT (วัน)"],["ventilator_days","Ventilator (วัน)"],["vap_cases","VAP (ครั้ง)"],["cauti_cases","CAUTI (ครั้ง)"],["clabsi_cases","CLABSI (ครั้ง)"],["iv_ni","NI จาก IV (ครั้ง)"],["hl_ni","NI จาก Heparin lock (ครั้ง)"],["device_ni_total","NI ที่สัมพันธ์กับอุปกรณ์รวม (ครั้ง)"],["device_ni_cost","ค่าใช้จ่ายรักษา NI (บาท)"],["device_ni_atb","ค่ายา ATB (บาท)"]]},
{title:"การเฝ้าระวัง SSI และแผล",fields:[["clean_wound","Clean wound (ครั้ง)"],["clean_cont_wound","Clean-contaminated wound (ครั้ง)"],["contaminated_wound","Contaminated wound (ครั้ง)"],["dirty_wound","Dirty wound (ครั้ง)"],["ssi_cases","SSI (ครั้ง)"],["ssi_cost","ค่าใช้จ่ายรักษา SSI (บาท)"],["ssi_atb_cost","ค่ายา ATB (บาท)"]]},
{title:"การเฝ้าระวังทารกอายุน้อยกว่า 30 วัน",fields:[["live_births","ทารกเกิดมีชีพ (ราย)"],["eye_infection","ติดเชื้อที่ตา (ครั้ง)"],["navel_infection","ติดเชื้อที่สะดือ (ครั้ง)"],["neonate_ni_cost","ค่าใช้จ่ายรักษา (บาท)"],["neonate_atb_cost","ค่ายา ATB (บาท)"]]},
{title:"การเฝ้าระวังผู้คลอด",fields:[["deliveries","จำนวนผู้คลอดทั้งหมด (ราย)"],["episiotomy","Episiotomy (ราย)"],["no_tear","No tear / Slight tear (ราย)"],["cs_deliveries","ผ่าตัดคลอด C/S (ราย)"],["episiotomy_ni","ติดเชื้อแผล Episiotomy (ครั้ง)"],["cs_ni","ติดเชื้อแผล C/S (ครั้ง)"],["delivery_ni_cost","ค่าใช้จ่ายรักษา (บาท)"],["delivery_atb_cost","ค่ายา ATB (บาท)"]]},
{title:"สรุปการติดเชื้อในโรงพยาบาล",fields:[["hospital_ni","ติดเชื้อในโรงพยาบาล (ครั้ง)"],["community_ni","ติดเชื้อในชุมชน (ครั้ง)"],["undetermined_ni","สรุปไม่ได้ (ครั้ง)"],["other_infection","การติดเชื้ออื่น ๆ (ครั้ง)"],["ni_cost_total","ค่าใช้จ่ายรักษา NI รวม (บาท)"],["ni_atb_total","ค่ายา ATB รวม (บาท)"],["ni_location","ตำแหน่ง/ระบบที่ติดเชื้อ"],["ni_symptoms","อาการแสดง NI"],["ni_organism","เชื้อที่เป็นสาเหตุ"],["ni_factors","สาเหตุ/ปัจจัยเสี่ยง"]]}
];
const PERSONNEL=[
{title:"จำนวนบุคลากร",fields:[["staff_total","จำนวนบุคลากรทั้งหมดในหน่วยงาน (คน)"],["nurse_total","จำนวนพยาบาลทั้งหมด (คน)"]]},
{title:"อุบัติเหตุจากการปฏิบัติงาน (จำนวนครั้ง)",fields:[["inj_needle","เข็มทิ่มตำ (ครั้ง)"],["inj_blade","ใบมีดบาด (ครั้ง)"],["inj_tube_glass","หลอดยา / tube Hct / แก้วบาด (ครั้ง)"],["inj_other_sharp","ของมีคมอื่น ๆ (ครั้ง)"],["inj_eye","สารคัดหลั่งเข้าตา (ครั้ง)"],["inj_mouth","สารคัดหลั่งเข้าปาก (ครั้ง)"]]},
{title:"การเจ็บป่วยด้วยโรคติดเชื้อ (จำนวนครั้ง)",fields:[["ill_respiratory","ระบบทางเดินหายใจ (ครั้ง)"],["ill_gastro","ระบบทางเดินอาหาร (ครั้ง)"],["ill_conjunctivitis","ตาแดง (ครั้ง)"],["ill_chickenpox","อีสุกอีใส (ครั้ง)"],["ill_mumps","คางทูม (ครั้ง)"],["ill_herpes","เริม (ครั้ง)"],["ill_tb","TB ปอด (ครั้ง)"],["ill_other","อื่น ๆ (ครั้ง)"],["ill_other_detail","ระบุโรคอื่น ๆ"]]}
];
const LABOUR=[{title:"การเฝ้าระวังในผู้คลอด",fields:[["total_deliveries","จำนวนผู้คลอดทั้งหมด (ราย)"],["deliveries","คลอดทางช่องคลอด (ราย)"],["episiotomy","Episiotomy (ราย)"],["no_tear","No tear (ราย)"],["slight_tear","Slight tear (ราย)"],["cs_deliveries","ผ่าตัดคลอดทางหน้าท้อง (ราย)"],["live_births","ทารกเกิดมีชีพทั้งหมด (ราย)"],["episiotomy_ni","ติดเชื้อแผล Episiotomy (ครั้ง)"],["cs_ni","ติดเชื้อแผล C/S (ครั้ง)"]]}];
let idToken="",user=null,currentUnit="",currentData={},currentRecord=null,units=UNITS;
const $=id=>document.getElementById(id);
const isLabour=u=>u==="ห้องคลอด";
const num=v=>Number(v||0);
function allFields(){return [...new Set([...STANDARD,...PERSONNEL,...LABOUR].flatMap(s=>s.fields.map(f=>f[0])))];}
function emptyData(){return Object.fromEntries(allFields().map(k=>[k,""]));}
function setMsg(t){$("saveMessage").textContent=t;}
async function api(action,data={}){if(!CONFIG.GAS_URL||CONFIG.GAS_URL.includes("YOUR_"))throw new Error("กรุณาตั้งค่า GAS_URL ใน app.js ก่อนใช้งาน");const res=await fetch(CONFIG.GAS_URL,{method:"POST",headers:{"Content-Type":"text/plain;charset=utf-8"},body:JSON.stringify({action,idToken,...data})});const j=await res.json();if(!j.ok)throw new Error(j.error||"API error");return j.data;}
let loginInProgress=false;
function showLoginLoading(message="กำลังเข้าสู่ระบบ",detail="กรุณารอสักครู่ ระบบกำลังตรวจสอบสิทธิ์และโหลดข้อมูล"){
  const overlay=$("loginLoading");
  if(!overlay)return;
  $("loginLoadingTitle").textContent=message;
  $("loginLoadingDetail").textContent=detail;
  overlay.classList.remove("hidden");
  overlay.setAttribute("aria-hidden","false");
}
function hideLoginLoading(){
  const overlay=$("loginLoading");
  if(!overlay)return;
  overlay.classList.add("hidden");
  overlay.setAttribute("aria-hidden","true");
}
async function loginCredential(resp){
  if(loginInProgress)return;
  if(!resp?.credential){$("loginMessage").textContent="ไม่สามารถรับข้อมูลจาก Google ได้ กรุณาลองอีกครั้ง";return;}
  loginInProgress=true;
  idToken=resp.credential;
  showLoginLoading("กำลังตรวจสอบบัญชี Google","กำลังยืนยันตัวตนและตรวจสอบสิทธิ์การใช้งาน");
  try{
    user=await api("getMe");
    $("loginLoadingTitle").textContent="กำลังโหลดข้อมูลหน่วยงาน";
    $("loginLoadingDetail").textContent="ตรวจสอบสิทธิ์เรียบร้อยแล้ว กำลังเตรียมข้อมูลสำหรับใช้งาน";
    const allowed=await api("getUnits");
    units=allowed.map(x=>x.name).sort((a,b)=>a.localeCompare(b,"th",{sensitivity:"base"}));
    try{localStorage.setItem("icwn_google_id_token",idToken);}catch(storageError){console.warn("ไม่สามารถบันทึกเซสชันในเบราว์เซอร์ได้",storageError);}
    $("userEmail").textContent=user.email;
    $("saveBtn").disabled=user.role==="Viewer";
    $("submitBtn").disabled=user.role==="Viewer";
    $("addMonthlyRecord").classList.toggle("hidden",user.role==="Viewer");
    $("changeUnit").classList.toggle("hidden",user.role==="Admin");
    renderUnits();
    $("loginView").classList.add("hidden");
    if(user.role==="Admin"){
      $("adminView").classList.remove("hidden");
      $("appView").classList.add("hidden");
      initAdminView();
    }else{
      $("appView").classList.remove("hidden");
      $("adminView").classList.add("hidden");
    }
    $("signOutBtn").classList.remove("hidden");document.body.classList.add("authed");document.querySelectorAll("[data-admin-only]").forEach(e=>e.classList.toggle("hidden",user.role!=="Admin"));setNav(user.role==="Admin"?"units":"units");
    hideLoginLoading();
  }catch(e){
    idToken="";
    try{localStorage.removeItem("icwn_google_id_token");}catch(storageError){}
    $("loginMessage").textContent="เข้าสู่ระบบไม่สำเร็จ: "+(e?.message||"เกิดข้อผิดพลาด กรุณาลองใหม่");
    hideLoginLoading();
  }finally{
    loginInProgress=false;
  }
}
function initGoogle(){
  if(!window.google?.accounts?.id){setTimeout(initGoogle,300);return;}
  if(CONFIG.GOOGLE_CLIENT_ID.startsWith("YOUR_")){$("loginMessage").textContent="กรุณากำหนด GOOGLE_CLIENT_ID ใน app.js ก่อนเปิดใช้";return;}
  google.accounts.id.initialize({client_id:CONFIG.GOOGLE_CLIENT_ID,callback:loginCredential,auto_select:true});
  google.accounts.id.renderButton($("googleButton"),{theme:"outline",size:"large",shape:"pill",text:"signin_with",locale:"th"});
  restoreLoginSession();
}
async function restoreLoginSession(){
  let savedToken="";try{savedToken=localStorage.getItem("icwn_google_id_token")||"";}catch(storageError){}
  if(savedToken){
    showLoginLoading("กำลังกู้คืนการเข้าสู่ระบบ","กำลังตรวจสอบเซสชันเดิมกับระบบ");
    await loginCredential({credential:savedToken});
    if(user)return;
  }
  // Google อาจออก ID token ใหม่ให้อัตโนมัติเมื่อ token เดิมหมดอายุ
  google.accounts.id.prompt();
}
function fieldMarkup(key,label){const textType=/_detail|_location|_symptoms|_organism|_factors/.test(key);const m=label.match(/^(.*?)\s*\(([^()]*)\)\s*$/),name=m?m[1]:label,suf=m?m[2]:"";return `<div class="field"><label for="${key}">${name}</label>${textType?`<textarea id="${key}" data-key="${key}" placeholder="ระบุข้อมูล (ถ้ามี)"></textarea>`:`<div class="inp"><input id="${key}" data-key="${key}" type="number" min="0" step="any" inputmode="decimal" placeholder="0"><span>${suf}</span></div>`}</div>`;}
function renderSections(){const sections=isLabour(currentUnit)?[...LABOUR,...PERSONNEL]:[...STANDARD,...PERSONNEL];$("formSections").innerHTML=sections.map((s,i)=>`<details class="section" open><summary>${s.title}</summary><div class="section-body"><div class="field-grid">${s.fields.map(f=>fieldMarkup(f[0],f[1])).join("")}</div>${s.title.startsWith("อุบัติเหตุ")||s.title.startsWith("การเจ็บป่วย")?"":""}</div></details>`).join("")+`<div class="calc-row"><div class="metric"><small>รวมอุบัติเหตุ (ครั้ง)</small><strong id="injTotal">0</strong></div><div class="metric"><small>% อุบัติเหตุ</small><strong id="injRate">—</strong></div><div class="metric"><small>รวมเจ็บป่วย (ครั้ง)</small><strong id="illTotal">0</strong></div><div class="metric"><small>% ป่วย</small><strong id="illRate">—</strong></div></div>`;
document.querySelectorAll("[data-key]").forEach(el=>{el.value=currentData[el.dataset.key]??"";el.addEventListener("input",()=>{currentData[el.dataset.key]=el.value;updateMetrics();});});updateMetrics();}
function updateMetrics(){const injury=["inj_needle","inj_blade","inj_tube_glass","inj_other_sharp","inj_eye","inj_mouth"].reduce((s,k)=>s+num(currentData[k]),0);const illness=["ill_respiratory","ill_gastro","ill_conjunctivitis","ill_chickenpox","ill_mumps","ill_herpes","ill_tb","ill_other"].reduce((s,k)=>s+num(currentData[k]),0);const staff=num(currentData.staff_total);$("injTotal").textContent=injury;$("illTotal").textContent=illness;$("injRate").textContent=staff?(injury*100/staff).toFixed(2)+"%":"—";$("illRate").textContent=staff?(illness*100/staff).toFixed(2)+"%":"—";}
async function openUnit(unit){currentUnit=unit;$("saveBtn").disabled=user?.role==="Viewer";$("submitBtn").disabled=user?.role==="Viewer";currentData=emptyData();currentRecord=null;$("unitsPage").classList.add("hidden");$("unitHomePage").classList.add("hidden");$("summaryPage").classList.add("hidden");$("historyPage").classList.add("hidden");$("formPage").classList.remove("hidden");$("unitTitle").textContent=unit;$("pageTitle").textContent=unit;renderSections();try{const rec=await api("getRecord",{unit,month:$("month").value});if(rec){currentRecord=rec;currentData={...currentData,...rec.payload};document.querySelectorAll("[data-key]").forEach(el=>el.value=currentData[el.dataset.key]??"");updateMetrics();$("recordStatus").textContent=rec.status==="SUBMITTED"?"ส่งแล้ว":"ฉบับร่าง";$("recordStatus").className="status "+(rec.status==="SUBMITTED"?"submitted":"draft");}}catch(e){setMsg(e.message);}}
function renderUnits(){setTimeout(paintStrips,0);
  $("unitGrid").innerHTML=units.map(u=>`<button class="unit-card" data-unit="${u}"><strong>${u}</strong><span class="strip">${"<i></i>".repeat(12)}</span><span class="cap">กำลังโหลดสถานะ…</span></button>`).join("");
  document.querySelectorAll("#unitGrid [data-unit]").forEach(b=>b.onclick=()=>selectUnit(b.dataset.unit));
}
async function selectUnit(unit){
  currentUnit=unit;hidePages();$("unitHomePage").classList.remove("hidden");
  $("unitHomeTitle").textContent=unit;$("pageTitle").textContent=unit;
  await loadUnitHistory();
}
async function loadUnitHistory(){
  try{
    const rows=await api("listRecords",{});
    const list=(rows||[]).filter(r=>r.unit===currentUnit).sort((x,y)=>y.month.localeCompare(x.month));
    $("unitHistoryContent").innerHTML=list.length?`<ul class="hist">${list.map(r=>`<li><button data-open-month="${r.month}"><span><b>${monthTH(r.month)}</b><small>${r.updated_at?"แก้ไขล่าสุด "+new Date(r.updated_at).toLocaleString("th-TH"):"—"}</small></span><em class="status ${r.status==="SUBMITTED"?"submitted":""}">${r.status==="SUBMITTED"?"ส่งแล้ว":"ฉบับร่าง"}</em></button></li>`).join("")}</ul>`:"<p class='muted'>ยังไม่มีประวัติการบันทึก กด “เพิ่มรายการ” เพื่อเริ่มบันทึกเดือนนี้</p>";
    document.querySelectorAll("[data-open-month]").forEach(b=>b.onclick=()=>{ $("month").value=b.dataset.openMonth;openUnit(currentUnit);});
  }catch(e){$("unitHistoryContent").textContent=e.message;}
}
async function save(submit=false){try{document.querySelectorAll("[data-key]").forEach(el=>currentData[el.dataset.key]=el.value);const result=await api(submit?"submitRecord":"saveRecord",{unit:currentUnit,month:$("month").value,payload:currentData,version:currentRecord?.version||0});currentRecord=result;$("recordStatus").textContent=submit?"ส่งแล้ว":"ฉบับร่าง";$("recordStatus").className="status "+(submit?"submitted":"draft");setMsg(submit?"ส่งรายงานเรียบร้อย":"บันทึกข้อมูลเรียบร้อย");}catch(e){setMsg("บันทึกไม่สำเร็จ: "+e.message);}}
async function showSummary(){
  hidePages();$("summaryPage").classList.remove("hidden");$("pageTitle").textContent="สรุปรายงานหน่วยงาน";
  const now=new Date(),fy=now.getMonth()>=9?now.getFullYear()+544:now.getFullYear()+543;
  if(!$("unitFiscalYear").options.length)$("unitFiscalYear").innerHTML=Array.from({length:6},(_,i)=>fy-i).map(y=>`<option value="${y}">${y}</option>`).join("");
  if(!$("unitFiscalYear").value)$("unitFiscalYear").value=String(fy);
  $("unitReportMonth").max=localMonth();
  $("unitFiscalYear").onchange=loadUnitReport;$("unitReportMonth").onchange=loadUnitReport;
  await loadUnitReport();
}
function localMonth(){const d=new Date();return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0");}
async function loadUnitReport(){
  try{
    const month=$("unitReportMonth").value,period=month?{month}:{fiscal_year:Number($("unitFiscalYear").value)};
    const r=await api("getUnitReport",{unit:currentUnit,...period}),rows=r.rows||[],valid=rows.filter(x=>!x.missing);
    const sum=k=>valid.reduce((s,x)=>s+(Number(x[k])||0),0),staffMonths=valid.filter(x=>Number(x.staff_total)>0),staffAverage=staffMonths.length?sum("staff_total")/staffMonths.length:0,rate=(n,d,m=1000)=>d?n*m/d:null;
    const labour=isLabour(currentUnit);
    const cards=labour?[
      ["จำนวนผู้คลอดทั้งหมด",fmt(sum("total_deliveries"),0)],["จำนวนแผล Episiotomy",fmt(sum("episiotomy"),0)],["จำนวนแผล C/S",fmt(sum("cs_deliveries"),0)],
      ["อุบัติเหตุบุคลากร",fmt(sum("injury"),0)+" ครั้ง · "+fmt(rate(sum("injury"),staffAverage,100))+"%"],
      ["การเจ็บป่วยบุคลากร",fmt(sum("illness"),0)+" ครั้ง · "+fmt(rate(sum("illness"),staffAverage,100))+"%"]
    ]:[
      ["วันนอนผู้ป่วยจำหน่าย",fmt(sum("patient_days"),0)],["ผู้ป่วยจำหน่าย",fmt(sum("discharged"),0)],["NI รวม",fmt(sum("hospital_ni"),0)],
      ["อัตรา NI ต่อ 1,000 วันนอน",fmt(rate(sum("hospital_ni"),sum("patient_days")))],
      ["P. Phlebitis ≥3",fmt(sum("phlebitis_cases"),0)+" ครั้ง · "+fmt(rate(sum("phlebitis_cases"),sum("iv_lock_days")))],
      ["VAP",fmt(sum("vap_cases"),0)+" ครั้ง · "+fmt(rate(sum("vap_cases"),sum("ventilator_days")))],
      ["CAUTI",fmt(sum("cauti_cases"),0)+" ครั้ง · "+fmt(rate(sum("cauti_cases"),sum("foley_days")))],
      ["CLABSI",fmt(sum("clabsi_cases"),0)+" ครั้ง · "+fmt(rate(sum("clabsi_cases"),sum("clabsi_days")))],
      ["อุบัติเหตุบุคลากร",fmt(sum("injury"),0)+" ครั้ง · "+fmt(rate(sum("injury"),sum("staff_total"),100))+"%"],
      ["เจ็บป่วยบุคลากร",fmt(sum("illness"),0)+" ครั้ง · "+fmt(rate(sum("illness"),sum("staff_total"),100))+"%"]
    ];
    metricCards("unitReportCards",cards);
    const tables=labour?[
      ["การเฝ้าระวังในผู้คลอด",[["month","เดือน"],["total_deliveries","จำนวนผู้คลอดทั้งหมด"],["deliveries","คลอดทางช่องคลอด"],["episiotomy","Episiotomy"],["no_tear","No tear"],["slight_tear","Slight tear"],["cs_deliveries","ผ่าตัดคลอด C/S"],["live_births","ทารกเกิดมีชีพ"]]]
    ]:[
      ["ตารางที่ 1 การติดเชื้อที่สัมพันธ์กับการใช้อุปกรณ์การแพทย์",[["month","เดือน"],["ventilator_days","วัน On Ventilator"],["vap_cases","VAP (ครั้ง)"],["vap_rate","อัตรา VAP"],["foley_days","วัน On Foley's cath"],["cauti_cases","CAUTI (ครั้ง)"],["cauti_rate","อัตรา CAUTI"],["iv_days","วัน On IV"],["heparin_days","วัน On Heparin lock"],["iv_lock_days","รวมวัน On IV & Lock"],["phlebitis_cases","Phlebitis ≥3"],["phlebitis_rate","อัตรา Phlebitis"],["cline_days","วัน On C-Line"],["cutdown_days","วัน On Cut down / DLC"],["umbilical_days","วัน On Umbilical cath"],["clabsi_days","รวมวัน On Device"],["clabsi_cases","CLABSI"],["clabsi_rate","อัตรา CLABSI"]]],
      ["ตารางที่ 2 การเฝ้าระวัง SSI",[["month","เดือน"],["clean_wound","Clean wound"],["clean_cont_wound","Clean-contaminated"],["contaminated_wound","Contaminated"],["dirty_wound","Dirty wound"],["ssi_cases","SSI เฉพาะแผลประเภท 1"],["ssi_rate","ร้อยละ SSI"]]],
      ["ตารางที่ 3 การเฝ้าระวังในทารกอายุ < 30 วัน",[["month","เดือน"],["live_births","ทารกเกิดมีชีพ"],["eye_infection","ติดเชื้อที่ตา (ครั้ง)"],["eye_rate","ติดเชื้อที่ตา (%)"],["navel_infection","ติดเชื้อที่สะดือ (ครั้ง)"],["navel_rate","ติดเชื้อที่สะดือ (%)"]]],
      ["ตารางที่ 4 การเฝ้าระวังในผู้คลอด",[["month","เดือน"],["deliveries","ผู้คลอดทั้งหมด"],["episiotomy","แผล Episiotomy"],["episiotomy_ni","ติดเชื้อ Episiotomy"],["episiotomy_rate","ร้อยละ"],["cs_deliveries","แผล C/S"],["cs_ni","ติดเชื้อ C/S"],["cs_rate","ร้อยละ"]]],
      ["ตารางที่ 5 การเฝ้าระวังการติดเชื้อในโรงพยาบาล",[["month","เดือน"],["patient_total","ผู้ป่วยทั้งหมด"],["discharged","ผู้ป่วยจำหน่าย"],["other_infection","ติดเชื้อตำแหน่งอื่น"],["hospital_ni","ติดเชื้อในโรงพยาบาลรวม"]]],
      ["ตารางที่ 5.1 การบาดเจ็บจากการปฏิบัติงาน",[["month","เดือน"],["staff_total","บุคลากรทั้งหมด"],["nurse_total","จำนวนพยาบาล"],["inj_needle","เข็มทิ่มตำ"],["inj_blade","ใบมีดบาด"],["inj_tube_glass","หลอดยา / tube Hct / แก้วบาด"],["inj_other_sharp","ของมีคมอื่น ๆ"],["inj_eye","สารคัดหลั่งเข้าตา"],["inj_mouth","สารคัดหลั่งเข้าปาก"],["injury","รวม"],["injury_rate","ร้อยละ"]]],
      ["ตารางที่ 5.2 การเจ็บป่วยด้วยโรคติดเชื้อ",[["month","เดือน"],["staff_total","บุคลากรทั้งหมด"],["nurse_total","จำนวนพยาบาล"],["ill_respiratory","ระบบทางเดินหายใจ"],["ill_gastro","ระบบทางเดินอาหาร"],["ill_conjunctivitis","ตาแดง"],["ill_chickenpox","อีสุกอีใส"],["ill_mumps","คางทูม"],["ill_herpes","เริม"],["ill_tb","TB ปอด"],["ill_other","อื่น ๆ"],["illness","รวม"],["illness_rate","ร้อยละ"]]]
    ];
    $("summaryContent").innerHTML=tables.map(([title,cols])=>`<div class="panel report-panel"><h3>${title}</h3><div class="table-scroll">${tableHTML(rows,cols)}</div></div>`).join("");
  }catch(e){$("summaryContent").textContent=e.message;}
}
function tableHTML(rows,cols){return `<table><thead><tr>${cols.map(c=>`<th>${c[1]}</th>`).join("")}</tr></thead><tbody>${rows.map(r=>`<tr>${cols.map(c=>`<td>${c[0]==="month"?r.month:(r.missing?"—":fmt(r[c[0]]))}</td>`).join("")}</tr>`).join("")}</tbody></table>`;}

function hidePages(){$("unitsPage").classList.add("hidden");$("unitHomePage").classList.add("hidden");$("formPage").classList.add("hidden");$("summaryPage").classList.add("hidden");$("historyPage").classList.add("hidden");}
async function showHistory(){hidePages();$("historyPage").classList.remove("hidden");$("pageTitle").textContent="ประวัติ";try{const list=await api("listRecords",{month:$("month").value});$("historyContent").innerHTML=`<table><thead><tr><th>หน่วยงาน</th><th>เดือน</th><th>สถานะ</th></tr></thead><tbody>${(list||[]).map(r=>`<tr><td>${r.unit}</td><td>${r.month}</td><td>${r.status}</td></tr>`).join("")}</tbody></table>`;}catch(e){$("historyContent").textContent=e.message;}}
$("saveBtn").onclick=()=>save(false);$("submitBtn").onclick=()=>save(true);$("backUnits").onclick=()=>{hidePages();$("unitHomePage").classList.remove("hidden");$("pageTitle").textContent=currentUnit;loadUnitHistory();};
$("addMonthlyRecord").onclick=()=>{$("month").value=localMonth();openUnit(currentUnit);};
$("changeUnit").onclick=()=>{hidePages();$("unitsPage").classList.remove("hidden");$("pageTitle").textContent="เลือกหน่วยงาน";};
$("backAdminDashboard").onclick=()=>{$("appView").classList.add("hidden");$("adminView").classList.remove("hidden");$("backAdminDashboard").classList.add("hidden");$("adminHospitalPage").classList.remove("hidden");$("adminThipPage").classList.add("hidden");$("adminUnitsPage").classList.add("hidden");document.querySelectorAll("[data-admin-page]").forEach(b=>b.classList.toggle("active",b.dataset.adminPage==="hospital"));loadAdminReports();};
$("month").max=localMonth();$("month").value=localMonth();$("month").onchange=()=>{if(currentUnit){if($("month").value>localMonth()){$("month").value=localMonth();return;}openUnit(currentUnit);}};document.querySelectorAll('[aria-label="เมนูหน่วยงาน"] .tab').forEach(b=>b.onclick=()=>{
  document.querySelectorAll('[aria-label="เมนูหน่วยงาน"] .tab').forEach(x=>x.classList.toggle("active",x===b));
  if(b.dataset.page==="home"){hidePages();$("unitHomePage").classList.remove("hidden");$("pageTitle").textContent=currentUnit;loadUnitHistory();}
  if(b.dataset.page==="summary")showSummary();
});$("signOutBtn").onclick=()=>{idToken="";user=null;try{localStorage.removeItem("icwn_google_id_token");}catch(storageError){}google?.accounts?.id?.disableAutoSelect?.();location.reload();};
function adminPeriod(){
  const fy=Number($("adminFiscalYear").value),m=$("adminMonth").value;
  return m?{month:m}:{fiscal_year:fy};
}
function initAdminView(){
  const now=new Date(),fy=now.getMonth()>=9?now.getFullYear()+544:now.getFullYear()+543;
  $("adminFiscalYear").innerHTML=Array.from({length:6},(_,i)=>fy-i).map(y=>`<option value="${y}">${y}</option>`).join("");
  $("adminFiscalYear").value=String(fy);$("adminMonth").max=localMonth();
  $("adminFiscalYear").onchange=()=>{loadAdminReports();loadAdminThip();};
  $("adminMonth").onchange=()=>{loadAdminReports();loadAdminThip();};
  $("sterilizationMonth").value=localMonth();$("sterilizationMonth").max=localMonth();$("sterilizationMonth").onchange=loadSterilizationInputs;
  document.querySelectorAll("[data-admin-page]").forEach(b=>b.onclick=()=>{
    document.querySelectorAll("[data-admin-page]").forEach(x=>x.classList.toggle("active",x===b));
    ["adminHospitalPage","adminThipPage","adminUnitsPage"].forEach((id,i)=>$(id).classList.toggle("hidden",id!==["adminHospitalPage","adminThipPage","adminUnitsPage"][["hospital","thip","units"].indexOf(b.dataset.adminPage)]));
    if(b.dataset.adminPage==="units")renderAdminUnits();
    if(b.dataset.adminPage==="thip")loadAdminThip();
    if(b.dataset.adminPage==="hospital")loadAdminReports();
  });
  $("saveSterilization").onclick=saveSterilization;
  // Admin landing page: show the unit selection grid first after login.
  document.querySelectorAll("[data-admin-page]").forEach(b=>b.classList.toggle("active",b.dataset.adminPage==="units"));
  $("adminHospitalPage").classList.add("hidden");
  $("adminThipPage").classList.add("hidden");
  $("adminUnitsPage").classList.remove("hidden");
  renderAdminUnits();
}
function renderAdminUnits(){setTimeout(paintStrips,0);
  $("adminUnitGrid").innerHTML=units.map(u=>`<button class="unit-card" data-admin-unit="${u}"><strong>${u}</strong><span class="strip">${"<i></i>".repeat(12)}</span><span class="cap">กำลังโหลดสถานะ…</span></button>`).join("");
  document.querySelectorAll("[data-admin-unit]").forEach(b=>b.onclick=()=>{currentUnit=b.dataset.adminUnit;$("adminView").classList.add("hidden");$("appView").classList.remove("hidden");$("backAdminDashboard").classList.remove("hidden");$("changeUnit").classList.add("hidden");$("addMonthlyRecord").classList.remove("hidden");hidePages();$("unitHomePage").classList.remove("hidden");$("unitHomeTitle").textContent=currentUnit;$("pageTitle").textContent=currentUnit;loadUnitHistory();});
}
function metricCards(container,items){
  $(container).innerHTML=items.map(x=>`<div class="metric-card"><small>${x[0]}</small><strong>${x[1]}</strong></div>`).join("");
}
function fmt(v,d=2){return v===null||v===undefined||v===""?"—":Number(v).toLocaleString("th-TH",{maximumFractionDigits:d});}
function renderReportTable(container,rows,columns){
  $(container).innerHTML=`<table><thead><tr>${columns.map(c=>`<th>${c[1]}</th>`).join("")}</tr></thead><tbody>${rows.map(r=>`<tr>${columns.map(c=>`<td>${c[0]==="month"?r.month:fmt(r[c[0]])}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
}
async function loadAdminReports(){
  try{
    const r=await api("getHospitalReport",adminPeriod()),rows=r.rows||[],tot=rows.reduce((a,x)=>{Object.keys(x).forEach(k=>{if(typeof x[k]==="number")a[k]=(a[k]||0)+x[k];});return a;},{});
    const rate=(n,d,m=1000)=>d?n*m/d:null,staffMonths=rows.filter(x=>Number(x.staff_total)>0),staffAverage=staffMonths.length?staffMonths.reduce((s,x)=>s+Number(x.staff_total),0)/staffMonths.length:0;
    metricCards("adminHospitalCards",[
      ["ผู้ป่วยทั้งหมด",fmt(tot.patient_total,0)],["VAP",fmt(rate(tot.vap_cases,tot.vap_days))],["CAUTI",fmt(rate(tot.cauti_cases,tot.foley_days))],
      ["P. Phlebitis",fmt(rate(tot.phlebitis_cases,tot.iv_lock_days))],["CLABSI",fmt(rate(tot.clabsi_cases,tot.clabsi_days))],
      ["SSI (%)",fmt(rate(tot.ssi_cases,tot.clean_wound,100))],["ติดเชื้อที่ตา (ครั้ง)",fmt(tot.eye_infection,0)],["ติดเชื้อที่สะดือ (ครั้ง)",fmt(tot.navel_infection,0)],
      ["ติดเชื้อ Episiotomy",fmt(tot.episiotomy_ni,0)],["ติดเชื้อแผล C/S",fmt(tot.cs_ni,0)],["วันนอนผู้ป่วยจำหน่าย",fmt(tot.patient_days,0)],
      ["ติดเชื้อตำแหน่งอื่น",fmt(tot.other_infection,0)],["ติดเชื้อใน รพ.",fmt(tot.hospital_ni,0)],["อุบัติเหตุบุคลากร (%)",fmt(rate(tot.injury,staffAverage,100))],["เจ็บป่วยบุคลากร (%)",fmt(rate(tot.illness,staffAverage,100))]
    ]);
    const reportTables=[
      ["ตารางที่ 1 การติดเชื้อที่สัมพันธ์กับการใช้อุปกรณ์การแพทย์",[["month","เดือน"],["vap_days","วัน On Ventilator"],["vap_cases","VAP"],["vap_rate","อัตรา VAP"],["foley_days","วัน On Foley's cath"],["cauti_cases","CAUTI"],["cauti_rate","อัตรา CAUTI"],["iv_lock_days","รวมวัน On IV & Lock"],["phlebitis_cases","Phlebitis ≥3"],["phlebitis_rate","อัตรา Phlebitis"],["cutdown_days","วัน On Cut down/DLC"],["cline_days","วัน On C-line"],["umbilical_days","วัน On Umbilical cath"],["clabsi_days","รวมวัน On Device"],["clabsi_cases","CLABSI"],["clabsi_rate","อัตรา CLABSI"]]],
      ["ตารางที่ 2 การเฝ้าระวัง SSI",[["month","เดือน"],["clean_wound","Clean wound"],["clean_cont_wound","Clean Cont wound"],["contaminated_wound","Contaminated wound"],["dirty_wound","Dirty wound"],["ssi_cases","SSI (แผลประเภท 1)"],["ssi_rate","ร้อยละ SSI"]]],
      ["ตารางที่ 3 การเฝ้าระวังในทารกอายุ < 30 วัน",[["month","เดือน"],["live_births","ทารกเกิดมีชีพ"],["eye_infection","ติดเชื้อที่ตา"],["eye_rate","ติดเชื้อที่ตา (%)"],["navel_infection","ติดเชื้อที่สะดือ"],["navel_rate","ติดเชื้อที่สะดือ (%)"]]],
      ["ตารางที่ 4 การเฝ้าระวังในผู้คลอด",[["month","เดือน"],["total_deliveries","ผู้คลอดทั้งหมด"],["episiotomy","แผล Episiotomy"],["episiotomy_ni","ติดเชื้อ Episiotomy"],["episiotomy_rate","ร้อยละ Episiotomy"],["cs_deliveries","แผล C/S"],["cs_ni","ติดเชื้อ C/S"],["cs_rate","ร้อยละ C/S"]]],
      ["ตารางที่ 5 การเฝ้าระวังการติดเชื้อในโรงพยาบาล",[["month","เดือน"],["patient_total","ผู้ป่วยทั้งหมด"],["discharged","ผู้ป่วยจำหน่าย"],["other_infection","ติดเชื้อตำแหน่งอื่น"],["hospital_ni","ติดเชื้อในโรงพยาบาลรวม"]]],
      ["ตารางที่ 6.1 การบาดเจ็บจากการปฏิบัติงาน",[["month","เดือน"],["staff_total","บุคลากรทั้งหมด"],["nurse_total","จำนวนพยาบาล"],["inj_needle","เข็มทิ่มตำ"],["inj_blade","ใบมีดบาด"],["inj_tube_glass","หลอดยา / tube Hct / แก้วบาด"],["inj_other_sharp","ของมีคมอื่น"],["inj_eye","สารคัดหลั่งเข้าตา"],["inj_mouth","สารคัดหลั่งเข้าปาก"],["injury","รวม"],["injury_rate","ร้อยละ"]]],
      ["ตารางที่ 6.2 การเจ็บป่วยด้วยโรคติดเชื้อ",[["month","เดือน"],["staff_total","บุคลากรทั้งหมด"],["nurse_total","จำนวนพยาบาล"],["ill_respiratory","ระบบทางเดินหายใจ"],["ill_gastro","ระบบทางเดินอาหาร"],["ill_conjunctivitis","ตาแดง"],["ill_chickenpox","อีสุกอีใส"],["ill_mumps","คางทูม"],["ill_herpes","เริม"],["ill_tb","TB ปอด"],["ill_other","อื่น ๆ"],["illness","รวม"],["illness_rate","ร้อยละ"]]]
    ];
    $("adminHospitalTable").innerHTML=reportTables.map(([title,cols])=>`<div class="report-panel"><h3>${title}</h3><div class="table-scroll">${tableHTML(rows,cols)}</div></div>`).join("");
  }catch(e){$("adminHospitalTable").textContent=e.message;}
}
async function loadAdminThip(){
  try{
    const period=adminPeriod(),r=await api("getTHIPReport",period),rows=r.rows||[];
    const total=rows.reduce((a,x)=>{["vap_cases","vap_days","vap_icu_cases","vap_icu_days","vap_non_icu_cases","vap_non_icu_days","cauti_cases","foley_days","cauti_icu_cases","cauti_icu_days","cauti_non_icu_cases","cauti_non_icu_days","injury","sterilization_passed","sterilization_total"].forEach(k=>a[k]=(a[k]||0)+(Number(x[k])||0));a.staff_sum=(a.staff_sum||0)+(Number(x.staff_average)||0);a.staff_months=(a.staff_months||0)+(Number(x.staff_average)>0?1:0);return a;},{});
    metricCards("adminThipCards",[
      ["VAP รวม",fmt(total.vap_cases,0)+" ครั้ง · "+fmt(total.vap_days?total.vap_cases*1000/total.vap_days:null)],["VAP ใน ICU & NICU",fmt(total.vap_icu_cases,0)+" ครั้ง · "+fmt(total.vap_icu_days?total.vap_icu_cases*1000/total.vap_icu_days:null)],["VAP นอก ICU",fmt(total.vap_non_icu_cases,0)+" ครั้ง · "+fmt(total.vap_non_icu_days?total.vap_non_icu_cases*1000/total.vap_non_icu_days:null)],
      ["CAUTI รวม",fmt(total.cauti_cases,0)+" ครั้ง · "+fmt(total.foley_days?total.cauti_cases*1000/total.foley_days:null)],["CAUTI ใน ICU",fmt(total.cauti_icu_cases,0)+" ครั้ง · "+fmt(total.cauti_icu_days?total.cauti_icu_cases*1000/total.cauti_icu_days:null)],["CAUTI นอก ICU",fmt(total.cauti_non_icu_cases,0)+" ครั้ง · "+fmt(total.cauti_non_icu_days?total.cauti_non_icu_cases*1000/total.cauti_non_icu_days:null)],
      ["บุคลากรบาดเจ็บ (%)",fmt(total.staff_months?(total.injury*100/(total.staff_sum/total.staff_months)):null)],["ตรวจปราศจากเชื้อผ่าน (%)",fmt(total.sterilization_total?total.sterilization_passed*100/total.sterilization_total:null)]
    ]);
    renderReportTable("adminThipTable",rows,[["month","เดือน"],["vap_cases","VAP รวม (ครั้ง)"],["vap_days","วันใช้เครื่องช่วยหายใจ"],["vap_rate","VAP รวม"],["vap_icu_cases","VAP ICU/NICU (ครั้ง)"],["vap_icu_days","วันใช้เครื่องช่วยหายใจ ICU"],["vap_icu_rate","VAP ICU/NICU"],["vap_non_icu_rate","VAP นอก ICU"],["cauti_cases","CAUTI รวม (ครั้ง)"],["foley_days","วันคาสายสวน"],["cauti_rate","CAUTI รวม"],["cauti_icu_cases","CAUTI ICU (ครั้ง)"],["cauti_icu_days","วันคาสายสวน ICU"],["cauti_icu_rate","CAUTI ICU"],["cauti_non_icu_cases","CAUTI นอก ICU (ครั้ง)"],["cauti_non_icu_days","วันคาสายสวน นอก ICU"],["cauti_non_icu_rate","CAUTI นอก ICU"],["injury","บาดเจ็บจากงาน (ครั้ง)"],["staff_average","บุคลากรเฉลี่ย"],["injury_rate","บาดเจ็บ (%)"],["sterilization_passed","ตรวจผ่าน"],["sterilization_total","ตรวจทั้งหมด"],["sterilization_rate","ตรวจผ่าน (%)"]]);
    await loadSterilizationInputs();
  }catch(e){$("adminThipTable").textContent=e.message;}
}
async function loadSterilizationInputs(){
  try{const month=$("sterilizationMonth").value||localMonth(),h=await api("getHospitalInputs",{month});$("sterilizationPassed").value=h.sterilization_passed??"";$("sterilizationTotal").value=h.sterilization_total??"";$("sterilizationMessage").textContent="";}catch(e){$("sterilizationMessage").textContent=e.message;}
}
async function saveSterilization(){
  const month=$("sterilizationMonth").value||localMonth(),passed=$("sterilizationPassed").value,total=$("sterilizationTotal").value;
  try{
    if(passed===""||total==="")throw new Error("กรุณากรอกข้อมูลทั้ง 2 ค่า");
    if(Number(passed)>Number(total))throw new Error("จำนวนครั้งที่ผ่านเกณฑ์ต้องไม่มากกว่าจำนวนครั้งที่ตรวจทั้งหมด");
    await api("saveHospitalInput",{month,values:{sterilization_passed:Number(passed),sterilization_total:Number(total)}});
    $("sterilizationMessage").textContent="บันทึกข้อมูลเรียบร้อย";loadAdminThip();loadAdminReports();
  }catch(e){$("sterilizationMessage").textContent="บันทึกไม่สำเร็จ: "+e.message;}
}

initGoogle();
/* ---- UI v2 helpers: navigation, month names, month strips ---- */
const TH_M=["ม.ค.","ก.พ.","มี.ค.","เม.ย.","พ.ค.","มิ.ย.","ก.ค.","ส.ค.","ก.ย.","ต.ค.","พ.ย.","ธ.ค."];
function monthTH(m){const [y,mo]=String(m).split("-").map(Number);return mo?TH_M[mo-1]+" "+(y+543):m;}
function fyMonths(fy){const y=fy-544,p=n=>String(n).padStart(2,"0");return [10,11,12].map(m=>y+"-"+m).concat([1,2,3,4,5,6,7,8,9].map(m=>(y+1)+"-"+p(m)));}
async function paintStrips(){
  try{
    const rows=await api("listRecords",{}),d=new Date(),fy=d.getMonth()>=9?d.getFullYear()+544:d.getFullYear()+543,ms=fyMonths(fy),now=localMonth();
    document.querySelectorAll(".unit-card").forEach(c=>{
      const u=c.dataset.unit||c.dataset.adminUnit,by={};let done=0;
      (rows||[]).filter(r=>r.unit===u).forEach(r=>by[r.month]=r.status);
      c.querySelector(".strip").innerHTML=ms.map(m=>{const st=by[m];if(st==="SUBMITTED")done++;return `<i class="${st==="SUBMITTED"?"ok":st?"dr":m>now?"fu":"mi"}" title="${monthTH(m)}"></i>`;}).join("");
      c.querySelector(".cap").textContent=`ส่งแล้ว ${done}/12 เดือน`;
    });
  }catch(e){document.querySelectorAll(".unit-card .cap").forEach(x=>x.textContent="");}
}
function setNav(k){document.querySelectorAll("[data-nav]").forEach(b=>b.classList.toggle("active",b.dataset.nav===k));}
function navTo(k){
  if(k==="account"){if(confirm("ออกจากระบบ "+(user?.email||"")+" ?"))$("signOutBtn").click();return;}
  if(user?.role==="Admin"){
    if(!$("appView").classList.contains("hidden"))$("backAdminDashboard").click();
    document.querySelector(`[data-admin-page="${k}"]`)?.click();
  }else{$("changeUnit").click();}
  setNav(k);window.scrollTo(0,0);
}
document.querySelectorAll("[data-nav]").forEach(b=>b.onclick=()=>navTo(b.dataset.nav));

/* IC Indicator — ส่วนเสริม: กราฟแนวโน้ม · ส่งออก Excel · ตรวจค่าผิดปกติในฟอร์ม · PWA
   โหลดหลัง app.js และเกี่ยวกับ app.js ผ่านฟังก์ชันส่วนกลาง (api, navTo, updateMetrics, save) */
(function(){
"use strict";
const $=id=>document.getElementById(id);
const n2=v=>v==null||v===""||isNaN(v)?"—":Number(v).toLocaleString("th-TH",{maximumFractionDigits:2});
const _api=window.api;

/* ---------- 1) กราฟแนวโน้มรายเดือน ---------- */
const PCT="ร้อยละ",K="ต่อ 1,000 วัน";
const TREND={
 std:[["vap_rate","VAP",K],["cauti_rate","CAUTI",K],["phlebitis_rate","Phlebitis ≥3",K],["clabsi_rate","CLABSI",K],["ssi_rate","SSI",PCT],["injury_rate","อุบัติเหตุบุคลากร",PCT],["illness_rate","เจ็บป่วยบุคลากร",PCT]],
 lab:[["episiotomy_rate","ติดเชื้อแผล Episiotomy",PCT],["cs_rate","ติดเชื้อแผล C/S",PCT],["injury_rate","อุบัติเหตุบุคลากร",PCT],["illness_rate","เจ็บป่วยบุคลากร",PCT]],
 thip:[["vap_rate","VAP รวม",K],["vap_icu_rate","VAP ICU/NICU",K],["vap_non_icu_rate","VAP นอก ICU",K],["cauti_rate","CAUTI รวม",K],["cauti_icu_rate","CAUTI ICU",K],["cauti_non_icu_rate","CAUTI นอก ICU",K],["injury_rate","บุคลากรบาดเจ็บ",PCT],["sterilization_rate","ตรวจปราศจากเชื้อผ่านเกณฑ์",PCT]]
};
const chosen={};
function niceMax(m){const p=Math.pow(10,Math.floor(Math.log10(m))),f=m/p;return(f<=1?1:f<=2?2:f<=5?5:10)*p;}
function lineChart(rows,[key,label,unit]){
  const W=720,H=240,L=48,R=18,T=18,B=36,vals=rows.map(r=>r[key]==null?null:Number(r[key])),real=vals.filter(v=>v!=null);
  const top=niceMax(Math.max(...real,0)||1),x=i=>L+(W-L-R)*(rows.length===1?.5:i/(rows.length-1)),y=v=>T+(H-T-B)*(1-v/top);
  let grid="",d="",pen=false,dots="";
  for(let t=0;t<=4;t++){const v=top*t/4,yy=y(v);grid+=`<line x1="${L}" x2="${W-R}" y1="${yy}" y2="${yy}"/><text x="${L-8}" y="${yy+4}" text-anchor="end">${n2(v)}</text>`;}
  vals.forEach((v,i)=>{if(v==null){pen=false;return;}d+=(pen?"L":"M")+x(i).toFixed(1)+" "+y(v).toFixed(1);pen=true;dots+=`<circle cx="${x(i).toFixed(1)}" cy="${y(v).toFixed(1)}" r="4"/><text class="val" x="${x(i).toFixed(1)}" y="${(y(v)-9).toFixed(1)}" text-anchor="middle">${n2(v)}</text>`;});
  const xl=rows.map((r,i)=>`<text x="${x(i).toFixed(1)}" y="${H-12}" text-anchor="middle">${monthTH(r.month)}</text>`).join("");
  return `<div class="chart-wrap"><svg class="chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="กราฟแนวโน้ม ${label}"><g class="grid">${grid}</g><g class="xl">${xl}</g><path class="ln" d="${d}"/><g class="pts">${dots}</g></svg></div><p class="muted">${label} · หน่วย: ${unit}</p>`;
}
function renderTrend(kind,rows,anchorId,hostId){
  const anchor=$(anchorId);if(!anchor)return;
  let host=$(hostId);if(!host){host=document.createElement("div");host.id=hostId;host.className="panel trend";anchor.insertAdjacentElement("afterend",host);}
  rows=(rows||[]).filter(r=>!r.missing);
  const opts=TREND[kind].filter(o=>rows.some(r=>r[o[0]]!=null));
  if(rows.length<2||!opts.length){host.classList.add("hidden");return;}
  const cur=opts.find(o=>o[0]===chosen[hostId])||opts[0];chosen[hostId]=cur[0];host.classList.remove("hidden");
  host.innerHTML=`<h2>แนวโน้มรายเดือน</h2><div class="chips">${opts.map(o=>`<button type="button" class="chip${o===cur?" on":""}" data-k="${o[0]}">${o[1]}</button>`).join("")}</div>${lineChart(rows,cur)}`;
  host.querySelectorAll(".chip").forEach(b=>b.onclick=()=>{chosen[hostId]=b.dataset.k;renderTrend(kind,rows,anchorId,hostId);});
}
window.api=async function(action,data){
  const r=await _api.apply(this,arguments);
  try{
    const map={getUnitReport:[()=>isLabour(currentUnit)?"lab":"std","unitReportCards","trend-unit"],getHospitalReport:[()=>"std","adminHospitalCards","trend-hosp"],getTHIPReport:[()=>"thip","adminThipCards","trend-thip"]}[action];
    if(map){if(data&&data.month){$(map[2])?.classList.add("hidden");}else renderTrend(map[0](),r.rows,map[1],map[2]);}
  }catch(e){console.warn(e);}
  return r;
};

/* ---------- 2) ตรวจค่าผิดปกติในฟอร์ม (เตือนเท่านั้น ไม่บล็อกการบันทึก) ---------- */
function issues(){
  const d=currentData,n=k=>d[k]===""||d[k]==null?null:Number(d[k]),out=[],text=/_detail|_location|_symptoms|_organism|_factors/;
  const sum=(...ks)=>{const v=ks.map(n).filter(x=>x!=null);return v.length?v.reduce((a,b)=>a+b,0):null;};
  const gt=(a,b,msg)=>{const x=n(a),y=typeof b==="string"?n(b):b;if(x!=null&&y!=null&&x>y)out.push([a,msg]);};
  Object.keys(d).forEach(k=>{const v=n(k);if(v!=null&&!text.test(k)&&v<0)out.push([k,"ค่าต้องไม่ติดลบ"]);});
  gt("vap_cases","ventilator_days","VAP มากกว่าจำนวนวัน On Ventilator");
  gt("cauti_cases","foley_days","CAUTI มากกว่าจำนวนวัน On Foley");
  gt("clabsi_cases",sum("cline_days","cutdown_days","umbilical_days"),"CLABSI มากกว่าจำนวนวัน On Device");
  gt("phlebitis_cases",sum("iv_days","heparin_days"),"Phlebitis มากกว่าจำนวนวัน On IV & Heparin lock");
  gt("ssi_cases","clean_wound","SSI มากกว่าจำนวนแผลประเภท 1");
  gt("eye_infection","live_births","ติดเชื้อที่ตามากกว่าจำนวนทารกเกิดมีชีพ");
  gt("navel_infection","live_births","ติดเชื้อที่สะดือมากกว่าจำนวนทารกเกิดมีชีพ");
  gt("episiotomy_ni","episiotomy","ติดเชื้อแผล Episiotomy มากกว่าจำนวนแผล");
  gt("cs_ni","cs_deliveries","ติดเชื้อแผล C/S มากกว่าจำนวนผ่าตัดคลอด");
  gt("nurse_total","staff_total","จำนวนพยาบาลมากกว่าบุคลากรทั้งหมด");
  gt("ventilator_days","patient_days","วัน On Ventilator มากกว่าวันนอนรวม");
  gt("foley_days","patient_days","วัน On Foley มากกว่าวันนอนรวม");
  if(isLabour(currentUnit)){
    const t=n("total_deliveries"),a=n("deliveries"),c=n("cs_deliveries");
    if(t!=null&&a!=null&&c!=null&&t!==a+c)out.push(["total_deliveries","คลอดทางช่องคลอด + ผ่าตัดคลอด ไม่เท่ากับจำนวนผู้คลอดทั้งหมด"]);
    gt("episiotomy","deliveries","Episiotomy มากกว่าจำนวนคลอดทางช่องคลอด");
  }
  const events=sum("inj_needle","inj_blade","inj_tube_glass","inj_other_sharp","inj_eye","inj_mouth","ill_respiratory","ill_gastro","ill_conjunctivitis","ill_chickenpox","ill_mumps","ill_herpes","ill_tb","ill_other");
  if(events>0&&!n("staff_total"))out.push(["staff_total","มีอุบัติเหตุหรือเจ็บป่วย แต่ยังไม่ได้กรอกจำนวนบุคลากร (คำนวณร้อยละไม่ได้)"]);
  const seen=new Set();return out.filter(([k])=>!seen.has(k)&&seen.add(k));
}
function paintIssues(){
  document.querySelectorAll("#formSections .warn").forEach(e=>e.remove());
  document.querySelectorAll("#formSections .has-warn").forEach(e=>e.classList.remove("has-warn"));
  const list=issues();
  list.forEach(([k,m])=>{const f=document.getElementById(k)?.closest(".field");if(!f)return;f.classList.add("has-warn");const p=document.createElement("small");p.className="warn";p.textContent=m;f.appendChild(p);});
  let b=$("warnCount");if(!b){b=document.createElement("span");b.id="warnCount";b.className="warn-count";$("saveMessage").insertAdjacentElement("beforebegin",b);}
  b.textContent=list.length?`⚠ มีข้อสังเกต ${list.length} รายการ`:"";b.classList.toggle("hidden",!list.length);
}
const _um=window.updateMetrics;
window.updateMetrics=function(){_um.apply(this,arguments);try{paintIssues();}catch(e){console.warn(e);}};
const _save=window.save;
window.save=async function(submit){
  if(submit){const c=issues().length;if(c&&!confirm(`มีข้อสังเกต ${c} รายการ (แสดงสีเหลืองใต้ช่องกรอก)\nต้องการส่งรายงานต่อหรือไม่?`))return;}
  return _save.apply(this,arguments);
};

/* ---------- 3) ส่งออก Excel ตามช่วงเดือน ---------- */
const AVG=["staff_total","nurse_total","staff_average"];
const RATES={vap_rate:["vap_cases",["ventilator_days","vap_days"],1000],cauti_rate:["cauti_cases",["foley_days"],1000],phlebitis_rate:["phlebitis_cases",["iv_lock_days"],1000],clabsi_rate:["clabsi_cases",["clabsi_days"],1000],ssi_rate:["ssi_cases",["clean_wound"],100],eye_rate:["eye_infection",["live_births"],100],navel_rate:["navel_infection",["live_births"],100],episiotomy_rate:["episiotomy_ni",["episiotomy"],100],cs_rate:["cs_ni",["cs_deliveries"],100],injury_rate:["injury",["staff_total","staff_average"],100],illness_rate:["illness",["staff_total"],100],vap_icu_rate:["vap_icu_cases",["vap_icu_days"],1000],vap_non_icu_rate:["vap_non_icu_cases",["vap_non_icu_days"],1000],cauti_icu_rate:["cauti_icu_cases",["cauti_icu_days"],1000],cauti_non_icu_rate:["cauti_non_icu_cases",["cauti_non_icu_days"],1000],sterilization_rate:["sterilization_passed",["sterilization_total"],100]};
const M=["month","เดือน"];
const tables=(vent,del)=>[
 ["T1 อุปกรณ์การแพทย์","ตารางที่ 1 การติดเชื้อที่สัมพันธ์กับการใช้อุปกรณ์การแพทย์",[M,[vent,"วัน On Ventilator"],["vap_cases","VAP (ครั้ง)"],["vap_rate","อัตรา VAP /1,000 วัน"],["foley_days","วัน On Foley"],["cauti_cases","CAUTI (ครั้ง)"],["cauti_rate","อัตรา CAUTI /1,000 วัน"],["iv_days","วัน On IV"],["heparin_days","วัน On Heparin lock"],["iv_lock_days","รวมวัน On IV & Lock"],["phlebitis_cases","Phlebitis ≥3"],["phlebitis_rate","อัตรา Phlebitis /1,000 วัน"],["cline_days","วัน On C-Line"],["cutdown_days","วัน On Cut down/DLC"],["umbilical_days","วัน On Umbilical"],["clabsi_days","รวมวัน On Device"],["clabsi_cases","CLABSI (ครั้ง)"],["clabsi_rate","อัตรา CLABSI /1,000 วัน"]]],
 ["T2 SSI","ตารางที่ 2 การเฝ้าระวัง SSI",[M,["clean_wound","Clean wound"],["clean_cont_wound","Clean-contaminated"],["contaminated_wound","Contaminated"],["dirty_wound","Dirty wound"],["ssi_cases","SSI (แผลประเภท 1)"],["ssi_rate","ร้อยละ SSI"]]],
 ["T3 ทารก","ตารางที่ 3 การเฝ้าระวังในทารกอายุ < 30 วัน",[M,["live_births","ทารกเกิดมีชีพ"],["eye_infection","ติดเชื้อที่ตา"],["eye_rate","ร้อยละ"],["navel_infection","ติดเชื้อที่สะดือ"],["navel_rate","ร้อยละ"]]],
 ["T4 ผู้คลอด","ตารางที่ 4 การเฝ้าระวังในผู้คลอด",[M,[del,"ผู้คลอดทั้งหมด"],["episiotomy","แผล Episiotomy"],["episiotomy_ni","ติดเชื้อ Episiotomy"],["episiotomy_rate","ร้อยละ"],["cs_deliveries","แผล C/S"],["cs_ni","ติดเชื้อ C/S"],["cs_rate","ร้อยละ"]]],
 ["T5 ติดเชื้อใน รพ.","ตารางที่ 5 การเฝ้าระวังการติดเชื้อในโรงพยาบาล",[M,["patient_total","ผู้ป่วยทั้งหมด"],["discharged","ผู้ป่วยจำหน่าย"],["other_infection","ติดเชื้อตำแหน่งอื่น"],["hospital_ni","ติดเชื้อใน รพ. รวม"]]],
 ...personnel()];
function personnel(){return[
 ["T6 บาดเจ็บจากงาน","การบาดเจ็บจากการปฏิบัติงาน",[M,["staff_total","บุคลากรทั้งหมด"],["nurse_total","พยาบาล"],["inj_needle","เข็มทิ่มตำ"],["inj_blade","ใบมีดบาด"],["inj_tube_glass","หลอดยา/tube Hct/แก้วบาด"],["inj_other_sharp","ของมีคมอื่น ๆ"],["inj_eye","สารคัดหลั่งเข้าตา"],["inj_mouth","สารคัดหลั่งเข้าปาก"],["injury","รวม"],["injury_rate","ร้อยละ"]]],
 ["T7 เจ็บป่วย","การเจ็บป่วยด้วยโรคติดเชื้อ",[M,["staff_total","บุคลากรทั้งหมด"],["nurse_total","พยาบาล"],["ill_respiratory","ทางเดินหายใจ"],["ill_gastro","ทางเดินอาหาร"],["ill_conjunctivitis","ตาแดง"],["ill_chickenpox","อีสุกอีใส"],["ill_mumps","คางทูม"],["ill_herpes","เริม"],["ill_tb","TB ปอด"],["ill_other","อื่น ๆ"],["illness","รวม"],["illness_rate","ร้อยละ"]]]];}
const LABOUR=[["T1 ห้องคลอด","การเฝ้าระวังในผู้คลอด (ห้องคลอด)",[M,["total_deliveries","ผู้คลอดทั้งหมด"],["deliveries","คลอดทางช่องคลอด"],["episiotomy","Episiotomy"],["episiotomy_ni","ติดเชื้อ Episiotomy"],["no_tear","No tear"],["slight_tear","Slight tear"],["cs_deliveries","ผ่าตัดคลอด C/S"],["cs_ni","ติดเชื้อ C/S"],["live_births","ทารกเกิดมีชีพ"]]],...personnel()];
const THIP=[["THIP II","ตัวชี้วัด THIP II รายเดือน",[M,["vap_cases","VAP รวม (ครั้ง)"],["vap_days","วัน On Ventilator"],["vap_rate","VAP รวม /1,000 วัน"],["vap_icu_cases","VAP ICU/NICU (ครั้ง)"],["vap_icu_days","วัน On Ventilator ICU/NICU"],["vap_icu_rate","VAP ICU/NICU"],["vap_non_icu_cases","VAP นอก ICU (ครั้ง)"],["vap_non_icu_days","วัน On Ventilator นอก ICU"],["vap_non_icu_rate","VAP นอก ICU"],["cauti_cases","CAUTI รวม (ครั้ง)"],["foley_days","วัน On Foley"],["cauti_rate","CAUTI รวม /1,000 วัน"],["cauti_icu_cases","CAUTI ICU (ครั้ง)"],["cauti_icu_days","วัน On Foley ICU"],["cauti_icu_rate","CAUTI ICU"],["cauti_non_icu_cases","CAUTI นอก ICU (ครั้ง)"],["cauti_non_icu_days","วัน On Foley นอก ICU"],["cauti_non_icu_rate","CAUTI นอก ICU"],["injury","บาดเจ็บจากงาน (ครั้ง)"],["staff_average","บุคลากรเฉลี่ย"],["injury_rate","บาดเจ็บ (%)"],["sterilization_passed","ตรวจปราศจากเชื้อผ่าน (ครั้ง)"],["sterilization_total","ตรวจทั้งหมด (ครั้ง)"],["sterilization_rate","ผ่านเกณฑ์ (%)"]]]];
function totalRow(rows,cols){
  const sum={},cnt={};rows.filter(r=>!r.missing).forEach(r=>{for(const k in r){const v=r[k];if(typeof v==="number"&&isFinite(v)){sum[k]=(sum[k]||0)+v;if(v>0)cnt[k]=(cnt[k]||0)+1;}}});
  const get=k=>AVG.includes(k)?(cnt[k]?sum[k]/cnt[k]:0):(sum[k]||0);
  return cols.map(([k],i)=>{
    if(!i)return"รวม";
    const rt=RATES[k];if(rt){const den=rt[1].find(x=>x in sum);return den&&get(den)?Math.round(get(rt[0])*rt[2]/get(den)*100)/100:"";}
    return k in sum?Math.round(get(k)*100)/100:"";});
}
function sheet(XLSX,[,title,cols],rows,meta){
  const head=cols.map(c=>c[1]),body=rows.map(r=>cols.map(([k])=>{
    if(k==="month")return monthTH(r.month);if(r.missing)return"";const v=r[k];
    return v==null||v===""?"":typeof v==="number"?(RATES[k]?Math.round(v*100)/100:v):v;}));
  body.push(totalRow(rows,cols));
  const ws=XLSX.utils.aoa_to_sheet([[title],[meta],[],head,...body,[],["หมายเหตุ: จำนวนบุคลากรในแถวรวมเป็นค่าเฉลี่ยรายเดือน และร้อยละบุคลากรคำนวณจากค่าเฉลี่ยนั้น"]]);
  ws["!cols"]=head.map((h,i)=>({wch:i?Math.max(11,Math.min(20,h.length+3)):12}));
  ws["!merges"]=[{s:{r:0,c:0},e:{r:0,c:Math.min(head.length-1,8)}}];return ws;
}
function loadXLSX(){
  if(window.XLSX)return Promise.resolve(window.XLSX);
  return new Promise((ok,no)=>{const s=document.createElement("script");s.src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js";s.onload=()=>ok(window.XLSX);s.onerror=()=>no(new Error("โหลดตัวสร้างไฟล์ Excel ไม่สำเร็จ ตรวจสอบอินเทอร์เน็ตแล้วลองใหม่"));document.head.appendChild(s);});
}
function opt(v,t,sel){return `<option value="${v}"${sel?" selected":""}>${t}</option>`;}
function fillMonths(){
  const fy=Number($("exFy").value),ms=fyMonths(fy),now=localMonth(),last=ms.includes(now)?now:ms[11];
  $("exFrom").innerHTML=ms.map((m,i)=>opt(m,monthTH(m),!i)).join("");
  $("exTo").innerHTML=ms.map(m=>opt(m,monthTH(m),m===last)).join("");
}
function initExport(){
  const admin=user.role==="Admin",d=new Date(),fy=d.getMonth()>=9?d.getFullYear()+544:d.getFullYear()+543;
  $("exScope").innerHTML=opt("unit","รายงานรายหน่วยงาน",true)+(admin?opt("hosp","รายงานทั้งโรงพยาบาล")+opt("thip","รายงาน THIP II"):"");
  $("exUnit").innerHTML=units.map(u=>opt(u,u,u===currentUnit)).join("");
  $("exFy").innerHTML=Array.from({length:6},(_,i)=>opt(fy-i,fy-i,!i)).join("");
  fillMonths();$("exUnitWrap").classList.remove("hidden");$("exMsg").textContent="";
}
async function doExport(){
  const scope=$("exScope").value,unit=$("exUnit").value,fy=Number($("exFy").value),from=$("exFrom").value,to=$("exTo").value,msg=$("exMsg"),btn=$("exGo");
  if(from>to){msg.textContent="เดือนเริ่มต้นต้องไม่อยู่หลังเดือนสิ้นสุด";return;}
  btn.disabled=true;msg.textContent="กำลังเตรียมไฟล์…";
  try{
    const act={unit:"getUnitReport",hosp:"getHospitalReport",thip:"getTHIPReport"}[scope];
    const [XLSX,res]=await Promise.all([loadXLSX(),_api(act,scope==="unit"?{unit,fiscal_year:fy}:{fiscal_year:fy})]);
    const rows=(res.rows||[]).filter(r=>r.month>=from&&r.month<=to);
    if(!rows.length)throw new Error("ไม่มีข้อมูลในช่วงเดือนที่เลือก");
    const defs=scope==="thip"?THIP:scope==="hosp"?tables("vap_days","total_deliveries"):isLabour(unit)?LABOUR:tables("ventilator_days","deliveries");
    const label={unit:unit,hosp:"ทั้งโรงพยาบาล",thip:"THIP II"}[scope],meta=`${label} · ปีงบประมาณ ${fy} · ${monthTH(from)} – ${monthTH(to)}`;
    const wb=XLSX.utils.book_new();defs.forEach(def=>XLSX.utils.book_append_sheet(wb,sheet(XLSX,def,rows,"รพร.สว่างแดนดิน · "+meta),def[0].slice(0,31)));
    XLSX.writeFile(wb,`IC_${label}_${from}_${to}.xlsx`);
    msg.textContent=`ดาวน์โหลดแล้ว · ${defs.length} ชีต · ${rows.length} เดือน`;
  }catch(e){msg.textContent="ส่งออกไม่สำเร็จ: "+e.message;}
  finally{btn.disabled=false;}
}
function showExport(){
  ["adminView","appView","loginView"].forEach(id=>$(id).classList.add("hidden"));
  $("exportPage").classList.remove("hidden");initExport();setNav("export");window.scrollTo(0,0);
}
const _nav=window.navTo;
window.navTo=function(k){
  if(k==="export"){showExport();return;}
  const ep=$("exportPage");
  if(!ep.classList.contains("hidden")){ep.classList.add("hidden");$(user.role==="Admin"?"adminView":"appView").classList.remove("hidden");}
  _nav(k);
};
$("exFy").onchange=fillMonths;
$("exScope").onchange=()=>$("exUnitWrap").classList.toggle("hidden",$("exScope").value!=="unit");
$("exGo").onclick=doExport;

/* ---------- 4) PWA + แจ้งเตือนออฟไลน์ ---------- */
if("serviceWorker"in navigator&&location.protocol.startsWith("http"))addEventListener("load",()=>navigator.serviceWorker.register("./sw.js").catch(()=>{}));
const bar=document.createElement("div");bar.id="offlineBar";bar.className="offline hidden";bar.setAttribute("role","status");bar.textContent="ออฟไลน์ — ยังบันทึกหรือโหลดข้อมูลไม่ได้จนกว่าจะเชื่อมต่ออินเทอร์เน็ต";document.body.appendChild(bar);
const sync=()=>bar.classList.toggle("hidden",navigator.onLine);addEventListener("online",sync);addEventListener("offline",sync);sync();
})();
