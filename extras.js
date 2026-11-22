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
