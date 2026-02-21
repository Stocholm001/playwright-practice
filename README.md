# playwright-practice
Playwright practice project for automation training




# Run Projects Code
npx playwright test --project=boss
npx playwright test --project=girlfriend







# Diagram Flow Login Global
START RUN
   │
   ▼
Load playwright.config.ts
   │
   ▼
Run globalSetup (ถ้ามี)
   │
   ▼
Login → save storageState.json
   │
   ▼
Start Tests
   │
   ├── Test ที่ใช้ storageState
   │        │
   │        ▼
   │   เปิด browser พร้อม session (Login แล้ว)
   │
   └── Test ที่ใช้ storageState: undefined
            │
            ▼
        เปิด browser ใหม่ (ยังไม่ Login)