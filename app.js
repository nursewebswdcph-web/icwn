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
const LABOUR=[{title:"การเฝ้าระวังในผู้คลอด",fields:[["total_deliveries","จำนวนผู้คลอดทั้งหมด (ราย)"],["deliveries","คลอดทางช่องคลอด (ราย)"],["episiotomy","Episiotomy (ราย)"],["no_tear","No tear (ราย)"],["slight_tear","Slight tear (ราย)"],["cs_deliveries","ผ่าตัดคลอดทางหน้าท้อง (ราย)"],["live_births","ทารกเกิดมีชีพทั้งหมด (ราย)"]]}];
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
    $("userEmail").textContent=user.email;
    $("saveBtn").disabled=user.role==="Viewer";
    $("submitBtn").disabled=user.role==="Viewer";
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
    $("signOutBtn").classList.remove("hidden");
    hideLoginLoading();
  }catch(e){
    idToken="";
    $("loginMessage").textContent="เข้าสู่ระบบไม่สำเร็จ: "+(e?.message||"เกิดข้อผิดพลาด กรุณาลองใหม่");
    hideLoginLoading();
  }finally{
    loginInProgress=false;
  }
}
function initGoogle(){if(!window.google?.accounts?.id){setTimeout(initGoogle,300);return;}if(CONFIG.GOOGLE_CLIENT_ID.startsWith("YOUR_")){$("loginMessage").textContent="กรุณากำหนด GOOGLE_CLIENT_ID ใน app.js ก่อนเปิดใช้";return;}google.accounts.id.initialize({client_id:CONFIG.GOOGLE_CLIENT_ID,callback:loginCredential});google.accounts.id.renderButton($("googleButton"),{theme:"outline",size:"large",shape:"pill",text:"signin_with",locale:"th"});}
function fieldMarkup(key,label){const textType=/_detail|_location|_symptoms|_organism|_factors/.test(key);return `<div class="field"><label for="${key}">${label}</label>${textType?`<textarea id="${key}" data-key="${key}" placeholder="ระบุข้อมูล (ถ้ามี)"></textarea>`:`<input id="${key}" data-key="${key}" type="number" min="0" step="any" inputmode="decimal" placeholder="0">`}</div>`;}
function renderSections(){const sections=isLabour(currentUnit)?[...LABOUR,...PERSONNEL]:[...STANDARD,...PERSONNEL];$("formSections").innerHTML=sections.map((s,i)=>`<details class="section" open><summary>${String(i+1).padStart(2,"0")} · ${s.title}</summary><div class="section-body"><div class="field-grid">${s.fields.map(f=>fieldMarkup(f[0],f[1])).join("")}</div>${s.title.startsWith("อุบัติเหตุ")||s.title.startsWith("การเจ็บป่วย")?"":""}</div></details>`).join("")+`<div class="calc-row"><div class="metric"><small>รวมอุบัติเหตุ (ครั้ง)</small><strong id="injTotal">0</strong></div><div class="metric"><small>% อุบัติเหตุ</small><strong id="injRate">—</strong></div><div class="metric"><small>รวมเจ็บป่วย (ครั้ง)</small><strong id="illTotal">0</strong></div><div class="metric"><small>% ป่วย</small><strong id="illRate">—</strong></div></div>`;
document.querySelectorAll("[data-key]").forEach(el=>{el.value=currentData[el.dataset.key]??"";el.addEventListener("input",()=>{currentData[el.dataset.key]=el.value;updateMetrics();});});updateMetrics();}
function updateMetrics(){const injury=["inj_needle","inj_blade","inj_tube_glass","inj_other_sharp","inj_eye","inj_mouth"].reduce((s,k)=>s+num(currentData[k]),0);const illness=["ill_respiratory","ill_gastro","ill_conjunctivitis","ill_chickenpox","ill_mumps","ill_herpes","ill_tb","ill_other"].reduce((s,k)=>s+num(currentData[k]),0);const staff=num(currentData.staff_total);$("injTotal").textContent=injury;$("illTotal").textContent=illness;$("injRate").textContent=staff?(injury*100/staff).toFixed(2)+"%":"—";$("illRate").textContent=staff?(illness*100/staff).toFixed(2)+"%":"—";}
async function openUnit(unit){currentUnit=unit;$("saveBtn").disabled=user?.role==="Viewer";$("submitBtn").disabled=user?.role==="Viewer";currentData=emptyData();currentRecord=null;$("unitsPage").classList.add("hidden");$("unitHomePage").classList.add("hidden");$("summaryPage").classList.add("hidden");$("historyPage").classList.add("hidden");$("formPage").classList.remove("hidden");$("unitTitle").textContent=unit;$("pageTitle").textContent=unit;renderSections();try{const rec=await api("getRecord",{unit,month:$("month").value});if(rec){currentRecord=rec;currentData={...currentData,...rec.payload};document.querySelectorAll("[data-key]").forEach(el=>el.value=currentData[el.dataset.key]??"");updateMetrics();$("recordStatus").textContent=rec.status==="SUBMITTED"?"ส่งแล้ว":"ฉบับร่าง";$("recordStatus").className="status "+(rec.status==="SUBMITTED"?"submitted":"draft");}}catch(e){setMsg(e.message);}}
function renderUnits(){
  $("unitGrid").innerHTML=units.map(u=>`<button class="unit-card" data-unit="${u}"><strong><i class="unit-dot"></i>${u}</strong><small>เปิดระบบหน่วยงาน →</small></button>`).join("");
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
    $("unitHistoryContent").innerHTML=list.length?`<table><thead><tr><th>เดือน</th><th>สถานะ</th><th>แก้ไขล่าสุด</th><th></th></tr></thead><tbody>${list.map(r=>`<tr><td>${r.month}</td><td>${r.status==="SUBMITTED"?"ส่งแล้ว":"ฉบับร่าง"}</td><td>${r.updated_at?new Date(r.updated_at).toLocaleString("th-TH"):"—"}</td><td><button class="back" data-open-month="${r.month}">เปิดรายการ</button></td></tr>`).join("")}</tbody></table>`:"<p class='muted'>ยังไม่มีประวัติการบันทึกของหน่วยงานนี้</p>";
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
    const sum=k=>valid.reduce((s,x)=>s+(Number(x[k])||0),0),rate=(n,d,m=1000)=>d?n*m/d:null;
    const labour=isLabour(currentUnit);
    const cards=labour?[
      ["จำนวนผู้คลอดทั้งหมด",fmt(sum("total_deliveries"),0)],["จำนวนแผล Episiotomy",fmt(sum("episiotomy"),0)],["จำนวนแผล C/S",fmt(sum("cs_deliveries"),0)],
      ["อุบัติเหตุบุคลากร",fmt(sum("injury"),0)+" ครั้ง · "+fmt(rate(sum("injury"),sum("staff_total"),100))+"%"],
      ["การเจ็บป่วยบุคลากร",fmt(sum("illness"),0)+" ครั้ง · "+fmt(rate(sum("illness"),sum("staff_total"),100))+"%"]
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
      ["ตารางที่ 6 การเฝ้าระวังในบุคลากร",[["month","เดือน"],["staff_total","บุคลากรทั้งหมด"],["injury","อุบัติเหตุ (ครั้ง)"],["injury_rate","อุบัติเหตุ (%)"],["illness","เจ็บป่วยโรคติดเชื้อ (ครั้ง)"],["illness_rate","เจ็บป่วย (%)"]]]
    ];
    $("summaryContent").innerHTML=tables.map(([title,cols])=>`<div class="panel report-panel"><h3>${title}</h3><div class="table-scroll">${tableHTML(rows,cols)}</div></div>`).join("");
  }catch(e){$("summaryContent").textContent=e.message;}
}
function tableHTML(rows,cols){return `<table><thead><tr>${cols.map(c=>`<th>${c[1]}</th>`).join("")}</tr></thead><tbody>${rows.map(r=>`<tr>${cols.map(c=>`<td>${c[0]==="month"?r.month:(r.missing?"—":fmt(r[c[0]]))}</td>`).join("")}</tr>`).join("")}</tbody></table>`;}

function hidePages(){$("unitsPage").classList.add("hidden");$("unitHomePage").classList.add("hidden");$("formPage").classList.add("hidden");$("summaryPage").classList.add("hidden");$("historyPage").classList.add("hidden");}
async function showHistory(){hidePages();$("historyPage").classList.remove("hidden");$("pageTitle").textContent="ประวัติ";try{const list=await api("listRecords",{month:$("month").value});$("historyContent").innerHTML=`<table><thead><tr><th>หน่วยงาน</th><th>เดือน</th><th>สถานะ</th></tr></thead><tbody>${(list||[]).map(r=>`<tr><td>${r.unit}</td><td>${r.month}</td><td>${r.status}</td></tr>`).join("")}</tbody></table>`;}catch(e){$("historyContent").textContent=e.message;}}
$("saveBtn").onclick=()=>save(false);$("submitBtn").onclick=()=>save(true);$("backUnits").onclick=()=>{hidePages();$("unitHomePage").classList.remove("hidden");$("pageTitle").textContent=currentUnit;loadUnitHistory();};
$("addMonthlyRecord").onclick=()=>{$("month").value=localMonth();openUnit(currentUnit);};
$("backAdminDashboard").onclick=()=>{$("appView").classList.add("hidden");$("adminView").classList.remove("hidden");$("backAdminDashboard").classList.add("hidden");loadAdminReports();};
$("month").max=localMonth();$("month").value=localMonth();$("month").onchange=()=>{if(currentUnit){if($("month").value>localMonth()){$("month").value=localMonth();return;}openUnit(currentUnit);}};document.querySelectorAll('[aria-label="เมนูหน่วยงาน"] .tab').forEach(b=>b.onclick=()=>{
  document.querySelectorAll('[aria-label="เมนูหน่วยงาน"] .tab').forEach(x=>x.classList.toggle("active",x===b));
  if(b.dataset.page==="home"){hidePages();$("unitHomePage").classList.remove("hidden");$("pageTitle").textContent=currentUnit;loadUnitHistory();}
  if(b.dataset.page==="summary")showSummary();
});$("signOutBtn").onclick=()=>{idToken="";user=null;google?.accounts?.id?.disableAutoSelect?.();location.reload();};
function adminPeriod(){
  const fy=Number($("adminFiscalYear").value),m=$("adminMonth").value;
  return m?{month:m}:{fiscal_year:fy};
}
function initAdminView(){
  const now=new Date(),fy=now.getMonth()>=9?now.getFullYear()+544:now.getFullYear()+543;
  $("adminFiscalYear").innerHTML=Array.from({length:6},(_,i)=>fy-i).map(y=>`<option value="${y}">${y}</option>`).join("");
  $("adminFiscalYear").value=String(fy);$("adminMonth").max=localMonth();
  $("adminFiscalYear").onchange=()=>loadAdminReports();
  $("adminMonth").onchange=()=>loadAdminReports();
  document.querySelectorAll("[data-admin-page]").forEach(b=>b.onclick=()=>{
    document.querySelectorAll("[data-admin-page]").forEach(x=>x.classList.toggle("active",x===b));
    ["adminHospitalPage","adminThipPage","adminUnitsPage"].forEach((id,i)=>$(id).classList.toggle("hidden",id!==["adminHospitalPage","adminThipPage","adminUnitsPage"][["hospital","thip","units"].indexOf(b.dataset.adminPage)]));
    if(b.dataset.adminPage==="units")renderAdminUnits();
    if(b.dataset.adminPage==="thip")loadAdminThip();
  });
  $("saveSterilization").onclick=saveSterilization;
  loadAdminReports();loadAdminThip();
}
function renderAdminUnits(){
  $("adminUnitGrid").innerHTML=units.map(u=>`<button class="unit-card" data-admin-unit="${u}"><strong><i class="unit-dot"></i>${u}</strong><small>เข้าบันทึกข้อมูล →</small></button>`).join("");
  document.querySelectorAll("[data-admin-unit]").forEach(b=>b.onclick=()=>{currentUnit=b.dataset.adminUnit;$("adminView").classList.add("hidden");$("appView").classList.remove("hidden");$("backAdminDashboard").classList.remove("hidden");hidePages();$("unitHomePage").classList.remove("hidden");$("unitHomeTitle").textContent=currentUnit;$("pageTitle").textContent=currentUnit;loadUnitHistory();});
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
    const rate=(n,d,m=1000)=>d?n*m/d:null;
    metricCards("adminHospitalCards",[
      ["ผู้ป่วยทั้งหมด",fmt(tot.patient_total,0)],["VAP",fmt(rate(tot.vap_cases,tot.vap_days))],["CAUTI",fmt(rate(tot.cauti_cases,tot.foley_days))],
      ["P. Phlebitis",fmt(rate(tot.phlebitis_cases,tot.iv_lock_days))],["CLABSI",fmt(rate(tot.clabsi_cases,tot.clabsi_days))],
      ["SSI (%)",fmt(rate(tot.ssi_cases,tot.ssi_clean,100))],["ติดเชื้อที่ตา (ครั้ง)",fmt(tot.eye_infection,0)],["ติดเชื้อที่สะดือ (ครั้ง)",fmt(tot.navel_infection,0)],
      ["ติดเชื้อ Episiotomy",fmt(tot.episiotomy_ni,0)],["ติดเชื้อแผล C/S",fmt(tot.cs_ni,0)],["วันนอนผู้ป่วยจำหน่าย",fmt(tot.patient_days,0)],
      ["ติดเชื้อตำแหน่งอื่น",fmt(tot.other_infection,0)],["ติดเชื้อใน รพ.",fmt(tot.hospital_ni,0)],["อุบัติเหตุบุคลากร (%)",fmt(rate(tot.injury,tot.staff_total,100))],["เจ็บป่วยบุคลากร (%)",fmt(rate(tot.illness,tot.staff_total,100))]
    ]);
    renderReportTable("adminHospitalTable",rows,[["month","เดือน"],["vap_days","วัน On Ventilator"],["vap_cases","VAP"],["vap_rate","อัตรา VAP"],["foley_days","วัน On Foley"],["cauti_cases","CAUTI"],["cauti_rate","อัตรา CAUTI"],["iv_lock_days","วัน On IV & Lock"],["phlebitis_cases","Phlebitis ≥3"],["phlebitis_rate","อัตรา Phlebitis"],["clabsi_days","วัน On Device"],["clabsi_cases","CLABSI"],["clabsi_rate","อัตรา CLABSI"],["ssi_clean","Clean wound"],["ssi_cases","SSI"],["ssi_rate","SSI (%)"],["eye_infection","ติดเชื้อที่ตา"],["navel_infection","ติดเชื้อที่สะดือ"],["episiotomy_ni","ติดเชื้อ Episiotomy"],["cs_ni","ติดเชื้อ C/S"],["other_infection","ติดเชื้ออื่น"],["hospital_ni","ติดเชื้อใน รพ."]]);
  }catch(e){$("adminHospitalTable").textContent=e.message;}
}
async function loadAdminThip(){
  try{
    const period=adminPeriod(),r=await api("getTHIPReport",period),rows=r.rows||[];
    const total=rows.reduce((a,x)=>{["vap_cases","vap_icu_cases","vap_non_icu_cases","cauti_cases","cauti_icu_cases","cauti_non_icu_cases","injury","sterilization_passed","sterilization_total"].forEach(k=>a[k]=(a[k]||0)+(Number(x[k])||0));a.staff_sum=(a.staff_sum||0)+(Number(x.staff_average)||0);a.staff_months=(a.staff_months||0)+(Number(x.staff_average)>0?1:0);return a;},{});
    metricCards("adminThipCards",[
      ["VAP รวม",fmt(total.vap_cases,0)],["VAP ใน ICU & NICU",fmt(total.vap_icu_cases,0)],["VAP นอก ICU",fmt(total.vap_non_icu_cases,0)],
      ["CAUTI รวม",fmt(total.cauti_cases,0)],["CAUTI ใน ICU",fmt(total.cauti_icu_cases,0)],["CAUTI นอก ICU",fmt(total.cauti_non_icu_cases,0)],
      ["บุคลากรบาดเจ็บ (%)",fmt(total.staff_months?(total.injury*100/(total.staff_sum/total.staff_months)):null)],["ตรวจปราศจากเชื้อผ่าน (%)",fmt(total.sterilization_total?total.sterilization_passed*100/total.sterilization_total:null)]
    ]);
    renderReportTable("adminThipTable",rows,[["month","เดือน"],["vap_cases","VAP รวม (ครั้ง)"],["vap_days","วันใช้เครื่องช่วยหายใจ"],["vap_rate","VAP รวม"],["vap_icu_cases","VAP ICU/NICU (ครั้ง)"],["vap_icu_days","วันใช้เครื่องช่วยหายใจ ICU"],["vap_icu_rate","VAP ICU/NICU"],["vap_non_icu_rate","VAP นอก ICU"],["cauti_cases","CAUTI รวม (ครั้ง)"],["foley_days","วันคาสายสวน"],["cauti_rate","CAUTI รวม"],["cauti_icu_cases","CAUTI ICU (ครั้ง)"],["cauti_icu_days","วันคาสายสวน ICU"],["cauti_icu_rate","CAUTI ICU"],["cauti_non_icu_rate","CAUTI นอก ICU"],["injury","บาดเจ็บจากงาน (ครั้ง)"],["staff_average","บุคลากรเฉลี่ย"],["injury_rate","บาดเจ็บ (%)"],["sterilization_passed","ตรวจผ่าน"],["sterilization_total","ตรวจทั้งหมด"],["sterilization_rate","ตรวจผ่าน (%)"]]);
    const month=$("adminMonth").value||localMonth();
    const h=await api("getHospitalInputs",{month});
    $("sterilizationPassed").value=h.sterilization_passed??"";$("sterilizationTotal").value=h.sterilization_total??"";
  }catch(e){$("adminThipTable").textContent=e.message;}
}
async function saveSterilization(){
  const month=$("adminMonth").value||localMonth(),passed=$("sterilizationPassed").value,total=$("sterilizationTotal").value;
  try{
    if(passed===""||total==="")throw new Error("กรุณากรอกข้อมูลทั้ง 2 ค่า");
    if(Number(passed)>Number(total))throw new Error("จำนวนครั้งที่ผ่านเกณฑ์ต้องไม่มากกว่าจำนวนครั้งที่ตรวจทั้งหมด");
    await api("saveHospitalInput",{month,values:{sterilization_passed:Number(passed),sterilization_total:Number(total)}});
    $("sterilizationMessage").textContent="บันทึกข้อมูลเรียบร้อย";loadAdminThip();loadAdminReports();
  }catch(e){$("sterilizationMessage").textContent="บันทึกไม่สำเร็จ: "+e.message;}
}

initGoogle();