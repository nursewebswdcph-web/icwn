# IC Indicator — รพร.สว่างแดนดิน

ระบบบันทึกตัวชี้วัด IC แบบสรุปรายเดือน แยกข้อมูลตามหน่วยงาน (15 หน่วยงาน) โดย Google Sheets เป็นฐานข้อมูล, GitHub Pages เป็น Frontend และ Google Apps Script เป็น API

## โครงสร้าง
- `index.html`, `styles.css`, `app.js`: Web frontend แบบ responsive
- `gas/Code.gs`: Backend สำหรับวางใน Google Apps Script
- เมื่อเรียก API ครั้งแรก ระบบจะสร้างชีตต่อไปนี้ให้อัตโนมัติ หากยังไม่มี: `Users`, `Units`, `Fields`, `Records`, `Hospital_Inputs`, `AuditLog`, `Settings`, `Targets`

## ตั้งค่าก่อนใช้งาน

### 1) Google OAuth Client ID
1. สร้าง OAuth 2.0 Client ID แบบ Web application ใน Google Cloud Console
2. เพิ่ม GitHub Pages origin ใน Authorized JavaScript origins (เช่น `https://nursewebswdcph-web.github.io` และ origin ที่ใช้จริง)
3. นำ Client ID ไปใส่ใน `app.js` ที่ `CONFIG.GOOGLE_CLIENT_ID` และใน `gas/Code.gs` ที่ `CONFIG.GOOGLE_CLIENT_ID` ให้ตรงกัน

### 2) Google Apps Script
1. เปิด Google Sheet ID `1u_96VmaDeQMXfxNBgiLaiwZqwK95f5mcC_QjGc9GcLI` ด้วยบัญชีเจ้าของระบบ
2. Extensions → Apps Script แล้ววางเนื้อหาจาก `gas/Code.gs` ในไฟล์ `Code.gs`
3. ตรวจสอบ `SPREADSHEET_ID` และตั้ง `GOOGLE_CLIENT_ID` ให้ตรงกับ Frontend
4. Deploy → New deployment → Web app; Execute as: Me; Who has access: Anyone (การตรวจสิทธิ์จริงทำซ้ำในโค้ดด้วย Google ID token และชีต Users)
5. คัดลอก Web app URL ที่ลงท้ายด้วย `/exec` ไปใส่ใน `app.js` ที่ `CONFIG.GAS_URL`

### 3) เริ่มสร้างชีตและกำหนดสิทธิ์
1. เปิดหน้าเว็บและเข้าสู่ระบบด้วย Google account ที่ต้องการใช้เป็นผู้ดูแลครั้งแรก
2. หากชีตยังไม่มี ระบบจะสร้างแท็บและหัวตารางอัตโนมัติ แต่การเข้าสู่ระบบจะยังไม่ผ่านจนกว่าจะเพิ่มผู้ใช้ในแท็บ `Users`
3. เพิ่มแถวใน `Users`:
   - Admin: `email | Admin | * | TRUE`
   - Editor: `email | Editor | หน่วยงาน1,หน่วยงาน2 | TRUE`
   - Viewer: `email | Viewer | * | TRUE`
4. กลับมาเข้าสู่ระบบใหม่

> หมายเหตุ: `Users` ต้องเป็น allowlist ของบัญชี Google ที่ได้รับอนุญาตเท่านั้น ห้ามเปิด Google Sheet เป็นสาธารณะ

## หน้าการใช้งานที่ปรับปรุง
- ผู้ใช้ทั่วไป: เข้าสู่ระบบ → เลือกหน่วยงาน → ประวัติการบันทึกรายเดือน → เพิ่มรายการ/เปิดรายการเดิม; บันทึกได้ถึงเดือนปัจจุบันเท่านั้น
- รายงานหน่วยงาน: เลือกดูทั้งปีงบประมาณหรือรายเดือน พร้อม Dashboard และตารางเฝ้าระวัง IC; ห้องคลอดใช้ตารางผู้คลอดแบบยุบ
- Admin: หน้าแรกเป็นภาพรวมโรงพยาบาล, มีแท็บรายงาน IC / THIP II / เข้าบันทึกข้อมูลรายหน่วยงาน
- THIP II: Admin บันทึกจำนวนครั้งตรวจปราศจากเชื้อผ่านเกณฑ์และจำนวนครั้งตรวจทั้งหมดแยกตามเดือนใน `Hospital_Inputs`
- หนึ่งแถวใน `Records` ต่อหนึ่งหน่วยงานต่อหนึ่งเดือน (key คือ unit + YYYY-MM)
- สถานะ `DRAFT` และ `SUBMITTED`; การบันทึกซ้ำใช้ version check และ LockService
- มี AuditLog เก็บผู้บันทึก เวลา และข้อมูลก่อน/หลัง
- ร้อยละอุบัติเหตุ = จำนวนครั้งอุบัติเหตุรวม ÷ จำนวนบุคลากรทั้งหมด × 100
- ร้อยละเจ็บป่วย = จำนวนครั้งเจ็บป่วยด้วยโรคติดเชื้อรวม ÷ จำนวนบุคลากรทั้งหมด × 100
- ถ้าจำนวนบุคลากรเป็น 0 จะแสดง — ในหน้าจอ (ไม่คำนวณหารศูนย์)

## การอัปเดต Backend หลังแก้ไข `gas/Code.gs`
- GitHub Pages deploy อัตโนมัติจาก `main` แต่ Apps Script Web App ไม่ได้ deploy ตาม GitHub โดยอัตโนมัติ
- เมื่อต้องการใช้ API รายงานและช่องบันทึก THIP II รุ่นใหม่ ให้คัดลอก `gas/Code.gs` ไปแทนใน Apps Script แล้ว Deploy → Manage deployments → Edit → New version → Deploy
- การอัปเดตนี้เพิ่ม API `getUnitReport`, `getHospitalReport`, `getTHIPReport`, `getHospitalInputs` และ `saveHospitalInput`; เพิ่มคอลัมน์ตัวชี้วัดที่ขาดในชีต `Fields` อัตโนมัติเมื่อเรียก API

## ข้อควรทราบ
- แบบฟอร์มนี้เป็นการบันทึกสรุปรายเดือน ไม่ใช่การบันทึกผู้ป่วยรายบุคคล
- สูตรตัวชี้วัดทางคลินิก (เช่น Device-associated infection, CLABSI, SSI และ THIP II) ต้องผ่านการยืนยันนิยาม/ตัวหารจากทีม IC ก่อนเปิดใช้รายงานผลจริง
- Apps Script ContentService และ GitHub Pages ต้องทดสอบการเรียกข้ามโดเมน (CORS) หลัง deploy จริง หาก browser ปฏิเสธการอ่าน response ต้องวาง API ผ่าน proxy ที่รองรับ CORS; ไม่ควรเปิดชีตสาธารณะเพื่อแก้ปัญหา
- Google OAuth Client ID และ Web App URL เป็นค่าตั้งค่าที่ผู้ดูแลต้องใส่เองก่อนใช้งาน
